/* app/components/editor/SectionOutline.tsx */
"use client";

import { useState, useEffect } from "react";
import { useEditorStore } from "@/lib/store";
import { ReportTemplateDB } from "@/lib/types";
import { logInfo, logError } from "@/lib/log";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function SectionOutline() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    pages: true,
    fields: true,
  });
  const [templates, setTemplates] = useState<ReportTemplateDB[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const activeTemplate = useEditorStore((s) => s.activeTemplate);
  const currentPageId = useEditorStore((s) => s.currentPageId);
  const loadTemplate = useEditorStore((s) => s.loadTemplate);

  // Load templates from database
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoadingTemplates(true);
        const response = await fetch('/api/templates?limit=100');
        if (response.ok) {
          const data = await response.json();
          const templatesData = data.templates || data;
          setTemplates(templatesData);
          logInfo("Templates loaded in sidebar", { count: templatesData.length });
        }
      } catch (error) {
        logError("Failed to load templates in sidebar", error);
      } finally {
        setIsLoadingTemplates(false);
      }
    };
    
    loadTemplates();
  }, []);

  if (!activeTemplate) {
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

  const handleTemplateSelect = (templateData: ReportTemplateDB) => {
    const template = {
      pageId: templateData.pageId,
      title: templateData.title,
      fields: templateData.fieldsJson as any[]
    };
    loadTemplate(template);
    logInfo("Template selected in sidebar", { pageId: templateData.pageId, title: templateData.title });
  };

  // Filter templates based on search term
  const filteredTemplates = templates.filter(template => 
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.pageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group templates by category
  const templatesByCategory = filteredTemplates.reduce((acc, template) => {
    const category = template.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(template);
    return acc;
  }, {} as Record<string, ReportTemplateDB[]>);

  return (
    <div className="p-4 space-y-4">
      {/* Document Pages Section */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('pages')}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="text-xs font-medium uppercase tracking-wide font-semibold" style={{ color: 'var(--construction-yellow)' }}>
            Document Pages
          </div>
          {openSections.pages ? (
            <ChevronDown className="w-4 h-4" style={{ color: 'var(--construction-yellow)' }} />
          ) : (
            <ChevronRight className="w-4 h-4" style={{ color: 'var(--construction-yellow)' }} />
          )}
        </button>
        
        <AnimatePresence initial={false}>
          {openSections.pages && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="space-y-3">
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border"
                    style={{
                      backgroundColor: 'var(--construction-concrete)',
                      borderColor: 'var(--construction-steel)',
                      color: 'var(--construction-light)'
                    }}
                  />
                </div>

                {isLoadingTemplates ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{
                      borderColor: 'var(--construction-steel)',
                      borderTopColor: 'var(--construction-orange)'
                    }}></div>
                    <span className="ml-2 text-sm" style={{ color: 'var(--construction-light)' }}>Loading templates...</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
                      <div key={category} className="space-y-2">
                        <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--construction-yellow)' }}>
                          {category.replace('-', ' ')} ({categoryTemplates.length})
                        </div>
                        <div className="space-y-1">
                          {categoryTemplates.map((templateData) => {
                            const isActive = currentPageId === templateData.pageId;
                            return (
                              <button
                                key={templateData.id}
                                onClick={() => handleTemplateSelect(templateData)}
                                className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 ${
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
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 rounded-full transition-colors" style={{
                                    backgroundColor: isActive ? 'var(--construction-orange)' : 'var(--construction-steel)'
                                  }}></div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm truncate" style={{ color: isActive ? 'var(--construction-orange)' : 'var(--construction-light)' }}>
                                      {templateData.title}
                                    </div>
                                    <div className="text-xs mt-1 truncate" style={{ color: 'var(--construction-steel)' }}>
                                      {templateData.pageId} • {(templateData.fieldsJson as any[])?.length || 0} fields
                                    </div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Current Page Field Groups */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('fields')}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="text-xs font-medium uppercase tracking-wide font-semibold" style={{ color: 'var(--construction-yellow)' }}>
            Current Page Fields
          </div>
          {openSections.fields ? (
            <ChevronDown className="w-4 h-4" style={{ color: 'var(--construction-yellow)' }} />
          ) : (
            <ChevronRight className="w-4 h-4" style={{ color: 'var(--construction-yellow)' }} />
          )}
        </button>
        
        <AnimatePresence initial={false}>
          {openSections.fields && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="space-y-2">
                {activeTemplate.fieldsJson && Array.from(new Set((activeTemplate.fieldsJson as any[]).map(f => f.id.split('.')[0]))).map(group => (
            <div key={String(group)} className="px-3 py-2 rounded border" style={{
              backgroundColor: 'var(--construction-concrete)',
              borderColor: 'var(--construction-orange)',
              borderLeftWidth: '3px'
            }}>
              <div className="text-xs font-medium capitalize" style={{ color: 'var(--construction-light)' }}>
                {String(group).replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--construction-steel)' }}>
                {(activeTemplate.fieldsJson as any[]).filter(f => f.id.startsWith(String(group))).length} fields
              </div>
            </div>
              ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


