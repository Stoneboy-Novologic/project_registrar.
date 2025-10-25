/* app/components/reports/ReportCard.tsx */
"use client";

import React from "react";
import { ReportDB } from "@/lib/types";

interface ReportCardProps {
  report: ReportDB & {
    _count?: {
      pages: number;
      exports: number;
    };
    pages?: Array<{
      template: {
        pageId: string;
        title: string;
      };
    }>;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function ReportCard({ report, onEdit, onDelete }: ReportCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const pageCount = report._count?.pages || report.pages?.length || 0;
  const exportCount = report._count?.exports || 0;

  return (
    <div 
      className="rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 p-6"
      style={{
        backgroundColor: 'var(--construction-light)',
        borderColor: 'var(--construction-steel)'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 
            className="text-lg font-semibold truncate"
            style={{ color: 'var(--construction-charcoal)' }}
            title={report.name}
          >
            {report.name}
          </h3>
          {report.description && (
            <p 
              className="text-sm mt-1 line-clamp-2"
              style={{ color: 'var(--construction-steel)' }}
            >
              {report.description}
            </p>
          )}
        </div>
        
        {/* Actions Menu */}
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={onEdit}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--construction-orange)',
              color: 'var(--construction-light)'
            }}
            title="Edit Report"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={onDelete}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{
              backgroundColor: '#ef4444',
              color: 'white'
            }}
            title="Delete Report"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" style={{ color: 'var(--construction-orange)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-medium" style={{ color: 'var(--construction-steel)' }}>
            {pageCount} {pageCount === 1 ? 'page' : 'pages'}
          </span>
        </div>
        
        {exportCount > 0 && (
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" style={{ color: 'var(--construction-orange)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium" style={{ color: 'var(--construction-steel)' }}>
              {exportCount} {exportCount === 1 ? 'export' : 'exports'}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--construction-steel)' }}>
        <span>Created {formatDate(report.createdAt)}</span>
        <span>Updated {formatDate(report.updatedAt)}</span>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--construction-steel)' }}>
        <button
          onClick={onEdit}
          className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: 'var(--construction-orange)',
            color: 'var(--construction-light)'
          }}
        >
          Open in Editor
        </button>
      </div>
    </div>
  );
}
