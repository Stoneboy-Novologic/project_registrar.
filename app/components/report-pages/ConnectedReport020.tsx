/**
 * @file ConnectedReport020.tsx
 * @module report-pages
 * @description Connected component for Incident Report with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport020ViewModel } from "./report-020ViewModel";
import Report020View from "./Report020View";

export default function ConnectedReport020() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport020ViewModel(values);
  
  return <Report020View viewModel={viewModel} />;
}

