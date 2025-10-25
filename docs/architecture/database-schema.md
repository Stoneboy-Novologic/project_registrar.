# Database Schema Architecture

## Overview

The scalable multi-report system uses PostgreSQL with Prisma ORM to manage report templates, report instances, and user data. The schema is designed to support 100+ report templates with efficient querying and relationships.

## Database Models

### ReportTemplate

Stores the structure and metadata for report page templates.

```prisma
model ReportTemplate {
  id          String   @id @default(cuid())
  pageId      String   @unique  // "report-001", "report-002", etc.
  title       String
  category    String   // "project-documentation", "financial", etc.
  version     String   @default("1.0.0")
  fieldsJson  Json     // Store template.fields as JSON
  metadata    Json     // fieldCount, complexity, description
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  pages       ReportPage[]
  
  @@index([category])
  @@index([pageId])
}
```

**Key Features:**
- `pageId`: Unique identifier for template (e.g., "report-001")
- `fieldsJson`: Stores the template field definitions as JSON
- `metadata`: Stores additional metadata like field count and complexity
- `category`: Used for filtering and organization
- Indexes on `category` and `pageId` for efficient querying

### Report

Represents a user-created report instance containing multiple pages.

```prisma
model Report {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  pages       ReportPage[]
  exports     ReportExport[]
  
  @@index([name])
}
```

**Key Features:**
- `name`: User-defined report name
- `description`: Optional description
- One-to-many relationship with ReportPage
- One-to-many relationship with ReportExport
- Index on `name` for search functionality

### ReportPage

Represents a single page within a report instance.

```prisma
model ReportPage {
  id          String   @id @default(cuid())
  reportId    String
  templateId  String
  pageOrder   Int      // Order of this page within the report
  valuesJson  Json     // Filled field values
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  report      Report   @relation(fields: [reportId], references: [id], onDelete: Cascade)
  template    ReportTemplate @relation(fields: [templateId], references: [id])
  
  @@unique([reportId, pageOrder])
  @@index([reportId])
  @@index([templateId])
}
```

**Key Features:**
- `pageOrder`: Maintains page order within a report
- `valuesJson`: Stores filled field values as JSON
- Unique constraint on `[reportId, pageOrder]` ensures no duplicate page orders
- Cascade delete when parent report is deleted
- Indexes on `reportId` and `templateId` for efficient querying

### ReportExport

Tracks exported reports for audit and management purposes.

```prisma
model ReportExport {
  id          String   @id @default(cuid())
  reportId    String
  format      String   // "PDF", "JSON", "HTML"
  fileUrl     String?  // URL to the exported file
  exportedAt  DateTime @default(now())
  
  report      Report   @relation(fields: [reportId], references: [id], onDelete: Cascade)
  
  @@index([reportId])
  @@index([exportedAt])
}
```

**Key Features:**
- `format`: Export format (PDF, JSON, HTML)
- `fileUrl`: Optional URL to exported file
- `exportedAt`: Timestamp for audit trail
- Cascade delete when parent report is deleted
- Indexes for efficient querying by report and date

## Relationships

### One-to-Many Relationships

1. **Report → ReportPage**: One report can have many pages
2. **Report → ReportExport**: One report can have many exports
3. **ReportTemplate → ReportPage**: One template can be used in many pages

### Cascade Deletes

- Deleting a Report cascades to delete all ReportPages and ReportExports
- Deleting a ReportTemplate does NOT cascade (templates are shared)

## Indexes and Performance

### Primary Indexes
- All models have primary key indexes on `id`
- `ReportTemplate.pageId` has unique index
- `ReportPage[reportId, pageOrder]` has unique composite index

### Query Optimization Indexes
- `ReportTemplate.category` - for filtering templates by category
- `ReportTemplate.pageId` - for template lookups
- `Report.name` - for report search functionality
- `ReportPage.reportId` - for loading all pages in a report
- `ReportPage.templateId` - for template usage analytics
- `ReportExport.reportId` - for export history
- `ReportExport.exportedAt` - for export audit queries

## Data Types

### JSON Fields

The schema uses JSON fields for flexible data storage:

- `ReportTemplate.fieldsJson`: Stores template field definitions
- `ReportTemplate.metadata`: Stores template metadata
- `ReportPage.valuesJson`: Stores filled field values

### Field Structure

Template fields are stored as JSON arrays with this structure:

```typescript
interface TemplateField {
  id: string;           // Unique field identifier
  label: string;        // Display label
  type: FieldType;      // Field type (text, multiline, etc.)
  placeholder?: string; // Placeholder text
  helpText?: string;    // Help text
  required?: boolean;   // Required flag
  validation?: {        // Validation rules
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}
```

## Migration Strategy

### From localStorage to Database

The system supports migration from the old localStorage-based system:

1. Existing JSON templates are migrated to `ReportTemplate` table
2. User data can be imported as new `Report` instances
3. Backward compatibility maintained through legacy API methods

### Template Versioning

Templates support versioning through the `version` field:

- Current version: "1.0.0"
- Future versions can be added without breaking existing reports
- Version compatibility handled at the application level

## Security Considerations

### Data Access
- All database operations go through Prisma ORM
- API routes validate input with Zod schemas
- No direct database access from frontend

### Data Validation
- Zod schemas validate all input data
- JSON fields are validated against TypeScript interfaces
- Required fields are enforced at database and application level

## Performance Considerations

### Query Optimization
- Indexes on frequently queried fields
- Pagination for large result sets
- Lazy loading of template components

### Storage Optimization
- JSON fields reduce table joins
- Efficient indexing strategy
- Cascade deletes prevent orphaned data

## Future Enhancements

### Potential Additions
- User authentication and authorization
- Template sharing and collaboration
- Advanced search and filtering
- Template versioning and migration tools
- Audit logging for all operations
