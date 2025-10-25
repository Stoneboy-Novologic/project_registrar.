/* app/components/report-pages/GenericConnectedReport.tsx */
"use client";

import React from "react";
import { useEditorStore } from "@/lib/store";
import GenericReportView from "./GenericReportView";
import { buildGenericViewModel } from "./viewModelFactory";
import type { ReportTemplateDB } from "@/lib/types";

interface GenericConnectedReportProps {
  template: ReportTemplateDB;
}

export default function GenericConnectedReport({ template }: GenericConnectedReportProps) {
  console.log("GenericConnectedReport rendering for template:", template.title);
  
  const values = useEditorStore((s) => s.values);
  console.log("GenericConnectedReport values:", values);
  
  // Convert database template format to component format
  const templateForView = {
    pageId: template.pageId,
    title: template.title,
    fields: template.fieldsJson as any[]
  };
  
  return <GenericReportView template={templateForView} values={values} />;
}
