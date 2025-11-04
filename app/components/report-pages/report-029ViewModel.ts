/**
 * @file report-029ViewModel.ts
 * @module report-pages
 * @description ViewModel for Project Milestone Report
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report029ViewModel {
  header: {
    project: string;
    date: string;
  };
  milestone: {
    name: string;
    planned: string;
    actual: string;
    status: string;
    description: string;
    achievements: string;
    issues: string;
  };
}

export function buildReport029ViewModel(values: any): Report029ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    milestone: {
      name: values["milestone.name"] || "",
      planned: values["milestone.planned"] || "",
      actual: values["milestone.actual"] || "",
      status: values["milestone.status"] || "",
      description: values["milestone.description"] || "",
      achievements: values["milestone.achievements"] || "",
      issues: values["milestone.issues"] || ""
    }
  };
}

