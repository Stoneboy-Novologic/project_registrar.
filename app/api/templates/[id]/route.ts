/* app/api/templates/[id]/route.ts */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logError, logInfo } from '@/lib/log';

// Validation schemas
const UpdateTemplateSchema = z.object({
  pageId: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  version: z.string().optional(),
  fieldsJson: z.any().optional(),
  metadata: z.any().optional()
});

// GET /api/templates/[id] - Get single template by pageId
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const template = await prisma.reportTemplate.findUnique({
      where: { pageId: params.id },
      include: {
        _count: {
          select: { pages: true }
        }
      }
    });
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    logInfo('Template fetched', { pageId: template.pageId });
    
    return NextResponse.json(template);
  } catch (error) {
    logError('Failed to fetch template', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

// PUT /api/templates/[id] - Update template
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = UpdateTemplateSchema.parse(body);
    
    // Check if template exists
    const existing = await prisma.reportTemplate.findUnique({
      where: { pageId: params.id }
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // If pageId is being updated, check for conflicts
    if (validatedData.pageId && validatedData.pageId !== params.id) {
      const conflict = await prisma.reportTemplate.findUnique({
        where: { pageId: validatedData.pageId }
      });
      
      if (conflict) {
        return NextResponse.json(
          { error: 'Template with this pageId already exists' },
          { status: 409 }
        );
      }
    }
    
    const template = await prisma.reportTemplate.update({
      where: { pageId: params.id },
      data: validatedData
    });
    
    logInfo('Template updated', { pageId: template.pageId, title: template.title });
    
    return NextResponse.json(template);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }
    
    logError('Failed to update template', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

// DELETE /api/templates/[id] - Delete template
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if template exists
    const existing = await prisma.reportTemplate.findUnique({
      where: { pageId: params.id },
      include: {
        _count: {
          select: { pages: true }
        }
      }
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Check if template is being used in any reports
    if (existing._count.pages > 0) {
      return NextResponse.json(
        { error: 'Cannot delete template that is being used in reports' },
        { status: 409 }
      );
    }
    
    await prisma.reportTemplate.delete({
      where: { pageId: params.id }
    });
    
    logInfo('Template deleted', { pageId: params.id });
    
    return NextResponse.json({ message: 'Template deleted successfully' });
  } catch (error) {
    logError('Failed to delete template', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}
