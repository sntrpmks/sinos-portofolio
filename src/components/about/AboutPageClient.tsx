"use client";

import React from "react";
import Image from "next/image";
import { HowIThink } from "@/components/about/HowIThink";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { useViewMode } from "@/components/context/ViewModeContext";
import { User, MapPin } from "lucide-react";

export function AboutPageClient() {
  const { locale, t } = useViewMode();

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col gap-10">
      {/* Header with Profile Photo */}
      <SectionReveal className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 border-b border-[#E6E6E3] pb-8">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#00695C]" />
            <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-widest">
              {locale === "id" ? "TENTANG DEVELOPER" : "ABOUT THE DEVELOPER"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
            Ahmad Sinatria Pamungkas
          </h1>

          <p className="text-base sm:text-lg font-semibold text-[#666666] leading-relaxed">
            Full Stack Developer <span className="text-[#8A8A8A]">|</span> AI Enthusiast
          </p>

          <p className="text-sm text-[#2A2A2A] leading-relaxed max-w-xl">
            {t.about.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#666666]">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[#00695C]" />
              <span>Wonosobo, Indonesia</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-[#E6E6E3]">
                <Image
                  src="/media/logos/unsiq.jpg"
                  alt="UNSIQ"
                  fill
                  className="object-cover"
                />
              </div>
              <span>UNSIQ (Manajemen Informatika)</span>
            </div>
          </div>
        </div>

        {/* Profile Photo Display */}
        <div className="shrink-0 self-center md:self-auto">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-[#F0F0ED] border border-[#E6E6E3] p-1.5 shadow-sm overflow-hidden relative group">
            <Image
              src="/media/profile/sinatria-profile.png"
              alt="Sinatria Pamungkas"
              fill
              className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </SectionReveal>

      {/* Intro Summary Box */}
      <SectionReveal className="card-minimal p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-4 border-l-[#00695C]">
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-[#8A8A8A] font-mono-code font-bold">
            {locale === "id" ? "RINGKASAN PROFIL" : "PROFILE SUMMARY"}
          </span>
          <p className="text-[#2A2A2A] leading-relaxed text-sm">
            {locale === "id"
              ? "Saya membangun aplikasi web dari frontend sampai backend. Selain pengembangan software, saya juga tertarik mengeksplorasi integrasi AI dan bagaimana teknologi tersebut bisa dipakai untuk menyelesaikan masalah nyata."
              : "I build web applications across the frontend and backend. Beyond software development, I enjoy exploring AI integrations and how modern technology can solve real-world problems."}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono-code text-xs shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C] font-bold">
            Full Stack & AI
          </span>
        </div>
      </SectionReveal>

      {/* How I Think Section */}
      <HowIThink />
    </div>
  );
}


