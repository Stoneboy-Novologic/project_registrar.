#!/usr/bin/env tsx

/* scripts/createCustomComponent.ts */
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

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

const templates: ComponentConfig[] = [
  {
    pageId: "report-006",
    title: "Safety Inspection Checklist",
    category: "safety",
    fields: [
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "header.date", label: "Inspection Date", type: "date", group: "header" },
      { id: "header.inspector", label: "Inspector Name", type: "text", group: "header" },
      { id: "safety.hazards", label: "Identified Hazards", type: "multiline", group: "safety" },
      { id: "safety.equipment", label: "Safety Equipment Check", type: "multiline", group: "safety" },
      { id: "safety.corrective", label: "Corrective Actions", type: "multiline", group: "safety" },
      { id: "safety.signatures", label: "Inspector Signature", type: "text", group: "safety" }
    ]
  },
  {
    pageId: "report-011",
    title: "Budget Summary",
    category: "financial",
    fields: [
      { id: "header.project", label: "Project Name", type: "text", group: "header" },
      { id: "header.period", label: "Reporting Period", type: "text", group: "header" },
      { id: "budget.original", label: "Original Budget", type: "text", group: "budget" },
      { id: "budget.approved", label: "Approved Changes", type: "text", group: "budget" },
      { id: "budget.current", label: "Current Budget", type: "text", group: "budget" },
      { id: "budget.spent", label: "Amount Spent", type: "text", group: "budget" },
      { id: "budget.remaining", label: "Remaining Budget", type: "text", group: "budget" },
      { id: "budget.variance", label: "Budget Variance", type: "text", group: "budget" },
      { id: "budget.forecast", label: "Forecast Completion", type: "text", group: "budget" },
      { id: "budget.notes", label: "Budget Notes", type: "multiline", group: "budget" }
    ]
  }
];

function generateViewModel(config: ComponentConfig): string {
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

  return `/* app/components/report-pages/${config.pageId}ViewModel.ts */
export interface ${config.pageId.replace('-', '').replace(/^\w/, c => c.toUpperCase())}ViewModel {
${interfaceFields}
}

export function build${config.pageId.replace('-', '').replace(/^\w/, c => c.toUpperCase())}ViewModel(values: any): ${config.pageId.replace('-', '').replace(/^\w/, c => c.toUpperCase())}ViewModel {
  return {
${buildFunction}
  };
}
`;
}

function generateViewComponent(config: ComponentConfig): string {
  const componentName = config.pageId.replace('-', '').replace(/^\w/, c => c.toUpperCase());
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
      } else {
        return `        <div className="field-group">
          <label className="field-label">${label}</label>
          <div className="field-value">{viewModel.${group}.${propName}}</div>
        </div>`;
      }
    }).join('\n');
    
    return `      <div className="section ${group}-section">
        <h2 className="section-title">${group.charAt(0).toUpperCase() + group.slice(1)}</h2>
${fieldElements}
      </div>`;
  }).join('\n');

  return `/* app/components/report-pages/${componentName}View.tsx */
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
  const componentName = config.pageId.replace('-', '').replace(/^\w/, c => c.toUpperCase());
  
  return `/* app/components/report-pages/Connected${componentName}.tsx */
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
    case 'quality': categoryColor = '#6f42c1'; break;
  }
  
  return `/* app/styles/${config.pageId}.css */
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
`;
}

function generateRegistryEntry(config: ComponentConfig): string {
  const componentName = config.pageId.replace('-', '').replace(/^\w/, c => c.toUpperCase());
  
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
      complexity: "${config.fields.length <= 10 ? 'simple' : config.fields.length <= 20 ? 'intermediate' : 'complex'}"
    }
  },`;
}

// Generate components for each template
templates.forEach(config => {
  const componentName = config.pageId.replace('-', '').replace(/^\w/, c => c.toUpperCase());
  
  console.log(`Generating components for ${config.pageId}...`);
  
  // Generate ViewModel
  const viewModelCode = generateViewModel(config);
  writeFileSync(`app/components/report-pages/${config.pageId}ViewModel.ts`, viewModelCode);
  
  // Generate View Component
  const viewCode = generateViewComponent(config);
  writeFileSync(`app/components/report-pages/${componentName}View.tsx`, viewCode);
  
  // Generate Connected Component
  const connectedCode = generateConnectedComponent(config);
  writeFileSync(`app/components/report-pages/Connected${componentName}.tsx`, connectedCode);
  
  // Generate CSS
  const cssCode = generateCSS(config);
  writeFileSync(`app/styles/${config.pageId}.css`, cssCode);
  
  // Generate registry entry
  const registryEntry = generateRegistryEntry(config);
  console.log(`\nRegistry entry for ${config.pageId}:`);
  console.log(registryEntry);
  
  console.log(`✅ Generated components for ${config.pageId}`);
});

console.log('\n🎉 All custom components generated!');
console.log('\nNext steps:');
console.log('1. Add the registry entries to app/components/report-pages/registry.ts');
console.log('2. Import the CSS files in your layout or globals.css');
console.log('3. Test the components in the editor');

