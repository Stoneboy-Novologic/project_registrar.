/**
 * @file ConnectedReport030.tsx
 * @module report-pages
 * @description Connected component for Resource Allocation Summary with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport030ViewModel } from "./report-030ViewModel";
import Report030View from "./Report030View";

export default function ConnectedReport030() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport030ViewModel(values);
  
  return <Report030View viewModel={viewModel} />;
}

