/**
 * @file report-008ViewModel.ts
 * @module report-pages
 * @description ViewModel for Material Delivery Log
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report008ViewModel {
  header: {
    date: string;
    supplier: string;
  };
  material: {
    type: string;
    quantity: string;
    specifications: string;
  };
  delivery: {
    location: string;
    time: string;
    driver: string;
    vehicle: string;
  };
  quality: {
    inspection: string;
  };
}

export function buildReport008ViewModel(values: any): Report008ViewModel {
  return {
    header: {
      date: values["header.date"] || "",
      supplier: values["header.supplier"] || ""
    },
    material: {
      type: values["material.type"] || "",
      quantity: values["material.quantity"] || "",
      specifications: values["material.specifications"] || ""
    },
    delivery: {
      location: values["delivery.location"] || "",
      time: values["delivery.time"] || "",
      driver: values["delivery.driver"] || "",
      vehicle: values["delivery.vehicle"] || ""
    },
    quality: {
      inspection: values["quality.inspection"] || ""
    }
  };
}

