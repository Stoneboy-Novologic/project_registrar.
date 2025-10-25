/* app/components/report-pages/registry.ts */
"use client";

import dynamic from "next/dynamic";
import { buildReport01ViewModel } from "./report01ViewModel";
import { buildReport02ViewModel } from "./report02ViewModel";
import { buildReport03ViewModel } from "./report03ViewModel";
import { buildReport04ViewModel } from "./report04ViewModel";
import { buildReport05ViewModel } from "./report05ViewModel";

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

export const pageRegistry = {
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
  }
  // Ready for future templates
} as const satisfies Record<string, TemplateRegistryEntry>;

export type PageId = keyof typeof pageRegistry;


