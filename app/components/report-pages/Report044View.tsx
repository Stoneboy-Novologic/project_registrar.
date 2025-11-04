/**
 * @file Report044View.tsx
 * @module report-pages
 * @description View component for System Performance Test
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
import { Report044ViewModel } from "./report-044ViewModel";

interface Report044ViewProps {
  viewModel: Report044ViewModel;
}

export default function Report044View({ viewModel }: Report044ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">System Performance Test</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">System Performance Test</Text>
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
            <Text variant="h2">Test Details</Text>
            <Stack gap="md">
              {viewModel.test.system && (
                <Stack gap="xs">
                  <Text strong>System Tested</Text>
                  <Text>{viewModel.test.system}</Text>
                </Stack>
              )}
              {viewModel.test.objective && (
                <Stack gap="xs">
                  <Text strong>Test Objective</Text>
                  <Text multiline>{viewModel.test.objective}</Text>
                </Stack>
              )}
              {viewModel.test.parameters && (
                <Stack gap="xs">
                  <Text strong>Test Parameters</Text>
                  <Text multiline>{viewModel.test.parameters}</Text>
                </Stack>
              )}
              {viewModel.test.results && (
                <Stack gap="xs">
                  <Text strong>Test Results</Text>
                  <Text multiline>{viewModel.test.results}</Text>
                </Stack>
              )}
              {viewModel.test.performance && (
                <Stack gap="xs">
                  <Text strong>Performance Assessment</Text>
                  <Text multiline>{viewModel.test.performance}</Text>
                </Stack>
              )}
              {viewModel.test.compliance && (
                <Stack gap="xs">
                  <Text strong>Compliance with Specifications</Text>
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

