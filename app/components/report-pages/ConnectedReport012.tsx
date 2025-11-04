/**
 * @file ConnectedReport012.tsx
 * @module report-pages
 * @description Connected component for Change Order Request with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport012ViewModel } from "./report-012ViewModel";
import Report012View from "./Report012View";

export default function ConnectedReport012() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport012ViewModel(values);
  
  return <Report012View viewModel={viewModel} />;
}

