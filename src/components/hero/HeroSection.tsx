"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useViewMode } from "@/components/context/ViewModeContext";

export function HeroSection() {
  const { setAiModalOpen, t } = useViewMode();

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-6 max-w-3xl">
        {/* Identity Subhead */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#00695C]">
            {t.hero.identityTag}
          </span>
          <span className="text-xs text-[#8A8A8A] font-mono-code">•</span>
          <span className="text-xs text-[#666666] font-medium">{t.hero.location}</span>
        </motion.div>

        {/* Large Editorial Title & Professional Headline */}
        <div className="flex flex-col gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="heading-editorial font-extrabold text-[#171717] tracking-tight leading-[1.05]"
          >
            {t.hero.headlineTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="text-xl sm:text-2xl font-semibold text-[#666666] tracking-tight"
          >
            {t.hero.headlineSub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.22 }}
            className="text-base sm:text-lg text-[#2A2A2A] leading-relaxed max-w-2xl font-normal"
          >
            {t.hero.intro}
          </motion.p>
        </div>

        {/* Clean Dual CTAs: View my work & Ask SIN.OS */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <Link
            href="/work"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#171717] text-white font-medium text-sm hover:bg-[#00695C] transition-colors shadow-xs"
          >
            <span>{t.hero.ctaWork}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setAiModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#E6F9F5] text-[#00695C] border border-[#B2F3E5] font-semibold text-sm hover:bg-[#A9F1DF] hover:text-[#171717] hover:border-[#A9F1DF] transition-all shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.hero.ctaAi}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
