/**
 * @file ConnectedReport045.tsx
 * @module report-pages
 * @description Connected component for Technical Specification Review with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport045ViewModel } from "./report-045ViewModel";
import Report045View from "./Report045View";

export default function ConnectedReport045() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport045ViewModel(values);
  
  return <Report045View viewModel={viewModel} />;
}

