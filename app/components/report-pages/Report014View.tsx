/**
 * @file Report014View.tsx
 * @module report-pages
 * @description View component for Meeting Minutes
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
import { Report014ViewModel } from "./report-014ViewModel";

interface Report014ViewProps {
  viewModel: Report014ViewModel;
}

export default function Report014View({ viewModel }: Report014ViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
          <Section align="center" justify="between">
            <Text variant="breadcrumb">Meeting Minutes</Text>
            <Badge>project-documentation</Badge>
          </Section>
        </div>
      </div>

      {/* Main Content */}
      <Page>
        <Stack gap="lg">
          {/* Header Section */}
          <Stack gap="md">
            <Text variant="h1">Meeting Minutes</Text>
            <Stack gap="xs">
              {viewModel.header.date && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Meeting Date:</Text>
                  <Text>{viewModel.header.date}</Text>
                </Section>
              )}
              {viewModel.header.time && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Meeting Time:</Text>
                  <Text>{viewModel.header.time}</Text>
                </Section>
              )}
              {viewModel.header.location && (
                <Section align="start" justify="start" className="gap-4">
                  <Text strong>Meeting Location:</Text>
                  <Text>{viewModel.header.location}</Text>
                </Section>
              )}
            </Stack>
          </Stack>

          <Rule />

          {/* Attendees Section */}
          {viewModel.attendees.list && (
            <>
              <Stack gap="md">
                <Text variant="h2">Attendees</Text>
                <Text multiline>{viewModel.attendees.list}</Text>
              </Stack>
              <Rule />
            </>
          )}

          {/* Agenda Section */}
          {viewModel.agenda.items && (
            <>
              <Stack gap="md">
                <Text variant="h2">Agenda</Text>
                <Text multiline>{viewModel.agenda.items}</Text>
              </Stack>
              <Rule />
            </>
          )}

          {/* Decisions Section */}
          {viewModel.decisions.made && (
            <>
              <Stack gap="md">
                <Text variant="h2">Decisions</Text>
                <Text multiline>{viewModel.decisions.made}</Text>
              </Stack>
              <Rule />
            </>
          )}

          {/* Action Items Section */}
          {viewModel.action.items && (
            <>
              <Stack gap="md">
                <Text variant="h2">Action Items</Text>
                <Text multiline>{viewModel.action.items}</Text>
              </Stack>
              <Rule />
            </>
          )}

          {/* Next Meeting Section */}
          {viewModel.next.meeting && (
            <Stack gap="md">
              <Text variant="h2">Next Meeting</Text>
              <Text>{viewModel.next.meeting}</Text>
            </Stack>
          )}

          {/* Minutes Recorder */}
          {viewModel.minutes.recorder && (
            <>
              <Rule />
              <Stack gap="md">
                <Text variant="h2">Minutes Recorder</Text>
                <Text>{viewModel.minutes.recorder}</Text>
              </Stack>
            </>
          )}
        </Stack>
      </Page>

      {/* Footer */}
      <div className="border-t border-gray-300 bg-white h-8" />
    </div>
  );
}
