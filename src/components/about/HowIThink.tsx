"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { useViewMode } from "@/components/context/ViewModeContext";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Lightbulb, CheckCircle2, Cpu } from "lucide-react";

export function HowIThink() {
  const { locale } = useViewMode();
  const shouldReduceMotion = useReducedMotion();

  const stepsEn = [
    {
      step: "01",
      title: "Understand the problem",
      description: "Analyze user bottlenecks and domain requirements clearly before writing code.",
    },
    {
      step: "02",
      title: "Break down into components",
      description: "Deconstruct complex tasks into clean, testable modules with clear inputs and outputs.",
    },
    {
      step: "03",
      title: "Design system architecture",
      description: "Establish clear data schemas, type definitions, and UI interaction flows early.",
    },
    {
      step: "04",
      title: "Build a working MVP",
      description: "Deliver functional core features quickly without premature over-engineering.",
    },
    {
      step: "05",
      title: "Test & measure",
      description: "Verify performance, responsiveness, and edge-case handling under real usage conditions.",
    },
    {
      step: "06",
      title: "Refine & scale",
      description: "Optimize code readability, clean up bottlenecks, and document key architecture decisions.",
    },
  ];

  const stepsId = [
    {
      step: "01",
      title: "Pahami masalahnya",
      description: "Analisis kebutuhan dan masalah utama pengguna sebelum mulai menulis kode.",
    },
    {
      step: "02",
      title: "Pecah jadi komponen kecil",
      description: "Bagi tugas yang kompleks menjadi bagian-bagian kecil yang jelas alur masukan dan keluarannya.",
    },
    {
      step: "03",
      title: "Rancang arsitektur sistem",
      description: "Tentukan struktur data, tipe variabel, dan alur antarmuka dari awal.",
    },
    {
      step: "04",
      title: "Bangun versi awal yang berfungsi",
      description: "Buat fungsi utama yang siap pakai tanpa merumitkan hal yang belum diperlukan.",
    },
    {
      step: "05",
      title: "Uji & ukur performa",
      description: "Uji kecepatan, respon antarmuka, dan tangani kemungkinan error saat aplikasi dijalankan.",
    },
    {
      step: "06",
      title: "Rapikan & tingkatkan",
      description: "Tingkatkan keterbacaan kode, perbaiki bagian yang lambat, dan rapikan dokumentasi.",
    },
  ];

  const principlesEn = [
    {
      number: "01",
      title: "Simplicity over unnecessary complexity.",
      detail: "Clean, readable code with straightforward logic is always better than over-engineered patterns.",
    },
    {
      number: "02",
      title: "Verifiable proof over assumptions.",
      detail: "Base architectural decisions and diagnostic fixes on working code, tests, and actual logs.",
    },
    {
      number: "03",
      title: "Understand the system, not just the syntax.",
      detail: "True understanding comes from knowing how browsers, operating systems, networks, and databases work together.",
    },
    {
      number: "04",
      title: "Build, test, improve.",
      detail: "Continuous growth comes from shipping real projects, receiving feedback, and learning consistently.",
    },
  ];

  const principlesId = [
    {
      number: "01",
      title: "Kesederhanaan di atas kompleksitas berlebihan.",
      detail: "Kode yang rapi dan logis jauh lebih mudah dirawat daripada struktur yang sengaja dibuat rumit.",
    },
    {
      number: "02",
      title: "Bukti nyata di atas asumsi.",
      detail: "Ambil keputusan teknis dan perbaikan bug berdasarkan data pengujian dan log yang valid.",
    },
    {
      number: "03",
      title: "Pahami sistem, bukan sekadar sintaks.",
      detail: "Pemahaman sejati lahir dari mengerti bagaimana browser, sistem operasi, jaringan, dan database bekerja.",
    },
    {
      number: "04",
      title: "Bangun, uji, dan tingkatkan.",
      detail: "Kemampuan berkembang pesat lewat praktik membuat project nyata, evaluasi jujur, dan belajar konsisten.",
    },
  ];

  const steps = locale === "id" ? stepsId : stepsEn;
  const principles = locale === "id" ? principlesId : principlesEn;

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
    <div className="flex flex-col gap-10">
      {/* 6 Steps */}
      <SectionReveal className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-[#E6E6E3] pb-3">
          <Lightbulb className="w-5 h-5 text-[#00695C]" />
          <h2 className="text-xl font-bold text-[#171717]">
            {locale === "id" ? "Pendekatan Pemecahan Masalah" : "Problem-Solving Approach"}
          </h2>
        </div>

        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={shouldReduceMotion ? undefined : itemVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              className="card-minimal p-5 flex flex-col gap-2.5 card-minimal-interactive"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-code font-bold text-xl text-[#00695C]">{item.step}</span>
              </div>
              <h3 className="text-base font-bold text-[#171717]">{item.title}</h3>
              <p className="text-xs text-[#2A2A2A] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionReveal>

      {/* Core Principles */}
      <SectionReveal className="card-minimal p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-[#E6E6E3] pb-3">
          <Cpu className="w-5 h-5 text-[#171717]" />
          <h2 className="text-xl font-bold text-[#171717]">
            {locale === "id" ? "Prinsip Utama Pengembangan" : "Core Development Principles"}
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
      </SectionReveal>
    </div>
  );
}


