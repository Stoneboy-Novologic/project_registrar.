/**
 * @file Report012View.tsx
 * @module report-pages
 * @description View component for Change Order Request
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
import { Report012ViewModel } from "./report-012ViewModel";

interface Report012ViewProps {
  viewModel: Report012ViewModel;
}

export default function Report012View({ viewModel }: Report012ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Change Order Request</Text>
            <Badge>financial</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Change Order Request</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Request Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.number && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Change Order #:</Text>
                  <Text>{viewModel.header.number}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Change Section */}
          <Stack gap="md">
            <Text variant="h2">Change Details</Text>
            <Stack gap="md">
              {viewModel.change.description && (
                <Stack gap="xs">
                  <Text strong>Change Description</Text>
                  <Text multiline>{viewModel.change.description}</Text>
                </Stack>
              )}
              {viewModel.change.reason && (
                <Stack gap="xs">
                  <Text strong>Reason for Change</Text>
                  <Text multiline>{viewModel.change.reason}</Text>
                </Stack>
              )}
              {viewModel.change.impact && (
                <Stack gap="xs">
                  <Text strong>Schedule Impact</Text>
                  <Text multiline>{viewModel.change.impact}</Text>
                </Stack>
              )}
              {viewModel.change.cost && (
                <Stack gap="xs">
                  <Text strong>Cost Impact</Text>
                  <Text>{viewModel.change.cost}</Text>
                </Stack>
              )}
              {viewModel.change.approval && (
                <Stack gap="xs">
                  <Text strong>Approval Required</Text>
                  <Text>{viewModel.change.approval}</Text>
                </Stack>
              )}
              {viewModel.change.requestor && (
                <Stack gap="xs">
                  <Text strong>Requested By</Text>
                  <Text>{viewModel.change.requestor}</Text>
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

