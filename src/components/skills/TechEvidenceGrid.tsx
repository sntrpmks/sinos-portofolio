"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { TechItem } from "@/types/content";
import { useViewMode } from "@/components/context/ViewModeContext";
import { getLocalizedTechItem } from "@/lib/content-helpers";

interface TechEvidenceGridProps {
  skills: TechItem[];
}

export function TechEvidenceGrid({ skills }: TechEvidenceGridProps) {
  const { locale } = useViewMode();
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categoryMap: Record<string, string> = {
    All: locale === "id" ? "Semua" : "All",
    Frontend: "Frontend",
    Backend: "Backend",
    "AI & Integration": locale === "id" ? "Integrasi AI" : "AI & Integration",
  };

  const categories = ["All", "Frontend", "Backend", "AI & Integration"];

  const filteredSkills = skills.filter((s) => {
    if (selectedCategory === "All") return true;
    return s.category === selectedCategory;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-[#F0F0ED] p-1 rounded-xl border border-[#E6E6E3] font-mono-code text-xs w-fit overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-white text-[#171717] font-bold shadow-xs border border-[#E6E6E3]"
                : "text-[#666666] hover:text-[#171717]"
            }`}
          >
            {categoryMap[cat] || cat}
          </button>
        ))}
      </div>

      {/* Grid of Evidence Cards */}
      <motion.div
        key={selectedCategory}
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredSkills.map((rawItem) => {
          const item = getLocalizedTechItem(rawItem, locale);
          return (
            <motion.div
              key={item.id}
              variants={shouldReduceMotion ? undefined : itemVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="card-minimal p-5 flex flex-col justify-between gap-4 card-minimal-interactive"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-code text-[#00695C] font-bold uppercase">
                    {item.category === "AI & Integration" && locale === "id" ? "Integrasi AI" : item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#E6F9F5] text-[#00695C] text-[10px] font-mono-code border border-[#B2F3E5] font-semibold">
                    {locale === "id" ? "TERVERIFIKASI" : `EVIDENCE: ${item.evidenceLevel}`}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#171717]">{item.name}</h4>
                <p className="text-xs text-[#2A2A2A] leading-relaxed">{item.description}</p>
              </div>

              <div className="flex flex-col gap-1.5 pt-3 border-t border-[#E6E6E3] font-mono-code text-xs">
                <span className="text-[#8A8A8A] text-[11px]">
                  {locale === "id" ? "Project Terkait:" : "Proof Projects:"}
                </span>
                <div className="flex flex-wrap gap-1 text-[11px] text-[#666666]">
                  {item.evidenceProjects.join(" · ")}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}


