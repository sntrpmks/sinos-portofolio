import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Locale } from "@/lib/i18n";
import { getDebugChallengesData } from "@/lib/lab-content";

export const metadata: Metadata = {
  title: "Debug SIN.OS — Interactive System Debugging Mini-Game | SIN.OS Lab",
  description:
    "Play Debug SIN.OS! Inspect system clues, diagnose bugs, and solve lightweight developer challenges.",
  openGraph: {
    title: "Debug SIN.OS — Interactive System Debugging Mini-Game | SIN.OS Lab",
    description:
      "Inspect clues and diagnose quick developer bugs in this interactive portfolio mini-game.",
  },
};

// Lazy load game module so JS bundle is completely isolated
const DebugModule = dynamic(
  () => import("@/features/lab/debug-sinos/components/DebugModule"),
  {
    loading: () => (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#666666] font-mono-code text-xs">
        <div className="w-6 h-6 rounded-full border-2 border-[#00695C] border-t-transparent animate-spin" />
        <span>Getting system clues ready...</span>
      </div>
    ),
  }
);

export default async function DebugSinosPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("sinos_locale")?.value;
  const locale: Locale = localeCookie === "id" ? "id" : "en";

  // Server-side content data fetching
  const challenges = getDebugChallengesData(locale);

  return (
    <div className="pt-28 pb-16 px-4 sm:px-8 max-w-5xl mx-auto w-full min-h-[calc(100vh-14rem)] flex flex-col justify-between">
      <DebugModule initialChallenges={challenges} />
    </div>
  );
}
