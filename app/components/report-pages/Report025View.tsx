/**
 * @file Report025View.tsx
 * @module report-pages
 * @description View component for Project Closeout Checklist
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
import { Report025ViewModel } from "./report-025ViewModel";

interface Report025ViewProps {
  viewModel: Report025ViewModel;
}

export default function Report025View({ viewModel }: Report025ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Project Closeout Checklist</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Project Closeout Checklist</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.completion && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Completion Date:</Text>
                  <Text>{viewModel.header.completion}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Closeout Section */}
          <Stack gap="md">
            <Text variant="h2">Closeout Checklist</Text>
            <Stack gap="md">
              {viewModel.closeout.punchList && (
                <Stack gap="xs">
                  <Text strong>Punch List Completion</Text>
                  <Text multiline>{viewModel.closeout.punchList}</Text>
                </Stack>
              )}
              {viewModel.closeout.testing && (
                <Stack gap="xs">
                  <Text strong>Testing & Commissioning</Text>
                  <Text multiline>{viewModel.closeout.testing}</Text>
                </Stack>
              )}
              {viewModel.closeout.documentation && (
                <Stack gap="xs">
                  <Text strong>Documentation</Text>
                  <Text multiline>{viewModel.closeout.documentation}</Text>
                </Stack>
              )}
              {viewModel.closeout.warranties && (
                <Stack gap="xs">
                  <Text strong>Warranties</Text>
                  <Text multiline>{viewModel.closeout.warranties}</Text>
                </Stack>
              )}
              {viewModel.closeout.permits && (
                <Stack gap="xs">
                  <Text strong>Permits & Approvals</Text>
                  <Text multiline>{viewModel.closeout.permits}</Text>
                </Stack>
              )}
              {viewModel.closeout.cleanup && (
                <Stack gap="xs">
                  <Text strong>Site Cleanup</Text>
                  <Text multiline>{viewModel.closeout.cleanup}</Text>
                </Stack>
              )}
              {viewModel.closeout.finalInspection && (
                <Stack gap="xs">
                  <Text strong>Final Inspection</Text>
                  <Text multiline>{viewModel.closeout.finalInspection}</Text>
                </Stack>
              )}
              {viewModel.closeout.clientAcceptance && (
                <Stack gap="xs">
                  <Text strong>Client Acceptance</Text>
                  <Text multiline>{viewModel.closeout.clientAcceptance}</Text>
                </Stack>
              )}
              {viewModel.closeout.notes && (
                <Stack gap="xs">
                  <Text strong>Notes</Text>
                  <Text multiline>{viewModel.closeout.notes}</Text>
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
