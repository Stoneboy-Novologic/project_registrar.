"use client";

import { useEditorStore } from "@/lib/store";
import Report03View from "./Report03View";
import { buildReport03ViewModel } from "./report03ViewModel";

export default function ConnectedReport03() {
  console.log("ConnectedReport03 rendering");
  
  const values = useEditorStore((s) => s.values);
  console.log("ConnectedReport03 values:", values);
  
  const vm = buildReport03ViewModel(values);
  console.log("ConnectedReport03 view model:", vm);
  
  return <Report03View {...vm} />;
}
