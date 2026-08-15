import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/content";
import { CaseFileDetailClient } from "@/components/projects/CaseFileDetailClient";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function CaseFileDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseFileDetailClient project={project} />;
}
