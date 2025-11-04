/**
 * @file report-032ViewModel.ts
 * @module report-pages
 * @description ViewModel for Toolbox Talk Documentation
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report032ViewModel {
  header: {
    date: string;
    location: string;
  };
  talk: {
    topic: string;
    facilitator: string;
    attendees: string;
    content: string;
    questions: string;
    actionItems: string;
  };
}

export function buildReport032ViewModel(values: any): Report032ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      location: values["header.location"] || ""
    },
    talk: {
      topic: values["talk.topic"] || "",
      facilitator: values["talk.facilitator"] || "",
      attendees: values["talk.attendees"] || "",
      content: values["talk.content"] || "",
      questions: values["talk.questions"] || "",
      actionItems: values["talk.actionItems"] || ""
    }
  };
}

