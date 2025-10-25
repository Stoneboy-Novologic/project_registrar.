/* app/components/report-pages/ConnectedReport011.tsx */
"use client";
import { useEditorStore } from "@/lib/store";
import { buildReport011ViewModel } from "./report-011ViewModel";
import Report011View from "./Report011View";

export default function ConnectedReport011() {
  const values = useEditorStore((s) => s.values);
  const viewModel = buildReport011ViewModel(values);
  
  return <Report011View viewModel={viewModel} />;
}
