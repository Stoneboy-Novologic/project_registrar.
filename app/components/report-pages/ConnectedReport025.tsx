/**
 * @file ConnectedReport025.tsx
 * @module report-pages
 * @description Connected component for Project Closeout Checklist with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport025ViewModel } from "./report-025ViewModel";
import Report025View from "./Report025View";

export default function ConnectedReport025() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport025ViewModel(values);
  
  return <Report025View viewModel={viewModel} />;
}

