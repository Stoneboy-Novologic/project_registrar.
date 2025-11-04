/**
 * @file Report035View.tsx
 * @module report-pages
 * @description View component for Safety Audit Report
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
import { Report035ViewModel } from "./report-035ViewModel";

interface Report035ViewProps {
  viewModel: Report035ViewModel;
}

export default function Report035View({ viewModel }: Report035ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Safety Audit Report</Text>
            <Badge>safety</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Safety Audit Report</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Audit Date:</Text>
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

          {/* Audit Section */}
          <Stack gap="md">
            <Text variant="h2">Audit Details</Text>
            <Stack gap="md">
              {viewModel.audit.auditor && (
                <Stack gap="xs">
                  <Text strong>Auditor Name</Text>
                  <Text>{viewModel.audit.auditor}</Text>
                </Stack>
              )}
              {viewModel.audit.scope && (
                <Stack gap="xs">
                  <Text strong>Audit Scope</Text>
                  <Text multiline>{viewModel.audit.scope}</Text>
                </Stack>
              )}
              {viewModel.audit.findings && (
                <Stack gap="xs">
                  <Text strong>Audit Findings</Text>
                  <Text multiline>{viewModel.audit.findings}</Text>
                </Stack>
              )}
              {viewModel.audit.nonCompliance && (
                <Stack gap="xs">
                  <Text strong>Non-Compliance Issues</Text>
                  <Text multiline>{viewModel.audit.nonCompliance}</Text>
                </Stack>
              )}
              {viewModel.audit.recommendations && (
                <Stack gap="xs">
                  <Text strong>Recommendations</Text>
                  <Text multiline>{viewModel.audit.recommendations}</Text>
                </Stack>
              )}
              {viewModel.audit.actionPlan && (
                <Stack gap="xs">
                  <Text strong>Action Plan</Text>
                  <Text multiline>{viewModel.audit.actionPlan}</Text>
                </Stack>
              )}
              {viewModel.audit.followup && (
                <Stack gap="xs">
                  <Text strong>Follow-up Date</Text>
                  <Text>{viewModel.audit.followup}</Text>
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

