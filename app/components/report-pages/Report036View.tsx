/**
 * @file Report036View.tsx
 * @module report-pages
 * @description View component for Purchase Order Log
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
import { Report036ViewModel } from "./report-036ViewModel";

interface Report036ViewProps {
  viewModel: Report036ViewModel;
}

export default function Report036View({ viewModel }: Report036ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Purchase Order Log</Text>
            <Badge>financial</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Purchase Order Log</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Order Date:</Text>
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

          {/* PO Section */}
          <Stack gap="md">
            <Text variant="h2">Purchase Order Details</Text>
            <Stack gap="md">
              {viewModel.po.number && (
                <Stack gap="xs">
                  <Text strong>PO Number</Text>
                  <Text>{viewModel.po.number}</Text>
                </Stack>
              )}
              {viewModel.po.vendor && (
                <Stack gap="xs">
                  <Text strong>Vendor</Text>
                  <Text>{viewModel.po.vendor}</Text>
                </Stack>
              )}
              {viewModel.po.description && (
                <Stack gap="xs">
                  <Text strong>Description</Text>
                  <Text multiline>{viewModel.po.description}</Text>
                </Stack>
              )}
              {viewModel.po.amount && (
                <Stack gap="xs">
                  <Text strong>Order Amount</Text>
                  <Text>{viewModel.po.amount}</Text>
                </Stack>
              )}
              {viewModel.po.status && (
                <Stack gap="xs">
                  <Text strong>PO Status</Text>
                  <Text>{viewModel.po.status}</Text>
                </Stack>
              )}
              {viewModel.po.expectedDelivery && (
                <Stack gap="xs">
                  <Text strong>Expected Delivery</Text>
                  <Text>{viewModel.po.expectedDelivery}</Text>
                </Stack>
              )}
              {viewModel.po.notes && (
                <Stack gap="xs">
                  <Text strong>Notes</Text>
                  <Text multiline>{viewModel.po.notes}</Text>
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

