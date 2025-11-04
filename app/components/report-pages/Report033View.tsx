/**
 * @file Report033View.tsx
 * @module report-pages
 * @description View component for Safety Equipment Inspection
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
import { Report033ViewModel } from "./report-033ViewModel";

interface Report033ViewProps {
  viewModel: Report033ViewModel;
}

export default function Report033View({ viewModel }: Report033ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Safety Equipment Inspection</Text>
            <Badge>safety</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Safety Equipment Inspection</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Inspection Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.inspector && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Inspector:</Text>
                  <Text>{viewModel.header.inspector}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Equipment Section */}
          <Stack gap="md">
            <Text variant="h2">Equipment Information</Text>
            <Stack gap="md">
              {viewModel.equipment.type && (
                <Stack gap="xs">
                  <Text strong>Equipment Type</Text>
                  <Text>{viewModel.equipment.type}</Text>
                </Stack>
              )}
              {viewModel.equipment.quantity && (
                <Stack gap="xs">
                  <Text strong>Quantity Inspected</Text>
                  <Text>{viewModel.equipment.quantity}</Text>
                </Stack>
              )}
              {viewModel.equipment.condition && (
                <Stack gap="xs">
                  <Text strong>Equipment Condition</Text>
                  <Text multiline>{viewModel.equipment.condition}</Text>
                </Stack>
              )}
              {viewModel.equipment.defects && (
                <Stack gap="xs">
                  <Text strong>Defects Found</Text>
                  <Text multiline>{viewModel.equipment.defects}</Text>
                </Stack>
              )}
              {viewModel.equipment.action && (
                <Stack gap="xs">
                  <Text strong>Corrective Actions</Text>
                  <Text multiline>{viewModel.equipment.action}</Text>
                </Stack>
              )}
              {viewModel.equipment.nextInspection && (
                <Stack gap="xs">
                  <Text strong>Next Inspection Date</Text>
                  <Text>{viewModel.equipment.nextInspection}</Text>
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

