/* app/components/report-pages/report04ViewModel.ts */
import { z } from "zod";
import type { FieldValues } from "@/lib/types";

// Reuse ContentItem interface from Report-03
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

export interface Report04Props {
  headerRegion?: string;
  headerProjectInfo?: string;
  headerBadge?: string;
  contentsData?: ContentItem[];
}

// Zod schema for validation (reuse from Report-03)
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

const Report04Schema = z.object({
  "header.region": z.string().optional(),
  "header.projectInfo": z.string().optional(),
  "header.badge": z.string().optional(),
  "contents.data": z.string().optional(),
});

// Helper function to safely parse JSON arrays (reuse from Report-03)
function parseJsonArray<T>(jsonString: string | undefined, schema: z.ZodArray<z.ZodType<T>>): T[] {
  if (!jsonString) return [];
  
  try {
    console.log("Parsing JSON array for Report-04:", jsonString);
    const parsed = JSON.parse(jsonString);
    const validated = schema.parse(parsed);
    console.log("Successfully parsed and validated Report-04 contents:", validated);
    return validated;
  } catch (error) {
    console.error("Error parsing JSON array for Report-04:", error);
    return [];
  }
}

export function buildReport04ViewModel(values: FieldValues): Report04Props {
  console.log("Building Report04ViewModel with values:", values);
  
  const v = Report04Schema.parse(values);
  
  // Parse contents table data with proper error handling
  const contentsData = parseJsonArray(
    v["contents.data"],
    z.array(contentSchema)
  );
  
  const result = {
    headerRegion: v["header.region"],
    headerProjectInfo: v["header.projectInfo"],
    headerBadge: v["header.badge"],
    contentsData,
  };
  
  console.log("Built Report04ViewModel result:", result);
  return result;
}
