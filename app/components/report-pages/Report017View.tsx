/**
 * @file Report017View.tsx
 * @module report-pages
 * @description View component for Punch List
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
import { Report017ViewModel } from "./report-017ViewModel";

interface Report017ViewProps {
  viewModel: Report017ViewModel;
}

export default function Report017View({ viewModel }: Report017ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Punch List</Text>
            <Badge>quality-control</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Punch List</Text>
            <Stack gap="xs">
              {viewModel.header.project && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Project:</Text>
                  <Text>{viewModel.header.project}</Text>
                </Section>
              )}
              {viewModel.header.location && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Location:</Text>
                  <Text>{viewModel.header.location}</Text>
                </Section>
              )}
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Punch List Section */}
          <Stack gap="md">
            <Text variant="h2">Punch List Items</Text>
            <Stack gap="md">
              {viewModel.punch.item1 && (
                <Stack gap="xs">
                  <Text strong>Item 1</Text>
                  <Text multiline>{viewModel.punch.item1}</Text>
                </Stack>
              )}
              {viewModel.punch.item2 && (
                <Stack gap="xs">
                  <Text strong>Item 2</Text>
                  <Text multiline>{viewModel.punch.item2}</Text>
                </Stack>
              )}
              {viewModel.punch.item3 && (
                <Stack gap="xs">
                  <Text strong>Item 3</Text>
                  <Text multiline>{viewModel.punch.item3}</Text>
                </Stack>
              )}
              {viewModel.punch.item4 && (
                <Stack gap="xs">
                  <Text strong>Item 4</Text>
                  <Text multiline>{viewModel.punch.item4}</Text>
                </Stack>
              )}
              {viewModel.punch.item5 && (
                <Stack gap="xs">
                  <Text strong>Item 5</Text>
                  <Text multiline>{viewModel.punch.item5}</Text>
                </Stack>
              )}
              {viewModel.punch.responsible && (
                <Stack gap="xs">
                  <Text strong>Responsible Party</Text>
                  <Text>{viewModel.punch.responsible}</Text>
                </Stack>
              )}
              {viewModel.punch.dueDate && (
                <Stack gap="xs">
                  <Text strong>Due Date</Text>
                  <Text>{viewModel.punch.dueDate}</Text>
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
