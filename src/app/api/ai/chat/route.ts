import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { contactInfo } from "@/lib/contact";
import { getProjects, getTechStack, getCertificates } from "@/lib/content";

export const runtime = "nodejs";

const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(4000),
});

const ChatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(4000, "Message is too long"),
  locale: z.enum(["en", "id"]).optional().default("en"),
  page: z.string().optional(),
  projectSlug: z.string().optional(),
  history: z.array(ChatMessageSchema).optional().default([]),
});

export async function POST(req: NextRequest) {
  const requestId = `SIN-AI-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  try {
    // 1. Client Identifier & Rate Limiting (Free Tier Protection: 10 requests / minute)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous-client";

    const rateLimit = checkRateLimit(clientIp, 10, 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "You've sent several requests in a short time. Please wait a moment and try again.",
          errorId: requestId,
          retryAfterMs: rateLimit.resetMs,
        },
        { status: 429 }
      );
    }

    // 2. Request Parsing & Validation
    const body = await req.json();
    const parsed = ChatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid chat payload. Please shorten your query and try again.",
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const { message, locale, page, projectSlug, history } = parsed.data;

    // 3. Sanitized History Window (Limit to last 10 messages for token efficiency)
    const recentHistory = history.slice(-10);

    // 4. API Key Check
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    // If GEMINI_API_KEY is not set, use grounded SSE fallback stream
    if (!apiKey) {
      return createFallbackStreamResponse(message, locale, projectSlug);
    }

    // 5. Initialize Official Google GenAI SDK
    const ai = new GoogleGenAI({ apiKey });

    // 6. Build System Prompt with Dynamic Page & Portfolio Knowledge
    const systemPrompt = buildSystemPrompt({
      locale,
      page,
      projectSlug,
      query: message,
    });

    // 7. Format Chat Contents for Gemini
    const contents = [
      ...recentHistory.map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    // 8. Stream Generation via SSE
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          const responseStream = await ai.models.generateContentStream({
            model: modelName,
            contents,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.3,
            },
          });

          for await (const chunk of responseStream) {
            const chunkText = chunk.text;
            if (chunkText) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: chunkText })}\n\n`)
              );
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (streamErr: unknown) {
          console.error(`[${requestId}] Gemini streaming error:`, streamErr);
          
          // Stream fallback grounded portfolio answer if API network or model error occurs
          const fallbackText = getFallbackAnswer(message, locale, projectSlug);
          const words = fallbackText.split(" ");
          for (let i = 0; i < words.length; i++) {
            const chunk = words[i] + (i === words.length - 1 ? "" : " ");
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
            await new Promise((r) => setTimeout(r, 15));
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Request-ID": requestId,
      },
    });
  } catch (err) {
    console.error(`[${requestId}] AI Chat route error:`, err);
    return NextResponse.json(
      { error: "An unexpected error occurred while communicating with SIN.OS AI." },
      { status: 500 }
    );
  }
}

function getFallbackAnswer(query: string, locale: "en" | "id", projectSlug?: string): string {
  const lower = query.toLowerCase();

  if (projectSlug) {
    const projects = getProjects();
    const p = projects.find((item) => item.slug === projectSlug);
    if (p) {
      return locale === "id"
        ? `[${p.title}](/work/${p.slug}) (${p.year}) dibuat untuk membantu ${p.summary.toLowerCase()}.\n\n• **Peran Sinatria**: ${p.role}\n• **Teknologi**: ${p.technologies.join(
            ", "
          )}\n• **Masalah**: ${p.problem}\n• **Solusi**: ${p.solution}`
        : `[${p.title}](/work/${p.slug}) (${p.year}) is built to help ${p.summary.toLowerCase()}.\n\n• **Sinatria's Role**: ${p.role}\n• **Tech Stack**: ${p.technologies.join(
            ", "
          )}\n• **Problem**: ${p.problem}\n• **Solution**: ${p.solution}`;
    }
  }

  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("github") ||
    lower.includes("linkedin") ||
    lower.includes("hubungi") ||
    lower.includes("kontak")
  ) {
    return locale === "id"
      ? `Ingin berdiskusi atau bekerja sama? Kamu bisa menghubungi **Sinatria Pamungkas** di:\n• **Email**: ${contactInfo.email}\n• **GitHub**: [${contactInfo.githubHandle}](${contactInfo.github})\n• **LinkedIn**: [Sinatria Pamungkas](${contactInfo.linkedin})`
      : `Looking to discuss or collaborate? You can reach **Sinatria Pamungkas** directly at:\n• **Email**: ${contactInfo.email}\n• **GitHub**: [${contactInfo.githubHandle}](${contactInfo.github})\n• **LinkedIn**: [Sinatria Pamungkas](${contactInfo.linkedin})`;
  }

  if (lower.includes("project") || lower.includes("karya") || lower.includes("proyek")) {
    const projects = getProjects();
    return locale === "id"
      ? `Beberapa project yang ada di portofolio ini antara lain:\n` +
          projects
            .map(
              (p) =>
                `• [${p.title}](/work/${p.slug}) (${p.year}) — ${p.role} (${p.technologies.slice(0, 3).join(", ")})`
            )
            .join("\n")
      : `Here are the verified projects featured in this portfolio:\n` +
          projects
            .map(
              (p) =>
                `• [${p.title}](/work/${p.slug}) (${p.year}) — ${p.role} (${p.technologies.slice(0, 3).join(", ")})`
            )
            .join("\n");
  }

  if (lower.includes("skill") || lower.includes("keahlian") || lower.includes("stack") || lower.includes("technolog")) {
    const tech = getTechStack();
    return locale === "id"
      ? `Teknologi yang biasa digunakan dalam project dan pembelajaran:\n` +
          tech.map((t) => `• **${t.name}** (${t.category}) — ${t.description}`).join("\n")
      : `Verified technical stack used across projects:\n` +
          tech.map((t) => `• **${t.name}** (${t.category}) — ${t.description}`).join("\n");
  }

  if (
    lower.includes("kiro") ||
    lower.includes("spec-driven") ||
    lower.includes("sdd") ||
    lower.includes("milestone")
  ) {
    return locale === "id"
      ? `Sinatria baru saja menyelesaikan sertifikasi **Spec-Driven Development dengan Kiro** dari **Dicoding × AWS** (20 Agustus 2026, ID: 1RXYD4L7MXVM).\n\n• **Fokus Pembelajaran**: Menerjemahkan requirement menjadi spesifikasi terstruktur, prompt engineering untuk SDD, dan mengiterasikan kode bersama AI sambil menjaga konsistensi arsitektur dan kualitas kode.\n• **Arah Karier**: Bagian dari evolusi dari Software Development → Spec-Driven Development → AI-Assisted Engineering menuju AI Systems Engineering.`
      : `Sinatria recently completed the **Spec-Driven Development dengan Kiro** certification from **Dicoding × AWS** (20 August 2026, ID: 1RXYD4L7MXVM).\n\n• **Core Focus**: Translating requirements into structured specifications, prompt engineering for SDD, and iterating code with AI while maintaining architectural consistency and code quality.\n• **Career Trajectory**: Part of the progressive evolution from Software Development → Spec-Driven Development → AI-Assisted Engineering toward AI Systems Engineering.`;
  }

  if (lower.includes("certif") || lower.includes("sertifikat") || lower.includes("kredensial")) {
    const certs = getCertificates();
    return locale === "id"
      ? `Sertifikasi terverifikasi yang dimiliki Sinatria:\n` +
          certs.map((c) => `• **${c.title}** (${c.issuer}, ${c.issueDate})`).join("\n")
      : `Verified certifications held by Sinatria:\n` +
          certs.map((c) => `• **${c.title}** (${c.issuer}, ${c.issueDate})`).join("\n");
  }

  return locale === "id"
    ? `Sinatria adalah **Full Stack Developer | AI Enthusiast** dari Wonosobo, Indonesia. Dia membangun aplikasi web dari frontend hingga backend, serta mengeksplorasi integrasi AI ke dalam produk digital.\n\nKontak: ${contactInfo.email}`
    : `Sinatria is a **Full Stack Developer | AI Enthusiast** based in Wonosobo, Indonesia. He builds web applications from frontend to backend and explores practical AI/API integrations.\n\nContact: ${contactInfo.email}`;
}

// Fallback SSE Stream Engine when GEMINI_API_KEY is not configured
function createFallbackStreamResponse(
  query: string,
  locale: "en" | "id",
  projectSlug?: string
) {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const text = getFallbackAnswer(query, locale, projectSlug);

      // Simulate smooth token streaming
      const words = text.split(" ");
      for (let i = 0; i < words.length; i++) {
        const chunk = words[i] + (i === words.length - 1 ? "" : " ");
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
        await new Promise((r) => setTimeout(r, 15));
      }

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
