/**
 * @file Report014View.tsx
 * @module report-pages
 * @description View component for Meeting Minutes
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report014ViewModel } from "./report-014ViewModel";

interface Report014ViewProps {
  viewModel: Report014ViewModel;
}

export default function Report014View({ viewModel }: Report014ViewProps) {
  return (
    <div className="report014-report">
      <div className="report-header">
        <h1 className="report-title">Meeting Minutes</h1>
        <div className="report-meta">
          <span className="category-badge project-documentation">project-documentation</span>
        </div>
      </div>
      
      <div className="report-content">
      <div className="section header-section">
        <h2 className="section-title">Header</h2>
        <div className="field-group">
          <label className="field-label">Meeting Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Meeting Time</label>
          <div className="field-value">{viewModel.header.time}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Meeting Location</label>
          <div className="field-value">{viewModel.header.location}</div>
        </div>
      </div>
      <div className="section attendees-section">
        <h2 className="section-title">Attendees</h2>
        <div className="field-group">
          <label className="field-label">Attendees</label>
          <div className="field-value multiline">{viewModel.attendees.list}</div>
        </div>
      </div>
      <div className="section agenda-section">
        <h2 className="section-title">Agenda</h2>
        <div className="field-group">
          <label className="field-label">Agenda Items</label>
          <div className="field-value multiline">{viewModel.agenda.items}</div>
        </div>
      </div>
      <div className="section decisions-section">
        <h2 className="section-title">Decisions</h2>
        <div className="field-group">
          <label className="field-label">Decisions Made</label>
          <div className="field-value multiline">{viewModel.decisions.made}</div>
        </div>
      </div>
      <div className="section action-section">
        <h2 className="section-title">Action</h2>
        <div className="field-group">
          <label className="field-label">Action Items</label>
          <div className="field-value multiline">{viewModel.action.items}</div>
        </div>
      </div>
      <div className="section next-section">
        <h2 className="section-title">Next</h2>
        <div className="field-group">
          <label className="field-label">Next Meeting</label>
          <div className="field-value">{viewModel.next.meeting}</div>
        </div>
      </div>
      <div className="section minutes-section">
        <h2 className="section-title">Minutes</h2>
        <div className="field-group">
          <label className="field-label">Minutes Recorder</label>
          <div className="field-value">{viewModel.minutes.recorder}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

