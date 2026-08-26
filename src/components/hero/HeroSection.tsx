"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useViewMode } from "@/components/context/ViewModeContext";

export function HeroSection() {
  const { t } = useViewMode();

  return (
    <section className="relative pt-24 pb-20 px-4 sm:px-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-6 max-w-3xl">
        {/* Identity Subhead */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#00695C]">
            {t.hero.identityTag}
          </span>
          <span className="text-xs text-[#8A8A8A] font-mono-code">•</span>
          <span className="text-xs text-[#666666] font-medium">{t.hero.location}</span>
        </motion.div>

        {/* Large Editorial Title & Professional Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.08, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.0, ease: "easeOut" }}
            className="heading-editorial font-extrabold text-[#171717] tracking-tight leading-[1.05]"
          >
            {t.hero.headlineTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.08, ease: "easeOut" }}
            className="text-xl sm:text-2xl font-semibold text-[#666666] tracking-tight"
          >
            {t.hero.headlineSub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.16, ease: "easeOut" }}
            className="text-base sm:text-lg text-[#2A2A2A] leading-relaxed max-w-2xl font-normal"
          >
            {t.hero.intro}
          </motion.p>
        </motion.div>

        {/* Clean Dual CTAs: View my work & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.22, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <Link
            href="/work"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#171717] text-white font-medium text-sm hover:bg-[#00695C] transition-colors shadow-xs"
          >
            <span>{t.hero.ctaWork}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] font-semibold text-sm hover:border-[#171717] transition-all shadow-xs"
          >
            <span>{t.nav.contact}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
