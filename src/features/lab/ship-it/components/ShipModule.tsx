"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import { ShipModeState, ShipObstacle, ShipPlayer, ShipStage } from "@/types/lab";
import {
  calculateStage,
  checkShipCollision,
  generateObstacle,
  PHYSICS_CONFIG,
  updatePlayerPhysics,
} from "@/features/lab/ship-it/domain/ship-physics";
import {
  RotateCcw,
  Trophy,
  Rocket,
  ArrowUp,
  Sparkles,
  Terminal,
} from "lucide-react";

export default function ShipModule() {
  const { t } = useViewMode();
  const shouldReduceMotion = useReducedMotion();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Semantic game state: "idle" | "playing" | "gameOver" | "result"
  const [gameState, setGameState] = useState<ShipModeState>("idle");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<ShipStage>("local");

  // Game Engine Refs
  const lastTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const pendingBoostRef = useRef<boolean>(false);

  const playerRef = useRef<ShipPlayer>({
    x: 60,
    y: 180,
    size: 26,
    velocity: 0,
    rotation: 0,
  });

  const obstaclesRef = useRef<ShipObstacle[]>([]);
  const obstacleCountRef = useRef<number>(0);

  // Read high score from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sinos_shipit_highscore");
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) setHighScore(val);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Trigger jump / boost action
  const triggerBoost = useCallback(() => {
    if (gameState === "idle") {
      setGameState("playing");
      pendingBoostRef.current = true;
    } else if (gameState === "playing") {
      pendingBoostRef.current = true;
    }
  }, [gameState]);

  // Handle Keyboard (Space / ArrowUp)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        // Prevent default spacebar scrolling ONLY when interacting with game
        if (gameState === "playing" || gameState === "idle") {
          e.preventDefault();
        }
        triggerBoost();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerBoost, gameState]);

  // Reset Game Engine state
  const resetGameEngine = (canvasWidth: number, canvasHeight: number) => {
    playerRef.current = {
      x: Math.min(80, canvasWidth * 0.25),
      y: canvasHeight / 2,
      size: 26,
      velocity: 0,
      rotation: 0,
    };

    obstaclesRef.current = [];
    obstacleCountRef.current = 0;
    pendingBoostRef.current = false;
    setScore(0);
    setCurrentStage("local");

    // Spawn first two obstacles safely ahead
    const firstObs = generateObstacle(
      canvasWidth + 60,
      canvasWidth,
      canvasHeight,
      0
    );
    const secondObs = generateObstacle(
      firstObs.x + PHYSICS_CONFIG.minDistanceBetween,
      canvasWidth,
      canvasHeight,
      1
    );

    obstaclesRef.current = [firstObs, secondObs];
    obstacleCountRef.current = 2;
  };

  // Start new deployment run
  const handleStartGame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      resetGameEngine(canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
    }
    setGameState("playing");
  };

  // Canvas Render & Physics Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    let isSubscribed = true;
    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      if (!isSubscribed) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Delta time in seconds
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      // 1. UPDATE PHYSICS
      const boostTriggered = pendingBoostRef.current;
      pendingBoostRef.current = false;

      playerRef.current = updatePlayerPhysics(
        playerRef.current,
        dt,
        boostTriggered
      );

      // 2. UPDATE OBSTACLES & SCORE
      const currentSpeed = PHYSICS_CONFIG.speed * dt;
      let newScore = score;

      obstaclesRef.current = obstaclesRef.current.map((obs) => {
        const newX = obs.x - currentSpeed;

        // Check if player passed obstacle -> score +1
        let scored = obs.scored;
        if (!scored && newX + obs.width < playerRef.current.x) {
          scored = true;
          newScore += 1;
        }

        return { ...obs, x: newX, scored };
      });

      if (newScore !== score) {
        setScore(newScore);
        const stage = calculateStage(newScore);
        setCurrentStage(stage);
      }

      // Remove off-screen obstacles & spawn new ones
      obstaclesRef.current = obstaclesRef.current.filter(
        (obs) => obs.x + obs.width > -50
      );

      const lastObs = obstaclesRef.current[obstaclesRef.current.length - 1];
      if (!lastObs || lastObs.x < width) {
        const nextX = lastObs ? lastObs.x : width;
        const newObs = generateObstacle(
          nextX,
          width,
          height,
          obstacleCountRef.current
        );
        obstacleCountRef.current += 1;
        obstaclesRef.current.push(newObs);
      }

      // 3. COLLISION CHECK
      const isCollided = checkShipCollision(
        playerRef.current,
        obstaclesRef.current,
        height
      );

      if (isCollided) {
        setGameState("gameOver");
        setHighScore((prevBest) => {
          const finalBest = Math.max(prevBest, newScore);
          try {
            localStorage.setItem("sinos_shipit_highscore", finalBest.toString());
          } catch {
            // Ignore
          }
          return finalBest;
        });
        return;
      }

      // 4. DRAW CANVAS SCENE
      ctx.clearRect(0, 0, width, height);

      // Background stage style
      const stage = calculateStage(newScore);
      if (stage === "production") {
        ctx.fillStyle = "#F4FBF9";
      } else if (stage === "staging") {
        ctx.fillStyle = "#F7F7F5";
      } else {
        ctx.fillStyle = "#FFFFFF";
      }
      ctx.fillRect(0, 0, width, height);

      // Subtle background grid lines
      ctx.strokeStyle = "#E6E6E3";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Render Obstacles
      obstaclesRef.current.forEach((obs) => {
        ctx.fillStyle = "#171717";

        // Top Pipe
        ctx.beginPath();
        ctx.roundRect(obs.x, 0, obs.width, obs.topHeight, [0, 0, 8, 8]);
        ctx.fill();

        // Bottom Pipe
        ctx.beginPath();
        ctx.roundRect(
          obs.x,
          height - obs.bottomHeight,
          obs.width,
          obs.bottomHeight,
          [8, 8, 0, 0]
        );
        ctx.fill();

        // Pipe Label Text
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        if (obs.topHeight > 24) {
          ctx.fillText(obs.label, obs.x + obs.width / 2, obs.topHeight - 10);
        }
        if (obs.bottomHeight > 24) {
          ctx.fillText(
            obs.label,
            obs.x + obs.width / 2,
            height - obs.bottomHeight + 18
          );
        }
      });

      // Render Player Packet
      const p = playerRef.current;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      // Packet Outer Container
      ctx.fillStyle = "#171717";
      ctx.shadowColor = "rgba(0, 105, 92, 0.25)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.roundRect(-p.size / 2, -p.size / 2, p.size, p.size, [6]);
      ctx.fill();

      // Packet Aksen Accent (>_)
      ctx.fillStyle = "#A9F1DF";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(">_", 0, 0);

      ctx.restore();

      // Schedule next frame
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isSubscribed = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [gameState, score]);

  // Handle Resize & Resolution adjustment
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = Math.min(420, Math.max(340, width * 0.75));

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      if (gameState === "idle") {
        resetGameEngine(width, height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gameState]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto min-h-[60vh] mb-12">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-4">
        <Link
          href="/lab"
          className="flex items-center gap-2 text-xs font-semibold text-[#666666] hover:text-[#171717] transition-colors"
        >
          <span>{t.lab.shipItGame.backToLab}</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-code font-bold px-2.5 py-1 rounded-md bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717]">
            STAGE: {currentStage.toUpperCase()}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F9F5] border border-[#B2F3E5] text-xs font-mono-code font-bold text-[#00695C]">
            <Trophy className="w-3.5 h-3.5" />
            <span>
              {t.lab.shipItGame.bestTag}: {highScore}
            </span>
          </div>
        </div>
      </div>

      {/* Main Game Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl border-2 border-[#171717] overflow-hidden bg-white shadow-md select-none touch-none"
        onPointerDown={triggerBoost}
      >
        <canvas ref={canvasRef} className="block w-full h-auto cursor-pointer" />

        {/* Live Score Overlay */}
        {gameState === "playing" && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717]/90 text-white font-mono-code font-bold text-sm shadow-md pointer-events-none backdrop-blur-xs">
            <Rocket className="w-4 h-4 text-[#A9F1DF]" />
            <span>{score}</span>
          </div>
        )}

        {/* Stage Milestone Notification */}
        {gameState === "playing" && score >= 10 && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C] font-mono-code text-[11px] font-bold shadow-xs pointer-events-none animate-pulse">
            {t.lab.shipItGame.youreLive}
          </div>
        )}

        <AnimatePresence>
          {/* Overlay 1: Idle Start Screen */}
          {gameState === "idle" && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center gap-5 z-10"
            >
              <div className="p-3.5 rounded-2xl bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C]">
                <Terminal className="w-8 h-8" />
              </div>

              <div className="flex flex-col gap-1.5 max-w-sm">
                <span className="text-xs font-mono-code font-bold text-[#00695C] uppercase tracking-widest">
                  SHIP IT
                </span>
                <h1 className="text-2xl font-extrabold text-[#171717]">
                  {t.lab.shipItGame.introTitle}
                </h1>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {t.lab.shipItGame.introDesc}
                </p>
              </div>

              <button
                onClick={handleStartGame}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#171717] text-white font-bold text-xs hover:bg-[#00695C] transition-all shadow-md active:scale-98"
              >
                <ArrowUp className="w-4 h-4 text-[#A9F1DF]" />
                <span>{t.lab.shipItGame.startBtn}</span>
              </button>

              <span className="text-[11px] font-mono-code text-[#8A8A8A]">
                {t.lab.shipItGame.instruction}
              </span>
            </motion.div>
          )}

          {/* Overlay 2: Game Over Screen */}
          {gameState === "gameOver" && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center gap-5 z-10"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono-code font-bold text-rose-600 uppercase tracking-widest">
                  {t.lab.shipItGame.crashed}
                </span>
                <h2 className="text-3xl font-extrabold text-[#171717]">
                  {score}
                </h2>
                <span className="text-xs text-[#666666] font-medium">
                  {score >= 10
                    ? t.lab.shipItGame.youreLive
                    : t.lab.shipItGame.almostNote}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleStartGame}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#171717] text-white font-bold text-xs hover:bg-[#00695C] transition-all shadow-md active:scale-98"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.lab.shipItGame.tryAgain}</span>
                </button>

                <Link
                  href="/work"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] font-semibold text-xs hover:border-[#171717] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#00695C]" />
                  <span>{t.lab.shipItGame.exploreProjects}</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
