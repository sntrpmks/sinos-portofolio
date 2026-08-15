import fs from "fs";
import path from "path";
import {
  Project,
  ProjectSchema,
  Experience,
  ExperienceSchema,
  TechItem,
  TechItemSchema,
  Certificate,
  CertificateSchema,
} from "@/types/content";

const contentDir = path.join(process.cwd(), "content");

export function getProjects(): Project[] {
  const projectsDir = path.join(contentDir, "projects");
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".json"));

  const projects = files.map((file) => {
    const filePath = path.join(projectsDir, file);
    const rawData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(rawData);
    return ProjectSchema.parse(json);
  });

  return projects.sort((a, b) => {
    const caseA = parseInt(a.caseFileId.replace(/\D/g, "")) || 0;
    const caseB = parseInt(b.caseFileId.replace(/\D/g, "")) || 0;
    return caseB - caseA;
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug);
}

export function getExperiences(): Experience[] {
  const expPath = path.join(contentDir, "experience", "index.json");
  if (!fs.existsSync(expPath)) return [];

  const rawData = fs.readFileSync(expPath, "utf-8");
  const json = JSON.parse(rawData);
  return json.map((item: unknown) => ExperienceSchema.parse(item));
}

export function getTechStack(): TechItem[] {
  const techPath = path.join(contentDir, "tech-stack", "index.json");
  if (!fs.existsSync(techPath)) return [];

  const rawData = fs.readFileSync(techPath, "utf-8");
  const json = JSON.parse(rawData);
  return json.map((item: unknown) => TechItemSchema.parse(item));
}

export function getCertificates(): Certificate[] {
  const certPath = path.join(contentDir, "certificates", "index.json");
  if (!fs.existsSync(certPath)) return [];

  const rawData = fs.readFileSync(certPath, "utf-8");
  const json = JSON.parse(rawData);
  const items: Certificate[] = json.map((item: unknown) => CertificateSchema.parse(item));

  return items.sort((a, b) => {
    const yearA = parseInt(a.issueDate.replace(/\D/g, "")) || 0;
    const yearB = parseInt(b.issueDate.replace(/\D/g, "")) || 0;
    return yearB - yearA;
  });
}

export function getAboutData() {
  const aboutPath = path.join(contentDir, "about", "index.json");
  if (!fs.existsSync(aboutPath)) return null;

  const rawData = fs.readFileSync(aboutPath, "utf-8");
  return JSON.parse(rawData);
}
