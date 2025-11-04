/* app/components/report-pages/registry.ts */
"use client";

import dynamic from "next/dynamic";
import { buildReport01ViewModel } from "./report01ViewModel";
import { buildReport02ViewModel } from "./report02ViewModel";
import { buildReport03ViewModel } from "./report03ViewModel";
import { buildReport04ViewModel } from "./report04ViewModel";
import { buildReport05ViewModel } from "./report05ViewModel";
import { buildReport006ViewModel } from "./report-006ViewModel";
import { buildReport007ViewModel } from "./report-007ViewModel";
import { buildReport008ViewModel } from "./report-008ViewModel";
import { buildReport009ViewModel } from "./report-009ViewModel";
import { buildReport010ViewModel } from "./report-010ViewModel";
import { buildReport011ViewModel } from "./report-011ViewModel";
import { buildReport012ViewModel } from "./report-012ViewModel";
import { buildReport013ViewModel } from "./report-013ViewModel";
import { buildReport014ViewModel } from "./report-014ViewModel";
import { buildReport015ViewModel } from "./report-015ViewModel";
import { buildReport016ViewModel } from "./report-016ViewModel";
import { buildReport017ViewModel } from "./report-017ViewModel";
import { buildReport018ViewModel } from "./report-018ViewModel";
import { buildReport019ViewModel } from "./report-019ViewModel";
import { buildReport020ViewModel } from "./report-020ViewModel";
import { buildReport021ViewModel } from "./report-021ViewModel";
import { buildReport022ViewModel } from "./report-022ViewModel";
import { buildReport023ViewModel } from "./report-023ViewModel";
import { buildReport024ViewModel } from "./report-024ViewModel";
import { buildReport025ViewModel } from "./report-025ViewModel";
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
  },
  "report-007": {
    connected: dynamic(() => import("./ConnectedReport007"), { ssr: false }),
    view: async () => (await import("./Report007View")).default,
    viewModel: buildReport007ViewModel,
    metadata: {
      title: "Daily Progress Report",
      description: "Custom project-documentation template with enhanced layout",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-008": {
    connected: dynamic(() => import("./ConnectedReport008"), { ssr: false }),
    view: async () => (await import("./Report008View")).default,
    viewModel: buildReport008ViewModel,
    metadata: {
      title: "Material Delivery Log",
      description: "Custom project-documentation template with enhanced layout",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 10,
      complexity: "simple"
    }
  },
  "report-009": {
    connected: dynamic(() => import("./ConnectedReport009"), { ssr: false }),
    view: async () => (await import("./Report009View")).default,
    viewModel: buildReport009ViewModel,
    metadata: {
      title: "Equipment Usage Report",
      description: "Custom technical template with enhanced layout",
      category: "technical",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-010": {
    connected: dynamic(() => import("./ConnectedReport010"), { ssr: false }),
    view: async () => (await import("./Report010View")).default,
    viewModel: buildReport010ViewModel,
    metadata: {
      title: "Quality Control Checklist",
      description: "Custom quality-control template with enhanced layout",
      category: "quality-control",
      version: "1.0.0",
      fieldCount: 11,
      complexity: "intermediate"
    }
  },
  "report-012": {
    connected: dynamic(() => import("./ConnectedReport012"), { ssr: false }),
    view: async () => (await import("./Report012View")).default,
    viewModel: buildReport012ViewModel,
    metadata: {
      title: "Change Order Request",
      description: "Custom financial template with enhanced layout",
      category: "financial",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-013": {
    connected: dynamic(() => import("./ConnectedReport013"), { ssr: false }),
    view: async () => (await import("./Report013View")).default,
    viewModel: buildReport013ViewModel,
    metadata: {
      title: "Site Photos Documentation",
      description: "Custom technical template with enhanced layout",
      category: "technical",
      version: "1.0.0",
      fieldCount: 7,
      complexity: "simple"
    }
  },
  "report-014": {
    connected: dynamic(() => import("./ConnectedReport014"), { ssr: false }),
    view: async () => (await import("./Report014View")).default,
    viewModel: buildReport014ViewModel,
    metadata: {
      title: "Meeting Minutes",
      description: "Custom project-documentation template with enhanced layout",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-015": {
    connected: dynamic(() => import("./ConnectedReport015"), { ssr: false }),
    view: async () => (await import("./Report015View")).default,
    viewModel: buildReport015ViewModel,
    metadata: {
      title: "RFI (Request for Information)",
      description: "Custom technical template with enhanced layout",
      category: "technical",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-016": {
    connected: dynamic(() => import("./ConnectedReport016"), { ssr: false }),
    view: async () => (await import("./Report016View")).default,
    viewModel: buildReport016ViewModel,
    metadata: {
      title: "Submittal Log",
      description: "Custom project-documentation template with enhanced layout",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-017": {
    connected: dynamic(() => import("./ConnectedReport017"), { ssr: false }),
    view: async () => (await import("./Report017View")).default,
    viewModel: buildReport017ViewModel,
    metadata: {
      title: "Punch List",
      description: "Custom quality-control template with enhanced layout",
      category: "quality-control",
      version: "1.0.0",
      fieldCount: 10,
      complexity: "simple"
    }
  },
  "report-018": {
    connected: dynamic(() => import("./ConnectedReport018"), { ssr: false }),
    view: async () => (await import("./Report018View")).default,
    viewModel: buildReport018ViewModel,
    metadata: {
      title: "Weather Report",
      description: "Custom technical template with enhanced layout",
      category: "technical",
      version: "1.0.0",
      fieldCount: 7,
      complexity: "simple"
    }
  },
  "report-019": {
    connected: dynamic(() => import("./ConnectedReport019"), { ssr: false }),
    view: async () => (await import("./Report019View")).default,
    viewModel: buildReport019ViewModel,
    metadata: {
      title: "Labor Hours Tracking",
      description: "Custom project-documentation template with enhanced layout",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-020": {
    connected: dynamic(() => import("./ConnectedReport020"), { ssr: false }),
    view: async () => (await import("./Report020View")).default,
    viewModel: buildReport020ViewModel,
    metadata: {
      title: "Incident Report",
      description: "Custom safety template with enhanced layout",
      category: "safety",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-021": {
    connected: dynamic(() => import("./ConnectedReport021"), { ssr: false }),
    view: async () => (await import("./Report021View")).default,
    viewModel: buildReport021ViewModel,
    metadata: {
      title: "Environmental Compliance",
      description: "Custom technical template with enhanced layout",
      category: "technical",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-022": {
    connected: dynamic(() => import("./ConnectedReport022"), { ssr: false }),
    view: async () => (await import("./Report022View")).default,
    viewModel: buildReport022ViewModel,
    metadata: {
      title: "Subcontractor Performance",
      description: "Custom project-documentation template with enhanced layout",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-023": {
    connected: dynamic(() => import("./ConnectedReport023"), { ssr: false }),
    view: async () => (await import("./Report023View")).default,
    viewModel: buildReport023ViewModel,
    metadata: {
      title: "Inspection Request",
      description: "Custom quality-control template with enhanced layout",
      category: "quality-control",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-024": {
    connected: dynamic(() => import("./ConnectedReport024"), { ssr: false }),
    view: async () => (await import("./Report024View")).default,
    viewModel: buildReport024ViewModel,
    metadata: {
      title: "As-Built Documentation",
      description: "Custom technical template with enhanced layout",
      category: "technical",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-025": {
    connected: dynamic(() => import("./ConnectedReport025"), { ssr: false }),
    view: async () => (await import("./Report025View")).default,
    viewModel: buildReport025ViewModel,
    metadata: {
      title: "Project Closeout Checklist",
      description: "Custom project-documentation template with enhanced layout",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 11,
      complexity: "intermediate"
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


