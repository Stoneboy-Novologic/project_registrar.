/**
 * @file Report020View.tsx
 * @module report-pages
 * @description View component for Incident Report
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report020ViewModel } from "./report-020ViewModel";

interface Report020ViewProps {
  viewModel: Report020ViewModel;
}

export default function Report020View({ viewModel }: Report020ViewProps) {
  return (
    <div className="report020-report">
      <div className="report-header">
        <h1 className="report-title">Incident Report</h1>
        <div className="report-meta">
          <span className="category-badge safety">safety</span>
        </div>
      </div>
      
      <div className="report-content">
      <div className="section header-section">
        <h2 className="section-title">Header</h2>
        <div className="field-group">
          <label className="field-label">Incident Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Incident Time</label>
          <div className="field-value">{viewModel.header.time}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Incident Location</label>
          <div className="field-value">{viewModel.header.location}</div>
        </div>
      </div>
      <div className="section incident-section">
        <h2 className="section-title">Incident</h2>
        <div className="field-group">
          <label className="field-label">Incident Type</label>
          <div className="field-value">{viewModel.incident.type}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Incident Description</label>
          <div className="field-value multiline">{viewModel.incident.description}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Root Cause</label>
          <div className="field-value multiline">{viewModel.incident.cause}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Injuries</label>
          <div className="field-value multiline">{viewModel.incident.injuries}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Corrective Action</label>
          <div className="field-value multiline">{viewModel.incident.action}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Reported By</label>
          <div className="field-value">{viewModel.incident.reporter}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

