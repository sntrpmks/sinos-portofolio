import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FlaskConical, Layers, Bug, Terminal, ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { Locale, translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "SIN.OS Lab — Interactive System Experiments",
  description:
    "Explore interactive architecture puzzles, developer challenges, and system design experiments built inside SIN.OS.",
  openGraph: {
    title: "SIN.OS Lab — Interactive System Experiments",
    description:
      "Explore interactive architecture puzzles, developer challenges, and system design experiments.",
  },
};

export default async function LabPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("sinos_locale")?.value;
  const locale: Locale = localeCookie === "id" ? "id" : "en";
  const t = translations[locale];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col gap-12">
      {/* Lab Header */}
      <SectionReveal className="flex flex-col gap-3 border-b border-[#E6E6E3] pb-6">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-[#00695C]" />
          <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-widest">
            {t.lab.tag}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
          {t.lab.titleMain}
          <span className="text-[#00695C]">{t.lab.titleAccent}</span>
        </h1>
        <p className="text-sm text-[#666666] max-w-2xl">{t.lab.subtitle}</p>
      </SectionReveal>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Experiment 01: Stack Builder (Playable) */}
        <SectionReveal className="card-minimal p-6 flex flex-col justify-between gap-6 border-l-4 border-l-[#00695C] card-minimal-interactive group bg-white shadow-xs">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C]">
                <Layers className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#E6F9F5] text-[#00695C] text-[10px] font-mono-code font-bold border border-[#B2F3E5]">
                {t.lab.playableTag}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-[#171717] group-hover:text-[#00695C] transition-colors">
                {t.lab.buildAppTitle}
              </h2>
              <p className="text-xs text-[#666666] leading-relaxed">
                {t.lab.buildAppDesc}
              </p>
            </div>
          </div>

          <Link
            href="/lab/stack-builder"
            className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#171717] text-white font-medium text-xs hover:bg-[#00695C] transition-colors shadow-xs"
          >
            <span>{t.lab.playBtn}</span>
          </Link>
        </SectionReveal>

        {/* Experiment 02: Debug SIN.OS (Playable) */}
        <SectionReveal className="card-minimal p-6 flex flex-col justify-between gap-6 border-l-4 border-l-[#00695C] card-minimal-interactive group bg-white shadow-xs">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C]">
                <Bug className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#E6F9F5] text-[#00695C] text-[10px] font-mono-code font-bold border border-[#B2F3E5]">
                {t.lab.playableTag}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-[#171717] group-hover:text-[#00695C] transition-colors">
                {t.lab.debugTitle}
              </h2>
              <p className="text-xs text-[#666666] leading-relaxed">
                {t.lab.debugDesc}
              </p>
            </div>
          </div>

          <Link
            href="/lab/debug-sinos"
            className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#171717] text-white font-medium text-xs hover:bg-[#00695C] transition-colors shadow-xs"
          >
            <span>{t.lab.playBtn}</span>
          </Link>
        </SectionReveal>

        {/* Experiment 03: Terminal Mission (Coming Soon) */}
        <SectionReveal className="card-minimal p-6 flex flex-col justify-between gap-6 opacity-80 bg-[#F9F9F8]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#8A8A8A]">
                <Terminal className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#F0F0ED] text-[#8A8A8A] text-[10px] font-mono-code font-bold border border-[#E6E6E3]">
                {t.lab.comingSoonTag}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-[#171717]">
                {t.lab.terminalTitle}
              </h2>
              <p className="text-xs text-[#8A8A8A] leading-relaxed">
                {t.lab.terminalDesc}
              </p>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#8A8A8A] text-xs font-mono-code text-center">
            {t.lab.comingSoonTag}
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
