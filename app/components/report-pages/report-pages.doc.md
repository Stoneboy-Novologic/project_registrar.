---
file: report-pages.doc.md
description: Report Pages Components Module
layer: frontend
dependencies: []
status: active
last_updated: 2025-01-27
---

## Overview

This module includes custom React components for all 25 report templates. Each template has a ViewModel, View component, and Connected component that integrates with the Zustand store.

## Files

Total files: 98+ (25 custom templates × 3 components each + ViewModels + Generic components + CSS)

### Custom Components (25 templates)

Each template includes:
- `report-XXXViewModel.ts` - TypeScript interface and builder function
- `ReportXXXView.tsx` - Pure React view component
- `ConnectedReportXXX.tsx` - Zustand-connected component
- `app/styles/report-XXX.css` - Template-specific styles

**Templates:**
- report-01 through report-05 (original)
- report-006, report-011 (previously custom)
- report-007 through report-010 (newly added)
- report-012 through report-025 (newly added)

### Generic Components
- `GenericReportView.tsx` - Generic renderer for templates without custom components
- `GenericConnectedReport.tsx` - Generic connected component
- `viewModelFactory.ts` - Generic ViewModel builder
- `registry.ts` - Component registry and resolver

## Location

`app/components/report-pages`

## Changelog

### 2025-01-27
- Added custom components for 18 new report templates (report-007 through report-010, report-012 through report-025)
- Each template includes ViewModel, View, Connected, and CSS files
- Updated registry.ts with all 18 new entries
- All templates now have custom components with category-specific styling