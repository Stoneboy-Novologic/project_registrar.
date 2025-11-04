/**
 * @file report-009ViewModel.ts
 * @module report-pages
 * @description ViewModel for Equipment Usage Report
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report009ViewModel {
  header: {
    date: string;
  };
  equipment: {
    excavator: string;
    crane: string;
    compactor: string;
    generator: string;
    maintenance: string;
    issues: string;
    fuel: string;
    operator: string;
  };
}

export function buildReport009ViewModel(values: any): Report009ViewModel {
  return {
    header: {
      date: values["header.date"] || ""
    },
    equipment: {
      excavator: values["equipment.excavator"] || "",
      crane: values["equipment.crane"] || "",
      compactor: values["equipment.compactor"] || "",
      generator: values["equipment.generator"] || "",
      maintenance: values["equipment.maintenance"] || "",
      issues: values["equipment.issues"] || "",
      fuel: values["equipment.fuel"] || "",
      operator: values["equipment.operator"] || ""
    }
  };
}

