/**
 * @file report-020ViewModel.ts
 * @module report-pages
 * @description ViewModel for Incident Report
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report020ViewModel {
  header: {
    date: string;
    time: string;
    location: string;
  };
  incident: {
    type: string;
    description: string;
    cause: string;
    injuries: string;
    action: string;
    reporter: string;
  };
}

export function buildReport020ViewModel(values: any): Report020ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      time: values["header.time"] || "",
      location: values["header.location"] || ""
    },
    incident: {
      type: values["incident.type"] || "",
      description: values["incident.description"] || "",
      cause: values["incident.cause"] || "",
      injuries: values["incident.injuries"] || "",
      action: values["incident.action"] || "",
      reporter: values["incident.reporter"] || ""
    }
  };
}

