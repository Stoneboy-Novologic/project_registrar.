/* app/components/report-pages/registry.ts */
"use client";

import dynamic from "next/dynamic";
import { buildReport01ViewModel } from "./report01ViewModel";
import { buildReport02ViewModel } from "./report02ViewModel";

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
  }
  // Ready for future templates
} as const satisfies Record<string, TemplateRegistryEntry>;

export type PageId = keyof typeof pageRegistry;


