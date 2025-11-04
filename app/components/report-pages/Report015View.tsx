/**
 * @file Report015View.tsx
 * @module report-pages
 * @description View component for RFI (Request for Information)
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
import { Report015ViewModel } from "./report-015ViewModel";

interface Report015ViewProps {
  viewModel: Report015ViewModel;
}

export default function Report015View({ viewModel }: Report015ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">RFI (Request for Information)</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">RFI (Request for Information)</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>RFI Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.number && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>RFI Number:</Text>
                  <Text>{viewModel.header.number}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* RFI Section */}
          <Stack gap="md">
            <Text variant="h2">RFI Details</Text>
            <Stack gap="md">
              {viewModel.rfi.question && (
                <Stack gap="xs">
                  <Text strong>Question/Issue</Text>
                  <Text multiline>{viewModel.rfi.question}</Text>
                </Stack>
              )}
              {viewModel.rfi.context && (
                <Stack gap="xs">
                  <Text strong>Context/Background</Text>
                  <Text multiline>{viewModel.rfi.context}</Text>
                </Stack>
              )}
              {viewModel.rfi.impact && (
                <Stack gap="xs">
                  <Text strong>Project Impact</Text>
                  <Text multiline>{viewModel.rfi.impact}</Text>
                </Stack>
              )}
              {viewModel.rfi.urgency && (
                <Stack gap="xs">
                  <Text strong>Urgency Level</Text>
                  <Text>{viewModel.rfi.urgency}</Text>
                </Stack>
              )}
              {viewModel.rfi.requestor && (
                <Stack gap="xs">
                  <Text strong>Requested By</Text>
                  <Text>{viewModel.rfi.requestor}</Text>
                </Stack>
              )}
              {viewModel.rfi.response && (
                <Stack gap="xs">
                  <Text strong>Response Required By</Text>
                  <Text>{viewModel.rfi.response}</Text>
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
