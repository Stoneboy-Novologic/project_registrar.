/* app/components/report-pages/report05ViewModel.ts */
import { z } from "zod";
import type { FieldValues } from "@/lib/types";

// Define interfaces for Report 5 data structures
export interface Report05Props {
  headerRegion?: string;
  headerProjectInfo?: string;
  headerBadge?: string;
  
  // Overview intro paragraphs
  overviewParagraph1?: string;
  overviewParagraph2?: string;
  overviewParagraph3?: string;
  
  // Stakeholder table (6 rows)
  stakeholder1Org?: string;
  stakeholder1Website?: string;
  stakeholder1Role?: string;
  stakeholder1ProjectNo?: string;
  
  stakeholder2Org?: string;
  stakeholder2Website?: string;
  stakeholder2Role?: string;
  stakeholder2ProjectNo?: string;
  
  stakeholder3Org?: string;
  stakeholder3Website?: string;
  stakeholder3Role?: string;
  stakeholder3ProjectNo?: string;
  
  stakeholder4Org?: string;
  stakeholder4Website?: string;
  stakeholder4Role?: string;
  stakeholder4ProjectNo?: string;
  
  stakeholder5Org?: string;
  stakeholder5Website?: string;
  stakeholder5Role?: string;
  stakeholder5ProjectNo?: string;
  
  stakeholder6Org?: string;
  stakeholder6Website?: string;
  stakeholder6Role?: string;
  stakeholder6ProjectNo?: string;
  
  // Contract summary bullets
  contractSummaryBullet1?: string;
  contractSummaryBullet2?: string;
  contractSummaryBullet3?: string;
  contractSummaryBullet4?: string;
}

// Zod schema for validation
const Report05Schema = z.object({
  "header.region": z.string().optional(),
  "header.projectInfo": z.string().optional(),
  "header.badge": z.string().optional(),
  
  "overview.paragraph1": z.string().optional(),
  "overview.paragraph2": z.string().optional(),
  "overview.paragraph3": z.string().optional(),
  
  "stakeholder1.org": z.string().optional(),
  "stakeholder1.website": z.string().optional(),
  "stakeholder1.role": z.string().optional(),
  "stakeholder1.projectNo": z.string().optional(),
  
  "stakeholder2.org": z.string().optional(),
  "stakeholder2.website": z.string().optional(),
  "stakeholder2.role": z.string().optional(),
  "stakeholder2.projectNo": z.string().optional(),
  
  "stakeholder3.org": z.string().optional(),
  "stakeholder3.website": z.string().optional(),
  "stakeholder3.role": z.string().optional(),
  "stakeholder3.projectNo": z.string().optional(),
  
  "stakeholder4.org": z.string().optional(),
  "stakeholder4.website": z.string().optional(),
  "stakeholder4.role": z.string().optional(),
  "stakeholder4.projectNo": z.string().optional(),
  
  "stakeholder5.org": z.string().optional(),
  "stakeholder5.website": z.string().optional(),
  "stakeholder5.role": z.string().optional(),
  "stakeholder5.projectNo": z.string().optional(),
  
  "stakeholder6.org": z.string().optional(),
  "stakeholder6.website": z.string().optional(),
  "stakeholder6.role": z.string().optional(),
  "stakeholder6.projectNo": z.string().optional(),
  
  "contractSummary.bullet1": z.string().optional(),
  "contractSummary.bullet2": z.string().optional(),
  "contractSummary.bullet3": z.string().optional(),
  "contractSummary.bullet4": z.string().optional(),
});

export function buildReport05ViewModel(values: FieldValues): Report05Props {
  console.log("Building Report05ViewModel with values:", values);
  
  const v = Report05Schema.parse(values);
  
  const result = {
    headerRegion: v["header.region"],
    headerProjectInfo: v["header.projectInfo"],
    headerBadge: v["header.badge"],
    
    overviewParagraph1: v["overview.paragraph1"],
    overviewParagraph2: v["overview.paragraph2"],
    overviewParagraph3: v["overview.paragraph3"],
    
    stakeholder1Org: v["stakeholder1.org"],
    stakeholder1Website: v["stakeholder1.website"],
    stakeholder1Role: v["stakeholder1.role"],
    stakeholder1ProjectNo: v["stakeholder1.projectNo"],
    
    stakeholder2Org: v["stakeholder2.org"],
    stakeholder2Website: v["stakeholder2.website"],
    stakeholder2Role: v["stakeholder2.role"],
    stakeholder2ProjectNo: v["stakeholder2.projectNo"],
    
    stakeholder3Org: v["stakeholder3.org"],
    stakeholder3Website: v["stakeholder3.website"],
    stakeholder3Role: v["stakeholder3.role"],
    stakeholder3ProjectNo: v["stakeholder3.projectNo"],
    
    stakeholder4Org: v["stakeholder4.org"],
    stakeholder4Website: v["stakeholder4.website"],
    stakeholder4Role: v["stakeholder4.role"],
    stakeholder4ProjectNo: v["stakeholder4.projectNo"],
    
    stakeholder5Org: v["stakeholder5.org"],
    stakeholder5Website: v["stakeholder5.website"],
    stakeholder5Role: v["stakeholder5.role"],
    stakeholder5ProjectNo: v["stakeholder5.projectNo"],
    
    stakeholder6Org: v["stakeholder6.org"],
    stakeholder6Website: v["stakeholder6.website"],
    stakeholder6Role: v["stakeholder6.role"],
    stakeholder6ProjectNo: v["stakeholder6.projectNo"],
    
    contractSummaryBullet1: v["contractSummary.bullet1"],
    contractSummaryBullet2: v["contractSummary.bullet2"],
    contractSummaryBullet3: v["contractSummary.bullet3"],
    contractSummaryBullet4: v["contractSummary.bullet4"],
  };
  
  console.log("Built Report05ViewModel result:", result);
  return result;
}
