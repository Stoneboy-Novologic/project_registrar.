/* app/components/report-pages/report03ViewModel.ts */
import { z } from "zod";
import type { FieldValues } from "@/lib/types";

// Define interfaces for table data structures
export interface AttachmentItem {
  checked: boolean;
  description: string;
}

export interface AuthorItem {
  name: string;
  title: string;
  email: string;
  phone: string;
  role: string;
}

export interface ContentItem {
  section: string;
  item: string;
  description: string;
  note: string;
  page: string;
  bold: boolean;
  highlighted: boolean;
  indented: boolean;
}

export interface Report03Props {
  headerRegion?: string;
  headerProjectInfo?: string;
  headerBadge?: string;
  attachmentsData?: AttachmentItem[];
  authorsData?: AuthorItem[];
  contentsData?: ContentItem[];
  footerText?: string;
}

// Zod schemas for validation
const attachmentSchema = z.object({
  checked: z.boolean(),
  description: z.string(),
});

const authorSchema = z.object({
  name: z.string(),
  title: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
});

const contentSchema = z.object({
  section: z.string(),
  item: z.string(),
  description: z.string(),
  note: z.string(),
  page: z.string(),
  bold: z.boolean(),
  highlighted: z.boolean(),
  indented: z.boolean(),
});

const Report03Schema = z.object({
  "header.region": z.string().optional(),
  "header.projectInfo": z.string().optional(),
  "header.badge": z.string().optional(),
  "attachments.data": z.string().optional(),
  "authors.data": z.string().optional(),
  "contents.data": z.string().optional(),
  "footer.text": z.string().optional(),
});

// Helper function to safely parse JSON arrays
function parseJsonArray<T>(jsonString: string | undefined, schema: z.ZodArray<z.ZodType<T>>): T[] {
  if (!jsonString) return [];
  
  try {
    console.log("Parsing JSON array:", jsonString);
    const parsed = JSON.parse(jsonString);
    const validated = schema.parse(parsed);
    console.log("Successfully parsed and validated:", validated);
    return validated;
  } catch (error) {
    console.error("Error parsing JSON array:", error);
    return [];
  }
}

export function buildReport03ViewModel(values: FieldValues): Report03Props {
  console.log("Building Report03ViewModel with values:", values);
  
  const v = Report03Schema.parse(values);
  
  // Parse table data with proper error handling
  const attachmentsData = parseJsonArray(
    v["attachments.data"],
    z.array(attachmentSchema)
  );
  
  const authorsData = parseJsonArray(
    v["authors.data"],
    z.array(authorSchema)
  );
  
  const contentsData = parseJsonArray(
    v["contents.data"],
    z.array(contentSchema)
  );
  
  const result = {
    headerRegion: v["header.region"],
    headerProjectInfo: v["header.projectInfo"],
    headerBadge: v["header.badge"],
    attachmentsData,
    authorsData,
    contentsData,
    footerText: v["footer.text"],
  };
  
  console.log("Built Report03ViewModel result:", result);
  return result;
}
