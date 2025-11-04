/**
 * @file Report023View.tsx
 * @module report-pages
 * @description View component for Inspection Request
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
import { Report023ViewModel } from "./report-023ViewModel";

interface Report023ViewProps {
  viewModel: Report023ViewModel;
}

export default function Report023View({ viewModel }: Report023ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Inspection Request</Text>
            <Badge>quality-control</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Inspection Request</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Date:</Text>
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

          {/* Inspection Section */}
          <Stack gap="md">
            <Text variant="h2">Inspection Details</Text>
            <Stack gap="md">
              {viewModel.inspection.type && (
                <Stack gap="xs">
                  <Text strong>Inspection Type</Text>
                  <Text>{viewModel.inspection.type}</Text>
                </Stack>
              )}
              {viewModel.inspection.location && (
                <Stack gap="xs">
                  <Text strong>Location</Text>
                  <Text>{viewModel.inspection.location}</Text>
                </Stack>
              )}
              {viewModel.inspection.scheduled && (
                <Stack gap="xs">
                  <Text strong>Scheduled Date</Text>
                  <Text>{viewModel.inspection.scheduled}</Text>
                </Stack>
              )}
              {viewModel.inspection.time && (
                <Stack gap="xs">
                  <Text strong>Time</Text>
                  <Text>{viewModel.inspection.time}</Text>
                </Stack>
              )}
              {viewModel.inspection.inspector && (
                <Stack gap="xs">
                  <Text strong>Inspector</Text>
                  <Text>{viewModel.inspection.inspector}</Text>
                </Stack>
              )}
              {viewModel.inspection.work && (
                <Stack gap="xs">
                  <Text strong>Work to be Inspected</Text>
                  <Text multiline>{viewModel.inspection.work}</Text>
                </Stack>
              )}
              {viewModel.inspection.requestor && (
                <Stack gap="xs">
                  <Text strong>Requested By</Text>
                  <Text>{viewModel.inspection.requestor}</Text>
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
