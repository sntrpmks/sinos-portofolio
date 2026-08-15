"use client";

import React, { useState } from "react";
import { useViewMode } from "@/components/context/ViewModeContext";
import { Cpu, Server, Database, ShieldCheck, ArrowRight } from "lucide-react";

interface Node {
  id: string;
  label: string;
  subtext?: string;
  type: string;
}

interface ArchitectureDiagramProps {
  nodes: Node[];
}

export function ArchitectureDiagram({ nodes }: ArchitectureDiagramProps) {
  const { locale } = useViewMode();
  const [activeNode, setActiveNode] = useState<string | null>(nodes[0]?.id || null);

  const getNodeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "frontend":
        return <Cpu className="w-4 h-4 text-[#00695C]" />;
      case "backend":
      case "logic":
        return <Server className="w-4 h-4 text-[#171717]" />;
      case "database":
        return <Database className="w-4 h-4 text-emerald-600" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="card-minimal p-6 flex flex-col gap-6 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#E6E6E3] pb-3">
        <span className="text-xs font-mono-code text-[#00695C] font-bold uppercase tracking-wider">
          {locale === "id" ? "TOPOLOGI ARSITEKTUR SISTEM" : "SYSTEM ARCHITECTURE TOPOLOGY"}
        </span>
        <span className="text-[11px] font-mono-code text-[#8A8A8A]">
          {locale === "id" ? "Topologi Interaktif" : "Interactive Topology"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {nodes.map((node, index) => {
          const isActive = activeNode === node.id;
          return (
            <React.Fragment key={node.id}>
              <div
                onClick={() => setActiveNode(node.id)}
                onMouseEnter={() => setActiveNode(node.id)}
                className={`card-minimal p-4 transition-all cursor-pointer flex flex-col gap-2 relative ${
                  isActive
                    ? "border-[#00695C] bg-[#E6F9F5]/40 shadow-xs"
                    : "hover:border-[#171717]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-[#F0F0ED] border border-[#E6E6E3]">
                    {getNodeIcon(node.type)}
                  </div>
                  <span className="text-[10px] font-mono-code text-[#8A8A8A] font-bold">
                    {locale === "id" ? `TAHAP 0${index + 1}` : `STEP 0${index + 1}`}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <h5 className="text-sm font-bold font-mono-code text-[#171717]">{node.label}</h5>
                  {node.subtext && (
                    <span className="text-[11px] font-mono-code text-[#666666]">{node.subtext}</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-[#00695C] mt-2 pt-2 border-t border-[#E6E6E3]">
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#00695C] animate-ping" : "bg-[#8A8A8A]"}`} />
                  <span>{node.type.toUpperCase()} LAYER</span>
                </div>
              </div>

              {index < nodes.length - 1 && (
                <div className="hidden lg:flex items-center justify-center -mx-2 text-[#8A8A8A]">
                  <ArrowRight className="w-4 h-4 text-[#00695C]/50" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {activeNode && (
        <div className="p-3.5 rounded-xl bg-[#F0F0ED] border border-[#E6E6E3] text-xs font-mono-code flex items-center justify-between text-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <span className="text-[#00695C] font-bold">
              {locale === "id" ? "NODE TERPILIH:" : "SELECTED NODE:"}
            </span>
            <span>{nodes.find((n) => n.id === activeNode)?.label}</span>
          </div>
          <span className="text-[#8A8A8A] text-[10px]">
            {locale === "id" ? "Klik node untuk melihat detail" : "Click any node to inspect"}
          </span>
        </div>
      )}
    </div>
  );
}
