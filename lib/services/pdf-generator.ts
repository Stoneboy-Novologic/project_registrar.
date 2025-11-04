/**
 * @file pdf-generator.ts
 * @module services
 * @description Core PDF generation service using Playwright
 * @author BharatERP
 * @created 2025-01-27
 */

import { chromium, type Browser, type Page } from "playwright";
import { logInfo, logError } from "@/lib/log";
import type { PDFTemplate } from "./pdf-templates";
import type { BrandingConfig } from "@/lib/config/branding";

/**
 * PDF generation options
 */
export interface PDFGenerationOptions {
  template: PDFTemplate;
  branding: BrandingConfig;
  htmlContent: string;
  outputPath?: string;
  variables?: Record<string, string>;
}

/**
 * Browser instance cache (singleton pattern)
 */
let browserInstance: Browser | null = null;

/**
 * Get or create browser instance
 */
async function getBrowser(): Promise<Browser> {
  if (!browserInstance) {
    logInfo("Launching Playwright browser");
    browserInstance = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }
  return browserInstance;
}

/**
 * Close browser instance
 */
export async function closeBrowser(): Promise<void> {
  if (browserInstance) {
    logInfo("Closing Playwright browser");
    await browserInstance.close();
    browserInstance = null;
  }
}

/**
 * Generate PDF from HTML content
 */
export async function generatePDF(
  options: PDFGenerationOptions
): Promise<Buffer> {
  const { template, htmlContent, outputPath } = options;
  
  let page: Page | null = null;
  
  try {
    logInfo("Generating PDF", { 
      template: template.name, 
      pageSize: template.pageSize,
      orientation: template.orientation 
    });
    
    const browser = await getBrowser();
    page = await browser.newPage();
    
    // Set content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: template.pageSize,
      printBackground: true,
      margin: {
        top: template.margins.top,
        right: template.margins.right,
        bottom: template.margins.bottom,
        left: template.margins.left
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false, // We handle headers/footers in HTML
      ...(outputPath ? { path: outputPath } : {})
    });
    
    logInfo("PDF generated successfully", { 
      size: pdfBuffer.length,
      outputPath: outputPath || "buffer"
    });
    
    return pdfBuffer;
  } catch (error) {
    logError("Failed to generate PDF", error);
    throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (page) {
      await page.close();
    }
  }
}

/**
 * Generate PDF and save to file
 */
export async function generatePDFToFile(
  options: PDFGenerationOptions & { outputPath: string }
): Promise<string> {
  const pdfBuffer = await generatePDF(options);
  
  // If outputPath was provided, Playwright already saved it
  // Otherwise, we need to write it ourselves
  if (!options.outputPath) {
    throw new Error("outputPath is required for generatePDFToFile");
  }
  
  logInfo("PDF saved to file", { outputPath: options.outputPath });
  return options.outputPath;
}

/**
 * Generate PDF and return as buffer
 */
export async function generatePDFToBuffer(
  options: PDFGenerationOptions
): Promise<Buffer> {
  return await generatePDF(options);
}

