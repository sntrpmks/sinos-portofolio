import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Locale } from "@/lib/i18n";
import { getAppChallengesData } from "@/lib/lab-content";

export const metadata: Metadata = {
  title: "Build the App — Interactive Developer Mini-Game | SIN.OS Lab",
  description:
    "Play Build the App! Pick what you need to build a tiny app in this quick, casual developer mini-game.",
  openGraph: {
    title: "Build the App — Interactive Developer Mini-Game | SIN.OS Lab",
    description:
      "Pick the right pieces and build a tiny app. Quick, casual, and intuitive mini-game.",
  },
};

// Lazy load game module so JS bundle is completely isolated
const StackBuilderModule = dynamic(
  () => import("@/features/lab/stack-builder/components/StackBuilderModule"),
  {
    loading: () => (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#666666] font-mono-code text-xs">
        <div className="w-6 h-6 rounded-full border-2 border-[#00695C] border-t-transparent animate-spin" />
        <span>Getting things ready...</span>
      </div>
    ),
  }
);

export default async function StackBuilderPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("sinos_locale")?.value;
  const locale: Locale = localeCookie === "id" ? "id" : "en";

  // Server-side content data fetching
  const challenges = getAppChallengesData(locale);

  return (
    <div className="pt-28 pb-16 px-4 sm:px-8 max-w-5xl mx-auto w-full min-h-[calc(100vh-14rem)] flex flex-col justify-between">
      <StackBuilderModule initialChallenges={challenges} />
    </div>
  );
}
