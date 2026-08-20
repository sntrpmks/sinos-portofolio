import { z } from "zod";

export const LocalizedProjectContentSchema = z.object({
  title: z.string(),
  role: z.string(),
  summary: z.string(),
  description: z.string(),
  problem: z.string(),
  solution: z.string(),
  architecture: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      subtext: z.string().optional(),
      type: z.string(),
    })
  ),
  implementation: z.array(z.string()),
  challenges: z.array(z.string()),
  results: z.array(z.string()),
  lessons: z.array(z.string()),
});

export type LocalizedProjectContent = z.infer<typeof LocalizedProjectContentSchema>;

export const ProjectSchema = z.object({
  caseFileId: z.string(),
  slug: z.string(),
  title: z.string().optional(),
  year: z.string(),
  status: z.enum(["Completed", "Building", "Experimental", "Archived"]),
  role: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()),
  problem: z.string().optional(),
  solution: z.string().optional(),
  architecture: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        subtext: z.string().optional(),
        type: z.string(),
      })
    )
    .optional(),
  implementation: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  results: z.array(z.string()).optional(),
  lessons: z.array(z.string()).optional(),
  github: z.string().optional(),
  demo: z.string().optional(),
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  featured: z.boolean(),
  locales: z
    .object({
      en: LocalizedProjectContentSchema.optional(),
      id: LocalizedProjectContentSchema.optional(),
    })
    .optional(),
  en: LocalizedProjectContentSchema.optional(),
  id: LocalizedProjectContentSchema.optional(),
});

export interface Project {
  caseFileId: string;
  slug: string;
  year: string;
  status: "Completed" | "Building" | "Experimental" | "Archived";
  technologies: string[];
  github?: string;
  demo?: string;
  coverImage?: string;
  gallery?: string[];
  featured: boolean;
  title: string;
  role: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  architecture: { id: string; label: string; subtext?: string; type: string }[];
  implementation: string[];
  challenges: string[];
  results: string[];
  lessons: string[];
  locales?: {
    en?: LocalizedProjectContent;
    id?: LocalizedProjectContent;
  };
  en?: LocalizedProjectContent;
  id?: LocalizedProjectContent;
}

export const LocalizedExperienceContentSchema = z.object({
  title: z.string(),
  organization: z.string(),
  role: z.string(),
  location: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
});

export type LocalizedExperienceContent = z.infer<typeof LocalizedExperienceContentSchema>;

export const ExperienceSchema = z.object({
  id: z.string(),
  year: z.string(),
  title: z.string().optional(),
  organization: z.string().optional(),
  role: z.string().optional(),
  period: z.string(),
  location: z.string().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  type: z.enum(["education", "work", "bootcamp", "internship"]),
  locales: z
    .object({
      en: LocalizedExperienceContentSchema.optional(),
      id: LocalizedExperienceContentSchema.optional(),
    })
    .optional(),
  en: LocalizedExperienceContentSchema.optional(),
});

export interface Experience {
  id: string;
  year: string;
  period: string;
  type: "education" | "work" | "bootcamp" | "internship";
  title: string;
  organization: string;
  role: string;
  location: string;
  description: string;
  highlights: string[];
  locales?: {
    en?: LocalizedExperienceContent;
    id?: LocalizedExperienceContent;
  };
  en?: LocalizedExperienceContent;
}

export const LocalizedTechItemContentSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type LocalizedTechItemContent = z.infer<typeof LocalizedTechItemContentSchema>;

export const TechItemSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  category: z.enum(["Frontend", "Backend", "Database", "AI & Integration", "Tooling & DevOps"]),
  evidenceProjects: z.array(z.string()),
  evidenceLevel: z.enum(["High", "Proven", "Active"]),
  projectCount: z.number(),
  description: z.string().optional(),
  locales: z
    .object({
      en: LocalizedTechItemContentSchema.optional(),
      id: LocalizedTechItemContentSchema.optional(),
    })
    .optional(),
  en: LocalizedTechItemContentSchema.optional(),
});

export interface TechItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "AI & Integration" | "Tooling & DevOps";
  evidenceProjects: string[];
  evidenceLevel: "High" | "Proven" | "Active";
  projectCount: number;
  description: string;
  locales?: {
    en?: LocalizedTechItemContent;
    id?: LocalizedTechItemContent;
  };
  en?: LocalizedTechItemContent;
}

export const LocalizedCertificateContentSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  category: z.string(),
  description: z.string(),
});

export type LocalizedCertificateContent = z.infer<typeof LocalizedCertificateContentSchema>;

export const CertificateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  issuer: z.string().optional(),
  issueDate: z.string(),
  credentialUrl: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  locales: z
    .object({
      en: LocalizedCertificateContentSchema.optional(),
      id: LocalizedCertificateContentSchema.optional(),
    })
    .optional(),
  en: LocalizedCertificateContentSchema.optional(),
});

export interface Certificate {
  id: string;
  issueDate: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
  credentialUrl?: string;
  image?: string;
  images?: string[];
  locales?: {
    en?: LocalizedCertificateContent;
    id?: LocalizedCertificateContent;
  };
  en?: LocalizedCertificateContent;
}
