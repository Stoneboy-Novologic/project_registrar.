/**
 * @file ConnectedReport049.tsx
 * @module report-pages
 * @description Connected component for Warranty Documentation with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport049ViewModel } from "./report-049ViewModel";
import Report049View from "./Report049View";

export default function ConnectedReport049() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport049ViewModel(values);
  
  return <Report049View viewModel={viewModel} />;
}

