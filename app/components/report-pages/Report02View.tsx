/* app/components/report-pages/Report02View.tsx */
"use client";

import Page from "../report-primitives/Page";
import Section from "../report-primitives/Section";
import Stack from "../report-primitives/Stack";
import Text from "../report-primitives/Text";
import Badge from "../report-primitives/Badge";
import Rule from "../report-primitives/Rule";

export interface Report02Props {
  headerTitle: string;
  headerSubtitle: string;
  headerDate: string;
  contentGreeting: string;
  contentDescription: string;
  contentStatus: string;
  footerAuthor: string;
  footerVersion: string;
  footerNotes: string;
}

export default function Report02View({
  headerTitle,
  headerSubtitle,
  headerDate,
  contentGreeting,
  contentDescription,
  contentStatus,
  footerAuthor,
  footerVersion,
  footerNotes,
}: Report02Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-4">
          <Section align="center" justify="between">
            <div>
              <Text variant="h1" className="text-2xl font-bold text-gray-900">
                {headerTitle}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">
                {headerSubtitle}
              </Text>
            </div>
            <div className="flex items-center gap-4">
              <Text className="text-sm text-gray-500">{headerDate}</Text>
              {contentStatus && <Badge>{contentStatus}</Badge>}
            </div>
          </Section>
        </div>
      </div>

      {/* Main content */}
      <Page>
        <div className="max-w-4xl mx-auto">
          <Stack gap="lg">
            {/* Greeting Section */}
            <Section align="start" justify="between" className="py-12">
              <div className="text-center w-full">
                <Text variant="h1" className="text-4xl font-bold text-blue-600 mb-4">
                  {contentGreeting}
                </Text>
                <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
              </div>
            </Section>

            <Rule />

            {/* Description Section */}
            <Stack gap="md">
              <Text variant="h2" className="text-xl font-semibold text-gray-800">
                About This Template
              </Text>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <Text className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {contentDescription}
                </Text>
              </div>
            </Stack>

            {/* Status Section */}
            <Section align="start" justify="between" className="py-8">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 w-full">
                <Text className="text-blue-800 font-medium text-center">
                  Current Status: <Badge>{contentStatus}</Badge>
                </Text>
              </div>
            </Section>
          </Stack>
        </div>
      </Page>

      {/* Footer */}
      <div className="border-t border-gray-300 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-4">
          <Section align="center" justify="between">
            <div>
              <Text className="text-sm text-gray-600">
                Created by: <span className="font-medium">{footerAuthor}</span>
              </Text>
              <Text className="text-xs text-gray-500 mt-1">
                Version: {footerVersion}
              </Text>
            </div>
            <div className="text-right max-w-md">
              <Text className="text-xs text-gray-500">
                {footerNotes}
              </Text>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
