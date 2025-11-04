/**
 * @file ConnectedReport022.tsx
 * @module report-pages
 * @description Connected component for Subcontractor Performance with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport022ViewModel } from "./report-022ViewModel";
import Report022View from "./Report022View";

export default function ConnectedReport022() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport022ViewModel(values);
  
  return <Report022View viewModel={viewModel} />;
}

