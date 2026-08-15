"use client";

import React from "react";
import Image from "next/image";
import { Experience } from "@/types/content";
import { useViewMode } from "@/components/context/ViewModeContext";
import { Briefcase, GraduationCap, Award } from "lucide-react";

interface TimelineSectionProps {
  experiences: Experience[];
}

export function TimelineSection({ experiences }: TimelineSectionProps) {
  const { locale } = useViewMode();

  const getBadgeIcon = (type: Experience["type"]) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-4 h-4 text-[#00695C]" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-[#171717]" />;
      default:
        return <Award className="w-4 h-4 text-[#00695C]" />;
    }
  };

  const getBadgeLabel = (type: Experience["type"]) => {
    if (locale === "id") {
      switch (type) {
        case "education":
          return "Pendidikan";
        case "internship":
          return "Magang";
        case "work":
          return "Pengalaman Kerja";
        default:
          return type;
      }
    }
    switch (type) {
      case "education":
        return "Education";
      case "internship":
        return "Internship";
      case "work":
        return "Work Experience";
      default:
        return type;
    }
  };

  const getOrgLogo = (org: string) => {
    const lower = org.toLowerCase();
    if (lower.includes("unsiq") || lower.includes("sains al-qur'an")) {
      return "/media/logos/unsiq.jpg";
    }
    if (lower.includes("smk") || lower.includes("smkn 1 wonosobo")) {
      return "/media/logos/smkn1.png";
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6">
      {experiences.map((exp) => {
        const logoUrl = getOrgLogo(exp.organization);
        return (
          <div key={exp.id} className="card-minimal p-6 flex flex-col gap-3 card-minimal-interactive">
            <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-3">
              <div className="flex items-center gap-2">
                {getBadgeIcon(exp.type)}
                <span className="text-xs font-mono-code font-bold text-[#171717] uppercase">
                  {getBadgeLabel(exp.type)}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#F0F0ED] text-[#171717] font-mono-code text-xs font-bold border border-[#E6E6E3]">
                {exp.year}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-[#171717]">{exp.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-[#666666] font-medium">
                {logoUrl && (
                  <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-[#E6E6E3]">
                    <Image
                      src={logoUrl}
                      alt={exp.organization}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span>{exp.organization} • {exp.location}</span>
              </div>
            </div>

            <p className="text-xs text-[#2A2A2A] leading-relaxed mt-1">
              {exp.description}
            </p>

            <div className="flex flex-col gap-1.5 pt-3 border-t border-[#E6E6E3]">
              <span className="text-[11px] font-mono-code text-[#8A8A8A] font-bold uppercase">
                {locale === "id" ? "Sorotan Utama" : "Highlights"}
              </span>
              {exp.highlights.map((h, idx) => (
                <span key={idx} className="text-xs text-[#666666]">
                  • {h}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
