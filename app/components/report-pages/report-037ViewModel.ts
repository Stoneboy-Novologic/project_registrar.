/**
 * @file report-037ViewModel.ts
 * @module report-pages
 * @description ViewModel for Invoice Tracking
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report037ViewModel {
  header: {
    project: string;
    period: string;
  };
  invoice: {
    number: string;
    vendor: string;
    amount: string;
    date: string;
    status: string;
    dueDate: string;
    description: string;
  };
}

export function buildReport037ViewModel(values: any): Report037ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      period: values["header.period"] || ""
    },
    invoice: {
      number: values["invoice.number"] || "",
      vendor: values["invoice.vendor"] || "",
      amount: values["invoice.amount"] || "",
      date: values["invoice.date"] || "",
      status: values["invoice.status"] || "",
      dueDate: values["invoice.dueDate"] || "",
      description: values["invoice.description"] || ""
    }
  };
}

