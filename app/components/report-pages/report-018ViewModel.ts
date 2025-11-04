/**
 * @file report-018ViewModel.ts
 * @module report-pages
 * @description ViewModel for Weather Report
 * @author BharatERP
 * @created 2025-01-27
 */

export interface Report018ViewModel {
  header: {
    date: string;
  };
  weather: {
    temperature: string;
    conditions: string;
    wind: string;
    precipitation: string;
    visibility: string;
    impact: string;
  };
}

export function buildReport018ViewModel(values: any): Report018ViewModel {
  return {
    header: {
      date: values["header.date"] || ""
    },
    weather: {
      temperature: values["weather.temperature"] || "",
      conditions: values["weather.conditions"] || "",
      wind: values["weather.wind"] || "",
      precipitation: values["weather.precipitation"] || "",
      visibility: values["weather.visibility"] || "",
      impact: values["weather.impact"] || ""
    }
  };
}

