"use client";

import Page from "../report-primitives/Page";
import Section from "../report-primitives/Section";
import Stack from "../report-primitives/Stack";
import Text from "../report-primitives/Text";
import Badge from "../report-primitives/Badge";
import Table from "../report-primitives/Table";
import { Report04Props } from "./report04ViewModel";

export default function Report04View({
  headerRegion,
  headerProjectInfo,
  headerBadge,
  contentsData = [],
}: Report04Props) {
  // Console log for debugging component rendering
  console.log("Report04View rendering:", {
    headerRegion,
    headerProjectInfo,
    headerBadge,
    contentsCount: contentsData.length,
  });

  // Prepare contents table data
  const contentsTableData = contentsData.map((item) => ({
    section: item.section,
    item: (
      <span className={item.bold ? "font-semibold" : ""}>
        {item.item}
      </span>
    ),
    description: item.description,
    note: item.note,
    page: (
      <span className={item.bold ? "font-semibold" : ""}>
        {item.page}
      </span>
    ),
    // Add formatting flags for table styling
    highlighted: item.highlighted,
    indented: item.indented,
  }));

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
        {/* Full-width Contents section */}
        <div>
          <Stack gap="md">
            <Text variant="h2" className="text-xl font-bold text-blue-600">
              Contents
            </Text>
            
            {contentsTableData.length > 0 ? (
              <Table
                headers={[
                  { key: "section", label: "Section", className: "w-16" },
                  { key: "item", label: "Item", className: "w-1/3" },
                  { key: "description", label: "Description", className: "w-1/3" },
                  { key: "note", label: "Note", className: "w-1/6" },
                  { key: "page", label: "Page", className: "w-16" },
                ]}
                rows={contentsTableData}
                variant="contents"
              />
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Text className="text-gray-500 text-center">
                  No contents data available
                </Text>
              </div>
            )}
          </Stack>
        </div>
      </Page>
    </div>
  );
}
