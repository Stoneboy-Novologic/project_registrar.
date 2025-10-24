"use client";

import type React from "react";
import clsx from "clsx";

export default function Section({
  children,
  className,
  align,
  justify,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end" | "baseline";
  justify?: "start" | "between" | "end";
}) {
  const alignCls =
    align === "start"
      ? "items-start"
      : align === "end"
      ? "items-end"
      : align === "baseline"
      ? "items-baseline"
      : "items-center";
  const justCls = justify === "between" ? "justify-between" : justify === "end" ? "justify-end" : "justify-start";
  return <div className={clsx("flex", alignCls, justCls, className)}>{children}</div>;
}


