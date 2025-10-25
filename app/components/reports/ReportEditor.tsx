/* app/components/reports/ReportEditor.tsx */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/lib/store";
import { fetchReport } from "@/lib/api/reports";
import { ReportDB } from "@/lib/types";
import { logError, logInfo } from "@/lib/log";
import EditorShell from "@/app/components/editor/EditorShell";

interface ReportEditorProps {
  reportId: string;
}

export default function ReportEditor({ reportId }: ReportEditorProps) {
  const router = useRouter();
  const { loadReport, isLoading, currentReport } = useEditorStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReportData = async () => {
      try {
        setError(null);
        logInfo("Loading report for editor", { reportId });
        
        await loadReport(reportId);
        
        logInfo("Report loaded in editor", { 
          reportId, 
          name: currentReport?.name,
          pageCount: currentReport?.pages?.length || 0
        });
      } catch (err) {
        logError("Failed to load report in editor", err);
        setError("Failed to load report. It may have been deleted or you may not have permission to access it.");
      }
    };

    loadReportData();
  }, [reportId, loadReport]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--construction-concrete)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4" style={{
            borderColor: 'var(--construction-steel)',
            borderTopColor: 'var(--construction-orange)'
          }}></div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--construction-charcoal)' }}>
            Loading Report
          </h2>
          <p style={{ color: 'var(--construction-steel)' }}>
            Please wait while we load your report...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--construction-concrete)' }}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626'
          }}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--construction-charcoal)' }}>
            Report Not Found
          </h2>
          <p className="mb-6" style={{ color: 'var(--construction-steel)' }}>
            {error}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/reports')}
              className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--construction-orange)',
                color: 'var(--construction-light)'
              }}
            >
              Back to Reports
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--construction-steel)',
                color: 'var(--construction-light)'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show editor
  return <EditorShell />;
}
