/**
 * @file ConnectedReport023.tsx
 * @module report-pages
 * @description Connected component for Inspection Request with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport023ViewModel } from "./report-023ViewModel";
import Report023View from "./Report023View";

export default function ConnectedReport023() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport023ViewModel(values);
  
  return <Report023View viewModel={viewModel} />;
}

