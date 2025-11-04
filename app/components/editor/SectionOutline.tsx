/* app/components/editor/SectionOutline.tsx */
"use client";

import { useState, useEffect } from "react";
import { useEditorStore } from "@/lib/store";
import { ReportTemplateDB } from "@/lib/types";
import { logInfo, logError } from "@/lib/log";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronRight, X } from "lucide-react";

export default function SectionOutline() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    reportPages: true,
    templates: true,
    fields: true,
  });
  const [templates, setTemplates] = useState<ReportTemplateDB[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedPageId, setDraggedPageId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const activeTemplate = useEditorStore((s) => s.activeTemplate);
  const currentPageId = useEditorStore((s) => s.currentPageId);
  const loadTemplate = useEditorStore((s) => s.loadTemplate);
  const reportPages = useEditorStore((s) => s.reportPages);
  const currentReport = useEditorStore((s) => s.currentReport);
  const currentReportId = useEditorStore((s) => s.currentReportId);
  const switchToPage = useEditorStore((s) => s.switchToPage);
  const deletePageFromReport = useEditorStore((s) => s.deletePageFromReport);
  const reorderPages = useEditorStore((s) => s.reorderPages);
  const addPageToReport = useEditorStore((s) => s.addPageToReport);
  const isSaving = useEditorStore((s) => s.isSaving);

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

  const handleTemplateSelect = async (templateData: ReportTemplateDB) => {
    // If we have a current report, add the template as a new page
    if (currentReportId) {
      try {
        await addPageToReport(templateData.id);
        logInfo("Template added as page to report", { 
          pageId: templateData.pageId, 
          title: templateData.title,
          reportId: currentReportId
        });
      } catch (error) {
        logError("Failed to add template as page to report", error);
      }
    } else {
      // Legacy behavior: just load the template (for backward compatibility)
      const template = {
        pageId: templateData.pageId,
        title: templateData.title,
        fields: templateData.fieldsJson as any[]
      };
      loadTemplate(template);
      logInfo("Template selected in sidebar (legacy mode)", { pageId: templateData.pageId, title: templateData.title });
    }
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

  // Handle drag and drop for page reordering
  const handleDragStart = (e: React.DragEvent, pageId: string) => {
    setIsDragging(true);
    setDraggedPageId(pageId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedPageId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetPageId: string) => {
    e.preventDefault();
    setIsDragging(false);
    if (!draggedPageId || draggedPageId === targetPageId || !currentReport) {
      setDraggedPageId(null);
      return;
    }

    const currentOrder = [...reportPages].sort((a, b) => a.pageOrder - b.pageOrder);
    const draggedIndex = currentOrder.findIndex(p => p.id === draggedPageId);
    const targetIndex = currentOrder.findIndex(p => p.id === targetPageId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedPageId(null);
      return;
    }

    // Reorder array
    const newOrder = [...currentOrder];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, removed);

    // Update pageOrder values
    const newPageIds = newOrder.map((p, index) => {
      return p.id;
    });

    try {
      await reorderPages(newPageIds);
      logInfo("Pages reordered successfully");
    } catch (error) {
      logError("Failed to reorder pages", error);
    }

    setDraggedPageId(null);
  };

  const handleDeleteClick = (e: React.MouseEvent, pageId: string) => {
    e.stopPropagation();
    setShowDeleteConfirm(pageId);
  };

  const handleConfirmDelete = async () => {
    if (!showDeleteConfirm) return;
    try {
      await deletePageFromReport(showDeleteConfirm);
      setShowDeleteConfirm(null);
      logInfo("Page deleted successfully");
    } catch (error) {
      logError("Failed to delete page", error);
      setShowDeleteConfirm(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Report Pages Section - Shows pages in current report */}
      {currentReport && (
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('reportPages')}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="text-xs font-medium uppercase tracking-wide font-semibold" style={{ color: 'var(--construction-yellow)' }}>
              Report Pages ({reportPages.length})
            </div>
            {openSections.reportPages ? (
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--construction-yellow)' }} />
            ) : (
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--construction-yellow)' }} />
            )}
          </button>
          
          <AnimatePresence initial={false}>
            {openSections.reportPages && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="space-y-2">
                  {reportPages.length === 0 ? (
                    <div className="px-3 py-4 text-center text-sm rounded-lg border" style={{
                      backgroundColor: 'var(--construction-concrete)',
                      borderColor: 'var(--construction-steel)',
                      color: 'var(--construction-steel)'
                    }}>
                      No pages in this report yet
                    </div>
                  ) : (
                    [...reportPages].sort((a, b) => a.pageOrder - b.pageOrder).map((page) => {
                      const isActive = currentPageId === page.id;
                      const pageTemplate = page.template;
                      const isPageDragging = draggedPageId === page.id;
                      
                      return (
                        <div
                          key={page.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, page.id)}
                          onDragEnd={handleDragEnd}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, page.id)}
                          className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                            isPageDragging ? "cursor-grabbing opacity-50" : "cursor-pointer"
                          } ${
                            isActive ? "shadow-md" : "hover:shadow-sm"
                          }`}
                          style={{
                            backgroundColor: isActive ? 'var(--construction-concrete)' : 'var(--construction-charcoal)',
                            borderColor: isActive ? 'var(--construction-orange)' : 'var(--construction-steel)',
                            boxShadow: isActive ? '0 0 0 2px rgba(255, 107, 53, 0.2)' : 'none'
                          }}
                          onClick={(e) => {
                            // Only switch if not dragging and didn't click on delete button
                            if (!isDragging && !(e.target as HTMLElement).closest('button')) {
                              switchToPage(page.id).catch(err => {
                                logError("Failed to switch to page", err);
                              });
                            }
                          }}
                        >
                          {/* Drag Handle */}
                          <div 
                            className="flex-shrink-0 cursor-grab active:cursor-grabbing" 
                            style={{ color: 'var(--construction-steel)' }}
                            onMouseDown={(e) => {
                              // Prevent click when starting drag from handle
                              e.stopPropagation();
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            </svg>
                          </div>

                          {/* Page Info - Clickable area */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full transition-colors" style={{
                                backgroundColor: isActive ? 'var(--construction-orange)' : 'var(--construction-steel)'
                              }}></div>
                              <div className="font-semibold text-sm truncate" style={{ color: isActive ? 'var(--construction-orange)' : 'var(--construction-light)' }}>
                                {pageTemplate?.title || `Page ${page.pageOrder}`}
                              </div>
                            </div>
                            <div className="text-xs mt-1 truncate flex items-center gap-2" style={{ color: 'var(--construction-steel)' }}>
                              <span>#{page.pageOrder}</span>
                              {pageTemplate?.pageId && <span>• {pageTemplate.pageId}</span>}
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(e, page.id);
                            }}
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-500/20"
                            style={{ color: 'var(--construction-steel)' }}
                            title="Delete page"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Available Templates Section - Shows templates to add */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('templates')}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="text-xs font-medium uppercase tracking-wide font-semibold" style={{ color: 'var(--construction-yellow)' }}>
            Available Templates
          </div>
          {openSections.templates ? (
            <ChevronDown className="w-4 h-4" style={{ color: 'var(--construction-yellow)' }} />
          ) : (
            <ChevronRight className="w-4 h-4" style={{ color: 'var(--construction-yellow)' }} />
          )}
        </button>
        
        <AnimatePresence initial={false}>
          {openSections.templates && (
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleCancelDelete}>
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--construction-charcoal)',
              borderColor: 'var(--construction-orange)',
              borderWidth: '2px'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--construction-light)' }}>
                Delete Page
              </h3>
              <button
                onClick={handleCancelDelete}
                className="p-1 rounded hover:bg-gray-700"
                style={{ color: 'var(--construction-steel)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-6" style={{ color: 'var(--construction-light)' }}>
              Are you sure you want to remove this page from the report? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded-lg border transition-colors"
                style={{
                  backgroundColor: 'var(--construction-concrete)',
                  borderColor: 'var(--construction-steel)',
                  color: 'var(--construction-light)'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: '#EF4444',
                  color: 'white'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


