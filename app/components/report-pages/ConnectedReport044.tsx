/**
 * @file ConnectedReport044.tsx
 * @module report-pages
 * @description Connected component for System Performance Test with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport044ViewModel } from "./report-044ViewModel";
import Report044View from "./Report044View";

export default function ConnectedReport044() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport044ViewModel(values);
  
  return <Report044View viewModel={viewModel} />;
}

