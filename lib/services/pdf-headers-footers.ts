/**
 * @file pdf-headers-footers.ts
 * @module services
 * @description Generate PDF headers and footers with page numbers and branding
 * @author BharatERP
 * @created 2025-01-27
 */

import type { BrandingConfig } from "@/lib/config/branding";
import type { PDFTemplate } from "./pdf-templates";

/**
 * Generate header HTML with variables replaced
 */
export function generateHeaderHTML(
  template: PDFTemplate,
  branding: BrandingConfig,
  variables: Record<string, string>
): string {
  if (!template.header.enabled || !template.header.template) {
    return "";
  }
  
  let headerHTML = template.header.template;
  
  // Replace variables
  Object.keys(variables).forEach(key => {
    headerHTML = headerHTML.replace(new RegExp(`{{${key}}}`, "g"), escapeHtml(variables[key] || ""));
  });
  
  return headerHTML;
}

/**
 * Generate footer HTML with variables replaced
 */
export function generateFooterHTML(
  template: PDFTemplate,
  branding: BrandingConfig,
  variables: Record<string, string>
): string {
  if (!template.footer.enabled || !template.footer.template) {
    return "";
  }
  
  let footerHTML = template.footer.template;
  
  // Replace variables
  Object.keys(variables).forEach(key => {
    footerHTML = footerHTML.replace(new RegExp(`{{${key}}}`, "g"), escapeHtml(variables[key] || ""));
  });
  
  return footerHTML;
}

/**
 * Generate watermark CSS
 */
export function generateWatermarkCSS(template: PDFTemplate): string {
  if (!template.watermark.enabled || !template.watermark.text) {
    return "";
  }
  
  const opacity = template.watermark.opacity || 0.1;
  const text = template.watermark.text || "CONFIDENTIAL";
  
  return `
    @media print {
      body::before {
        content: "${escapeCss(text)}";
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 72px;
        font-weight: bold;
        color: #000000;
        opacity: ${opacity};
        z-index: 9999;
        pointer-events: none;
        white-space: nowrap;
      }
    }
  `;
}

/**
 * Generate complete HTML with headers, footers, and watermarks
 */
export function generatePDFHTML(
  contentHTML: string,
  template: PDFTemplate,
  branding: BrandingConfig,
  variables: Record<string, string>
): string {
  const headerHTML = generateHeaderHTML(template, branding, variables);
  const footerHTML = generateFooterHTML(template, branding, variables);
  const watermarkCSS = generateWatermarkCSS(template);
  
  // Calculate page size
  const pageWidth = template.pageSize === "A4" ? "210mm" : "8.5in";
  const pageHeight = template.pageSize === "A4" ? "297mm" : "11in";
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(variables.reportName || "Report")}</title>
  <style>
    @page {
      size: ${pageWidth} ${pageHeight};
      margin: ${template.margins.top} ${template.margins.right} ${template.margins.bottom} ${template.margins.left};
      ${headerHTML ? `@top-center { content: element(header); }` : ""}
      ${footerHTML ? `@bottom-center { content: element(footer); }` : ""}
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #1A1A1A;
      font-size: 12pt;
      line-height: 1.6;
    }
    
    ${headerHTML ? `
    div.header {
      position: running(header);
      width: 100%;
    }
    ` : ""}
    
    ${footerHTML ? `
    div.footer {
      position: running(footer);
      width: 100%;
    }
    ` : ""}
    
    .page-number::after {
      content: counter(page);
    }
    
    .total-pages::after {
      content: counter(pages);
    }
    
    ${watermarkCSS}
    
    @media print {
      .report-page {
        page-break-after: always;
      }
      .report-page:last-child {
        page-break-after: auto;
      }
    }
  </style>
</head>
<body>
  ${headerHTML ? `<div class="header">${headerHTML}</div>` : ""}
  ${footerHTML ? `<div class="footer">${footerHTML}</div>` : ""}
  <div class="content">
    ${contentHTML}
  </div>
</body>
</html>`;
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
 * Escape CSS special characters
 */
function escapeCss(text: string): string {
  return text.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

