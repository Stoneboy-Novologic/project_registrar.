/* lib/validation.ts */
import { z } from "zod";

// Zod schemas mirror the TypeScript types to enforce runtime safety
export const TemplateFieldSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(["text", "multiline", "link", "date", "badge", "image", "attachments", "authors", "contents"]),
  placeholder: z.string().optional(),
  helpText: z.string().optional(),
  required: z.boolean().optional(),
  validation: z.object({
    pattern: z.string().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    message: z.string().optional(),
  }).optional(),
});

export const ReportTemplateSchema = z.object({
  pageId: z.string().min(1),
  title: z.string().min(1),
  fields: z.array(TemplateFieldSchema).min(1),
});

export type ReportTemplateInput = z.infer<typeof ReportTemplateSchema>;


