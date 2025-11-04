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
import { buildReport026ViewModel } from "./report-026ViewModel";
import { buildReport027ViewModel } from "./report-027ViewModel";
import { buildReport028ViewModel } from "./report-028ViewModel";
import { buildReport029ViewModel } from "./report-029ViewModel";
import { buildReport030ViewModel } from "./report-030ViewModel";
import { buildReport031ViewModel } from "./report-031ViewModel";
import { buildReport032ViewModel } from "./report-032ViewModel";
import { buildReport033ViewModel } from "./report-033ViewModel";
import { buildReport034ViewModel } from "./report-034ViewModel";
import { buildReport035ViewModel } from "./report-035ViewModel";
import { buildReport036ViewModel } from "./report-036ViewModel";
import { buildReport037ViewModel } from "./report-037ViewModel";
import { buildReport038ViewModel } from "./report-038ViewModel";
import { buildReport039ViewModel } from "./report-039ViewModel";
import { buildReport040ViewModel } from "./report-040ViewModel";
import { buildReport041ViewModel } from "./report-041ViewModel";
import { buildReport042ViewModel } from "./report-042ViewModel";
import { buildReport043ViewModel } from "./report-043ViewModel";
import { buildReport044ViewModel } from "./report-044ViewModel";
import { buildReport045ViewModel } from "./report-045ViewModel";
import { buildReport046ViewModel } from "./report-046ViewModel";
import { buildReport047ViewModel } from "./report-047ViewModel";
import { buildReport048ViewModel } from "./report-048ViewModel";
import { buildReport049ViewModel } from "./report-049ViewModel";
import { buildReport050ViewModel } from "./report-050ViewModel";
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
  },
  "report-026": {
    connected: dynamic(() => import("./ConnectedReport026"), { ssr: false }),
    view: async () => (await import("./Report026View")).default,
    viewModel: buildReport026ViewModel,
    metadata: {
      title: "Project Schedule Update",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-027": {
    connected: dynamic(() => import("./ConnectedReport027"), { ssr: false }),
    view: async () => (await import("./Report027View")).default,
    viewModel: buildReport027ViewModel,
    metadata: {
      title: "Risk Assessment Register",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-028": {
    connected: dynamic(() => import("./ConnectedReport028"), { ssr: false }),
    view: async () => (await import("./Report028View")).default,
    viewModel: buildReport028ViewModel,
    metadata: {
      title: "Stakeholder Communication Log",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-029": {
    connected: dynamic(() => import("./ConnectedReport029"), { ssr: false }),
    view: async () => (await import("./Report029View")).default,
    viewModel: buildReport029ViewModel,
    metadata: {
      title: "Project Milestone Report",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-030": {
    connected: dynamic(() => import("./ConnectedReport030"), { ssr: false }),
    view: async () => (await import("./Report030View")).default,
    viewModel: buildReport030ViewModel,
    metadata: {
      title: "Resource Allocation Summary",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-031": {
    connected: dynamic(() => import("./ConnectedReport031"), { ssr: false }),
    view: async () => (await import("./Report031View")).default,
    viewModel: buildReport031ViewModel,
    metadata: {
      title: "Safety Training Record",
      description: "Custom safety template with beautiful UI",
      category: "safety",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-032": {
    connected: dynamic(() => import("./ConnectedReport032"), { ssr: false }),
    view: async () => (await import("./Report032View")).default,
    viewModel: buildReport032ViewModel,
    metadata: {
      title: "Toolbox Talk Documentation",
      description: "Custom safety template with beautiful UI",
      category: "safety",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-033": {
    connected: dynamic(() => import("./ConnectedReport033"), { ssr: false }),
    view: async () => (await import("./Report033View")).default,
    viewModel: buildReport033ViewModel,
    metadata: {
      title: "Safety Equipment Inspection",
      description: "Custom safety template with beautiful UI",
      category: "safety",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-034": {
    connected: dynamic(() => import("./ConnectedReport034"), { ssr: false }),
    view: async () => (await import("./Report034View")).default,
    viewModel: buildReport034ViewModel,
    metadata: {
      title: "Emergency Response Plan",
      description: "Custom safety template with beautiful UI",
      category: "safety",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-035": {
    connected: dynamic(() => import("./ConnectedReport035"), { ssr: false }),
    view: async () => (await import("./Report035View")).default,
    viewModel: buildReport035ViewModel,
    metadata: {
      title: "Safety Audit Report",
      description: "Custom safety template with beautiful UI",
      category: "safety",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-036": {
    connected: dynamic(() => import("./ConnectedReport036"), { ssr: false }),
    view: async () => (await import("./Report036View")).default,
    viewModel: buildReport036ViewModel,
    metadata: {
      title: "Purchase Order Log",
      description: "Custom financial template with beautiful UI",
      category: "financial",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-037": {
    connected: dynamic(() => import("./ConnectedReport037"), { ssr: false }),
    view: async () => (await import("./Report037View")).default,
    viewModel: buildReport037ViewModel,
    metadata: {
      title: "Invoice Tracking",
      description: "Custom financial template with beautiful UI",
      category: "financial",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-038": {
    connected: dynamic(() => import("./ConnectedReport038"), { ssr: false }),
    view: async () => (await import("./Report038View")).default,
    viewModel: buildReport038ViewModel,
    metadata: {
      title: "Cost Variance Analysis",
      description: "Custom financial template with beautiful UI",
      category: "financial",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-039": {
    connected: dynamic(() => import("./ConnectedReport039"), { ssr: false }),
    view: async () => (await import("./Report039View")).default,
    viewModel: buildReport039ViewModel,
    metadata: {
      title: "Payment Application",
      description: "Custom financial template with beautiful UI",
      category: "financial",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-040": {
    connected: dynamic(() => import("./ConnectedReport040"), { ssr: false }),
    view: async () => (await import("./Report040View")).default,
    viewModel: buildReport040ViewModel,
    metadata: {
      title: "Vendor Performance Review",
      description: "Custom financial template with beautiful UI",
      category: "financial",
      version: "1.0.0",
      fieldCount: 8,
      complexity: "simple"
    }
  },
  "report-041": {
    connected: dynamic(() => import("./ConnectedReport041"), { ssr: false }),
    view: async () => (await import("./Report041View")).default,
    viewModel: buildReport041ViewModel,
    metadata: {
      title: "Material Testing Report",
      description: "Custom technical template with beautiful UI",
      category: "technical",
      version: "1.0.0",
      fieldCount: 10,
      complexity: "simple"
    }
  },
  "report-042": {
    connected: dynamic(() => import("./ConnectedReport042"), { ssr: false }),
    view: async () => (await import("./Report042View")).default,
    viewModel: buildReport042ViewModel,
    metadata: {
      title: "Non-Conformance Report (NCR)",
      description: "Custom quality-control template with beautiful UI",
      category: "quality-control",
      version: "1.0.0",
      fieldCount: 10,
      complexity: "simple"
    }
  },
  "report-043": {
    connected: dynamic(() => import("./ConnectedReport043"), { ssr: false }),
    view: async () => (await import("./Report043View")).default,
    viewModel: buildReport043ViewModel,
    metadata: {
      title: "Commissioning Checklist",
      description: "Custom technical template with beautiful UI",
      category: "technical",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-044": {
    connected: dynamic(() => import("./ConnectedReport044"), { ssr: false }),
    view: async () => (await import("./Report044View")).default,
    viewModel: buildReport044ViewModel,
    metadata: {
      title: "System Performance Test",
      description: "Custom technical template with beautiful UI",
      category: "technical",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-045": {
    connected: dynamic(() => import("./ConnectedReport045"), { ssr: false }),
    view: async () => (await import("./Report045View")).default,
    viewModel: buildReport045ViewModel,
    metadata: {
      title: "Technical Specification Review",
      description: "Custom technical template with beautiful UI",
      category: "technical",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-046": {
    connected: dynamic(() => import("./ConnectedReport046"), { ssr: false }),
    view: async () => (await import("./Report046View")).default,
    viewModel: buildReport046ViewModel,
    metadata: {
      title: "Correspondence Log",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-047": {
    connected: dynamic(() => import("./ConnectedReport047"), { ssr: false }),
    view: async () => (await import("./Report047View")).default,
    viewModel: buildReport047ViewModel,
    metadata: {
      title: "Drawing Revision Log",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-048": {
    connected: dynamic(() => import("./ConnectedReport048"), { ssr: false }),
    view: async () => (await import("./Report048View")).default,
    viewModel: buildReport048ViewModel,
    metadata: {
      title: "Permit Status Report",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-049": {
    connected: dynamic(() => import("./ConnectedReport049"), { ssr: false }),
    view: async () => (await import("./Report049View")).default,
    viewModel: buildReport049ViewModel,
    metadata: {
      title: "Warranty Documentation",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 9,
      complexity: "simple"
    }
  },
  "report-050": {
    connected: dynamic(() => import("./ConnectedReport050"), { ssr: false }),
    view: async () => (await import("./Report050View")).default,
    viewModel: buildReport050ViewModel,
    metadata: {
      title: "Lessons Learned Report",
      description: "Custom project-documentation template with beautiful UI",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 9,
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


