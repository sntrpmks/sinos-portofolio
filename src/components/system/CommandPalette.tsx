"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import {
  Search,
  FolderGit2,
  User,
  Compass,
  Terminal,
  Mail,
  FileText,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen, setTerminalOpen, setAiModalOpen, locale, t } = useViewMode();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Reset state when closed
      setTimeout(() => {
        setQuery("");
        setSelectedIndex(0);
      }, 0);
    }
  }, [commandPaletteOpen]);

  // Auto-scroll selected item into view when navigating with arrow keys
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const navCategory = locale === "id" ? "Navigasi" : "Navigation";
  const actionCategory = locale === "id" ? "Aksi" : "Action";

  const commands: CommandItem[] = [
    {
      id: "projects",
      title: locale === "id" ? "Jelajahi Studi Kasus & Proyek" : "Explore Work & Case Files",
      category: navCategory,
      icon: <FolderGit2 className="w-4 h-4 text-[#171717]" />,
      action: () => router.push("/work"),
    },
    {
      id: "about",
      title: locale === "id" ? "Tentang Sinatria & Metodologi" : "About Sinatria & Methodology",
      category: navCategory,
      icon: <User className="w-4 h-4 text-[#171717]" />,
      action: () => router.push("/about"),
    },
    {
      id: "journey",
      title: locale === "id" ? "Perjalanan & Sertifikasi Terverifikasi" : "Journey & Verified Certifications",
      category: navCategory,
      icon: <Compass className="w-4 h-4 text-[#171717]" />,
      action: () => router.push("/journey"),
    },
    {
      id: "contact",
      title: locale === "id" ? "Kontak & Kanal Komunikasi Direct" : "Contact & Direct Channels",
      category: navCategory,
      icon: <Mail className="w-4 h-4 text-[#171717]" />,
      action: () => router.push("/contact"),
    },
    {
      id: "resume",
      title: locale === "id" ? "Unduh Resume.pdf" : "Download Resume.pdf",
      category: actionCategory,
      icon: <FileText className="w-4 h-4 text-[#00695C]" />,
      action: () => window.open("/resume.pdf", "_blank"),
    },
    {
      id: "ai",
      title: locale === "id" ? "Tanya Asisten AI" : "Ask AI Assistant",
      category: actionCategory,
      icon: <Sparkles className="w-4 h-4 text-[#00695C]" />,
      action: () => setAiModalOpen(true),
    },
    {
      id: "terminal",
      title: locale === "id" ? "Buka Terminal Shell" : "Launch Terminal Shell",
      category: actionCategory,
      icon: <Terminal className="w-4 h-4 text-[#666666]" />,
      action: () => setTerminalOpen(true),
      shortcut: "Ctrl+`",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) || cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
      setCommandPaletteOpen(false);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setCommandPaletteOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#171717]/40 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setCommandPaletteOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl glass-modal rounded-2xl border border-[#E6E6E3] shadow-2xl overflow-hidden z-10 max-h-[calc(100dvh-4rem)] flex flex-col"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#E6E6E3] bg-white shrink-0">
              <Search className="w-4 h-4 text-[#8A8A8A] mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={t.nav.searchPlaceholder}
                className="w-full bg-transparent text-[#171717] text-sm outline-none placeholder:text-[#8A8A8A]"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="p-1 rounded-lg hover:bg-[#F0F0ED] text-[#8A8A8A] hover:text-[#171717]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              className="max-h-[min(55vh,380px)] overflow-y-auto p-2 bg-white overscroll-contain flex-1"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono-code text-[#8A8A8A]">
                  {locale === "id" ? "Tidak ada item yang cocok." : "No matching items found."}
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      ref={isSelected ? selectedItemRef : null}
                      onClick={() => {
                        cmd.action();
                        setCommandPaletteOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? "bg-[#F0F0ED] text-[#171717] font-medium"
                          : "text-[#666666] hover:bg-[#F7F7F5]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white border border-[#E6E6E3]">
                          {cmd.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs">{cmd.title}</span>
                          <span className="text-[10px] font-mono-code text-[#8A8A8A]">
                            {cmd.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {cmd.shortcut && (
                          <kbd className="px-1.5 py-0.5 rounded bg-[#F0F0ED] text-[10px] font-mono-code text-[#8A8A8A] border border-[#E6E6E3]">
                            {cmd.shortcut}
                          </kbd>
                        )}
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[#171717]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[#E6E6E3] bg-[#F7F7F5] flex items-center justify-between text-[11px] font-mono-code text-[#8A8A8A] shrink-0">
              <div className="flex items-center gap-3">
                <span>↑↓ {locale === "id" ? "Navigasi" : "Navigate"}</span>
                <span>↵ {locale === "id" ? "Pilih" : "Select"}</span>
                <span>ESC {locale === "id" ? "Tutup" : "Close"}</span>
              </div>
              <span className="font-bold text-[#171717]">SIN.OS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
