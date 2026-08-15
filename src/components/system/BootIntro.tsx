"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, CheckCircle, SkipForward } from "lucide-react";

export function BootIntro() {
  const [booting, setBooting] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const bootSteps = [
    "INITIALIZING SIN.OS v2026.1...",
    "Loading portfolio domain schemas...",
    "Loading case files & project telemetry...",
    "Mounting glassmorphic UI engine...",
    "Securing API endpoints & Gemini connectors...",
    "SYSTEM ONLINE. Welcome to SIN.OS.",
  ];

  useEffect(() => {
    // Check if user already booted in this session
    const hasBooted = sessionStorage.getItem("sinos_booted");
    if (hasBooted === "true") {
      setBooting(false);
      return;
    }

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < bootSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setBooting(false);
            sessionStorage.setItem("sinos_booted", "true");
          }, 600);
          return prev;
        }
      });
    }, 350);

    return () => clearInterval(interval);
  }, [bootSteps.length]);

  const skipBoot = () => {
    setBooting(false);
    sessionStorage.setItem("sinos_booted", "true");
  };

  return (
    <AnimatePresence>
      {booting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#070b12] flex flex-col items-center justify-center p-6"
        >
          {/* Ambient background light */}
          <div className="absolute w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="w-full max-w-lg glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono-code text-xs text-slate-400">
                  sin.os // boot-sequence
                </span>
              </div>
              <button
                onClick={skipBoot}
                className="flex items-center gap-1 text-[11px] font-mono-code text-slate-400 hover:text-sky-400 transition-colors"
              >
                <span>SKIP INTRO</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Boot console text */}
            <div className="font-mono-code text-xs flex flex-col gap-2 min-h-[160px]">
              {bootSteps.slice(0, stepIndex + 1).map((text, idx) => {
                const isLast = idx === bootSteps.length - 1 && stepIndex === bootSteps.length - 1;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-2 ${
                      isLast ? "text-emerald-400 font-bold text-sm pt-2" : "text-slate-300"
                    }`}
                  >
                    {isLast ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5 text-sky-400/80" />
                    )}
                    <span>{text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Loading Bar */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] font-mono-code text-slate-400">
                <span>SYSTEM STATUS</span>
                <span>{Math.round(((stepIndex + 1) / bootSteps.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-yellow-400"
                  animate={{ width: `${((stepIndex + 1) / bootSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
