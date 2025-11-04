/**
 * @file Report016View.tsx
 * @module report-pages
 * @description View component for Submittal Log
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
import { Report016ViewModel } from "./report-016ViewModel";

interface Report016ViewProps {
  viewModel: Report016ViewModel;
}

export default function Report016View({ viewModel }: Report016ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Submittal Log</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Submittal Log</Text>
            {viewModel.header.project && (
              <Section align="start" justify="start" className="gap-4">
                <Text strong>Project:</Text>
                <Text>{viewModel.header.project}</Text>
              </Section>
            )}
          </Stack>

          <Rule />

          {/* Submittal Section */}
          <Stack gap="md">
            <Text variant="h2">Submittal Details</Text>
            <Stack gap="md">
              {viewModel.submittal.number && (
                <Stack gap="xs">
                  <Text strong>Submittal Number</Text>
                  <Text>{viewModel.submittal.number}</Text>
                </Stack>
              )}
              {viewModel.submittal.date && (
                <Stack gap="xs">
                  <Text strong>Submittal Date</Text>
                  <Text>{viewModel.submittal.date}</Text>
                </Stack>
              )}
              {viewModel.submittal.type && (
                <Stack gap="xs">
                  <Text strong>Submittal Type</Text>
                  <Text>{viewModel.submittal.type}</Text>
                </Stack>
              )}
              {viewModel.submittal.description && (
                <Stack gap="xs">
                  <Text strong>Description</Text>
                  <Text multiline>{viewModel.submittal.description}</Text>
                </Stack>
              )}
              {viewModel.submittal.status && (
                <Stack gap="xs">
                  <Text strong>Status</Text>
                  <Text>{viewModel.submittal.status}</Text>
                </Stack>
              )}
              {viewModel.submittal.response && (
                <Stack gap="xs">
                  <Text strong>Response Date</Text>
                  <Text>{viewModel.submittal.response}</Text>
                </Stack>
              )}
              {viewModel.submittal.approved && (
                <Stack gap="xs">
                  <Text strong>Approved By</Text>
                  <Text>{viewModel.submittal.approved}</Text>
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
