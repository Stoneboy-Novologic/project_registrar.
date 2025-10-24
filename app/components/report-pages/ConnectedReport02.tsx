/* app/components/report-pages/ConnectedReport02.tsx */
"use client";

import { useEditorStore } from "@/lib/store";
import Report02View from "./Report02View";
import { buildReport02ViewModel } from "./report02ViewModel";

export default function ConnectedReport02() {
  const values = useEditorStore((s) => s.values);
  const props = buildReport02ViewModel(values);
  return <Report02View {...props} />;
}
