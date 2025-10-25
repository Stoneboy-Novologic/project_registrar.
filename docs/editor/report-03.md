# Report-03 Documentation

## Overview

Report-03 is a Table of Contents and Attachments page designed for construction project documentation. It provides a comprehensive index of document attachments, author information, and detailed table of contents with page references.

## Structure

The report is organized into three main sections:

1. **Header Section**: Region/project information with company badge
2. **Two-Column Layout**: 
   - Left: List of Attachments with checkmarks
   - Right: Authors table with contact information
3. **Full-Width Contents Table**: Detailed table of contents with page references

## Table Data Formats

### Attachments Table

JSON array format for attachment items:

```json
[
  {
    "checked": true,
    "description": "XER file of schedule version 6-C.8 dated 2025-03-13"
  },
  {
    "checked": false,
    "description": "Additional document description"
  }
]
```

**Fields:**
- `checked` (boolean): Whether the attachment is included
- `description` (string): Full description of the attachment

### Authors Table

JSON array format for author information:

```json
[
  {
    "name": "Aditya Arya",
    "title": "Managing Director",
    "email": "a@stoneboy.co",
    "phone": "647-939-8600",
    "role": "Schedule Model Development, Schedule Narrative, Schedule Review, Final Sign-Off"
  },
  {
    "name": "Danilo Soriano",
    "title": "Scheduler",
    "email": "danilo@stoneboy.co",
    "phone": "437-808-0395",
    "role": "Schedule Model Development, Schedule Update, Schedule Narrative, Project Controls"
  }
]
```

**Fields:**
- `name` (string): Author's full name
- `title` (string): Job title or position
- `email` (string): Email address
- `phone` (string): Phone number
- `role` (string): Comma-separated list of responsibilities

### Contents Table

JSON array format for table of contents entries:

```json
[
  {
    "section": "1",
    "item": "Overview",
    "description": "",
    "note": "",
    "page": "8",
    "bold": true,
    "highlighted": true,
    "indented": false
  },
  {
    "section": "",
    "item": "Table 1.1",
    "description": "Select List of Project Stakeholders",
    "note": "",
    "page": "8",
    "bold": false,
    "highlighted": false,
    "indented": true
  }
]
```

**Fields:**
- `section` (string): Section number (empty for sub-items)
- `item` (string): Item name or title
- `description` (string): Detailed description of the item
- `note` (string): Additional notes or references
- `page` (string): Page number reference
- `bold` (boolean): Whether the text should be bold
- `highlighted` (boolean): Whether the row should have highlighted background
- `indented` (boolean): Whether the item should be indented (sub-item)

## Styling Conventions

### Table Variants

The Table component supports different styling variants:

- **`attachments`**: Alternating white and light yellow rows
- **`authors`**: Alternating white and light yellow rows  
- **`contents`**: Alternating white and light blue/green rows, with special highlighting for main sections

### Color Scheme

- **Headers**: Light yellow background (`bg-yellow-100`)
- **Main sections**: Light blue/green background (`bg-blue-100`) with bold text
- **Regular rows**: Alternating white and colored backgrounds
- **Checkmarks**: Green circular background with white checkmark

### Typography

- **Main headings**: Large, bold, blue text (`text-blue-600`)
- **Bold items**: Font weight semibold
- **Regular text**: Standard font weight
- **Small text**: Reduced font size for secondary information

## Usage in Editor

### Field Input

Table fields use a JSON textarea input with:

- **Monospace font** for better JSON editing
- **Live preview** showing parsed data validation
- **Error indicators** for invalid JSON format
- **Item count display** for valid arrays

### Validation

The system validates:

- **JSON format**: Must be valid JSON syntax
- **Array structure**: Must be an array of objects
- **Required fields**: Each object must have expected properties
- **Data types**: Boolean and string fields are type-checked

### Error Handling

- **Invalid JSON**: Shows error message and falls back to empty array
- **Missing fields**: Uses default values or empty strings
- **Type mismatches**: Logs warnings and uses fallback values

## Implementation Notes

### Console Logging

All components include comprehensive console logging for debugging:

- Table rendering with data counts
- JSON parsing success/failure
- View model building process
- Component prop values

### Responsive Design

- **Mobile**: Single column layout with stacked tables
- **Tablet**: Maintains two-column layout with adjusted spacing
- **Desktop**: Full layout with optimal spacing

### Performance

- **Lazy loading**: Components loaded dynamically via registry
- **Memoization**: Table data processed efficiently
- **Error boundaries**: Graceful fallbacks for parsing errors

## Architecture Flow Chart

```
┌─────────────────────────────────────────────────────────────────┐
│                        Report-03 Architecture                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Template      │    │   Editor        │    │   View          │
│   Definition    │    │   Store         │    │   Components    │
│                 │    │                 │    │                 │
│ report-03.json  │───▶│ FieldValues     │───▶│ Report03View    │
│                 │    │                 │    │                 │
│ • Fields        │    │ • JSON strings  │    │ • Table         │
│ • Placeholders  │    │ • Validation    │    │ • CheckIcon     │
│ • Help text     │    │ • Updates       │    │ • Layout        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Field Input   │    │   View Model    │    │   Registry      │
│   Component     │    │   Builder       │    │   System        │
│                 │    │                 │    │                 │
│ • JSON textarea │    │ • JSON parsing  │    │ • Template      │
│ • Live preview  │    │ • Zod validation│    │   registration │
│ • Validation    │    │ • Type mapping  │    │ • Dynamic       │
│ • Error display │    │ • Error handling│    │   imports       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Data Flow Process                           │
│                                                                 │
│ 1. User edits JSON in FieldInput                               │
│ 2. Values stored in EditorStore as strings                     │
│ 3. ConnectedReport03 subscribes to store changes               │
│ 4. View model parses JSON and validates with Zod               │
│ 5. Parsed data passed to Report03View component                │
│ 6. Tables rendered with proper styling and formatting          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Table Data Structures                       │
│                                                                 │
│ Attachments: [{checked: boolean, description: string}]         │
│ Authors: [{name, title, email, phone, role: string}]           │
│ Contents: [{section, item, description, note, page: string,    │
│            bold, highlighted, indented: boolean}]              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
app/components/report-pages/
├── Report03View.tsx          # Main view component
├── report03ViewModel.ts      # Data transformation and validation
├── ConnectedReport03.tsx     # Store connection wrapper
└── registry.ts              # Template registry entry

app/components/report-primitives/
├── Table.tsx                # Reusable table component
└── CheckIcon.tsx            # Checkmark icon component

app/data/templates/default-v1/
└── report-03.json           # Template definition with sample data
```

## Future Enhancements

- **Drag and drop**: Reorder table rows in editor
- **Rich text**: Support for formatted descriptions
- **Export options**: PDF/Word export with proper formatting
- **Template variants**: Different styling options
- **Bulk operations**: Add/remove multiple rows at once
