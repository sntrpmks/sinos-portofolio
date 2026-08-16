"use client";

import React from "react";
import { Mail, FileText, Terminal, ArrowUpRight, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { useViewMode } from "@/components/context/ViewModeContext";
import { contactInfo, handleQuickEmail } from "@/lib/contact";

export function Footer() {
  const { setTerminalOpen, locale, t } = useViewMode();

  return (
    <footer className="border-t border-[#E6E6E3] bg-[#F7F7F5] pt-12 pb-8 px-4 sm:px-8 mt-24">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left Brand */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono-code font-bold text-[#171717] text-base tracking-tight">
              SIN<span className="text-[#00695C]">.OS</span>
            </span>
            <span className="text-xs text-[#8A8A8A] font-mono-code">— Sinatria Pamungkas</span>
          </div>
          <p className="text-xs text-[#666666]">
            © 2026 Sinatria Pamungkas. {t.footer.rights}
          </p>
        </div>

        {/* Right Links */}
        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#666666]">
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#171717] transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-[#171717]" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-[#8A8A8A]" />
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#171717] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4 text-[#171717]" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-[#8A8A8A]" />
          </a>
          <a
            href={contactInfo.mailtoUrl}
            className="flex items-center gap-1 hover:text-[#171717] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#171717]" />
            <span>Email</span>
          </a>
          <a
            href="/lab"
            className="flex items-center gap-1 hover:text-[#171717] transition-colors text-[#00695C] font-semibold"
          >
            <span>Lab</span>
          </a>
          <button
            onClick={handleQuickEmail}
            className="flex items-center gap-1 text-[#00695C] font-bold hover:underline transition-colors"
            title="Quick Email via Gmail / Mail App"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{locale === "id" ? "Email Cepat →" : "Quick Email →"}</span>
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            className="flex items-center gap-1 hover:text-[#171717] transition-colors"
          >
            <FileText className="w-4 h-4 text-[#171717]" />
            <span>Resume.pdf</span>
          </a>
          <button
            onClick={() => setTerminalOpen(true)}
            className="flex items-center gap-1 text-[#8A8A8A] hover:text-[#171717] font-mono-code transition-colors"
            title="Launch Terminal Shell"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{t.footer.terminalTrigger}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
