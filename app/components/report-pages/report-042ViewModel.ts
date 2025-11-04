/**
 * @file report-042ViewModel.ts
 * @module report-pages
 * @description ViewModel for Non-Conformance Report (NCR)
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report042ViewModel {
  header: {
    date: string;
    project: string;
  };
  ncr: {
    number: string;
    location: string;
    description: string;
    severity: string;
    cause: string;
    corrective: string;
    preventive: string;
    status: string;
  };
}

export function buildReport042ViewModel(values: any): Report042ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    ncr: {
      number: values["ncr.number"] || "",
      location: values["ncr.location"] || "",
      description: values["ncr.description"] || "",
      severity: values["ncr.severity"] || "",
      cause: values["ncr.cause"] || "",
      corrective: values["ncr.corrective"] || "",
      preventive: values["ncr.preventive"] || "",
      status: values["ncr.status"] || ""
    }
  };
}

