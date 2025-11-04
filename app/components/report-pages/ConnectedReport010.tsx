/**
 * @file ConnectedReport010.tsx
 * @module report-pages
 * @description Connected component for Quality Control Checklist with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport010ViewModel } from "./report-010ViewModel";
import Report010View from "./Report010View";

export default function ConnectedReport010() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport010ViewModel(values);
  
  return <Report010View viewModel={viewModel} />;
}

