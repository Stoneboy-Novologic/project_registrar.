/**
 * @file Report024View.tsx
 * @module report-pages
 * @description View component for As-Built Documentation
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report024ViewModel } from "./report-024ViewModel";

interface Report024ViewProps {
  viewModel: Report024ViewModel;
}

export default function Report024View({ viewModel }: Report024ViewProps) {
  return (
    <div className="report024-report">
      <div className="report-header">
        <h1 className="report-title">As-Built Documentation</h1>
        <div className="report-meta">
          <span className="category-badge technical">technical</span>
        </div>
      </div>
      
      <div className="report-content">
      <div className="section header-section">
        <h2 className="section-title">Header</h2>
        <div className="field-group">
          <label className="field-label">Documentation Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Project Name</label>
          <div className="field-value">{viewModel.header.project}</div>
        </div>
      </div>
      <div className="section asbuilt-section">
        <h2 className="section-title">Asbuilt</h2>
        <div className="field-group">
          <label className="field-label">Location</label>
          <div className="field-value">{viewModel.asbuilt.location}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Work Completed</label>
          <div className="field-value multiline">{viewModel.asbuilt.work}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Actual Dimensions</label>
          <div className="field-value multiline">{viewModel.asbuilt.dimensions}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Materials Used</label>
          <div className="field-value multiline">{viewModel.asbuilt.materials}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Deviations from Plans</label>
          <div className="field-value multiline">{viewModel.asbuilt.deviations}</div>
        </div>
        <div className="field-group">
          <label className="field-label">As-Built Photos</label>
          <div className="field-value image">
            {viewModel.asbuilt.photos ? (
              <img src={viewModel.asbuilt.photos as string} alt="As-Built Photos" className="report-image" />
            ) : (
              <span className="text-gray-400">No image uploaded</span>
            )}
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Documented By</label>
          <div className="field-value">{viewModel.asbuilt.documenter}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

