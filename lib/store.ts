/* lib/store.ts */
"use client";

import { create } from "zustand";
import type { EditorStore, FieldValues, ReportTemplate } from "./types";
import { logDebug, logInfo } from "./log";
import { saveValues, loadValues } from "./persistence";

export const useEditorStore = create<EditorStore>()((set, get) => ({
  activePageId: null,
  template: null,
  values: {},

  setActivePage: (pageId: string) => {
    logInfo("Active page changed", { pageId });
    set({ activePageId: pageId });
  },

  loadTemplate: (template: ReportTemplate) => {
    logInfo("Template loaded", { pageId: template.pageId, fields: template.fields.length });
    
    // Always initialize with placeholder data for first load
    const initialValues: FieldValues = {};
    template.fields.forEach(field => {
      if (field.placeholder) {
        initialValues[field.id] = field.placeholder;
      }
    });
    
    set({ template, activePageId: template.pageId, values: initialValues });
    logInfo("Values initialized with placeholders", { 
      count: Object.keys(initialValues).length,
      placeholderCount: template.fields.filter(f => f.placeholder).length
    });
    
    // Save the placeholder values to localStorage
    saveValues(initialValues);
  },

  updateFieldValue: (fieldId: string, value: string) => {
    set((state) => {
      const next: FieldValues = { ...state.values, [fieldId]: value };
      return { values: next };
    });
    logDebug("Field updated", { fieldId, value });
    saveValues(get().values);
  },

  resetValues: () => {
    logInfo("Values reset");
    set({ values: {} });
    saveValues({});
  },

  resetToPlaceholders: () => {
    const template = get().template;
    if (!template) {
      logInfo("No template loaded, cannot reset to placeholders");
      return;
    }
    
    const placeholderValues: FieldValues = {};
    template.fields.forEach(field => {
      if (field.placeholder) {
        placeholderValues[field.id] = field.placeholder;
      }
    });
    
    set({ values: placeholderValues });
    saveValues(placeholderValues);
    logInfo("Values reset to placeholders", { count: Object.keys(placeholderValues).length });
  },

  replaceValues: (values: FieldValues) => {
    logInfo("Values replaced", { count: Object.keys(values).length });
    set({ values });
    saveValues(values);
  },
}));


