/* app/components/report-pages/registry.ts */
"use client";

import dynamic from "next/dynamic";
import { buildReport01ViewModel } from "./report01ViewModel";
import { buildReport02ViewModel } from "./report02ViewModel";
import { buildReport03ViewModel } from "./report03ViewModel";
import { buildReport04ViewModel } from "./report04ViewModel";
import { buildReport05ViewModel } from "./report05ViewModel";
import { buildReport006ViewModel } from "./report-006ViewModel";
import { buildReport011ViewModel } from "./report-011ViewModel";
import { buildGenericViewModel } from "./viewModelFactory";
import type { ReportTemplateDB } from "@/lib/types";

export interface TemplateMetadata {
  title: string;
  description: string;
  category: string;
  version: string;
  fieldCount: number;
  complexity: "simple" | "intermediate" | "complex";
}

export interface TemplateRegistryEntry {
  connected: React.ComponentType;
  view: () => Promise<React.ComponentType>;
  viewModel: (values: any) => any;
  metadata: TemplateMetadata;
}

// Custom components for reports 1-5 (backward compatibility)
const customRegistry = {
  "report-01": {
    connected: dynamic(() => import("./ConnectedReport01"), { ssr: false }),
    view: async () => (await import("./Report01View")).default,
    viewModel: buildReport01ViewModel,
    metadata: {
      title: "Project Register",
      description: "Standard project documentation with map",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 20,
      complexity: "intermediate"
    }
  },
  "report-02": {
    connected: dynamic(() => import("./ConnectedReport02"), { ssr: false }),
    view: async () => (await import("./Report02View")).default as any,
    viewModel: buildReport02ViewModel,
    metadata: {
      title: "Hello World Report",
      description: "Simple placeholder template for development",
      category: "placeholder",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-03": {
    connected: dynamic(() => import("./ConnectedReport03"), { ssr: false }),
    view: async () => (await import("./Report03View")).default,
    viewModel: buildReport03ViewModel,
    metadata: {
      title: "Table of Contents & Attachments",
      description: "Document index with attachments and authors",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 7,
      complexity: "intermediate"
    }
  },
  "report-04": {
    connected: dynamic(() => import("./ConnectedReport04"), { ssr: false }),
    view: async () => (await import("./Report04View")).default,
    viewModel: buildReport04ViewModel,
    metadata: {
      title: "Contents Continuation",
      description: "Additional table of contents entries",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 4,
      complexity: "simple"
    }
  },
  "report-05": {
    connected: dynamic(() => import("./ConnectedReport05"), { ssr: false }),
    view: async () => (await import("./Report05View")).default,
    viewModel: buildReport05ViewModel,
    metadata: {
      title: "Project Overview & Stakeholders",
      description: "Overview section with stakeholder table and contract summary",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 34,
      complexity: "intermediate"
    }
  },
  "report-06": {
    connected: dynamic(() => import("./ConnectedReport006"), { ssr: false }),
    view: async () => (await import("./Report006View")).default,
    viewModel: buildReport006ViewModel,
    metadata: {
      title: "Safety Inspection Checklist",
      description: "Custom safety template with enhanced layout",
      category: "safety",
      version: "1.0.0",
      fieldCount: 7,
      complexity: "simple"
    }
  },
  "report-011": {
    connected: dynamic(() => import("./ConnectedReport011"), { ssr: false }),
    view: async () => (await import("./Report011View")).default,
    viewModel: buildReport011ViewModel,
    metadata: {
      title: "Budget Summary",
      description: "Custom financial template with enhanced layout",
      category: "financial",
      version: "1.0.0",
      fieldCount: 10,
      complexity: "simple"
    }
  }
} as const;

// Generic components for all other templates
const GenericConnected = dynamic(() => import("./GenericConnectedReport"), { ssr: false });
const GenericView = dynamic(() => import("./GenericReportView"), { ssr: false });

// Dynamic registry function that checks for custom components first
export function getTemplateRegistryEntry(pageId: string, template?: ReportTemplateDB): TemplateRegistryEntry {
  // Check if we have a custom component for this pageId
  if (pageId in customRegistry) {
    return customRegistry[pageId as keyof typeof customRegistry];
  }
  
  // Use generic components for all other templates
  return {
    connected: GenericConnected,
    view: async () => GenericView,
    viewModel: (values: any) => {
      if (template) {
        return buildGenericViewModel(values, template.fieldsJson as any[]);
      }
      return values;
    },
    metadata: template ? {
      title: template.title,
      description: template.metadata?.description || `Generated template for ${template.title}`,
      category: template.category,
      version: template.version,
      fieldCount: template.metadata?.fieldCount || 0,
      complexity: template.metadata?.complexity || "simple"
    } : {
      title: "Unknown Template",
      description: "Template not found",
      category: "unknown",
      version: "1.0.0",
      fieldCount: 0,
      complexity: "simple"
    }
  };
}

// Legacy registry for backward compatibility
export const pageRegistry = customRegistry;

export type PageId = keyof typeof customRegistry;


