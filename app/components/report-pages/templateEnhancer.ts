/* app/components/report-pages/templateEnhancer.ts */
import { ReportTemplateDB } from "@/lib/types";

export interface TemplateEnhancement {
  customClass?: string;
  layout?: 'standard' | 'safety' | 'financial' | 'technical' | 'quality';
  sections?: {
    [key: string]: {
      className?: string;
      icon?: string;
      color?: string;
    }
  };
}

// Template-specific enhancements
export const templateEnhancements: Record<string, TemplateEnhancement> = {
  "report-006": {
    customClass: "safety-inspection-report",
    layout: "safety",
    sections: {
      "safety": {
        className: "hazards-section",
        icon: "⚠️",
        color: "#ff6b35"
      }
    }
  },
  "report-011": {
    customClass: "budget-summary-report",
    layout: "financial",
    sections: {
      "budget": {
        className: "budget-highlight",
        icon: "💰",
        color: "#28a745"
      }
    }
  },
  "report-020": {
    customClass: "incident-report",
    layout: "safety",
    sections: {
      "incident": {
        className: "incident-details",
        icon: "🚨",
        color: "#dc3545"
      }
    }
  }
};

export function getTemplateEnhancement(pageId: string): TemplateEnhancement {
  return templateEnhancements[pageId] || {};
}

export function enhanceTemplateFields(template: ReportTemplateDB): ReportTemplateDB {
  const enhancement = getTemplateEnhancement(template.pageId);
  
  if (!enhancement.customClass) {
    return template;
  }
  
  // Add enhancement metadata to template
  return {
    ...template,
    metadata: {
      ...template.metadata,
      enhancement
    }
  };
}

