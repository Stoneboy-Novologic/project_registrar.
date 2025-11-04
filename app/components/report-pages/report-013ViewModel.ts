/**
 * @file report-013ViewModel.ts
 * @module report-pages
 * @description ViewModel for Site Photos Documentation
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report013ViewModel {
  header: {
    date: string;
    location: string;
  };
  photos: {
    progress: string;
    quality: string;
    issues: string;
    description: string;
    photographer: string;
  };
}

export function buildReport013ViewModel(values: any): Report013ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      location: values["header.location"] || ""
    },
    photos: {
      progress: values["photos.progress"] || "",
      quality: values["photos.quality"] || "",
      issues: values["photos.issues"] || "",
      description: values["photos.description"] || "",
      photographer: values["photos.photographer"] || ""
    }
  };
}

