/* app/api/reports/[id]/pages/route.ts */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logError, logInfo } from '@/lib/log';

// Validation schemas
const AddPageSchema = z.object({
  templateId: z.string().min(1)
});

// GET /api/reports/[id]/pages - Get all pages in a report
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pages = await prisma.reportPage.findMany({
      where: { reportId: params.id },
      include: {
        template: true
      },
      orderBy: { pageOrder: 'asc' }
    });
    
    logInfo('Report pages fetched', { reportId: params.id, count: pages.length });
    
    return NextResponse.json(pages);
  } catch (error) {
    logError('Failed to fetch report pages', error);
    return NextResponse.json(
      { error: 'Failed to fetch report pages' },
      { status: 500 }
    );
  }
}

// POST /api/reports/[id]/pages - Add page to report
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = AddPageSchema.parse(body);
    
    // Check if report exists
    const report = await prisma.report.findUnique({
      where: { id: params.id }
    });
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }
    
    // Check if template exists
    const template = await prisma.reportTemplate.findUnique({
      where: { id: validatedData.templateId }
    });
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Get the next page order
    const lastPage = await prisma.reportPage.findFirst({
      where: { reportId: params.id },
      orderBy: { pageOrder: 'desc' }
    });
    
    const nextOrder = (lastPage?.pageOrder || 0) + 1;
    
    // Initialize values with placeholders from template
    const initialValues: Record<string, string> = {};
    const fields = template.fieldsJson as any[];
    fields.forEach((field: any) => {
      if (field.placeholder) {
        initialValues[field.id] = field.placeholder;
      }
    });
    
    const page = await prisma.reportPage.create({
      data: {
        reportId: params.id,
        templateId: validatedData.templateId,
        pageOrder: nextOrder,
        valuesJson: initialValues
      },
      include: {
        template: true
      }
    });
    
    logInfo('Page added to report', { 
      reportId: params.id, 
      pageId: page.id, 
      templateId: validatedData.templateId,
      pageOrder: nextOrder
    });
    
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }
    
    logError('Failed to add page to report', error);
    return NextResponse.json(
      { error: 'Failed to add page to report' },
      { status: 500 }
    );
  }
}
