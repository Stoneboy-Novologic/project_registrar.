/**
 * @file ConnectedReport019.tsx
 * @module report-pages
 * @description Connected component for Labor Hours Tracking with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport019ViewModel } from "./report-019ViewModel";
import Report019View from "./Report019View";

export default function ConnectedReport019() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport019ViewModel(values);
  
  return <Report019View viewModel={viewModel} />;
}

