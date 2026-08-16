import React from "react";
import { ContactPageClient } from "@/features/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak & Diskusi Proyek",
  description:
    "Hubungi Ahmad Sinatria Pamungkas untuk kolaborasi pengembangan proyek web full-stack, aplikasi Android, atau diskusi peluang kerja.",
  keywords: [
    "kontak Ahmad Sinatria Pamungkas",
    "hire full stack developer indonesia",
    "portofolio web indonesia",
    "diskusi proyek web",
  ],
};

export default function ContactPage() {
  return <ContactPageClient />;
}
