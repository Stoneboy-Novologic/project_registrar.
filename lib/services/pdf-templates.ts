/**
 * @file pdf-templates.ts
 * @module services
 * @description PDF template definitions for different report categories with customizable layouts, headers, footers, and watermarks
 * @author BharatERP
 * @created 2025-01-27
 */

import type { BrandingConfig } from "@/lib/config/branding";

/**
 * PDF template configuration interface
 */
export interface PDFTemplate {
  name: string;
  category: string;
  pageSize: "A4" | "Letter";
  orientation: "portrait" | "landscape";
  margins: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  header: {
    enabled: boolean;
    height?: string;
    template?: string;
  };
  footer: {
    enabled: boolean;
    height?: string;
    template?: string;
  };
  watermark: {
    enabled: boolean;
    text?: string;
    opacity?: number;
  };
  showPageNumbers: boolean;
}

/**
 * Get PDF template for a specific report category
 */
export function getPDFTemplate(category: string, branding: BrandingConfig): PDFTemplate {
  const templates: Record<string, PDFTemplate> = {
    "project-documentation": {
      name: "Standard Project Documentation",
      category: "project-documentation",
      pageSize: "A4",
      orientation: "portrait",
      margins: {
        top: "2cm",
        right: "1.5cm",
        bottom: "2cm",
        left: "1.5cm"
      },
      header: {
        enabled: true,
        height: "3cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5cm 0; border-bottom: 2px solid #FF6B35;">
            <div>
              <h1 style="margin: 0; font-size: 18px; color: #1A1A1A; font-weight: bold;">{{reportName}}</h1>
              <p style="margin: 0; font-size: 12px; color: #666;">{{reportDate}}</p>
            </div>
            ${branding.companyLogoUrl ? `<img src="${branding.companyLogoUrl}" alt="${branding.companyName}" style="max-height: 2cm;" />` : `<div style="font-size: 14px; font-weight: bold; color: #FF6B35;">${branding.companyName}</div>`}
          </div>
        `
      },
      footer: {
        enabled: true,
        height: "2cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5cm 0; border-top: 1px solid #E0E0E0; font-size: 10px; color: #666;">
            <div>${branding.footerText}</div>
            <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
            <div>${branding.copyrightText}</div>
          </div>
        `
      },
      watermark: {
        enabled: false
      },
      showPageNumbers: true
    },
    "financial": {
      name: "Financial Report",
      category: "financial",
      pageSize: "A4",
      orientation: "portrait",
      margins: {
        top: "2cm",
        right: "1.5cm",
        bottom: "2cm",
        left: "1.5cm"
      },
      header: {
        enabled: true,
        height: "3cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5cm 0; border-bottom: 2px solid #FF6B35;">
            <div>
              <h1 style="margin: 0; font-size: 18px; color: #1A1A1A; font-weight: bold;">{{reportName}}</h1>
              <p style="margin: 0; font-size: 12px; color: #666;">Financial Report</p>
            </div>
            ${branding.companyLogoUrl ? `<img src="${branding.companyLogoUrl}" alt="${branding.companyName}" style="max-height: 2cm;" />` : `<div style="font-size: 14px; font-weight: bold; color: #FF6B35;">${branding.companyName}</div>`}
          </div>
        `
      },
      footer: {
        enabled: true,
        height: "2cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5cm 0; border-top: 1px solid #E0E0E0; font-size: 10px; color: #666;">
            <div>${branding.footerText}</div>
            <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
            <div>${branding.copyrightText}</div>
          </div>
        `
      },
      watermark: {
        enabled: true,
        text: branding.watermarkText || "CONFIDENTIAL",
        opacity: 0.1
      },
      showPageNumbers: true
    },
    "technical": {
      name: "Technical Report",
      category: "technical",
      pageSize: "A4",
      orientation: "portrait",
      margins: {
        top: "2cm",
        right: "1.5cm",
        bottom: "2cm",
        left: "1.5cm"
      },
      header: {
        enabled: true,
        height: "2.5cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5cm 0; border-bottom: 1px solid #E0E0E0;">
            <div>
              <h1 style="margin: 0; font-size: 16px; color: #1A1A1A; font-weight: bold;">{{reportName}}</h1>
            </div>
            <div style="font-size: 12px; color: #666;">${branding.companyName}</div>
          </div>
        `
      },
      footer: {
        enabled: true,
        height: "1.5cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.3cm 0; font-size: 9px; color: #666;">
            <div>${branding.footerText}</div>
            <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
          </div>
        `
      },
      watermark: {
        enabled: false
      },
      showPageNumbers: true
    },
    "safety": {
      name: "Safety Report",
      category: "safety",
      pageSize: "A4",
      orientation: "portrait",
      margins: {
        top: "2cm",
        right: "1.5cm",
        bottom: "2cm",
        left: "1.5cm"
      },
      header: {
        enabled: true,
        height: "3cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5cm 0; border-bottom: 3px solid #FF6B35; background-color: #FFF4F0;">
            <div>
              <h1 style="margin: 0; font-size: 18px; color: #1A1A1A; font-weight: bold;">{{reportName}}</h1>
              <p style="margin: 0; font-size: 12px; color: #666;">Safety & Compliance Report</p>
            </div>
            <div style="font-size: 14px; font-weight: bold; color: #FF6B35;">${branding.companyName}</div>
          </div>
        `
      },
      footer: {
        enabled: true,
        height: "2cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5cm 0; border-top: 1px solid #E0E0E0; font-size: 10px; color: #666;">
            <div>${branding.footerText}</div>
            <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
            <div>${branding.copyrightText}</div>
          </div>
        `
      },
      watermark: {
        enabled: false
      },
      showPageNumbers: true
    },
    "quality-control": {
      name: "Quality Control Report",
      category: "quality-control",
      pageSize: "A4",
      orientation: "portrait",
      margins: {
        top: "2cm",
        right: "1.5cm",
        bottom: "2cm",
        left: "1.5cm"
      },
      header: {
        enabled: true,
        height: "3cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5cm 0; border-bottom: 2px solid #FF6B35;">
            <div>
              <h1 style="margin: 0; font-size: 18px; color: #1A1A1A; font-weight: bold;">{{reportName}}</h1>
              <p style="margin: 0; font-size: 12px; color: #666;">Quality Control Documentation</p>
            </div>
            ${branding.companyLogoUrl ? `<img src="${branding.companyLogoUrl}" alt="${branding.companyName}" style="max-height: 2cm;" />` : `<div style="font-size: 14px; font-weight: bold; color: #FF6B35;">${branding.companyName}</div>`}
          </div>
        `
      },
      footer: {
        enabled: true,
        height: "2cm",
        template: `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5cm 0; border-top: 1px solid #E0E0E0; font-size: 10px; color: #666;">
            <div>${branding.footerText}</div>
            <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
            <div>${branding.copyrightText}</div>
          </div>
        `
      },
      watermark: {
        enabled: false
      },
      showPageNumbers: true
    }
  };

  // Return template for category or default template
  return templates[category] || templates["project-documentation"];
}

/**
 * Render PDF template with variables replaced
 */
export function renderPDFTemplate(template: PDFTemplate, variables: Record<string, string>): string {
  let headerHTML = "";
  let footerHTML = "";

  if (template.header.enabled && template.header.template) {
    headerHTML = template.header.template;
    Object.keys(variables).forEach(key => {
      headerHTML = headerHTML.replace(new RegExp(`{{${key}}}`, "g"), variables[key] || "");
    });
  }

  if (template.footer.enabled && template.footer.template) {
    footerHTML = template.footer.template;
    Object.keys(variables).forEach(key => {
      footerHTML = footerHTML.replace(new RegExp(`{{${key}}}`, "g"), variables[key] || "");
    });
  }

  return JSON.stringify({ headerHTML, footerHTML, watermark: template.watermark });
}

