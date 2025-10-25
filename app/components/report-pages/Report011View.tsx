/* app/components/report-pages/Report011View.tsx */
import { Report011ViewModel } from "./report-011ViewModel";

interface Report011ViewProps {
  viewModel: Report011ViewModel;
}

export default function Report011View({ viewModel }: Report011ViewProps) {
  return (
    <div className="report011-report">
      <div className="report-header">
        <h1 className="report-title">Budget Summary</h1>
        <div className="report-meta">
          <span className="category-badge financial">financial</span>
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
          <label className="field-label">Reporting Period</label>
          <div className="field-value">{viewModel.header.period}</div>
        </div>
      </div>
      <div className="section budget-section">
        <h2 className="section-title">Budget</h2>
        <div className="field-group">
          <label className="field-label">Original Budget</label>
          <div className="field-value">{viewModel.budget.original}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Approved Changes</label>
          <div className="field-value">{viewModel.budget.approved}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Current Budget</label>
          <div className="field-value">{viewModel.budget.current}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Amount Spent</label>
          <div className="field-value">{viewModel.budget.spent}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Remaining Budget</label>
          <div className="field-value">{viewModel.budget.remaining}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Budget Variance</label>
          <div className="field-value">{viewModel.budget.variance}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Forecast Completion</label>
          <div className="field-value">{viewModel.budget.forecast}</div>
        </div>
        <div className="field-group">
          <label className="field-label">Budget Notes</label>
          <div className="field-value multiline">{viewModel.budget.notes}</div>
        </div>
      </div>
      </div>
    </div>
  );
}
