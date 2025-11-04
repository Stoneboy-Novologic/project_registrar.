/**
 * @file ConnectedReport031.tsx
 * @module report-pages
 * @description Connected component for Safety Training Record with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport031ViewModel } from "./report-031ViewModel";
import Report031View from "./Report031View";

export default function ConnectedReport031() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport031ViewModel(values);
  
  return <Report031View viewModel={viewModel} />;
}

