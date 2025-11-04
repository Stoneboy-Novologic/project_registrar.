/**
 * @file Report018View.tsx
 * @module report-pages
 * @description View component for Weather Report
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report018ViewModel } from "./report-018ViewModel";

interface Report018ViewProps {
  viewModel: Report018ViewModel;
}

export default function Report018View({ viewModel }: Report018ViewProps) {
  return (
    <div className="report018-report">
      <div className="report-header">
        <h1 className="report-title">Weather Report</h1>
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
      <div className="section weather-section">
        <h2 className="section-title">Weather</h2>
        <div className="field-group">
          <label className="field-label">Temperature</label>
          <div className="field-value">{viewModel.weather.temperature}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Weather Conditions</label>
          <div className="field-value">{viewModel.weather.conditions}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Wind Speed</label>
          <div className="field-value">{viewModel.weather.wind}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Precipitation</label>
          <div className="field-value">{viewModel.weather.precipitation}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Visibility</label>
          <div className="field-value">{viewModel.weather.visibility}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Work Impact</label>
          <div className="field-value multiline">{viewModel.weather.impact}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

