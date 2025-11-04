/**
 * @file Report012View.tsx
 * @module report-pages
 * @description View component for Change Order Request
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report012ViewModel } from "./report-012ViewModel";

interface Report012ViewProps {
  viewModel: Report012ViewModel;
}

export default function Report012View({ viewModel }: Report012ViewProps) {
  return (
    <div className="report012-report">
      <div className="report-header">
        <h1 className="report-title">Change Order Request</h1>
        <div className="report-meta">
          <span className="category-badge financial">financial</span>
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
          <label className="field-label">Request Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Change Order #</label>
          <div className="field-value">{viewModel.header.number}</div>
        </div>
      </div>
      <div className="section change-section">
        <h2 className="section-title">Change</h2>
        <div className="field-group">
          <label className="field-label">Change Description</label>
          <div className="field-value multiline">{viewModel.change.description}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Reason for Change</label>
          <div className="field-value multiline">{viewModel.change.reason}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Schedule Impact</label>
          <div className="field-value multiline">{viewModel.change.impact}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Cost Impact</label>
          <div className="field-value">{viewModel.change.cost}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Approval Required</label>
          <div className="field-value">{viewModel.change.approval}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Requested By</label>
          <div className="field-value">{viewModel.change.requestor}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

