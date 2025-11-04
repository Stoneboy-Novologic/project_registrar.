/**
 * @file report-030ViewModel.ts
 * @module report-pages
 * @description ViewModel for Resource Allocation Summary
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report030ViewModel {
  header: {
    project: string;
    period: string;
  };
  resource: {
    labor: string;
    equipment: string;
    materials: string;
    utilization: string;
    shortages: string;
    recommendations: string;
  };
}

export function buildReport030ViewModel(values: any): Report030ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      period: values["header.period"] || ""
    },
    resource: {
      labor: values["resource.labor"] || "",
      equipment: values["resource.equipment"] || "",
      materials: values["resource.materials"] || "",
      utilization: values["resource.utilization"] || "",
      shortages: values["resource.shortages"] || "",
      recommendations: values["resource.recommendations"] || ""
    }
  };
}

