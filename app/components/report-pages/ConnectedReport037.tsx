/**
 * @file ConnectedReport037.tsx
 * @module report-pages
 * @description Connected component for Invoice Tracking with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport037ViewModel } from "./report-037ViewModel";
import Report037View from "./Report037View";

export default function ConnectedReport037() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport037ViewModel(values);
  
  return <Report037View viewModel={viewModel} />;
}

