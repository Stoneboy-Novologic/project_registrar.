/**
 * @file report-017ViewModel.ts
 * @module report-pages
 * @description ViewModel for Punch List
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report017ViewModel {
  header: {
    project: string;
    location: string;
    date: string;
  };
  punch: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
    responsible: string;
    dueDate: string;
  };
}

export function buildReport017ViewModel(values: any): Report017ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      location: values["header.location"] || "",
      date: values["header.date"] || ""
    },
    punch: {
      item1: values["punch.item1"] || "",
      item2: values["punch.item2"] || "",
      item3: values["punch.item3"] || "",
      item4: values["punch.item4"] || "",
      item5: values["punch.item5"] || "",
      responsible: values["punch.responsible"] || "",
      dueDate: values["punch.dueDate"] || ""
    }
  };
}

