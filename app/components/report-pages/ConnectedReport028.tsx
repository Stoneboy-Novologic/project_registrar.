/**
 * @file ConnectedReport028.tsx
 * @module report-pages
 * @description Connected component for Stakeholder Communication Log with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport028ViewModel } from "./report-028ViewModel";
import Report028View from "./Report028View";

export default function ConnectedReport028() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport028ViewModel(values);
  
  return <Report028View viewModel={viewModel} />;
}

