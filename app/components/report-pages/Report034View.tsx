/**
 * @file Report034View.tsx
 * @module report-pages
 * @description View component for Emergency Response Plan
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
import { Report034ViewModel } from "./report-034ViewModel";

interface Report034ViewProps {
  viewModel: Report034ViewModel;
}

export default function Report034View({ viewModel }: Report034ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Emergency Response Plan</Text>
            <Badge>safety</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Emergency Response Plan</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Plan Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Emergency Section */}
          <Stack gap="md">
            <Text variant="h2">Emergency Response Details</Text>
            <Stack gap="md">
              {viewModel.emergency.types && (
                <Stack gap="xs">
                  <Text strong>Emergency Types</Text>
                  <Text multiline>{viewModel.emergency.types}</Text>
                </Stack>
              )}
              {viewModel.emergency.procedures && (
                <Stack gap="xs">
                  <Text strong>Emergency Procedures</Text>
                  <Text multiline>{viewModel.emergency.procedures}</Text>
                </Stack>
              )}
              {viewModel.emergency.contacts && (
                <Stack gap="xs">
                  <Text strong>Emergency Contacts</Text>
                  <Text multiline>{viewModel.emergency.contacts}</Text>
                </Stack>
              )}
              {viewModel.emergency.equipment && (
                <Stack gap="xs">
                  <Text strong>Emergency Equipment</Text>
                  <Text multiline>{viewModel.emergency.equipment}</Text>
                </Stack>
              )}
              {viewModel.emergency.assembly && (
                <Stack gap="xs">
                  <Text strong>Assembly Points</Text>
                  <Text multiline>{viewModel.emergency.assembly}</Text>
                </Stack>
              )}
              {viewModel.emergency.review && (
                <Stack gap="xs">
                  <Text strong>Review Date</Text>
                  <Text>{viewModel.emergency.review}</Text>
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

