/**
 * @file Report007View.tsx
 * @module report-pages
 * @description View component for Daily Progress Report
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report007ViewModel } from "./report-007ViewModel";

interface Report007ViewProps {
  viewModel: Report007ViewModel;
}

export default function Report007View({ viewModel }: Report007ViewProps) {
  return (
    <div className="report007-report">
      <div className="report-header">
        <h1 className="report-title">Daily Progress Report</h1>
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
      <div className="section progress-section">
        <h2 className="section-title">Progress</h2>
        <div className="field-group">
          <label className="field-label">Weather Conditions</label>
          <div className="field-value">{viewModel.progress.weather}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Work Completed</label>
          <div className="field-value multiline">{viewModel.progress.workCompleted}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Work Planned</label>
          <div className="field-value multiline">{viewModel.progress.workPlanned}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Issues/Concerns</label>
          <div className="field-value multiline">{viewModel.progress.issues}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Materials Used</label>
          <div className="field-value multiline">{viewModel.progress.materials}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Labor Hours</label>
          <div className="field-value">{viewModel.progress.labor}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

