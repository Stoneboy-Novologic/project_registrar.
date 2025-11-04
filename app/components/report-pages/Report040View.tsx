/**
 * @file Report040View.tsx
 * @module report-pages
 * @description View component for Vendor Performance Review
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
import { Report040ViewModel } from "./report-040ViewModel";

interface Report040ViewProps {
  viewModel: Report040ViewModel;
}

export default function Report040View({ viewModel }: Report040ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Vendor Performance Review</Text>
            <Badge>financial</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Vendor Performance Review</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Review Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.vendor && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Vendor:</Text>
                  <Text>{viewModel.header.vendor}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Performance Section */}
          <Stack gap="md">
            <Text variant="h2">Performance Evaluation</Text>
            <Stack gap="md">
              {viewModel.performance.quality && (
                <Stack gap="xs">
                  <Text strong>Quality Rating</Text>
                  <Text>{viewModel.performance.quality}</Text>
                </Stack>
              )}
              {viewModel.performance.delivery && (
                <Stack gap="xs">
                  <Text strong>Delivery Performance</Text>
                  <Text>{viewModel.performance.delivery}</Text>
                </Stack>
              )}
              {viewModel.performance.pricing && (
                <Stack gap="xs">
                  <Text strong>Pricing Competitiveness</Text>
                  <Text>{viewModel.performance.pricing}</Text>
                </Stack>
              )}
              {viewModel.performance.communication && (
                <Stack gap="xs">
                  <Text strong>Communication</Text>
                  <Text>{viewModel.performance.communication}</Text>
                </Stack>
              )}
              {viewModel.performance.issues && (
                <Stack gap="xs">
                  <Text strong>Issues Encountered</Text>
                  <Text multiline>{viewModel.performance.issues}</Text>
                </Stack>
              )}
              {viewModel.performance.recommendations && (
                <Stack gap="xs">
                  <Text strong>Recommendations</Text>
                  <Text multiline>{viewModel.performance.recommendations}</Text>
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

