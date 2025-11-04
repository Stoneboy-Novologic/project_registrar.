/**
 * @file report-015ViewModel.ts
 * @module report-pages
 * @description ViewModel for RFI (Request for Information)
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report015ViewModel {
  header: {
    project: string;
    date: string;
    number: string;
  };
  rfi: {
    question: string;
    context: string;
    impact: string;
    urgency: string;
    requestor: string;
    response: string;
  };
}

export function buildReport015ViewModel(values: any): Report015ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || "",
      number: values["header.number"] || ""
    },
    rfi: {
      question: values["rfi.question"] || "",
      context: values["rfi.context"] || "",
      impact: values["rfi.impact"] || "",
      urgency: values["rfi.urgency"] || "",
      requestor: values["rfi.requestor"] || "",
      response: values["rfi.response"] || ""
    }
  };
}

