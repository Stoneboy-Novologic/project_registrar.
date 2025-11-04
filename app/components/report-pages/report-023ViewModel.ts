/**
 * @file report-023ViewModel.ts
 * @module report-pages
 * @description ViewModel for Inspection Request
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report023ViewModel {
  header: {
    date: string;
    project: string;
  };
  inspection: {
    type: string;
    location: string;
    scheduled: string;
    time: string;
    inspector: string;
    work: string;
    requestor: string;
  };
}

export function buildReport023ViewModel(values: any): Report023ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    inspection: {
      type: values["inspection.type"] || "",
      location: values["inspection.location"] || "",
      scheduled: values["inspection.scheduled"] || "",
      time: values["inspection.time"] || "",
      inspector: values["inspection.inspector"] || "",
      work: values["inspection.work"] || "",
      requestor: values["inspection.requestor"] || ""
    }
  };
}

