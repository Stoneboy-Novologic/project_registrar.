/**
 * @file report-012ViewModel.ts
 * @module report-pages
 * @description ViewModel for Change Order Request
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report012ViewModel {
  header: {
    project: string;
    date: string;
    number: string;
  };
  change: {
    description: string;
    reason: string;
    impact: string;
    cost: string;
    approval: string;
    requestor: string;
  };
}

export function buildReport012ViewModel(values: any): Report012ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || "",
      number: values["header.number"] || ""
    },
    change: {
      description: values["change.description"] || "",
      reason: values["change.reason"] || "",
      impact: values["change.impact"] || "",
      cost: values["change.cost"] || "",
      approval: values["change.approval"] || "",
      requestor: values["change.requestor"] || ""
    }
  };
}

