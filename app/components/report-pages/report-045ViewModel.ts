/**
 * @file report-045ViewModel.ts
 * @module report-pages
 * @description ViewModel for Technical Specification Review
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report045ViewModel {
  header: {
    date: string;
    project: string;
  };
  spec: {
    document: string;
    revision: string;
    reviewer: string;
    summary: string;
    issues: string;
    recommendations: string;
    approval: string;
  };
}

export function buildReport045ViewModel(values: any): Report045ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    spec: {
      document: values["spec.document"] || "",
      revision: values["spec.revision"] || "",
      reviewer: values["spec.reviewer"] || "",
      summary: values["spec.summary"] || "",
      issues: values["spec.issues"] || "",
      recommendations: values["spec.recommendations"] || "",
      approval: values["spec.approval"] || ""
    }
  };
}

