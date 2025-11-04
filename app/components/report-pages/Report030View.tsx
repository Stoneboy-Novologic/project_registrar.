/**
 * @file Report030View.tsx
 * @module report-pages
 * @description View component for Resource Allocation Summary
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
import { Report030ViewModel } from "./report-030ViewModel";

interface Report030ViewProps {
  viewModel: Report030ViewModel;
}

export default function Report030View({ viewModel }: Report030ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Resource Allocation Summary</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Resource Allocation Summary</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.period && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Reporting Period:</Text>
                  <Text>{viewModel.header.period}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Resource Section */}
          <Stack gap="md">
            <Text variant="h2">Resource Allocation</Text>
            <Stack gap="md">
              {viewModel.resource.labor && (
                <Stack gap="xs">
                  <Text strong>Labor Allocation</Text>
                  <Text multiline>{viewModel.resource.labor}</Text>
                </Stack>
              )}
              {viewModel.resource.equipment && (
                <Stack gap="xs">
                  <Text strong>Equipment Allocation</Text>
                  <Text multiline>{viewModel.resource.equipment}</Text>
                </Stack>
              )}
              {viewModel.resource.materials && (
                <Stack gap="xs">
                  <Text strong>Material Allocation</Text>
                  <Text multiline>{viewModel.resource.materials}</Text>
                </Stack>
              )}
              {viewModel.resource.utilization && (
                <Stack gap="xs">
                  <Text strong>Resource Utilization</Text>
                  <Text multiline>{viewModel.resource.utilization}</Text>
                </Stack>
              )}
              {viewModel.resource.shortages && (
                <Stack gap="xs">
                  <Text strong>Resource Shortages</Text>
                  <Text multiline>{viewModel.resource.shortages}</Text>
                </Stack>
              )}
              {viewModel.resource.recommendations && (
                <Stack gap="xs">
                  <Text strong>Recommendations</Text>
                  <Text multiline>{viewModel.resource.recommendations}</Text>
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

