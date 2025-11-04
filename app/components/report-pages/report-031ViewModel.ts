/**
 * @file report-031ViewModel.ts
 * @module report-pages
 * @description ViewModel for Safety Training Record
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report031ViewModel {
  header: {
    date: string;
    project: string;
  };
  training: {
    type: string;
    instructor: string;
    attendees: string;
    content: string;
    duration: string;
    certification: string;
    notes: string;
  };
}

export function buildReport031ViewModel(values: any): Report031ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    training: {
      type: values["training.type"] || "",
      instructor: values["training.instructor"] || "",
      attendees: values["training.attendees"] || "",
      content: values["training.content"] || "",
      duration: values["training.duration"] || "",
      certification: values["training.certification"] || "",
      notes: values["training.notes"] || ""
    }
  };
}

