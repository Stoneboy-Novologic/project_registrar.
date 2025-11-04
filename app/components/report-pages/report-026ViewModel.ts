/**
 * @file report-026ViewModel.ts
 * @module report-pages
 * @description ViewModel for Project Schedule Update
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report026ViewModel {
  header: {
    project: string;
    date: string;
  };
  schedule: {
    original: string;
    current: string;
    changes: string;
    impact: string;
    mitigation: string;
    preparer: string;
  };
}

export function buildReport026ViewModel(values: any): Report026ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    schedule: {
      original: values["schedule.original"] || "",
      current: values["schedule.current"] || "",
      changes: values["schedule.changes"] || "",
      impact: values["schedule.impact"] || "",
      mitigation: values["schedule.mitigation"] || "",
      preparer: values["schedule.preparer"] || ""
    }
  };
}

