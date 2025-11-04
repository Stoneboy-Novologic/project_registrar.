/**
 * @file ConnectedReport046.tsx
 * @module report-pages
 * @description Connected component for Correspondence Log with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport046ViewModel } from "./report-046ViewModel";
import Report046View from "./Report046View";

export default function ConnectedReport046() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport046ViewModel(values);
  
  return <Report046View viewModel={viewModel} />;
}

