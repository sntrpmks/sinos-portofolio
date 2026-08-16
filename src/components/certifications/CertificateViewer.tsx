"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Certificate } from "@/types/content";
import { useViewMode } from "@/components/context/ViewModeContext";
import { getLocalizedCertificate } from "@/lib/content-helpers";
import { X, ExternalLink, Award, AlertTriangle, RotateCcw } from "lucide-react";

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

  const [imgError, setImgError] = React.useState(false);
  const [imgLoading, setImgLoading] = React.useState(true);

  // Notify global context to hide Navbar completely & lock background scroll
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

  // Reset loading and error state when certificate changes
  useEffect(() => {
    setImgError(false);
    setImgLoading(true);
  }, [certificate]);

  // Close handler with focus restoration
  const handleClose = useCallback(() => {
    onClose();
    if (triggerRef?.current) {
      triggerRef.current.focus();
    }
  }, [onClose, triggerRef]);

  // Escape Key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (certificate && e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [certificate, handleClose]);

  if (!certificate) return null;

  const activeCert = getLocalizedCertificate(certificate, locale);

  return (
    <AnimatePresence>
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
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate Viewer: ${activeCert.title}`}
      >
        {/* Top Floating Glass Header */}
        <div
          className="w-full flex items-center justify-between max-w-6xl mx-auto z-30 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-full bg-white/10 border border-white/20 text-[#A9F1DF] backdrop-blur-md shadow-xs flex items-center">
              <Award className="w-4 h-4 text-[#A9F1DF]" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-mono-code font-bold text-[#A9F1DF] uppercase tracking-wider">
                {activeCert.issuer} • {certificate.issueDate}
              </span>
              <span className="text-xs font-mono-code text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-md hidden xs:inline">
                {activeCert.title}
              </span>
            </div>
          </div>

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

        {/* Central Stage: Intrinsic Aspect Fit Certificate Image */}
        <div
          className="flex-1 w-full max-w-6xl mx-auto flex items-center justify-center relative my-auto py-2 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={certificate.id}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.97, y: 8 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.98, y: 4 }
              }
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative flex items-center justify-center max-w-[94vw] max-h-[78vh]"
            >
              {imgError || !certificate.image ? (
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
                /* Native img with max viewport constraints to preserve aspect ratio without black bars */
                /* eslint-disable-next-html-element-for-img */
                <img
                  src={certificate.image}
                  alt={activeCert.title}
                  onLoad={() => setImgLoading(false)}
                  onError={() => setImgError(true)}
                  className={`max-w-[92vw] max-h-[76vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl transition-opacity duration-200 select-none ${
                    imgLoading ? "opacity-40" : "opacity-100"
                  }`}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Floating Glass Footer Metadata */}
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
