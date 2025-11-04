#!/usr/bin/env tsx

/**
 * @file generateAllComponents.ts
 * @module scripts
 * @description Generate custom components for all 18 remaining report templates
 * @author BharatERP
 * @created 2025-01-27
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { TemplateField } from '../lib/types';

interface ComponentConfig {
  pageId: string;
  title: string;
  category: string;
  fields: Array<{
    id: string;
    label: string;
    type: string;
    group: string;
  }>;
}

// Extract group from field ID (e.g., "header.project" -> "header")
function getGroupFromId(fieldId: string): string {
  const parts = fieldId.split('.');
  return parts.length > 1 ? parts[0] : 'general';
}

// All 18 templates that need custom components
const templates: ComponentConfig[] = [
  {
    pageId: "report-007",
    title: "Daily Progress Report",
    category: "project-documentation",
    fields: [
      { id: "header.date", label: "Report Date", type: "date", group: "header" },
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "progress.weather", label: "Weather Conditions", type: "text", group: "progress" },
      { id: "progress.workCompleted", label: "Work Completed", type: "multiline", group: "progress" },
      { id: "progress.workPlanned", label: "Work Planned", type: "multiline", group: "progress" },
      { id: "progress.issues", label: "Issues/Concerns", type: "multiline", group: "progress" },
      { id: "progress.materials", label: "Materials Used", type: "multiline", group: "progress" },
      { id: "progress.labor", label: "Labor Hours", type: "text", group: "progress" }
    ]
  },
  {
    pageId: "report-008",
    title: "Material Delivery Log",
    category: "project-documentation",
    fields: [
      { id: "header.date", label: "Delivery Date", type: "date", group: "header" },
      { id: "header.supplier", label: "Supplier", type: "text", group: "header" },
      { id: "material.type", label: "Material Type", type: "text", group: "material" },
      { id: "material.quantity", label: "Quantity", type: "text", group: "material" },
      { id: "material.specifications", label: "Specifications", type: "multiline", group: "material" },
      { id: "delivery.location", label: "Delivery Location", type: "text", group: "delivery" },
      { id: "delivery.time", label: "Delivery Time", type: "text", group: "delivery" },
      { id: "quality.inspection", label: "Quality Inspection", type: "multiline", group: "quality" },
      { id: "delivery.driver", label: "Driver Name", type: "text", group: "delivery" },
      { id: "delivery.vehicle", label: "Vehicle ID", type: "text", group: "delivery" }
    ]
  },
  {
    pageId: "report-009",
    title: "Equipment Usage Report",
    category: "technical",
    fields: [
      { id: "header.date", label: "Report Date", type: "date", group: "header" },
      { id: "equipment.excavator", label: "Excavator Hours", type: "text", group: "equipment" },
      { id: "equipment.crane", label: "Crane Hours", type: "text", group: "equipment" },
      { id: "equipment.compactor", label: "Compactor Hours", type: "text", group: "equipment" },
      { id: "equipment.generator", label: "Generator Hours", type: "text", group: "equipment" },
      { id: "equipment.maintenance", label: "Maintenance Performed", type: "multiline", group: "equipment" },
      { id: "equipment.issues", label: "Equipment Issues", type: "multiline", group: "equipment" },
      { id: "equipment.fuel", label: "Fuel Consumption", type: "text", group: "equipment" },
      { id: "equipment.operator", label: "Primary Operator", type: "text", group: "equipment" }
    ]
  },
  {
    pageId: "report-010",
    title: "Quality Control Checklist",
    category: "quality-control",
    fields: [
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "header.location", label: "Location", type: "text", group: "header" },
      { id: "header.date", label: "Inspection Date", type: "date", group: "header" },
      { id: "qc.concrete", label: "Concrete Quality", type: "multiline", group: "qc" },
      { id: "qc.reinforcement", label: "Reinforcement Check", type: "multiline", group: "qc" },
      { id: "qc.dimensions", label: "Dimensional Accuracy", type: "multiline", group: "qc" },
      { id: "qc.finish", label: "Surface Finish", type: "multiline", group: "qc" },
      { id: "qc.testing", label: "Test Results", type: "multiline", group: "qc" },
      { id: "qc.nonConformances", label: "Non-Conformances", type: "multiline", group: "qc" },
      { id: "qc.corrective", label: "Corrective Actions", type: "multiline", group: "qc" },
      { id: "qc.inspector", label: "QC Inspector", type: "text", group: "qc" }
    ]
  },
  {
    pageId: "report-012",
    title: "Change Order Request",
    category: "financial",
    fields: [
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "header.date", label: "Request Date", type: "date", group: "header" },
      { id: "header.number", label: "Change Order #", type: "text", group: "header" },
      { id: "change.description", label: "Change Description", type: "multiline", group: "change" },
      { id: "change.reason", label: "Reason for Change", type: "multiline", group: "change" },
      { id: "change.impact", label: "Schedule Impact", type: "multiline", group: "change" },
      { id: "change.cost", label: "Cost Impact", type: "text", group: "change" },
      { id: "change.approval", label: "Approval Required", type: "text", group: "change" },
      { id: "change.requestor", label: "Requested By", type: "text", group: "change" }
    ]
  },
  {
    pageId: "report-013",
    title: "Site Photos Documentation",
    category: "technical",
    fields: [
      { id: "header.date", label: "Photo Date", type: "date", group: "header" },
      { id: "header.location", label: "Site Location", type: "text", group: "header" },
      { id: "photos.progress", label: "Progress Photos", type: "image", group: "photos" },
      { id: "photos.quality", label: "Quality Photos", type: "image", group: "photos" },
      { id: "photos.issues", label: "Issue Photos", type: "image", group: "photos" },
      { id: "photos.description", label: "Photo Descriptions", type: "multiline", group: "photos" },
      { id: "photos.photographer", label: "Photographer", type: "text", group: "photos" }
    ]
  },
  {
    pageId: "report-014",
    title: "Meeting Minutes",
    category: "project-documentation",
    fields: [
      { id: "header.date", label: "Meeting Date", type: "date", group: "header" },
      { id: "header.time", label: "Meeting Time", type: "text", group: "header" },
      { id: "header.location", label: "Meeting Location", type: "text", group: "header" },
      { id: "attendees.list", label: "Attendees", type: "multiline", group: "attendees" },
      { id: "agenda.items", label: "Agenda Items", type: "multiline", group: "agenda" },
      { id: "decisions.made", label: "Decisions Made", type: "multiline", group: "decisions" },
      { id: "action.items", label: "Action Items", type: "multiline", group: "action" },
      { id: "next.meeting", label: "Next Meeting", type: "text", group: "next" },
      { id: "minutes.recorder", label: "Minutes Recorder", type: "text", group: "minutes" }
    ]
  },
  {
    pageId: "report-015",
    title: "RFI (Request for Information)",
    category: "technical",
    fields: [
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "header.date", label: "RFI Date", type: "date", group: "header" },
      { id: "header.number", label: "RFI Number", type: "text", group: "header" },
      { id: "rfi.question", label: "Question/Issue", type: "multiline", group: "rfi" },
      { id: "rfi.context", label: "Context/Background", type: "multiline", group: "rfi" },
      { id: "rfi.impact", label: "Project Impact", type: "multiline", group: "rfi" },
      { id: "rfi.urgency", label: "Urgency Level", type: "text", group: "rfi" },
      { id: "rfi.requestor", label: "Requested By", type: "text", group: "rfi" },
      { id: "rfi.response", label: "Response Required By", type: "date", group: "rfi" }
    ]
  },
  {
    pageId: "report-016",
    title: "Submittal Log",
    category: "project-documentation",
    fields: [
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "submittal.number", label: "Submittal Number", type: "text", group: "submittal" },
      { id: "submittal.date", label: "Submittal Date", type: "date", group: "submittal" },
      { id: "submittal.type", label: "Submittal Type", type: "text", group: "submittal" },
      { id: "submittal.description", label: "Description", type: "multiline", group: "submittal" },
      { id: "submittal.status", label: "Status", type: "text", group: "submittal" },
      { id: "submittal.response", label: "Response Date", type: "date", group: "submittal" },
      { id: "submittal.approved", label: "Approved By", type: "text", group: "submittal" }
    ]
  },
  {
    pageId: "report-017",
    title: "Punch List",
    category: "quality-control",
    fields: [
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "header.location", label: "Location", type: "text", group: "header" },
      { id: "header.date", label: "Punch List Date", type: "date", group: "header" },
      { id: "punch.item1", label: "Item 1", type: "multiline", group: "punch" },
      { id: "punch.item2", label: "Item 2", type: "multiline", group: "punch" },
      { id: "punch.item3", label: "Item 3", type: "multiline", group: "punch" },
      { id: "punch.item4", label: "Item 4", type: "multiline", group: "punch" },
      { id: "punch.item5", label: "Item 5", type: "multiline", group: "punch" },
      { id: "punch.responsible", label: "Responsible Party", type: "text", group: "punch" },
      { id: "punch.dueDate", label: "Due Date", type: "date", group: "punch" }
    ]
  },
  {
    pageId: "report-018",
    title: "Weather Report",
    category: "technical",
    fields: [
      { id: "header.date", label: "Report Date", type: "date", group: "header" },
      { id: "weather.temperature", label: "Temperature", type: "text", group: "weather" },
      { id: "weather.conditions", label: "Weather Conditions", type: "text", group: "weather" },
      { id: "weather.wind", label: "Wind Speed", type: "text", group: "weather" },
      { id: "weather.precipitation", label: "Precipitation", type: "text", group: "weather" },
      { id: "weather.visibility", label: "Visibility", type: "text", group: "weather" },
      { id: "weather.impact", label: "Work Impact", type: "multiline", group: "weather" }
    ]
  },
  {
    pageId: "report-019",
    title: "Labor Hours Tracking",
    category: "project-documentation",
    fields: [
      { id: "header.date", label: "Report Date", type: "date", group: "header" },
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "labor.carpenters", label: "Carpenters", type: "text", group: "labor" },
      { id: "labor.electricians", label: "Electricians", type: "text", group: "labor" },
      { id: "labor.plumbers", label: "Plumbers", type: "text", group: "labor" },
      { id: "labor.laborers", label: "General Laborers", type: "text", group: "labor" },
      { id: "labor.total", label: "Total Hours", type: "text", group: "labor" },
      { id: "labor.overtime", label: "Overtime Hours", type: "text", group: "labor" },
      { id: "labor.notes", label: "Notes", type: "multiline", group: "labor" }
    ]
  },
  {
    pageId: "report-020",
    title: "Incident Report",
    category: "safety",
    fields: [
      { id: "header.date", label: "Incident Date", type: "date", group: "header" },
      { id: "header.time", label: "Incident Time", type: "text", group: "header" },
      { id: "header.location", label: "Incident Location", type: "text", group: "header" },
      { id: "incident.type", label: "Incident Type", type: "text", group: "incident" },
      { id: "incident.description", label: "Incident Description", type: "multiline", group: "incident" },
      { id: "incident.cause", label: "Root Cause", type: "multiline", group: "incident" },
      { id: "incident.injuries", label: "Injuries", type: "multiline", group: "incident" },
      { id: "incident.action", label: "Corrective Action", type: "multiline", group: "incident" },
      { id: "incident.reporter", label: "Reported By", type: "text", group: "incident" }
    ]
  },
  {
    pageId: "report-021",
    title: "Environmental Compliance",
    category: "technical",
    fields: [
      { id: "header.date", label: "Report Date", type: "date", group: "header" },
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "env.noise", label: "Noise Levels", type: "text", group: "env" },
      { id: "env.dust", label: "Dust Control", type: "multiline", group: "env" },
      { id: "env.water", label: "Water Management", type: "multiline", group: "env" },
      { id: "env.waste", label: "Waste Management", type: "multiline", group: "env" },
      { id: "env.wildlife", label: "Wildlife Impact", type: "multiline", group: "env" },
      { id: "env.compliance", label: "Compliance Status", type: "text", group: "env" }
    ]
  },
  {
    pageId: "report-022",
    title: "Subcontractor Performance",
    category: "project-documentation",
    fields: [
      { id: "header.date", label: "Report Date", type: "date", group: "header" },
      { id: "header.subcontractor", label: "Subcontractor", type: "text", group: "header" },
      { id: "perf.workQuality", label: "Work Quality", type: "text", group: "perf" },
      { id: "perf.schedule", label: "Schedule Adherence", type: "text", group: "perf" },
      { id: "perf.safety", label: "Safety Performance", type: "text", group: "perf" },
      { id: "perf.communication", label: "Communication", type: "text", group: "perf" },
      { id: "perf.issues", label: "Issues/Concerns", type: "multiline", group: "perf" },
      { id: "perf.recommendations", label: "Recommendations", type: "multiline", group: "perf" }
    ]
  },
  {
    pageId: "report-023",
    title: "Inspection Request",
    category: "quality-control",
    fields: [
      { id: "header.date", label: "Request Date", type: "date", group: "header" },
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "inspection.type", label: "Inspection Type", type: "text", group: "inspection" },
      { id: "inspection.location", label: "Inspection Location", type: "text", group: "inspection" },
      { id: "inspection.scheduled", label: "Scheduled Date", type: "date", group: "inspection" },
      { id: "inspection.time", label: "Scheduled Time", type: "text", group: "inspection" },
      { id: "inspection.inspector", label: "Inspector", type: "text", group: "inspection" },
      { id: "inspection.work", label: "Work to be Inspected", type: "multiline", group: "inspection" },
      { id: "inspection.requestor", label: "Requested By", type: "text", group: "inspection" }
    ]
  },
  {
    pageId: "report-024",
    title: "As-Built Documentation",
    category: "technical",
    fields: [
      { id: "header.date", label: "Documentation Date", type: "date", group: "header" },
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "asbuilt.location", label: "Location", type: "text", group: "asbuilt" },
      { id: "asbuilt.work", label: "Work Completed", type: "multiline", group: "asbuilt" },
      { id: "asbuilt.dimensions", label: "Actual Dimensions", type: "multiline", group: "asbuilt" },
      { id: "asbuilt.materials", label: "Materials Used", type: "multiline", group: "asbuilt" },
      { id: "asbuilt.deviations", label: "Deviations from Plans", type: "multiline", group: "asbuilt" },
      { id: "asbuilt.photos", label: "As-Built Photos", type: "image", group: "asbuilt" },
      { id: "asbuilt.documenter", label: "Documented By", type: "text", group: "asbuilt" }
    ]
  },
  {
    pageId: "report-025",
    title: "Project Closeout Checklist",
    category: "project-documentation",
    fields: [
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "header.completion", label: "Completion Date", type: "date", group: "header" },
      { id: "closeout.punchList", label: "Punch List Complete", type: "text", group: "closeout" },
      { id: "closeout.testing", label: "Testing Complete", type: "text", group: "closeout" },
      { id: "closeout.documentation", label: "Documentation Complete", type: "text", group: "closeout" },
      { id: "closeout.warranties", label: "Warranties Submitted", type: "text", group: "closeout" },
      { id: "closeout.permits", label: "Permits Closed", type: "text", group: "closeout" },
      { id: "closeout.cleanup", label: "Site Cleanup", type: "text", group: "closeout" },
      { id: "closeout.finalInspection", label: "Final Inspection", type: "text", group: "closeout" },
      { id: "closeout.clientAcceptance", label: "Client Acceptance", type: "text", group: "closeout" },
      { id: "closeout.notes", label: "Closeout Notes", type: "multiline", group: "closeout" }
    ]
  }
];

// Convert pageId to component name (e.g., "report-007" -> "Report007")
function pageIdToComponentName(pageId: string): string {
  // Extract number part (e.g., "007" from "report-007")
  const numberPart = pageId.replace('report-', '');
  // Pad with leading zero if single digit, otherwise use as-is
  const paddedNumber = numberPart.length === 1 ? `00${numberPart}` : numberPart.length === 2 ? `0${numberPart}` : numberPart;
  return `Report${paddedNumber}`;
}

function generateViewModel(config: ComponentConfig): string {
  const componentName = pageIdToComponentName(config.pageId);
  const groups = [...new Set(config.fields.map(f => f.group))];
  
  const interfaceFields = groups.map(group => {
    const groupFields = config.fields.filter(f => f.group === group);
    const fieldProps = groupFields.map(field => {
      const propName = field.id.split('.').pop() || field.id;
      return `    ${propName}: string;`;
    }).join('\n');
    
    return `  ${group}: {\n${fieldProps}\n  };`;
  }).join('\n');

  const buildFunction = groups.map(group => {
    const groupFields = config.fields.filter(f => f.group === group);
    const fieldMappings = groupFields.map(field => {
      const propName = field.id.split('.').pop() || field.id;
      return `      ${propName}: values["${field.id}"] || ""`;
    }).join(',\n');
    
    return `    ${group}: {\n${fieldMappings}\n    }`;
  }).join(',\n');

  return `/**
 * @file ${config.pageId}ViewModel.ts
 * @module report-pages
 * @description ViewModel for ${config.title}
 * @author BharatERP
 * @created 2025-01-27
 */

export interface ${componentName}ViewModel {
${interfaceFields}
}

export function build${componentName}ViewModel(values: any): ${componentName}ViewModel {
  return {
${buildFunction}
  };
}
`;
}

function generateViewComponent(config: ComponentConfig): string {
  const componentName = pageIdToComponentName(config.pageId);
  const className = config.pageId.replace('-', '') + '-report';
  
  const sections = [...new Set(config.fields.map(f => f.group))].map(group => {
    const groupFields = config.fields.filter(f => f.group === group);
    const fieldElements = groupFields.map(field => {
      const propName = field.id.split('.').pop() || field.id;
      const label = field.label;
      
      // Handle different field types
      if (field.type === 'multiline') {
        return `        <div className="field-group">
          <label className="field-label">${label}</label>
          <div className="field-value multiline" dangerouslySetInnerHTML={{ __html: viewModel.${group}.${propName}.replace(/\\n/g, '<br />') }} />
        </div>`;
      } else if (field.type === 'image') {
        return `        <div className="field-group">
          <label className="field-label">${label}</label>
          <div className="field-value image">
            {viewModel.${group}.${propName} ? (
              <img src={viewModel.${group}.${propName} as string} alt="${label}" className="report-image" />
            ) : (
              <span className="text-gray-400">No image uploaded</span>
            )}
          </div>
        </div>`;
      } else {
        return `        <div className="field-group">
          <label className="field-label">${label}</label>
          <div className="field-value">{viewModel.${group}.${propName}}</div>
        </div>`;
      }
    }).join('\n');
    
    return `      <div className="section ${group}-section">
        <h2 className="section-title">${group.charAt(0).toUpperCase() + group.slice(1).replace(/([A-Z])/g, ' $1')}</h2>
${fieldElements}
      </div>`;
  }).join('\n');

  return `/**
 * @file ${componentName}View.tsx
 * @module report-pages
 * @description View component for ${config.title}
 * @author BharatERP
 * @created 2025-01-27
 */

import { ${componentName}ViewModel } from "./${config.pageId}ViewModel";

interface ${componentName}ViewProps {
  viewModel: ${componentName}ViewModel;
}

export default function ${componentName}View({ viewModel }: ${componentName}ViewProps) {
  return (
    <div className="${className}">
      <div className="report-header">
        <h1 className="report-title">${config.title}</h1>
        <div className="report-meta">
          <span className="category-badge ${config.category}">${config.category}</span>
        </div>
      </div>
      
      <div className="report-content">
${sections}
      </div>
    </div>
  );
}
`;
}

function generateConnectedComponent(config: ComponentConfig): string {
  const componentName = pageIdToComponentName(config.pageId);
  
  return `/**
 * @file Connected${componentName}.tsx
 * @module report-pages
 * @description Connected component for ${config.title} with Zustand store integration
 * @author BharatERP
 * @created 2025-01-27
 */

"use client";
import { useEditorStore } from "@/lib/store";
import { build${componentName}ViewModel } from "./${config.pageId}ViewModel";
import ${componentName}View from "./${componentName}View";

export default function Connected${componentName}() {
  const values = useEditorStore((s) => s.values);
  const viewModel = build${componentName}ViewModel(values);
  
  return <${componentName}View viewModel={viewModel} />;
}
`;
}

function generateCSS(config: ComponentConfig): string {
  const className = config.pageId.replace('-', '') + '-report';
  const category = config.category;
  
  let categoryColor = '#6c757d';
  switch (category) {
    case 'safety': categoryColor = '#ff6b35'; break;
    case 'financial': categoryColor = '#28a745'; break;
    case 'technical': categoryColor = '#007bff'; break;
    case 'quality-control': categoryColor = '#6f42c1'; break;
    case 'quality': categoryColor = '#6f42c1'; break;
    case 'project-documentation': categoryColor = '#6c757d'; break;
  }
  
  return `/**
 * @file ${config.pageId}.css
 * @module styles
 * @description Styles for ${config.title} report component
 * @author BharatERP
 * @created 2025-01-27
 */

.${className} {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.${className} .report-header {
  background: linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd);
  color: white;
  padding: 2rem;
  text-align: center;
}

.${className} .report-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}

.${className} .category-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.${className} .report-content {
  padding: 2rem;
}

.${className} .section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-left: 4px solid ${categoryColor};
  background: #f8f9fa;
  border-radius: 0 8px 8px 0;
}

.${className} .section-title {
  color: ${categoryColor};
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.${className} .field-group {
  margin-bottom: 1rem;
}

.${className} .field-label {
  display: block;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.${className} .field-value {
  padding: 0.75rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
}

.${className} .field-value.multiline {
  min-height: 4rem;
  align-items: flex-start;
  white-space: pre-wrap;
}

.${className} .field-value.image img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.${className} .report-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 0.5rem;
}
`;
}

function generateRegistryEntry(config: ComponentConfig): string {
  const componentName = pageIdToComponentName(config.pageId);
  const complexity = config.fields.length <= 10 ? 'simple' : config.fields.length <= 20 ? 'intermediate' : 'complex';
  
  return `  "${config.pageId}": {
    connected: dynamic(() => import("./Connected${componentName}"), { ssr: false }),
    view: async () => (await import("./${componentName}View")).default,
    viewModel: build${componentName}ViewModel,
    metadata: {
      title: "${config.title}",
      description: "Custom ${config.category} template with enhanced layout",
      category: "${config.category}",
      version: "1.0.0",
      fieldCount: ${config.fields.length},
      complexity: "${complexity}"
    }
  },`;
}

// Ensure directories exist
const componentsDir = join(process.cwd(), 'app', 'components', 'report-pages');
const stylesDir = join(process.cwd(), 'app', 'styles');

if (!existsSync(componentsDir)) {
  mkdirSync(componentsDir, { recursive: true });
}
if (!existsSync(stylesDir)) {
  mkdirSync(stylesDir, { recursive: true });
}

// Generate components for each template
console.log(`🚀 Generating custom components for ${templates.length} templates...\n`);

const registryEntries: string[] = [];

templates.forEach((config, index) => {
  const componentName = pageIdToComponentName(config.pageId);
  
  console.log(`[${index + 1}/${templates.length}] Generating components for ${config.pageId} (${config.title})...`);
  
  try {
    // Generate ViewModel
    const viewModelCode = generateViewModel(config);
    writeFileSync(join(componentsDir, `${config.pageId}ViewModel.ts`), viewModelCode);
    
    // Generate View Component
    const viewCode = generateViewComponent(config);
    writeFileSync(join(componentsDir, `${componentName}View.tsx`), viewCode);
    
    // Generate Connected Component
    const connectedCode = generateConnectedComponent(config);
    writeFileSync(join(componentsDir, `Connected${componentName}.tsx`), connectedCode);
    
    // Generate CSS
    const cssCode = generateCSS(config);
    writeFileSync(join(stylesDir, `${config.pageId}.css`), cssCode);
    
    // Collect registry entry
    const registryEntry = generateRegistryEntry(config);
    registryEntries.push(registryEntry);
    
    console.log(`✅ Generated components for ${config.pageId}\n`);
  } catch (error) {
    console.error(`❌ Failed to generate components for ${config.pageId}:`, error);
    process.exit(1);
  }
});

console.log('\n🎉 All custom components generated successfully!');
console.log('\n📋 Registry entries to add to app/components/report-pages/registry.ts:');
console.log('\n' + registryEntries.join('\n'));
console.log('\n📝 Next steps:');
console.log('1. Add the registry entries to app/components/report-pages/registry.ts');
console.log('2. Import the CSS files in your layout or globals.css');
console.log('3. Test the components in the editor');

