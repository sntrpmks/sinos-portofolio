"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Certificate } from "@/types/content";
import { useViewMode } from "@/components/context/ViewModeContext";
import { getLocalizedCertificate } from "@/lib/content-helpers";
import {
  X,
  ExternalLink,
  Award,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";

interface CertificateViewerProps {
  certificate: Certificate | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | HTMLDivElement | null>;
}

export function CertificateViewer({
  certificate,
  onClose,
  triggerRef,
}: CertificateViewerProps) {
  const { locale, setLightboxOpen, t } = useViewMode();
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  // Compute list of images
  const imageList = certificate
    ? certificate.images && certificate.images.length > 0
      ? certificate.images
      : certificate.image
      ? [certificate.image]
      : []
    : [];

  const totalPages = imageList.length;
  const currentImage = imageList[currentIndex] || certificate?.image;

  // Reset state when certificate changes
  useEffect(() => {
    // Use setTimeout to avoid cascading render warning
    const timer = setTimeout(() => {
      setCurrentIndex(0);
      setImgError(false);
      setImgLoading(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [certificate]);

  // Lock scroll & notify context
  useEffect(() => {
    if (certificate) {
      setLightboxOpen(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      setLightboxOpen(false);
      document.body.style.overflow = "";
    }
    return () => {
      setLightboxOpen(false);
      document.body.style.overflow = "";
    };
  }, [certificate, setLightboxOpen]);

  // Close handler with focus restoration
  const handleClose = useCallback(() => {
    onClose();
    if (triggerRef?.current) {
      triggerRef.current.focus();
    }
  }, [onClose, triggerRef]);

  // Next / Previous slide handlers
  const handlePrev = useCallback(() => {
    if (totalPages <= 1) return;
    setImgLoading(true);
    setImgError(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  }, [totalPages]);

  const handleNext = useCallback(() => {
    if (totalPages <= 1) return;
    setImgLoading(true);
    setImgError(false);
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  }, [totalPages]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!certificate) return;
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [certificate, handleClose, handlePrev, handleNext]);

  if (!certificate) return null;

  const activeCert = getLocalizedCertificate(certificate, locale);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.05 : 0.2 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-[#141414]/94 backdrop-blur-xl p-3 sm:p-6 select-none"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
          paddingRight: "max(0.75rem, env(safe-area-inset-right))",
        }}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate Viewer: ${activeCert.title}`}
      >
        {/* Top Floating Header */}
        <div
          className="w-full flex items-center justify-between max-w-6xl mx-auto z-30 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-full bg-white/10 border border-white/20 text-[#A9F1DF] backdrop-blur-md shadow-xs flex items-center">
              <Award className="w-4 h-4 text-[#A9F1DF]" />
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code font-bold text-[#A9F1DF] uppercase tracking-wider">
                  {activeCert.issuer} • {certificate.issueDate}
                </span>
                {totalPages > 1 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#00695C]/80 border border-[#A9F1DF]/40 text-[#A9F1DF] text-[10px] font-mono-code font-bold flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    <span>
                      {locale === "id" ? `Halaman ${currentIndex + 1}/${totalPages}` : `Page ${currentIndex + 1}/${totalPages}`}
                    </span>
                  </span>
                )}
              </div>
              <span className="text-xs font-mono-code text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-md hidden xs:inline">
                {activeCert.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white/10 hover:bg-[#A9F1DF] text-white hover:text-[#171717] border border-white/20 backdrop-blur-md transition-all shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#A9F1DF]"
              aria-label={locale === "id" ? "Tutup pratinjau sertifikat" : "Close certificate preview"}
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Central Stage with Navigation Arrows & Image Display */}
        <div
          className="flex-1 w-full max-w-6xl mx-auto flex items-center justify-center relative my-auto py-2 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button */}
          {totalPages > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-1 sm:left-4 z-30 p-3 rounded-full bg-black/50 hover:bg-[#A9F1DF] text-white hover:text-[#171717] border border-white/20 backdrop-blur-md transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#A9F1DF]"
              aria-label={locale === "id" ? "Halaman sebelumnya" : "Previous slide"}
              title="Previous (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Certificate Image Frame */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${certificate.id}-${currentIndex}`}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.98, x: 10 }
              }
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.98, x: -10 }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex items-center justify-center max-w-[94vw] max-h-[74vh]"
            >
              {imgError || !currentImage ? (
                <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/10 border border-white/20 text-center text-white backdrop-blur-md max-w-sm">
                  <div className="p-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold">{activeCert.title}</h4>
                    <p className="text-xs text-slate-300">
                      {locale === "id"
                        ? "Berkas pratinjau sertifikat tidak dapat dimuat."
                        : "Certificate image preview is unavailable."}
                    </p>
                  </div>
                  {certificate.credentialUrl && (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A9F1DF] text-[#171717] font-bold text-xs hover:bg-[#82E8D3] transition-colors shadow-sm min-h-[40px]"
                    >
                      <span>{t.milestones.credentialLink}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ) : (
                /* eslint-disable-next-html-element-for-img */
                <img
                  src={currentImage}
                  alt={`${activeCert.title} - Page ${currentIndex + 1}`}
                  onLoad={() => setImgLoading(false)}
                  onError={() => setImgError(true)}
                  className={`max-w-[92vw] max-h-[72vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl transition-opacity duration-200 ${
                    imgLoading ? "opacity-40" : "opacity-100"
                  }`}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          {totalPages > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-1 sm:right-4 z-30 p-3 rounded-full bg-black/50 hover:bg-[#A9F1DF] text-white hover:text-[#171717] border border-white/20 backdrop-blur-md transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#A9F1DF]"
              aria-label={locale === "id" ? "Halaman selanjutnya" : "Next slide"}
              title="Next (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Floating Footer & Page Dots */}
        <div
          className="w-full flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto z-30 gap-3 text-xs pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-0.5 text-center sm:text-left">
            <span className="text-white font-bold text-sm sm:text-base">
              {activeCert.title}
            </span>
            <p className="text-slate-300 text-[11px] max-w-xl line-clamp-2">
              {activeCert.description}
            </p>
          </div>

          {/* Slide Indicator Dots (if multi-page) */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
              {imageList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setImgLoading(true);
                    setImgError(false);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-[#A9F1DF] scale-125"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 shrink-0">
            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A9F1DF] text-[#171717] font-bold text-xs hover:bg-[#82E8D3] transition-colors shadow-md min-h-[38px]"
              >
                <span>{t.milestones.credentialLink}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <span className="text-[#A9F1DF] font-mono-code font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md hidden xs:inline">
              SIN.OS
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

