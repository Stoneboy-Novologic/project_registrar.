#!/usr/bin/env node

/**
 * JavaScript version of generateAllComponents.ts
 * Can run directly with Node.js without tsx
 */

const fs = require('fs');
const path = require('path');

// Helper function to convert pageId to component name
function pageIdToComponentName(pageId) {
  const numberPart = pageId.replace('report-', '');
  const paddedNumber = numberPart.length === 1 ? `00${numberPart}` : numberPart.length === 2 ? `0${numberPart}` : numberPart;
  return `Report${paddedNumber}`;
}

// Helper function to generate ViewModel
function generateViewModel(config) {
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

// Helper function to generate View component
function generateViewComponent(config) {
  const componentName = pageIdToComponentName(config.pageId);
  const className = config.pageId.replace('-', '') + '-report';
  
  const sections = [...new Set(config.fields.map(f => f.group))].map(group => {
    const groupFields = config.fields.filter(f => f.group === group);
    const fieldElements = groupFields.map(field => {
      const propName = field.id.split('.').pop() || field.id;
      const label = field.label;
      
      if (field.type === 'multiline') {
        return `        <div className="field-group">
          <label className="field-label">${label}</label>
          <div className="field-value multiline">{viewModel.${group}.${propName}}</div>
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
    
    const sectionTitle = group.charAt(0).toUpperCase() + group.slice(1).replace(/([A-Z])/g, ' $1');
    return `      <div className="section ${group}-section">
        <h2 className="section-title">${sectionTitle}</h2>
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

// Helper function to generate Connected component
function generateConnectedComponent(config) {
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

// Helper function to generate CSS
function generateCSS(config) {
  const className = config.pageId.replace('-', '') + '-report';
  let categoryColor = '#6c757d';
  switch (config.category) {
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

// Load template data from the TypeScript file (we'll extract it)
// For now, we'll include it inline - this is a simplified version
const templates = require('./generateAllComponents.data.json');

const componentsDir = path.join(process.cwd(), 'app', 'components', 'report-pages');
const stylesDir = path.join(process.cwd(), 'app', 'styles');

// Ensure directories exist
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true });
}

console.log(`🚀 Generating custom components...\n`);

const registryEntries = [];

// Note: Templates data needs to be loaded from generateAllComponents.ts or provided separately
// For now, this script structure is ready - templates array should be populated

console.log('⚠️  Note: Template data needs to be provided. See generateAllComponents.ts for the full template definitions.');
console.log('💡 Tip: Run with tsx: npx tsx scripts/generateAllComponents.ts');

