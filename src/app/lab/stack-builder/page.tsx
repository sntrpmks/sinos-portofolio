import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Locale } from "@/lib/i18n";
import { getStackBuilderData } from "@/lib/lab-content";

export const metadata: Metadata = {
  title: "Stack Builder — Interactive Architecture Experiment | SIN.OS Lab",
  description:
    "Play Stack Builder, an interactive system topology puzzle where you arrange components to construct valid software architectures.",
  openGraph: {
    title: "Stack Builder — Interactive Architecture Experiment | SIN.OS Lab",
    description:
      "Arrange components to construct valid software architectures in this interactive developer puzzle.",
  },
};

// Lazy load game module so JS bundle is completely isolated
const StackBuilderModule = dynamic(
  () => import("@/features/lab/stack-builder/components/StackBuilderModule"),
  {
    loading: () => (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#666666] font-mono-code text-xs">
        <div className="w-6 h-6 rounded-full border-2 border-[#00695C] border-t-transparent animate-spin" />
        <span>Preparing Stack Builder System...</span>
      </div>
    ),
  }
);

export default async function StackBuilderPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("sinos_locale")?.value;
  const locale: Locale = localeCookie === "id" ? "id" : "en";

  // Server-side content data fetching
  const { challenges, components } = getStackBuilderData(locale);

  return (
    <div className="pt-28 pb-16 px-4 sm:px-8 max-w-5xl mx-auto w-full min-h-[calc(100vh-14rem)] flex flex-col justify-between">
      <StackBuilderModule
        initialChallenges={challenges}
        initialComponents={components}
      />
    </div>
  );
}
