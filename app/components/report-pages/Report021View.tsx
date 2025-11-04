/**
 * @file Report021View.tsx
 * @module report-pages
 * @description View component for Environmental Compliance
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
import { Report021ViewModel } from "./report-021ViewModel";

interface Report021ViewProps {
  viewModel: Report021ViewModel;
}

export default function Report021View({ viewModel }: Report021ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Environmental Compliance</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Environmental Compliance</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Date:</Text>
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

          {/* Environmental Section */}
          <Stack gap="md">
            <Text variant="h2">Environmental Monitoring</Text>
            <Stack gap="md">
              {viewModel.env.noise && (
                <Stack gap="xs">
                  <Text strong>Noise Levels</Text>
                  <Text multiline>{viewModel.env.noise}</Text>
                </Stack>
              )}
              {viewModel.env.dust && (
                <Stack gap="xs">
                  <Text strong>Dust Control</Text>
                  <Text multiline>{viewModel.env.dust}</Text>
                </Stack>
              )}
              {viewModel.env.water && (
                <Stack gap="xs">
                  <Text strong>Water Management</Text>
                  <Text multiline>{viewModel.env.water}</Text>
                </Stack>
              )}
              {viewModel.env.waste && (
                <Stack gap="xs">
                  <Text strong>Waste Management</Text>
                  <Text multiline>{viewModel.env.waste}</Text>
                </Stack>
              )}
              {viewModel.env.wildlife && (
                <Stack gap="xs">
                  <Text strong>Wildlife Protection</Text>
                  <Text multiline>{viewModel.env.wildlife}</Text>
                </Stack>
              )}
              {viewModel.env.compliance && (
                <Stack gap="xs">
                  <Text strong>Compliance Status</Text>
                  <Text multiline>{viewModel.env.compliance}</Text>
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
