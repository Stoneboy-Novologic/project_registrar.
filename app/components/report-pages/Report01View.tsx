"use client";

import Page from "../report-primitives/Page";
import Section from "../report-primitives/Section";
import Stack from "../report-primitives/Stack";
import Text from "../report-primitives/Text";
import Badge from "../report-primitives/Badge";
import Rule from "../report-primitives/Rule";

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
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">{headerBreadcrumb}</Text>
            {headerBadge && <Badge>{headerBadge}</Badge>}
          </Section>
        </div>
      </div>

      {/* Main content area */}
      <Page>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[500px]">
          {/* Left column - main content (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Title section */}
            <Stack gap="sm" className="mb-4">
              <Text variant="h1">{titleMain}</Text>
              <Text variant="subtitle">{titleProjectNos}</Text>
            </Stack>

            <Rule />

            {/* Project Register section */}
            <Stack gap="md" className="mt-4">
              <Text variant="h2">{titlePageTitle}</Text>

              {/* Submitted To */}
              <Stack gap="xs">
                <Text variant="h2" className="text-lg">
                  Submitted To
                </Text>
                <Stack gap="xs" className="ml-4">
                  <Text strong>{submittedToOrg}</Text>
                  <Text>{submittedToDepartment}</Text>
                  <Text>{submittedToAddress}</Text>
                  {submittedToWebsite && (
                    <Text link>
                      <a href={`https://${submittedToWebsite}`} target="_blank" rel="noopener noreferrer">
                        {submittedToWebsite}
                      </a>
                    </Text>
                  )}
                </Stack>
              </Stack>

              {/* Consultant (Jacobs) */}
              <Stack gap="xs">
                <Text strong>{consultantName}</Text>
                <Stack gap="xs" className="ml-4">
                  <Text>{consultantAddress}</Text>
                  {consultantWebsite && (
                    <Text link>
                      <a href={`https://${consultantWebsite}`} target="_blank" rel="noopener noreferrer">
                        {consultantWebsite}
                      </a>
                    </Text>
                  )}
                </Stack>
              </Stack>

              {/* Prepared For */}
              <Stack gap="xs">
                <Text variant="h2" className="text-lg">
                  Prepared For
                </Text>
                <Stack gap="xs" className="ml-4">
                  <Text strong>{preparedForName}</Text>
                  <Text>{preparedForAddress}</Text>
                  {preparedForWebsite && (
                    <Text link>
                      <a href={`https://${preparedForWebsite}`} target="_blank" rel="noopener noreferrer">
                        {preparedForWebsite}
                      </a>
                    </Text>
                  )}
                </Stack>
              </Stack>

              {/* Prepared By */}
              <Stack gap="xs">
                <Text variant="h2" className="text-lg">
                  Prepared By
                </Text>
                <Stack gap="xs" className="ml-4">
                  <Text strong>{preparedByName}</Text>
                  <Text>{preparedByAddress}</Text>
                  {preparedByWebsite && (
                    <Text link>
                      <a href={`https://${preparedByWebsite}`} target="_blank" rel="noopener noreferrer">
                        {preparedByWebsite}
                      </a>
                    </Text>
                  )}
                </Stack>
              </Stack>

              {/* Document info */}
              <Stack gap="xs">
                <Text variant="h2" className="text-lg">
                  Document Number and Date
                </Text>
                <Section align="center" justify="start" className="gap-4">
                  <Text strong>{documentNumber}</Text>
                  <Text>|</Text>
                  <Text>{documentDate}</Text>
                </Section>
                <Text className="text-xs">{documentLegal}</Text>
              </Stack>
            </Stack>
          </div>

          {/* Right column - map image (1/3 width) */}
          <div className="lg:col-span-1 flex items-center justify-center min-h-[500px]">
            {mapImage && (
              <div className="w-full">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-md">
                  <Text className="text-sm font-semibold mb-2 text-gray-700 text-center">
                    Project Map
                  </Text>
                  <img
                    src={mapImage || "/placeholder.svg"}
                    alt="Project Map"
                    className="w-full h-auto border border-gray-300 rounded shadow-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Page>

      <div className="border-t border-gray-300 bg-white h-8" />
    </div>
  );
}


