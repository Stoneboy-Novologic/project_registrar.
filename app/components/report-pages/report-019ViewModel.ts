/**
 * @file report-019ViewModel.ts
 * @module report-pages
 * @description ViewModel for Labor Hours Tracking
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report019ViewModel {
  header: {
    date: string;
    project: string;
  };
  labor: {
    carpenters: string;
    electricians: string;
    plumbers: string;
    laborers: string;
    total: string;
    overtime: string;
    notes: string;
  };
}

export function buildReport019ViewModel(values: any): Report019ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    labor: {
      carpenters: values["labor.carpenters"] || "",
      electricians: values["labor.electricians"] || "",
      plumbers: values["labor.plumbers"] || "",
      laborers: values["labor.laborers"] || "",
      total: values["labor.total"] || "",
      overtime: values["labor.overtime"] || "",
      notes: values["labor.notes"] || ""
    }
  };
}

