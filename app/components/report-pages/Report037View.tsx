/**
 * @file Report037View.tsx
 * @module report-pages
 * @description View component for Invoice Tracking
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
import { Report037ViewModel } from "./report-037ViewModel";

interface Report037ViewProps {
  viewModel: Report037ViewModel;
}

export default function Report037View({ viewModel }: Report037ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Invoice Tracking</Text>
            <Badge>financial</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Invoice Tracking</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.period && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Reporting Period:</Text>
                  <Text>{viewModel.header.period}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Invoice Section */}
          <Stack gap="md">
            <Text variant="h2">Invoice Details</Text>
            <Stack gap="md">
              {viewModel.invoice.number && (
                <Stack gap="xs">
                  <Text strong>Invoice Number</Text>
                  <Text>{viewModel.invoice.number}</Text>
                </Stack>
              )}
              {viewModel.invoice.vendor && (
                <Stack gap="xs">
                  <Text strong>Vendor</Text>
                  <Text>{viewModel.invoice.vendor}</Text>
                </Stack>
              )}
              {viewModel.invoice.amount && (
                <Stack gap="xs">
                  <Text strong>Invoice Amount</Text>
                  <Text>{viewModel.invoice.amount}</Text>
                </Stack>
              )}
              {viewModel.invoice.date && (
                <Stack gap="xs">
                  <Text strong>Invoice Date</Text>
                  <Text>{viewModel.invoice.date}</Text>
                </Stack>
              )}
              {viewModel.invoice.status && (
                <Stack gap="xs">
                  <Text strong>Payment Status</Text>
                  <Text>{viewModel.invoice.status}</Text>
                </Stack>
              )}
              {viewModel.invoice.dueDate && (
                <Stack gap="xs">
                  <Text strong>Due Date</Text>
                  <Text>{viewModel.invoice.dueDate}</Text>
                </Stack>
              )}
              {viewModel.invoice.description && (
                <Stack gap="xs">
                  <Text strong>Invoice Description</Text>
                  <Text multiline>{viewModel.invoice.description}</Text>
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

