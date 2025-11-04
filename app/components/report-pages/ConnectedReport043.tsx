/**
 * @file ConnectedReport043.tsx
 * @module report-pages
 * @description Connected component for Commissioning Checklist with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport043ViewModel } from "./report-043ViewModel";
import Report043View from "./Report043View";

export default function ConnectedReport043() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport043ViewModel(values);
  
  return <Report043View viewModel={viewModel} />;
}

