/**
 * @file Report029View.tsx
 * @module report-pages
 * @description View component for Project Milestone Report
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
import { Report029ViewModel } from "./report-029ViewModel";

interface Report029ViewProps {
  viewModel: Report029ViewModel;
}

export default function Report029View({ viewModel }: Report029ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Project Milestone Report</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Project Milestone Report</Text>
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

          {/* Milestone Section */}
          <Stack gap="md">
            <Text variant="h2">Milestone Information</Text>
            <Stack gap="md">
              {viewModel.milestone.name && (
                <Stack gap="xs">
                  <Text strong>Milestone Name</Text>
                  <Text>{viewModel.milestone.name}</Text>
                </Stack>
              )}
              {viewModel.milestone.planned && (
                <Stack gap="xs">
                  <Text strong>Planned Date</Text>
                  <Text>{viewModel.milestone.planned}</Text>
                </Stack>
              )}
              {viewModel.milestone.actual && (
                <Stack gap="xs">
                  <Text strong>Actual Date</Text>
                  <Text>{viewModel.milestone.actual}</Text>
                </Stack>
              )}
              {viewModel.milestone.status && (
                <Stack gap="xs">
                  <Text strong>Milestone Status</Text>
                  <Text>{viewModel.milestone.status}</Text>
                </Stack>
              )}
              {viewModel.milestone.description && (
                <Stack gap="xs">
                  <Text strong>Milestone Description</Text>
                  <Text multiline>{viewModel.milestone.description}</Text>
                </Stack>
              )}
              {viewModel.milestone.achievements && (
                <Stack gap="xs">
                  <Text strong>Key Achievements</Text>
                  <Text multiline>{viewModel.milestone.achievements}</Text>
                </Stack>
              )}
              {viewModel.milestone.issues && (
                <Stack gap="xs">
                  <Text strong>Issues Encountered</Text>
                  <Text multiline>{viewModel.milestone.issues}</Text>
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

