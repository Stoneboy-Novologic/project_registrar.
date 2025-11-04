/**
 * @file ConnectedReport017.tsx
 * @module report-pages
 * @description Connected component for Punch List with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport017ViewModel } from "./report-017ViewModel";
import Report017View from "./Report017View";

export default function ConnectedReport017() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport017ViewModel(values);
  
  return <Report017View viewModel={viewModel} />;
}

