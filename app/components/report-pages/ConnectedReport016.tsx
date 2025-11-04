/**
 * @file ConnectedReport016.tsx
 * @module report-pages
 * @description Connected component for Submittal Log with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport016ViewModel } from "./report-016ViewModel";
import Report016View from "./Report016View";

export default function ConnectedReport016() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport016ViewModel(values);
  
  return <Report016View viewModel={viewModel} />;
}

