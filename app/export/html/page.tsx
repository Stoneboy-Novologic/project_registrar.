"use client";

import PagePreview from "@/app/components/editor/PagePreview";

export default function ExportHtmlPage() {
  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="mx-auto max-w-[950px]">
        <PagePreview />
      </div>
    </div>
  );
}


