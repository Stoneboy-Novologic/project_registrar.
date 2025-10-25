/* app/api/reports/route.ts */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logError, logInfo } from '@/lib/log';

// Validation schemas
const CreateReportSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional()
});

const UpdateReportSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional()
});

// GET /api/reports - List all reports
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Get reports with pagination
    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          _count: {
            select: { pages: true, exports: true }
          },
          pages: {
            select: {
              id: true,
              pageOrder: true,
              template: {
                select: {
                  pageId: true,
                  title: true
                }
              }
            },
            orderBy: { pageOrder: 'asc' }
          }
        }
      }),
      prisma.report.count({ where })
    ]);
    
    logInfo('Reports fetched', { count: reports.length, total, page, limit });
    
    return NextResponse.json({
      reports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logError('Failed to fetch reports', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

// POST /api/reports - Create new report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateReportSchema.parse(body);
    
    const report = await prisma.report.create({
      data: validatedData
    });
    
    logInfo('Report created', { id: report.id, name: report.name });
    
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }
    
    logError('Failed to create report', error);
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    );
  }
}
