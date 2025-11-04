/**
 * @file report-010ViewModel.ts
 * @module report-pages
 * @description ViewModel for Quality Control Checklist
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report010ViewModel {
  header: {
    project: string;
    location: string;
    date: string;
  };
  qc: {
    concrete: string;
    reinforcement: string;
    dimensions: string;
    finish: string;
    testing: string;
    nonConformances: string;
    corrective: string;
    inspector: string;
  };
}

export function buildReport010ViewModel(values: any): Report010ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      location: values["header.location"] || "",
      date: values["header.date"] || ""
    },
    qc: {
      concrete: values["qc.concrete"] || "",
      reinforcement: values["qc.reinforcement"] || "",
      dimensions: values["qc.dimensions"] || "",
      finish: values["qc.finish"] || "",
      testing: values["qc.testing"] || "",
      nonConformances: values["qc.nonConformances"] || "",
      corrective: values["qc.corrective"] || "",
      inspector: values["qc.inspector"] || ""
    }
  };
}

