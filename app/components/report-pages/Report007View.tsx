/**
 * @file Report007View.tsx
 * @module report-pages
 * @description View component for Daily Progress Report
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
import { Report007ViewModel } from "./report-007ViewModel";

interface Report007ViewProps {
  viewModel: Report007ViewModel;
}

export default function Report007View({ viewModel }: Report007ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Daily Progress Report</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Daily Progress Report</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Report Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Progress Section */}
          <Stack gap="md">
            <Text variant="h2">Progress</Text>
            <Stack gap="md">
              {viewModel.progress.weather && (
                <Stack gap="xs">
                  <Text strong>Weather Conditions</Text>
                  <Text>{viewModel.progress.weather}</Text>
                </Stack>
              )}
              {viewModel.progress.workCompleted && (
                <Stack gap="xs">
                  <Text strong>Work Completed</Text>
                  <Text multiline>{viewModel.progress.workCompleted}</Text>
                </Stack>
              )}
              {viewModel.progress.workPlanned && (
                <Stack gap="xs">
                  <Text strong>Work Planned</Text>
                  <Text multiline>{viewModel.progress.workPlanned}</Text>
                </Stack>
              )}
              {viewModel.progress.issues && (
                <Stack gap="xs">
                  <Text strong>Issues/Concerns</Text>
                  <Text multiline>{viewModel.progress.issues}</Text>
                </Stack>
              )}
              {viewModel.progress.materials && (
                <Stack gap="xs">
                  <Text strong>Materials Used</Text>
                  <Text multiline>{viewModel.progress.materials}</Text>
                </Stack>
              )}
              {viewModel.progress.labor && (
                <Stack gap="xs">
                  <Text strong>Labor Hours</Text>
                  <Text>{viewModel.progress.labor}</Text>
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

