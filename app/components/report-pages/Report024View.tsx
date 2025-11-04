/**
 * @file Report024View.tsx
 * @module report-pages
 * @description View component for As-Built Documentation
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
import { Report024ViewModel } from "./report-024ViewModel";

interface Report024ViewProps {
  viewModel: Report024ViewModel;
}

export default function Report024View({ viewModel }: Report024ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">As-Built Documentation</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">As-Built Documentation</Text>
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

          {/* As-Built Section */}
          <Stack gap="md">
            <Text variant="h2">As-Built Details</Text>
            <Stack gap="md">
              {viewModel.asbuilt.location && (
                <Stack gap="xs">
                  <Text strong>Location</Text>
                  <Text>{viewModel.asbuilt.location}</Text>
                </Stack>
              )}
              {viewModel.asbuilt.work && (
                <Stack gap="xs">
                  <Text strong>Work Completed</Text>
                  <Text multiline>{viewModel.asbuilt.work}</Text>
                </Stack>
              )}
              {viewModel.asbuilt.dimensions && (
                <Stack gap="xs">
                  <Text strong>Dimensions</Text>
                  <Text multiline>{viewModel.asbuilt.dimensions}</Text>
                </Stack>
              )}
              {viewModel.asbuilt.materials && (
                <Stack gap="xs">
                  <Text strong>Materials Used</Text>
                  <Text multiline>{viewModel.asbuilt.materials}</Text>
                </Stack>
              )}
              {viewModel.asbuilt.deviations && (
                <Stack gap="xs">
                  <Text strong>Deviations from Plans</Text>
                  <Text multiline>{viewModel.asbuilt.deviations}</Text>
                </Stack>
              )}
              {viewModel.asbuilt.photos && (
                <Stack gap="xs">
                  <Text strong>As-Built Photos</Text>
                  <div className="w-full">
                    <img
                      src={viewModel.asbuilt.photos as string}
                      alt="As-Built Photos"
                      className="w-full h-auto border border-gray-300 rounded shadow-sm"
                    />
                  </div>
                </Stack>
              )}
              {viewModel.asbuilt.documenter && (
                <Stack gap="xs">
                  <Text strong>Documented By</Text>
                  <Text>{viewModel.asbuilt.documenter}</Text>
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
