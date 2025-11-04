/**
 * @file Report031View.tsx
 * @module report-pages
 * @description View component for Safety Training Record
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
import { Report031ViewModel } from "./report-031ViewModel";

interface Report031ViewProps {
  viewModel: Report031ViewModel;
}

export default function Report031View({ viewModel }: Report031ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Safety Training Record</Text>
            <Badge>safety</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Safety Training Record</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Training Date:</Text>
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

          {/* Training Section */}
          <Stack gap="md">
            <Text variant="h2">Training Information</Text>
            <Stack gap="md">
              {viewModel.training.type && (
                <Stack gap="xs">
                  <Text strong>Training Type</Text>
                  <Text>{viewModel.training.type}</Text>
                </Stack>
              )}
              {viewModel.training.instructor && (
                <Stack gap="xs">
                  <Text strong>Instructor</Text>
                  <Text>{viewModel.training.instructor}</Text>
                </Stack>
              )}
              {viewModel.training.attendees && (
                <Stack gap="xs">
                  <Text strong>Attendees</Text>
                  <Text multiline>{viewModel.training.attendees}</Text>
                </Stack>
              )}
              {viewModel.training.content && (
                <Stack gap="xs">
                  <Text strong>Training Content</Text>
                  <Text multiline>{viewModel.training.content}</Text>
                </Stack>
              )}
              {viewModel.training.duration && (
                <Stack gap="xs">
                  <Text strong>Training Duration</Text>
                  <Text>{viewModel.training.duration}</Text>
                </Stack>
              )}
              {viewModel.training.certification && (
                <Stack gap="xs">
                  <Text strong>Certification Issued</Text>
                  <Text>{viewModel.training.certification}</Text>
                </Stack>
              )}
              {viewModel.training.notes && (
                <Stack gap="xs">
                  <Text strong>Additional Notes</Text>
                  <Text multiline>{viewModel.training.notes}</Text>
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

