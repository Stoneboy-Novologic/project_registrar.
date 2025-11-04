/**
 * @file report-007ViewModel.ts
 * @module report-pages
 * @description ViewModel for Daily Progress Report
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report007ViewModel {
  header: {
    date: string;
    project: string;
  };
  progress: {
    weather: string;
    workCompleted: string;
    workPlanned: string;
    issues: string;
    materials: string;
    labor: string;
  };
}

export function buildReport007ViewModel(values: any): Report007ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    progress: {
      weather: values["progress.weather"] || "",
      workCompleted: values["progress.workCompleted"] || "",
      workPlanned: values["progress.workPlanned"] || "",
      issues: values["progress.issues"] || "",
      materials: values["progress.materials"] || "",
      labor: values["progress.labor"] || ""
    }
  };
}

