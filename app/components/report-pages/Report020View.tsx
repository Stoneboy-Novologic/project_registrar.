/**
 * @file Report020View.tsx
 * @module report-pages
 * @description View component for Incident Report
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
import { Report020ViewModel } from "./report-020ViewModel";

interface Report020ViewProps {
  viewModel: Report020ViewModel;
}

export default function Report020View({ viewModel }: Report020ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Incident Report</Text>
            <Badge>safety</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Incident Report</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.time && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Time:</Text>
                  <Text>{viewModel.header.time}</Text>
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

          {/* Incident Section */}
          <Stack gap="md">
            <Text variant="h2">Incident Details</Text>
            <Stack gap="md">
              {viewModel.incident.type && (
                <Stack gap="xs">
                  <Text strong>Incident Type</Text>
                  <Text>{viewModel.incident.type}</Text>
                </Stack>
              )}
              {viewModel.incident.description && (
                <Stack gap="xs">
                  <Text strong>Description</Text>
                  <Text multiline>{viewModel.incident.description}</Text>
                </Stack>
              )}
              {viewModel.incident.cause && (
                <Stack gap="xs">
                  <Text strong>Cause</Text>
                  <Text multiline>{viewModel.incident.cause}</Text>
                </Stack>
              )}
              {viewModel.incident.injuries && (
                <Stack gap="xs">
                  <Text strong>Injuries</Text>
                  <Text multiline>{viewModel.incident.injuries}</Text>
                </Stack>
              )}
              {viewModel.incident.action && (
                <Stack gap="xs">
                  <Text strong>Action Taken</Text>
                  <Text multiline>{viewModel.incident.action}</Text>
                </Stack>
              )}
              {viewModel.incident.reporter && (
                <Stack gap="xs">
                  <Text strong>Reported By</Text>
                  <Text>{viewModel.incident.reporter}</Text>
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
