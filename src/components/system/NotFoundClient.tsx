"use client";

import React from "react";
import Link from "next/link";
import { useViewMode } from "@/components/context/ViewModeContext";
import { AlertCircle, ArrowLeft } from "lucide-react";

export function NotFoundClient() {
  const { locale } = useViewMode();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md card-minimal p-8 flex flex-col items-center text-center gap-6 shadow-xl">
        <div className="p-4 rounded-2xl bg-[#E6F9F5] border border-[#B2F3E5] text-[#00695C]">
          <AlertCircle className="w-10 h-10" />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-widest">
            ERROR 404 // ROUTE_NOT_FOUND
          </span>
          <h1 className="text-3xl font-extrabold text-[#171717]">
            {locale === "id" ? "Halaman Tidak Ditemukan" : "Page Not Found"}
          </h1>
          <p className="text-xs text-[#666666] leading-relaxed">
            {locale === "id"
              ? "Rute sistem SIN.OS yang Anda minta tidak ditemukan atau telah dipindahkan."
              : "The requested SIN.OS system route does not exist or has been relocated."}
          </p>
        </div>

        <div className="w-full p-3 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] font-mono-code text-[11px] text-[#2A2A2A] text-left">
          <span className="text-[#00695C]">$</span> sinos resolve --path &quot;unknown&quot;
          <br />
          <span className="text-rose-600">
            {locale === "id" ? "Status: 404 Tidak Ditemukan" : "Status: 404 Not Found"}
          </span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171717] text-white font-medium text-xs hover:bg-[#00695C] transition-colors w-full justify-center shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "id" ? "Kembali ke Beranda" : "Return to Home"}</span>
        </Link>
      </div>
    </div>
  );
}
