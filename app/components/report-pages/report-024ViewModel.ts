/**
 * @file report-024ViewModel.ts
 * @module report-pages
 * @description ViewModel for As-Built Documentation
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report024ViewModel {
  header: {
    date: string;
    project: string;
  };
  asbuilt: {
    location: string;
    work: string;
    dimensions: string;
    materials: string;
    deviations: string;
    photos: string;
    documenter: string;
  };
}

export function buildReport024ViewModel(values: any): Report024ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    asbuilt: {
      location: values["asbuilt.location"] || "",
      work: values["asbuilt.work"] || "",
      dimensions: values["asbuilt.dimensions"] || "",
      materials: values["asbuilt.materials"] || "",
      deviations: values["asbuilt.deviations"] || "",
      photos: values["asbuilt.photos"] || "",
      documenter: values["asbuilt.documenter"] || ""
    }
  };
}

