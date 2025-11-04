/**
 * @file Report022View.tsx
 * @module report-pages
 * @description View component for Subcontractor Performance
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
import { Report022ViewModel } from "./report-022ViewModel";

interface Report022ViewProps {
  viewModel: Report022ViewModel;
}

export default function Report022View({ viewModel }: Report022ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Subcontractor Performance</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Subcontractor Performance</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.subcontractor && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Subcontractor:</Text>
                  <Text>{viewModel.header.subcontractor}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Performance Section */}
          <Stack gap="md">
            <Text variant="h2">Performance Evaluation</Text>
            <Stack gap="md">
              {viewModel.perf.workQuality && (
                <Stack gap="xs">
                  <Text strong>Work Quality</Text>
                  <Text multiline>{viewModel.perf.workQuality}</Text>
                </Stack>
              )}
              {viewModel.perf.schedule && (
                <Stack gap="xs">
                  <Text strong>Schedule Adherence</Text>
                  <Text multiline>{viewModel.perf.schedule}</Text>
                </Stack>
              )}
              {viewModel.perf.safety && (
                <Stack gap="xs">
                  <Text strong>Safety Compliance</Text>
                  <Text multiline>{viewModel.perf.safety}</Text>
                </Stack>
              )}
              {viewModel.perf.communication && (
                <Stack gap="xs">
                  <Text strong>Communication</Text>
                  <Text multiline>{viewModel.perf.communication}</Text>
                </Stack>
              )}
              {viewModel.perf.issues && (
                <Stack gap="xs">
                  <Text strong>Issues/Concerns</Text>
                  <Text multiline>{viewModel.perf.issues}</Text>
                </Stack>
              )}
              {viewModel.perf.recommendations && (
                <Stack gap="xs">
                  <Text strong>Recommendations</Text>
                  <Text multiline>{viewModel.perf.recommendations}</Text>
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
