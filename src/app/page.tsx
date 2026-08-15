import React from "react";
import { getProjects, getExperiences, getTechStack, getCertificates } from "@/lib/content";
import { HomePageClient } from "@/components/home/HomePageClient";

export const metadata = {
  title: "Sinatria Pamungkas — Software Developer | AI Enthusiast",
  description: "Official digital portfolio system of Sinatria Pamungkas — Software Developer | AI Enthusiast.",
};

export default function HomePage() {
  const projects = getProjects();
  const experiences = getExperiences();
  const skills = getTechStack();
  const certificates = getCertificates();

  return (
    <HomePageClient
      projects={projects}
      experiences={experiences}
      skills={skills}
      certificates={certificates}
    />
  );
}
