/**
 * @file ConnectedReport027.tsx
 * @module report-pages
 * @description Connected component for Risk Assessment Register with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport027ViewModel } from "./report-027ViewModel";
import Report027View from "./Report027View";

export default function ConnectedReport027() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport027ViewModel(values);
  
  return <Report027View viewModel={viewModel} />;
}

