/**
 * @file ConnectedReport024.tsx
 * @module report-pages
 * @description Connected component for As-Built Documentation with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport024ViewModel } from "./report-024ViewModel";
import Report024View from "./Report024View";

export default function ConnectedReport024() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport024ViewModel(values);
  
  return <Report024View viewModel={viewModel} />;
}

