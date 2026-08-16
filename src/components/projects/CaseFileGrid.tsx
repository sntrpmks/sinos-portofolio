"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Project } from "@/types/content";
import { CaseFileCard } from "@/components/projects/CaseFileCard";

interface CaseFileGridProps {
  projects: Project[];
}

export function CaseFileGrid({ projects }: CaseFileGridProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {projects.map((project) => (
        <CaseFileCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}

