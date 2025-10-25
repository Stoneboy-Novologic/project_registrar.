/* app/components/editor/EditorShell.tsx */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useEditorStore } from "@/lib/store";
import { ReportTemplate } from "@/lib/types";
import { ReportTemplateSchema } from "@/lib/validation";
import { logError, logInfo } from "@/lib/log";
import templateJson from "@/app/data/templates/default-v1/report-01.json";
import SectionOutline from "./SectionOutline";
import Toolbar from "./Toolbar";
import PageForm from "./PageForm";
import PagePreview from "./PagePreview";

export default function EditorShell() {
  const loadTemplate = useEditorStore((s) => s.loadTemplate);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Start collapsed for auto-hover behavior
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false); // Track if user manually expanded
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem('editor-sidebar-collapsed');
      const savedManuallyExpanded = localStorage.getItem('editor-sidebar-manually-expanded');
      
      if (savedCollapsed !== null) {
        setSidebarCollapsed(JSON.parse(savedCollapsed));
      }
      if (savedManuallyExpanded !== null) {
        setIsManuallyExpanded(JSON.parse(savedManuallyExpanded));
      }
      
      logInfo("Sidebar state loaded from localStorage", { 
        collapsed: savedCollapsed ? JSON.parse(savedCollapsed) : null,
        manuallyExpanded: savedManuallyExpanded ? JSON.parse(savedManuallyExpanded) : null
      });
    } catch (e) {
      logError("Failed to load sidebar state from localStorage", e);
    }
  }, []);

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('editor-sidebar-collapsed', JSON.stringify(sidebarCollapsed));
      localStorage.setItem('editor-sidebar-manually-expanded', JSON.stringify(isManuallyExpanded));
      logInfo("Sidebar state saved to localStorage", { collapsed: sidebarCollapsed, manuallyExpanded: isManuallyExpanded });
    } catch (e) {
      logError("Failed to save sidebar state to localStorage", e);
    }
  }, [sidebarCollapsed, isManuallyExpanded]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    setIsManuallyExpanded(!sidebarCollapsed); // If manually expanding, mark it
    logInfo("Sidebar toggled", { collapsed: !sidebarCollapsed });
  };

  // Auto-expand on hover, auto-collapse on mouse leave (unless manually expanded)
  const handleMouseEnter = () => {
    // Clear any pending collapse
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Immediately expand if collapsed
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
      logInfo("Sidebar auto-expanded on hover");
    }
  };

  const handleMouseLeave = () => {
    // Don't collapse if manually expanded
    if (isManuallyExpanded) return;
    
    // Collapse immediately - the CSS transition will handle the animation
    if (!sidebarCollapsed) {
      setSidebarCollapsed(true);
      logInfo("Sidebar auto-collapsed on mouse leave");
    }
  };

  // Initialize with a default template for demo purposes
  useEffect(() => {
    const initializeEditor = async () => {
      try {
        logInfo("Starting editor initialization...");
        
        // For demo purposes, load the first template from the database
        // In a real app, this would be based on the current report context
        const response = await fetch('/api/templates?limit=100');
        logInfo("API response received", { status: response.status, ok: response.ok });
        
        if (response.ok) {
          const data = await response.json();
          logInfo("API data received", { templatesCount: data.templates?.length || 0 });
          
          const templates = data.templates || data;
          if (templates.length > 0) {
            const firstTemplate = templates[0];
            logInfo("Loading first template", { pageId: firstTemplate.pageId, title: firstTemplate.title });
            
            // Convert database template to the format expected by loadTemplate
            const templateData: ReportTemplate = {
              pageId: firstTemplate.pageId,
              title: firstTemplate.title,
              fields: firstTemplate.fieldsJson as any[]
            };
            loadTemplate(templateData);
            logInfo("Editor initialized with template from database", { pageId: firstTemplate.pageId });
          } else {
            logInfo("No templates found in API response");
          }
        } else {
          logError("API request failed", { status: response.status, statusText: response.statusText });
        }
      } catch (e: any) {
        logError("Failed to initialize editor with database template", e);
        // Fallback to JSON template if database fails
        try {
          logInfo("Attempting fallback to JSON template...");
          const parsed = ReportTemplateSchema.safeParse(
            templateJson as unknown as ReportTemplate
          );
          if (parsed.success) {
            loadTemplate(parsed.data);
            logInfo("Editor initialized with fallback JSON template");
          } else {
            logError("JSON template parsing failed", parsed.error);
          }
        } catch (fallbackError) {
          logError("Fallback template loading failed", fallbackError);
        }
      }
    };
    
    // Add a small delay to ensure the component is fully mounted
    const timeoutId = setTimeout(initializeEditor, 100);
    return () => clearTimeout(timeoutId);
  }, [loadTemplate]);

  return (
    <div className="h-screen w-full grid grid-rows-[64px_1fr]" style={{
      gridTemplateColumns: sidebarCollapsed 
        ? '40px 350px 1fr' 
        : '280px 350px 1fr',
      transition: 'grid-template-columns 300ms ease-in-out'
    }}>
      {/* Professional Header */}
      <div className="col-span-3 border-b flex items-center justify-between px-6 backdrop-blur-sm shadow-lg" style={{
        background: 'linear-gradient(to right, var(--construction-charcoal), var(--construction-concrete), var(--construction-charcoal))',
        borderColor: 'var(--construction-orange)'
      }}>
        <div className="flex items-center space-x-3">
          <img 
            src="https://stoneboy.co/wp-content/uploads/2023/03/novologic1.png" 
            alt="Stoneboy Construction Logo" 
            className="h-8 w-auto object-contain"
          />
          <div>
            <h1 className="text-xl font-semibold tracking-tight" style={{ color: 'var(--construction-light)' }}>Stoneboy Construction Project Report Builder</h1>
            <p className="text-xs font-medium" style={{ color: 'var(--construction-yellow)' }}>Engineering Document Editor</p>
          </div>
        </div>
        <Toolbar />
      </div>
      
      {/* Professional Sidebar */}
      <aside 
        className="border-r overflow-y-auto" 
        style={{
          backgroundColor: 'var(--construction-charcoal)',
          borderColor: 'var(--construction-steel)',
          width: sidebarCollapsed ? '40px' : '280px',
          transition: 'width 300ms ease-in-out, opacity 300ms ease-in-out',
          opacity: 1
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {sidebarCollapsed ? (
          <div className="p-3">
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors shadow-sm"
              style={{
                backgroundColor: 'var(--construction-concrete)',
                color: 'var(--construction-light)',
                borderColor: 'var(--construction-orange)',
                border: '1px solid'
              }}
              title="Expand sidebar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <div className="p-4 border-b flex items-center justify-between" style={{
              borderColor: 'var(--construction-steel)',
              background: 'linear-gradient(to right, var(--construction-concrete), var(--construction-charcoal))'
            }}>
              <span className="text-xs font-medium uppercase tracking-wide font-bold" style={{ color: 'var(--construction-yellow)' }}>SECTIONS</span>
              <button
                onClick={toggleSidebar}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors shadow-sm"
                style={{
                  backgroundColor: 'var(--construction-concrete)',
                  color: 'var(--construction-light)',
                  borderColor: 'var(--construction-orange)',
                  border: '1px solid'
                }}
                title="Collapse sidebar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <SectionOutline />
          </div>
        )}
      </aside>
      
      {/* Professional Form Area */}
      <main className="overflow-y-auto" style={{ backgroundColor: 'var(--construction-concrete)' }}>
        <PageForm />
      </main>
      
      {/* Professional Preview Area */}
      <section className="border-l overflow-auto bg-gray-100" style={{ borderColor: 'var(--construction-steel)' }}>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight" style={{ color: 'var(--construction-charcoal)' }}>Live Preview</h2>
            <div className="flex items-center space-x-2 text-xs" style={{ color: 'var(--construction-steel)' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--construction-orange)' }}></div>
              <span>Auto-save enabled</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 shadow-lg">
            <PagePreview />
          </div>
        </div>
      </section>
    </div>
  );
}


