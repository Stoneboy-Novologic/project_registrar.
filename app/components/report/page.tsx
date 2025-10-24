"use client";

import type React from "react";
import clsx from "clsx";

export default function Page({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "report-font bg-white text-[var(--report-fg)]",
        "w-full max-w-[1440px] mx-auto",
        "p-10 md:p-12 lg:p-14",
        className
      )}
      style={{ backgroundColor: "var(--report-bg)" }}
    >
      {children}
    </div>
  );
}


