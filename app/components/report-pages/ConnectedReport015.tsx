/**
 * @file ConnectedReport015.tsx
 * @module report-pages
 * @description Connected component for RFI (Request for Information) with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport015ViewModel } from "./report-015ViewModel";
import Report015View from "./Report015View";

export default function ConnectedReport015() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport015ViewModel(values);
  
  return <Report015View viewModel={viewModel} />;
}

