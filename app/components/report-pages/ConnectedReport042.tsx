/**
 * @file ConnectedReport042.tsx
 * @module report-pages
 * @description Connected component for Non-Conformance Report (NCR) with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport042ViewModel } from "./report-042ViewModel";
import Report042View from "./Report042View";

export default function ConnectedReport042() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport042ViewModel(values);
  
  return <Report042View viewModel={viewModel} />;
}

