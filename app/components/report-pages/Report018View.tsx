/**
 * @file Report018View.tsx
 * @module report-pages
 * @description View component for Weather Report
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
import { Report018ViewModel } from "./report-018ViewModel";

interface Report018ViewProps {
  viewModel: Report018ViewModel;
}

export default function Report018View({ viewModel }: Report018ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Weather Report</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Weather Report</Text>
            {viewModel.header.date && (
              <Section align="start" justify="start" className="gap-4">
                <Text strong>Date:</Text>
                <Text>{viewModel.header.date}</Text>
              </Section>
            )}
          </Stack>

          <Rule />

          {/* Weather Section */}
          <Stack gap="md">
            <Text variant="h2">Weather Conditions</Text>
            <Stack gap="md">
              {viewModel.weather.temperature && (
                <Stack gap="xs">
                  <Text strong>Temperature</Text>
                  <Text>{viewModel.weather.temperature}</Text>
                </Stack>
              )}
              {viewModel.weather.conditions && (
                <Stack gap="xs">
                  <Text strong>Conditions</Text>
                  <Text>{viewModel.weather.conditions}</Text>
                </Stack>
              )}
              {viewModel.weather.wind && (
                <Stack gap="xs">
                  <Text strong>Wind</Text>
                  <Text>{viewModel.weather.wind}</Text>
                </Stack>
              )}
              {viewModel.weather.precipitation && (
                <Stack gap="xs">
                  <Text strong>Precipitation</Text>
                  <Text>{viewModel.weather.precipitation}</Text>
                </Stack>
              )}
              {viewModel.weather.visibility && (
                <Stack gap="xs">
                  <Text strong>Visibility</Text>
                  <Text>{viewModel.weather.visibility}</Text>
                </Stack>
              )}
              {viewModel.weather.impact && (
                <Stack gap="xs">
                  <Text strong>Impact on Work</Text>
                  <Text multiline>{viewModel.weather.impact}</Text>
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
