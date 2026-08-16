import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SHIP IT — Interactive Arcade Deployment Game | SIN.OS Lab",
  description:
    "Can you keep the deployment online? Control your software packet, avoid bugs, and reach production in this interactive SIN.OS arcade game.",
  openGraph: {
    title: "SHIP IT — Interactive Arcade Deployment Game | SIN.OS Lab",
    description:
      "Avoid bugs and keep your deployment package online in this interactive arcade game.",
  },
};

// Lazy load game module so JS bundle is completely isolated
const ShipModule = dynamic(
  () => import("@/features/lab/ship-it/components/ShipModule"),
  {
    loading: () => (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-[#666666] font-mono-code text-xs">
        <div className="w-6 h-6 rounded-full border-2 border-[#00695C] border-t-transparent animate-spin" />
        <span>Initializing deployment engine...</span>
      </div>
    ),
  }
);

export default function ShipItPage() {
  return (
    <div className="pt-28 pb-16 px-4 sm:px-8 max-w-5xl mx-auto w-full min-h-[calc(100vh-14rem)] flex flex-col justify-between">
      <ShipModule />
    </div>
  );
}
