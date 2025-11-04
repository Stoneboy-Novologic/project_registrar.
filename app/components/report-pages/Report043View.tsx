/**
 * @file Report043View.tsx
 * @module report-pages
 * @description View component for Commissioning Checklist
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
import { Report043ViewModel } from "./report-043ViewModel";

interface Report043ViewProps {
  viewModel: Report043ViewModel;
}

export default function Report043View({ viewModel }: Report043ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Commissioning Checklist</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Commissioning Checklist</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Commissioning Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Commissioning Section */}
          <Stack gap="md">
            <Text variant="h2">Commissioning Details</Text>
            <Stack gap="md">
              {viewModel.commission.system && (
                <Stack gap="xs">
                  <Text strong>System/Equipment</Text>
                  <Text>{viewModel.commission.system}</Text>
                </Stack>
              )}
              {viewModel.commission.preStart && (
                <Stack gap="xs">
                  <Text strong>Pre-Start Checks</Text>
                  <Text multiline>{viewModel.commission.preStart}</Text>
                </Stack>
              )}
              {viewModel.commission.operational && (
                <Stack gap="xs">
                  <Text strong>Operational Tests</Text>
                  <Text multiline>{viewModel.commission.operational}</Text>
                </Stack>
              )}
              {viewModel.commission.performance && (
                <Stack gap="xs">
                  <Text strong>Performance Verification</Text>
                  <Text multiline>{viewModel.commission.performance}</Text>
                </Stack>
              )}
              {viewModel.commission.issues && (
                <Stack gap="xs">
                  <Text strong>Issues Found</Text>
                  <Text multiline>{viewModel.commission.issues}</Text>
                </Stack>
              )}
              {viewModel.commission.signoff && (
                <Stack gap="xs">
                  <Text strong>Commissioning Sign-off</Text>
                  <Text>{viewModel.commission.signoff}</Text>
                </Stack>
              )}
              {viewModel.commission.commissioner && (
                <Stack gap="xs">
                  <Text strong>Commissioned By</Text>
                  <Text>{viewModel.commission.commissioner}</Text>
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

