/* lib/persistence.ts */
import { FieldValues } from "./types";
import { logError, logInfo } from "./log";

const PROJECT_KEY = "report-editor-project";

export function saveValues(values: FieldValues, key = PROJECT_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify(values));
    logInfo("Autosaved values", { count: Object.keys(values).length });
  } catch (e) {
    logError("Failed to save values", e);
  }
}

export function loadValues(key = PROJECT_KEY): FieldValues | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FieldValues;
    return parsed;
  } catch (e) {
    logError("Failed to load values", e);
    return null;
  }
}

export function exportValues(values: FieldValues): string {
  return JSON.stringify(values, null, 2);
}

export function importValues(json: string): FieldValues | null {
  try {
    const parsed = JSON.parse(json) as FieldValues;
    return parsed;
  } catch (e) {
    logError("Invalid JSON on import", e);
    return null;
  }
}


