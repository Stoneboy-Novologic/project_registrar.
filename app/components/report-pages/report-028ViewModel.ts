/**
 * @file report-028ViewModel.ts
 * @module report-pages
 * @description ViewModel for Stakeholder Communication Log
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report028ViewModel {
  header: {
    date: string;
    project: string;
  };
  communication: {
    stakeholder: string;
    method: string;
    subject: string;
    content: string;
    response: string;
    followup: string;
    initiator: string;
  };
}

export function buildReport028ViewModel(values: any): Report028ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      project: values["header.project"] || ""
    },
    communication: {
      stakeholder: values["communication.stakeholder"] || "",
      method: values["communication.method"] || "",
      subject: values["communication.subject"] || "",
      content: values["communication.content"] || "",
      response: values["communication.response"] || "",
      followup: values["communication.followup"] || "",
      initiator: values["communication.initiator"] || ""
    }
  };
}

