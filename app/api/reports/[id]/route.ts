/* app/api/reports/[id]/route.ts */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logError, logInfo } from '@/lib/log';

// Validation schemas
const UpdateReportSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional()
});

// GET /api/reports/[id] - Get single report with all pages
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        pages: {
          include: {
            template: true
          },
          orderBy: { pageOrder: 'asc' }
        },
        exports: {
          orderBy: { exportedAt: 'desc' }
        }
      }
    });
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }
    
    logInfo('Report fetched', { id: report.id, name: report.name, pageCount: report.pages.length });
    
    return NextResponse.json(report);
  } catch (error) {
    logError('Failed to fetch report', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}

// PUT /api/reports/[id] - Update report metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = UpdateReportSchema.parse(body);
    
    // Check if report exists
    const existing = await prisma.report.findUnique({
      where: { id: params.id }
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }
    
    const report = await prisma.report.update({
      where: { id: params.id },
      data: validatedData
    });
    
    logInfo('Report updated', { id: report.id, name: report.name });
    
    return NextResponse.json(report);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }
    
    logError('Failed to update report', error);
    return NextResponse.json(
      { error: 'Failed to update report' },
      { status: 500 }
    );
  }
}

// DELETE /api/reports/[id] - Delete report
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if report exists
    const existing = await prisma.report.findUnique({
      where: { id: params.id }
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }
    
    // Delete report (cascade will handle pages and exports)
    await prisma.report.delete({
      where: { id: params.id }
    });
    
    logInfo('Report deleted', { id: params.id, name: existing.name });
    
    return NextResponse.json({ message: 'Report deleted successfully' });
  } catch (error) {
    logError('Failed to delete report', error);
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    );
  }
}
