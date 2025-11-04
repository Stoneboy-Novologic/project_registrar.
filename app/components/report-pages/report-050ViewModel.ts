/**
 * @file report-050ViewModel.ts
 * @module report-pages
 * @description ViewModel for Lessons Learned Report
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report050ViewModel {
  header: {
    project: string;
    date: string;
  };
  lessons: {
    phase: string;
    successes: string;
    challenges: string;
    lessons: string;
    recommendations: string;
    team: string;
    preparedBy: string;
  };
}

export function buildReport050ViewModel(values: any): Report050ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    lessons: {
      phase: values["lessons.phase"] || "",
      successes: values["lessons.successes"] || "",
      challenges: values["lessons.challenges"] || "",
      lessons: values["lessons.lessons"] || "",
      recommendations: values["lessons.recommendations"] || "",
      team: values["lessons.team"] || "",
      preparedBy: values["lessons.preparedBy"] || ""
    }
  };
}

