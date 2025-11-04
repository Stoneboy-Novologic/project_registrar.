/**
 * @file ConnectedReport013.tsx
 * @module report-pages
 * @description Connected component for Site Photos Documentation with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport013ViewModel } from "./report-013ViewModel";
import Report013View from "./Report013View";

export default function ConnectedReport013() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport013ViewModel(values);
  
  return <Report013View viewModel={viewModel} />;
}

