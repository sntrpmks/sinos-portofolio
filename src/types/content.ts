import { z } from "zod";

export const ProjectSchema = z.object({
  caseFileId: z.string(),
  slug: z.string(),
  title: z.string(),
  year: z.string(),
  status: z.enum(["Completed", "Building", "Experimental", "Archived"]),
  role: z.string(),
  summary: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
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
  github: z.string().optional(),
  demo: z.string().optional(),
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  featured: z.boolean(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ExperienceSchema = z.object({
  id: z.string(),
  year: z.string(),
  title: z.string(),
  organization: z.string(),
  role: z.string(),
  period: z.string(),
  location: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  type: z.enum(["education", "work", "bootcamp", "internship"]),
});

export type Experience = z.infer<typeof ExperienceSchema>;

export const TechItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["Frontend", "Backend", "Database", "AI & Integration", "Tooling & DevOps"]),
  evidenceProjects: z.array(z.string()),
  evidenceLevel: z.enum(["High", "Proven", "Active"]),
  projectCount: z.number(),
  description: z.string(),
});

export type TechItem = z.infer<typeof TechItemSchema>;

export const CertificateSchema = z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
  credentialUrl: z.string().optional(),
  category: z.string(),
  description: z.string(),
  image: z.string().optional(),
});

export type Certificate = z.infer<typeof CertificateSchema>;
