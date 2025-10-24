# Report Templates Architecture

## Overview

This document outlines the architecture and implementation details for the report template system, designed to be scalable and maintainable for construction industry document generation.

## Architecture

### Template Structure

Each report template consists of four main components:

1. **Template JSON** (`/app/data/templates/default-v1/report-XX.json`)
   - Defines field structure and metadata
   - Contains placeholder data for user guidance
   - Validated against Zod schema

2. **View Component** (`/app/components/report-pages/ReportXXView.tsx`)
   - Pure React component for rendering the report
   - Uses report primitives (Text, Stack, Section, etc.)
   - No state management or data fetching

3. **View Model Builder** (`/app/components/report-pages/reportXXViewModel.ts`)
   - Transforms form field values to component props
   - Handles data validation and transformation
   - Maps field IDs to component properties

4. **Connected Component** (`/app/components/report-pages/ConnectedReportXX.tsx`)
   - Connects view model to editor store
   - Handles real-time updates
   - Used in editor preview

### Registry System

The registry (`/app/components/report-pages/registry.ts`) provides:

- **Centralized template management**
- **Type-safe template definitions**
- **Metadata for each template**
- **Easy extensibility for new templates**

```typescript
export const pageRegistry = {
  "report-01": {
    connected: ConnectedReport01,
    view: Report01View,
    viewModel: buildReport01ViewModel,
    metadata: {
      title: "Project Register",
      description: "Standard project documentation with map",
      category: "project-documentation",
      version: "1.0.0",
      fieldCount: 20,
      complexity: "intermediate"
    }
  }
}
```

## Field Types

### Supported Field Types

| Type | Description | Input Component | Example |
|------|-------------|-----------------|---------|
| `text` | Single line text | `<input type="text">` | Project name |
| `multiline` | Multi-line text | `<textarea>` | Address, notes |
| `link` | URL/website | `<input type="url">` | Company website |
| `date` | Date picker | `<input type="date">` | Document date |
| `badge` | Status badge | `<input type="text">` | Project status |
| `image` | Image upload/URL | `<input type="text">` + preview | Project map |

### Field Structure

```json
{
  "id": "field.group.subfield",
  "label": "Human Readable Label",
  "type": "text|multiline|link|date|badge|image",
  "placeholder": "Sample data for guidance"
}
```

### Field ID Convention

Use dot notation for hierarchical organization:
- `header.breadcrumb` - Header section, breadcrumb field
- `title.main` - Title section, main title field
- `submittedTo.org` - Submitted To section, organization field
- `map.image` - Map section, image field

## CSS Variable System

### Report-Specific Variables

```css
:root {
  --report-bg: #ffffff;
  --report-fg: #1f2937;
  --report-muted: #6b7280;
  --brand-primary: #1e40af;
  --report-badge-bg: #f0f9ff;
  --report-badge-text: #1e40af;
  --report-badge-border: #bfdbfe;
}
```

### Usage in Components

Report components use CSS variables for consistent theming:

```tsx
<Text variant="h1" className="text-[var(--brand-primary)]">
  {titleMain}
</Text>
```

## Adding New Report Templates

### Step-by-Step Guide

#### 1. Create Template JSON

Create `/app/data/templates/default-v1/report-02.json`:

```json
{
  "pageId": "report-02",
  "title": "Project Status Report",
  "fields": [
    {
      "id": "header.title",
      "label": "Report Title",
      "type": "text",
      "placeholder": "Project Status Report"
    },
    {
      "id": "project.name",
      "label": "Project Name",
      "type": "text",
      "placeholder": "East Brampton Watermain"
    }
  ]
}
```

#### 2. Create View Component

Create `/app/components/report-pages/Report02View.tsx`:

```tsx
"use client";

import Page from "../report-primitives/Page";
import Text from "../report-primitives/Text";
import Stack from "../report-primitives/Stack";

export interface Report02Props {
  headerTitle?: string;
  projectName?: string;
  // ... other props
}

export default function Report02View({
  headerTitle,
  projectName,
  // ... other props
}: Report02Props) {
  return (
    <Page>
      <Stack gap="md">
        <Text variant="h1">{headerTitle}</Text>
        <Text variant="h2">{projectName}</Text>
        {/* ... rest of layout */}
      </Stack>
    </Page>
  );
}
```

#### 3. Create View Model Builder

Create `/app/components/report-pages/report02ViewModel.ts`:

```tsx
import { z } from "zod";
import { FieldValues } from "@/lib/types";
import { Report02Props } from "./Report02View";

const schema = z.object({
  "header.title": z.string().optional(),
  "project.name": z.string().optional(),
  // ... other fields
});

export function buildReport02ViewModel(values: FieldValues): Report02Props {
  const parsed = schema.safeParse(values);
  const v = parsed.success ? parsed.data : ({} as any);
  
  return {
    headerTitle: v["header.title"],
    projectName: v["project.name"],
    // ... other mappings
  };
}
```

#### 4. Create Connected Component

Create `/app/components/report-pages/ConnectedReport02.tsx`:

```tsx
"use client";

import { useEditorStore } from "@/lib/store";
import Report02View from "./Report02View";
import { buildReport02ViewModel } from "./report02ViewModel";

export default function ConnectedReport02() {
  const values = useEditorStore((s) => s.values);
  const vm = buildReport02ViewModel(values);
  return <Report02View {...vm} />;
}
```

#### 5. Update Registry

Add to `/app/components/report-pages/registry.ts`:

```tsx
export const pageRegistry = {
  "report-01": {
    // ... existing entry
  },
  "report-02": {
    connected: dynamic(() => import("./ConnectedReport02"), { ssr: false }),
    view: async () => (await import("./Report02View")).default,
    viewModel: buildReport02ViewModel,
    metadata: {
      title: "Project Status Report",
      description: "Comprehensive project status tracking",
      category: "project-tracking",
      version: "1.0.0",
      fieldCount: 15,
      complexity: "complex"
    }
  }
} as const satisfies Record<string, TemplateRegistryEntry>;
```

## Best Practices

### Template Design

1. **Consistent Field Grouping**: Use logical groupings (header, title, submittedTo, etc.)
2. **Meaningful Placeholders**: Provide realistic sample data
3. **Appropriate Field Types**: Choose the right input type for each field
4. **Clear Labels**: Use descriptive, human-readable labels

### Component Development

1. **Pure Components**: Keep view components stateless
2. **CSS Variables**: Use CSS variables for consistent theming
3. **Responsive Design**: Ensure reports work on different screen sizes
4. **Accessibility**: Include proper ARIA labels and semantic HTML

### Data Flow

1. **Form Values** → **View Model Builder** → **Component Props**
2. **Real-time Updates**: Changes in form immediately reflect in preview
3. **Validation**: Use Zod schemas for runtime type safety
4. **Error Handling**: Graceful fallbacks for missing data

## File Structure

```
app/
├── components/
│   ├── editor/           # Editor UI components
│   ├── report-pages/     # Report template components
│   │   ├── ConnectedReport01.tsx
│   │   ├── Report01View.tsx
│   │   ├── report01ViewModel.ts
│   │   └── registry.ts
│   └── report-primitives/ # Reusable report components
│       ├── Text.tsx
│       ├── Stack.tsx
│       ├── Section.tsx
│       └── ...
├── data/
│   └── templates/
│       └── default-v1/
│           ├── report-01.json
│           └── report-02.json
└── styles/
    └── report.css        # Report-specific styles
```

## Testing Considerations

### Unit Tests

- Test view model builders with various input data
- Test component rendering with different prop combinations
- Test field validation schemas

### Integration Tests

- Test complete form-to-preview data flow
- Test template switching functionality
- Test image field handling

### Visual Regression Tests

- Compare rendered reports against design specifications
- Test responsive behavior across screen sizes
- Verify CSS variable theming

## Performance Optimization

### Code Splitting

- Use dynamic imports for report components
- Lazy load templates only when needed
- Minimize bundle size for editor

### Caching

- Cache compiled view models
- Optimize image loading and caching
- Use React.memo for expensive components

## Future Enhancements

### Planned Features

1. **Template Versioning**: Support multiple versions of templates
2. **Custom Fields**: Allow users to add custom fields
3. **Template Sharing**: Export/import template configurations
4. **Advanced Layouts**: Support for complex multi-column layouts
5. **Interactive Elements**: Charts, tables, and dynamic content

### Architecture Improvements

1. **Plugin System**: Allow third-party template extensions
2. **Theme System**: Multiple color schemes and layouts
3. **Internationalization**: Multi-language support
4. **Accessibility**: Enhanced screen reader support

## Troubleshooting

### Common Issues

1. **Template Not Loading**: Check registry entry and file paths
2. **Fields Not Updating**: Verify view model mapping
3. **Styling Issues**: Check CSS variable definitions
4. **Image Not Displaying**: Verify image path and error handling

### Debug Tools

- Use React DevTools to inspect component props
- Check browser console for validation errors
- Use network tab to debug image loading issues
