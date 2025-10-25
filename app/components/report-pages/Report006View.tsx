/* app/components/report-pages/Report006View.tsx */
import { Report006ViewModel } from "./report-006ViewModel";

interface Report006ViewProps {
  viewModel: Report006ViewModel;
}

export default function Report006View({ viewModel }: Report006ViewProps) {
  return (
    <div className="report006-report">
      <div className="report-header">
        <h1 className="report-title">Safety Inspection Checklist</h1>
        <div className="report-meta">
          <span className="category-badge safety">safety</span>
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
          <label className="field-label">Inspection Date</label>
          <div className="field-value">{viewModel.header.date}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Inspector Name</label>
          <div className="field-value">{viewModel.header.inspector}</div>
        </div>
      </div>
      <div className="section safety-section">
        <h2 className="section-title">Safety</h2>
        <div className="field-group">
          <label className="field-label">Identified Hazards</label>
          <div className="field-value multiline">{viewModel.safety.hazards}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Safety Equipment Check</label>
          <div className="field-value multiline">{viewModel.safety.equipment}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Corrective Actions</label>
          <div className="field-value multiline">{viewModel.safety.corrective}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Inspector Signature</label>
          <div className="field-value">{viewModel.safety.signatures}</div>
        </div>
      </div>
      </div>
    </div>
  );
}
