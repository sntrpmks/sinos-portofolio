"use client";

import React from "react";
import { Mail, FileText, Send, ArrowUpRight, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { useViewMode } from "@/components/context/ViewModeContext";
import { contactInfo, handleQuickEmail } from "@/lib/contact";

export function ContactPageClient() {
  const { locale, t } = useViewMode();

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-[#E6E6E3] pb-6">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#00695C]" />
          <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-widest">
            {locale === "id" ? "HUBUNGI SINATRIA" : "CONNECT WITH SINATRIA"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">
          {t.contact.titleMain}<span className="text-[#00695C]">{t.contact.titleAccent}</span>
        </h1>
        <p className="text-sm text-[#666666] max-w-xl">
          {locale === "id"
            ? "Punya ide project, peluang kerja sama, atau ingin berdiskusi teknis? Silakan hubungi saya melalui kanal di bawah."
            : "Whether you have an idea, software opportunity, or technical discussion, feel free to reach out directly through any channel below."}
        </p>
      </div>

      {/* Direct Communication Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <a
          href={contactInfo.mailtoUrl}
          className="card-minimal p-6 flex items-center justify-between group card-minimal-interactive"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C] group-hover:bg-[#00695C] group-hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-mono-code text-[#8A8A8A]">
                {t.contact.emailLabel}
              </span>
              <span className="text-sm font-bold text-[#171717] group-hover:text-[#00695C] transition-colors">
                {contactInfo.email}
              </span>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#00695C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>

        {/* GitHub */}
        <a
          href={contactInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="card-minimal p-6 flex items-center justify-between group card-minimal-interactive"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors">
              <GithubIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-mono-code text-[#8A8A8A]">
                {t.contact.githubLabel}
              </span>
              <span className="text-sm font-bold text-[#171717] group-hover:text-[#00695C] transition-colors">
                {contactInfo.githubHandle}
              </span>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#00695C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>

        {/* LinkedIn */}
        <a
          href={contactInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="card-minimal p-6 flex items-center justify-between group card-minimal-interactive"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C] group-hover:bg-[#00695C] group-hover:text-white transition-colors">
              <LinkedinIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-mono-code text-[#8A8A8A]">
                {t.contact.linkedinLabel}
              </span>
              <span className="text-sm font-bold text-[#171717] group-hover:text-[#00695C] transition-colors">
                {contactInfo.linkedinHandle}
              </span>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#00695C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>

        {/* Resume */}
        <a
          href="/resume.pdf"
          target="_blank"
          className="card-minimal p-6 flex items-center justify-between group card-minimal-interactive"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-mono-code text-[#8A8A8A]">Official Resume</span>
              <span className="text-sm font-bold text-[#171717] group-hover:text-[#00695C] transition-colors">
                {locale === "id" ? "Unduh Resume.pdf" : "Download Resume.pdf"}
              </span>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#00695C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      </div>

      {/* Quick Email Launcher Box */}
      <div className="card-minimal p-8 flex flex-col gap-4 border-l-4 border-l-[#00695C]">
        <div className="flex items-center gap-2 text-[#171717]">
          <MessageSquare className="w-5 h-5 text-[#00695C]" />
          <h2 className="text-lg font-bold text-[#171717]">
            {locale === "id" ? "Peluncur Email Cepat (Gmail / Mail)" : "Quick Email Launcher (Gmail / Mail)"}
          </h2>
        </div>
        <p className="text-xs text-[#666666] leading-relaxed">
          {locale === "id"
            ? `Ingin membahas project atau peluang kerja sama? Klik tombol di bawah untuk langsung membuka Gmail ke ${contactInfo.email}.`
            : `Need to discuss a specific software project or role opportunity? Click below to instantly launch Gmail web compose or your default mail application pre-addressed to ${contactInfo.email}.`}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleQuickEmail}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#171717] text-white font-medium text-xs hover:bg-[#00695C] transition-colors shadow-xs"
          >
            <Send className="w-4 h-4 text-[#A9F1DF]" />
            <span>{locale === "id" ? "Email Cepat (Gmail) →" : "Quick Email (Gmail) →"}</span>
          </button>
          <a
            href={contactInfo.mailtoUrl}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] font-medium text-xs hover:border-[#171717] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#666666]" />
            <span>mailto: {contactInfo.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
