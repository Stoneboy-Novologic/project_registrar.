#!/usr/bin/env tsx

/**
 * @file verifyTemplates.ts
 * @module scripts
 * @description Verify all 18 report templates have complete field definitions
 * @author BharatERP
 * @created 2025-01-27
 */

import { PrismaClient } from '@prisma/client';
import type { TemplateField } from '../lib/types';

// Use the same pattern as seed.ts - create PrismaClient directly
const prisma = new PrismaClient();

// Templates that need custom components
const requiredTemplates = [
  'report-007', 'report-008', 'report-009', 'report-010',
  'report-012', 'report-013', 'report-014', 'report-015',
  'report-016', 'report-017', 'report-018', 'report-019',
  'report-020', 'report-021', 'report-022', 'report-023',
  'report-024', 'report-025'
];

async function verifyTemplates() {
  console.log('🔍 Verifying report templates...\n');
  
  const templates = await prisma.reportTemplate.findMany({
    where: {
      pageId: {
        in: requiredTemplates
      }
    },
    select: {
      pageId: true,
      title: true,
      category: true,
      fieldsJson: true,
      metadata: true
    }
  });

  console.log(`Found ${templates.length} templates in database\n`);

  const missing: string[] = [];
  const incomplete: Array<{ pageId: string; issues: string[] }> = [];

  for (const requiredId of requiredTemplates) {
    const template = templates.find(t => t.pageId === requiredId);
    
    if (!template) {
      missing.push(requiredId);
      continue;
    }

    const issues: string[] = [];
    const fields = template.fieldsJson as TemplateField[];

    if (!Array.isArray(fields) || fields.length === 0) {
      issues.push('No fields defined');
    } else {
      // Check each field has required properties
      fields.forEach((field, index) => {
        if (!field.id) issues.push(`Field ${index}: missing id`);
        if (!field.label) issues.push(`Field ${index}: missing label`);
        if (!field.type) issues.push(`Field ${index}: missing type`);
      });

      // Check field grouping
      const hasGrouping = fields.some(f => f.id.includes('.'));
      if (!hasGrouping) {
        issues.push('Fields may not be properly grouped (no dots in IDs)');
      }
    }

    if (!template.title) issues.push('Missing title');
    if (!template.category) issues.push('Missing category');

    if (issues.length > 0) {
      incomplete.push({ pageId: requiredId, issues });
    }

    // Log template info
    const fieldCount = Array.isArray(fields) ? fields.length : 0;
    const groups = Array.isArray(fields) 
      ? [...new Set(fields.map((f: TemplateField) => f.id.split('.')[0]))]
      : [];
    
    console.log(`✅ ${requiredId}: ${template.title}`);
    console.log(`   Category: ${template.category}`);
    console.log(`   Fields: ${fieldCount}`);
    console.log(`   Groups: ${groups.join(', ')}`);
    if (issues.length > 0) {
      console.log(`   ⚠️  Issues: ${issues.join(', ')}`);
    }
    console.log('');
  }

  if (missing.length > 0) {
    console.log(`\n❌ Missing templates: ${missing.join(', ')}`);
  }

  if (incomplete.length > 0) {
    console.log(`\n⚠️  Incomplete templates:`);
    incomplete.forEach(({ pageId, issues }) => {
      console.log(`   ${pageId}: ${issues.join(', ')}`);
    });
  }

  if (missing.length === 0 && incomplete.length === 0) {
    console.log('\n✅ All templates verified and complete!');
    return true;
  }

  return false;
}

verifyTemplates()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

