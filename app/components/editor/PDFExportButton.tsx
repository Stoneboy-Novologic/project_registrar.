/**
 * @file PDFExportButton.tsx
 * @module editor
 * @description PDF export button component with options modal for exporting reports
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";

import { useState } from "react";
import { useEditorStore } from "@/lib/store";
import { FileText, X, Loader2 } from "lucide-react";

export default function PDFExportButton() {
  const currentReportId = useEditorStore((s) => s.currentReportId);
  const reportPages = useEditorStore((s) => s.reportPages);
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeWatermark: false,
    includeBranding: true,
    selectedPages: [] as string[] // Empty array means all pages
  });

  const handleExport = async () => {
    if (!currentReportId) {
      alert("No report loaded. Please load a report first.");
      return;
    }

    setIsExporting(true);
    
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (exportOptions.includeWatermark) {
        params.append('includeWatermark', 'true');
      }
      if (!exportOptions.includeBranding) {
        params.append('includeBranding', 'false');
      }
      if (exportOptions.selectedPages.length > 0) {
        params.append('pages', exportOptions.selectedPages.join(','));
      }

      // Call PDF export API
      const response = await fetch(
        `/api/reports/${currentReportId}/export/pdf?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/pdf'
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to export PDF');
      }

      // Get PDF blob
      const blob = await response.blob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${currentReportId}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Close modal
      setIsOpen(false);
      
      // Show success message
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('PDF export error:', error);
      alert(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const togglePageSelection = (pageId: string) => {
    setExportOptions(prev => {
      const index = prev.selectedPages.indexOf(pageId);
      if (index > -1) {
        // Remove page
        return {
          ...prev,
          selectedPages: prev.selectedPages.filter(id => id !== pageId)
        };
      } else {
        // Add page
        return {
          ...prev,
          selectedPages: [...prev.selectedPages, pageId]
        };
      }
    });
  };

  const selectAllPages = () => {
    setExportOptions(prev => ({
      ...prev,
      selectedPages: []
    }));
  };

  const sortedPages = [...reportPages].sort((a, b) => a.pageOrder - b.pageOrder);
  const allPagesSelected = exportOptions.selectedPages.length === 0;

  return (
    <>
      <button
        className="construction-btn-primary inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md"
        onClick={() => setIsOpen(true)}
        disabled={!currentReportId || reportPages.length === 0}
        title="Export to PDF"
      >
        <FileText className="w-4 h-4 mr-2" />
        Export PDF
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => !isExporting && setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              backgroundColor: 'var(--construction-charcoal)', 
              borderColor: 'var(--construction-orange)', 
              borderWidth: '2px' 
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--construction-light)' }}>
                Export to PDF
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                disabled={isExporting}
                className="p-1 rounded hover:bg-gray-700 transition-colors"
                style={{ color: 'var(--construction-steel)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-6">
              {/* Page Selection */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--construction-light)' }}>
                  Pages to Export ({sortedPages.length} total)
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto p-2 rounded border" style={{ 
                  backgroundColor: 'var(--construction-concrete)', 
                  borderColor: 'var(--construction-steel)' 
                }}>
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={allPagesSelected}
                      onChange={selectAllPages}
                      disabled={isExporting}
                      className="rounded"
                    />
                    <span className="text-sm" style={{ color: 'var(--construction-light)' }}>
                      All Pages ({sortedPages.length})
                    </span>
                  </label>
                  {sortedPages.map(page => {
                    const pageTemplate = page.template as any;
                    const isSelected = allPagesSelected || exportOptions.selectedPages.includes(page.id);
                    return (
                      <label
                        key={page.id}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-700 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => togglePageSelection(page.id)}
                          disabled={isExporting || allPagesSelected}
                          className="rounded"
                        />
                        <span className="text-sm flex-1" style={{ color: 'var(--construction-light)' }}>
                          Page {page.pageOrder}: {pageTemplate?.title || `Page ${page.pageOrder}`}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Watermark Option */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exportOptions.includeWatermark}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeWatermark: e.target.checked }))}
                  disabled={isExporting}
                  className="rounded"
                />
                <span className="text-sm" style={{ color: 'var(--construction-light)' }}>
                  Include Watermark (CONFIDENTIAL)
                </span>
              </label>

              {/* Branding Option */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exportOptions.includeBranding}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, includeBranding: e.target.checked }))}
                  disabled={isExporting}
                  className="rounded"
                />
                <span className="text-sm" style={{ color: 'var(--construction-light)' }}>
                  Include Branding (Company Name, Logo, Footer)
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isExporting}
                className="px-4 py-2 rounded-lg border transition-colors"
                style={{ 
                  backgroundColor: 'var(--construction-concrete)', 
                  borderColor: 'var(--construction-steel)', 
                  color: 'var(--construction-light)' 
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting || (!allPagesSelected && exportOptions.selectedPages.length === 0)}
                className="px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
                style={{ 
                  backgroundColor: isExporting ? 'var(--construction-steel)' : 'var(--construction-orange)', 
                  color: 'white' 
                }}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Export PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

