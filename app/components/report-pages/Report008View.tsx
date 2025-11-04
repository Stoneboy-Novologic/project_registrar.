/**
 * @file Report008View.tsx
 * @module report-pages
 * @description View component for Material Delivery Log
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report008ViewModel } from "./report-008ViewModel";

interface Report008ViewProps {
  viewModel: Report008ViewModel;
}

export default function Report008View({ viewModel }: Report008ViewProps) {
  return (
    <div className="report008-report">
      <div className="report-header">
        <h1 className="report-title">Material Delivery Log</h1>
        <div className="report-meta">
          <span className="category-badge project-documentation">project-documentation</span>
        </div>
      </div>
      
      <div className="report-content">
      <div className="section header-section">
        <h2 className="section-title">Header</h2>
        <div className="field-group">
          <label className="field-label">Delivery Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Supplier</label>
          <div className="field-value">{viewModel.header.supplier}</div>
        </div>
      </div>
      <div className="section material-section">
        <h2 className="section-title">Material</h2>
        <div className="field-group">
          <label className="field-label">Material Type</label>
          <div className="field-value">{viewModel.material.type}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Quantity</label>
          <div className="field-value">{viewModel.material.quantity}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Specifications</label>
          <div className="field-value multiline">{viewModel.material.specifications}</div>
        </div>
      </div>
      <div className="section delivery-section">
        <h2 className="section-title">Delivery</h2>
        <div className="field-group">
          <label className="field-label">Delivery Location</label>
          <div className="field-value">{viewModel.delivery.location}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Delivery Time</label>
          <div className="field-value">{viewModel.delivery.time}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Driver Name</label>
          <div className="field-value">{viewModel.delivery.driver}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Vehicle ID</label>
          <div className="field-value">{viewModel.delivery.vehicle}</div>
        </div>
      </div>
      <div className="section quality-section">
        <h2 className="section-title">Quality</h2>
        <div className="field-group">
          <label className="field-label">Quality Inspection</label>
          <div className="field-value multiline">{viewModel.quality.inspection}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

