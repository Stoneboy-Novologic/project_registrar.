/**
 * @file report-044ViewModel.ts
 * @module report-pages
 * @description ViewModel for System Performance Test
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report044ViewModel {
  header: {
    date: string;
    project: string;
  };
  test: {
    system: string;
    objective: string;
    parameters: string;
    results: string;
    performance: string;
    compliance: string;
    tester: string;
  };
}

export function buildReport044ViewModel(values: any): Report044ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    test: {
      system: values["test.system"] || "",
      objective: values["test.objective"] || "",
      parameters: values["test.parameters"] || "",
      results: values["test.results"] || "",
      performance: values["test.performance"] || "",
      compliance: values["test.compliance"] || "",
      tester: values["test.tester"] || ""
    }
  };
}

