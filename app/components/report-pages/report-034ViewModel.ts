/**
 * @file report-034ViewModel.ts
 * @module report-pages
 * @description ViewModel for Emergency Response Plan
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report034ViewModel {
  header: {
    project: string;
    date: string;
  };
  emergency: {
    types: string;
    procedures: string;
    contacts: string;
    equipment: string;
    assembly: string;
    review: string;
  };
}

export function buildReport034ViewModel(values: any): Report034ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    emergency: {
      types: values["emergency.types"] || "",
      procedures: values["emergency.procedures"] || "",
      contacts: values["emergency.contacts"] || "",
      equipment: values["emergency.equipment"] || "",
      assembly: values["emergency.assembly"] || "",
      review: values["emergency.review"] || ""
    }
  };
}

