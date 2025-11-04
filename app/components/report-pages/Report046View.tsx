/**
 * @file Report046View.tsx
 * @module report-pages
 * @description View component for Correspondence Log
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
import { Report046ViewModel } from "./report-046ViewModel";

interface Report046ViewProps {
  viewModel: Report046ViewModel;
}

export default function Report046View({ viewModel }: Report046ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Correspondence Log</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Correspondence Log</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Correspondence Date:</Text>
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

          {/* Correspondence Section */}
          <Stack gap="md">
            <Text variant="h2">Correspondence Details</Text>
            <Stack gap="md">
              {viewModel.correspondence.ref && (
                <Stack gap="xs">
                  <Text strong>Reference Number</Text>
                  <Text>{viewModel.correspondence.ref}</Text>
                </Stack>
              )}
              {viewModel.correspondence.from && (
                <Stack gap="xs">
                  <Text strong>From</Text>
                  <Text>{viewModel.correspondence.from}</Text>
                </Stack>
              )}
              {viewModel.correspondence.to && (
                <Stack gap="xs">
                  <Text strong>To</Text>
                  <Text>{viewModel.correspondence.to}</Text>
                </Stack>
              )}
              {viewModel.correspondence.subject && (
                <Stack gap="xs">
                  <Text strong>Subject</Text>
                  <Text>{viewModel.correspondence.subject}</Text>
                </Stack>
              )}
              {viewModel.correspondence.content && (
                <Stack gap="xs">
                  <Text strong>Correspondence Content</Text>
                  <Text multiline>{viewModel.correspondence.content}</Text>
                </Stack>
              )}
              {viewModel.correspondence.response && (
                <Stack gap="xs">
                  <Text strong>Response Required</Text>
                  <Text>{viewModel.correspondence.response}</Text>
                </Stack>
              )}
              {viewModel.correspondence.responseDate && (
                <Stack gap="xs">
                  <Text strong>Response Date</Text>
                  <Text>{viewModel.correspondence.responseDate}</Text>
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

