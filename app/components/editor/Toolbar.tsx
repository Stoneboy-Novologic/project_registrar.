/* app/components/editor/Toolbar.tsx */
"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/lib/store";
import { exportValues, importValues } from "@/lib/persistence";
import Tooltip from "./Tooltip";
import PDFExportButton from "./PDFExportButton";

export default function Toolbar() {
  // Select individual slices to avoid returning a new object each render,
  // which can trigger React's useSyncExternalStore warning/loop.
  const values = useEditorStore((s) => s.values);
  const replaceValues = useEditorStore((s) => s.replaceValues);
  const resetValues = useEditorStore((s) => s.resetValues);
  const resetToPlaceholders = useEditorStore((s) => s.resetToPlaceholders);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'e':
            e.preventDefault();
            handleExport();
            break;
          case 'i':
            e.preventDefault();
            document.getElementById('import-file')?.click();
            break;
          case 'r':
            e.preventDefault();
            resetToPlaceholders();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExport = () => {
    const data = exportValues(values);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-report.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-3">
      {/* PDF Export Button */}
      <PDFExportButton />
      
      {/* JSON Export Button */}
      <button
        className="construction-btn-secondary inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm"
        onClick={() => {
          const data = exportValues(values);
          const blob = new Blob([data], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "project-report.json";
          a.click();
          URL.revokeObjectURL(url);
        }}
        title="Export to JSON (Ctrl+E)"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export JSON
      </button>
      <label className="construction-btn-secondary inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm cursor-pointer">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        Import
        <input
          type="file"
          accept="application/json"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const text = await file.text();
            const parsed = importValues(text);
            if (parsed) replaceValues(parsed);
          }}
          className="hidden"
        />
      </label>
      <button
        className="construction-btn-secondary inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm"
        onClick={() => resetToPlaceholders()}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset to Placeholders
      </button>
    </div>
  );
}


