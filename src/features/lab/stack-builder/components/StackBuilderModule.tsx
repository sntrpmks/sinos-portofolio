"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import { AppChallenge } from "@/types/lab";
import { checkAppAnswer } from "@/features/lab/stack-builder/domain/architecture-validator";
import {
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  MinusCircle,
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

export type ChallengeStatus = "unanswered" | "selected" | "correct" | "incorrect" | "skipped";

export interface LevelState {
  selectedOptionIds: string[];
  status: ChallengeStatus;
  feedbackMessage: string;
  isChecked: boolean;
}

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

  // Per-level state dictionary keyed strictly by challenge.id
  const [levelStates, setLevelStates] = useState<Record<string, LevelState>>(() => {
    const initial: Record<string, LevelState> = {};
    initialChallenges.forEach((ch) => {
      initial[ch.id] = {
        selectedOptionIds: [],
        status: "unanswered",
        feedbackMessage: "",
        isChecked: false,
      };
    });
    return initial;
  });

  const [highScore, setHighScore] = useState<number>(0);

  const activeChallenge = initialChallenges[currentLevelIndex] || initialChallenges[0];
  const activeState: LevelState = levelStates[activeChallenge.id] || {
    selectedOptionIds: [],
    status: "unanswered",
    feedbackMessage: "",
    isChecked: false,
  };

  const isLastLevel = currentLevelIndex === initialChallenges.length - 1;
  const nextActionLabel = isLastLevel
    ? t.lab.game.seeResultsBtn
    : t.lab.game.nextBtn;

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

  // Toggle option selection for active challenge
  const handleToggleOption = (optionId: string) => {
    if (activeState.isChecked && activeState.status === "correct") return;

    const currentSelected = activeState.selectedOptionIds;
    let newSelected: string[] = [];

    if (activeChallenge.type === "single") {
      newSelected = [optionId];
    } else {
      newSelected = currentSelected.includes(optionId)
        ? currentSelected.filter((id) => id !== optionId)
        : [...currentSelected, optionId];
    }

    setLevelStates((prev) => ({
      ...prev,
      [activeChallenge.id]: {
        selectedOptionIds: newSelected,
        status: newSelected.length > 0 ? "selected" : "unanswered",
        feedbackMessage: "",
        isChecked: false,
      },
    }));
  };

  // Check answer for active challenge
  const handleCheck = () => {
    if (activeState.selectedOptionIds.length === 0) {
      setLevelStates((prev) => ({
        ...prev,
        [activeChallenge.id]: {
          ...prev[activeChallenge.id],
          feedbackMessage: t.lab.game.emptyPrompt,
        },
      }));
      return;
    }

    const result = checkAppAnswer(activeChallenge, activeState.selectedOptionIds);

    let randomMsg = "";
    if (result.correct) {
      const phrases = t.lab.game.correctFeedback;
      randomMsg = phrases[Math.floor(Math.random() * phrases.length)];
    } else {
      const phrases = t.lab.game.incorrectFeedback;
      randomMsg = phrases[Math.floor(Math.random() * phrases.length)];
    }

    setLevelStates((prev) => ({
      ...prev,
      [activeChallenge.id]: {
        ...prev[activeChallenge.id],
        status: result.correct ? "correct" : "incorrect",
        feedbackMessage: randomMsg,
        isChecked: true,
      },
    }));
  };

  // Skip active challenge
  const handleSkip = () => {
    setLevelStates((prev) => ({
      ...prev,
      [activeChallenge.id]: {
        selectedOptionIds: [],
        status: "skipped",
        feedbackMessage: t.lab.game.skippedFeedback,
        isChecked: true,
      },
    }));
  };

  // Move to next level / finish game
  const handleNextLevel = () => {
    // If not checked yet, mark current level as skipped
    if (!activeState.isChecked) {
      setLevelStates((prev) => ({
        ...prev,
        [activeChallenge.id]: {
          selectedOptionIds: [],
          status: "skipped",
          feedbackMessage: t.lab.game.skippedFeedback,
          isChecked: true,
        },
      }));
    }

    if (currentLevelIndex < initialChallenges.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      // Calculate final score derived safely from levelStates
      const finalScore = Object.values(levelStates).filter(
        (s) => s.status === "correct"
      ).length;

      if (finalScore > highScore) {
        setHighScore(finalScore);
        try {
          localStorage.setItem(
            "sinos_app_builder_highscore",
            finalScore.toString()
          );
        } catch {
          // Ignore
        }
      }
      setGameState("result");
    }
  };

  // Restart game cleanly
  const handleRestart = () => {
    const resetStates: Record<string, LevelState> = {};
    initialChallenges.forEach((ch) => {
      resetStates[ch.id] = {
        selectedOptionIds: [],
        status: "unanswered",
        feedbackMessage: "",
        isChecked: false,
      };
    });
    setLevelStates(resetStates);
    setCurrentLevelIndex(0);
    setGameState("playing");
  };

  const calculatedScore = Object.values(levelStates).filter(
    (s) => s.status === "correct"
  ).length;

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
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#171717] text-white font-bold text-sm hover:bg-[#00695C] transition-all shadow-md active:scale-98"
            >
              <span>{t.lab.game.letsGo}</span>
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
                const chState = levelStates[ch.id];
                const chStatus = chState?.status || "unanswered";

                let tabStyle =
                  "bg-[#F0F0ED] text-[#666666] border border-[#E6E6E3] hover:text-[#171717]";
                let tabIcon = null;

                if (isActive) {
                  tabStyle = "bg-[#171717] text-white font-bold shadow-xs";
                } else if (chStatus === "correct") {
                  tabStyle =
                    "bg-[#E6F9F5] text-[#00695C] border border-[#B2F3E5] font-semibold";
                  tabIcon = <CheckCircle2 className="w-3 h-3 text-[#00695C]" />;
                } else if (chStatus === "incorrect") {
                  tabStyle =
                    "bg-rose-50 text-rose-700 border border-rose-200 font-semibold";
                  tabIcon = <AlertCircle className="w-3 h-3 text-rose-600" />;
                } else if (chStatus === "skipped") {
                  tabStyle =
                    "bg-[#F0F0ED] text-[#8A8A8A] border border-[#E6E6E3]";
                  tabIcon = <MinusCircle className="w-3 h-3 text-[#8A8A8A]" />;
                }

                return (
                  <button
                    key={ch.id}
                    onClick={() => setCurrentLevelIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code whitespace-nowrap transition-all flex items-center gap-1.5 ${tabStyle}`}
                  >
                    <span>
                      {t.lab.game.levelTag} 0{ch.order}
                    </span>
                    {tabIcon}
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
                const isSelected = activeState.selectedOptionIds.includes(opt.id);
                const isChecked = activeState.isChecked;
                const status = activeState.status;
                const isCorrectAnswer = activeChallenge.correctAnswers.includes(
                  opt.id
                );

                let cardStyle =
                  "bg-white border-[#E6E6E3] text-[#171717] hover:border-[#171717]";
                let iconStyle = "bg-[#F0F0ED] border-[#E6E6E3]";
                let indicatorIcon = null;

                if (!isChecked) {
                  // Before check: selected options use neutral dark border (NEVER GREEN)
                  if (isSelected) {
                    cardStyle =
                      "bg-[#F7F7F5] border-[#171717] text-[#171717] font-bold shadow-xs";
                    iconStyle = "bg-white border-[#171717]";
                  }
                } else {
                  // After check
                  if (status === "correct") {
                    if (isSelected) {
                      cardStyle =
                        "bg-[#E6F9F5] border-[#00695C] text-[#00695C] font-bold ring-2 ring-[#00695C]";
                      iconStyle = "bg-white border-[#00695C]";
                      indicatorIcon = (
                        <CheckCircle2 className="w-5 h-5 text-[#00695C] shrink-0" />
                      );
                    }
                  } else if (status === "incorrect") {
                    if (isSelected && !isCorrectAnswer) {
                      // Selected wrong option -> Error Rose/Amber (NEVER GREEN)
                      cardStyle =
                        "bg-rose-50 border-rose-300 text-rose-900 font-bold ring-1 ring-rose-300";
                      iconStyle = "bg-white border-rose-300";
                      indicatorIcon = (
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      );
                    } else if (isCorrectAnswer) {
                      // Reveal correct answer subtly
                      cardStyle =
                        "bg-[#E6F9F5]/60 border-[#00695C]/40 text-[#00695C] font-medium";
                      iconStyle = "bg-white border-[#00695C]";
                      indicatorIcon = (
                        <CheckCircle2 className="w-5 h-5 text-[#00695C]/60 shrink-0" />
                      );
                    }
                  }
                }

                return (
                  <motion.button
                    key={opt.id}
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    onClick={() => handleToggleOption(opt.id)}
                    className={`p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${cardStyle}`}
                  >
                    <div className={`p-3 rounded-xl border ${iconStyle}`}>
                      {getOptionIcon(opt.id)}
                    </div>

                    <span className="text-sm sm:text-base font-bold flex-1">
                      {opt.locales?.[locale]?.label || opt.id}
                    </span>

                    {indicatorIcon}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Alert Box (Active after check or empty prompt) */}
            {activeState.feedbackMessage && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 w-full ${
                  activeState.status === "correct"
                    ? "bg-[#E6F9F5] border-[#B2F3E5] text-[#00695C]"
                    : activeState.status === "incorrect"
                    ? "bg-rose-50 border-rose-200 text-rose-800"
                    : "bg-[#F7F7F5] border-[#E6E6E3] text-[#666666]"
                }`}
              >
                <span className="text-xs sm:text-sm font-bold">
                  {activeState.feedbackMessage}
                </span>

                {/* THE SINGLE & ONLY NEXT/RESULTS BUTTON AFTER VALIDATION */}
                {activeState.isChecked && (
                  <button
                    onClick={handleNextLevel}
                    className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#171717] text-white text-xs font-bold hover:bg-[#00695C] transition-colors shrink-0 shadow-xs active:scale-98"
                  >
                    <span>{nextActionLabel}</span>
                  </button>
                )}
              </motion.div>
            )}

            {/* Action Bar (Active ONLY before validation - ZERO DUPLICATES!) */}
            {!activeState.isChecked && (
              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  onClick={handleSkip}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#8A8A8A] hover:text-[#171717] hover:bg-[#F0F0ED] transition-all"
                >
                  <span>{t.lab.game.skipBtn}</span>
                </button>

                <button
                  onClick={handleCheck}
                  disabled={activeState.selectedOptionIds.length === 0}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#171717] text-white font-bold text-xs hover:bg-[#00695C] transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>{t.lab.game.checkBtn}</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* State 3: Final Result */}
        {gameState === "result" && (
          <motion.div
            key="result"
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }
            }
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
                {calculatedScore} / {initialChallenges.length}
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-medium">
                {calculatedScore === initialChallenges.length
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
