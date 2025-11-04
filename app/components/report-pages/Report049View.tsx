/**
 * @file Report049View.tsx
 * @module report-pages
 * @description View component for Warranty Documentation
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
import { Report049ViewModel } from "./report-049ViewModel";

interface Report049ViewProps {
  viewModel: Report049ViewModel;
}

export default function Report049View({ viewModel }: Report049ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Warranty Documentation</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Warranty Documentation</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Documentation Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Warranty Section */}
          <Stack gap="md">
            <Text variant="h2">Warranty Details</Text>
            <Stack gap="md">
              {viewModel.warranty.item && (
                <Stack gap="xs">
                  <Text strong>Warranted Item</Text>
                  <Text>{viewModel.warranty.item}</Text>
                </Stack>
              )}
              {viewModel.warranty.vendor && (
                <Stack gap="xs">
                  <Text strong>Vendor/Manufacturer</Text>
                  <Text>{viewModel.warranty.vendor}</Text>
                </Stack>
              )}
              {viewModel.warranty.startDate && (
                <Stack gap="xs">
                  <Text strong>Warranty Start Date</Text>
                  <Text>{viewModel.warranty.startDate}</Text>
                </Stack>
              )}
              {viewModel.warranty.duration && (
                <Stack gap="xs">
                  <Text strong>Warranty Duration</Text>
                  <Text>{viewModel.warranty.duration}</Text>
                </Stack>
              )}
              {viewModel.warranty.coverage && (
                <Stack gap="xs">
                  <Text strong>Warranty Coverage</Text>
                  <Text multiline>{viewModel.warranty.coverage}</Text>
                </Stack>
              )}
              {viewModel.warranty.terms && (
                <Stack gap="xs">
                  <Text strong>Warranty Terms</Text>
                  <Text multiline>{viewModel.warranty.terms}</Text>
                </Stack>
              )}
              {viewModel.warranty.contact && (
                <Stack gap="xs">
                  <Text strong>Warranty Contact</Text>
                  <Text>{viewModel.warranty.contact}</Text>
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

