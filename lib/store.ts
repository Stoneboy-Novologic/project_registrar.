/* lib/store.ts */
"use client";

import { create } from "zustand";
import type { EditorStore, FieldValues, ReportTemplate, ReportDB, ReportPageDB, ReportTemplateDB } from "./types";
import { logDebug, logInfo, logError } from "./log";
import { saveValues, loadValues } from "./persistence";
import { fetchReport, createReport, updateReport, deleteReport, addPageToReport, updatePageValues, removePageFromReport, reorderPages } from "./api/reports";
import { fetchTemplate } from "./api/templates";

// Debounce utility for auto-save
let saveTimeout: NodeJS.Timeout | null = null;

export const useEditorStore = create<EditorStore>()((set, get) => ({
  // Current report context
  currentReportId: null,
  currentReport: null,
  
  // Current page being edited
  currentPageId: null,
  activeTemplate: null,
  values: {},
  
  // Report pages list
  reportPages: [],
  
  // Loading states
  isLoading: false,
  isSaving: false,

  // Report management actions
  loadReport: async (reportId: string) => {
    try {
      set({ isLoading: true });
      logInfo("Loading report", { reportId });
      
      const report = await fetchReport(reportId);
      
      set({
        currentReportId: reportId,
        currentReport: report,
        reportPages: report.pages,
        isLoading: false
      });
      
      // Load first page if available
      if (report.pages.length > 0) {
        const firstPage = report.pages[0];
        await get().switchToPage(firstPage.id);
      }
      
      logInfo("Report loaded successfully", { 
        reportId, 
        name: report.name, 
        pageCount: report.pages.length 
      });
    } catch (error) {
      logError("Failed to load report", error);
      set({ isLoading: false });
      throw error;
    }
  },

  createReport: async (name: string, description?: string) => {
    try {
      set({ isLoading: true });
      logInfo("Creating report", { name, description });
      
      const report = await createReport({ name, description });
      
      set({
        currentReportId: report.id,
        currentReport: report,
        reportPages: [],
        isLoading: false
      });
      
      logInfo("Report created successfully", { id: report.id, name: report.name });
      return report;
    } catch (error) {
      logError("Failed to create report", error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateReport: async (reportId: string, updates: { name?: string; description?: string }) => {
    try {
      set({ isSaving: true });
      logInfo("Updating report", { reportId, updates });
      
      const updatedReport = await updateReport(reportId, updates);
      
      set((state) => ({
        currentReport: state.currentReportId === reportId ? updatedReport : state.currentReport,
        isSaving: false
      }));
      
      logInfo("Report updated successfully", { reportId, updates });
    } catch (error) {
      logError("Failed to update report", error);
      set({ isSaving: false });
      throw error;
    }
  },

  deleteReport: async (reportId: string) => {
    try {
      set({ isLoading: true });
      logInfo("Deleting report", { reportId });
      
      await deleteReport(reportId);
      
      // Clear current report if it's the one being deleted
      set((state) => ({
        currentReportId: state.currentReportId === reportId ? null : state.currentReportId,
        currentReport: state.currentReportId === reportId ? null : state.currentReport,
        currentPageId: state.currentReportId === reportId ? null : state.currentPageId,
        activeTemplate: state.currentReportId === reportId ? null : state.activeTemplate,
        values: state.currentReportId === reportId ? {} : state.values,
        reportPages: state.currentReportId === reportId ? [] : state.reportPages,
        isLoading: false
      }));
      
      logInfo("Report deleted successfully", { reportId });
    } catch (error) {
      logError("Failed to delete report", error);
      set({ isLoading: false });
      throw error;
    }
  },

  // Page management actions
  addPageToReport: async (templateId: string) => {
    try {
      const { currentReportId } = get();
      if (!currentReportId) {
        throw new Error("No report loaded");
      }
      
      set({ isSaving: true });
      logInfo("Adding page to report", { reportId: currentReportId, templateId });
      
      const newPage = await addPageToReport(currentReportId, templateId);
      
      // Refresh report to get updated pages with template data
      const updatedReport = await fetchReport(currentReportId);
      
      set({
        reportPages: updatedReport.pages,
        isSaving: false
      });
      
      // Switch to the new page
      await get().switchToPage(newPage.id);
      
      logInfo("Page added to report successfully", { 
        reportId: currentReportId, 
        pageId: newPage.id,
        templateId 
      });
    } catch (error) {
      logError("Failed to add page to report", error);
      set({ isSaving: false });
      throw error;
    }
  },

  switchToPage: async (pageId: string) => {
    try {
      const { reportPages, currentPageId } = get();
      const page = reportPages.find(p => p.id === pageId);
      
      if (!page) {
        throw new Error("Page not found");
      }
      
      // If switching away from current page, ensure pending saves complete
      if (currentPageId && currentPageId !== pageId && saveTimeout) {
        clearTimeout(saveTimeout);
        // Wait for any pending save to complete
        const { values } = get();
        try {
          set({ isSaving: true });
          await updatePageValues(get().currentReportId!, currentPageId, values);
          // Update the page in reportPages array
          set((state) => ({
            reportPages: state.reportPages.map(p => 
              p.id === currentPageId 
                ? { ...p, valuesJson: values }
                : p
            ),
            isSaving: false
          }));
        } catch (error) {
          logError("Failed to save before switching pages", error);
          set({ isSaving: false });
        }
        saveTimeout = null;
      }
      
      logInfo("Switching to page", { pageId, templateId: page.templateId });
      
      // Use template from page relation if available (it should be included when fetching report)
      let template: ReportTemplateDB;
      if (page.template) {
        // Template is already loaded in the page relation
        template = page.template;
        logInfo("Using template from page relation", { templatePageId: template.pageId });
      } else {
        // Fallback: fetch template by its pageId
        // This should not happen if pages are loaded with template relation
        // But we need to fetch by the template's pageId, not the database ID
        // Since we don't have the template relation, we need to fetch the template by its database ID first
        // Actually, we can't do that easily without a new API endpoint
        // So let's refresh the report to get pages with template relation
        logInfo("Template not in page relation, refreshing report", { pageId });
        const { currentReportId } = get();
        if (currentReportId) {
          const refreshedReport = await fetchReport(currentReportId);
          const refreshedPage = refreshedReport.pages.find(p => p.id === pageId);
          if (refreshedPage?.template) {
            template = refreshedPage.template;
          } else {
            throw new Error(`Template not found for page ${pageId}`);
          }
        } else {
          throw new Error("No report loaded and template not available");
        }
      }
      
      // Load saved values from page, ensuring we use actual saved values
      const savedValues = (page.valuesJson as FieldValues) || {};
      
      // Merge with template placeholders only for fields that don't have saved values
      const fields = template.fieldsJson as any[];
      const mergedValues: FieldValues = { ...savedValues };
      fields.forEach(field => {
        // Only use placeholder if field has no saved value
        if (!(field.id in mergedValues) && field.placeholder) {
          mergedValues[field.id] = field.placeholder;
        }
      });
      
      set({
        currentPageId: pageId,
        activeTemplate: template,
        values: mergedValues
      });
      
      logInfo("Store state updated", { 
        currentPageId: pageId, 
        templatePageId: template.pageId,
        valuesCount: Object.keys(mergedValues).length
      });
      
      logInfo("Switched to page successfully", { 
        pageId, 
        templateTitle: template.title,
        fieldCount: Object.keys(mergedValues).length,
        savedFieldCount: Object.keys(savedValues).length
      });
    } catch (error) {
      logError("Failed to switch to page", error);
      throw error;
    }
  },

  updatePageValues: async (values: FieldValues) => {
    try {
      const { currentReportId, currentPageId } = get();
      if (!currentReportId || !currentPageId) {
        throw new Error("No report or page loaded");
      }
      
      // Update local state immediately (optimistic update)
      set({ values });
      
      // Update reportPages array optimistically
      set((state) => ({
        reportPages: state.reportPages.map(page => 
          page.id === currentPageId 
            ? { ...page, valuesJson: values }
            : page
        )
      }));
      
      // Debounced save to database
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
      
      saveTimeout = setTimeout(async () => {
        try {
          set({ isSaving: true });
          const savedPage = await updatePageValues(currentReportId, currentPageId, values);
          
          // Update the page in reportPages array with server response
          set((state) => ({
            reportPages: state.reportPages.map(page => 
              page.id === currentPageId 
                ? { ...page, valuesJson: savedPage.valuesJson as FieldValues }
                : page
            ),
            isSaving: false
          }));
          
          logDebug("Page values auto-saved", { pageId: currentPageId, fieldCount: Object.keys(values).length });
        } catch (error) {
          logError("Failed to auto-save page values", error);
          set({ isSaving: false });
          // Optionally show error notification to user
        }
      }, 2000); // 2 second debounce
      
    } catch (error) {
      logError("Failed to update page values", error);
      throw error;
    }
  },

  deletePageFromReport: async (pageId: string) => {
    try {
      const { currentReportId, currentPageId } = get();
      if (!currentReportId) {
        throw new Error("No report loaded");
      }
      
      set({ isSaving: true });
      logInfo("Removing page from report", { reportId: currentReportId, pageId });
      
      await removePageFromReport(currentReportId, pageId);
      
      // Fetch updated report to get reordered pages
      const updatedReport = await fetchReport(currentReportId);
      
      set((state) => {
        const updatedPages = updatedReport.pages;
        
        // If we're deleting the current page, switch to another page
        let newCurrentPageId = state.currentPageId;
        let newActiveTemplate = state.activeTemplate;
        let newValues = state.values;
        
        if (state.currentPageId === pageId) {
          if (updatedPages.length > 0) {
            newCurrentPageId = updatedPages[0].id;
            // Will load template and values in next step
          } else {
            newCurrentPageId = null;
            newActiveTemplate = null;
            newValues = {};
          }
        }
        
        return {
          reportPages: updatedPages,
          currentPageId: newCurrentPageId,
          activeTemplate: newActiveTemplate,
          values: newValues,
          isSaving: false
        };
      });
      
      // If we switched to a new page, load it
      const { currentPageId: newPageId } = get();
      if (newPageId && newPageId !== pageId) {
        await get().switchToPage(newPageId);
      }
      
      logInfo("Page removed from report successfully", { reportId: currentReportId, pageId });
    } catch (error) {
      logError("Failed to remove page from report", error);
      set({ isSaving: false });
      throw error;
    }
  },

  reorderPages: async (pageIds: string[]) => {
    try {
      const { currentReportId } = get();
      if (!currentReportId) {
        throw new Error("No report loaded");
      }
      
      set({ isSaving: true });
      logInfo("Reordering pages", { reportId: currentReportId, pageIds });
      
      await reorderPages(currentReportId, pageIds);
      
      // Update local state with new order
      set((state) => ({
        reportPages: state.reportPages.sort((a, b) => {
          const aIndex = pageIds.indexOf(a.id);
          const bIndex = pageIds.indexOf(b.id);
          return aIndex - bIndex;
        }),
        isSaving: false
      }));
      
      logInfo("Pages reordered successfully", { reportId: currentReportId, pageCount: pageIds.length });
    } catch (error) {
      logError("Failed to reorder pages", error);
      set({ isSaving: false });
      throw error;
    }
  },

  // Legacy compatibility methods (for existing components)
  setActivePage: (pageId: string) => {
    logInfo("Legacy setActivePage called", { pageId });
    // This is now handled by switchToPage
    get().switchToPage(pageId).catch(error => {
      logError("Failed to switch to page", error);
    });
  },

  loadTemplate: (template: ReportTemplate) => {
    logInfo("Legacy loadTemplate called", { pageId: template.pageId });
    
    // Ensure we have fields array
    const fields = Array.isArray(template.fields) ? template.fields : [];
    
    // Convert legacy template to database format
    const dbTemplate: ReportTemplateDB = {
      id: template.pageId,
      pageId: template.pageId,
      title: template.title,
      category: 'project-documentation',
      version: '1.0.0',
      fieldsJson: fields,
      metadata: { fieldCount: fields.length, complexity: 'intermediate' },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Initialize with placeholder data
    const initialValues: FieldValues = {};
    fields.forEach(field => {
      if (field.placeholder) {
        initialValues[field.id] = field.placeholder;
      }
    });
    
    set({ 
      activeTemplate: dbTemplate, 
      currentPageId: template.pageId, 
      values: initialValues 
    });
    
    // Save to localStorage for backward compatibility
    saveValues(initialValues);
    
    logInfo("Legacy template loaded", { 
      pageId: template.pageId, 
      fieldCount: fields.length 
    });
  },

  updateFieldValue: (fieldId: string, value: string) => {
    const { values } = get();
    const newValues = { ...values, [fieldId]: value };
    
    set({ values: newValues });
    logDebug("Field updated (legacy)", { fieldId, value });
    
    // Auto-save if we have a current page
    const { currentPageId } = get();
    if (currentPageId) {
      get().updatePageValues(newValues).catch(error => {
        logError("Failed to auto-save field update", error);
      });
    } else {
      // Fallback to localStorage for backward compatibility
      saveValues(newValues);
    }
  },

  resetValues: () => {
    logInfo("Values reset (legacy)");
    set({ values: {} });
    saveValues({});
  },

  resetToPlaceholders: () => {
    const { activeTemplate } = get();
    if (!activeTemplate) {
      logInfo("No template loaded, cannot reset to placeholders");
      return;
    }
    
    const fields = activeTemplate.fieldsJson as any[];
    const placeholderValues: FieldValues = {};
    fields.forEach(field => {
      if (field.placeholder) {
        placeholderValues[field.id] = field.placeholder;
      }
    });
    
    set({ values: placeholderValues });
    
    // Auto-save if we have a current page
    const { currentPageId } = get();
    if (currentPageId) {
      get().updatePageValues(placeholderValues).catch(error => {
        logError("Failed to auto-save reset values", error);
      });
    } else {
      saveValues(placeholderValues);
    }
    
    logInfo("Values reset to placeholders (legacy)", { count: Object.keys(placeholderValues).length });
  },

  replaceValues: (values: FieldValues) => {
    logInfo("Values replaced (legacy)", { count: Object.keys(values).length });
    set({ values });
    
    // Auto-save if we have a current page
    const { currentPageId } = get();
    if (currentPageId) {
      get().updatePageValues(values).catch(error => {
        logError("Failed to auto-save replaced values", error);
      });
    } else {
      saveValues(values);
    }
  },
}));


