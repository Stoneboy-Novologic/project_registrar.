/* lib/validation.ts */
import { z } from "zod";

// Zod schemas mirror the TypeScript types to enforce runtime safety
export const TemplateFieldSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(["text", "multiline", "link", "date", "badge", "image"]),
  placeholder: z.string().optional(),
});

export const ReportTemplateSchema = z.object({
  pageId: z.string().min(1),
  title: z.string().min(1),
  fields: z.array(TemplateFieldSchema).min(1),
});

export type ReportTemplateInput = z.infer<typeof ReportTemplateSchema>;


