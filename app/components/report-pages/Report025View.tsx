/**
 * @file Report025View.tsx
 * @module report-pages
 * @description View component for Project Closeout Checklist
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report025ViewModel } from "./report-025ViewModel";

interface Report025ViewProps {
  viewModel: Report025ViewModel;
}

export default function Report025View({ viewModel }: Report025ViewProps) {
  return (
    <div className="report025-report">
      <div className="report-header">
        <h1 className="report-title">Project Closeout Checklist</h1>
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
        <div className="field-group">
          <label className="field-label">Completion Date</label>
          <div className="field-value">{viewModel.header.completion}</div>
        </div>
      </div>
      <div className="section closeout-section">
        <h2 className="section-title">Closeout</h2>
        <div className="field-group">
          <label className="field-label">Punch List Complete</label>
          <div className="field-value">{viewModel.closeout.punchList}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Testing Complete</label>
          <div className="field-value">{viewModel.closeout.testing}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Documentation Complete</label>
          <div className="field-value">{viewModel.closeout.documentation}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Warranties Submitted</label>
          <div className="field-value">{viewModel.closeout.warranties}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Permits Closed</label>
          <div className="field-value">{viewModel.closeout.permits}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Site Cleanup</label>
          <div className="field-value">{viewModel.closeout.cleanup}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Final Inspection</label>
          <div className="field-value">{viewModel.closeout.finalInspection}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Client Acceptance</label>
          <div className="field-value">{viewModel.closeout.clientAcceptance}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Closeout Notes</label>
          <div className="field-value multiline">{viewModel.closeout.notes}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

