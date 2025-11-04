/**
 * @file pdf-renderer.ts
 * @module services
 * @description Server-side HTML rendering for PDF generation from report pages
 * @author BharatERP
 * @created 2025-01-27
 */

import type { ReportPageDB, ReportTemplateDB } from "@/lib/types";
import { logInfo, logError } from "@/lib/log";

/**
 * Render a single report page to HTML string
 */
export async function renderPageToHTML(
  page: ReportPageDB,
  template: ReportTemplateDB
): Promise<string> {
  try {
    logInfo("Rendering page to HTML", { pageId: page.id, templateId: template.pageId });
    
    const values = (page.valuesJson as Record<string, any>) || {};
    const fields = (template.fieldsJson as any[]) || [];
    
    // For now, use generic template rendering for all templates
    // Custom templates can be enhanced later if needed
    return renderGenericTemplateHTML(template, values, fields);
  } catch (error) {
    logError("Failed to render page to HTML", error);
    throw error;
  }
}

/**
 * Render generic template HTML
 */
function renderGenericTemplateHTML(
  template: ReportTemplateDB,
  values: Record<string, any>,
  fields: any[]
): string {
  let html = `<div class="report-page" style="page-break-after: always;">`;
  
  // Group fields by section
  const fieldGroups: Record<string, any[]> = {};
  fields.forEach(field => {
    const baseId = field.id.split('.')[0];
    if (!fieldGroups[baseId]) {
      fieldGroups[baseId] = [];
    }
    fieldGroups[baseId].push(field);
  });
  
  // Render header if exists
  if (fieldGroups['header']) {
    html += `<div class="report-header" style="border-bottom: 2px solid #FF6B35; padding: 1rem 0; margin-bottom: 2rem;">`;
    fieldGroups['header'].forEach(field => {
      const value = values[field.id];
      if (value) {
        html += `<div style="margin-bottom: 0.5rem;">`;
        html += `<strong style="font-weight: 600; color: #495057;">${field.label}:</strong> <span style="color: #1A1A1A;">${escapeHtml(value)}</span>`;
        html += `</div>`;
      }
    });
    html += `</div>`;
  }
  
  // Render other sections
  Object.entries(fieldGroups).forEach(([groupName, groupFields]) => {
    if (groupName === 'header') return;
    
    html += `<div class="section" style="margin-bottom: 2rem; padding: 1.5rem; border-left: 4px solid #FF6B35; background: #f8f9fa; border-radius: 0 8px 8px 0;">`;
    html += `<h2 class="section-title" style="color: #FF6B35; font-size: 1.5rem; margin: 0 0 1rem 0; font-weight: 600;">${groupName.charAt(0).toUpperCase() + groupName.slice(1)}</h2>`;
    
    groupFields.forEach(field => {
      const value = values[field.id];
      if (!value || value === '') return;
      
      html += `<div class="field-group" style="margin-bottom: 1rem;">`;
      html += `<label class="field-label" style="display: block; font-weight: 600; color: #495057; margin-bottom: 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">${field.label}</label>`;
      html += `<div class="field-value" style="padding: 0.75rem; background: white; border: 1px solid #dee2e6; border-radius: 4px; min-height: 2.5rem;">`;
      
      switch (field.type) {
        case 'image':
          // Handle both base64 and URL images
          const imageSrc = value.startsWith('data:') || value.startsWith('http') || value.startsWith('/') 
            ? escapeHtml(value) 
            : `data:image/png;base64,${escapeHtml(value)}`;
          html += `<img src="${imageSrc}" alt="${field.label}" style="max-width: 100%; height: auto; border-radius: 4px; margin-top: 0.5rem; display: block;" onerror="this.style.display='none';" />`;
          break;
        case 'multiline':
          html += `<div style="white-space: pre-wrap;">${escapeHtml(value)}</div>`;
          break;
        case 'link':
          html += `<a href="${escapeHtml(value)}" target="_blank" style="color: #007bff; text-decoration: underline;">${escapeHtml(value)}</a>`;
          break;
        case 'badge':
          html += `<span style="display: inline-block; padding: 0.25rem 0.75rem; background: #f0f9ff; color: #1e40af; border: 1px solid #bfdbfe; border-radius: 20px; font-size: 0.875rem;">${escapeHtml(value)}</span>`;
          break;
        default:
          html += escapeHtml(value);
      }
      
      html += `</div>`;
      html += `</div>`;
    });
    
    html += `</div>`;
  });
  
  html += `</div>`;
  return html;
}

/**
 * Render custom template HTML (simplified version)
 */
function renderCustomTemplateHTML(
  template: ReportTemplateDB,
  viewModel: any
): string {
  let html = `<div class="report-page" style="page-break-after: always;">`;
  html += `<h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: #1A1A1A;">${template.title}</h1>`;
  
  // Render view model data as JSON structure (simplified)
  html += `<div class="report-content" style="padding: 2rem;">`;
  html += renderViewModelToHTML(viewModel);
  html += `</div>`;
  
  html += `</div>`;
  return html;
}

/**
 * Recursively render view model to HTML
 */
function renderViewModelToHTML(data: any, depth: number = 0): string {
  if (data === null || data === undefined) return '';
  
  if (typeof data === 'string') {
    return escapeHtml(data);
  }
  
  if (typeof data === 'number' || typeof data === 'boolean') {
    return String(data);
  }
  
  if (Array.isArray(data)) {
    let html = '<ul style="list-style: disc; padding-left: 2rem;">';
    data.forEach(item => {
      html += `<li>${renderViewModelToHTML(item, depth + 1)}</li>`;
    });
    html += '</ul>';
    return html;
  }
  
  if (typeof data === 'object') {
    let html = '<div style="margin-bottom: 1.5rem;">';
    Object.entries(data).forEach(([key, value]) => {
      html += `<div style="margin-bottom: 0.75rem;">`;
      html += `<strong style="color: #495057; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">${key}:</strong>`;
      html += `<div style="margin-top: 0.25rem; padding: 0.5rem; background: #f8f9fa; border-radius: 4px;">`;
      html += renderViewModelToHTML(value, depth + 1);
      html += `</div>`;
      html += `</div>`;
    });
    html += '</div>';
    return html;
  }
  
  return '';
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Render full report to HTML with all pages
 */
export async function renderReportToHTML(
  pages: ReportPageDB[],
  reportName: string,
  reportDate?: string
): Promise<string> {
  const sortedPages = [...pages].sort((a, b) => a.pageOrder - b.pageOrder);
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(reportName)}</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #1A1A1A;
    }
    @media print {
      body { margin: 0; padding: 0; }
      .report-page { page-break-after: always; }
      .report-page:last-child { page-break-after: auto; }
    }
  </style>
</head>
<body>
  <div class="report-container">
`;

  // Render each page
  for (const page of sortedPages) {
    if (!page.template) {
      logError("Page template missing", { pageId: page.id });
      continue;
    }
    
    try {
      const pageHTML = await renderPageToHTML(page, page.template);
      html += pageHTML;
    } catch (error) {
      logError("Failed to render page", { pageId: page.id, error });
      html += `<div class="error-page" style="padding: 2rem; color: red;">Error rendering page: ${page.id}</div>`;
    }
  }
  
  html += `
  </div>
</body>
</html>`;
  
  return html;
}

