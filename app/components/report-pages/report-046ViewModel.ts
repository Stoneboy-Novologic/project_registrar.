/**
 * @file report-046ViewModel.ts
 * @module report-pages
 * @description ViewModel for Correspondence Log
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report046ViewModel {
  header: {
    date: string;
    project: string;
  };
  correspondence: {
    ref: string;
    from: string;
    to: string;
    subject: string;
    content: string;
    response: string;
    responseDate: string;
  };
}

export function buildReport046ViewModel(values: any): Report046ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    correspondence: {
      ref: values["correspondence.ref"] || "",
      from: values["correspondence.from"] || "",
      to: values["correspondence.to"] || "",
      subject: values["correspondence.subject"] || "",
      content: values["correspondence.content"] || "",
      response: values["correspondence.response"] || "",
      responseDate: values["correspondence.responseDate"] || ""
    }
  };
}

