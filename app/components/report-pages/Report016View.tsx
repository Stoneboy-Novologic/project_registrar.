/**
 * @file Report016View.tsx
 * @module report-pages
 * @description View component for Submittal Log
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report016ViewModel } from "./report-016ViewModel";

interface Report016ViewProps {
  viewModel: Report016ViewModel;
}

export default function Report016View({ viewModel }: Report016ViewProps) {
  return (
    <div className="report016-report">
      <div className="report-header">
        <h1 className="report-title">Submittal Log</h1>
        <div className="report-meta">
          <span className="category-badge project-documentation">project-documentation</span>
        </div>
      </div>
      
      <div className="report-content">
      <div className="section header-section">
        <h2 className="section-title">Header</h2>
        <div className="field-group">
          <label className="field-label">Project Name</label>
          <div className="field-value">{viewModel.header.project}</div>
        </div>
      </div>
      <div className="section submittal-section">
        <h2 className="section-title">Submittal</h2>
        <div className="field-group">
          <label className="field-label">Submittal Number</label>
          <div className="field-value">{viewModel.submittal.number}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Submittal Date</label>
          <div className="field-value">{viewModel.submittal.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Submittal Type</label>
          <div className="field-value">{viewModel.submittal.type}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Description</label>
          <div className="field-value multiline">{viewModel.submittal.description}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Status</label>
          <div className="field-value">{viewModel.submittal.status}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Response Date</label>
          <div className="field-value">{viewModel.submittal.response}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Approved By</label>
          <div className="field-value">{viewModel.submittal.approved}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

