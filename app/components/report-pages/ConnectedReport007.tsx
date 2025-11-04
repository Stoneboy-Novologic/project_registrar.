/**
 * @file ConnectedReport007.tsx
 * @module report-pages
 * @description Connected component for Daily Progress Report with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport007ViewModel } from "./report-007ViewModel";
import Report007View from "./Report007View";

export default function ConnectedReport007() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport007ViewModel(values);
  
  return <Report007View viewModel={viewModel} />;
}

