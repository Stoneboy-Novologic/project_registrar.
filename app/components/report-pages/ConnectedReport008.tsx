/**
 * @file ConnectedReport008.tsx
 * @module report-pages
 * @description Connected component for Material Delivery Log with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport008ViewModel } from "./report-008ViewModel";
import Report008View from "./Report008View";

export default function ConnectedReport008() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport008ViewModel(values);
  
  return <Report008View viewModel={viewModel} />;
}

