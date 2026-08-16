"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import { StackComponent, StackChallenge, ValidationResult } from "@/types/lab";
import { validateArchitecture, calculateScore } from "@/features/lab/stack-builder/domain/architecture-validator";
import {
  Layers,
  Server,
  Key,
  Database,
  Zap,
  ListFilter,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trophy,
  ArrowUp,
  ArrowDown,
  X,
  HelpCircle,
} from "lucide-react";

interface StackBuilderModuleProps {
  initialChallenges: StackChallenge[];
  initialComponents: StackComponent[];
}

export default function StackBuilderModule({
  initialChallenges,
  initialComponents,
}: StackBuilderModuleProps) {
  const { locale, t } = useViewMode();
  const shouldReduceMotion = useReducedMotion();

  // Active challenge index
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const activeChallenge = initialChallenges[currentChallengeIndex] || initialChallenges[0];

  // User selected stack (array of component IDs)
  const [userStack, setUserStack] = useState<string[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  // Timer & Scoring state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [completedChallenges, setCompletedChallenges] = useState<Record<string, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [highScore, setHighScore] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Read high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sinos_stack_builder_highscore");
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) setHighScore(val);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Timer interval (1 second ticks)
  useEffect(() => {
    if (isPlaying && !validationResult?.correct) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, validationResult?.correct]);

  // Map component ID to object
  const getComponent = useCallback(
    (id: string) => {
      return initialComponents.find((c) => c.id === id);
    },
    [initialComponents]
  );

  // Get component icon
  const getComponentIcon = (type: string) => {
    switch (type) {
      case "frontend":
        return <Layers className="w-4 h-4 text-[#00695C]" />;
      case "api":
        return <Server className="w-4 h-4 text-[#171717]" />;
      case "auth":
        return <Key className="w-4 h-4 text-amber-600" />;
      case "backend":
        return <Server className="w-4 h-4 text-[#00695C]" />;
      case "cache":
        return <Zap className="w-4 h-4 text-amber-500" />;
      case "queue":
        return <ListFilter className="w-4 h-4 text-purple-600" />;
      case "database":
        return <Database className="w-4 h-4 text-[#171717]" />;
      default:
        return <Layers className="w-4 h-4 text-[#171717]" />;
    }
  };

  // Add component to user stack
  const handleAddComponent = (comp: StackComponent) => {
    if (validationResult?.correct) return;
    if (userStack.includes(comp.id)) return;
    setUserStack((prev) => [...prev, comp.id]);
    setValidationResult(null);
  };

  // Remove component from stack
  const handleRemoveComponent = (index: number) => {
    if (validationResult?.correct) return;
    setUserStack((prev) => prev.filter((_, idx) => idx !== index));
    setValidationResult(null);
  };

  // Move component up or down in order
  const handleMoveComponent = (index: number, direction: "up" | "down") => {
    if (validationResult?.correct) return;
    setUserStack((prev) => {
      const next = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
    setValidationResult(null);
  };

  // Reset current challenge board
  const handleResetBoard = () => {
    setUserStack([]);
    setValidationResult(null);
    setShowHint(false);
  };

  // Validate user architecture
  const handleCheckArchitecture = () => {
    if (!activeChallenge) return;

    const result = validateArchitecture(activeChallenge, userStack);

    if (result.correct) {
      const calculatedScore = calculateScore({
        correct: true,
        completionTimeSeconds: elapsedSeconds,
        maxTimeSeconds: activeChallenge.maxTimeSeconds || 45,
        mistakes: result.mistakes,
      });

      const updatedResults = {
        ...completedChallenges,
        [activeChallenge.id]: calculatedScore,
      };
      setCompletedChallenges(updatedResults);

      const totalScore = Object.values(updatedResults).reduce((a, b) => a + b, 0);
      if (totalScore > highScore) {
        setHighScore(totalScore);
        try {
          localStorage.setItem("sinos_stack_builder_highscore", totalScore.toString());
        } catch {
          // Ignore
        }
      }

      setValidationResult({
        ...result,
        score: calculatedScore,
      });
    } else {
      setValidationResult(result);
    }
  };

  // Go to next challenge
  const handleNextChallenge = () => {
    if (currentChallengeIndex < initialChallenges.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setUserStack([]);
      setValidationResult(null);
      setShowHint(false);
    }
  };

  // Restart entire game
  const handleRestartGame = () => {
    setCurrentChallengeIndex(0);
    setUserStack([]);
    setValidationResult(null);
    setElapsedSeconds(0);
    setIsPlaying(true);
    setCompletedChallenges({});
    setShowHint(false);
  };

  // Available components for current challenge
  const availableForChallenge = activeChallenge.availableComponents
    .map((id) => getComponent(id))
    .filter((c): c is StackComponent => c !== undefined);

  const isAllCompleted =
    Object.keys(completedChallenges).length === initialChallenges.length &&
    validationResult?.correct;

  const activeChallengeTitle =
    activeChallenge.locales?.[locale]?.title || activeChallenge.id;
  const activeChallengeDesc =
    activeChallenge.locales?.[locale]?.description || "";
  const activeChallengeHint =
    activeChallenge.locales?.[locale]?.hint || "";

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto min-h-[60vh] mb-12">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E6E3] pb-4">
        <Link
          href="/lab"
          className="flex items-center gap-2 text-xs font-semibold text-[#666666] hover:text-[#171717] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.lab.game.backToLab}</span>
        </Link>

        {/* Global Game Status Bar */}
        <div className="flex items-center gap-4 text-xs font-mono-code">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F0ED] border border-[#E6E6E3] font-bold text-[#171717]">
            <Clock className="w-3.5 h-3.5 text-[#00695C]" />
            <span>{elapsedSeconds}s</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F9F5] border border-[#B2F3E5] font-bold text-[#00695C]">
            <Trophy className="w-3.5 h-3.5 text-[#00695C]" />
            <span>
              {t.lab.game.highScore}: {highScore}
            </span>
          </div>
        </div>
      </div>

      {/* Challenge Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {initialChallenges.map((ch, idx) => {
          const isDone = completedChallenges[ch.id] !== undefined;
          const isActive = idx === currentChallengeIndex;
          return (
            <button
              key={ch.id}
              onClick={() => {
                setCurrentChallengeIndex(idx);
                setUserStack([]);
                setValidationResult(null);
                setShowHint(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-[#171717] text-white font-bold shadow-xs"
                  : isDone
                  ? "bg-[#E6F9F5] text-[#00695C] border border-[#B2F3E5] font-semibold"
                  : "bg-[#F0F0ED] text-[#666666] border border-[#E6E6E3] hover:text-[#171717]"
              }`}
            >
              <span>
                {t.lab.game.challengeTag} 0{ch.order}
              </span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#00695C]" />}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <AnimatePresence mode="wait">
        {isAllCompleted ? (
          /* Final Completion Result Card */
          <motion.div
            key="final-screen"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="card-minimal p-8 sm:p-10 flex flex-col items-center text-center gap-6 border-l-4 border-l-[#00695C] bg-white shadow-lg"
          >
            <div className="p-4 rounded-full bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C]">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="flex flex-col gap-2 max-w-md">
              <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-widest">
                {t.lab.game.systemReady}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                {locale === "id"
                  ? "Seluruh Arsitektur Berhasil Disusun!"
                  : "All System Architectures Complete!"}
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                {locale === "id"
                  ? "Selamat! Anda telah berhasil menyelesaikan seluruh tantangan topologi arsitektur sistem di Stack Builder."
                  : "Nice. You have successfully solved all architecture topology challenges in Stack Builder."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm font-mono-code">
              <div className="p-4 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#8A8A8A] uppercase font-bold">
                  {t.lab.game.timer}
                </span>
                <span className="text-xl font-bold text-[#171717]">{elapsedSeconds}s</span>
              </div>
              <div className="p-4 rounded-xl bg-[#E6F9F5] border border-[#B2F3E5] flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#00695C] uppercase font-bold">
                  {t.lab.game.score}
                </span>
                <span className="text-xl font-bold text-[#00695C]">{highScore}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#E6E6E3] w-full">
              <button
                onClick={handleRestartGame}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] font-semibold text-xs hover:border-[#171717] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.lab.game.playAgain}</span>
              </button>

              <Link
                href="/work"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171717] text-white font-semibold text-xs hover:bg-[#00695C] transition-colors shadow-xs"
              >
                <span>{t.lab.game.exploreProjects}</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Active Challenge Layout */
          <motion.div
            key={activeChallenge.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Challenge Info Header */}
            <div className="card-minimal p-6 flex flex-col gap-4 border-l-4 border-l-[#00695C]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code font-bold text-[#00695C] uppercase tracking-widest">
                  {t.lab.game.challengeTag} 0{activeChallenge.order} / 0
                  {initialChallenges.length}
                </span>

                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#00695C] transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{locale === "id" ? "Petunjuk" : "Hint"}</span>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
                  {activeChallengeTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#2A2A2A] leading-relaxed">
                  {activeChallengeDesc}
                </p>
              </div>

              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-[#E6F9F5] border border-[#B2F3E5] text-xs text-[#00695C] font-medium leading-relaxed"
                >
                  💡 <strong>Hint:</strong> {activeChallengeHint}
                </motion.div>
              )}
            </div>

            {/* Architecture Board (Your Topology) */}
            <div className="card-minimal p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00695C]" />
                  <h3 className="text-xs font-mono-code font-bold text-[#171717] uppercase tracking-wider">
                    {t.lab.game.yourArchitecture}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {userStack.length > 0 && (
                    <button
                      onClick={handleResetBoard}
                      className="flex items-center gap-1 text-xs text-[#8A8A8A] hover:text-rose-600 transition-colors font-mono-code"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.lab.game.reset}</span>
                    </button>
                  )}
                  <span className="text-xs font-mono-code text-[#666666]">
                    {userStack.length} {locale === "id" ? "Komponen" : "Components"}
                  </span>
                </div>
              </div>

              {/* Topology Nodes Flow */}
              {userStack.length === 0 ? (
                <div className="py-12 px-4 rounded-xl bg-[#F7F7F5] border border-dashed border-[#E6E6E3] flex flex-col items-center justify-center gap-2 text-center text-xs text-[#8A8A8A]">
                  <Layers className="w-8 h-8 text-[#8A8A8A]" />
                  <p className="max-w-xs">{t.lab.game.emptyArchitecture}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 py-2">
                  {userStack.map((compId, idx) => {
                    const comp = getComponent(compId);
                    if (!comp) return null;
                    const isLast = idx === userStack.length - 1;
                    const localizedComp =
                      comp.locales?.[locale] || comp.locales?.en;

                    return (
                      <React.Fragment key={`${compId}-${idx}`}>
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          className="card-minimal p-4 flex items-center justify-between gap-4 bg-white border-l-4 border-l-[#00695C] shadow-xs group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono-code font-bold text-xs text-[#00695C] px-2 py-1 rounded bg-[#E6F9F5] border border-[#B2F3E5]">
                              0{idx + 1}
                            </span>
                            <div className="p-2 rounded-lg bg-[#F0F0ED] border border-[#E6E6E3]">
                              {getComponentIcon(comp.type)}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-[#171717]">
                                {localizedComp?.label}
                              </span>
                              <span className="text-xs text-[#666666] line-clamp-1">
                                {localizedComp?.description}
                              </span>
                            </div>
                          </div>

                          {/* Node Reordering & Removal Controls */}
                          <div className="flex items-center gap-1 shrink-0">
                            {idx > 0 && (
                              <button
                                onClick={() => handleMoveComponent(idx, "up")}
                                className="p-1.5 rounded-lg bg-[#F0F0ED] hover:bg-[#E6E6E3] text-[#171717] transition-colors"
                                title="Move up"
                                aria-label="Move component up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {idx < userStack.length - 1 && (
                              <button
                                onClick={() => handleMoveComponent(idx, "down")}
                                className="p-1.5 rounded-lg bg-[#F0F0ED] hover:bg-[#E6E6E3] text-[#171717] transition-colors"
                                title="Move down"
                                aria-label="Move component down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveComponent(idx)}
                              className="p-1.5 rounded-lg bg-[#F0F0ED] hover:bg-rose-100 hover:text-rose-600 text-[#8A8A8A] transition-colors"
                              title="Remove"
                              aria-label="Remove component"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>

                        {/* Arrow Connection Connector */}
                        {!isLast && (
                          <div className="flex justify-center my-[-4px]">
                            <div className="w-0.5 h-4 bg-[#00695C]/40 flex items-center justify-center">
                              <ArrowDown className="w-3 h-3 text-[#00695C]" />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}

              {/* Submit & Validation Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E6E6E3]">
                <span className="text-xs text-[#8A8A8A] font-mono-code">
                  {t.lab.game.selectPrompt}
                </span>

                <button
                  onClick={handleCheckArchitecture}
                  disabled={userStack.length === 0}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#171717] text-white font-semibold text-xs hover:bg-[#00695C] transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
                >
                  <span>{t.lab.game.checkArchitecture}</span>
                </button>
              </div>

              {/* Validation Result Feedback Alert */}
              <AnimatePresence>
                {validationResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      validationResult.correct
                        ? "bg-[#E6F9F5] border-[#B2F3E5] text-[#00695C]"
                        : "bg-rose-50 border-rose-200 text-rose-800"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {validationResult.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-[#00695C] shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-xs uppercase tracking-wider">
                          {validationResult.correct
                            ? t.lab.game.systemReady
                            : t.lab.game.systemFailed}
                        </span>
                        <p className="text-xs leading-relaxed font-medium">
                          {t.lab.game[validationResult.feedbackKey as keyof typeof t.lab.game] ||
                            validationResult.feedbackKey}
                        </p>
                      </div>
                    </div>

                    {validationResult.correct && (
                      <button
                        onClick={handleNextChallenge}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00695C] text-white text-xs font-semibold hover:bg-[#004D40] transition-colors shrink-0 shadow-xs"
                      >
                        <span>{t.lab.game.nextChallenge}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Component Palette (Available to select) */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-2">
                <span className="text-xs font-mono-code font-bold text-[#171717] uppercase tracking-wider">
                  {t.lab.game.availableComponents}
                </span>
                <span className="text-xs text-[#8A8A8A] font-mono-code">
                  {availableForChallenge.length} {locale === "id" ? "Pilihan" : "Available"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {availableForChallenge.map((comp) => {
                  const isAdded = userStack.includes(comp.id);
                  const localizedComp =
                    comp.locales?.[locale] || comp.locales?.en;

                  return (
                    <motion.button
                      key={comp.id}
                      disabled={isAdded || validationResult?.correct}
                      whileHover={shouldReduceMotion || isAdded ? undefined : { y: -2 }}
                      whileTap={shouldReduceMotion || isAdded ? undefined : { scale: 0.98 }}
                      onClick={() => handleAddComponent(comp)}
                      className={`card-minimal p-4 flex flex-col justify-between gap-3 text-left transition-all group ${
                        isAdded
                          ? "bg-[#F7F7F5] border-[#E6E6E3] opacity-60 cursor-not-allowed pointer-events-none"
                          : "hover:border-[#00695C]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-[#F0F0ED] border border-[#E6E6E3] group-hover:bg-[#E6F9F5] transition-colors">
                          {getComponentIcon(comp.type)}
                        </div>
                        {isAdded && (
                          <span className="text-[10px] font-mono-code text-[#00695C] font-bold bg-[#E6F9F5] px-2 py-0.5 rounded-full border border-[#B2F3E5]">
                            {locale === "id" ? "Ditambahkan" : "Added"}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-[#171717] group-hover:text-[#00695C] transition-colors">
                          {localizedComp?.label}
                        </span>
                        <p className="text-[11px] text-[#666666] leading-relaxed line-clamp-2 font-normal">
                          {localizedComp?.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
