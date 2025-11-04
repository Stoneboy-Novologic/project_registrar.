/**
 * @file Report022View.tsx
 * @module report-pages
 * @description View component for Subcontractor Performance
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report022ViewModel } from "./report-022ViewModel";

interface Report022ViewProps {
  viewModel: Report022ViewModel;
}

export default function Report022View({ viewModel }: Report022ViewProps) {
  return (
    <div className="report022-report">
      <div className="report-header">
        <h1 className="report-title">Subcontractor Performance</h1>
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
          <label className="field-label">Subcontractor</label>
          <div className="field-value">{viewModel.header.subcontractor}</div>
        </div>
      </div>
      <div className="section perf-section">
        <h2 className="section-title">Perf</h2>
        <div className="field-group">
          <label className="field-label">Work Quality</label>
          <div className="field-value">{viewModel.perf.workQuality}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Schedule Adherence</label>
          <div className="field-value">{viewModel.perf.schedule}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Safety Performance</label>
          <div className="field-value">{viewModel.perf.safety}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Communication</label>
          <div className="field-value">{viewModel.perf.communication}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Issues/Concerns</label>
          <div className="field-value multiline">{viewModel.perf.issues}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Recommendations</label>
          <div className="field-value multiline">{viewModel.perf.recommendations}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

