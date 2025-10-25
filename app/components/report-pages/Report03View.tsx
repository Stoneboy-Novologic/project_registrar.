"use client";

import Page from "../report-primitives/Page";
import Section from "../report-primitives/Section";
import Stack from "../report-primitives/Stack";
import Text from "../report-primitives/Text";
import Badge from "../report-primitives/Badge";
import Table from "../report-primitives/Table";
import CheckIcon from "../report-primitives/CheckIcon";
import { Report03Props } from "./report03ViewModel";

export default function Report03View({
  headerRegion,
  headerProjectInfo,
  headerBadge,
  attachmentsData = [],
  authorsData = [],
  contentsData = [],
  footerText,
}: Report03Props) {
  // Console log for debugging component rendering
  console.log("Report03View rendering:", {
    headerRegion,
    headerProjectInfo,
    headerBadge,
    attachmentsCount: attachmentsData.length,
    authorsCount: authorsData.length,
    contentsCount: contentsData.length,
    footerText,
  });

  // Prepare attachments table data
  const attachmentsTableData = attachmentsData.map((item) => ({
    checked: item.checked ? <CheckIcon size="sm" /> : <span className="text-gray-400">-</span>,
    description: item.description,
  }));

  // Prepare authors table data
  const authorsTableData = authorsData.map((item) => ({
    name: (
      <div>
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm text-gray-600">{item.title}</div>
        <div className="text-sm text-gray-600">{item.email}</div>
        <div className="text-sm text-gray-600">{item.phone}</div>
      </div>
    ),
    role: (
      <div className="text-sm">
        {item.role.split(", ").map((role, index) => (
          <div key={index}>{role}</div>
        ))}
      </div>
    ),
  }));

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
        {/* Two-column section: Attachments and Authors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left column - List of Attachments */}
          <div>
            <Stack gap="md">
              <Text variant="h2" className="text-xl font-bold text-blue-600">
                List of Attachments in the File
              </Text>
              
              {attachmentsTableData.length > 0 ? (
                <Table
                  headers={[
                    { key: "checked", label: "", className: "w-12" },
                    { key: "description", label: "", className: "w-full" },
                  ]}
                  rows={attachmentsTableData}
                  variant="attachments"
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Text className="text-gray-500 text-center">
                    No attachments data available
                  </Text>
                </div>
              )}
            </Stack>
          </div>

          {/* Right column - Authors */}
          <div>
            <Stack gap="md">
              <Text variant="h2" className="text-xl font-bold text-blue-600 text-right">
                Authors
              </Text>
              
              {authorsTableData.length > 0 ? (
                <Table
                  headers={[
                    { key: "name", label: "Name", className: "w-1/2" },
                    { key: "role", label: "Role", className: "w-1/2" },
                  ]}
                  rows={authorsTableData}
                  variant="authors"
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Text className="text-gray-500 text-center">
                    No authors data available
                  </Text>
                </div>
              )}
            </Stack>
          </div>
        </div>

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

      {/* Footer */}
      {footerText && (
        <div className="border-t border-gray-300 bg-white">
          <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-2">
            <Text className="text-xs text-gray-500">{footerText}</Text>
          </div>
        </div>
      )}
    </div>
  );
}
