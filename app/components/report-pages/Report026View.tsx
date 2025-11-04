/**
 * @file Report026View.tsx
 * @module report-pages
 * @description View component for Project Schedule Update
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";

import Page from "../report-primitives/Page";
import Section from "../report-primitives/Section";
import Stack from "../report-primitives/Stack";
import Text from "../report-primitives/Text";
import Badge from "../report-primitives/Badge";
import Rule from "../report-primitives/Rule";
import { Report026ViewModel } from "./report-026ViewModel";

interface Report026ViewProps {
  viewModel: Report026ViewModel;
}

export default function Report026View({ viewModel }: Report026ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Project Schedule Update</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Project Schedule Update</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Update Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Schedule Section */}
          <Stack gap="md">
            <Text variant="h2">Schedule Information</Text>
            <Stack gap="md">
              {viewModel.schedule.original && (
                <Stack gap="xs">
                  <Text strong>Original Schedule</Text>
                  <Text>{viewModel.schedule.original}</Text>
                </Stack>
              )}
              {viewModel.schedule.current && (
                <Stack gap="xs">
                  <Text strong>Current Schedule</Text>
                  <Text>{viewModel.schedule.current}</Text>
                </Stack>
              )}
              {viewModel.schedule.changes && (
                <Stack gap="xs">
                  <Text strong>Schedule Changes</Text>
                  <Text multiline>{viewModel.schedule.changes}</Text>
                </Stack>
              )}
              {viewModel.schedule.impact && (
                <Stack gap="xs">
                  <Text strong>Impact Analysis</Text>
                  <Text multiline>{viewModel.schedule.impact}</Text>
                </Stack>
              )}
              {viewModel.schedule.mitigation && (
                <Stack gap="xs">
                  <Text strong>Mitigation Plans</Text>
                  <Text multiline>{viewModel.schedule.mitigation}</Text>
                </Stack>
              )}
              {viewModel.schedule.preparer && (
                <Stack gap="xs">
                  <Text strong>Prepared By</Text>
                  <Text>{viewModel.schedule.preparer}</Text>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Page>

      {/* Footer */}
      <div className="border-t border-gray-300 bg-white h-8" />
    </div>
  );
}

