/* app/components/report-pages/viewModelFactory.ts */
import { z } from "zod";
import type { FieldValues, TemplateField } from "@/lib/types";

// Generic view model factory for any template
export function buildGenericViewModel(values: FieldValues, fields: TemplateField[]): Record<string, any> {
  console.log("Building generic view model with values:", values);
  console.log("Template fields:", fields);
  
  const result: Record<string, any> = {};
  
  // Process each field based on its type
  fields.forEach(field => {
    const value = values[field.id];
    
    switch (field.type) {
      case 'text':
      case 'multiline':
      case 'link':
      case 'date':
      case 'badge':
        result[field.id] = value || '';
        break;
        
      case 'image':
        result[field.id] = value || '';
        break;
        
      case 'attachments':
      case 'authors':
      case 'contents':
        // These are JSON arrays stored as strings
        try {
          result[field.id] = value ? JSON.parse(value) : [];
        } catch (e) {
          console.warn(`Failed to parse JSON for field ${field.id}:`, value);
          result[field.id] = [];
        }
        break;
        
      default:
        result[field.id] = value || '';
        break;
    }
  });
  
  console.log("Built generic view model result:", result);
  return result;
}

// Helper function to transform dotted field IDs to nested props
export function transformDottedFields(values: FieldValues): Record<string, any> {
  const result: Record<string, any> = {};
  
  Object.entries(values).forEach(([key, value]) => {
    const parts = key.split('.');
    let current = result;
    
    // Navigate/create nested structure
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    
    // Set the final value
    const lastPart = parts[parts.length - 1];
    current[lastPart] = value;
  });
  
  return result;
}

// Validation function for field values
export function validateFieldValues(values: FieldValues, fields: TemplateField[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  fields.forEach(field => {
    const value = values[field.id];
    
    // Check required fields
    if (field.required && (!value || value.trim() === '')) {
      errors.push(`Field "${field.label}" is required`);
      return;
    }
    
    // Skip validation if no value and not required
    if (!value || value.trim() === '') {
      return;
    }
    
    // Validate based on field type
    switch (field.type) {
      case 'date':
        if (!isValidDate(value)) {
          errors.push(`Field "${field.label}" must be a valid date`);
        }
        break;
        
      case 'link':
        if (!isValidUrl(value)) {
          errors.push(`Field "${field.label}" must be a valid URL`);
        }
        break;
        
      case 'attachments':
      case 'authors':
      case 'contents':
        try {
          JSON.parse(value);
        } catch (e) {
          errors.push(`Field "${field.label}" must be valid JSON`);
        }
        break;
    }
    
    // Check custom validation rules
    if (field.validation) {
      if (field.validation.minLength && value.length < field.validation.minLength) {
        errors.push(`Field "${field.label}" must be at least ${field.validation.minLength} characters`);
      }
      
      if (field.validation.maxLength && value.length > field.validation.maxLength) {
        errors.push(`Field "${field.label}" must be no more than ${field.validation.maxLength} characters`);
      }
      
      if (field.validation.pattern) {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          errors.push(field.validation.message || `Field "${field.label}" format is invalid`);
        }
      }
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Helper functions
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function isValidUrl(urlString: string): boolean {
  try {
    // Add protocol if missing
    const url = urlString.startsWith('http') ? urlString : `https://${urlString}`;
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
