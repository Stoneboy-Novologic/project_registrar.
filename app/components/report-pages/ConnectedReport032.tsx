/**
 * @file ConnectedReport032.tsx
 * @module report-pages
 * @description Connected component for Toolbox Talk Documentation with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport032ViewModel } from "./report-032ViewModel";
import Report032View from "./Report032View";

export default function ConnectedReport032() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport032ViewModel(values);
  
  return <Report032View viewModel={viewModel} />;
}

