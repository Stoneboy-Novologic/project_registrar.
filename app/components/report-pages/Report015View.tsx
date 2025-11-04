/**
 * @file Report015View.tsx
 * @module report-pages
 * @description View component for RFI (Request for Information)
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report015ViewModel } from "./report-015ViewModel";

interface Report015ViewProps {
  viewModel: Report015ViewModel;
}

export default function Report015View({ viewModel }: Report015ViewProps) {
  return (
    <div className="report015-report">
      <div className="report-header">
        <h1 className="report-title">RFI (Request for Information)</h1>
        <div className="report-meta">
          <span className="category-badge technical">technical</span>
        </div>
      </div>
      
      <div className="report-content">
      <div className="section header-section">
        <h2 className="section-title">Header</h2>
        <div className="field-group">
          <label className="field-label">Project Name</label>
          <div className="field-value">{viewModel.header.project}</div>
        </div>
        <div className="field-group">
          <label className="field-label">RFI Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">RFI Number</label>
          <div className="field-value">{viewModel.header.number}</div>
        </div>
      </div>
      <div className="section rfi-section">
        <h2 className="section-title">Rfi</h2>
        <div className="field-group">
          <label className="field-label">Question/Issue</label>
          <div className="field-value multiline">{viewModel.rfi.question}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Context/Background</label>
          <div className="field-value multiline">{viewModel.rfi.context}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Project Impact</label>
          <div className="field-value multiline">{viewModel.rfi.impact}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Urgency Level</label>
          <div className="field-value">{viewModel.rfi.urgency}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Requested By</label>
          <div className="field-value">{viewModel.rfi.requestor}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Response Required By</label>
          <div className="field-value">{viewModel.rfi.response}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

