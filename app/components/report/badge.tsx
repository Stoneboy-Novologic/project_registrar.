import type React from "react";

export default function Badge({ children }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-[var(--report-badge-text)] ring-1 ring-[var(--report-badge-border)] bg-[var(--report-badge-bg)]">
      {children}
    </span>
  );
}


