/**
 * @file ConnectedReport040.tsx
 * @module report-pages
 * @description Connected component for Vendor Performance Review with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport040ViewModel } from "./report-040ViewModel";
import Report040View from "./Report040View";

export default function ConnectedReport040() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport040ViewModel(values);
  
  return <Report040View viewModel={viewModel} />;
}

