/* app/components/report/report01-view.tsx */
"use client";

import Page from "@/app/components/report/page";
import Text from "@/app/components/report/text";
import Stack from "@/app/components/report/stack";
import Section from "@/app/components/report/section";
import Rule from "@/app/components/report/rule";
import Badge from "@/app/components/report/badge";

export interface Report01Props {
  headerBreadcrumb?: string;
  headerBadge?: string;
  titleMain?: string;
  titleProjectNos?: string;
  titlePageTitle?: string;

  submittedToOrg?: string;
  submittedToDepartment?: string;
  submittedToAddress?: string;
  submittedToWebsite?: string;

  consultantName?: string;
  consultantAddress?: string;
  consultantWebsite?: string;

  preparedForName?: string;
  preparedForAddress?: string;
  preparedForWebsite?: string;

  preparedByName?: string;
  preparedByAddress?: string;
  preparedByWebsite?: string;

  documentNumber?: string;
  documentDate?: string;
  documentLegal?: string;

  mapImage?: string;
}

export default function Report01View({
  headerBreadcrumb,
  headerBadge,
  titleMain,
  titleProjectNos,
  titlePageTitle,
  submittedToOrg,
  submittedToDepartment,
  submittedToAddress,
  submittedToWebsite,
  consultantName,
  consultantAddress,
  consultantWebsite,
  preparedForName,
  preparedForAddress,
  preparedForWebsite,
  preparedByName,
  preparedByAddress,
  preparedByWebsite,
  documentNumber,
  documentDate,
  documentLegal,
  mapImage,
}: Report01Props) {
  // Default sample placeholders when values are missing
  const sample = {
    headerBreadcrumb:
      "Region of Peel EBW-C1 (East Brampton Watermain - Contract I) | Project No. 14-1240, 14-1256, and 14-1257",
    headerBadge: "Stoneboy",
    titleMain: "East Brampton Watermain - Contract I",
    titleProjectNos: "Project No. 14-1240, 14-1256, and 14-1257",
    titlePageTitle: "Project Register",
    submittedToOrg: "Region of Peel",
    submittedToDepartment: "Public Works",
    submittedToAddress: "10 Peel Centre Dr, Suite B, Brampton, Ontario L6T 4B9",
    submittedToWebsite: "peelregion.ca",
    consultantName: "Jacobs",
    consultantAddress: "245 Consumers Road Suite 400, Toronto, Ontario M2J 1R3",
    consultantWebsite: "jacobs.com",
    preparedForName: "C&M McNally Engineering Corp.",
    preparedForAddress: "4380 South Service Road Suite I, Burlington, Ontario L7L 5Y6",
    preparedForWebsite: "mcnally.ca",
    preparedByName: "Stoneboy",
    preparedByAddress: "120 Eglinton Ave E Suite 800, Toronto, Ontario M4P 1E2",
    preparedByWebsite: "stoneboy.co",
    documentNumber: "32.1_6-C_PR_v1",
    documentDate: "2025-03-18",
    documentLegal: "© 2025, Stoneboy. Privileged & Confidential",
  } as const;

  const _headerBreadcrumb = headerBreadcrumb ?? sample.headerBreadcrumb;
  const _headerBadge = headerBadge ?? sample.headerBadge;
  const _titleMain = titleMain ?? sample.titleMain;
  const _titleProjectNos = titleProjectNos ?? sample.titleProjectNos;
  const _titlePageTitle = titlePageTitle ?? sample.titlePageTitle;
  const _submittedToOrg = submittedToOrg ?? sample.submittedToOrg;
  const _submittedToDepartment = submittedToDepartment ?? sample.submittedToDepartment;
  const _submittedToAddress = submittedToAddress ?? sample.submittedToAddress;
  const _submittedToWebsite = submittedToWebsite ?? sample.submittedToWebsite;
  const _consultantName = consultantName ?? sample.consultantName;
  const _consultantAddress = consultantAddress ?? sample.consultantAddress;
  const _consultantWebsite = consultantWebsite ?? sample.consultantWebsite;
  const _preparedForName = preparedForName ?? sample.preparedForName;
  const _preparedForAddress = preparedForAddress ?? sample.preparedForAddress;
  const _preparedForWebsite = preparedForWebsite ?? sample.preparedForWebsite;
  const _preparedByName = preparedByName ?? sample.preparedByName;
  const _preparedByAddress = preparedByAddress ?? sample.preparedByAddress;
  const _preparedByWebsite = preparedByWebsite ?? sample.preparedByWebsite;
  const _documentNumber = documentNumber ?? sample.documentNumber;
  const _documentDate = documentDate ?? sample.documentDate;
  const _documentLegal = documentLegal ?? sample.documentLegal;
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">{_headerBreadcrumb}</Text>
            {_headerBadge && <Badge>{_headerBadge}</Badge>}
          </Section>
        </div>
      </div>

      {/* Main content area */}
      <Page>
        <div className="flex gap-8">
          {/* Left column - main content */}
          <div className="flex-1">
            {/* Title section */}
            <Stack gap="md" className="mb-8">
            <Text variant="h1">{_titleMain}</Text>
            <Text variant="subtitle">{_titleProjectNos}</Text>
            </Stack>

            <Rule />

            {/* Project Register section */}
            <Stack gap="lg" className="mt-8">
            <Text variant="h2">{_titlePageTitle}</Text>

              {/* Submitted To */}
              <Stack gap="sm">
                <Text variant="h2" className="text-lg">
                  Submitted To
                </Text>
                <Stack gap="xs" className="ml-6">
                  <Text strong>{_submittedToOrg}</Text>
                  <Text>{_submittedToDepartment}</Text>
                  <Text>{_submittedToAddress}</Text>
                  {_submittedToWebsite && (
                    <Text link>
                      <a href={`https://${_submittedToWebsite}`} target="_blank" rel="noopener noreferrer">
                        {_submittedToWebsite}
                      </a>
                    </Text>
                  )}
                </Stack>
              </Stack>

              {/* Consultant (Jacobs) */}
              <Stack gap="sm">
                <Text strong>{_consultantName}</Text>
                <Stack gap="xs" className="ml-6">
                  <Text>{_consultantAddress}</Text>
                  {_consultantWebsite && (
                    <Text link>
                      <a href={`https://${_consultantWebsite}`} target="_blank" rel="noopener noreferrer">
                        {_consultantWebsite}
                      </a>
                    </Text>
                  )}
                </Stack>
              </Stack>

              {/* Prepared For */}
              <Stack gap="sm">
                <Text variant="h2" className="text-lg">
                  Prepared For
                </Text>
                <Stack gap="xs" className="ml-6">
                  <Text strong>{_preparedForName}</Text>
                  <Text>{_preparedForAddress}</Text>
                  {_preparedForWebsite && (
                    <Text link>
                      <a href={`https://${_preparedForWebsite}`} target="_blank" rel="noopener noreferrer">
                        {_preparedForWebsite}
                      </a>
                    </Text>
                  )}
                </Stack>
              </Stack>

              {/* Prepared By */}
              <Stack gap="sm">
                <Text variant="h2" className="text-lg">
                  Prepared By
                </Text>
                <Stack gap="xs" className="ml-6">
                  <Text strong>{_preparedByName}</Text>
                  <Text>{_preparedByAddress}</Text>
                  {_preparedByWebsite && (
                    <Text link>
                      <a href={`https://${_preparedByWebsite}`} target="_blank" rel="noopener noreferrer">
                        {_preparedByWebsite}
                      </a>
                    </Text>
                  )}
                </Stack>
              </Stack>

              {/* Document info */}
              <Stack gap="sm">
                <Text variant="h2" className="text-lg">
                  Document Number and Date
                </Text>
                <Section align="center" justify="start" className="gap-4">
                  <Text strong>{_documentNumber}</Text>
                  <Text>|</Text>
                  <Text>{_documentDate}</Text>
                </Section>
                <Text className="text-xs">{_documentLegal}</Text>
              </Stack>
            </Stack>
          </div>

          <div className="flex gap-4">
            {/* Map image */}
            {mapImage && (
              <div className="flex-shrink-0">
                <img
                  src={mapImage || "/placeholder.svg"}
                  alt="Project Map"
                  className="w-80 h-auto border border-gray-300 rounded"
                />
              </div>
            )}

            <div className="flex flex-col gap-4 items-center py-8">
              {/* Pen/Edit icon */}
              <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>

              {/* Plus icon */}
              <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              {/* Smiley/Feedback icon */}
              <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </button>

              {/* Image/Gallery icon */}
              <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Page>

      <div className="border-t border-gray-300 bg-white h-8" />
    </div>
  );
}


