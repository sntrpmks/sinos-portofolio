"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HeroSection } from "@/components/hero/HeroSection";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useViewMode } from "@/components/context/ViewModeContext";
import { getLocalizedProject, getLocalizedTechItem } from "@/lib/content-helpers";
import { Project, Experience, TechItem, Certificate } from "@/types/content";
import { ArrowRight, Mail, Sparkles, UserCheck } from "lucide-react";

interface HomePageClientProps {
  projects: Project[];
  experiences: Experience[];
  skills: TechItem[];
  certificates: Certificate[];
}

export function HomePageClient({ projects, skills }: HomePageClientProps) {
  const { locale, setAiModalOpen, t } = useViewMode();
  const shouldReduceMotion = useReducedMotion();

  // Selected featured projects (Web Event & CashFlowKu)
  const selectedProjects = projects.slice(0, 2);

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* 01. HERO SECTION */}
      <HeroSection />

      {/* Main Single Unified Flow Container */}
      <div className="px-4 sm:px-8 max-w-5xl mx-auto w-full flex flex-col gap-20">
        {/* 02. SELECTED WORK */}
        <SectionReveal className="flex flex-col gap-10">
          <div className="flex items-end justify-between border-b border-[#E6E6E3] pb-4">
            <div>
              <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#00695C]">
                {t.selectedWork.tag}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight leading-none mt-1">
                {t.selectedWork.titleMain}
                <span className="text-[#00695C]">{t.selectedWork.titleAccent}</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#00695C] hover:underline mb-1"
            >
              <span>{t.selectedWork.exploreAll}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-12">
            {selectedProjects.map((rawProj, index) => {
              const project = getLocalizedProject(rawProj, locale);
              return (
                <motion.div
                  key={project.slug}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-stretch gap-8 card-minimal p-6 sm:p-8 card-minimal-interactive group`}
                >
                  {/* Project Image Box */}
                  <div className="w-full lg:w-1/2 h-64 sm:h-72 relative rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] overflow-hidden shrink-0">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#8A8A8A] p-4 text-center">
                        <span className="text-xs font-mono-code font-bold text-[#171717]">
                          {project.caseFileId}
                        </span>
                        <span className="text-base font-bold text-[#171717]">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs font-mono-code text-[#666666]">
                        <span className="font-bold text-[#00695C] uppercase">
                          {project.caseFileId}
                        </span>
                        <span>
                          {project.year} • {project.role}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] group-hover:text-[#00695C] transition-colors leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-[#F0F0ED] border border-[#E6E6E3] text-[11px] font-mono-code text-[#171717]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/work/${project.slug}`}
                      className="flex items-center justify-between px-5 py-3 rounded-xl bg-[#171717] text-white font-medium text-xs hover:bg-[#00695C] transition-colors shadow-xs group-hover:shadow-md"
                    >
                      <span>{t.selectedWork.viewCaseStudy}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionReveal>

        {/* 03. CAPABILITIES */}
        <SectionReveal className="flex flex-col gap-8">
          <div className="flex items-end justify-between border-b border-[#E6E6E3] pb-4">
            <div>
              <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#00695C]">
                {t.capabilities.tag}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight leading-none mt-1">
                {t.capabilities.titleMain}
                <span className="text-[#00695C]">{t.capabilities.titleAccent}</span>
              </h2>
            </div>
            <span className="text-xs font-mono-code text-[#8A8A8A] mb-1">
              {t.capabilities.subhead}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((rawSkill) => {
              const skill = getLocalizedTechItem(rawSkill, locale);
              return (
                <motion.div
                  key={skill.id}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  className="card-minimal p-5 flex flex-col justify-between gap-3 card-minimal-interactive"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-mono-code font-bold text-[#00695C] uppercase">
                      {skill.category === "AI & Integration" && locale === "id"
                        ? "Integrasi AI"
                        : skill.category}
                    </span>
                    <h3 className="text-base font-bold text-[#171717]">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-[#666666] leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E6E6E3] text-[11px] font-mono-code text-[#8A8A8A]">
                    {t.capabilities.verifiedIn} {skill.projectCount}{" "}
                    {t.capabilities.projectsCount}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionReveal>

        {/* 04. ABOUT & JOURNEY SUMMARY */}
        <SectionReveal className="flex flex-col gap-8">
          <div className="flex items-end justify-between border-b border-[#E6E6E3] pb-4">
            <div>
              <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#00695C]">
                {t.about.tag}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight leading-none mt-1">
                {t.about.titleMain}
                <span className="text-[#00695C]">{t.about.titleAccent}</span>
              </h2>
            </div>
            <Link
              href="/about"
              className="text-xs font-semibold text-[#00695C] hover:underline mb-1"
            >
              {t.about.readFullBio}
            </Link>
          </div>

          <div className="card-minimal p-7 sm:p-9 flex flex-col md:flex-row items-start justify-between gap-8 border-l-4 border-l-[#00695C]">
            <div className="flex flex-col gap-4 max-w-xl">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#00695C]" />
                <span className="text-xs font-mono-code font-bold text-[#00695C] uppercase tracking-widest">
                  {t.about.subhead}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#2A2A2A] leading-relaxed">
                {t.about.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#666666]">
                <span>• {t.about.internship}</span>
                <span>• {t.about.location}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 shrink-0 w-full md:w-auto pt-2 md:pt-0">
              <Link
                href="/about"
                className="px-5 py-3 rounded-xl bg-[#171717] text-white font-medium text-xs text-center hover:bg-[#00695C] transition-colors shadow-xs"
              >
                {t.about.btnPhilosophy}
              </Link>
              <Link
                href="/journey"
                className="px-5 py-3 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] font-semibold text-xs text-center hover:bg-[#E6E6E3] transition-colors"
              >
                {t.about.btnTimeline}
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* 05. ASK SIN.OS AI UTILITY CARD */}
      <SectionReveal className="px-4 sm:px-8 max-w-5xl mx-auto w-full mt-4">
        <div className="card-minimal p-7 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-[#00695C]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#00695C] font-mono-code text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>{t.aiUtility.tag}</span>
            </div>
            <h3 className="text-xl font-bold text-[#171717]">{t.aiUtility.title}</h3>
            <p className="text-xs sm:text-sm text-[#666666] max-w-xl">
              {t.aiUtility.description}
            </p>
          </div>

          <button
            onClick={() => setAiModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-[#171717] text-white font-medium text-xs hover:bg-[#00695C] transition-colors shrink-0 shadow-xs"
          >
            {t.aiUtility.cta}
          </button>
        </div>
      </SectionReveal>

      {/* 06. CONTACT SECTION */}
      <SectionReveal className="px-4 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="card-minimal p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#00695C]">
              {t.contact.tag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight leading-none">
              {t.contact.titleMain}
              <span className="text-[#00695C]">{t.contact.titleAccent}</span>
            </h2>
            <p className="text-sm text-[#666666] max-w-md leading-relaxed">
              {t.contact.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#171717] text-white font-medium text-xs hover:bg-[#00695C] transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>{t.contact.cta}</span>
            </Link>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
