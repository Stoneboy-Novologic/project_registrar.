/**
 * @file ConnectedReport050.tsx
 * @module report-pages
 * @description Connected component for Lessons Learned Report with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport050ViewModel } from "./report-050ViewModel";
import Report050View from "./Report050View";

export default function ConnectedReport050() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport050ViewModel(values);
  
  return <Report050View viewModel={viewModel} />;
}

