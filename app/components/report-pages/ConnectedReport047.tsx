/**
 * @file ConnectedReport047.tsx
 * @module report-pages
 * @description Connected component for Drawing Revision Log with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport047ViewModel } from "./report-047ViewModel";
import Report047View from "./Report047View";

export default function ConnectedReport047() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport047ViewModel(values);
  
  return <Report047View viewModel={viewModel} />;
}

