import React from "react";
import { AboutPageClient } from "@/features/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang & Filosofi Pemrograman",
  description:
    "Profil lengkap dan filosofi pengembangan sistem Ahmad Sinatria Pamungkas — Full Stack Developer, mahasiswa Manajemen Informatika UNSIQ, & alumni RPL SMKN 1 Wonosobo.",
  keywords: [
    "Ahmad Sinatria Pamungkas",
    "tentang full stack developer",
    "manajemen informatika unsiq",
    "smkn 1 wonosobo rpl",
    "portofolio web wonosobo",
  ],
};

export default function AboutPage() {
  return <AboutPageClient />;
}
