/* app/components/editor/PageForm.tsx */
"use client";

import { useMemo } from "react";
import { useEditorStore } from "@/lib/store";
import FieldInput from "./FieldInput";

export default function PageForm() {
  const template = useEditorStore((s) => s.template);

  const grouped = useMemo(() => {
    if (!template) return [] as { group: string; fields: typeof template.fields }[];
    const groups: Record<string, any[]> = {};
    for (const f of template.fields) {
      const base = f.id.split(".")[0];
      if (!groups[base]) groups[base] = [];
      groups[base].push(f);
    }
    return Object.entries(groups).map(([group, fields]) => ({ group, fields }));
  }, [template]);

  if (!template) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6 space-y-6 min-h-full" style={{ backgroundColor: 'var(--construction-concrete)' }}>
      {grouped.map((g) => (
        <div key={g.group} className="rounded-xl border shadow-sm hover:shadow-md transition-all duration-200" style={{
          backgroundColor: 'var(--construction-charcoal)',
          borderColor: 'var(--construction-steel)',
          borderLeftWidth: '4px',
          borderLeftColor: 'var(--construction-orange)'
        }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--construction-steel)' }}>
            <div className="text-xs font-medium uppercase tracking-wide font-semibold" style={{ color: 'var(--construction-yellow)' }}>
              {g.group.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              {g.fields.map((f) => (
                <label key={f.id} className="block">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-sm font-medium leading-relaxed" style={{ color: 'var(--construction-light)' }}>
                      {f.label}
                    </div>
                    {f.required && (
                      <span className="text-orange-500 font-bold" style={{ color: 'var(--construction-orange)' }}>*</span>
                    )}
                    {!f.required && (
                      <span className="text-xs" style={{ color: 'var(--construction-steel)' }}>(Optional)</span>
                    )}
                  </div>
                  <FieldInput field={f} />
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


