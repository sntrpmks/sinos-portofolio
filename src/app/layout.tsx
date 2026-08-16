import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewModeProvider } from "@/components/context/ViewModeContext";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { CommandPalette } from "@/components/system/CommandPalette";
import { TerminalModal } from "@/components/system/TerminalModal";
import { AiRecruiterModal } from "@/features/ai-assistant";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sinos.dev"),
  title: {
    default: "Ahmad Sinatria Pamungkas — Full Stack Developer | Portofolio Web & System OS",
    template: "%s | Ahmad Sinatria Pamungkas",
  },
  description:
    "Portofolio web resmi Ahmad Sinatria Pamungkas — Full Stack Developer & Mahasiswa Manajemen Informatika UNSIQ Wonosobo. Menampilkan karya aplikasi web full-stack, aplikasi Android native Java/SQLite, integrasi AI Gemini, dan studi kasus sistem terverifikasi.",
  keywords: [
    "portofolio web",
    "portfolio web",
    "portofolio developer indonesia",
    "Ahmad Sinatria Pamungkas",
    "Sinatria Pamungkas",
    "Full Stack Developer Indonesia",
    "Web Developer Wonosobo",
    "Manajemen Informatika UNSIQ",
    "Portofolio Programmer Indonesia",
    "SIN.OS",
    "sinos portfolio",
    "Web Event SMKN 1 Wonosobo",
    "CashFlowku Android Java",
    "Rakitin Aja PC Builder",
    "Next.js Developer Indonesia",
    "PHP MySQL Developer",
    "Java Android Native Developer",
    "Integrasi AI Gemini API",
    "SMK Negeri 1 Wonosobo RPL",
  ],
  authors: [{ name: "Ahmad Sinatria Pamungkas", url: "https://github.com/sntrpmks" }],
  creator: "Ahmad Sinatria Pamungkas",
  publisher: "Ahmad Sinatria Pamungkas",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  verification: {
    google: "google764722eabc05b935",
  },
  openGraph: {
    title: "Ahmad Sinatria Pamungkas — Full Stack Developer | Portofolio Web",
    description:
      "Portofolio web resmi Ahmad Sinatria Pamungkas. Menampilkan studi kasus pengembangan aplikasi web full-stack, aplikasi Android, dan integrasi AI.",
    url: "https://sinos.dev",
    siteName: "SIN.OS — Ahmad Sinatria Pamungkas Portfolio",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Sinatria Pamungkas — Full Stack Developer | Portofolio Web",
    description:
      "Portofolio web resmi Ahmad Sinatria Pamungkas. Menampilkan studi kasus pengembangan aplikasi web full-stack, aplikasi Android, dan integrasi AI.",
    creator: "@sntrpmks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmad Sinatria Pamungkas",
    alternateName: ["Sinatria Pamungkas", "sntrpmks", "SIN.OS"],
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "Universitas Sains Al-Qur'an (UNSIQ)",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "SMK Negeri 1 Wonosobo",
      },
    ],
    url: "https://sinos.dev",
    sameAs: [
      "https://github.com/sntrpmks",
      "https://www.linkedin.com/in/sntrpmks",
    ],
    knowsAbout: [
      "Portofolio Web",
      "Full Stack Development",
      "PHP & MySQL",
      "Java Native Android",
      "Next.js & React",
      "TypeScript",
      "Artificial Intelligence Integration",
      "Software Architecture",
    ],
  };

  return (
    <html
      lang="id"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F7F5] text-[#171717] relative selection:bg-[#A9F1DF]/40 selection:text-[#171717]">
        {/* Subtle Ambient Background Light */}
        <div className="ambient-subtle" />

        <ViewModeProvider>
          {/* Global Smooth Scrolling */}
          <SmoothScroll />

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 relative z-10">{children}</main>

          {/* Footer Bar */}
          <Footer />

          {/* Global Modals */}
          <CommandPalette />
          <TerminalModal />
          <AiRecruiterModal />
        </ViewModeProvider>
      </body>
    </html>
  );
}
