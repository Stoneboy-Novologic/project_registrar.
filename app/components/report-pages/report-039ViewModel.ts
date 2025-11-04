/**
 * @file report-039ViewModel.ts
 * @module report-pages
 * @description ViewModel for Payment Application
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report039ViewModel {
  header: {
    project: string;
    date: string;
  };
  payment: {
    period: string;
    contractor: string;
    amount: string;
    workCompleted: string;
    retention: string;
    previousPayments: string;
    totalDue: string;
  };
}

export function buildReport039ViewModel(values: any): Report039ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || ""
    },
    payment: {
      period: values["payment.period"] || "",
      contractor: values["payment.contractor"] || "",
      amount: values["payment.amount"] || "",
      workCompleted: values["payment.workCompleted"] || "",
      retention: values["payment.retention"] || "",
      previousPayments: values["payment.previousPayments"] || "",
      totalDue: values["payment.totalDue"] || ""
    }
  };
}

