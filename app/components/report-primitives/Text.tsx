"use client";

import clsx from "clsx";

type Variant = "breadcrumb" | "h1" | "h2" | "subtitle" | "body" | "small";

export default function Text({
  children,
  variant = "body",
  strong,
  link,
  multiline,
  className,
}: {
  children?: React.ReactNode;
  variant?: Variant;
  strong?: boolean;
  link?: boolean;
  multiline?: boolean;
  className?: string;
}) {
  const base =
    variant === "breadcrumb"
      ? "text-xs text-[var(--report-muted)]"
      : variant === "h1"
      ? "text-3xl md:text-4xl font-extrabold text-[var(--brand-primary)]"
      : variant === "h2"
      ? "text-xl md:text-2xl font-bold text-[var(--brand-primary)]"
      : variant === "subtitle"
      ? "text-base md:text-lg text-[var(--report-muted)]"
      : variant === "small"
      ? "text-xs"
      : "text-sm md:text-base";

  const weight = strong ? "font-semibold" : undefined;
  const linkCls = link ? "text-[var(--brand-primary)] underline underline-offset-2" : undefined;
  const white = multiline ? "whitespace-pre-wrap" : "whitespace-pre";

  return <div className={clsx(base, weight, linkCls, white, className)}>{children}</div>;
}


