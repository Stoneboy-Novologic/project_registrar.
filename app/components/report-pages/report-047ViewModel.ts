/**
 * @file report-047ViewModel.ts
 * @module report-pages
 * @description ViewModel for Drawing Revision Log
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report047ViewModel {
  header: {
    project: string;
    date: string;
  };
  drawing: {
    number: string;
    title: string;
    revision: string;
    reason: string;
    changes: string;
    approved: string;
    status: string;
  };
}

export function buildReport047ViewModel(values: any): Report047ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    drawing: {
      number: values["drawing.number"] || "",
      title: values["drawing.title"] || "",
      revision: values["drawing.revision"] || "",
      reason: values["drawing.reason"] || "",
      changes: values["drawing.changes"] || "",
      approved: values["drawing.approved"] || "",
      status: values["drawing.status"] || ""
    }
  };
}

