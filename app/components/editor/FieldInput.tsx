/* app/components/editor/FieldInput.tsx */
"use client";

import { useState, useEffect } from "react";
import { TemplateField } from "@/lib/types";
import { useEditorStore } from "@/lib/store";

interface Props {
  field: TemplateField;
}

export default function FieldInput({ field }: Props) {
  const value = useEditorStore((s) => s.values[field.id] ?? "");
  const update = useEditorStore((s) => s.updateFieldValue);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message?: string }>({ isValid: true });
  const [hasBlurred, setHasBlurred] = useState(false);

  // Simple validation function
  const validateField = (field: TemplateField, value: string) => {
    // Required field validation
    if (field.required && (!value || value.trim() === "")) {
      return {
        isValid: false,
        message: field.validation?.message || `${field.label} is required`
      };
    }

    // Skip validation if field is empty and not required
    if (!value || value.trim() === "") {
      return { isValid: true };
    }

    // Length validation
    if (field.validation?.minLength && value.length < field.validation.minLength) {
      return {
        isValid: false,
        message: field.validation.message || `${field.label} must be at least ${field.validation.minLength} characters`
      };
    }

    if (field.validation?.maxLength && value.length > field.validation.maxLength) {
      return {
        isValid: false,
        message: field.validation.message || `${field.label} must be no more than ${field.validation.maxLength} characters`
      };
    }

    // Pattern validation
    if (field.validation?.pattern) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return {
          isValid: false,
          message: field.validation.message || `${field.label} format is invalid`
        };
      }
    }

    // Type-specific validation
    switch (field.type) {
      case "link":
        try {
          new URL(value);
        } catch {
          return {
            isValid: false,
            message: "Please enter a valid URL"
          };
        }
        break;

      case "date":
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return {
            isValid: false,
            message: "Please enter a valid date"
          };
        }
        break;
    }

    return { isValid: true };
  };

  // Validate field on value change
  useEffect(() => {
    if (hasBlurred || value) {
      const result = validateField(field, value);
      setValidationResult(result);
    }
  }, [value, field, hasBlurred]);

  const handleBlur = () => {
    setHasBlurred(true);
    const result = validateField(field, value);
    setValidationResult(result);
  };

  const getInputClassName = () => {
    let className = "professional-input";
    
    if (hasBlurred || value) {
      if (!validationResult.isValid) {
        className += " construction-shake";
      } else if (validationResult.isValid && value) {
        className += " construction-success";
      }
    }
    
    return className;
  };

  const common = {
    id: field.id,
    className: getInputClassName(),
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(field.id, e.target.value),
    onBlur: handleBlur,
    placeholder: field.placeholder ?? field.label,
  };

  const renderInput = () => {
    if (field.type === "multiline") {
      return <textarea {...(common as any)} rows={3} />;
    }
    if (field.type === "date") {
      return <input type="date" {...(common as any)} />;
    }
    if (field.type === "image") {
      return (
        <div className="space-y-2">
          <input type="text" {...(common as any)} />
          {value && (
            <div className="mt-2">
              <img 
                src={value} 
                alt="Preview" 
                className="w-full h-32 object-cover rounded border border-gray-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      );
    }
    return <input type="text" {...(common as any)} />;
  };

  return (
    <div className="space-y-2">
      {renderInput()}
      
      {/* Help Text */}
      {field.helpText && (
        <div className="flex items-start space-x-2 text-xs" style={{ color: 'var(--construction-steel)' }}>
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{field.helpText}</span>
        </div>
      )}
      
      {/* Validation Message */}
      {hasBlurred && !validationResult.isValid && validationResult.message && (
        <div className="flex items-center space-x-2 text-xs" style={{ color: '#EF4444' }}>
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{validationResult.message}</span>
        </div>
      )}
      
      {/* Success Indicator */}
      {hasBlurred && validationResult.isValid && value && (
        <div className="flex items-center space-x-2 text-xs" style={{ color: '#10B981' }}>
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Valid</span>
        </div>
      )}
      
      {/* Character Count for Multiline */}
      {field.type === "multiline" && field.validation?.maxLength && (
        <div className="text-right text-xs" style={{ color: 'var(--construction-steel)' }}>
          {value.length}/{field.validation.maxLength}
        </div>
      )}
    </div>
  );
}


