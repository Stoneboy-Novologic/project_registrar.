/**
 * @file ConnectedReport039.tsx
 * @module report-pages
 * @description Connected component for Payment Application with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport039ViewModel } from "./report-039ViewModel";
import Report039View from "./Report039View";

export default function ConnectedReport039() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport039ViewModel(values);
  
  return <Report039View viewModel={viewModel} />;
}

