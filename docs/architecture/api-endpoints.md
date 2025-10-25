# API Endpoints Documentation

## Overview

The scalable multi-report system provides RESTful API endpoints for managing templates, reports, and pages. All endpoints use JSON for request/response data and include proper error handling with Zod validation.

## Base URL

All API endpoints are prefixed with `/api/`

## Authentication

Currently, the system does not implement authentication. All endpoints are publicly accessible. Future versions will include user authentication and authorization.

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate resources)
- `500` - Internal Server Error

## Template Management API

### GET /api/templates

List all templates with pagination and filtering.

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `category` (string, optional): Filter by category
- `search` (string, optional): Search by title or pageId

**Response:**
```json
{
  "templates": [
    {
      "id": "clx123...",
      "pageId": "report-001",
      "title": "Project Register",
      "category": "project-documentation",
      "version": "1.0.0",
      "metadata": {
        "fieldCount": 20,
        "complexity": "intermediate",
        "description": "Standard project documentation"
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "_count": {
        "pages": 5
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 25,
    "pages": 2
  }
}
```

### GET /api/templates/[pageId]

Get a single template by pageId.

**Response:**
```json
{
  "id": "clx123...",
  "pageId": "report-001",
  "title": "Project Register",
  "category": "project-documentation",
  "version": "1.0.0",
  "fieldsJson": [
    {
      "id": "header.project",
      "label": "Project Name",
      "type": "text",
      "placeholder": "East Brampton Watermain",
      "required": true
    }
  ],
  "metadata": {
    "fieldCount": 20,
    "complexity": "intermediate"
  },
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z",
  "_count": {
    "pages": 5
  }
}
```

### POST /api/templates

Create a new template.

**Request Body:**
```json
{
  "pageId": "report-026",
  "title": "New Template",
  "category": "technical",
  "version": "1.0.0",
  "fieldsJson": [
    {
      "id": "field1",
      "label": "Field 1",
      "type": "text",
      "required": true
    }
  ],
  "metadata": {
    "fieldCount": 1,
    "complexity": "simple",
    "description": "New template description"
  }
}
```

**Response:** `201 Created` with the created template object.

### PUT /api/templates/[pageId]

Update an existing template.

**Request Body:** Same as POST, but all fields are optional.

**Response:** Updated template object.

### DELETE /api/templates/[pageId]

Delete a template.

**Response:**
```json
{
  "message": "Template deleted successfully"
}
```

**Note:** Cannot delete templates that are being used in reports.

## Report Management API

### GET /api/reports

List all reports with pagination and search.

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `search` (string, optional): Search by name or description

**Response:**
```json
{
  "reports": [
    {
      "id": "clx456...",
      "name": "East Brampton Project",
      "description": "Main project report",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "_count": {
        "pages": 3,
        "exports": 1
      },
      "pages": [
        {
          "id": "clx789...",
          "pageOrder": 1,
          "template": {
            "pageId": "report-001",
            "title": "Project Register"
          }
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 10,
    "pages": 1
  }
}
```

### GET /api/reports/[id]

Get a single report with all pages.

**Response:**
```json
{
  "id": "clx456...",
  "name": "East Brampton Project",
  "description": "Main project report",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z",
  "pages": [
    {
      "id": "clx789...",
      "reportId": "clx456...",
      "templateId": "clx123...",
      "pageOrder": 1,
      "valuesJson": {
        "header.project": "East Brampton Watermain",
        "header.date": "2024-01-15"
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "template": {
        "id": "clx123...",
        "pageId": "report-001",
        "title": "Project Register",
        "fieldsJson": [...]
      }
    }
  ],
  "exports": [
    {
      "id": "clx999...",
      "format": "PDF",
      "fileUrl": "https://example.com/export.pdf",
      "exportedAt": "2024-01-15T11:00:00Z"
    }
  ]
}
```

### POST /api/reports

Create a new report.

**Request Body:**
```json
{
  "name": "New Report",
  "description": "Report description (optional)"
}
```

**Response:** `201 Created` with the created report object.

### PUT /api/reports/[id]

Update report metadata.

**Request Body:**
```json
{
  "name": "Updated Report Name",
  "description": "Updated description"
}
```

**Response:** Updated report object.

### DELETE /api/reports/[id]

Delete a report and all its pages.

**Response:**
```json
{
  "message": "Report deleted successfully"
}
```

## Page Management API

### GET /api/reports/[id]/pages

Get all pages in a report.

**Response:**
```json
[
  {
    "id": "clx789...",
    "reportId": "clx456...",
    "templateId": "clx123...",
    "pageOrder": 1,
    "valuesJson": {
      "header.project": "East Brampton Watermain"
    },
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "template": {
      "id": "clx123...",
      "pageId": "report-001",
      "title": "Project Register"
    }
  }
]
```

### POST /api/reports/[id]/pages

Add a page to a report.

**Request Body:**
```json
{
  "templateId": "clx123..."
}
```

**Response:** `201 Created` with the created page object.

**Note:** The page is automatically initialized with placeholder values from the template.

### GET /api/reports/[id]/pages/[pageId]

Get a single page.

**Response:** Page object with template information.

### PUT /api/reports/[id]/pages/[pageId]

Update page values.

**Request Body:**
```json
{
  "valuesJson": {
    "header.project": "Updated Project Name",
    "header.date": "2024-01-16"
  }
}
```

**Response:** Updated page object.

### DELETE /api/reports/[id]/pages/[pageId]

Remove a page from a report.

**Response:**
```json
{
  "message": "Page removed successfully"
}
```

**Note:** Remaining pages are automatically reordered.

### PATCH /api/reports/[id]/pages/[pageId]

Reorder pages in a report.

**Request Body:**
```json
{
  "pageIds": ["clx789...", "clx790...", "clx791..."]
}
```

**Response:**
```json
{
  "message": "Pages reordered successfully"
}
```

## Export API

### GET /api/export/pdf?reportId=[id]

Export a report as PDF.

**Query Parameters:**
- `reportId` (string, required): Report ID to export

**Response:** PDF file download or redirect to generated PDF.

**Note:** This endpoint is currently a stub and will be implemented with Playwright for PDF generation.

## Client-Side API Functions

The system includes client-side API functions in `lib/api/` for easier frontend integration:

### Templates API (`lib/api/templates.ts`)
- `fetchTemplates(params)` - List templates with pagination
- `fetchTemplate(pageId)` - Get single template
- `createTemplate(data)` - Create template
- `updateTemplate(pageId, data)` - Update template
- `deleteTemplate(pageId)` - Delete template

### Reports API (`lib/api/reports.ts`)
- `fetchReports(params)` - List reports with pagination
- `fetchReport(reportId)` - Get single report
- `createReport(data)` - Create report
- `updateReport(reportId, data)` - Update report
- `deleteReport(reportId)` - Delete report
- `addPageToReport(reportId, templateId)` - Add page
- `updatePageValues(reportId, pageId, values)` - Update page
- `removePageFromReport(reportId, pageId)` - Remove page
- `reorderPages(reportId, pageIds)` - Reorder pages

## Rate Limiting

Currently, no rate limiting is implemented. Future versions will include rate limiting for API endpoints.

## CORS

The API supports CORS for cross-origin requests. All origins are currently allowed.

## Future Enhancements

### Planned Features
- User authentication and authorization
- API key authentication
- Rate limiting
- Webhook support for report events
- Bulk operations API
- Advanced search and filtering
- Real-time updates with WebSockets
- API versioning
