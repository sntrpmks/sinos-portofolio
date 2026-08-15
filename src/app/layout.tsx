import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewModeProvider } from "@/components/context/ViewModeContext";
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
  title: "Sinatria Pamungkas — Full Stack Developer | AI Enthusiast",
  description:
    "Official digital portfolio system of Sinatria Pamungkas — Full Stack Developer | AI Enthusiast. I build web applications, explore AI/API integrations, and turn ideas into working digital experiences.",
  keywords: [
    "Sinatria Pamungkas",
    "Full Stack Developer",
    "AI Enthusiast",
    "SIN.OS",
    "Web Development",
    "PHP",
    "Java",
    "Next.js",
    "Indonesia",
  ],
  authors: [{ name: "Sinatria Pamungkas" }],
  openGraph: {
    title: "Sinatria Pamungkas — Full Stack Developer | AI Enthusiast",
    description: "I build web applications, explore AI/API integrations, and turn ideas into working digital experiences.",
    url: "https://sinos.dev",
    siteName: "SIN.OS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinatria Pamungkas — Full Stack Developer | AI Enthusiast",
    description: "Explore the digital portfolio system of Sinatria Pamungkas.",
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
    "name": "Sinatria Pamungkas",
    "jobTitle": "Full Stack Developer",
    "url": "https://sinos.dev",
    "sameAs": [
      "https://github.com/sntrpmks",
      "https://www.linkedin.com/in/sntrpmks",
    ],
  };

  return (
    <html
      lang="en"
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
