/**
 * @file route.ts
 * @module api/reports/[id]/export/pdf
 * @description API endpoint for generating PDF exports of reports
 * @author BharatERP
 * @created 2025-01-27
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logError, logInfo } from '@/lib/log';
import { renderReportToHTML } from '@/lib/services/pdf-renderer';
import { getPDFTemplate } from '@/lib/services/pdf-templates';
import { generatePDFHTML } from '@/lib/services/pdf-headers-footers';
import { generatePDFToBuffer } from '@/lib/services/pdf-generator';
import { getBrandingConfig } from '@/lib/config/branding';
import { z } from 'zod';

// Validation schema for query parameters
const ExportPDFSchema = z.object({
  includeWatermark: z.string().optional().transform(val => val === 'true'),
  includeBranding: z.string().optional().transform(val => val !== 'false'), // Default true
  pages: z.string().optional().transform(val => val ? val.split(',').filter(Boolean) : undefined)
});

/**
 * GET /api/reports/[id]/export/pdf
 * Generate and download PDF for a report
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    // Convert null to undefined for optional parameters
    const queryParams = {
      includeWatermark: searchParams.get('includeWatermark') ?? undefined,
      includeBranding: searchParams.get('includeBranding') ?? undefined,
      pages: searchParams.get('pages') ?? undefined
    };
    
    const validatedParams = ExportPDFSchema.parse(queryParams);
    
    logInfo('PDF export requested', { 
      reportId: params.id,
      includeWatermark: validatedParams.includeWatermark,
      includeBranding: validatedParams.includeBranding,
      pages: validatedParams.pages
    });
    
    // Fetch report with all pages
    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        pages: {
          include: {
            template: true
          },
          orderBy: { pageOrder: 'asc' }
        }
      }
    });
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }
    
    if (report.pages.length === 0) {
      return NextResponse.json(
        { error: 'Report has no pages to export' },
        { status: 400 }
      );
    }
    
    // Filter pages if specific pages requested
    let pagesToExport = report.pages;
    if (validatedParams.pages && validatedParams.pages.length > 0) {
      pagesToExport = report.pages.filter(page => 
        validatedParams.pages!.includes(page.id)
      );
    }
    
    // Determine category from first page's template (or use default)
    const category = pagesToExport[0]?.template?.category || 'project-documentation';
    
    // Get branding configuration
    const branding = getBrandingConfig();
    
    // Apply watermark setting
    if (!validatedParams.includeWatermark) {
      branding.watermarkText = undefined;
    }
    
    // Get PDF template for category
    const pdfTemplate = getPDFTemplate(category, branding);
    
    // Render report pages to HTML
    const reportDate = report.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const contentHTML = await renderReportToHTML(
      pagesToExport,
      report.name,
      reportDate
    );
    
    // Generate PDF HTML with headers, footers, and watermarks
    const pdfHTML = generatePDFHTML(
      contentHTML,
      pdfTemplate,
      branding,
      {
        reportName: report.name,
        reportDate: reportDate,
        reportDescription: report.description || ''
      }
    );
    
    // Generate PDF
    const pdfBuffer = await generatePDFToBuffer({
      template: pdfTemplate,
      branding: branding,
      htmlContent: pdfHTML,
      variables: {
        reportName: report.name,
        reportDate: reportDate
      }
    });
    
    // Create export record in database
    try {
      await prisma.reportExport.create({
        data: {
          reportId: report.id,
          format: 'PDF',
          fileUrl: null, // For now, we don't persist files
          exportedAt: new Date()
        }
      });
    } catch (exportError) {
      // Log error but don't fail the request
      logError('Failed to create export record', exportError);
    }
    
    logInfo('PDF export completed', { 
      reportId: params.id,
      pageCount: pagesToExport.length,
      pdfSize: pdfBuffer.length
    });
    
    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(report.name)}-${new Date().toISOString().split('T')[0]}.pdf"`,
        'Content-Length': String(pdfBuffer.length)
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logError('PDF export validation error', error);
      return NextResponse.json(
        { error: 'Invalid request parameters', details: error.issues },
        { status: 400 }
      );
    }
    
    logError('Failed to generate PDF', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

