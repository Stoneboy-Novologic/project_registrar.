/**
 * @file Report032View.tsx
 * @module report-pages
 * @description View component for Toolbox Talk Documentation
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
import { Report032ViewModel } from "./report-032ViewModel";

interface Report032ViewProps {
  viewModel: Report032ViewModel;
}

export default function Report032View({ viewModel }: Report032ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Toolbox Talk Documentation</Text>
            <Badge>safety</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Toolbox Talk Documentation</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Talk Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.location && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Location:</Text>
                  <Text>{viewModel.header.location}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Talk Section */}
          <Stack gap="md">
            <Text variant="h2">Talk Information</Text>
            <Stack gap="md">
              {viewModel.talk.topic && (
                <Stack gap="xs">
                  <Text strong>Topic</Text>
                  <Text>{viewModel.talk.topic}</Text>
                </Stack>
              )}
              {viewModel.talk.facilitator && (
                <Stack gap="xs">
                  <Text strong>Facilitator</Text>
                  <Text>{viewModel.talk.facilitator}</Text>
                </Stack>
              )}
              {viewModel.talk.attendees && (
                <Stack gap="xs">
                  <Text strong>Attendees</Text>
                  <Text multiline>{viewModel.talk.attendees}</Text>
                </Stack>
              )}
              {viewModel.talk.content && (
                <Stack gap="xs">
                  <Text strong>Talk Content</Text>
                  <Text multiline>{viewModel.talk.content}</Text>
                </Stack>
              )}
              {viewModel.talk.questions && (
                <Stack gap="xs">
                  <Text strong>Questions Asked</Text>
                  <Text multiline>{viewModel.talk.questions}</Text>
                </Stack>
              )}
              {viewModel.talk.actionItems && (
                <Stack gap="xs">
                  <Text strong>Action Items</Text>
                  <Text multiline>{viewModel.talk.actionItems}</Text>
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

