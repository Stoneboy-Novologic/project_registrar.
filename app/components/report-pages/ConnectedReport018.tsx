/**
 * @file ConnectedReport018.tsx
 * @module report-pages
 * @description Connected component for Weather Report with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport018ViewModel } from "./report-018ViewModel";
import Report018View from "./Report018View";

export default function ConnectedReport018() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport018ViewModel(values);
  
  return <Report018View viewModel={viewModel} />;
}

