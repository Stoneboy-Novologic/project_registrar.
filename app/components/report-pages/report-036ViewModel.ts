/**
 * @file report-036ViewModel.ts
 * @module report-pages
 * @description ViewModel for Purchase Order Log
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report036ViewModel {
  header: {
    date: string;
    project: string;
  };
  po: {
    number: string;
    vendor: string;
    description: string;
    amount: string;
    status: string;
    expectedDelivery: string;
    notes: string;
  };
}

export function buildReport036ViewModel(values: any): Report036ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    po: {
      number: values["po.number"] || "",
      vendor: values["po.vendor"] || "",
      description: values["po.description"] || "",
      amount: values["po.amount"] || "",
      status: values["po.status"] || "",
      expectedDelivery: values["po.expectedDelivery"] || "",
      notes: values["po.notes"] || ""
    }
  };
}

