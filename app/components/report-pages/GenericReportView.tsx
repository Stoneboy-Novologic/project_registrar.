/* app/components/report-pages/GenericReportView.tsx */
"use client";

import React from "react";
import Page from "../report-primitives/Page";
import Section from "../report-primitives/Section";
import Stack from "../report-primitives/Stack";
import Text from "../report-primitives/Text";
import Badge from "../report-primitives/Badge";
import Table from "../report-primitives/Table";
import Cluster from "../report-primitives/Cluster";
import { buildGenericViewModel, transformDottedFields } from "./viewModelFactory";
import type { TemplateField } from "@/lib/types";

interface GenericReportViewProps {
  template: {
    pageId: string;
    title: string;
    fields: TemplateField[];
  };
  values: Record<string, string>;
}

export default function GenericReportView({ template, values }: GenericReportViewProps) {
  console.log("GenericReportView rendering:", { template: template.title, fieldCount: template.fields.length });
  
  // Build view model from values and fields
  const viewModel = buildGenericViewModel(values, template.fields);
  
  // Transform dotted fields to nested structure for easier access
  const nestedValues = transformDottedFields(values);
  
  // Group fields by their base section (first part of dotted ID)
  const fieldGroups = template.fields.reduce((groups, field) => {
    const baseId = field.id.split('.')[0];
    if (!groups[baseId]) {
      groups[baseId] = [];
    }
    groups[baseId].push(field);
    return groups;
  }, {} as Record<string, TemplateField[]>);
  
  // Render HTML content (for bold/italic formatting)
  const renderHTMLContent = (content?: string) => {
    if (!content) return null;
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };
  
  // Render a field based on its type and value
  const renderField = (field: TemplateField, value: any) => {
    if (!value || value === '') return null;
    
    switch (field.type) {
      case 'text':
      case 'date':
        return (
          <Text className="text-gray-700">
            {value}
          </Text>
        );
        
      case 'multiline':
        return (
          <div className="text-gray-700">
            {renderHTMLContent(value)}
          </div>
        );
        
      case 'link':
        const url = value.startsWith('http') ? value : `https://${value}`;
        return (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            {value}
          </a>
        );
        
      case 'badge':
        return <Badge>{value}</Badge>;
        
      case 'image':
        return (
          <img 
            src={value} 
            alt={field.label}
            className="max-w-full h-auto rounded-lg shadow-sm"
          />
        );
        
      case 'attachments':
      case 'authors':
      case 'contents':
        if (Array.isArray(value) && value.length > 0) {
          return (
            <div className="space-y-2">
              {value.map((item: any, index: number) => (
                <div key={index} className="text-gray-700">
                  {typeof item === 'string' ? item : JSON.stringify(item)}
                </div>
              ))}
            </div>
          );
        }
        return null;
        
      default:
        return (
          <Text className="text-gray-700">
            {value}
          </Text>
        );
    }
  };
  
  // Render a group of fields as a section
  const renderFieldGroup = (groupName: string, fields: TemplateField[]) => {
    const hasContent = fields.some(field => {
      const value = viewModel[field.id];
      return value && value !== '';
    });
    
    if (!hasContent) return null;
    
    return (
      <div key={groupName} className="mb-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <Text className="text-4xl font-bold text-gray-300">
            {groupName.charAt(0).toUpperCase()}
          </Text>
          <Text variant="h2" className="text-xl font-bold text-blue-600">
            {groupName.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
          </Text>
        </div>
        
        {/* Section content */}
        <Stack gap="md" className="ml-8">
          {fields.map(field => {
            const value = viewModel[field.id];
            return (
              <div key={field.id}>
                {renderField(field, value)}
              </div>
            );
          })}
        </Stack>
      </div>
    );
  };
  
  // Check if we have header fields for a proper header section
  const headerFields = template.fields.filter(field => field.id.startsWith('header.'));
  const hasHeader = headerFields.length > 0 && headerFields.some(field => viewModel[field.id]);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section (if header fields exist) */}
      {hasHeader && (
        <div className="border-b border-gray-300 bg-white">
          <div className="max-w-[1440px] mx-auto px-10 md:px-12 lg:px-14 py-3">
            <Section align="center" justify="between">
              <div>
                {viewModel['header.region'] && (
                  <Text variant="breadcrumb">{viewModel['header.region']}</Text>
                )}
                {viewModel['header.projectInfo'] && (
                  <Text className="text-sm text-gray-600 mt-1">{viewModel['header.projectInfo']}</Text>
                )}
              </div>
              {viewModel['header.badge'] && <Badge>{viewModel['header.badge']}</Badge>}
            </Section>
          </div>
        </div>
      )}
      
      {/* Main content area */}
      <Page>
        <Stack gap="lg">
          {/* Render each field group as a section */}
          {Object.entries(fieldGroups).map(([groupName, fields]) => {
            // Skip header fields as they're rendered separately
            if (groupName === 'header') return null;
            
            return renderFieldGroup(groupName, fields);
          })}
          
          {/* Fallback: if no groups, render all fields in a single section */}
          {Object.keys(fieldGroups).length === 0 && (
            <div className="space-y-4">
              {template.fields.map(field => {
                const value = viewModel[field.id];
                return (
                  <div key={field.id}>
                    <Text className="font-semibold text-gray-800 mb-2">
                      {field.label}:
                    </Text>
                    {renderField(field, value)}
                  </div>
                );
              })}
            </div>
          )}
        </Stack>
      </Page>
    </div>
  );
}
