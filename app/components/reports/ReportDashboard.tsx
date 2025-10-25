/* app/components/reports/ReportDashboard.tsx */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchReports, createReport, deleteReport } from "@/lib/api/reports";
import { ReportDB } from "@/lib/types";
import { logError, logInfo } from "@/lib/log";
import CreateReportModal from "./CreateReportModal";
import ReportCard from "./ReportCard";

export default function ReportDashboard() {
  const router = useRouter();
  const [reports, setReports] = useState<ReportDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load reports on component mount
  useEffect(() => {
    loadReports();
  }, [currentPage, searchTerm]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchReports({
        page: currentPage,
        limit: 12,
        search: searchTerm || undefined
      });
      
      setReports(response.reports);
      setTotalPages(response.pagination.pages);
      
      logInfo("Reports loaded", { 
        count: response.reports.length, 
        total: response.pagination.total,
        page: currentPage 
      });
    } catch (err) {
      logError("Failed to load reports", err);
      setError("Failed to load reports. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateReport = async (name: string, description?: string) => {
    try {
      const newReport = await createReport({ name, description });
      logInfo("Report created", { id: newReport.id, name: newReport.name });
      
      // Navigate to editor
      router.push(`/reports/${newReport.id}/edit`);
    } catch (err) {
      logError("Failed to create report", err);
      throw err;
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteReport(reportId);
      logInfo("Report deleted", { reportId });
      
      // Reload reports
      await loadReports();
    } catch (err) {
      logError("Failed to delete report", err);
      alert("Failed to delete report. Please try again.");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadReports();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--construction-concrete)' }}>
      {/* Header */}
      <div className="border-b" style={{ 
        backgroundColor: 'var(--construction-charcoal)',
        borderColor: 'var(--construction-steel)'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--construction-light)' }}>
                Report Dashboard
              </h1>
              <p className="mt-2 text-lg" style={{ color: 'var(--construction-steel)' }}>
                Manage your construction project reports
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="construction-btn-primary inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Report
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: 'var(--construction-light)',
                  borderColor: 'var(--construction-steel)',
                  color: 'var(--construction-charcoal)'
                }}
              />
            </div>
            <button
              type="submit"
              className="construction-btn-secondary px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 rounded-lg border" style={{
            backgroundColor: '#fef2f2',
            borderColor: '#fecaca',
            color: '#dc2626'
          }}>
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4" style={{
                borderColor: 'var(--construction-steel)',
                borderTopColor: 'var(--construction-orange)'
              }}></div>
              <p style={{ color: 'var(--construction-steel)' }}>Loading reports...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Reports Grid */}
            {reports.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
                  backgroundColor: 'var(--construction-steel)',
                  color: 'var(--construction-light)'
                }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--construction-charcoal)' }}>
                  No reports found
                </h3>
                <p className="mb-6" style={{ color: 'var(--construction-steel)' }}>
                  {searchTerm ? 'Try adjusting your search terms.' : 'Create your first report to get started.'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="construction-btn-primary inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Your First Report
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onEdit={() => router.push(`/reports/${report.id}/edit`)}
                    onDelete={() => handleDeleteReport(report.id)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  style={{
                    backgroundColor: currentPage === 1 ? 'var(--construction-steel)' : 'var(--construction-orange)',
                    color: 'var(--construction-light)'
                  }}
                >
                  Previous
                </button>
                
                <span className="px-4 py-2 text-sm" style={{ color: 'var(--construction-steel)' }}>
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  style={{
                    backgroundColor: currentPage === totalPages ? 'var(--construction-steel)' : 'var(--construction-orange)',
                    color: 'var(--construction-light)'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <CreateReportModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateReport}
        />
      )}
    </div>
  );
}
