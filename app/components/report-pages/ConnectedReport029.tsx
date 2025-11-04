/**
 * @file ConnectedReport029.tsx
 * @module report-pages
 * @description Connected component for Project Milestone Report with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport029ViewModel } from "./report-029ViewModel";
import Report029View from "./Report029View";

export default function ConnectedReport029() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport029ViewModel(values);
  
  return <Report029View viewModel={viewModel} />;
}

