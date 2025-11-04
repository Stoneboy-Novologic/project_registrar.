/**
 * @file report-041ViewModel.ts
 * @module report-pages
 * @description ViewModel for Material Testing Report
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report041ViewModel {
  header: {
    date: string;
    project: string;
  };
  test: {
    material: string;
    sample: string;
    location: string;
    type: string;
    results: string;
    specification: string;
    compliance: string;
    tester: string;
  };
}

export function buildReport041ViewModel(values: any): Report041ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    test: {
      material: values["test.material"] || "",
      sample: values["test.sample"] || "",
      location: values["test.location"] || "",
      type: values["test.type"] || "",
      results: values["test.results"] || "",
      specification: values["test.specification"] || "",
      compliance: values["test.compliance"] || "",
      tester: values["test.tester"] || ""
    }
  };
}

