# Report 5 - Project Overview & Stakeholders

## Overview

Report 5 is designed to display project overview information including introduction paragraphs, a stakeholder table, and contract summary details. It exactly replicates the layout from the provided reference image with a professional project documentation format.

### Purpose

This report template is ideal for:
- Project introduction pages
- Stakeholder identification and communication
- Contract scope documentation
- Project documentation that requires both narrative text and structured data

## Structure

The report consists of four main sections:

1. **Header** - Region, Project Info, and Badge
2. **Overview Section** - Roman numeral "I" header with three introduction paragraphs
3. **Stakeholder Table** - Table 1.1 with 6 stakeholder rows
4. **Contract Summary** - Scope section with 4 detailed bullet points

## Fields (34 Total)

### Header Fields (3)

- **header.region** - Organization or region name (required)
- **header.projectInfo** - Project name and reference numbers (required)
- **header.badge** - Company or organization badge (required)

### Overview Paragraphs (3)

- **overview.paragraph1** - First introduction paragraph with HTML formatting support (required)
- **overview.paragraph2** - Second introduction paragraph with HTML formatting support (required)
- **overview.paragraph3** - Third introduction paragraph with HTML formatting support (required)

### Stakeholder Data (24 fields = 6 rows × 4 fields)

For each stakeholder (1-6):
- **stakeholder[N].org** - Organization name (required)
- **stakeholder[N].website** - Website URL (optional, without https://)
- **stakeholder[N].role** - Role in the project (required)
- **stakeholder[N].projectNo** - Project number at organization (optional)

### Contract Summary (4)

- **contractSummary.bullet1** - First bullet point (required)
- **contractSummary.bullet2** - Second bullet point (required)
- **contractSummary.bullet3** - Third bullet point (required)
- **contractSummary.bullet4** - Fourth bullet point (required)

## Usage Guidelines

### HTML Formatting in Text Fields

The overview paragraphs and contract summary bullets support HTML formatting:

```html
<strong>Bold Text</strong>
<em>Italic Text</em>
```

Example:
```
This <strong>Project Register</strong> document has been prepared...
```

### Stakeholder Table

- Organization names are displayed in **bold**
- Websites appear as clickable links below the organization name
- Empty website fields are omitted from display
- Empty project numbers show as blank cells
- Only stakeholders with organization names are included in the table

### Table Styling

- **Header**: Yellow background (bg-yellow-100)
- **Rows**: Alternating white and light yellow (yellow-50)
- **Columns**: Organization (40%), Role (40%), Project No. (20%)

## Technical Architecture

### Component Structure

Following the existing pattern from Reports 1-4:

1. **Report05View.tsx** - Presentational component
   - Handles rendering logic
   - Prepares stakeholder table data
   - Renders HTML content with `dangerouslySetInnerHTML`

2. **report05ViewModel.ts** - Data transformation layer
   - Zod schema validation
   - Transforms flat FieldValues to Report05Props
   - Handles optional fields gracefully

3. **ConnectedReport05.tsx** - Zustand store connection
   - Connects view to global state
   - Passes values to viewModel
   - Renders view component

4. **report-05.json** - Template definition
   - Field definitions with placeholders
   - Help text and validation rules
   - Field metadata

### Data Flow

```
User Input → EditorStore (Zustand) 
          → ConnectedReport05
          → buildReport05ViewModel
          → Report05View
          → Rendered Output
```

### Key Features

- **HTML Content Rendering**: Uses `dangerouslySetInnerHTML` to support formatting
- **Dynamic Table Generation**: Filters out empty stakeholder rows
- **Link Generation**: Automatically adds https:// prefix to website URLs
- **Responsive Layout**: Uses Stack and Grid components for consistent spacing
- **Console Logging**: Comprehensive debugging at key points

## Integration with Editor

### Sidebar Selection

Report 5 appears in the sidebar as "Project Overview & Stakeholders" with the description: "Overview section with stakeholder table and contract summary"

### Form Fields

Fields are automatically grouped by prefix (header, overview, stakeholder1-6, contractSummary) in the editor sidebar.

### Live Preview

The preview updates in real-time as users modify form fields.

### PDF Export

The page layout is optimized for PDF export with proper page breaks and styling.

## Placeholder Data

The template includes realistic placeholder data matching the reference image:

- **Stakeholder 1**: Region of Peel (Project Owner)
- **Stakeholder 2**: Jacobs (Contract Administrator, Designer)
- **Stakeholder 3**: C&M McNally Engineering Corp. (General Contractor)
- **Stakeholder 4**: Erritt Construction (Subcontractor)
- **Stakeholder 5**: Clearway (Subcontractor)
- **Stakeholder 6**: Stoneboy (Scheduling & Project Controls Consultant)

## Troubleshooting

### HTML Not Rendering

**Problem**: HTML tags appear as text instead of formatting
**Solution**: Ensure HTML tags are properly escaped and not wrapped in quotes

**Correct**: `This <strong>Project Register</strong>`
**Incorrect**: `"This <strong>Project Register</strong>"`

### Table Not Displaying

**Problem**: Stakeholder table is empty
**Solution**: Verify at least one stakeholder has an organization name filled in

### Links Not Clickable

**Problem**: Website URLs are not clickable
**Solution**: Ensure website field contains only the domain (e.g., `www.example.com`) without `https://`

### Missing Stakeholders

**Problem**: Not all 6 stakeholders appear in the table
**Solution**: The table filters out rows without organization names. Fill in the organization name field to display that row.

## Code Examples

### Adding a New Stakeholder Row

To add more stakeholder rows, edit both files:

1. **report05ViewModel.ts**: Add fields to `Report05Props` interface and Zod schema
2. **report-05.json**: Add field definitions with unique IDs
3. **Report05View.tsx**: Add row to `stakeholderRows` array

### Custom Styling

To modify table colors or layout:

1. Edit `Table.tsx` in `app/components/report-primitives/`
2. Modify the `variant` prop usage in `Report05View.tsx`
3. Update CSS classes in the `getRowClassName` function

## Future Enhancements

Potential improvements for future versions:

- Dynamic number of stakeholder rows (not fixed at 6)
- Rich text editor instead of HTML markup
- Additional section types (beyond overview and contract summary)
- Export customization options
- Template variations for different industries

## Related Documentation

- [Report 03 Documentation](./report-03.md) - Similar table structure
- [Editor Overview](./overview.md) - General editor usage
- [Report Templates](./report-templates.md) - Template architecture
