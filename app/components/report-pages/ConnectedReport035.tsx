/**
 * @file ConnectedReport035.tsx
 * @module report-pages
 * @description Connected component for Safety Audit Report with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport035ViewModel } from "./report-035ViewModel";
import Report035View from "./Report035View";

export default function ConnectedReport035() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport035ViewModel(values);
  
  return <Report035View viewModel={viewModel} />;
}

