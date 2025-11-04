/**
 * @file Report013View.tsx
 * @module report-pages
 * @description View component for Site Photos Documentation
 * @author BharatERP
 * @created 2025-01-27
 */

import { Report013ViewModel } from "./report-013ViewModel";

interface Report013ViewProps {
  viewModel: Report013ViewModel;
}

export default function Report013View({ viewModel }: Report013ViewProps) {
  return (
    <div className="report013-report">
      <div className="report-header">
        <h1 className="report-title">Site Photos Documentation</h1>
        <div className="report-meta">
          <span className="category-badge technical">technical</span>
        </div>
      </div>
      
      <div className="report-content">
      <div className="section header-section">
        <h2 className="section-title">Header</h2>
        <div className="field-group">
          <label className="field-label">Photo Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Site Location</label>
          <div className="field-value">{viewModel.header.location}</div>
        </div>
      </div>
      <div className="section photos-section">
        <h2 className="section-title">Photos</h2>
        <div className="field-group">
          <label className="field-label">Progress Photos</label>
          <div className="field-value image">
            {viewModel.photos.progress ? (
              <img src={viewModel.photos.progress as string} alt="Progress Photos" className="report-image" />
            ) : (
              <span className="text-gray-400">No image uploaded</span>
            )}
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Quality Photos</label>
          <div className="field-value image">
            {viewModel.photos.quality ? (
              <img src={viewModel.photos.quality as string} alt="Quality Photos" className="report-image" />
            ) : (
              <span className="text-gray-400">No image uploaded</span>
            )}
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Issue Photos</label>
          <div className="field-value image">
            {viewModel.photos.issues ? (
              <img src={viewModel.photos.issues as string} alt="Issue Photos" className="report-image" />
            ) : (
              <span className="text-gray-400">No image uploaded</span>
            )}
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Photo Descriptions</label>
          <div className="field-value multiline">{viewModel.photos.description}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Photographer</label>
          <div className="field-value">{viewModel.photos.photographer}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

