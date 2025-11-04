/**
 * @file report-014ViewModel.ts
 * @module report-pages
 * @description ViewModel for Meeting Minutes
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report014ViewModel {
  header: {
    date: string;
    time: string;
    location: string;
  };
  attendees: {
    list: string;
  };
  agenda: {
    items: string;
  };
  decisions: {
    made: string;
  };
  action: {
    items: string;
  };
  next: {
    meeting: string;
  };
  minutes: {
    recorder: string;
  };
}

export function buildReport014ViewModel(values: any): Report014ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      time: values["header.time"] || "",
      location: values["header.location"] || ""
    },
    attendees: {
      list: values["attendees.list"] || ""
    },
    agenda: {
      items: values["agenda.items"] || ""
    },
    decisions: {
      made: values["decisions.made"] || ""
    },
    action: {
      items: values["action.items"] || ""
    },
    next: {
      meeting: values["next.meeting"] || ""
    },
    minutes: {
      recorder: values["minutes.recorder"] || ""
    }
  };
}

