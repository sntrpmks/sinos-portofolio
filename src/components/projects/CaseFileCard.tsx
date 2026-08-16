"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/types/content";
import { useViewMode } from "@/components/context/ViewModeContext";
import { getLocalizedProject } from "@/lib/content-helpers";
import { ArrowRight, FolderGit2 } from "lucide-react";

interface CaseFileCardProps {
  project: Project;
}

export function CaseFileCard({ project }: CaseFileCardProps) {
  const { locale, t } = useViewMode();
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const activeProj = getLocalizedProject(project, locale);

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className="card-minimal card-minimal-interactive p-6 flex flex-col justify-between gap-6 group"
    >
      {/* Large Image Area */}
      <div className="w-full h-52 sm:h-60 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] overflow-hidden relative flex items-center justify-center">
        {activeProj.coverImage && !imgError ? (
          <Image
            src={activeProj.coverImage}
            alt={activeProj.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#8A8A8A]">
            <FolderGit2 className="w-10 h-10 text-[#666666]" />
            <span className="text-xs font-mono-code font-bold">{activeProj.caseFileId}</span>
          </div>
        )}
      </div>

      {/* Content Meta */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono-code text-[#666666]">
          <span>{activeProj.caseFileId}</span>
          <span>{activeProj.year}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold text-[#171717] tracking-tight group-hover:text-[#00695C] transition-colors">
            {activeProj.title}
          </h3>
          <span className="text-xs text-[#666666] font-medium">{activeProj.role}</span>
        </div>

        <p className="text-sm text-[#2A2A2A] leading-relaxed line-clamp-3 font-normal">
          {activeProj.summary}
        </p>
      </div>

      {/* Footer Action */}
      <div className="flex flex-col gap-4 pt-4 border-t border-[#E6E6E3]">
        <div className="flex flex-wrap gap-1.5 text-xs font-mono-code text-[#666666]">
          <span className="text-[#8A8A8A]">{locale === "id" ? "Teknologi:" : "Tech:"}</span>
          {activeProj.technologies.slice(0, 4).join(" · ")}
        </div>

        <Link
          href={`/work/${activeProj.slug}`}
          className="flex items-center justify-between text-xs font-semibold text-[#171717] group-hover:text-[#00695C] transition-colors"
        >
          <span>{t.selectedWork.viewCaseStudy}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}


