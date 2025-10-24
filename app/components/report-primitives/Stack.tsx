"use client";

import clsx from "clsx";

const gapMap: Record<string, string> = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export default function Stack({ children, gap = "md", className }: { children: React.ReactNode; gap?: keyof typeof gapMap; className?: string }) {
  return <div className={clsx("flex flex-col", gapMap[gap], className)}>{children}</div>;
}


