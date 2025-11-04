/**
 * @file ConnectedReport036.tsx
 * @module report-pages
 * @description Connected component for Purchase Order Log with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport036ViewModel } from "./report-036ViewModel";
import Report036View from "./Report036View";

export default function ConnectedReport036() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport036ViewModel(values);
  
  return <Report036View viewModel={viewModel} />;
}

