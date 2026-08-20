"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Certificate } from "@/types/content";
import { useViewMode } from "@/components/context/ViewModeContext";
import { getLocalizedCertificate } from "@/lib/content-helpers";
import { CertificateViewer } from "@/components/certifications/CertificateViewer";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Award, ExternalLink, Eye, Layers } from "lucide-react";

interface CertificationsGridProps {
  certificates: Certificate[];
}

export function CertificationsGrid({ certificates }: CertificationsGridProps) {
  const { locale, t } = useViewMode();
  const shouldReduceMotion = useReducedMotion();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const triggerRef = useRef<HTMLButtonElement | HTMLDivElement | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <SectionReveal className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#00695C]" />
          <h2 className="text-xl font-bold text-[#171717]">{t.journeyPage.credentialsTitle}</h2>
        </div>
        <span className="text-xs font-mono-code text-[#666666]">
          {certificates.length} {locale === "id" ? "Sertifikat" : "Credentials"}
        </span>
      </div>

      <motion.div
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {certificates.map((rawCert) => {
          const cert = getLocalizedCertificate(rawCert, locale);
          const hasMultiplePages = Boolean(rawCert.images && rawCert.images.length > 1);
          return (
            <motion.div
              key={cert.id}
              variants={shouldReduceMotion ? undefined : itemVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="card-minimal p-5 flex flex-col justify-between gap-4 card-minimal-interactive group relative"
            >
              <div className="flex flex-col gap-3">
                {/* Certificate Image Preview */}
                {cert.image && (
                  <div
                    onClick={(e) => {
                      triggerRef.current = e.currentTarget;
                      setSelectedCert(rawCert);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${t.milestones.previewScan}: ${cert.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        triggerRef.current = e.currentTarget;
                        setSelectedCert(rawCert);
                      }
                    }}
                    className="w-full h-36 relative rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] overflow-hidden cursor-pointer group/img focus:outline-none focus:ring-2 focus:ring-[#00695C]"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-xl transition-transform duration-500 group-hover/img:scale-105"
                    />
                    {hasMultiplePages && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[10px] font-mono-code font-bold flex items-center gap-1 z-10 border border-white/20">
                        <Layers className="w-3 h-3 text-[#A9F1DF]" />
                        <span>
                          {rawCert.images?.length} {locale === "id" ? "Hal" : "Pages"}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[2px]">
                      <Eye className="w-4 h-4 text-[#A9F1DF]" />
                      <span>{t.milestones.previewScan}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-mono-code text-[#666666]">
                  <span className="text-[#00695C] font-bold uppercase">{cert.issuer}</span>
                  <span>{cert.issueDate}</span>
                </div>

                <h3 className="text-base font-bold text-[#171717] group-hover:text-[#00695C] transition-colors leading-snug">
                  {cert.title}
                </h3>
                <span className="text-xs text-[#8A8A8A] font-medium">{cert.category}</span>
                <p className="text-xs text-[#2A2A2A] leading-relaxed">{cert.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E6E6E3] text-xs font-semibold">
                {cert.image && (
                  <button
                    onClick={(e) => {
                      triggerRef.current = e.currentTarget;
                      setSelectedCert(rawCert);
                    }}
                    className="flex items-center gap-1.5 text-[#00695C] hover:underline focus:outline-none focus:ring-1 focus:ring-[#00695C]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.milestones.previewScan}</span>
                  </button>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#171717] hover:text-[#00695C] transition-colors ml-auto"
                  >
                    <span>{t.milestones.credentialLink}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8A8A8A]" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Immersive Certificate Viewer */}
      <CertificateViewer
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
        triggerRef={triggerRef}
      />
    </SectionReveal>
  );
}


