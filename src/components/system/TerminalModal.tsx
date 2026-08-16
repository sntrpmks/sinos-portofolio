"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import { contactInfo } from "@/lib/contact";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  text: string | string[];
}

export function TerminalModal() {
  const { terminalOpen, setTerminalOpen, locale } = useViewMode();
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome banner
  useEffect(() => {
    if (terminalOpen && lines.length === 0) {
      setLines([
        {
          id: "welcome-1",
          type: "system",
          text: "SIN.OS Shell [Version 1.0.4 - Production Node]",
        },
        {
          id: "welcome-2",
          type: "system",
          text:
            locale === "id"
              ? "Ketik 'help' untuk melihat daftar perintah yang tersedia."
              : "Type 'help' to display available commands.",
        },
      ]);
    }
  }, [terminalOpen, locale, lines.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Auto-focus input when opened
  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [terminalOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    // Add input line
    const inputLine: TerminalLine = {
      id: `input-${Date.now()}`,
      type: "input",
      text: `$ ${inputVal}`,
    };

    let outputText: string | string[] = "";
    let isError = false;

    if (locale === "id") {
      switch (command) {
        case "help":
          outputText = [
            "Perintah SIN.OS Shell yang tersedia:",
            "  help           - Tampilkan daftar perintah ini",
            "  about          - Tampilkan ringkasan pendidikan, peran, & latar belakang Sinatria",
            "  projects       - Daftar proyek terverifikasi (CashFlowku, Web Event, RakitinAja, dll.)",
            "  certs          - Daftar sertifikasi terverifikasi (OpenAI, Hacktiv8, BNSP, IBM, dll.)",
            "  resume         - Buka PDF resume resmi",
            "  contact        - Tampilkan email, LinkedIn, dan GitHub",
            "  clear          - Bersihkan buffer terminal",
            "  exit           - Tutup jendela terminal",
          ];
          break;

        case "about":
          outputText = [
            "Sinatria Pamungkas — Full Stack Developer | AI Enthusiast",
            "Pendidikan: Universitas Sains Al-Qur'an (UNSIQ) - Manajemen Informatika",
            "Alumni: SMK Negeri 1 Wonosobo (Lulus 2026)",
            "Magang: Proactive Robotika",
            "Fokus: Full Stack Web Development (PHP, JavaScript, Next.js), Native Android (Java, SQLite WAL), Integrasi AI.",
            "Lokasi: Wonosobo, Indonesia",
          ];
          break;

        case "projects":
          outputText = [
            "PROYEK TERVERIFIKASI:",
            "  [#006] CashFlowku (Java Edition)  (2026 • Native Android Java, SQLite WAL, Bento POS)",
            "  [#005] Web Event SMKN 1 Wonosobo  (2026 • PHP, MySQL, Multi-Role, Gemini API)",
            "  [#004] Catatan Android App      (2025 • Native Android Java, SQLite, Recycle Bin)",
            "  [#003] RakitinAja               (2025 • PHP, MySQL, PC Builder & POS)",
            "  [#002] Sintech Computer         (2025 • PHP, TailwindCSS, Chart.js POS)",
            "  [#001] RentalDVD                (2025 • Java Desktop Swing, MySQL, JasperReports)",
          ];
          break;

        case "certs":
          outputText = [
            "KREDENSIAL TERVERIFIKASI (TERBARU → TERLAMA):",
            "  [2026] AI Foundations (OpenAI Academy - ID: hn23qn4u9f)",
            "  [2026] Productivity & AI API Integration (Hacktiv8 Indonesia)",
            "  [2025] Junior Coder (Sertifikasi Kompetensi BNSP)",
            "  [2025] Introduction to AI (IBM)",
            "  [2025] Internship Certificate in Robotics (Proactive Robotika)",
            "  [2025] Certificate of Completion SSEC2025 (SMKDEV)",
            "  [2024] Java Fundamentals (Oracle Academy)",
          ];
          break;

        case "resume":
          window.open("/resume.pdf", "_blank");
          outputText = ["Membuka resume.pdf di tab baru..."];
          break;

        case "contact":
          outputText = [
            "KANAL KOMUNIKASI:",
            `  Email:    ${contactInfo.email}`,
            `  GitHub:   ${contactInfo.github}`,
            `  LinkedIn: ${contactInfo.linkedin}`,
          ];
          break;

        case "clear":
          setLines([]);
          setInputVal("");
          return;

        case "exit":
          setTerminalOpen(false);
          setInputVal("");
          return;

        default:
          isError = true;
          outputText = [
            `Perintah tidak dikenal: '${command}'`,
            "Ketik 'help' untuk daftar perintah yang sah.",
          ];
          break;
      }
    } else {
      switch (command) {
        case "help":
          outputText = [
            "SIN.OS shell commands:",
            "  help           - Display list of commands",
            "  about          - View Sinatria's education, role, and summary",
            "  projects       - List all confirmed work (CashFlowku, Web Event, RakitinAja, etc.)",
            "  certs          - View verified certifications (OpenAI, Hacktiv8, BNSP, IBM, etc.)",
            "  resume         - Open official resume PDF",
            "  contact        - Show email, LinkedIn, and GitHub links",
            "  clear          - Clear terminal buffer",
            "  exit           - Close shell window",
          ];
          break;

        case "about":
          outputText = [
            "Sinatria Pamungkas — Full Stack Developer | AI Enthusiast",
            "Education: Universitas Sains Al-Qur'an (UNSIQ) - Manajemen Informatika",
            "Alumni: SMK Negeri 1 Wonosobo (Lulus 2026)",
            "Internship: Proactive Robotika",
            "Focus: Full Stack Web Development (PHP, JavaScript, Next.js), Native Android (Java, SQLite WAL), AI API Integration.",
            "Location: Wonosobo, Indonesia",
          ];
          break;

        case "projects":
          outputText = [
            "VERIFIED PROJECTS:",
            "  [#006] CashFlowku (Java Edition)  (2026 • Native Android Java, SQLite WAL, Bento POS)",
            "  [#005] Web Event SMKN 1 Wonosobo  (2026 • PHP, MySQL, Multi-Role, Gemini API)",
            "  [#004] Catatan Android App      (2025 • Native Android Java, SQLite, Recycle Bin)",
            "  [#003] RakitinAja               (2025 • PHP, MySQL, PC Builder & POS)",
            "  [#002] Sintech Computer         (2025 • PHP, TailwindCSS, Chart.js POS)",
            "  [#001] RentalDVD                (2025 • Java Desktop Swing, MySQL, JasperReports)",
          ];
          break;

        case "certs":
          outputText = [
            "VERIFIED CREDENTIALS (NEWEST → OLDEST):",
            "  [2026] AI Foundations (OpenAI Academy - ID: hn23qn4u9f)",
            "  [2026] Productivity & AI API Integration (Hacktiv8 Indonesia)",
            "  [2025] Junior Coder (Sertifikasi Kompetensi BNSP)",
            "  [2025] Introduction to AI (IBM)",
            "  [2025] Internship Certificate in Robotics (Proactive Robotika)",
            "  [2025] Certificate of Completion SSEC2025 (SMKDEV)",
            "  [2024] Java Fundamentals (Oracle Academy)",
          ];
          break;

        case "resume":
          window.open("/resume.pdf", "_blank");
          outputText = ["Opening resume.pdf in new tab..."];
          break;

        case "contact":
          outputText = [
            "COMMUNICATION CHANNELS:",
            `  Email:    ${contactInfo.email}`,
            `  GitHub:   ${contactInfo.github}`,
            `  LinkedIn: ${contactInfo.linkedin}`,
          ];
          break;

        case "clear":
          setLines([]);
          setInputVal("");
          return;

        case "exit":
          setTerminalOpen(false);
          setInputVal("");
          return;

        default:
          isError = true;
          outputText = [
            `Unknown command: '${command}'`,
            "Type 'help' for a list of valid commands.",
          ];
          break;
      }
    }

    const outputLine: TerminalLine = {
      id: `output-${Date.now()}`,
      type: isError ? "error" : "output",
      text: outputText,
    };

    setLines((prev) => [...prev, inputLine, outputLine]);
    setInputVal("");
  };

  if (!terminalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`w-full bg-[#171717] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden text-[#A9F1DF] font-mono-code ${
            isMaximized ? "h-[94vh] max-w-7xl" : "h-[500px] max-w-3xl"
          }`}
        >
          {/* macOS Style Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#242424] border-b border-white/10 select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors"
                  aria-label="Close Terminal Window"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors"
                  aria-label="Minimize/Maximize Terminal"
                />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-semibold text-slate-300 ml-2 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-[#A9F1DF]" />
                SIN.OS Shell ~ zsh
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              >
                {isMaximized ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => setTerminalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            className="flex-1 p-4 overflow-y-auto overscroll-contain flex flex-col gap-2 text-xs sm:text-sm selection:bg-[#A9F1DF] selection:text-[#171717]"
          >
            {lines.map((line) => (
              <div key={line.id} className="flex flex-col gap-1">
                {Array.isArray(line.text) ? (
                  line.text.map((t, idx) => (
                    <p
                      key={idx}
                      className={
                        line.type === "system"
                          ? "text-slate-400"
                          : line.type === "error"
                          ? "text-rose-400 font-semibold"
                          : "text-slate-200 whitespace-pre-wrap"
                      }
                    >
                      {t}
                    </p>
                  ))
                ) : (
                  <p
                    className={
                      line.type === "input"
                        ? "text-[#A9F1DF] font-bold"
                        : line.type === "system"
                        ? "text-slate-400"
                        : line.type === "error"
                        ? "text-rose-400"
                        : "text-slate-200"
                    }
                  >
                    {line.text}
                  </p>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Command Input Form */}
          <form
            onSubmit={handleCommand}
            className="flex items-center gap-2 px-4 py-3 bg-[#1F1F1F] border-t border-white/10"
          >
            <span className="text-[#A9F1DF] font-bold text-sm">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={locale === "id" ? "Ketik perintah (contoh: help, about)..." : "Type a command (e.g. help, about)..."}
              className="flex-1 bg-transparent text-slate-100 text-xs sm:text-sm focus:outline-none placeholder:text-slate-500 font-mono-code"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-[#A9F1DF] text-[#171717] hover:bg-[#82E8D3] transition-colors"
              aria-label="Execute Command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
