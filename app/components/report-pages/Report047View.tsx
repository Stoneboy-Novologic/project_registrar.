/**
 * @file Report047View.tsx
 * @module report-pages
 * @description View component for Drawing Revision Log
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
import { Report047ViewModel } from "./report-047ViewModel";

interface Report047ViewProps {
  viewModel: Report047ViewModel;
}

export default function Report047View({ viewModel }: Report047ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Drawing Revision Log</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Drawing Revision Log</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Revision Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Drawing Section */}
          <Stack gap="md">
            <Text variant="h2">Drawing Details</Text>
            <Stack gap="md">
              {viewModel.drawing.number && (
                <Stack gap="xs">
                  <Text strong>Drawing Number</Text>
                  <Text>{viewModel.drawing.number}</Text>
                </Stack>
              )}
              {viewModel.drawing.title && (
                <Stack gap="xs">
                  <Text strong>Drawing Title</Text>
                  <Text>{viewModel.drawing.title}</Text>
                </Stack>
              )}
              {viewModel.drawing.revision && (
                <Stack gap="xs">
                  <Text strong>Revision Number</Text>
                  <Text>{viewModel.drawing.revision}</Text>
                </Stack>
              )}
              {viewModel.drawing.reason && (
                <Stack gap="xs">
                  <Text strong>Revision Reason</Text>
                  <Text multiline>{viewModel.drawing.reason}</Text>
                </Stack>
              )}
              {viewModel.drawing.changes && (
                <Stack gap="xs">
                  <Text strong>Changes Made</Text>
                  <Text multiline>{viewModel.drawing.changes}</Text>
                </Stack>
              )}
              {viewModel.drawing.approved && (
                <Stack gap="xs">
                  <Text strong>Approved By</Text>
                  <Text>{viewModel.drawing.approved}</Text>
                </Stack>
              )}
              {viewModel.drawing.status && (
                <Stack gap="xs">
                  <Text strong>Status</Text>
                  <Text>{viewModel.drawing.status}</Text>
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

