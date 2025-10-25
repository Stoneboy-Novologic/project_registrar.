/* app/reports/[id]/edit/page.tsx */
import ReportEditor from "@/app/components/reports/ReportEditor";

interface ReportEditorPageProps {
  params: {
    id: string;
  };
}

export default function ReportEditorPage({ params }: ReportEditorPageProps) {
  return <ReportEditor reportId={params.id} />;
}
