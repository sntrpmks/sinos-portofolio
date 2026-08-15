"use client";

import React from "react";
import { useViewMode } from "@/components/context/ViewModeContext";
import { Lightbulb, CheckCircle2, Cpu } from "lucide-react";

export function HowIThink() {
  const { locale } = useViewMode();

  const stepsEn = [
    {
      step: "01",
      title: "Understand the problem",
      description: "Deeply analyze constraints, user bottlenecks, and root domain requirements before writing code.",
    },
    {
      step: "02",
      title: "Break down the problem",
      description: "Deconstruct complex requests into simple, decoupled, testable components with explicit input/output boundaries.",
    },
    {
      step: "03",
      title: "Design the system architecture",
      description: "Establish clear data schemas, type contracts, security parameters, and UI interaction flows.",
    },
    {
      step: "04",
      title: "Build the smallest useful version",
      description: "Deliver production-ready core functionality rapidly without premature over-engineering.",
    },
    {
      step: "05",
      title: "Test & measure",
      description: "Empirically verify performance metrics, responsiveness, and edge-case handling using real runtime logs.",
    },
    {
      step: "06",
      title: "Refine & improve",
      description: "Refactor based on empirical feedback, enhance legibility, maintain security, and optimize build output.",
    },
  ];

  const stepsId = [
    {
      step: "01",
      title: "Pahami akar masalah",
      description: "Memahami batasan, kendala pengguna, dan kebutuhan utama sebelum mulai menulis kode.",
    },
    {
      step: "02",
      title: "Pecah masalah jadi bagian kecil",
      description: "Membagi alur yang rumit menjadi bagian-bagian sederhana yang lebih mudah dikerjakan dan diuji secara terpisah.",
    },
    {
      step: "03",
      title: "Rancang arsitektur sistem",
      description: "Menyusun struktur data, keamanan, dan alur aplikasi agar rapi dan jelas.",
    },
    {
      step: "04",
      title: "Bangun versi awal yang berfungsi",
      description: "Membuat fungsi utama yang siap pakai terlebih dahulu tanpa rumit berlebihan.",
    },
    {
      step: "05",
      title: "Uji & ukur performa",
      description: "Memastikan kecepatan, kerapian interaksi, dan menangani kemungkinan error menggunakan data pengujian.",
    },
    {
      step: "06",
      title: "Sempurnakan & rapikan",
      description: "Memperbaiki kode berdasarkan hasil pengujian, meningkatkan keterbacaan, dan mengoptimalkan performa.",
    },
  ];

  const principlesEn = [
    {
      number: "01",
      title: "Simplicity over unnecessary complexity.",
      detail: "Clean architecture with straightforward code is vastly superior to complex, nested abstractions.",
    },
    {
      number: "02",
      title: "Evidence over assumption.",
      detail: "Base engineering claims, skill proficiency, and diagnostic fixes on verifiable runtime evidence.",
    },
    {
      number: "03",
      title: "Understand the system, not just the syntax.",
      detail: "True mastery comes from understanding how browsers, operating systems, and network protocols execute under the hood.",
    },
    {
      number: "04",
      title: "Build, test, improve.",
      detail: "Relentlessly refine products through hands-on building, strict type checking, and continuous learning.",
    },
  ];

  const principlesId = [
    {
      number: "01",
      title: "Kesederhanaan di atas kompleksitas yang tak perlu.",
      detail: "Arsitektur bersih dengan kode yang jelas jauh lebih unggul dibandingkan abstraksi rumit bersarang.",
    },
    {
      number: "02",
      title: "Bukti empiris di atas asumsi.",
      detail: "Mendasarkan klaim rekayasa, keahlian, dan perbaikan diagnostik pada bukti yang dapat diverifikasi.",
    },
    {
      number: "03",
      title: "Pahami sistem, bukan sekadar sintaksis.",
      detail: "Penguasaan sejati berasal dari pemahaman bagaimana peramban, sistem operasi, dan jaringan bekerja.",
    },
    {
      number: "04",
      title: "Bangun, uji, dan tingkatkan.",
      detail: "Secara berkelanjutan menyempurnakan produk melalui praktik nyata, tipe data ketat, dan pembelajaran terus-menerus.",
    },
  ];

  const steps = locale === "id" ? stepsId : stepsEn;
  const principles = locale === "id" ? principlesId : principlesEn;

  return (
    <div className="flex flex-col gap-10">
      {/* 6 Steps */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-[#E6E6E3] pb-3">
          <Lightbulb className="w-5 h-5 text-[#00695C]" />
          <h2 className="text-xl font-bold text-[#171717]">
            {locale === "id" ? "Metodologi Pemecahan Masalah" : "Problem-Solving Methodology"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="card-minimal p-5 flex flex-col gap-2.5 card-minimal-interactive"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-code font-bold text-xl text-[#00695C]">{item.step}</span>
              </div>
              <h3 className="text-base font-bold text-[#171717]">{item.title}</h3>
              <p className="text-xs text-[#2A2A2A] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Principles */}
      <div className="card-minimal p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-[#E6E6E3] pb-3">
          <Cpu className="w-5 h-5 text-[#171717]" />
          <h2 className="text-xl font-bold text-[#171717]">
            {locale === "id" ? "Prinsip Utama Rekayasa" : "Core Engineering Principles"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((pr) => (
            <div key={pr.number} className="p-4 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-mono-code text-xs font-bold text-[#00695C]">
                <CheckCircle2 className="w-4 h-4 text-[#00695C] shrink-0" />
                <span>PRINSIP {pr.number}</span>
              </div>
              <h4 className="text-sm font-bold text-[#171717]">{pr.title}</h4>
              <p className="text-xs text-[#666666] leading-relaxed">{pr.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
