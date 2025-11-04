/**
 * @file Report023View.tsx
 * @module report-pages
 * @description View component for Inspection Request
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report023ViewModel } from "./report-023ViewModel";

interface Report023ViewProps {
  viewModel: Report023ViewModel;
}

export default function Report023View({ viewModel }: Report023ViewProps) {
  return (
    <div className="report023-report">
      <div className="report-header">
        <h1 className="report-title">Inspection Request</h1>
        <div className="report-meta">
          <span className="category-badge quality-control">quality-control</span>
        </div>
      </div>
      
      <div className="report-content">
      <div className="section header-section">
        <h2 className="section-title">Header</h2>
        <div className="field-group">
          <label className="field-label">Request Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Project Name</label>
          <div className="field-value">{viewModel.header.project}</div>
        </div>
      </div>
      <div className="section inspection-section">
        <h2 className="section-title">Inspection</h2>
        <div className="field-group">
          <label className="field-label">Inspection Type</label>
          <div className="field-value">{viewModel.inspection.type}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Inspection Location</label>
          <div className="field-value">{viewModel.inspection.location}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Scheduled Date</label>
          <div className="field-value">{viewModel.inspection.scheduled}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Scheduled Time</label>
          <div className="field-value">{viewModel.inspection.time}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Inspector</label>
          <div className="field-value">{viewModel.inspection.inspector}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Work to be Inspected</label>
          <div className="field-value multiline">{viewModel.inspection.work}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Requested By</label>
          <div className="field-value">{viewModel.inspection.requestor}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

