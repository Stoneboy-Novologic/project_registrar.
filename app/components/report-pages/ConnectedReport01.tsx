"use client";

import { useEditorStore } from "@/lib/store";
import Report01View from "./Report01View";
import { buildReport01ViewModel } from "./report01ViewModel";

export default function ConnectedReport01() {
  const values = useEditorStore((s) => s.values);
  const vm = buildReport01ViewModel(values);
  return <Report01View {...vm} />;
}


