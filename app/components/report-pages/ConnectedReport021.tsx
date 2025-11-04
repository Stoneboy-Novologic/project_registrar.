/**
 * @file ConnectedReport021.tsx
 * @module report-pages
 * @description Connected component for Environmental Compliance with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport021ViewModel } from "./report-021ViewModel";
import Report021View from "./Report021View";

export default function ConnectedReport021() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport021ViewModel(values);
  
  return <Report021View viewModel={viewModel} />;
}

