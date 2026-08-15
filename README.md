# SIN.OS — Digital Portfolio Operating System

> **SIN.OS — Explore the system behind Sin.**

**SIN.OS** is a personal digital portfolio platform built for **Sinatria Pamungkas** (Software Developer | AI Enthusiast). Unlike traditional online CVs, SIN.OS is engineered as a high-performance, content-driven operating system interface inspired by modern developer tooling, translucent glass material design (macOS/iOS), and scannable recruiter views.

---

## 🌟 Key Features

1. **Content-Driven Architecture**: All projects, skills, timelines, and credentials are driven by typed content files under `content/`. Updating portfolio data requires **zero React UI component edits**.
2. **iOS/macOS Glass Hamburger Menu**: Translucent floating glass panel (`backdrop-filter: blur(24px)`), smooth Framer Motion transitions, quick action buttons, and background scroll locking.
3. **Quick Email Launcher**: Direct Gmail Web Compose integration (`https://mail.google.com/mail/?view=cm...`) with `mailto:` fallback addressed to `sinatriapamungkas0@gmail.com`.
4. **Full Lightweight Motion System**: 60fps event-driven motion powered by Framer Motion, GPU-friendly transforms, and `prefers-reduced-motion` compliance.
5. **Case Files System (`/work`, `/work/[slug]`)**: Detailed project breakdowns featuring problem context, solution topology, interactive SVG architecture diagrams, implementation steps, and engineering lessons.
6. **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-navigable modal palette for searching projects, jumping to routes, launching Quick Email, or opening resume.
7. **Interactive Glassmorphic Terminal (`Ctrl+\``)**: Shell prompt (`sin@sin.os:~$`) supporting commands like `help`, `about`, `projects`, `certs`, `resume`, `contact`, `clear`.
8. **Bilingual Internationalization (EN / ID)**: Native English (default) and Bahasa Indonesia support with shared UI components, localized translation dictionary (`src/lib/i18n.ts`), glass toggle pill, and language-aware AI assistant responses.
9. **AI Recruiter Assistant (`/api/ai-recruiter`)**: Server-side Route Handler powered by Google Gemini API, strictly grounded in portfolio facts with bilingual language awareness.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Webpack Engine)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4, Custom Glassmorphism Design Tokens
- **Icons & Motion**: Lucide React, Framer Motion
- **Validation**: Zod Schemas
- **AI Integration**: `@google/generative-ai` (Gemini API)

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/sntrpmks/sinos.git
   cd sinos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables (optional for AI Recruiter):
   ```bash
   cp .env.example .env.local
   ```
   Add your Gemini API Key in `.env.local`:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. Launch the local dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Contact Information

- **Email**: `sinatriapamungkas0@gmail.com`
- **GitHub**: [https://github.com/sntrpmks](https://github.com/sntrpmks)
- **LinkedIn**: [https://www.linkedin.com/in/sntrpmks](https://www.linkedin.com/in/sntrpmks)

---

## 📄 License

MIT © 2026 Sinatria Pamungkas
