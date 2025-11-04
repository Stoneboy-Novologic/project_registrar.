/**
 * @file Report009View.tsx
 * @module report-pages
 * @description View component for Equipment Usage Report
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report009ViewModel } from "./report-009ViewModel";

interface Report009ViewProps {
  viewModel: Report009ViewModel;
}

export default function Report009View({ viewModel }: Report009ViewProps) {
  return (
    <div className="report009-report">
      <div className="report-header">
        <h1 className="report-title">Equipment Usage Report</h1>
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
      </div>
      <div className="section equipment-section">
        <h2 className="section-title">Equipment</h2>
        <div className="field-group">
          <label className="field-label">Excavator Hours</label>
          <div className="field-value">{viewModel.equipment.excavator}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Crane Hours</label>
          <div className="field-value">{viewModel.equipment.crane}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Compactor Hours</label>
          <div className="field-value">{viewModel.equipment.compactor}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Generator Hours</label>
          <div className="field-value">{viewModel.equipment.generator}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Maintenance Performed</label>
          <div className="field-value multiline">{viewModel.equipment.maintenance}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Equipment Issues</label>
          <div className="field-value multiline">{viewModel.equipment.issues}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Fuel Consumption</label>
          <div className="field-value">{viewModel.equipment.fuel}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Primary Operator</label>
          <div className="field-value">{viewModel.equipment.operator}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

