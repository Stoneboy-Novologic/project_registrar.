/**
 * @file Report010View.tsx
 * @module report-pages
 * @description View component for Quality Control Checklist
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report010ViewModel } from "./report-010ViewModel";

interface Report010ViewProps {
  viewModel: Report010ViewModel;
}

export default function Report010View({ viewModel }: Report010ViewProps) {
  return (
    <div className="report010-report">
      <div className="report-header">
        <h1 className="report-title">Quality Control Checklist</h1>
        <div className="report-meta">
          <span className="category-badge quality-control">quality-control</span>
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
          <label className="field-label">Location</label>
          <div className="field-value">{viewModel.header.location}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Inspection Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
      </div>
      <div className="section qc-section">
        <h2 className="section-title">Qc</h2>
        <div className="field-group">
          <label className="field-label">Concrete Quality</label>
          <div className="field-value multiline">{viewModel.qc.concrete}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Reinforcement Check</label>
          <div className="field-value multiline">{viewModel.qc.reinforcement}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Dimensional Accuracy</label>
          <div className="field-value multiline">{viewModel.qc.dimensions}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Surface Finish</label>
          <div className="field-value multiline">{viewModel.qc.finish}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Test Results</label>
          <div className="field-value multiline">{viewModel.qc.testing}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Non-Conformances</label>
          <div className="field-value multiline">{viewModel.qc.nonConformances}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Corrective Actions</label>
          <div className="field-value multiline">{viewModel.qc.corrective}</div>
        </div>
        <div className="field-group">
          <label className="field-label">QC Inspector</label>
          <div className="field-value">{viewModel.qc.inspector}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

