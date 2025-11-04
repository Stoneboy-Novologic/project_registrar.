/**
 * @file report-043ViewModel.ts
 * @module report-pages
 * @description ViewModel for Commissioning Checklist
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report043ViewModel {
  header: {
    project: string;
    date: string;
  };
  commission: {
    system: string;
    preStart: string;
    operational: string;
    performance: string;
    issues: string;
    signoff: string;
    commissioner: string;
  };
}

export function buildReport043ViewModel(values: any): Report043ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    commission: {
      system: values["commission.system"] || "",
      preStart: values["commission.preStart"] || "",
      operational: values["commission.operational"] || "",
      performance: values["commission.performance"] || "",
      issues: values["commission.issues"] || "",
      signoff: values["commission.signoff"] || "",
      commissioner: values["commission.commissioner"] || ""
    }
  };
}

