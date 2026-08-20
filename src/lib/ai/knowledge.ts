import {
  getProjects,
  getProjectBySlug,
  getTechStack,
  getCertificates,
  getExperiences,
  getAboutData,
} from "@/lib/content";
import { contactInfo } from "@/lib/contact";

export interface KnowledgeOptions {
  locale?: "en" | "id";
  page?: string;
  projectSlug?: string;
  query?: string;
}

export function getPortfolioKnowledge(options: KnowledgeOptions = {}): string {
  const { locale = "en", page, projectSlug, query } = options;

  const projects = getProjects(locale);
  const techStack = getTechStack(locale);
  const certificates = getCertificates(locale);
  const experiences = getExperiences(locale);
  const about = getAboutData(locale);

  // Profile Identity
  const profileSection = `
DEVELOPER PROFILE:
- Name: Sinatria Pamungkas
- Primary Professional Identity: Full Stack Developer
- Secondary Positioning: AI Enthusiast
- Education: Informatics Management (Manajemen Informatika) at Universitas Sains Al-Qur'an (UNSIQ)
- Secondary School: Graduated from SMKN 1 Wonosobo (Software Engineering / Rekayasa Perangkat Lunak) in 2026
- Location: Wonosobo, Indonesia
- Email: ${contactInfo.email}
- GitHub: ${contactInfo.github} (@sntrpmks)
- LinkedIn: ${contactInfo.linkedin} (Sinatria Pamungkas)
  `.trim();

  // Active Project Context (if user is on a project page or asked about a specific project)
  let activeProjectSection = "";
  let targetSlug = projectSlug;

  if (!targetSlug && page && page.includes("/work/")) {
    const parts = page.split("/work/");
    if (parts[1]) {
      targetSlug = parts[1].split("/")[0];
    }
  }

  if (targetSlug) {
    const activeProj = getProjectBySlug(targetSlug, locale);
    if (activeProj) {
      activeProjectSection = `
ACTIVE CURRENT VISITED PROJECT PAGE context:
- Project ID: ${activeProj.caseFileId}
- Title: ${activeProj.title}
- Year: ${activeProj.year}
- Role: ${activeProj.role}
- Technologies Used: ${activeProj.technologies.join(", ")}
- Summary: ${activeProj.summary}
- Problem Statement: ${activeProj.problem}
- Architectural Solution: ${activeProj.solution}
- Engineering Results: ${activeProj.results}
- Key Engineering Lessons: ${activeProj.lessons}
- Canonical Route Link: /work/${activeProj.slug}
      `.trim();
    }
  }

  // Check if query specifically mentions a project keyword
  let queryMatchedProjectSection = "";
  if (query && !activeProjectSection) {
    const lowerQuery = query.toLowerCase();
    const matched = projects.find(
      (p) =>
        lowerQuery.includes(p.slug) ||
        lowerQuery.includes(p.title.toLowerCase()) ||
        (p.title.toLowerCase().includes("cashflow") && lowerQuery.includes("cashflow")) ||
        (p.title.toLowerCase().includes("web event") && lowerQuery.includes("event")) ||
        (p.title.toLowerCase().includes("catatan") && lowerQuery.includes("catatan")) ||
        (p.title.toLowerCase().includes("rakitin") && lowerQuery.includes("rakit")) ||
        (p.title.toLowerCase().includes("sintech") && lowerQuery.includes("sintech")) ||
        (p.title.toLowerCase().includes("dvd") && lowerQuery.includes("dvd"))
    );

    if (matched) {
      queryMatchedProjectSection = `
MATCHED SPECIFIC PROJECT CONTEXT:
- Project ID: ${matched.caseFileId}
- Title: ${matched.title}
- Year: ${matched.year}
- Role: ${matched.role}
- Technologies: ${matched.technologies.join(", ")}
- Summary: ${matched.summary}
- Problem: ${matched.problem}
- Solution: ${matched.solution}
- Results: ${matched.results}
- Lessons: ${matched.lessons}
- Route Link: /work/${matched.slug}
      `.trim();
    }
  }

  // Structured Projects Catalog Summary
  const projectsCatalogSection = `
VERIFIED PROJECTS CATALOG (${projects.length} Total Projects):
${projects
  .map(
    (p) =>
      `• [${p.caseFileId}] ${p.title} (${p.year}) - Role: ${p.role} | Tech: ${p.technologies.join(
        ", "
      )} | Route: /work/${p.slug}`
  )
  .join("\n")}
  `.trim();

  // Technical Skills & Evidence Stack
  const techStackSection = `
VERIFIED SKILLS & EVIDENCE-BACKED STACK:
${techStack
  .map(
    (s) =>
      `• ${s.name} (${s.category}) [Level: ${s.evidenceLevel}] - Proof Projects: ${s.evidenceProjects.join(
        ", "
      )}`
  )
  .join("\n")}
  `.trim();

  // Certifications & Credentials
  const certsSection = `
VERIFIED CERTIFICATIONS (${certificates.length} Total Credentials):
${certificates
  .map((c) => `• ${c.title} (Issuer: ${c.issuer}, Date: ${c.issueDate}) - ID: ${c.id}`)
  .join("\n")}
  `.trim();

  // Experience Timeline
  const experienceSection = `
EXPERIENCE & EDUCATION TIMELINE:
${experiences
  .map(
    (e) =>
      `• [${e.period}] ${e.role} at ${e.organization} (${e.type}) - ${e.description}`
  )
  .join("\n")}
  `.trim();

  // Compose context based on query relevance to minimize token usage for Free Tier safety
  const parts = [profileSection];

  if (activeProjectSection) {
    parts.push(activeProjectSection);
  } else if (queryMatchedProjectSection) {
    parts.push(queryMatchedProjectSection);
  }

  // Career Milestone & Trajectory
  const milestoneSection = `
FEATURED CAREER MILESTONE:
• Title: Spec-Driven Development dengan Kiro
• Issuer: Dicoding Indonesia in collaboration with Amazon Web Services (AWS)
• Issue Date: 20 August 2026 (Valid until 20 August 2029)
• Credential ID: 1RXYD4L7MXVM
• Verification Link: https://www.dicoding.com/certificates/1RXYD4L7MXVM
• Duration: 10 Hours Total (Structured curriculum, hands-on tasks, and final exam)
• Philosophy & Theme: "From Writing Code to Engineering Software" — treating AI as a disciplined collaborator within structured engineering workflows rather than just generating code.
• Career Trajectory: Software Development -> Spec-Driven Development -> AI-Assisted Engineering (Active Milestone) -> Software Engineering -> AI Engineering -> AI Systems Engineering.
  `.trim();

  parts.push(projectsCatalogSection);
  parts.push(techStackSection);
  parts.push(certsSection);
  parts.push(milestoneSection);
  parts.push(experienceSection);

  if (about && about.bio) {
    parts.push(`ABOUT SUMMARY: ${about.bio}`);
  }

  return parts.join("\n\n");
}

