/**
 * @file Report021View.tsx
 * @module report-pages
 * @description View component for Environmental Compliance
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report021ViewModel } from "./report-021ViewModel";

interface Report021ViewProps {
  viewModel: Report021ViewModel;
}

export default function Report021View({ viewModel }: Report021ViewProps) {
  return (
    <div className="report021-report">
      <div className="report-header">
        <h1 className="report-title">Environmental Compliance</h1>
        <div className="report-meta">
          <span className="category-badge technical">technical</span>
        </div>
      </div>
      
      <div className="report-content">
      <div className="section header-section">
        <h2 className="section-title">Header</h2>
        <div className="field-group">
          <label className="field-label">Report Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Project Name</label>
          <div className="field-value">{viewModel.header.project}</div>
        </div>
      </div>
      <div className="section env-section">
        <h2 className="section-title">Env</h2>
        <div className="field-group">
          <label className="field-label">Noise Levels</label>
          <div className="field-value">{viewModel.env.noise}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Dust Control</label>
          <div className="field-value multiline">{viewModel.env.dust}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Water Management</label>
          <div className="field-value multiline">{viewModel.env.water}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Waste Management</label>
          <div className="field-value multiline">{viewModel.env.waste}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Wildlife Impact</label>
          <div className="field-value multiline">{viewModel.env.wildlife}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Compliance Status</label>
          <div className="field-value">{viewModel.env.compliance}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

