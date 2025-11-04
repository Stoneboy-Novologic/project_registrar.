/**
 * @file report-033ViewModel.ts
 * @module report-pages
 * @description ViewModel for Safety Equipment Inspection
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report033ViewModel {
  header: {
    date: string;
    inspector: string;
  };
  equipment: {
    type: string;
    quantity: string;
    condition: string;
    defects: string;
    action: string;
    nextInspection: string;
  };
}

export function buildReport033ViewModel(values: any): Report033ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      inspector: values["header.inspector"] || ""
    },
    equipment: {
      type: values["equipment.type"] || "",
      quantity: values["equipment.quantity"] || "",
      condition: values["equipment.condition"] || "",
      defects: values["equipment.defects"] || "",
      action: values["equipment.action"] || "",
      nextInspection: values["equipment.nextInspection"] || ""
    }
  };
}

