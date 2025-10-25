/* app/components/report-pages/report-011ViewModel.ts */
export interface Report011ViewModel {
  header: {
    project: string;
    period: string;
  };
  budget: {
    original: string;
    approved: string;
    current: string;
    spent: string;
    remaining: string;
    variance: string;
    forecast: string;
    notes: string;
  };
}

export function buildReport011ViewModel(values: any): Report011ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      period: values["header.period"] || ""
    },
    budget: {
      original: values["budget.original"] || "",
      approved: values["budget.approved"] || "",
      current: values["budget.current"] || "",
      spent: values["budget.spent"] || "",
      remaining: values["budget.remaining"] || "",
      variance: values["budget.variance"] || "",
      forecast: values["budget.forecast"] || "",
      notes: values["budget.notes"] || ""
    }
  };
}
