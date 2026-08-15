"use client";

import React from "react";
import { Project } from "@/types/content";
import { CaseFileCard } from "@/components/projects/CaseFileCard";

interface CaseFileGridProps {
  projects: Project[];
}

export function CaseFileGrid({ projects }: CaseFileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <CaseFileCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
