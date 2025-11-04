/**
 * @file report-021ViewModel.ts
 * @module report-pages
 * @description ViewModel for Environmental Compliance
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report021ViewModel {
  header: {
    date: string;
    project: string;
  };
  env: {
    noise: string;
    dust: string;
    water: string;
    waste: string;
    wildlife: string;
    compliance: string;
  };
}

export function buildReport021ViewModel(values: any): Report021ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    env: {
      noise: values["env.noise"] || "",
      dust: values["env.dust"] || "",
      water: values["env.water"] || "",
      waste: values["env.waste"] || "",
      wildlife: values["env.wildlife"] || "",
      compliance: values["env.compliance"] || ""
    }
  };
}

