/**
 * @file ConnectedReport048.tsx
 * @module report-pages
 * @description Connected component for Permit Status Report with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport048ViewModel } from "./report-048ViewModel";
import Report048View from "./Report048View";

export default function ConnectedReport048() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport048ViewModel(values);
  
  return <Report048View viewModel={viewModel} />;
}

