/**
 * @file Report045View.tsx
 * @module report-pages
 * @description View component for Technical Specification Review
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
import { Report045ViewModel } from "./report-045ViewModel";

interface Report045ViewProps {
  viewModel: Report045ViewModel;
}

export default function Report045View({ viewModel }: Report045ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Technical Specification Review</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Technical Specification Review</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Review Date:</Text>
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

          {/* Specification Section */}
          <Stack gap="md">
            <Text variant="h2">Review Details</Text>
            <Stack gap="md">
              {viewModel.spec.document && (
                <Stack gap="xs">
                  <Text strong>Specification Document</Text>
                  <Text>{viewModel.spec.document}</Text>
                </Stack>
              )}
              {viewModel.spec.revision && (
                <Stack gap="xs">
                  <Text strong>Revision Number</Text>
                  <Text>{viewModel.spec.revision}</Text>
                </Stack>
              )}
              {viewModel.spec.reviewer && (
                <Stack gap="xs">
                  <Text strong>Reviewer</Text>
                  <Text>{viewModel.spec.reviewer}</Text>
                </Stack>
              )}
              {viewModel.spec.summary && (
                <Stack gap="xs">
                  <Text strong>Review Summary</Text>
                  <Text multiline>{viewModel.spec.summary}</Text>
                </Stack>
              )}
              {viewModel.spec.issues && (
                <Stack gap="xs">
                  <Text strong>Issues Identified</Text>
                  <Text multiline>{viewModel.spec.issues}</Text>
                </Stack>
              )}
              {viewModel.spec.recommendations && (
                <Stack gap="xs">
                  <Text strong>Recommendations</Text>
                  <Text multiline>{viewModel.spec.recommendations}</Text>
                </Stack>
              )}
              {viewModel.spec.approval && (
                <Stack gap="xs">
                  <Text strong>Approval Status</Text>
                  <Text>{viewModel.spec.approval}</Text>
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

