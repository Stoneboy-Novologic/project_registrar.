/**
 * @file Report019View.tsx
 * @module report-pages
 * @description View component for Labor Hours Tracking
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
import { Report019ViewModel } from "./report-019ViewModel";

interface Report019ViewProps {
  viewModel: Report019ViewModel;
}

export default function Report019View({ viewModel }: Report019ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Labor Hours Tracking</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Labor Hours Tracking</Text>
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

          {/* Labor Section */}
          <Stack gap="md">
            <Text variant="h2">Labor Hours</Text>
            <Stack gap="md">
              {viewModel.labor.carpenters && (
                <Stack gap="xs">
                  <Text strong>Carpenters</Text>
                  <Text>{viewModel.labor.carpenters}</Text>
                </Stack>
              )}
              {viewModel.labor.electricians && (
                <Stack gap="xs">
                  <Text strong>Electricians</Text>
                  <Text>{viewModel.labor.electricians}</Text>
                </Stack>
              )}
              {viewModel.labor.plumbers && (
                <Stack gap="xs">
                  <Text strong>Plumbers</Text>
                  <Text>{viewModel.labor.plumbers}</Text>
                </Stack>
              )}
              {viewModel.labor.laborers && (
                <Stack gap="xs">
                  <Text strong>Laborers</Text>
                  <Text>{viewModel.labor.laborers}</Text>
                </Stack>
              )}
              {viewModel.labor.total && (
                <Stack gap="xs">
                  <Text strong>Total Hours</Text>
                  <Text>{viewModel.labor.total}</Text>
                </Stack>
              )}
              {viewModel.labor.overtime && (
                <Stack gap="xs">
                  <Text strong>Overtime Hours</Text>
                  <Text>{viewModel.labor.overtime}</Text>
                </Stack>
              )}
              {viewModel.labor.notes && (
                <Stack gap="xs">
                  <Text strong>Notes</Text>
                  <Text multiline>{viewModel.labor.notes}</Text>
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
