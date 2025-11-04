/* lib/types.ts */
// Types for the scalable multi-report editor system
// These types are designed to be explicit and readable to future maintainers

export type FieldType = "text" | "multiline" | "link" | "date" | "badge" | "image" | "attachments" | "authors" | "contents";

export interface TemplateField {
  // Unique dotted path id, also used for value map keys
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string; // Optional placeholder text for form inputs
  helpText?: string; // Help text shown below field label
  required?: boolean; // Whether field is required
  validation?: {
    pattern?: string; // Regex pattern for validation
    minLength?: number; // Minimum length
    maxLength?: number; // Maximum length
    message?: string; // Custom error message
  };
}

export interface ReportTemplate {
  pageId: string;
  title: string;
  fields: TemplateField[];
}

export type FieldValues = Record<string, string>;

// Database model types (matching Prisma schema)
export interface ReportTemplateDB {
  id: string;
  pageId: string;
  title: string;
  category: string;
  version: string;
  fieldsJson: any; // JSON field containing TemplateField[]
  metadata: any; // JSON field containing metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportDB {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportPageDB {
  id: string;
  reportId: string;
  templateId: string;
  pageOrder: number;
  valuesJson: any; // JSON field containing FieldValues
  createdAt: Date;
  updatedAt: Date;
  template?: ReportTemplateDB; // Included when fetching from API
}

export interface ReportExportDB {
  id: string;
  reportId: string;
  format: string;
  fileUrl: string | null;
  exportedAt: Date;
}

// Enhanced editor state for multi-report support
export interface EditorState {
  // Current report context
  currentReportId: string | null;
  currentReport: ReportDB | null;
  
  // Current page being edited
  currentPageId: string | null;
  activeTemplate: ReportTemplateDB | null;
  values: FieldValues; // keyed by field id
  
  // Report pages list
  reportPages: ReportPageDB[];
  
  // Loading states
  isLoading: boolean;
  isSaving: boolean;
}

export interface EditorActions {
  // Report management
  loadReport: (reportId: string) => Promise<void>;
  createReport: (name: string, description?: string) => Promise<ReportDB>;
  updateReport: (reportId: string, updates: { name?: string; description?: string }) => Promise<void>;
  deleteReport: (reportId: string) => Promise<void>;
  
  // Page management
  addPageToReport: (templateId: string) => Promise<void>;
  switchToPage: (pageId: string) => Promise<void>;
  updatePageValues: (values: FieldValues) => Promise<void>;
  deletePageFromReport: (pageId: string) => Promise<void>;
  reorderPages: (pageIds: string[]) => Promise<void>;
  
  // Legacy compatibility (for existing components)
  setActivePage: (pageId: string) => void;
  loadTemplate: (template: ReportTemplate) => void;
  updateFieldValue: (fieldId: string, value: string) => void;
  resetValues: () => void;
  resetToPlaceholders: () => void;
  replaceValues: (values: FieldValues) => void;
}

export type EditorStore = EditorState & EditorActions;


