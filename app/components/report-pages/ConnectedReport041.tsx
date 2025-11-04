/**
 * @file ConnectedReport041.tsx
 * @module report-pages
 * @description Connected component for Material Testing Report with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport041ViewModel } from "./report-041ViewModel";
import Report041View from "./Report041View";

export default function ConnectedReport041() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport041ViewModel(values);
  
  return <Report041View viewModel={viewModel} />;
}

