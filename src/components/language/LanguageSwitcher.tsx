"use client";

import React, { useState, useRef, useEffect } from "react";
import { useViewMode } from "@/components/context/ViewModeContext";
import { Locale } from "@/lib/i18n";
import { Globe, Check } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useViewMode();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-[#E6E6E3] text-[#171717] text-xs font-mono-code font-bold hover:border-[#171717] transition-all shadow-xs"
        aria-label="Select Language"
        aria-expanded={open}
      >
        <Globe className="w-3.5 h-3.5 text-[#00695C]" />
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 glass-modal rounded-xl border border-[#E6E6E3] p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
          <button
            onClick={() => {
              setLocale("en");
              setOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              locale === "en" ? "bg-[#E6F9F5] text-[#00695C] font-semibold" : "text-[#666666] hover:bg-[#F0F0ED]"
            }`}
          >
            <span>English</span>
            {locale === "en" && <Check className="w-3.5 h-3.5 text-[#00695C]" />}
          </button>
          <button
            onClick={() => {
              setLocale("id");
              setOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              locale === "id" ? "bg-[#E6F9F5] text-[#00695C] font-semibold" : "text-[#666666] hover:bg-[#F0F0ED]"
            }`}
          >
            <span>Indonesia</span>
            {locale === "id" && <Check className="w-3.5 h-3.5 text-[#00695C]" />}
          </button>
        </div>
      )}
    </div>
  );
}
