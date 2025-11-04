/**
 * @file ConnectedReport038.tsx
 * @module report-pages
 * @description Connected component for Cost Variance Analysis with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport038ViewModel } from "./report-038ViewModel";
import Report038View from "./Report038View";

export default function ConnectedReport038() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport038ViewModel(values);
  
  return <Report038View viewModel={viewModel} />;
}

