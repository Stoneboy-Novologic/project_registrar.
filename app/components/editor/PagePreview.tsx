/* app/components/editor/PagePreview.tsx */
"use client";

import { useEditorStore } from "@/lib/store";
import { getTemplateRegistryEntry } from "@/app/components/report-pages/registry";

export default function PagePreview() {
  const activeTemplate = useEditorStore((s) => s.activeTemplate);
  const values = useEditorStore((s) => s.values);
  const currentPageId = useEditorStore((s) => s.currentPageId);
  
  // Debug logging
  if (typeof window !== 'undefined' && activeTemplate) {
    console.log('[PagePreview] Rendering with:', {
      pageId: activeTemplate.pageId,
      title: activeTemplate.title,
      valuesCount: Object.keys(values).length,
      currentPageId
    });
  }
  
  if (!activeTemplate) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4" style={{
            borderColor: 'var(--construction-steel)',
            borderTopColor: 'var(--construction-orange)'
          }}></div>
          <p className="text-gray-600">Waiting for template...</p>
        </div>
      </div>
    );
  }

  try {
    // Get the appropriate registry entry (custom or generic)
    const entry = getTemplateRegistryEntry(activeTemplate.pageId, activeTemplate);
    
    // For generic components, we need to pass the template as a prop
    if (activeTemplate.pageId.startsWith('report-0') && parseInt(activeTemplate.pageId.split('-')[1]) > 5) {
      // This is a generic template (report-006+)
      const GenericConnected = entry.connected;
      return (
        <div className="w-full h-full flex items-start justify-center p-6 overflow-auto">
          <div className="w-full max-w-[1600px]">
            <GenericConnected template={activeTemplate} />
          </div>
        </div>
      );
    } else {
      // This is a custom template (report-01 to report-05)
      const Connected = entry.connected;
      return (
        <div className="w-full h-full flex items-start justify-center p-6 overflow-auto">
          <div className="w-full max-w-[1600px]">
            <Connected />
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error("Error rendering template:", error);
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error rendering template</p>
          <p className="text-gray-600 text-sm">{activeTemplate.pageId}</p>
        </div>
      </div>
    );
  }
}


