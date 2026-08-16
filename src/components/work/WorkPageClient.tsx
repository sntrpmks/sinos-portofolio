"use client";

import React from "react";
import { Project } from "@/types/content";
import { CaseFileGrid } from "@/components/projects/CaseFileGrid";
import { SectionReveal } from "@/components/ui/SectionReveal";
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
      <SectionReveal className="flex flex-col gap-3 border-b border-[#E6E6E3] pb-6">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-[#00695C]" />
          <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-widest">
            {locale === "id" ? "PORTOFOLIO PROJECT" : "PORTFOLIO PROJECTS"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
          {locale === "id" ? "Project & Karya Pilihan" : "Selected Work & Projects"}
        </h1>
        <p className="text-sm text-[#666666] max-w-2xl">
          {locale === "id"
            ? "Studi kasus lengkap mengenai aplikasi web, mobile, dan sistem software yang pernah saya bangun. Setiap project mencakup penjelasan masalah, arsitektur, alur implementasi, dan pelajaran yang didapat."
            : "Detailed case studies of web applications, mobile apps, and software systems I have built. Each project includes the problem context, system architecture, implementation details, and key lessons."}
        </p>
      </SectionReveal>

      {/* Case File Grid Component */}
      <CaseFileGrid projects={projects} />
    </div>
  );
}


