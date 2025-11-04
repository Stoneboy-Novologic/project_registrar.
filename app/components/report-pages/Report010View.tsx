/**
 * @file Report010View.tsx
 * @module report-pages
 * @description View component for Quality Control Checklist
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
import { Report010ViewModel } from "./report-010ViewModel";

interface Report010ViewProps {
  viewModel: Report010ViewModel;
}

export default function Report010View({ viewModel }: Report010ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Quality Control Checklist</Text>
            <Badge>quality-control</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Quality Control Checklist</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.location && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Location:</Text>
                  <Text>{viewModel.header.location}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Inspection Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* QC Section */}
          <Stack gap="md">
            <Text variant="h2">Quality Control</Text>
            <Stack gap="md">
              {viewModel.qc.concrete && (
                <Stack gap="xs">
                  <Text strong>Concrete Quality</Text>
                  <Text multiline>{viewModel.qc.concrete}</Text>
                </Stack>
              )}
              {viewModel.qc.reinforcement && (
                <Stack gap="xs">
                  <Text strong>Reinforcement Check</Text>
                  <Text multiline>{viewModel.qc.reinforcement}</Text>
                </Stack>
              )}
              {viewModel.qc.dimensions && (
                <Stack gap="xs">
                  <Text strong>Dimensional Accuracy</Text>
                  <Text multiline>{viewModel.qc.dimensions}</Text>
                </Stack>
              )}
              {viewModel.qc.finish && (
                <Stack gap="xs">
                  <Text strong>Surface Finish</Text>
                  <Text multiline>{viewModel.qc.finish}</Text>
                </Stack>
              )}
              {viewModel.qc.testing && (
                <Stack gap="xs">
                  <Text strong>Test Results</Text>
                  <Text multiline>{viewModel.qc.testing}</Text>
                </Stack>
              )}
              {viewModel.qc.nonConformances && (
                <Stack gap="xs">
                  <Text strong>Non-Conformances</Text>
                  <Text multiline>{viewModel.qc.nonConformances}</Text>
                </Stack>
              )}
              {viewModel.qc.corrective && (
                <Stack gap="xs">
                  <Text strong>Corrective Actions</Text>
                  <Text multiline>{viewModel.qc.corrective}</Text>
                </Stack>
              )}
              {viewModel.qc.inspector && (
                <Stack gap="xs">
                  <Text strong>QC Inspector</Text>
                  <Text>{viewModel.qc.inspector}</Text>
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

