/**
 * @file ConnectedReport034.tsx
 * @module report-pages
 * @description Connected component for Emergency Response Plan with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport034ViewModel } from "./report-034ViewModel";
import Report034View from "./Report034View";

export default function ConnectedReport034() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport034ViewModel(values);
  
  return <Report034View viewModel={viewModel} />;
}

