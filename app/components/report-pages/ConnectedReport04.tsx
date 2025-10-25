"use client";

import { useEditorStore } from "@/lib/store";
import Report04View from "./Report04View";
import { buildReport04ViewModel } from "./report04ViewModel";

export default function ConnectedReport04() {
  console.log("ConnectedReport04 rendering");
  
  const values = useEditorStore((s) => s.values);
  console.log("ConnectedReport04 values:", values);
  
  const vm = buildReport04ViewModel(values);
  console.log("ConnectedReport04 view model:", vm);
  
  return <Report04View {...vm} />;
}
