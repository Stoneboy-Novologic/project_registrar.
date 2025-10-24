import { z } from "zod";
import { FieldValues } from "@/lib/types";
import { Report01Props } from "@/app/components/report/report01-view";

const schema = z.object({
  "header.breadcrumb": z.string().optional(),
  "header.badge": z.string().optional(),
  "title.main": z.string().optional(),
  "title.projectNos": z.string().optional(),
  "title.pageTitle": z.string().optional(),

  "submittedTo.org": z.string().optional(),
  "submittedTo.department": z.string().optional(),
  "submittedTo.address": z.string().optional(),
  "submittedTo.website": z.string().optional(),

  "consultant.name": z.string().optional(),
  "consultant.address": z.string().optional(),
  "consultant.website": z.string().optional(),

  "preparedFor.name": z.string().optional(),
  "preparedFor.address": z.string().optional(),
  "preparedFor.website": z.string().optional(),

  "preparedBy.name": z.string().optional(),
  "preparedBy.address": z.string().optional(),
  "preparedBy.website": z.string().optional(),

  "document.number": z.string().optional(),
  "document.date": z.string().optional(),
  "document.legal": z.string().optional(),
  
  "map.image": z.string().optional(),
});

export function buildReport01ViewModel(values: FieldValues): Report01Props {
  const parsed = schema.safeParse(values);
  const v = parsed.success ? parsed.data : ({} as any);
  return {
    headerBreadcrumb: v["header.breadcrumb"],
    headerBadge: v["header.badge"],
    titleMain: v["title.main"],
    titleProjectNos: v["title.projectNos"],
    titlePageTitle: v["title.pageTitle"],

    submittedToOrg: v["submittedTo.org"],
    submittedToDepartment: v["submittedTo.department"],
    submittedToAddress: v["submittedTo.address"],
    submittedToWebsite: v["submittedTo.website"],

    consultantName: v["consultant.name"],
    consultantAddress: v["consultant.address"],
    consultantWebsite: v["consultant.website"],

    preparedForName: v["preparedFor.name"],
    preparedForAddress: v["preparedFor.address"],
    preparedForWebsite: v["preparedFor.website"],

    preparedByName: v["preparedBy.name"],
    preparedByAddress: v["preparedBy.address"],
    preparedByWebsite: v["preparedBy.website"],

    documentNumber: v["document.number"],
    documentDate: v["document.date"],
    documentLegal: v["document.legal"],
    mapImage: v["map.image"],
  };
}


