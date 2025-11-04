/**
 * @file report-027ViewModel.ts
 * @module report-pages
 * @description ViewModel for Risk Assessment Register
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report027ViewModel {
  header: {
    project: string;
    date: string;
  };
  risk: {
    identified: string;
    probability: string;
    impact: string;
    mitigation: string;
    owner: string;
    status: string;
  };
}

export function buildReport027ViewModel(values: any): Report027ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    risk: {
      identified: values["risk.identified"] || "",
      probability: values["risk.probability"] || "",
      impact: values["risk.impact"] || "",
      mitigation: values["risk.mitigation"] || "",
      owner: values["risk.owner"] || "",
      status: values["risk.status"] || ""
    }
  };
}

