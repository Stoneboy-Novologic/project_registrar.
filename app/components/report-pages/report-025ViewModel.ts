/**
 * @file report-025ViewModel.ts
 * @module report-pages
 * @description ViewModel for Project Closeout Checklist
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report025ViewModel {
  header: {
    project: string;
    completion: string;
  };
  closeout: {
    punchList: string;
    testing: string;
    documentation: string;
    warranties: string;
    permits: string;
    cleanup: string;
    finalInspection: string;
    clientAcceptance: string;
    notes: string;
  };
}

export function buildReport025ViewModel(values: any): Report025ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      completion: values["header.completion"] || ""
    },
    closeout: {
      punchList: values["closeout.punchList"] || "",
      testing: values["closeout.testing"] || "",
      documentation: values["closeout.documentation"] || "",
      warranties: values["closeout.warranties"] || "",
      permits: values["closeout.permits"] || "",
      cleanup: values["closeout.cleanup"] || "",
      finalInspection: values["closeout.finalInspection"] || "",
      clientAcceptance: values["closeout.clientAcceptance"] || "",
      notes: values["closeout.notes"] || ""
    }
  };
}

