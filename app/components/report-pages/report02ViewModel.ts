/* app/components/report-pages/report02ViewModel.ts */
import { z } from "zod";
import type { FieldValues } from "@/lib/types";
import type { Report02Props } from "./Report02View";

const Report02Schema = z.object({
  "header.title": z.string().optional(),
  "header.subtitle": z.string().optional(),
  "header.date": z.string().optional(),
  "content.greeting": z.string().optional(),
  "content.description": z.string().optional(),
  "content.status": z.string().optional(),
  "footer.author": z.string().optional(),
  "footer.version": z.string().optional(),
  "footer.notes": z.string().optional(),
});

export function buildReport02ViewModel(values: FieldValues): Report02Props {
  const v = Report02Schema.parse(values);
  
  return {
    headerTitle: v["header.title"] || "",
    headerSubtitle: v["header.subtitle"] || "",
    headerDate: v["header.date"] || "",
    contentGreeting: v["content.greeting"] || "",
    contentDescription: v["content.description"] || "",
    contentStatus: v["content.status"] || "",
    footerAuthor: v["footer.author"] || "",
    footerVersion: v["footer.version"] || "",
    footerNotes: v["footer.notes"] || "",
  };
}
