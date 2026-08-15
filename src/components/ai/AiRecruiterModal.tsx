"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import {
  Sparkles,
  Send,
  X,
  ShieldCheck,
  Loader2,
  Square,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function AiRecruiterModal() {
  const { aiModalOpen, setAiModalOpen, locale } = useViewMode();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Determine current project slug if on /work/[slug]
  const projectSlug = pathname?.startsWith("/work/")
    ? pathname.replace("/work/", "").split("/")[0]
    : undefined;

  // Auto-focus input on open
  useEffect(() => {
    if (aiModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [aiModalOpen]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  // Keyboard shortcut listener for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && aiModalOpen) {
        setAiModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aiModalOpen, setAiModalOpen]);

  // Stop active AI generation
  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
    setMessages((prev) =>
      prev.map((msg) => (msg.isStreaming ? { ...msg, isStreaming: false } : msg))
    );
  }, []);

  // Send Chat Message via SSE Token Streaming
  const handleSend = async (queryOverride?: string) => {
    const textToSend = (queryOverride || inputMessage).trim();
    if (!textToSend || isGenerating) return;

    // Create User Message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
    };

    // Create Placeholder Assistant Message for Streaming
    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      isStreaming: true,
    };

    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, assistantMessage]);
    setInputMessage("");
    setIsGenerating(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortController.signal,
        body: JSON.stringify({
          message: textToSend,
          locale,
          page: pathname,
          projectSlug,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        let errMessage =
          locale === "id"
            ? "SIN.OS AI sedang tidak dapat memproses permintaan."
            : "SIN.OS AI is unable to process request at this time.";

        if (response.status === 429) {
          errMessage =
            locale === "id"
              ? "Kamu mengirim beberapa pertanyaan dalam waktu singkat. Silakan tunggu sebentar."
              : "You've sent several queries in a short time. Please wait a moment.";
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { id: m.id, role: "assistant", content: errMessage, isStreaming: false }
              : m
          )
        );
        setIsGenerating(false);
        return;
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          const dataContent = trimmed.substring(6);
          if (dataContent === "[DONE]") {
            break;
          }

          try {
            const parsed = JSON.parse(dataContent);
            if (parsed.text) {
              accumulatedText += parsed.text;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId ? { ...m, content: accumulatedText } : m
                )
              );
            } else if (parsed.error) {
              accumulatedText = parsed.error;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId ? { ...m, content: accumulatedText } : m
                )
              );
            }
          } catch {
            // Ignore parse errors
          }
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err: unknown) {
      if (err && typeof err === "object" && "name" in err && err.name === "AbortError") {
        // Generation stopped by user
        return;
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                content:
                  m.content ||
                  (locale === "id"
                    ? "Terjadi kendala koneksi ke SIN.OS AI."
                    : "Network connection error reaching SIN.OS AI."),
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  // Contextual Prompt Suggestions
  const getContextualSuggestions = () => {
    if (projectSlug) {
      return locale === "id"
        ? [
            "Masalah apa yang diselesaikan project ini?",
            "Teknologi apa saja yang digunakan?",
            "Apa peran Sinatria di project ini?",
            "Bagaimana cara kerja aplikasinya?",
          ]
        : [
            "What problem does this project solve?",
            "What technologies were used?",
            "What was Sinatria's role?",
            "How does the solution architecture work?",
          ];
    }

    if (pathname === "/about") {
      return locale === "id"
        ? [
            "Apa spesialisasi Sinatria?",
            "Bagaimana filosofi rekayasa softwarenya?",
            "Ceritakan pendidikan Sinatria",
            "Sertifikat apa saja yang dimiliki?",
          ]
        : [
            "What does Sinatria specialize in?",
            "What is his engineering philosophy?",
            "Tell me about his education background",
            "What certificates does he hold?",
          ];
    }

    return locale === "id"
      ? [
          "Sinatria itu siapa?",
          "Ceritakan project yang pernah dibuat",
          "Teknologi apa yang paling dikuasainya?",
          "Bagaimana cara menghubungi Sinatria?",
        ]
      : [
          "Who is Sinatria?",
          "Tell me about his verified projects",
          "What technologies does he use?",
          "How can I contact Sinatria?",
        ];
  };

  const suggestions = getContextualSuggestions();

  // Helper to render markdown bold, bullet points, and internal links safely
  const renderFormattedMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Check if line is bullet list item
      const isBullet = line.trim().startsWith("• ") || line.trim().startsWith("- ");
      const lineContent = isBullet ? line.trim().substring(2) : line;

      // Parse markdown bold **text** and markdown links [Title](/url)
      const parts = lineContent.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

      const parsedElements = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-bold text-[#171717]">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const [, linkText, linkUrl] = linkMatch;
          const isInternal = linkUrl.startsWith("/");

          if (isInternal) {
            return (
              <Link
                key={pIdx}
                href={linkUrl}
                onClick={() => setAiModalOpen(false)}
                className="inline-flex items-center gap-0.5 text-[#00695C] font-bold hover:underline bg-[#E6F9F5] px-1.5 py-0.5 rounded border border-[#B2F3E5]"
              >
                <span>{linkText}</span>
                <ArrowUpRight className="w-3 h-3 text-[#00695C]" />
              </Link>
            );
          }

          return (
            <a
              key={pIdx}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[#00695C] font-bold hover:underline"
            >
              <span>{linkText}</span>
              <ArrowUpRight className="w-3 h-3 text-[#8A8A8A]" />
            </a>
          );
        }

        return <span key={pIdx}>{part}</span>;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-2">
            <span className="text-[#00695C] font-bold shrink-0">•</span>
            <div className="flex-1">{parsedElements}</div>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="my-1 leading-relaxed">
          {parsedElements}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      {aiModalOpen && (
        <div
          aria-modal="true"
          role="dialog"
          aria-labelledby="ai-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#171717]/40 backdrop-blur-sm"
        >
          <div className="absolute inset-0" onClick={() => setAiModalOpen(false)} />

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-xl glass-modal rounded-3xl border border-[#E6E6E3] shadow-2xl flex flex-col h-[580px] max-h-[90vh] overflow-hidden z-10 bg-white/95"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white/80 border-b border-[#E6E6E3] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#E6F9F5] text-[#00695C] border border-[#B2F3E5] shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#00695C]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 id="ai-modal-title" className="text-sm font-bold text-[#171717]">
                      ASK SIN.OS AI
                    </h2>
                    <span className="text-[10px] font-mono-code font-bold bg-[#E6F9F5] text-[#00695C] px-2 py-0.5 rounded-md border border-[#B2F3E5]">
                      v2.0
                    </span>
                  </div>
                  <span className="text-[11px] text-[#00695C] font-mono-code flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3 h-3 text-[#00695C]" />
                    {locale === "id" ? "Basis Data Terverifikasi" : "Grounded Portfolio Assistant"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    className="p-2 rounded-xl text-[#8A8A8A] hover:text-[#171717] hover:bg-[#F0F0ED] transition-colors"
                    title={locale === "id" ? "Bersihkan obrolan" : "Clear chat"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setAiModalOpen(false)}
                  className="p-2 rounded-xl text-[#8A8A8A] hover:text-[#171717] hover:bg-[#F0F0ED] transition-colors"
                  aria-label="Close modal"
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm bg-[#F7F7F5]">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 gap-3 text-[#666666]">
                  <div className="p-3.5 rounded-full bg-[#E6F9F5] text-[#00695C] border border-[#B2F3E5]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1 max-w-sm">
                    <h3 className="text-base font-bold text-[#171717]">
                      {locale === "id" ? "Tanya SIN.OS AI" : "Ask SIN.OS AI"}
                    </h3>
                    <p className="text-xs text-[#666666] leading-relaxed">
                      {locale === "id"
                        ? "Jelajahi project, skill, pengalaman, dan karya Sinatria."
                        : "Explore Sinatria Pamungkas's verified projects, technical stack, experience, and background instantly."}
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`p-4 rounded-2xl max-w-[88%] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#171717] text-white font-medium rounded-br-none shadow-xs text-xs sm:text-sm"
                          : "card-minimal border border-[#E6E6E3] text-[#2A2A2A] rounded-bl-none font-sans text-xs sm:text-sm bg-white"
                      }`}
                    >
                      {msg.role === "user" ? (
                        msg.content
                      ) : msg.content ? (
                        renderFormattedMarkdown(msg.content)
                      ) : (
                        <div className="flex items-center gap-2 text-[#00695C] font-mono-code text-xs py-1">
                          <Loader2 className="w-4 h-4 animate-spin text-[#00695C]" />
                          <span>
                            {locale === "id" ? "Mencari di portofolio SIN.OS..." : "SIN.OS AI is thinking..."}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Contextual Prompt Suggestions */}
            <div className="px-4 py-2.5 border-t border-[#E6E6E3] bg-white flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono-code shrink-0">
              <span className="text-[#8A8A8A] font-bold shrink-0">
                {locale === "id" ? "Rekomendasi:" : "Suggested:"}
              </span>
              {suggestions.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sq)}
                  disabled={isGenerating}
                  className="px-3 py-1.5 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#2A2A2A] hover:bg-[#E6F9F5] hover:text-[#00695C] hover:border-[#B2F3E5] shrink-0 font-medium transition-all disabled:opacity-50"
                >
                  {sq}
                </button>
              ))}
            </div>

            {/* Input Footer & Controls */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#E6E6E3] flex items-center gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isGenerating}
                placeholder={
                  locale === "id"
                    ? "Tanyakan sesuatu tentang karya Sinatria..."
                    : "Ask something about Sinatria's work..."
                }
                className="flex-1 bg-[#F0F0ED] text-[#171717] text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#E6E6E3] outline-none placeholder:text-[#8A8A8A] focus:border-[#00695C] focus:bg-white transition-all disabled:opacity-60 font-sans"
              />

              {isGenerating ? (
                <button
                  onClick={handleStop}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow-xs shrink-0"
                  title={locale === "id" ? "Hentikan respons" : "Stop generation"}
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">
                    {locale === "id" ? "Hentikan" : "Stop"}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => handleSend()}
                  disabled={!inputMessage.trim()}
                  className="p-3 rounded-xl bg-[#171717] text-white font-bold hover:bg-[#00695C] disabled:opacity-30 transition-all shadow-xs shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
