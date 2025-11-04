/**
 * @file Report039View.tsx
 * @module report-pages
 * @description View component for Payment Application
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
import { Report039ViewModel } from "./report-039ViewModel";

interface Report039ViewProps {
  viewModel: Report039ViewModel;
}

export default function Report039View({ viewModel }: Report039ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Payment Application</Text>
            <Badge>financial</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Payment Application</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Application Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Payment Section */}
          <Stack gap="md">
            <Text variant="h2">Payment Details</Text>
            <Stack gap="md">
              {viewModel.payment.period && (
                <Stack gap="xs">
                  <Text strong>Payment Period</Text>
                  <Text>{viewModel.payment.period}</Text>
                </Stack>
              )}
              {viewModel.payment.contractor && (
                <Stack gap="xs">
                  <Text strong>Contractor</Text>
                  <Text>{viewModel.payment.contractor}</Text>
                </Stack>
              )}
              {viewModel.payment.amount && (
                <Stack gap="xs">
                  <Text strong>Application Amount</Text>
                  <Text>{viewModel.payment.amount}</Text>
                </Stack>
              )}
              {viewModel.payment.workCompleted && (
                <Stack gap="xs">
                  <Text strong>Work Completed</Text>
                  <Text multiline>{viewModel.payment.workCompleted}</Text>
                </Stack>
              )}
              {viewModel.payment.retention && (
                <Stack gap="xs">
                  <Text strong>Retention</Text>
                  <Text>{viewModel.payment.retention}</Text>
                </Stack>
              )}
              {viewModel.payment.previousPayments && (
                <Stack gap="xs">
                  <Text strong>Previous Payments</Text>
                  <Text>{viewModel.payment.previousPayments}</Text>
                </Stack>
              )}
              {viewModel.payment.totalDue && (
                <Stack gap="xs">
                  <Text strong>Total Amount Due</Text>
                  <Text>{viewModel.payment.totalDue}</Text>
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

