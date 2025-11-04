/**
 * @file Report009View.tsx
 * @module report-pages
 * @description View component for Equipment Usage Report
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
import { Report009ViewModel } from "./report-009ViewModel";

interface Report009ViewProps {
  viewModel: Report009ViewModel;
}

export default function Report009View({ viewModel }: Report009ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Equipment Usage Report</Text>
            <Badge>technical</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Equipment Usage Report</Text>
            {viewModel.header.date && (
              <Section align="start" justify="start" className="gap-4">
                <Text strong>Report Date:</Text>
                <Text>{viewModel.header.date}</Text>
              </Section>
            )}
          </Stack>

          <Rule />

          {/* Equipment Section */}
          <Stack gap="md">
            <Text variant="h2">Equipment</Text>
            <Stack gap="md">
              {viewModel.equipment.excavator && (
                <Stack gap="xs">
                  <Text strong>Excavator Hours</Text>
                  <Text>{viewModel.equipment.excavator}</Text>
                </Stack>
              )}
              {viewModel.equipment.crane && (
                <Stack gap="xs">
                  <Text strong>Crane Hours</Text>
                  <Text>{viewModel.equipment.crane}</Text>
                </Stack>
              )}
              {viewModel.equipment.compactor && (
                <Stack gap="xs">
                  <Text strong>Compactor Hours</Text>
                  <Text>{viewModel.equipment.compactor}</Text>
                </Stack>
              )}
              {viewModel.equipment.generator && (
                <Stack gap="xs">
                  <Text strong>Generator Hours</Text>
                  <Text>{viewModel.equipment.generator}</Text>
                </Stack>
              )}
              {viewModel.equipment.maintenance && (
                <Stack gap="xs">
                  <Text strong>Maintenance Performed</Text>
                  <Text multiline>{viewModel.equipment.maintenance}</Text>
                </Stack>
              )}
              {viewModel.equipment.issues && (
                <Stack gap="xs">
                  <Text strong>Equipment Issues</Text>
                  <Text multiline>{viewModel.equipment.issues}</Text>
                </Stack>
              )}
              {viewModel.equipment.fuel && (
                <Stack gap="xs">
                  <Text strong>Fuel Consumption</Text>
                  <Text>{viewModel.equipment.fuel}</Text>
                </Stack>
              )}
              {viewModel.equipment.operator && (
                <Stack gap="xs">
                  <Text strong>Primary Operator</Text>
                  <Text>{viewModel.equipment.operator}</Text>
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

