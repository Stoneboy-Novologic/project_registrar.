/* app/components/report-pages/report-006ViewModel.ts */
export interface Report006ViewModel {
  header: {
    project: string;
    date: string;
    inspector: string;
  };
  safety: {
    hazards: string;
    equipment: string;
    corrective: string;
    signatures: string;
  };
}

export function buildReport006ViewModel(values: any): Report006ViewModel {
  return {
    header: {
      project: values["header.project"] || "",
      date: values["header.date"] || "",
      inspector: values["header.inspector"] || ""
    },
    safety: {
      hazards: values["safety.hazards"] || "",
      equipment: values["safety.equipment"] || "",
      corrective: values["safety.corrective"] || "",
      signatures: values["safety.signatures"] || ""
    }
  };
}
