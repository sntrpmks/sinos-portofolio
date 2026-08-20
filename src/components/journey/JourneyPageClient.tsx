"use client";

import React from "react";
import { Experience, Certificate } from "@/types/content";
import { TimelineSection } from "@/components/journey/TimelineSection";
import { CertificationsGrid } from "@/components/certifications/CertificationsGrid";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useViewMode } from "@/components/context/ViewModeContext";
import { Compass } from "lucide-react";

interface JourneyPageClientProps {
  experiences: Experience[];
  certificates: Certificate[];
}

export function JourneyPageClient({ experiences, certificates }: JourneyPageClientProps) {
  const { locale, t } = useViewMode();

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col gap-12">
      {/* Header */}
      <SectionReveal className="flex flex-col gap-3 border-b border-[#E6E6E3] pb-6">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#171717]" />
          <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-widest">
            {locale === "id" ? "TONGGAK PERJALANAN & KREDENSIAL" : "MILESTONES & CREDENTIALS"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
          {t.journeyPage.title}
        </h1>
        <p className="text-sm text-[#666666] max-w-2xl">
          {t.journeyPage.subtitle}
        </p>
      </SectionReveal>

      {/* Verified Certifications Section (Grid) */}
      <CertificationsGrid certificates={certificates} />

      {/* Experience Timeline Section */}
      <SectionReveal className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-[#171717] border-b border-[#E6E6E3] pb-3">
          {t.journeyPage.timelineTitle}
        </h2>
        <TimelineSection experiences={experiences} />
      </SectionReveal>
    </div>
  );
}

