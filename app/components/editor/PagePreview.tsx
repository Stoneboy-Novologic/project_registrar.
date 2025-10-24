/* app/components/editor/PagePreview.tsx */
"use client";

import { useEditorStore } from "@/lib/store";
import { pageRegistry } from "@/app/components/report-pages/registry";

export default function PagePreview() {
  const template = useEditorStore((s) => s.template);
  if (!template) return <div className="p-6">Waiting for template…</div>;

  const entry = pageRegistry[template.pageId as keyof typeof pageRegistry];
  if (!entry) {
    return <div className="p-6">Unknown page type: {template.pageId}</div>;
  }

  const Connected = entry.connected;
  return (
    <div className="w-full h-full flex items-start justify-center p-6 overflow-auto">
      <div className="w-full max-w-[1600px]">
        <Connected />
      </div>
    </div>
  );
}


