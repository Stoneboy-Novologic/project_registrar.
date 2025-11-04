/**
 * @file Report019View.tsx
 * @module report-pages
 * @description View component for Labor Hours Tracking
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report019ViewModel } from "./report-019ViewModel";

interface Report019ViewProps {
  viewModel: Report019ViewModel;
}

export default function Report019View({ viewModel }: Report019ViewProps) {
  return (
    <div className="report019-report">
      <div className="report-header">
        <h1 className="report-title">Labor Hours Tracking</h1>
        <div className="report-meta">
          <span className="category-badge project-documentation">project-documentation</span>
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
      <div className="section labor-section">
        <h2 className="section-title">Labor</h2>
        <div className="field-group">
          <label className="field-label">Carpenters</label>
          <div className="field-value">{viewModel.labor.carpenters}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Electricians</label>
          <div className="field-value">{viewModel.labor.electricians}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Plumbers</label>
          <div className="field-value">{viewModel.labor.plumbers}</div>
        </div>
        <div className="field-group">
          <label className="field-label">General Laborers</label>
          <div className="field-value">{viewModel.labor.laborers}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Total Hours</label>
          <div className="field-value">{viewModel.labor.total}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Overtime Hours</label>
          <div className="field-value">{viewModel.labor.overtime}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Notes</label>
          <div className="field-value multiline">{viewModel.labor.notes}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

