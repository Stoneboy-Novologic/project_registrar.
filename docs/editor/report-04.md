# Report-04 Documentation

## Overview

Report-04 is a Contents Continuation page designed to display additional table of contents entries from sections 2.6 through 6.14. It serves as a continuation of Report-03, showing more detailed project documentation entries with the same header style but focusing solely on the contents table.

## Structure

The report follows a simplified layout:

1. **Header Section**: Region/project information with company badge (same as Report-03)
2. **Full-Width Contents Table**: Detailed table of contents with page references

## Relationship to Report-03

Report-04 is designed to work alongside Report-03:
- **Report-03**: Shows initial contents (sections 1-2.5) plus attachments and authors
- **Report-04**: Shows continuation contents (sections 2.6-6.14) with same styling

## Table Data Format

### Contents Table

JSON array format for content entries (same as Report-03):

```json
[
  {
    "section": "2.6",
    "item": "EV Dashboard",
    "description": "",
    "note": "",
    "page": "17",
    "bold": false,
    "highlighted": false,
    "indented": false
  },
  {
    "section": "3",
    "item": "Reference Section",
    "description": "",
    "note": "",
    "page": "22",
    "bold": true,
    "highlighted": true,
    "indented": false
  }
]
```

**Fields:**
- `section` (string): Section number (e.g., "2.6", "3", "6.1") or empty for sub-items
- `item` (string): Item name or title
- `description` (string): Detailed description of the item
- `note` (string): Additional notes or references
- `page` (string): Page number reference or "-" for placeholders
- `bold` (boolean): Whether the text should be bold
- `highlighted` (boolean): Whether the row should have highlighted background
- `indented` (boolean): Whether the item should be indented (sub-item)

## Content Entries (from Image)

The template includes all entries from the provided image:

### Section 2.x (Dashboards & Exhibits)
- 2.6: EV Dashboard (page 17)
- 2.7: Variation Events Dashboard - Placeholder - (page -)
- 2.8: Cash Flow Curve (Exhibit C) (page 18)
- 2.9: Labor Curve (Exhibit D) (page 19)
- 2.10: Tunnel Production Curve (Exhibit E) (page 20)

### Section 3 (Reference Section) - Bold/Highlighted
- 3.1: List of Reviewed Documents (page 22)
- 3.2: Glossary (page 22, note: "See in Appendix A3.2")
- 3.3: Key Contract References (page 22)
- Table 3.3: Key Contract References (page 22, indented)

### Section 4 (Chronology) - Bold/Highlighted
- Main section entry (page 24)

### Section 5 (Variation Events) - Bold/Highlighted
- Variation Events - Placeholder - (description: "Variations in Project's Scope, Time, and Cost", page -)

### Section 6 (Project Scope) - Bold/Highlighted
- 6.1: Narrative for Scope Baseline in Schedule (page 34)
- Table 6.1: List of Project Stakeholders (page 34, indented)
- Illustration 6.2 through 6.14: Various project illustrations (all indented)

## Styling Conventions

### Table Variant
Uses the same `"contents"` variant as Report-03:
- **Headers**: Light yellow background (`bg-yellow-100`)
- **Main sections**: Light blue/green background (`bg-blue-100`) with bold text
- **Regular rows**: Alternating white and light blue/green backgrounds
- **Indented items**: Left padding for visual hierarchy

### Typography
- **Main headings**: Large, bold, blue text (`text-blue-600`)
- **Bold items**: Font weight semibold
- **Regular text**: Standard font weight
- **Page numbers**: Right-aligned in their column

## Usage in Editor

### Field Input
Same as Report-03:
- **JSON textarea** with monospace font
- **Live preview** showing parsed data validation
- **Error indicators** for invalid JSON format
- **Item count display** for valid arrays

### Validation
- **JSON format**: Must be valid JSON syntax
- **Array structure**: Must be an array of objects
- **Required fields**: Each object must have expected properties
- **Data types**: Boolean and string fields are type-checked

## Implementation Notes

### Reused Components
- **Table component**: Same `variant="contents"` styling
- **ContentItem interface**: Reused from Report-03
- **JSON parsing**: Same helper functions and error handling
- **Header styling**: Identical to Report-03

### Console Logging
All components include comprehensive console logging:
- Template rendering with data counts
- JSON parsing success/failure
- View model building process
- Component prop values

### Responsive Design
- **Mobile**: Single column layout with proper table scrolling
- **Tablet**: Maintains full-width layout with adjusted spacing
- **Desktop**: Optimal layout with proper column widths

## File Structure

```
app/components/report-pages/
├── Report04View.tsx          # Main view component
├── report04ViewModel.ts      # Data transformation and validation
└── ConnectedReport04.tsx    # Store connection wrapper

app/data/templates/default-v1/
└── report-04.json           # Template definition with sample data
```

## Future Enhancements

- **Pagination**: Split large contents tables across multiple pages
- **Search**: Filter contents by section or keyword
- **Export**: Generate PDF with proper page references
- **Navigation**: Click-to-jump functionality for page references
- **Sorting**: Reorder entries by section, page, or alphabetically
