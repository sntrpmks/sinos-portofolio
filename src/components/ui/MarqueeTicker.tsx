"use client";

import React from "react";

export function MarqueeTicker() {
  const items = [
    "SOFTWARE DEVELOPMENT",
    "WEB DEVELOPMENT",
    "AI / API INTEGRATION",
    "APPLICATION DEVELOPMENT",
    "SIN.OS",
    "SYSTEM ARCHITECTURE",
    "CLEAN CODE",
  ];

  return (
    <div className="w-full overflow-hidden border-y border-[#E6E6E3] py-4 bg-[#F0F0ED]/60 my-6 select-none">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-xs font-mono-code font-bold tracking-widest text-[#666666] uppercase">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-[#00695C] transition-colors cursor-default">{item}</span>
            <span className="text-[#00695C]">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
