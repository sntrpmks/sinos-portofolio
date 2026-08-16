"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import { AppChallenge, AppValidationResult } from "@/types/lab";
import { checkAppAnswer } from "@/features/lab/stack-builder/domain/architecture-validator";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Sparkles,
  Key,
  Camera,
  Music,
  Database,
  Film,
  Type,
  FolderArchive,
  Moon,
  ShieldCheck,
  Globe,
  Image as ImageIcon,
  Zap,
} from "lucide-react";

interface StackBuilderModuleProps {
  initialChallenges: AppChallenge[];
}

export default function StackBuilderModule({
  initialChallenges,
}: StackBuilderModuleProps) {
  const { locale, t } = useViewMode();
  const shouldReduceMotion = useReducedMotion();

  // Game flow state: "intro" | "playing" | "result"
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [validationResult, setValidationResult] = useState<AppValidationResult | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  // Score tracking
  const [totalScore, setTotalScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(0);

  const activeChallenge = initialChallenges[currentLevelIndex] || initialChallenges[0];

  // Read high score from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sinos_app_builder_highscore");
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) setHighScore(val);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Icon mapping helper
  const getOptionIcon = (id: string) => {
    switch (id) {
      case "comp-login":
        return <Key className="w-5 h-5 text-[#00695C]" />;
      case "comp-camera":
        return <Camera className="w-5 h-5 text-purple-600" />;
      case "comp-music":
        return <Music className="w-5 h-5 text-amber-600" />;
      case "comp-database":
        return <Database className="w-5 h-5 text-[#171717]" />;
      case "comp-animation":
        return <Film className="w-5 h-5 text-[#00695C]" />;
      case "comp-font":
        return <Type className="w-5 h-5 text-slate-700" />;
      case "comp-storage":
        return <FolderArchive className="w-5 h-5 text-[#00695C]" />;
      case "comp-darkmode":
        return <Moon className="w-5 h-5 text-indigo-600" />;
      case "comp-auth":
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      case "comp-api":
        return <Globe className="w-5 h-5 text-[#00695C]" />;
      case "comp-wallpaper":
        return <ImageIcon className="w-5 h-5 text-emerald-600" />;
      default:
        return <Zap className="w-5 h-5 text-[#00695C]" />;
    }
  };

  // Toggle option selection
  const handleToggleOption = (optionId: string) => {
    if (validationResult?.correct) return;

    if (activeChallenge.type === "single") {
      setSelectedOptionIds([optionId]);
    } else {
      setSelectedOptionIds((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    }
    setValidationResult(null);
  };

  // Check answer
  const handleCheck = () => {
    if (!activeChallenge || selectedOptionIds.length === 0) return;

    const result = checkAppAnswer(activeChallenge, selectedOptionIds);
    setValidationResult(result);

    if (result.correct) {
      setTotalScore((prev) => prev + 1);

      // Pick cheerful correct phrase
      const phrases = t.lab.game.correctFeedback;
      const randomIdx = Math.floor(Math.random() * phrases.length);
      setFeedbackMessage(phrases[randomIdx]);
    } else {
      // Pick friendly non-shaming phrase
      const phrases = t.lab.game.incorrectFeedback;
      const randomIdx = Math.floor(Math.random() * phrases.length);
      setFeedbackMessage(phrases[randomIdx]);
    }
  };

  // Move to next level
  const handleNextLevel = () => {
    if (currentLevelIndex < initialChallenges.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
      setSelectedOptionIds([]);
      setValidationResult(null);
      setFeedbackMessage("");
    } else {
      // Finish game
      const finalScore = totalScore + (validationResult?.correct ? 1 : 0);
      if (finalScore > highScore) {
        setHighScore(finalScore);
        try {
          localStorage.setItem("sinos_app_builder_highscore", finalScore.toString());
        } catch {
          // Ignore
        }
      }
      setGameState("result");
    }
  };

  // Restart game
  const handleRestart = () => {
    setCurrentLevelIndex(0);
    setSelectedOptionIds([]);
    setValidationResult(null);
    setFeedbackMessage("");
    setTotalScore(0);
    setGameState("playing");
  };

  const activeTitle = activeChallenge.locales?.[locale]?.title || activeChallenge.id;
  const activePrompt = activeChallenge.locales?.[locale]?.prompt || "";
  const activeIntro = activeChallenge.locales?.[locale]?.intro || "";

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto min-h-[60vh] mb-12">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-4">
        <Link
          href="/lab"
          className="flex items-center gap-2 text-xs font-semibold text-[#666666] hover:text-[#171717] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.lab.game.backToLab}</span>
        </Link>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F9F5] border border-[#B2F3E5] text-xs font-mono-code font-bold text-[#00695C]">
          <Trophy className="w-3.5 h-3.5" />
          <span>
            {t.lab.game.highScore}: {highScore} / {initialChallenges.length}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* State 1: Game Intro */}
        {gameState === "intro" && (
          <motion.div
            key="intro"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="card-minimal p-8 sm:p-10 flex flex-col items-center text-center gap-6 border-l-4 border-l-[#00695C] bg-white shadow-md my-auto"
          >
            <div className="p-4 rounded-full bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C]">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="flex flex-col gap-2 max-w-md">
              <span className="text-xs font-mono-code font-bold text-[#00695C] uppercase tracking-widest">
                BUILD THE APP
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                {t.lab.game.introTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                {t.lab.game.introDesc}
              </p>
            </div>

            <button
              onClick={() => setGameState("playing")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#171717] text-white font-bold text-sm hover:bg-[#00695C] transition-all shadow-md active:scale-98"
            >
              <span>{t.lab.game.letsGo}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* State 2: Playing Stage */}
        {gameState === "playing" && (
          <motion.div
            key={`level-${activeChallenge.id}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Level Indicator Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {initialChallenges.map((ch, idx) => {
                const isActive = idx === currentLevelIndex;
                const isPassed = idx < currentLevelIndex;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentLevelIndex(idx);
                      setSelectedOptionIds([]);
                      setValidationResult(null);
                      setFeedbackMessage("");
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#171717] text-white font-bold shadow-xs"
                        : isPassed
                        ? "bg-[#E6F9F5] text-[#00695C] border border-[#B2F3E5] font-semibold"
                        : "bg-[#F0F0ED] text-[#666666] border border-[#E6E6E3] hover:text-[#171717]"
                    }`}
                  >
                    <span>
                      {t.lab.game.levelTag} 0{ch.order}
                    </span>
                    {isPassed && <CheckCircle2 className="w-3 h-3 text-[#00695C]" />}
                  </button>
                );
              })}
            </div>

            {/* Scenario Card */}
            <div className="card-minimal p-6 sm:p-8 flex flex-col gap-3 border-l-4 border-l-[#00695C] bg-white">
              <span className="text-xs font-mono-code text-[#00695C] font-semibold">
                {activeIntro}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
                {activePrompt}
              </h2>
              {activeChallenge.type === "multiple" && (
                <span className="text-[11px] font-mono-code text-[#8A8A8A]">
                  (Pilih semua yang kamu butuhkan)
                </span>
              )}
            </div>

            {/* Option Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeChallenge.options.map((opt) => {
                const isSelected = selectedOptionIds.includes(opt.id);
                const isCorrectState = validationResult?.correct && isSelected;

                return (
                  <motion.button
                    key={opt.id}
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    onClick={() => handleToggleOption(opt.id)}
                    className={`p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                      isCorrectState
                        ? "bg-[#E6F9F5] border-[#00695C] ring-2 ring-[#00695C]"
                        : isSelected
                        ? "bg-[#E6F9F5] border-[#00695C] text-[#00695C] font-bold shadow-xs"
                        : "bg-white border-[#E6E6E3] hover:border-[#00695C] text-[#171717]"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl border ${
                        isSelected
                          ? "bg-white border-[#00695C]"
                          : "bg-[#F0F0ED] border-[#E6E6E3]"
                      }`}
                    >
                      {getOptionIcon(opt.id)}
                    </div>

                    <span className="text-sm sm:text-base font-bold flex-1">
                      {opt.locales?.[locale]?.label || opt.id}
                    </span>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#00695C] shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {validationResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 w-full ${
                    validationResult.correct
                      ? "bg-[#E6F9F5] border-[#B2F3E5] text-[#00695C]"
                      : "bg-amber-50 border-amber-200 text-amber-800"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold">
                    {feedbackMessage}
                  </span>

                  <button
                    onClick={handleNextLevel}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#171717] text-white text-xs font-bold hover:bg-[#00695C] transition-colors shrink-0 shadow-xs"
                  >
                    <span>{t.lab.game.nextBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={handleCheck}
                  disabled={selectedOptionIds.length === 0}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#171717] text-white font-bold text-xs hover:bg-[#00695C] transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
                >
                  <span>{t.lab.game.checkBtn}</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* State 3: Final Result */}
        {gameState === "result" && (
          <motion.div
            key="result"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="card-minimal p-8 sm:p-10 flex flex-col items-center text-center gap-6 border-l-4 border-l-[#00695C] bg-white shadow-lg my-auto"
          >
            <div className="p-4 rounded-full bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C]">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="flex flex-col gap-2 max-w-md">
              <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-widest">
                {t.lab.game.youBuiltIt}
              </span>
              <h2 className="text-3xl font-extrabold text-[#171717]">
                {totalScore} / {initialChallenges.length}
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-medium">
                {totalScore === initialChallenges.length
                  ? t.lab.game.fullScoreNote
                  : t.lab.game.partialScoreNote}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#E6E6E3] w-full">
              <button
                onClick={handleRestart}
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
        )}
      </AnimatePresence>
    </div>
  );
}
