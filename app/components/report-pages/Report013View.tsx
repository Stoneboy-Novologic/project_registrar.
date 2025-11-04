/**
 * @file Report013View.tsx
 * @module report-pages
 * @description View component for Site Photos Documentation
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
import { Report013ViewModel } from "./report-013ViewModel";

interface Report013ViewProps {
  viewModel: Report013ViewModel;
}

export default function Report013View({ viewModel }: Report013ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Site Photos Documentation</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Site Photos Documentation</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Photo Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.location && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Site Location:</Text>
                  <Text>{viewModel.header.location}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Photos Section */}
          <Stack gap="md">
            <Text variant="h2">Photos</Text>
            <Stack gap="md">
              {viewModel.photos.progress && (
                <Stack gap="xs">
                  <Text strong>Progress Photos</Text>
                  <div className="w-full">
                    <img
                      src={viewModel.photos.progress as string}
                      alt="Progress Photos"
                      className="w-full h-auto border border-gray-300 rounded shadow-sm"
                    />
                  </div>
                </Stack>
              )}
              {viewModel.photos.quality && (
                <Stack gap="xs">
                  <Text strong>Quality Photos</Text>
                  <div className="w-full">
                    <img
                      src={viewModel.photos.quality as string}
                      alt="Quality Photos"
                      className="w-full h-auto border border-gray-300 rounded shadow-sm"
                    />
                  </div>
                </Stack>
              )}
              {viewModel.photos.issues && (
                <Stack gap="xs">
                  <Text strong>Issue Photos</Text>
                  <div className="w-full">
                    <img
                      src={viewModel.photos.issues as string}
                      alt="Issue Photos"
                      className="w-full h-auto border border-gray-300 rounded shadow-sm"
                    />
                  </div>
                </Stack>
              )}
              {viewModel.photos.description && (
                <Stack gap="xs">
                  <Text strong>Photo Descriptions</Text>
                  <Text multiline>{viewModel.photos.description}</Text>
                </Stack>
              )}
              {viewModel.photos.photographer && (
                <Stack gap="xs">
                  <Text strong>Photographer</Text>
                  <Text>{viewModel.photos.photographer}</Text>
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
