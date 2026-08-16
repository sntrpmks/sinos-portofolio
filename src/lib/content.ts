import fs from "fs";
import path from "path";
import { Locale } from "@/lib/i18n";
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
import {
  getLocalizedProject,
  getLocalizedExperience,
  getLocalizedTechItem,
  getLocalizedCertificate,
} from "@/lib/content-helpers";

export {
  getLocalizedProject,
  getLocalizedExperience,
  getLocalizedTechItem,
  getLocalizedCertificate,
};

const contentDir = path.join(process.cwd(), "content");

export function getProjects(locale: Locale = "en"): Project[] {
  const projectsDir = path.join(contentDir, "projects");
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".json"));

  const rawProjects = files.map((file) => {
    const filePath = path.join(projectsDir, file);
    const rawData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(rawData);
    return ProjectSchema.parse(json) as Project;
  });

  const projects = rawProjects.map((p) => getLocalizedProject(p, locale));

  return projects.sort((a, b) => {
    const caseA = parseInt(a.caseFileId.replace(/\D/g, "")) || 0;
    const caseB = parseInt(b.caseFileId.replace(/\D/g, "")) || 0;
    return caseB - caseA;
  });
}

export function getProjectBySlug(slug: string, locale: Locale = "en"): Project | undefined {
  const projects = getProjects(locale);
  return projects.find((p) => p.slug === slug);
}

export function getExperiences(locale: Locale = "en"): Experience[] {
  const expPath = path.join(contentDir, "experience", "index.json");
  if (!fs.existsSync(expPath)) return [];

  const rawData = fs.readFileSync(expPath, "utf-8");
  const json = JSON.parse(rawData);
  const parsed = json.map((item: unknown) => ExperienceSchema.parse(item));
  return parsed.map((e: Experience) => getLocalizedExperience(e, locale));
}

export function getTechStack(locale: Locale = "en"): TechItem[] {
  const techPath = path.join(contentDir, "tech-stack", "index.json");
  if (!fs.existsSync(techPath)) return [];

  const rawData = fs.readFileSync(techPath, "utf-8");
  const json = JSON.parse(rawData);
  const parsed = json.map((item: unknown) => TechItemSchema.parse(item));
  return parsed.map((t: TechItem) => getLocalizedTechItem(t, locale));
}

export function getCertificates(locale: Locale = "en"): Certificate[] {
  const certPath = path.join(contentDir, "certificates", "index.json");
  if (!fs.existsSync(certPath)) return [];

  const rawData = fs.readFileSync(certPath, "utf-8");
  const json = JSON.parse(rawData);
  const items: Certificate[] = json.map((item: unknown) => CertificateSchema.parse(item));
  const localized = items.map((c) => getLocalizedCertificate(c, locale));

  return localized.sort((a, b) => {
    const yearA = parseInt(a.issueDate.replace(/\D/g, "")) || 0;
    const yearB = parseInt(b.issueDate.replace(/\D/g, "")) || 0;
    return yearB - yearA;
  });
}

export function getAboutData(locale: Locale = "en") {
  const aboutPath = path.join(contentDir, "about", "index.json");
  if (!fs.existsSync(aboutPath)) return null;

  const rawData = fs.readFileSync(aboutPath, "utf-8");
  const json = JSON.parse(rawData);
  if (json[locale]) {
    return {
      ...json,
      headline: json[locale].headline || json.headline,
      bio: json[locale].bio || json.bio,
      philosophy: json[locale].philosophy || json.philosophy,
      corePrinciples: json[locale].corePrinciples || json.corePrinciples,
    };
  }
  return json;
}
