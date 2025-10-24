/* app/components/editor/SectionOutline.tsx */
"use client";

import { useEditorStore } from "@/lib/store";
import templateJson01 from "@/app/data/templates/default-v1/report-01.json";
import templateJson02 from "@/app/data/templates/default-v1/report-02.json";
import { ReportTemplateSchema } from "@/lib/validation";
import { logInfo } from "@/lib/log";

export default function SectionOutline() {
  const template = useEditorStore((s) => s.template);
  const activePageId = useEditorStore((s) => s.activePageId);
  const loadTemplate = useEditorStore((s) => s.loadTemplate);

  if (!template) {
    return (
      <div className="p-4 text-sm flex items-center justify-center" style={{ color: 'var(--construction-light)' }}>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{
            borderColor: 'var(--construction-steel)',
            borderTopColor: 'var(--construction-orange)'
          }}></div>
          <span>Loading template…</span>
        </div>
      </div>
    );
  }

  const pages = [
    {
      id: "report-01",
      title: "Page 1: Project Register",
      description: "Project documentation with map",
      template: templateJson01
    },
    {
      id: "report-02", 
      title: "Page 2: Hello World",
      description: "Simple placeholder template",
      template: templateJson02
    }
  ];

  const handlePageSwitch = (pageTemplate: any) => {
    const parsed = ReportTemplateSchema.safeParse(pageTemplate);
    if (parsed.success) {
      loadTemplate(parsed.data);
      logInfo(`Switched to ${parsed.data.title}`);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <div className="text-xs font-medium uppercase tracking-wide font-semibold" style={{ color: 'var(--construction-yellow)' }}>
          Document Pages
        </div>
        <div className="space-y-2">
          {pages.map((page) => {
            const isActive = activePageId === page.id;
            return (
              <button
                key={page.id}
                onClick={() => handlePageSwitch(page.template)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isActive
                    ? "shadow-md"
                    : "hover:shadow-sm"
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--construction-concrete)' : 'var(--construction-charcoal)',
                  borderColor: isActive ? 'var(--construction-orange)' : 'var(--construction-steel)',
                  color: isActive ? 'var(--construction-orange)' : 'var(--construction-light)',
                  boxShadow: isActive ? '0 0 0 2px rgba(255, 107, 53, 0.2)' : 'none'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full transition-colors" style={{
                    backgroundColor: isActive ? 'var(--construction-orange)' : 'var(--construction-steel)'
                  }}></div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm" style={{ color: isActive ? 'var(--construction-orange)' : 'var(--construction-light)' }}>
                      {page.title}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--construction-steel)' }}>
                      {page.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Current Page Field Groups */}
      <div className="space-y-3">
        <div className="text-xs font-medium uppercase tracking-wide font-semibold" style={{ color: 'var(--construction-yellow)' }}>
          Current Page Fields
        </div>
        <div className="space-y-2">
          {Array.from(new Set(template.fields.map(f => f.id.split('.')[0]))).map(group => (
            <div key={group} className="px-3 py-2 rounded border" style={{
              backgroundColor: 'var(--construction-concrete)',
              borderColor: 'var(--construction-orange)',
              borderLeftWidth: '3px'
            }}>
              <div className="text-xs font-medium capitalize" style={{ color: 'var(--construction-light)' }}>
                {group.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--construction-steel)' }}>
                {template.fields.filter(f => f.id.startsWith(group)).length} fields
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


