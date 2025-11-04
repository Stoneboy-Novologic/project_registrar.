/**
 * @file PageNavigation.tsx
 * @module editor
 * @description Navigation controls for switching between report pages
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";

import React, { useEffect, useCallback } from "react";
import { useEditorStore } from "@/lib/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { logInfo } from "@/lib/log";

export default function PageNavigation() {
  const reportPages = useEditorStore((s) => s.reportPages);
  const currentPageId = useEditorStore((s) => s.currentPageId);
  const switchToPage = useEditorStore((s) => s.switchToPage);

  // Sort pages by order
  const sortedPages = [...reportPages].sort((a, b) => a.pageOrder - b.pageOrder);
  
  // Find current page index
  const currentIndex = sortedPages.findIndex(p => p.id === currentPageId);
  const currentPage = currentIndex >= 0 ? sortedPages[currentIndex] : null;
  const currentPageNumber = currentIndex + 1;
  const totalPages = sortedPages.length;

  // Navigation handlers
  const handlePrevious = useCallback(async () => {
    if (currentIndex > 0) {
      const previousPage = sortedPages[currentIndex - 1];
      logInfo("Navigating to previous page", { 
        fromPage: currentPageNumber, 
        toPage: currentIndex,
        pageId: previousPage.id 
      });
      await switchToPage(previousPage.id);
    }
  }, [currentIndex, sortedPages, currentPageNumber, switchToPage]);

  const handleNext = useCallback(async () => {
    if (currentIndex < sortedPages.length - 1) {
      const nextPage = sortedPages[currentIndex + 1];
      logInfo("Navigating to next page", { 
        fromPage: currentPageNumber, 
        toPage: currentIndex + 2,
        pageId: nextPage.id 
      });
      await switchToPage(nextPage.id);
    }
  }, [currentIndex, sortedPages, currentPageNumber, switchToPage]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight' && currentIndex < sortedPages.length - 1) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, sortedPages.length, handlePrevious, handleNext]);

  if (totalPages === 0) {
    return null;
  }

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < sortedPages.length - 1;
  const pageTemplate = currentPage?.template as any;

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg border" style={{
      backgroundColor: 'var(--construction-concrete)',
      borderColor: 'var(--construction-steel)'
    }}>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className={`flex items-center justify-center w-8 h-8 rounded transition-all ${
          canGoPrevious 
            ? 'hover:bg-white/20 cursor-pointer' 
            : 'opacity-50 cursor-not-allowed'
        }`}
        style={{
          color: canGoPrevious ? 'white' : 'rgba(255, 255, 255, 0.5)'
        }}
        title={canGoPrevious ? "Previous page (←)" : "First page"}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Info */}
      <div className="flex items-center gap-2 min-w-[120px] justify-center">
        <span className="text-sm font-semibold" style={{ color: 'white' }}>
          Page {currentPageNumber} of {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className={`flex items-center justify-center w-8 h-8 rounded transition-all ${
          canGoNext 
            ? 'hover:bg-white/20 cursor-pointer' 
            : 'opacity-50 cursor-not-allowed'
        }`}
        style={{
          color: canGoNext ? 'white' : 'rgba(255, 255, 255, 0.5)'
        }}
        title={canGoNext ? "Next page (→)" : "Last page"}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Page Title */}
      {pageTemplate && (
        <div className="ml-4 pl-4 border-l" style={{ borderColor: 'var(--construction-steel)' }}>
          <div className="text-xs font-medium truncate max-w-[200px]" style={{ color: 'white' }}>
            {pageTemplate.title || `Page ${currentPageNumber}`}
          </div>
        </div>
      )}
    </div>
  );
}

