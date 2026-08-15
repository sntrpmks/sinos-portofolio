"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/types/content";
import { useViewMode } from "@/components/context/ViewModeContext";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle, Lightbulb, Trophy } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";

interface CaseFileDetailClientProps {
  project: Project;
}

export function CaseFileDetailClient({ project }: CaseFileDetailClientProps) {
  const { locale } = useViewMode();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col gap-10">
      {/* Back Link */}
      <Link
        href="/work"
        className="flex items-center gap-2 text-xs font-semibold text-[#666666] hover:text-[#171717] transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>
          {locale === "id" ? "KEMBALI KE PORTOFOLIO PROJECT" : "BACK TO CASE FILES"}
        </span>
      </Link>

      {/* Case File Header */}
      <div className="card-minimal p-8 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E6E3] pb-4">
          <div className="flex items-center gap-3 font-mono-code text-xs">
            <span className="px-2.5 py-0.5 rounded bg-[#E6F9F5] text-[#00695C] font-bold border border-[#B2F3E5]">
              {project.caseFileId}
            </span>
            <span className="text-[#666666] font-medium">
              {locale === "id" ? "STATUS: TERVERIFIKASI" : `STATUS: ${project.status.toUpperCase()}`}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] hover:border-[#171717] transition-all"
              >
                <GithubIcon className="w-4 h-4 text-[#171717]" />
                <span>Source Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171717] text-white font-medium hover:bg-[#00695C] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{locale === "id" ? "Demo" : "Live Demo"}</span>
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171717]">{project.title}</h1>
          <p className="text-xs font-mono-code text-[#00695C] font-semibold">
            {locale === "id" ? "Peran" : "Role"}: {project.role} • {locale === "id" ? "Tahun" : "Year"}: {project.year}
          </p>
        </div>

        <p className="text-base text-[#2A2A2A] leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg bg-[#F0F0ED] text-xs font-mono-code text-[#171717] border border-[#E6E6E3]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Application Screenshots & Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <ProjectGallery gallery={project.gallery} projectTitle={project.title} />
      )}

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-minimal p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#171717]">
            <AlertTriangle className="w-5 h-5 text-[#8A8A8A]" />
            <h3 className="text-base font-bold">
              {locale === "id" ? "Konteks Masalah" : "The Problem Context"}
            </h3>
          </div>
          <p className="text-sm text-[#2A2A2A] leading-relaxed">{project.problem}</p>
        </div>

        <div className="card-minimal p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#171717]">
            <CheckCircle2 className="w-5 h-5 text-[#00695C]" />
            <h3 className="text-base font-bold">
              {locale === "id" ? "Solusi Rekayasa" : "The Engineering Solution"}
            </h3>
          </div>
          <p className="text-sm text-[#2A2A2A] leading-relaxed">{project.solution}</p>
        </div>
      </div>

      {/* Architecture Topology */}
      <ArchitectureDiagram nodes={project.architecture} />

      {/* Implementation Highlights */}
      <div className="card-minimal p-6 flex flex-col gap-4">
        <h3 className="text-base font-bold text-[#171717] border-b border-[#E6E6E3] pb-3">
          {locale === "id" ? "Sorotan Implementasi" : "Implementation Highlights"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.implementation.map((step, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] flex items-start gap-3">
              <span className="font-mono-code font-bold text-[#00695C] text-xs mt-0.5">0{idx + 1}.</span>
              <p className="text-xs text-[#2A2A2A] leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Results & Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-minimal p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-[#E6E6E3] pb-3">
            <Trophy className="w-5 h-5 text-[#00695C]" />
            <h3 className="text-base font-bold text-[#171717]">
              {locale === "id" ? "Hasil Terukur" : "Measurable Results"}
            </h3>
          </div>
          <ul className="flex flex-col gap-2 font-normal text-xs text-[#2A2A2A]">
            {project.results.map((res, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00695C] shrink-0 mt-0.5" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-minimal p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-[#E6E6E3] pb-3">
            <Lightbulb className="w-5 h-5 text-[#171717]" />
            <h3 className="text-base font-bold text-[#171717]">
              {locale === "id" ? "Pelajaran Rekayasa" : "Engineering Lessons"}
            </h3>
          </div>
          <ul className="flex flex-col gap-2 font-normal text-xs text-[#2A2A2A]">
            {project.lessons.map((les, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#171717] shrink-0 mt-1.5" />
                <span>{les}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
