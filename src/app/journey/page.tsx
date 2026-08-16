import React from "react";
import { getExperiences, getCertificates } from "@/lib/content";
import { JourneyPageClient } from "@/features/journey";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lini Masa Perjalanan & Sertifikasi Terverifikasi",
  description:
    "Lini masa pengalaman coding Ahmad Sinatria Pamungkas, magang di Proactive Robotika, serta sertifikasi terverifikasi BNSP Junior Coder & Oracle Java Fundamentals.",
  keywords: [
    "Ahmad Sinatria Pamungkas",
    "portofolio web",
    "sertifikasi bnsp junior coder",
    "oracle java fundamentals",
    "pengalaman magang robotika",
  ],
};

export default function JourneyPage() {
  const experiences = getExperiences();
  const certificates = getCertificates();

  return <JourneyPageClient experiences={experiences} certificates={certificates} />;
}
