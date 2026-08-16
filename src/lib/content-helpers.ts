import { Locale } from "@/lib/i18n";
import { Project, Experience, TechItem, Certificate } from "@/types/content";

export function getLocalizedProject(p: Project, locale: Locale = "en"): Project {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = p as any;
  const loc = p.locales?.[locale] || raw[locale] || p.en || p.locales?.en;
  return {
    ...p,
    title: loc?.title || p.title || "",
    role: loc?.role || p.role || "",
    summary: loc?.summary || p.summary || "",
    description: loc?.description || p.description || "",
    problem: loc?.problem || p.problem || "",
    solution: loc?.solution || p.solution || "",
    architecture: loc?.architecture || p.architecture || [],
    implementation: loc?.implementation || p.implementation || [],
    challenges: loc?.challenges || p.challenges || [],
    results: loc?.results || p.results || [],
    lessons: loc?.lessons || p.lessons || [],
  };
}

export function getLocalizedExperience(e: Experience, locale: Locale = "en"): Experience {
  const loc = e.locales?.[locale] || e.en || e.locales?.en;
  return {
    ...e,
    title: loc?.title || e.title || "",
    organization: loc?.organization || e.organization || "",
    role: loc?.role || e.role || "",
    location: loc?.location || e.location || "",
    description: loc?.description || e.description || "",
    highlights: loc?.highlights || e.highlights || [],
  };
}

export function getLocalizedTechItem(t: TechItem, locale: Locale = "en"): TechItem {
  const loc = t.locales?.[locale] || t.en || t.locales?.en;
  return {
    ...t,
    name: loc?.name || t.name || "",
    description: loc?.description || t.description || "",
  };
}

export function getLocalizedCertificate(c: Certificate, locale: Locale = "en"): Certificate {
  const loc = c.locales?.[locale] || c.en || c.locales?.en;
  return {
    ...c,
    title: loc?.title || c.title || "",
    issuer: loc?.issuer || c.issuer || "",
    category: loc?.category || c.category || "",
    description: loc?.description || c.description || "",
  };
}
