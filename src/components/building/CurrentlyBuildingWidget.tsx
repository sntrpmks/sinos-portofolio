"use client";

import React from "react";
import Link from "next/link";
import { Hammer, ArrowRight, Layers } from "lucide-react";

export function CurrentlyBuildingWidget() {
  return (
    <div className="w-full glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden group">
      {/* Top status bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/20 text-yellow-400">
            <Hammer className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 font-semibold">
            Currently Building
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-[10px] font-mono-code font-bold">
          BUILDING
        </span>
      </div>

      {/* Project info */}
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white font-mono-code group-hover:text-sky-300 transition-colors">
            KebabERP System
          </h4>
          <span className="text-xs font-mono-code font-bold text-sky-400">78%</span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2">
          Multi-outlet F&B inventory telemetry, NestJS services, Prisma PostgreSQL & Redis caching.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-3 border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-yellow-400 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all duration-1000"
          style={{ width: "78%" }}
        />
      </div>

      {/* Footer details */}
      <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1">
          <Layers className="w-3 h-3 text-slate-400" />
          <span>Next Milestone: Financial Reconciliation Module</span>
        </div>
        <Link
          href="/work/kebab-erp"
          className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-bold"
        >
          <span>View Spec</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
