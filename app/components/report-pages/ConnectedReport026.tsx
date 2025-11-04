/**
 * @file ConnectedReport026.tsx
 * @module report-pages
 * @description Connected component for Project Schedule Update with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport026ViewModel } from "./report-026ViewModel";
import Report026View from "./Report026View";

export default function ConnectedReport026() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport026ViewModel(values);
  
  return <Report026View viewModel={viewModel} />;
}

