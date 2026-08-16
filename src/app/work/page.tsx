import React from "react";
import { getProjects } from "@/lib/content";
import { WorkPageClient } from "@/features/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio Web & Studi Kasus Proyek",
  description:
    "Jelajahi portofolio web dan studi kasus proyek sistem buatan Ahmad Sinatria Pamungkas. Meliputi Web Event SMKN 1 Wonosobo, CashFlowku Android Java, dan Rakitin Aja.",
  keywords: [
    "portofolio web",
    "studi kasus web",
    "portofolio proyek developer",
    "Ahmad Sinatria Pamungkas",
    "aplikasi web full stack indonesia",
  ],
};

export default function WorkPage() {
  const projects = getProjects();

  return <WorkPageClient projects={projects} />;
}
