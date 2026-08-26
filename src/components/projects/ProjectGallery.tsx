"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import {
  Image as ImageIcon,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

interface ProjectGalleryProps {
  gallery: string[];
  projectTitle: string;
}

export function ProjectGallery({ gallery, projectTitle }: ProjectGalleryProps) {
  const { locale, setLightboxOpen } = useViewMode();
  const shouldReduceMotion = useReducedMotion();

  // State
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const triggerRef = useRef<HTMLButtonElement | HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Notify global context when Lightbox opens or closes to hide Navbar & dismiss competing UI
  useEffect(() => {
    if (selectedIndex !== null) {
      setLightboxOpen(true);
    } else {
      setLightboxOpen(false);
    }
    return () => {
      setLightboxOpen(false);
    };
  }, [selectedIndex, setLightboxOpen]);

  // Responsive Breakpoint Check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const initialLimit = isMobile ? 2 : 3;
  const hasMore = gallery ? gallery.length > initialLimit : false;
  const visibleImages = isExpanded ? gallery : gallery?.slice(0, initialLimit);

  // Reset image loading & error state when selectedIndex changes
  useEffect(() => {
    setImgError(false);
    setImgLoading(true);
  }, [selectedIndex]);

  // Preload adjacent screenshots for instant switching
  useEffect(() => {
    if (selectedIndex === null || !gallery || gallery.length <= 1) return;

    const nextIndex = (selectedIndex + 1) % gallery.length;
    const prevIndex = (selectedIndex - 1 + gallery.length) % gallery.length;

    const preloadNext = new window.Image();
    preloadNext.src = gallery[nextIndex];

    const preloadPrev = new window.Image();
    preloadPrev.src = gallery[prevIndex];
  }, [selectedIndex, gallery]);

  // Scroll Lock & Focus Management for Lightbox
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  // Navigation Handlers
  const handlePrev = useCallback(() => {
    if (selectedIndex === null || !gallery) return;
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : gallery.length - 1));
  }, [selectedIndex, gallery]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null || !gallery) return;
    setSelectedIndex((prev) => (prev !== null && prev < gallery.length - 1 ? prev + 1 : 0));
  }, [selectedIndex, gallery]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext, handleClose]);

  // Mobile Swipe Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;

    if (deltaX > 40) {
      handlePrev(); // Swipe right -> previous
    } else if (deltaX < -40) {
      handleNext(); // Swipe left -> next
    }
    touchStartXRef.current = null;
  };

  if (!gallery || gallery.length === 0) return null;

  // Localized Strings
  const sectionTitle =
    locale === "id" ? "Tangkapan Layar & Galeri Aplikasi" : "Application Screenshots & Gallery";
  const showMoreLabel =
    locale === "id"
      ? `Tampilkan lebih banyak (${gallery.length - initialLimit} foto)`
      : `Show more (${gallery.length - initialLimit} remaining)`;
  const showLessLabel = locale === "id" ? "Tampilkan lebih sedikit" : "Show less";
  const previewLabel = locale === "id" ? "Pratinjau Tangkapan Layar" : "Screenshot Preview";

  return (
    <div className="card-minimal p-6 flex flex-col gap-6">
      {/* Gallery Section Header */}
      <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[#00695C]" />
          <h3 className="text-base font-bold text-[#171717]">{sectionTitle}</h3>
        </div>
        <span className="text-xs font-mono-code text-[#00695C] font-semibold bg-[#E6F9F5] px-2.5 py-1 rounded-full border border-[#B2F3E5]">
          {gallery.length} {locale === "id" ? "Foto" : "Images"}
        </span>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence initial={false}>
          {visibleImages.map((imgUrl, idx) => {
            const isNewlyRevealed = idx >= initialLimit;
            return (
              <motion.div
                key={imgUrl}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : isNewlyRevealed
                    ? { opacity: 0, y: 12 }
                    : false
                }
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: 0.25,
                  delay: isNewlyRevealed ? (idx - initialLimit) * 0.04 : 0,
                  ease: "easeOut",
                }}
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setSelectedIndex(idx);
                }}
                tabIndex={0}
                role="button"
                aria-label={`${previewLabel} ${idx + 1}: ${projectTitle}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    triggerRef.current = e.currentTarget;
                    setSelectedIndex(idx);
                  }
                }}
                className="group relative w-full aspect-[16/10] rounded-xl bg-[#F7F7F5] border border-[#E6E6E3] overflow-hidden cursor-pointer shadow-xs hover:border-[#00695C] transition-all focus:outline-none focus:ring-2 focus:ring-[#00695C]"
              >
                <Image
                  src={imgUrl}
                  alt={`${projectTitle} - ${locale === "id" ? "Tangkapan Layar" : "Screenshot"} ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#171717]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white backdrop-blur-[2px]">
                  <div className="p-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-md">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold tracking-wide">
                    {locale === "id" ? "Lihat Foto Penuh" : "View Full Screenshot"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Show More / Show Less Toggle Button */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C] font-semibold text-xs hover:bg-[#A9F1DF] hover:text-[#171717] transition-all shadow-xs group"
          >
            <span>{isExpanded ? showLessLabel : showMoreLabel}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#00695C] group-hover:text-[#171717] transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#00695C] group-hover:text-[#171717] transition-transform" />
            )}
          </button>
        </div>
      )}

      {/* Rebuilt Fullscreen Lightbox / Screenshot Viewer */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.05 : 0.2 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#141414]/94 backdrop-blur-xl p-3 sm:p-6"
            style={{
              paddingTop: "max(0.75rem, env(safe-area-inset-top))",
              paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
              paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
              paddingRight: "max(0.75rem, env(safe-area-inset-right))",
            }}
            onClick={handleClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label={`${previewLabel}: ${projectTitle}`}
          >
            {/* Top Floating Glass Header */}
            <div
              className="w-full flex items-center justify-between max-w-7xl mx-auto z-30 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#A9F1DF] font-mono-code font-bold text-xs backdrop-blur-md shadow-xs min-h-[36px] flex items-center">
                  {selectedIndex + 1} / {gallery.length}
                </span>
                <span className="text-xs font-mono-code text-slate-200 font-medium truncate max-w-[200px] sm:max-w-md hidden xs:inline">
                  {projectTitle}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white/10 hover:bg-[#A9F1DF] text-white hover:text-[#171717] border border-white/20 backdrop-blur-md transition-all shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#A9F1DF]"
                aria-label={locale === "id" ? "Tutup pratinjau" : "Close preview"}
                title="Close (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Main Image Stage — Dominated Viewport & Intrinsic Aspect Ratio Fit */}
            <div
              className="flex-1 w-full max-w-7xl mx-auto flex items-center justify-center relative my-auto py-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Navigation Arrow */}
              {gallery.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-1 sm:left-4 z-30 min-w-[44px] min-h-[44px] p-3 rounded-full bg-white/10 hover:bg-[#A9F1DF] text-white hover:text-[#171717] border border-white/20 backdrop-blur-md transition-all shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#A9F1DF]"
                  aria-label={locale === "id" ? "Foto sebelumnya" : "Previous screenshot"}
                  title="Previous (←)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Central Image Renderer with Intrinsic Viewport Fit */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 0.985, y: 4 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.985, y: 4 }
                  }
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="relative flex items-center justify-center max-w-[94vw] max-h-[82vh]"
                >
                  {imgError ? (
                    <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/10 border border-white/20 text-center text-white backdrop-blur-md max-w-sm">
                      <div className="p-3 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        <AlertTriangle className="w-8 h-8" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-bold">
                          {locale === "id"
                            ? "Screenshot tidak dapat ditampilkan"
                            : "Screenshot unavailable"}
                        </h4>
                        <p className="text-xs text-slate-300">
                          {locale === "id"
                            ? "Berkas gambar tidak dapat dimuat saat ini."
                            : "The image file could not be loaded."}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setImgError(false);
                          setImgLoading(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A9F1DF] text-[#171717] font-bold text-xs hover:bg-[#82E8D3] transition-colors shadow-sm min-h-[40px]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{locale === "id" ? "Coba lagi" : "Retry"}</span>
                      </button>
                    </div>
                  ) : (
                    /* Native img element with max viewport constraint to prevent layout distortion */
                    /* eslint-disable-next-html-element-for-img */
                    <img
                      src={gallery[selectedIndex]}
                      alt={`${projectTitle} - ${locale === "id" ? "Tangkapan Layar" : "Screenshot"} ${selectedIndex + 1}`}
                      onLoad={() => setImgLoading(false)}
                      onError={() => setImgError(true)}
                      className={`max-w-[92vw] max-h-[80vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl border border-white/15 shadow-2xl transition-opacity duration-200 select-none ${
                        imgLoading ? "opacity-40" : "opacity-100"
                      }`}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Right Navigation Arrow */}
              {gallery.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-1 sm:right-4 z-30 min-w-[44px] min-h-[44px] p-3 rounded-full bg-white/10 hover:bg-[#A9F1DF] text-white hover:text-[#171717] border border-white/20 backdrop-blur-md transition-all shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#A9F1DF]"
                  aria-label={locale === "id" ? "Foto selanjutnya" : "Next screenshot"}
                  title="Next (→)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom Minimal Floating Controls / Metadata */}
            <div
              className="w-full flex items-center justify-between max-w-7xl mx-auto z-30 text-[11px] font-mono-code text-slate-300 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md">
                <span className="hidden sm:inline">
                  ← → {locale === "id" ? "Navigasi" : "Navigate"}
                </span>
                <span>Esc {locale === "id" ? "Tutup" : "Close"}</span>
                <span className="sm:hidden">
                  {locale === "id" ? "Usap layar" : "Swipe left/right"}
                </span>
              </div>

              <span className="text-[#A9F1DF] font-bold tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                SIN.OS
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
