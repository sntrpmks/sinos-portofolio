"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Certificate } from "@/types/content";
import { useViewMode } from "@/components/context/ViewModeContext";
import { Award, ExternalLink, Eye, X } from "lucide-react";

interface CertificationsGridProps {
  certificates: Certificate[];
}

export function CertificationsGrid({ certificates }: CertificationsGridProps) {
  const { t } = useViewMode();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#00695C]" />
          <h2 className="text-xl font-bold text-[#171717]">{t.journeyPage.credentialsTitle}</h2>
        </div>
        <span className="text-xs font-mono-code text-[#666666]">
          {certificates.length} Credentials
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="card-minimal p-5 flex flex-col justify-between gap-4 card-minimal-interactive group relative"
          >
            <div className="flex flex-col gap-3">
              {/* Certificate Image Preview */}
              {cert.image && (
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="w-full h-36 relative rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] overflow-hidden cursor-pointer group/img"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover rounded-xl transition-transform duration-300 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[2px]">
                    <Eye className="w-4 h-4" />
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
                  onClick={() => setSelectedCert(cert)}
                  className="flex items-center gap-1.5 text-[#00695C] hover:underline"
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
          </div>
        ))}
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative bg-white rounded-2xl p-4 sm:p-6 max-w-3xl w-full max-h-[90vh] flex flex-col gap-4 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-3">
              <div>
                <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase">
                  {selectedCert.issuer} • {selectedCert.issueDate}
                </span>
                <h3 className="text-lg font-bold text-[#171717]">{selectedCert.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-[#F0F0ED] hover:bg-[#E6E6E3] text-[#171717] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedCert.image && (
              <div className="relative w-full h-[60vh] rounded-xl bg-[#F0F0ED] overflow-hidden border border-[#E6E6E3]">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            )}

            <p className="text-xs text-[#666666] leading-relaxed">{selectedCert.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
