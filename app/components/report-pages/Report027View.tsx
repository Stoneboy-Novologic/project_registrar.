/**
 * @file Report027View.tsx
 * @module report-pages
 * @description View component for Risk Assessment Register
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
import { Report027ViewModel } from "./report-027ViewModel";

interface Report027ViewProps {
  viewModel: Report027ViewModel;
}

export default function Report027View({ viewModel }: Report027ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Risk Assessment Register</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Risk Assessment Register</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Assessment Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Risk Section */}
          <Stack gap="md">
            <Text variant="h2">Risk Assessment</Text>
            <Stack gap="md">
              {viewModel.risk.identified && (
                <Stack gap="xs">
                  <Text strong>Identified Risks</Text>
                  <Text multiline>{viewModel.risk.identified}</Text>
                </Stack>
              )}
              {viewModel.risk.probability && (
                <Stack gap="xs">
                  <Text strong>Probability Assessment</Text>
                  <Text multiline>{viewModel.risk.probability}</Text>
                </Stack>
              )}
              {viewModel.risk.impact && (
                <Stack gap="xs">
                  <Text strong>Impact Assessment</Text>
                  <Text multiline>{viewModel.risk.impact}</Text>
                </Stack>
              )}
              {viewModel.risk.mitigation && (
                <Stack gap="xs">
                  <Text strong>Mitigation Strategies</Text>
                  <Text multiline>{viewModel.risk.mitigation}</Text>
                </Stack>
              )}
              {viewModel.risk.owner && (
                <Stack gap="xs">
                  <Text strong>Risk Owner</Text>
                  <Text>{viewModel.risk.owner}</Text>
                </Stack>
              )}
              {viewModel.risk.status && (
                <Stack gap="xs">
                  <Text strong>Risk Status</Text>
                  <Text>{viewModel.risk.status}</Text>
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

