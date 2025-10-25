/* app/components/reports/CreateReportModal.tsx */
"use client";

import React, { useState } from "react";
import { logError, logInfo } from "@/lib/log";

interface CreateReportModalProps {
  onClose: () => void;
  onCreate: (name: string, description?: string) => Promise<void>;
}

export default function CreateReportModal({ onClose, onCreate }: CreateReportModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Report name is required");
      return;
    }

    try {
      setIsCreating(true);
      setError(null);
      
      await onCreate(name.trim(), description.trim() || undefined);
      
      logInfo("Report creation initiated", { name: name.trim() });
      // Modal will close automatically when onCreate succeeds
    } catch (err) {
      logError("Failed to create report", err);
      setError("Failed to create report. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--construction-charcoal)' }}>
            Create New Report
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--construction-steel)',
              color: 'var(--construction-light)'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Report Name */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--construction-charcoal)' }}
            >
              Report Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., East Brampton Watermain Project"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                borderColor: 'var(--construction-steel)',
                focusRingColor: 'var(--construction-orange)'
              }}
              disabled={isCreating}
            />
          </div>

          {/* Description */}
          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--construction-charcoal)' }}
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this report..."
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none"
              style={{
                borderColor: 'var(--construction-steel)',
                focusRingColor: 'var(--construction-orange)'
              }}
              disabled={isCreating}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg" style={{
              backgroundColor: '#fef2f2',
              borderColor: '#fecaca',
              color: '#dc2626',
              border: '1px solid'
            }}>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--construction-steel)',
                color: 'var(--construction-light)'
              }}
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || !name.trim()}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              style={{
                backgroundColor: 'var(--construction-orange)',
                color: 'var(--construction-light)'
              }}
            >
              {isCreating ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating...
                </div>
              ) : (
                'Create Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
