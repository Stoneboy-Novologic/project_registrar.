/**
 * @file report-016ViewModel.ts
 * @module report-pages
 * @description ViewModel for Submittal Log
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report016ViewModel {
  header: {
    project: string;
  };
  submittal: {
    number: string;
    date: string;
    type: string;
    description: string;
    status: string;
    response: string;
    approved: string;
  };
}

export function buildReport016ViewModel(values: any): Report016ViewModel {
  return {
    header: {
      project: values["header.project"] || ""
    },
    submittal: {
      number: values["submittal.number"] || "",
      date: values["submittal.date"] || "",
      type: values["submittal.type"] || "",
      description: values["submittal.description"] || "",
      status: values["submittal.status"] || "",
      response: values["submittal.response"] || "",
      approved: values["submittal.approved"] || ""
    }
  };
}

