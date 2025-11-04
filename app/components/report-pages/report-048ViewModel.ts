/**
 * @file report-048ViewModel.ts
 * @module report-pages
 * @description ViewModel for Permit Status Report
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report048ViewModel {
  header: {
    project: string;
    date: string;
  };
  permit: {
    type: string;
    number: string;
    issuingAuthority: string;
    issueDate: string;
    expiryDate: string;
    status: string;
    conditions: string;
  };
}

export function buildReport048ViewModel(values: any): Report048ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    permit: {
      type: values["permit.type"] || "",
      number: values["permit.number"] || "",
      issuingAuthority: values["permit.issuingAuthority"] || "",
      issueDate: values["permit.issueDate"] || "",
      expiryDate: values["permit.expiryDate"] || "",
      status: values["permit.status"] || "",
      conditions: values["permit.conditions"] || ""
    }
  };
}

