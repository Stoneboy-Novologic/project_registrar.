/* app/api/reports/[id]/pages/[pageId]/route.ts */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logError, logInfo } from '@/lib/log';

// Validation schemas
const UpdatePageValuesSchema = z.object({
  valuesJson: z.any()
});

const ReorderPagesSchema = z.object({
  pageIds: z.array(z.string())
});

// GET /api/reports/[id]/pages/[pageId] - Get single page
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    const page = await prisma.reportPage.findFirst({
      where: { 
        id: params.pageId,
        reportId: params.id
      },
      include: {
        template: true
      }
    });
    
    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }
    
    logInfo('Report page fetched', { reportId: params.id, pageId: params.pageId });
    
    return NextResponse.json(page);
  } catch (error) {
    logError('Failed to fetch report page', error);
    return NextResponse.json(
      { error: 'Failed to fetch report page' },
      { status: 500 }
    );
  }
}

// PUT /api/reports/[id]/pages/[pageId] - Update page values
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    const body = await request.json();
    const validatedData = UpdatePageValuesSchema.parse(body);
    
    // Check if page exists
    const existing = await prisma.reportPage.findFirst({
      where: { 
        id: params.pageId,
        reportId: params.id
      }
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }
    
    const page = await prisma.reportPage.update({
      where: { id: params.pageId },
      data: {
        valuesJson: validatedData.valuesJson
      },
      include: {
        template: true
      }
    });
    
    logInfo('Page values updated', { reportId: params.id, pageId: params.pageId });
    
    return NextResponse.json(page);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }
    
    logError('Failed to update page values', error);
    return NextResponse.json(
      { error: 'Failed to update page values' },
      { status: 500 }
    );
  }
}

// DELETE /api/reports/[id]/pages/[pageId] - Remove page from report
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    // Check if page exists
    const existing = await prisma.reportPage.findFirst({
      where: { 
        id: params.pageId,
        reportId: params.id
      }
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }
    
    // Delete the page
    await prisma.reportPage.delete({
      where: { id: params.pageId }
    });
    
    // Reorder remaining pages
    const remainingPages = await prisma.reportPage.findMany({
      where: { reportId: params.id },
      orderBy: { pageOrder: 'asc' }
    });
    
    // Update page orders
    for (let i = 0; i < remainingPages.length; i++) {
      await prisma.reportPage.update({
        where: { id: remainingPages[i].id },
        data: { pageOrder: i + 1 }
      });
    }
    
    logInfo('Page removed from report', { reportId: params.id, pageId: params.pageId });
    
    return NextResponse.json({ message: 'Page removed successfully' });
  } catch (error) {
    logError('Failed to remove page from report', error);
    return NextResponse.json(
      { error: 'Failed to remove page from report' },
      { status: 500 }
    );
  }
}

// PATCH /api/reports/[id]/pages/[pageId] - Reorder pages (special endpoint)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    const body = await request.json();
    const validatedData = ReorderPagesSchema.parse(body);
    
    // Verify all pages belong to this report
    const pages = await prisma.reportPage.findMany({
      where: { 
        id: { in: validatedData.pageIds },
        reportId: params.id
      }
    });
    
    if (pages.length !== validatedData.pageIds.length) {
      return NextResponse.json(
        { error: 'Some pages do not belong to this report' },
        { status: 400 }
      );
    }
    
    // Update page orders
    for (let i = 0; i < validatedData.pageIds.length; i++) {
      await prisma.reportPage.update({
        where: { id: validatedData.pageIds[i] },
        data: { pageOrder: i + 1 }
      });
    }
    
    logInfo('Pages reordered', { reportId: params.id, pageCount: validatedData.pageIds.length });
    
    return NextResponse.json({ message: 'Pages reordered successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }
    
    logError('Failed to reorder pages', error);
    return NextResponse.json(
      { error: 'Failed to reorder pages' },
      { status: 500 }
    );
  }
}
