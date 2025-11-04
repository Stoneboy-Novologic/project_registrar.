/**
 * @file reorder/route.ts
 * @module api/reports/[id]/pages/reorder
 * @description API endpoint for reordering pages in a report
 * @author BharatERP
 * @created 2025-01-27
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logError, logInfo } from '@/lib/log';

// Validation schema
const ReorderPagesSchema = z.object({
  pageIds: z.array(z.string()).min(1)
});

// PATCH /api/reports/[id]/pages/reorder - Reorder pages in report
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
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
    
    // Update page orders in a transaction
    await prisma.$transaction(
      validatedData.pageIds.map((pageId, index) =>
        prisma.reportPage.update({
          where: { id: pageId },
          data: { pageOrder: index + 1 }
        })
      )
    );
    
    logInfo('Pages reordered', { 
      reportId: params.id, 
      pageCount: validatedData.pageIds.length 
    });
    
    return NextResponse.json({ 
      message: 'Pages reordered successfully',
      pageIds: validatedData.pageIds
    });
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

