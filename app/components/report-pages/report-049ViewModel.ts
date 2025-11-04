/**
 * @file report-049ViewModel.ts
 * @module report-pages
 * @description ViewModel for Warranty Documentation
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report049ViewModel {
  header: {
    project: string;
    date: string;
  };
  warranty: {
    item: string;
    vendor: string;
    startDate: string;
    duration: string;
    coverage: string;
    terms: string;
    contact: string;
  };
}

export function buildReport049ViewModel(values: any): Report049ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    warranty: {
      item: values["warranty.item"] || "",
      vendor: values["warranty.vendor"] || "",
      startDate: values["warranty.startDate"] || "",
      duration: values["warranty.duration"] || "",
      coverage: values["warranty.coverage"] || "",
      terms: values["warranty.terms"] || "",
      contact: values["warranty.contact"] || ""
    }
  };
}

