/* lib/types.ts */
// Types for the image-backed report editor
// These types are designed to be explicit and readable to future maintainers

export type FieldType = "text" | "multiline" | "link" | "date" | "badge" | "image";

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

export interface EditorState {
  activePageId: string | null;
  template: ReportTemplate | null;
  values: FieldValues; // keyed by field id
}

export interface EditorActions {
  setActivePage: (pageId: string) => void;
  loadTemplate: (template: ReportTemplate) => void;
  updateFieldValue: (fieldId: string, value: string) => void;
  resetValues: () => void;
  resetToPlaceholders: () => void;
  replaceValues: (values: FieldValues) => void;
}

export type EditorStore = EditorState & EditorActions;


