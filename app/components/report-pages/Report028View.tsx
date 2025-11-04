/**
 * @file Report028View.tsx
 * @module report-pages
 * @description View component for Stakeholder Communication Log
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
import { Report028ViewModel } from "./report-028ViewModel";

interface Report028ViewProps {
  viewModel: Report028ViewModel;
}

export default function Report028View({ viewModel }: Report028ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Stakeholder Communication Log</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Stakeholder Communication Log</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Communication Date:</Text>
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

          {/* Communication Section */}
          <Stack gap="md">
            <Text variant="h2">Communication Details</Text>
            <Stack gap="md">
              {viewModel.communication.stakeholder && (
                <Stack gap="xs">
                  <Text strong>Stakeholder</Text>
                  <Text>{viewModel.communication.stakeholder}</Text>
                </Stack>
              )}
              {viewModel.communication.method && (
                <Stack gap="xs">
                  <Text strong>Communication Method</Text>
                  <Text>{viewModel.communication.method}</Text>
                </Stack>
              )}
              {viewModel.communication.subject && (
                <Stack gap="xs">
                  <Text strong>Subject</Text>
                  <Text>{viewModel.communication.subject}</Text>
                </Stack>
              )}
              {viewModel.communication.content && (
                <Stack gap="xs">
                  <Text strong>Communication Content</Text>
                  <Text multiline>{viewModel.communication.content}</Text>
                </Stack>
              )}
              {viewModel.communication.response && (
                <Stack gap="xs">
                  <Text strong>Stakeholder Response</Text>
                  <Text multiline>{viewModel.communication.response}</Text>
                </Stack>
              )}
              {viewModel.communication.followup && (
                <Stack gap="xs">
                  <Text strong>Follow-up Actions</Text>
                  <Text multiline>{viewModel.communication.followup}</Text>
                </Stack>
              )}
              {viewModel.communication.initiator && (
                <Stack gap="xs">
                  <Text strong>Initiated By</Text>
                  <Text>{viewModel.communication.initiator}</Text>
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

