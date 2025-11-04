/**
 * @file Report041View.tsx
 * @module report-pages
 * @description View component for Material Testing Report
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
import { Report041ViewModel } from "./report-041ViewModel";

interface Report041ViewProps {
  viewModel: Report041ViewModel;
}

export default function Report041View({ viewModel }: Report041ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Material Testing Report</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Material Testing Report</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Test Date:</Text>
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

          {/* Test Section */}
          <Stack gap="md">
            <Text variant="h2">Test Information</Text>
            <Stack gap="md">
              {viewModel.test.material && (
                <Stack gap="xs">
                  <Text strong>Material Tested</Text>
                  <Text>{viewModel.test.material}</Text>
                </Stack>
              )}
              {viewModel.test.sample && (
                <Stack gap="xs">
                  <Text strong>Sample ID</Text>
                  <Text>{viewModel.test.sample}</Text>
                </Stack>
              )}
              {viewModel.test.location && (
                <Stack gap="xs">
                  <Text strong>Test Location</Text>
                  <Text>{viewModel.test.location}</Text>
                </Stack>
              )}
              {viewModel.test.type && (
                <Stack gap="xs">
                  <Text strong>Test Type</Text>
                  <Text>{viewModel.test.type}</Text>
                </Stack>
              )}
              {viewModel.test.results && (
                <Stack gap="xs">
                  <Text strong>Test Results</Text>
                  <Text multiline>{viewModel.test.results}</Text>
                </Stack>
              )}
              {viewModel.test.specification && (
                <Stack gap="xs">
                  <Text strong>Specification Requirements</Text>
                  <Text multiline>{viewModel.test.specification}</Text>
                </Stack>
              )}
              {viewModel.test.compliance && (
                <Stack gap="xs">
                  <Text strong>Compliance Status</Text>
                  <Text>{viewModel.test.compliance}</Text>
                </Stack>
              )}
              {viewModel.test.tester && (
                <Stack gap="xs">
                  <Text strong>Tested By</Text>
                  <Text>{viewModel.test.tester}</Text>
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

