/**
 * @file report-035ViewModel.ts
 * @module report-pages
 * @description ViewModel for Safety Audit Report
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report035ViewModel {
  header: {
    date: string;
    project: string;
  };
  audit: {
    auditor: string;
    scope: string;
    findings: string;
    nonCompliance: string;
    recommendations: string;
    actionPlan: string;
    followup: string;
  };
}

export function buildReport035ViewModel(values: any): Report035ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    audit: {
      auditor: values["audit.auditor"] || "",
      scope: values["audit.scope"] || "",
      findings: values["audit.findings"] || "",
      nonCompliance: values["audit.nonCompliance"] || "",
      recommendations: values["audit.recommendations"] || "",
      actionPlan: values["audit.actionPlan"] || "",
      followup: values["audit.followup"] || ""
    }
  };
}

