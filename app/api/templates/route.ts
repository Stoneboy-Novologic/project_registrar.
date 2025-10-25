/* app/api/templates/route.ts */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logError, logInfo } from '@/lib/log';

// Validation schemas
const CreateTemplateSchema = z.object({
  pageId: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  version: z.string().default('1.0.0'),
  fieldsJson: z.any(),
  metadata: z.any()
});

const UpdateTemplateSchema = CreateTemplateSchema.partial();

// GET /api/templates - List all templates with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { pageId: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Get templates with pagination
    const [allTemplates, total] = await Promise.all([
      prisma.reportTemplate.findMany({
        where,
        select: {
          id: true,
          pageId: true,
          title: true,
          category: true,
          version: true,
          fieldsJson: true,
          metadata: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { pages: true }
          }
        }
      }),
      prisma.reportTemplate.count({ where })
    ]);

    // Sort templates numerically by pageId
    const sortedTemplates = allTemplates.sort((a, b) => {
      const aNum = parseInt(a.pageId.replace('report-', ''));
      const bNum = parseInt(b.pageId.replace('report-', ''));
      return aNum - bNum;
    });

    // Apply pagination after sorting
    const templates = sortedTemplates.slice(skip, skip + limit);
    
    logInfo('Templates fetched', { count: templates.length, total, page, limit });
    
    return NextResponse.json({
      templates,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logError('Failed to fetch templates', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

// POST /api/templates - Create new template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateTemplateSchema.parse(body);
    
    // Check if pageId already exists
    const existing = await prisma.reportTemplate.findUnique({
      where: { pageId: validatedData.pageId }
    });
    
    if (existing) {
      return NextResponse.json(
        { error: 'Template with this pageId already exists' },
        { status: 409 }
      );
    }
    
    const template = await prisma.reportTemplate.create({
      data: validatedData
    });
    
    logInfo('Template created', { pageId: template.pageId, title: template.title });
    
    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }
    
    logError('Failed to create template', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}
