/**
 * @file ConnectedReport014.tsx
 * @module report-pages
 * @description Connected component for Meeting Minutes with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport014ViewModel } from "./report-014ViewModel";
import Report014View from "./Report014View";

export default function ConnectedReport014() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport014ViewModel(values);
  
  return <Report014View viewModel={viewModel} />;
}

