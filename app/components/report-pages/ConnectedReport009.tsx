/**
 * @file ConnectedReport009.tsx
 * @module report-pages
 * @description Connected component for Equipment Usage Report with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport009ViewModel } from "./report-009ViewModel";
import Report009View from "./Report009View";

export default function ConnectedReport009() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport009ViewModel(values);
  
  return <Report009View viewModel={viewModel} />;
}

