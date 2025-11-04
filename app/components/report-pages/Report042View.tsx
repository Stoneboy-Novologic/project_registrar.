/**
 * @file Report042View.tsx
 * @module report-pages
 * @description View component for Non-Conformance Report (NCR)
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
import { Report042ViewModel } from "./report-042ViewModel";

interface Report042ViewProps {
  viewModel: Report042ViewModel;
}

export default function Report042View({ viewModel }: Report042ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Non-Conformance Report (NCR)</Text>
            <Badge>quality-control</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Non-Conformance Report (NCR)</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>NCR Date:</Text>
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

          {/* NCR Section */}
          <Stack gap="md">
            <Text variant="h2">NCR Details</Text>
            <Stack gap="md">
              {viewModel.ncr.number && (
                <Stack gap="xs">
                  <Text strong>NCR Number</Text>
                  <Text>{viewModel.ncr.number}</Text>
                </Stack>
              )}
              {viewModel.ncr.location && (
                <Stack gap="xs">
                  <Text strong>Location</Text>
                  <Text>{viewModel.ncr.location}</Text>
                </Stack>
              )}
              {viewModel.ncr.description && (
                <Stack gap="xs">
                  <Text strong>Non-Conformance Description</Text>
                  <Text multiline>{viewModel.ncr.description}</Text>
                </Stack>
              )}
              {viewModel.ncr.severity && (
                <Stack gap="xs">
                  <Text strong>Severity</Text>
                  <Text>{viewModel.ncr.severity}</Text>
                </Stack>
              )}
              {viewModel.ncr.cause && (
                <Stack gap="xs">
                  <Text strong>Root Cause</Text>
                  <Text multiline>{viewModel.ncr.cause}</Text>
                </Stack>
              )}
              {viewModel.ncr.corrective && (
                <Stack gap="xs">
                  <Text strong>Corrective Action</Text>
                  <Text multiline>{viewModel.ncr.corrective}</Text>
                </Stack>
              )}
              {viewModel.ncr.preventive && (
                <Stack gap="xs">
                  <Text strong>Preventive Action</Text>
                  <Text multiline>{viewModel.ncr.preventive}</Text>
                </Stack>
              )}
              {viewModel.ncr.status && (
                <Stack gap="xs">
                  <Text strong>NCR Status</Text>
                  <Text>{viewModel.ncr.status}</Text>
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

