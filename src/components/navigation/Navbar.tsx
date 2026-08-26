"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { contactInfo } from "@/lib/contact";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { Command, Sparkles, Menu, X, FileText, Search, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { setCommandPaletteOpen, setAiModalOpen, lightboxOpen, t } = useViewMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Optimized passive scroll listener with RAF throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (lightboxOpen) {
      setMobileMenuOpen(false);
    }
  }, [lightboxOpen]);

  // Lock background scroll efficiently when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen && !lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else if (!lightboxOpen) {
      document.body.style.overflow = "";
    }
    return () => {
      if (!lightboxOpen) {
        document.body.style.overflow = "";
      }
    };
  }, [mobileMenuOpen, lightboxOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/work", label: t.nav.work },
    { href: "/about", label: t.nav.about },
    { href: "/journey", label: t.nav.journey },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={false}
      animate={
        lightboxOpen
          ? {
              opacity: 0,
              y: -10,
              pointerEvents: "none" as const,
              transition: { duration: shouldReduceMotion ? 0.05 : 0.15, ease: "easeOut" },
            }
          : {
              opacity: 1,
              y: 0,
              pointerEvents: "auto" as const,
              transition: { duration: shouldReduceMotion ? 0.05 : 0.2, ease: "easeOut" },
            }
      }
      aria-hidden={lightboxOpen}
      className={`fixed top-4 inset-x-0 z-40 px-4 sm:px-8 max-w-5xl mx-auto ${
        lightboxOpen ? "pointer-events-none invisible" : ""
      }`}
    >
      <nav
        className={`pointer-events-auto rounded-2xl px-4 sm:px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-[#F7F7F5]/90 backdrop-blur-md border border-[#171717]/10 shadow-md py-2.5"
            : "bg-[#F7F7F5]/70 backdrop-blur-sm border border-transparent shadow-none"
        }`}
      >
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-2 group" tabIndex={lightboxOpen ? -1 : 0}>
          <span className="font-mono-code font-bold tracking-tight text-[#171717] text-base group-hover:text-[#00695C] transition-colors">
            SIN<span className="text-[#00695C]">.OS</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-[#F0F0ED] p-1 rounded-xl border border-[#E6E6E3]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={lightboxOpen ? -1 : 0}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#171717] text-white font-bold shadow-xs"
                    : "text-[#666666] hover:text-[#171717] hover:bg-white/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Actions: Language Switcher, Ask SIN.OS AI, Resume, Command Palette */}
        <div className="hidden lg:flex items-center gap-2.5">
          <LanguageSwitcher />

          <button
            onClick={() => setAiModalOpen(true)}
            tabIndex={lightboxOpen ? -1 : 0}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E6F9F5] text-[#00695C] border border-[#B2F3E5] text-xs font-semibold hover:bg-[#00695C] hover:text-white hover:border-[#00695C] transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.askAi}</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            tabIndex={lightboxOpen ? -1 : 0}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] text-xs font-medium hover:border-[#171717] transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.nav.resume}</span>
          </a>

          <button
            onClick={() => setCommandPaletteOpen(true)}
            tabIndex={lightboxOpen ? -1 : 0}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-[#E6E6E3] text-[#666666] text-xs font-mono-code hover:border-[#171717] hover:text-[#171717] transition-all shadow-xs"
            title="Search SIN.OS (⌘K)"
          >
            <Command className="w-3.5 h-3.5 text-[#171717]" />
            <kbd className="text-[10px] text-[#8A8A8A]">{t.nav.searchShortcut}</kbd>
          </button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex lg:hidden items-center gap-1.5">
          <LanguageSwitcher />

          <button
            onClick={() => setAiModalOpen(true)}
            tabIndex={lightboxOpen ? -1 : 0}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#E6F9F5] text-[#00695C] border border-[#B2F3E5] text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            tabIndex={lightboxOpen ? -1 : 0}
            className="p-2 rounded-xl bg-white/90 border border-[#E6E6E3] text-[#171717] relative z-50 hover:bg-[#F0F0ED] transition-colors active:scale-95"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#171717] transition-transform duration-150 rotate-90" />
            ) : (
              <Menu className="w-5 h-5 text-[#171717] transition-transform duration-150" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && !lightboxOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 z-30 pointer-events-auto"
            />

            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: shouldReduceMotion ? 0.05 : 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ willChange: "transform, opacity" }}
              className="pointer-events-auto relative mt-2.5 w-full glass-mobile-menu rounded-3xl p-5 flex flex-col gap-4 z-40"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                        isActive
                          ? "bg-[#171717] text-white shadow-xs"
                          : "text-[#2A2A2A] hover:bg-[#F0F0ED]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#E6E6E3] flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setCommandPaletteOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-[#F0F0ED] border border-[#E6E6E3] text-[#171717] text-xs font-semibold hover:border-[#171717] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-[#00695C]" />
                    <span>Search & Command Palette</span>
                  </div>
                  <kbd className="px-2 py-0.5 rounded-lg bg-white border border-[#E6E6E3] text-[10px] font-mono-code text-[#8A8A8A] font-bold">
                    ⌘K
                  </kbd>
                </button>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setAiModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-2xl bg-[#E6F9F5] text-[#00695C] border border-[#B2F3E5] text-xs font-bold hover:bg-[#00695C] hover:text-white transition-all"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{t.nav.askAi}</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E6E6E3] flex items-center justify-between text-xs text-[#666666] font-medium">
                <div className="flex items-center gap-3">
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
                </div>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-1 text-[#171717] font-semibold hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume.pdf</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

