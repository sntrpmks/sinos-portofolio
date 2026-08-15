import React from "react";
import { getProjects } from "@/lib/content";
import { WorkPageClient } from "@/features/projects";

export const metadata = {
  title: "Case Studies & Work | SIN.OS",
  description: "Explore the digital product portfolio and software case files built by Sinatria Pamungkas.",
};

export default function WorkPage() {
  const projects = getProjects();

  return <WorkPageClient projects={projects} />;
}
