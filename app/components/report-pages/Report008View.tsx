/**
 * @file Report008View.tsx
 * @module report-pages
 * @description View component for Material Delivery Log
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
import { Report008ViewModel } from "./report-008ViewModel";

interface Report008ViewProps {
  viewModel: Report008ViewModel;
}

export default function Report008View({ viewModel }: Report008ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Material Delivery Log</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Material Delivery Log</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Delivery Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.supplier && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Supplier:</Text>
                  <Text>{viewModel.header.supplier}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Material Section */}
          <Stack gap="md">
            <Text variant="h2">Material</Text>
            <Stack gap="md">
              {viewModel.material.type && (
                <Stack gap="xs">
                  <Text strong>Material Type</Text>
                  <Text>{viewModel.material.type}</Text>
                </Stack>
              )}
              {viewModel.material.quantity && (
                <Stack gap="xs">
                  <Text strong>Quantity</Text>
                  <Text>{viewModel.material.quantity}</Text>
                </Stack>
              )}
              {viewModel.material.specifications && (
                <Stack gap="xs">
                  <Text strong>Specifications</Text>
                  <Text multiline>{viewModel.material.specifications}</Text>
                </Stack>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Delivery Section */}
          <Stack gap="md">
            <Text variant="h2">Delivery</Text>
            <Stack gap="md">
              {viewModel.delivery.location && (
                <Stack gap="xs">
                  <Text strong>Delivery Location</Text>
                  <Text>{viewModel.delivery.location}</Text>
                </Stack>
              )}
              {viewModel.delivery.time && (
                <Stack gap="xs">
                  <Text strong>Delivery Time</Text>
                  <Text>{viewModel.delivery.time}</Text>
                </Stack>
              )}
              {viewModel.delivery.driver && (
                <Stack gap="xs">
                  <Text strong>Driver Name</Text>
                  <Text>{viewModel.delivery.driver}</Text>
                </Stack>
              )}
              {viewModel.delivery.vehicle && (
                <Stack gap="xs">
                  <Text strong>Vehicle ID</Text>
                  <Text>{viewModel.delivery.vehicle}</Text>
                </Stack>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Quality Section */}
          <Stack gap="md">
            <Text variant="h2">Quality</Text>
            {viewModel.quality.inspection && (
              <Stack gap="xs">
                <Text strong>Quality Inspection</Text>
                <Text multiline>{viewModel.quality.inspection}</Text>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Page>

      {/* Footer */}
      <div className="border-t border-gray-300 bg-white h-8" />
    </div>
  );
}

