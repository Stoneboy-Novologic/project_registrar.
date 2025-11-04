/**
 * @file report-022ViewModel.ts
 * @module report-pages
 * @description ViewModel for Subcontractor Performance
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report022ViewModel {
  header: {
    date: string;
    subcontractor: string;
  };
  perf: {
    workQuality: string;
    schedule: string;
    safety: string;
    communication: string;
    issues: string;
    recommendations: string;
  };
}

export function buildReport022ViewModel(values: any): Report022ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      subcontractor: values["header.subcontractor"] || ""
    },
    perf: {
      workQuality: values["perf.workQuality"] || "",
      schedule: values["perf.schedule"] || "",
      safety: values["perf.safety"] || "",
      communication: values["perf.communication"] || "",
      issues: values["perf.issues"] || "",
      recommendations: values["perf.recommendations"] || ""
    }
  };
}

