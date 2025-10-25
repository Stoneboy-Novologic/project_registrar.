"use client";

import Page from "../report-primitives/Page";
import Section from "../report-primitives/Section";
import Stack from "../report-primitives/Stack";
import Text from "../report-primitives/Text";
import Badge from "../report-primitives/Badge";
import Table from "../report-primitives/Table";
import { Report05Props } from "./report05ViewModel";

export default function Report05View({
  headerRegion,
  headerProjectInfo,
  headerBadge,
  overviewParagraph1,
  overviewParagraph2,
  overviewParagraph3,
  stakeholder1Org,
  stakeholder1Website,
  stakeholder1Role,
  stakeholder1ProjectNo,
  stakeholder2Org,
  stakeholder2Website,
  stakeholder2Role,
  stakeholder2ProjectNo,
  stakeholder3Org,
  stakeholder3Website,
  stakeholder3Role,
  stakeholder3ProjectNo,
  stakeholder4Org,
  stakeholder4Website,
  stakeholder4Role,
  stakeholder4ProjectNo,
  stakeholder5Org,
  stakeholder5Website,
  stakeholder5Role,
  stakeholder5ProjectNo,
  stakeholder6Org,
  stakeholder6Website,
  stakeholder6Role,
  stakeholder6ProjectNo,
  contractSummaryBullet1,
  contractSummaryBullet2,
  contractSummaryBullet3,
  contractSummaryBullet4,
}: Report05Props) {
  // Console log for debugging component rendering
  console.log("Report05View rendering:", {
    headerRegion,
    headerProjectInfo,
    headerBadge,
    hasOverview: !!overviewParagraph1,
    hasStakeholders: !!stakeholder1Org,
    hasContractSummary: !!contractSummaryBullet1,
  });

  // Prepare stakeholder table data
  const stakeholderRows = [
    { org: stakeholder1Org, website: stakeholder1Website, role: stakeholder1Role, projectNo: stakeholder1ProjectNo },
    { org: stakeholder2Org, website: stakeholder2Website, role: stakeholder2Role, projectNo: stakeholder2ProjectNo },
    { org: stakeholder3Org, website: stakeholder3Website, role: stakeholder3Role, projectNo: stakeholder3ProjectNo },
    { org: stakeholder4Org, website: stakeholder4Website, role: stakeholder4Role, projectNo: stakeholder4ProjectNo },
    { org: stakeholder5Org, website: stakeholder5Website, role: stakeholder5Role, projectNo: stakeholder5ProjectNo },
    { org: stakeholder6Org, website: stakeholder6Website, role: stakeholder6Role, projectNo: stakeholder6ProjectNo },
  ];

  const stakeholderTableData = stakeholderRows
    .filter((row) => row.org) // Only include rows with organization names
    .map((row) => ({
      organization: (
        <div>
          <div className="font-semibold">{row.org}</div>
          {row.website && (
            <div className="text-sm text-gray-600">
              <a href={`https://${row.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {row.website}
              </a>
            </div>
          )}
        </div>
      ),
      role: row.role || "",
      projectNo: row.projectNo || "",
    }));

  // Render HTML content (for bold/italic formatting)
  const renderHTMLContent = (content?: string) => {
    if (!content) return null;
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <div>
              <Text variant="breadcrumb">{headerRegion}</Text>
              <Text className="text-sm text-gray-600 mt-1">{headerProjectInfo}</Text>
            </div>
            {headerBadge && <Badge>{headerBadge}</Badge>}
          </Section>
        </div>
      </div>

      {/* Main content area */}
      <Page>
        <Stack gap="lg">
          {/* Section I - OVERVIEW */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Text className="text-6xl font-bold text-gray-300">I</Text>
              <Text variant="h2" className="text-2xl font-bold text-blue-600">
                OVERVIEW
              </Text>
            </div>

            {/* Introduction Paragraphs */}
            <Stack gap="md" className="ml-8">
              {overviewParagraph1 && (
                <div className="text-gray-700">
                  {renderHTMLContent(overviewParagraph1)}
                </div>
              )}
              {overviewParagraph2 && (
                <div className="text-gray-700">
                  {renderHTMLContent(overviewParagraph2)}
                </div>
              )}
              {overviewParagraph3 && (
                <div className="text-gray-700">
                  {renderHTMLContent(overviewParagraph3)}
                </div>
              )}
            </Stack>

            {/* Table 1.1 - Select List of Project Stakeholders */}
            {stakeholderTableData.length > 0 && (
              <div className="mt-6">
                <div className="mb-2 flex items-center gap-2">
                  <Text className="font-bold text-gray-800">Table 1.1</Text>
                  <Text className="font-bold text-center text-gray-800">
                    Select List of Project Stakeholders
                  </Text>
                </div>
                <Table
                  headers={[
                    { key: "organization", label: "Organization", className: "w-2/5" },
                    { key: "role", label: "Role in Project", className: "w-2/5" },
                    { key: "projectNo", label: "Project No. at Organization", className: "w-1/5" },
                  ]}
                  rows={stakeholderTableData}
                  variant="attachments"
                />
              </div>
            )}
          </div>

          {/* Contract Summary - Scope Section */}
          {(contractSummaryBullet1 || contractSummaryBullet2 || contractSummaryBullet3 || contractSummaryBullet4) && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Text className="text-gray-700">•</Text>
                <Text variant="h2" className="text-lg font-bold">
                  Contract Summary - Scope
                </Text>
              </div>

              <Stack gap="sm" className="ml-6">
                {contractSummaryBullet1 && (
                  <div className="text-gray-700">
                    {renderHTMLContent(contractSummaryBullet1)}
                  </div>
                )}
                {contractSummaryBullet2 && (
                  <div className="text-gray-700">
                    {renderHTMLContent(contractSummaryBullet2)}
                  </div>
                )}
                {contractSummaryBullet3 && (
                  <div className="text-gray-700">
                    {renderHTMLContent(contractSummaryBullet3)}
                  </div>
                )}
                {contractSummaryBullet4 && (
                  <div className="text-gray-700">
                    {renderHTMLContent(contractSummaryBullet4)}
                  </div>
                )}
              </Stack>
            </div>
          )}
        </Stack>
      </Page>
    </div>
  );
}
