/**
 * @file report-040ViewModel.ts
 * @module report-pages
 * @description ViewModel for Vendor Performance Review
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report040ViewModel {
  header: {
    date: string;
    vendor: string;
  };
  performance: {
    quality: string;
    delivery: string;
    pricing: string;
    communication: string;
    issues: string;
    recommendations: string;
  };
}

export function buildReport040ViewModel(values: any): Report040ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      vendor: values["header.vendor"] || ""
    },
    performance: {
      quality: values["performance.quality"] || "",
      delivery: values["performance.delivery"] || "",
      pricing: values["performance.pricing"] || "",
      communication: values["performance.communication"] || "",
      issues: values["performance.issues"] || "",
      recommendations: values["performance.recommendations"] || ""
    }
  };
}

