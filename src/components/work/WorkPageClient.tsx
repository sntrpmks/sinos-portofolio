"use client";

import React from "react";
import { Project } from "@/types/content";
import { CaseFileGrid } from "@/components/projects/CaseFileGrid";
import { useViewMode } from "@/components/context/ViewModeContext";
import { FolderGit2 } from "lucide-react";

interface WorkPageClientProps {
  projects: Project[];
}

export function WorkPageClient({ projects }: WorkPageClientProps) {
  const { locale } = useViewMode();

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-[#E6E6E3] pb-6">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-[#00695C]" />
          <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-widest">
            {locale === "id" ? "STUDI KASUS PORTOFOLIO" : "PORTFOLIO CASE STUDIES"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
          {locale === "id" ? "Karya & Proyek Pilihan" : "Selected Work & Projects"}
        </h1>
        <p className="text-sm text-[#666666] max-w-2xl">
          {locale === "id"
            ? "Studi kasus mendalam mengenai aplikasi perangkat lunak, platform, dan alat digital. Setiap proyek mencakup konteks masalah, topologi arsitektur, detail implementasi, dan pelajaran rekayasa."
            : "Detailed case studies of software applications, platforms, and digital tools. Every project includes problem context, architecture topology, implementation details, and lessons learned."}
        </p>
      </div>

      {/* Case File Grid Component */}
      <CaseFileGrid projects={projects} />
    </div>
  );
}
