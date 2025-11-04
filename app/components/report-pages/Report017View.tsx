/**
 * @file Report017View.tsx
 * @module report-pages
 * @description View component for Punch List
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report017ViewModel } from "./report-017ViewModel";

interface Report017ViewProps {
  viewModel: Report017ViewModel;
}

export default function Report017View({ viewModel }: Report017ViewProps) {
  return (
    <div className="report017-report">
      <div className="report-header">
        <h1 className="report-title">Punch List</h1>
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
          <label className="field-label">Punch List Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
      </div>
      <div className="section punch-section">
        <h2 className="section-title">Punch</h2>
        <div className="field-group">
          <label className="field-label">Item 1</label>
          <div className="field-value multiline">{viewModel.punch.item1}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Item 2</label>
          <div className="field-value multiline">{viewModel.punch.item2}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Item 3</label>
          <div className="field-value multiline">{viewModel.punch.item3}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Item 4</label>
          <div className="field-value multiline">{viewModel.punch.item4}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Item 5</label>
          <div className="field-value multiline">{viewModel.punch.item5}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Responsible Party</label>
          <div className="field-value">{viewModel.punch.responsible}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Due Date</label>
          <div className="field-value">{viewModel.punch.dueDate}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

