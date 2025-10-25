"use client";

import { useEditorStore } from "@/lib/store";
import Report05View from "./Report05View";
import { buildReport05ViewModel } from "./report05ViewModel";

export default function ConnectedReport05() {
  console.log("ConnectedReport05 rendering");
  
  const values = useEditorStore((s) => s.values);
  console.log("ConnectedReport05 values:", values);
  
  const vm = buildReport05ViewModel(values);
  console.log("ConnectedReport05 view model:", vm);
  
  return <Report05View {...vm} />;
}
