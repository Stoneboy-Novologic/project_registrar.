/**
 * @file report-038ViewModel.ts
 * @module report-pages
 * @description ViewModel for Cost Variance Analysis
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report038ViewModel {
  header: {
    project: string;
    period: string;
  };
  variance: {
    budgeted: string;
    actual: string;
    variance: string;
    analysis: string;
    reasons: string;
    actions: string;
  };
}

export function buildReport038ViewModel(values: any): Report038ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      period: values["header.period"] || ""
    },
    variance: {
      budgeted: values["variance.budgeted"] || "",
      actual: values["variance.actual"] || "",
      variance: values["variance.variance"] || "",
      analysis: values["variance.analysis"] || "",
      reasons: values["variance.reasons"] || "",
      actions: values["variance.actions"] || ""
    }
  };
}

