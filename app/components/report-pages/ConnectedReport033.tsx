/**
 * @file ConnectedReport033.tsx
 * @module report-pages
 * @description Connected component for Safety Equipment Inspection with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport033ViewModel } from "./report-033ViewModel";
import Report033View from "./Report033View";

export default function ConnectedReport033() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport033ViewModel(values);
  
  return <Report033View viewModel={viewModel} />;
}

