/**
 * @file Report050View.tsx
 * @module report-pages
 * @description View component for Lessons Learned Report
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
import { Report050ViewModel } from "./report-050ViewModel";

interface Report050ViewProps {
  viewModel: Report050ViewModel;
}

export default function Report050View({ viewModel }: Report050ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Lessons Learned Report</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Lessons Learned Report</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Report Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Lessons Section */}
          <Stack gap="md">
            <Text variant="h2">Lessons Learned</Text>
            <Stack gap="md">
              {viewModel.lessons.phase && (
                <Stack gap="xs">
                  <Text strong>Project Phase</Text>
                  <Text>{viewModel.lessons.phase}</Text>
                </Stack>
              )}
              {viewModel.lessons.successes && (
                <Stack gap="xs">
                  <Text strong>Successes</Text>
                  <Text multiline>{viewModel.lessons.successes}</Text>
                </Stack>
              )}
              {viewModel.lessons.challenges && (
                <Stack gap="xs">
                  <Text strong>Challenges</Text>
                  <Text multiline>{viewModel.lessons.challenges}</Text>
                </Stack>
              )}
              {viewModel.lessons.lessons && (
                <Stack gap="xs">
                  <Text strong>Lessons Learned</Text>
                  <Text multiline>{viewModel.lessons.lessons}</Text>
                </Stack>
              )}
              {viewModel.lessons.recommendations && (
                <Stack gap="xs">
                  <Text strong>Recommendations</Text>
                  <Text multiline>{viewModel.lessons.recommendations}</Text>
                </Stack>
              )}
              {viewModel.lessons.team && (
                <Stack gap="xs">
                  <Text strong>Contributing Team Members</Text>
                  <Text multiline>{viewModel.lessons.team}</Text>
                </Stack>
              )}
              {viewModel.lessons.preparedBy && (
                <Stack gap="xs">
                  <Text strong>Prepared By</Text>
                  <Text>{viewModel.lessons.preparedBy}</Text>
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

