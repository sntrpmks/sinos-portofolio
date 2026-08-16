"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import { DebugChallenge } from "@/types/lab";
import { validateDebugAnswer } from "@/features/lab/debug-sinos/domain/debug-validator";
import {
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  MinusCircle,
  Trophy,
  Bug,
  Globe,
  Database,
  FolderArchive,
  Moon,
  Film,
  Type,
  Camera,
  ImageIcon,
  Zap,
  MousePointerClick,
  Check,
  X,
} from "lucide-react";

export type DebugStatus = "unanswered" | "selected" | "correct" | "incorrect" | "skipped";

export interface DebugLevelState {
  selectedOptionId: string | null;
  status: DebugStatus;
  feedbackMessage: string;
  isChecked: boolean;
}

interface DebugModuleProps {
  initialChallenges: DebugChallenge[];
}

export default function DebugModule({ initialChallenges }: DebugModuleProps) {
  const { locale, t } = useViewMode();
  const shouldReduceMotion = useReducedMotion();

  // Game flow state: "intro" | "playing" | "result"
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  // Per-level state dictionary keyed strictly by challenge.id
  const [levelStates, setLevelStates] = useState<Record<string, DebugLevelState>>(() => {
    const initial: Record<string, DebugLevelState> = {};
    initialChallenges.forEach((ch) => {
      initial[ch.id] = {
        selectedOptionId: null,
        status: "unanswered",
        feedbackMessage: "",
        isChecked: false,
      };
    });
    return initial;
  });

  const [highScore, setHighScore] = useState<number>(0);

  const activeChallenge = initialChallenges[currentLevelIndex] || initialChallenges[0];
  const activeState: DebugLevelState = levelStates[activeChallenge.id] || {
    selectedOptionId: null,
    status: "unanswered",
    feedbackMessage: "",
    isChecked: false,
  };

  const isLastLevel = currentLevelIndex === initialChallenges.length - 1;
  const nextActionLabel = isLastLevel
    ? t.lab.debugGame.seeResultsBtn
    : t.lab.debugGame.nextBtn;

  // Read high score from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sinos_debug_highscore");
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
      case "comp-storage":
        return <FolderArchive className="w-5 h-5 text-[#00695C]" />;
      case "comp-database":
        return <Database className="w-5 h-5 text-[#171717]" />;
      case "comp-[#frontend]":
      case "comp-frontend":
        return <Globe className="w-5 h-5 text-[#00695C]" />;
      case "comp-api":
        return <Globe className="w-5 h-5 text-indigo-600" />;
      case "comp-darkmode":
        return <Moon className="w-5 h-5 text-indigo-600" />;
      case "comp-animation":
        return <Film className="w-5 h-5 text-[#00695C]" />;
      case "comp-camera":
        return <Camera className="w-5 h-5 text-purple-600" />;
      case "comp-font":
        return <Type className="w-5 h-5 text-slate-700" />;
      case "comp-wallpaper":
        return <ImageIcon className="w-5 h-5 text-emerald-600" />;
      case "comp-form-event":
        return <MousePointerClick className="w-5 h-5 text-amber-600" />;
      default:
        return <Zap className="w-5 h-5 text-[#00695C]" />;
    }
  };

  // Toggle option selection for active challenge
  const handleSelectOption = (optionId: string) => {
    if (activeState.isChecked && activeState.status === "correct") return;

    setLevelStates((prev) => ({
      ...prev,
      [activeChallenge.id]: {
        selectedOptionId: optionId,
        status: "selected",
        feedbackMessage: "",
        isChecked: false,
      },
    }));
  };

  // Check answer for active challenge
  const handleCheck = () => {
    if (!activeState.selectedOptionId) {
      setLevelStates((prev) => ({
        ...prev,
        [activeChallenge.id]: {
          ...prev[activeChallenge.id],
          feedbackMessage: t.lab.debugGame.emptyPrompt,
        },
      }));
      return;
    }

    const result = validateDebugAnswer(
      activeChallenge,
      activeState.selectedOptionId
    );

    let randomMsg = "";
    if (result.correct) {
      const phrases = t.lab.debugGame.correctFeedback;
      randomMsg = phrases[Math.floor(Math.random() * phrases.length)];
    } else {
      const phrases = t.lab.debugGame.incorrectFeedback;
      randomMsg = phrases[Math.floor(Math.random() * phrases.length)];
      if (activeChallenge.locales?.[locale]?.hint) {
        randomMsg += ` (${activeChallenge.locales[locale].hint})`;
      }
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
        selectedOptionId: null,
        status: "skipped",
        feedbackMessage: t.lab.debugGame.skippedFeedback,
        isChecked: true,
      },
    }));
  };

  // Move to next level / finish game
  const handleNextLevel = () => {
    if (!activeState.isChecked) {
      setLevelStates((prev) => ({
        ...prev,
        [activeChallenge.id]: {
          selectedOptionId: null,
          status: "skipped",
          feedbackMessage: t.lab.debugGame.skippedFeedback,
          isChecked: true,
        },
      }));
    }

    if (currentLevelIndex < initialChallenges.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      const finalScore = Object.values(levelStates).filter(
        (s) => s.status === "correct"
      ).length;

      if (finalScore > highScore) {
        setHighScore(finalScore);
        try {
          localStorage.setItem(
            "sinos_debug_highscore",
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
    const resetStates: Record<string, DebugLevelState> = {};
    initialChallenges.forEach((ch) => {
      resetStates[ch.id] = {
        selectedOptionId: null,
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
            {t.lab.debugGame.highScore}: {highScore} / {initialChallenges.length}
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
              <Bug className="w-8 h-8" />
            </div>

            <div className="flex flex-col gap-2 max-w-md">
              <span className="text-xs font-mono-code font-bold text-[#00695C] uppercase tracking-widest">
                DEBUG SIN.OS
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                {t.lab.debugGame.introTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                {t.lab.debugGame.introDesc}
              </p>
            </div>

            <button
              onClick={() => setGameState("playing")}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#171717] text-white font-bold text-sm hover:bg-[#00695C] transition-all shadow-md active:scale-98"
            >
              <span>{t.lab.debugGame.letsGo}</span>
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
                      {t.lab.debugGame.levelTag} 0{ch.order}
                    </span>
                    {tabIcon}
                  </button>
                );
              })}
            </div>

            {/* Scenario Card */}
            <div className="card-minimal p-6 sm:p-8 flex flex-col gap-4 border-l-4 border-l-[#00695C] bg-white">
              <span className="text-xs font-mono-code text-[#00695C] font-semibold">
                {activeIntro}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
                {activePrompt}
              </h2>

              {/* Optional System Status Clue View (e.g. Level 4) */}
              {activeChallenge.systemStatus && (
                <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#E6E6E3] flex flex-col gap-2 font-mono-code text-xs">
                  <span className="text-[10px] text-[#8A8A8A] font-bold uppercase tracking-wider">
                    {t.lab.debugGame.systemStatusHeader}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {activeChallenge.systemStatus.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-1 border-b border-[#E6E6E3] last:border-0"
                      >
                        <span className="font-semibold text-[#171717]">
                          {item.name}
                        </span>
                        {item.status === "online" ? (
                          <span className="flex items-center gap-1 text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <Check className="w-3 h-3" /> ONLINE
                          </span>
                        ) : item.status === "error" ? (
                          <span className="flex items-center gap-1 text-rose-700 font-bold text-[11px] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            <X className="w-3 h-3" /> ERROR
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-700 font-bold text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            ● CHECKING
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Option Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeChallenge.options.map((opt) => {
                const isSelected = activeState.selectedOptionId === opt.id;
                const isChecked = activeState.isChecked;
                const status = activeState.status;
                const isCorrectAnswer = opt.id === activeChallenge.correctAnswer;

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
                    onClick={() => handleSelectOption(opt.id)}
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
                  <span>{t.lab.debugGame.skipBtn}</span>
                </button>

                <button
                  onClick={handleCheck}
                  disabled={!activeState.selectedOptionId}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#171717] text-white font-bold text-xs hover:bg-[#00695C] transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>{t.lab.debugGame.checkBtn}</span>
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
                {t.lab.debugGame.debuggedIt}
              </span>
              <h2 className="text-3xl font-extrabold text-[#171717]">
                {calculatedScore} / {initialChallenges.length}
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-medium">
                {calculatedScore === initialChallenges.length
                  ? t.lab.debugGame.fullScoreNote
                  : t.lab.debugGame.partialScoreNote}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#E6E6E3] w-full">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] font-semibold text-xs hover:border-[#171717] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.lab.debugGame.playAgain}</span>
              </button>

              <Link
                href="/work"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171717] text-white font-semibold text-xs hover:bg-[#00695C] transition-colors shadow-xs"
              >
                <span>{t.lab.debugGame.exploreProjects}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
