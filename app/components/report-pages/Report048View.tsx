/**
 * @file Report048View.tsx
 * @module report-pages
 * @description View component for Permit Status Report
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
import { Report048ViewModel } from "./report-048ViewModel";

interface Report048ViewProps {
  viewModel: Report048ViewModel;
}

export default function Report048View({ viewModel }: Report048ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Permit Status Report</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Permit Status Report</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Report Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Permit Section */}
          <Stack gap="md">
            <Text variant="h2">Permit Details</Text>
            <Stack gap="md">
              {viewModel.permit.type && (
                <Stack gap="xs">
                  <Text strong>Permit Type</Text>
                  <Text>{viewModel.permit.type}</Text>
                </Stack>
              )}
              {viewModel.permit.number && (
                <Stack gap="xs">
                  <Text strong>Permit Number</Text>
                  <Text>{viewModel.permit.number}</Text>
                </Stack>
              )}
              {viewModel.permit.issuingAuthority && (
                <Stack gap="xs">
                  <Text strong>Issuing Authority</Text>
                  <Text>{viewModel.permit.issuingAuthority}</Text>
                </Stack>
              )}
              {viewModel.permit.issueDate && (
                <Stack gap="xs">
                  <Text strong>Issue Date</Text>
                  <Text>{viewModel.permit.issueDate}</Text>
                </Stack>
              )}
              {viewModel.permit.expiryDate && (
                <Stack gap="xs">
                  <Text strong>Expiry Date</Text>
                  <Text>{viewModel.permit.expiryDate}</Text>
                </Stack>
              )}
              {viewModel.permit.status && (
                <Stack gap="xs">
                  <Text strong>Permit Status</Text>
                  <Text>{viewModel.permit.status}</Text>
                </Stack>
              )}
              {viewModel.permit.conditions && (
                <Stack gap="xs">
                  <Text strong>Permit Conditions</Text>
                  <Text multiline>{viewModel.permit.conditions}</Text>
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

