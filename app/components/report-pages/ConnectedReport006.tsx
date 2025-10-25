/* app/components/report-pages/ConnectedReport006.tsx */
"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport006ViewModel } from "./report-006ViewModel";
import Report006View from "./Report006View";

export default function ConnectedReport006() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport006ViewModel(values);
  
  return <Report006View viewModel={viewModel} />;
}
