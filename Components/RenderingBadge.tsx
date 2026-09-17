"use client";

import React from "react";
import { Zap, Server, RefreshCw } from "lucide-react";

interface RenderingBadgeProps {
  strategy: "SSR" | "SSG" | "ISR" | "CSR";
  revalidateTime?: number;
  explanation?: string;
}

export const RenderingBadge: React.FC<RenderingBadgeProps> = ({
  strategy,
  revalidateTime,
  explanation,
}) => {
  const getBadgeConfig = () => {
    switch (strategy) {
      case "SSR":
        return {
          icon: <Server className="size-3.5 text-emerald-600" />,
          bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
          tagBg: "bg-emerald-600 text-white",
          label: "Server-Side Rendered (SSR)",
        };
      case "ISR":
        return {
          icon: <RefreshCw className="size-3.5 text-amber-600" />,
          bg: "bg-amber-50 border-amber-200 text-amber-700",
          tagBg: "bg-amber-600 text-white",
          label: `ISR (Revalidate: ${revalidateTime || 60}s)`,
        };
      case "CSR":
        return {
          icon: <Zap className="size-3.5 text-sky-600" />,
          bg: "bg-sky-50 border-sky-200 text-sky-700",
          tagBg: "bg-sky-600 text-white",
          label: "Client-Side Rendered (CSR)",
        };
      case "SSG":
      default:
        return {
          icon: <Zap className="size-3.5 text-blue-600" />,
          bg: "bg-blue-50 border-blue-200 text-blue-700",
          tagBg: "bg-blue-600 text-white",
          label: "Static Site Generation (SSG)",
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div
      title={explanation}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold shadow-2xs ${config.bg}`}
    >
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${config.tagBg}`}>
        {strategy}
      </span>
      <span className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </span>
    </div>
  );
};
