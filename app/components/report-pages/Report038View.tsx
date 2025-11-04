/**
 * @file Report038View.tsx
 * @module report-pages
 * @description View component for Cost Variance Analysis
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
import { Report038ViewModel } from "./report-038ViewModel";

interface Report038ViewProps {
  viewModel: Report038ViewModel;
}

export default function Report038View({ viewModel }: Report038ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Cost Variance Analysis</Text>
            <Badge>financial</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Cost Variance Analysis</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.period && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Reporting Period:</Text>
                  <Text>{viewModel.header.period}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Variance Section */}
          <Stack gap="md">
            <Text variant="h2">Cost Variance Details</Text>
            <Stack gap="md">
              {viewModel.variance.budgeted && (
                <Stack gap="xs">
                  <Text strong>Budgeted Cost</Text>
                  <Text>{viewModel.variance.budgeted}</Text>
                </Stack>
              )}
              {viewModel.variance.actual && (
                <Stack gap="xs">
                  <Text strong>Actual Cost</Text>
                  <Text>{viewModel.variance.actual}</Text>
                </Stack>
              )}
              {viewModel.variance.variance && (
                <Stack gap="xs">
                  <Text strong>Cost Variance</Text>
                  <Text>{viewModel.variance.variance}</Text>
                </Stack>
              )}
              {viewModel.variance.analysis && (
                <Stack gap="xs">
                  <Text strong>Variance Analysis</Text>
                  <Text multiline>{viewModel.variance.analysis}</Text>
                </Stack>
              )}
              {viewModel.variance.reasons && (
                <Stack gap="xs">
                  <Text strong>Reasons for Variance</Text>
                  <Text multiline>{viewModel.variance.reasons}</Text>
                </Stack>
              )}
              {viewModel.variance.actions && (
                <Stack gap="xs">
                  <Text strong>Corrective Actions</Text>
                  <Text multiline>{viewModel.variance.actions}</Text>
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

