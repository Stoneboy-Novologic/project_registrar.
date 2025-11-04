# Documentation Review Report

**Date**: 2025-01-XX  
**Reviewer**: Architecture Analysis  
**Status**: ⚠️ Several documents need updates

## Executive Summary

Reviewed all 13 documentation files in the `docs/` folder and compared them against the current codebase. Found **3 documents that need updates** and **1 document that needs minor corrections**.

---

## Documents Requiring Updates

### 🔴 CRITICAL - Needs Major Update

#### 1. `docs/editor/overview.md`

**Status**: ❌ OUTDATED

**Issues Found**:
- States: "Values are stored in a Zustand store and autosaved to localStorage"
- **Reality**: Values are now stored in PostgreSQL database via Prisma ORM
- Auto-save is now database-backed with 2-second debounce, not localStorage
- Missing information about multi-report support
- No mention of database schema or API routes

**Required Updates**:
1. Update persistence description to mention PostgreSQL database
2. Add information about Prisma ORM
3. Mention multi-report support
4. Update auto-save mechanism description
5. Add information about API routes

**Current Content**:
```markdown
Key concepts:
- Template JSON defines fields with percentage-based coordinates (xPct, yPct, wPct) and optional typography (sizePt, weight, color, align).
- Values are stored in a Zustand store and autosaved to localStorage.
- The preview is responsive while preserving accuracy for print/PDF.
```

**Should Be**:
```markdown
Key concepts:
- Template JSON defines fields stored in PostgreSQL database via Prisma ORM
- Values are stored in a Zustand store and autosaved to PostgreSQL database with 2-second debounce
- Multi-report support: Reports contain multiple pages, each based on a template
- The preview is responsive while preserving accuracy for print/PDF
- Database-backed persistence with optimistic updates
```

---

#### 2. `docs/editor/flow.md`

**Status**: ❌ OUTDATED

**Issues Found**:
- Shows localStorage autosave flow
- Missing database persistence layer
- No mention of API routes
- Doesn't show the new multi-report architecture

**Current Diagram**:
```mermaid
flowchart LR
  A[User edits form] --> B[Zustand store update]
  B --> C[Autosave to localStorage]
  B --> D[Overlay components consume values]
  D --> E[Live Preview updates]
  E -->|/export/html| F[Printable HTML]
  F -->|/api/export/pdf| G[PDF (stub)]
```

**Should Be**:
```mermaid
flowchart LR
  A[User edits form] --> B[Zustand store update]
  B --> C[Optimistic UI update]
  B --> D[Debounced save 2s]
  D --> E[API Route /api/reports/[id]/pages/[pageId]]
  E --> F[Prisma ORM]
  F --> G[(PostgreSQL Database)]
  B --> H[Overlay components consume values]
  H --> I[Live Preview updates]
  I -->|/export/html| J[Printable HTML]
  J -->|/api/export/pdf| K[PDF (stub)]
```

**Required Updates**:
1. Replace localStorage with database flow
2. Add API route layer
3. Add Prisma ORM layer
4. Show debounced auto-save mechanism
5. Add optimistic update flow

---

#### 3. `docs/editor/report-templates.md`

**Status**: ⚠️ PARTIALLY OUTDATED

**Issues Found**:
- Shows static `pageRegistry` export as the main pattern
- Doesn't mention the dynamic `getTemplateRegistryEntry()` function
- Missing information about generic component fallback
- Doesn't explain the hybrid approach (custom + generic)
- Shows old registry structure without dynamic resolution

**Current Content** (lines 42-58):
```typescript
export const pageRegistry = {
  "report-01": {
    connected: ConnectedReport01,
    view: Report01View,
    viewModel: buildReport01ViewModel,
    metadata: {...}
  }
}
```

**Should Include**:
1. Primary pattern: `getTemplateRegistryEntry(pageId, template)` function
2. Custom components for reports 1-5, 6, 11
3. Generic component fallback for all other templates
4. Dynamic registry resolution
5. Legacy `pageRegistry` export for backward compatibility

**Required Updates**:
1. Update registry section to show `getTemplateRegistryEntry()` as primary pattern
2. Explain custom vs generic component selection
3. Document the fallback mechanism
4. Show how generic components work
5. Keep legacy registry info but mark as "backward compatibility only"

---

### 🔴 CRITICAL - Code/Documentation Mismatch

#### 4. `docs/architecture/api-endpoints.md`

**Status**: ❌ DOCUMENTATION ACCURATE BUT CODE HAS ISSUE

**Issues Found**:
- **Documentation says**: `PATCH /api/reports/[id]/pages/[pageId]` for reordering
- **API Client calls**: `PATCH /api/reports/${reportId}/pages/reorder`
- **Actual Route File**: `app/api/reports/[id]/pages/[pageId]/route.ts` has PATCH handler
- **Problem**: No route file exists at `/api/reports/[id]/pages/reorder/route.ts`

**Code Mismatch**:
- API Client (`lib/api/reports.ts` line 161): Calls `/api/reports/${reportId}/pages/reorder`
- Route File: PATCH handler is at `[pageId]/route.ts`, not `reorder/route.ts`
- This means the API call will fail with 404!

**Action Required**:
1. **CRITICAL**: Either:
   - Create route file at `app/api/reports/[id]/pages/reorder/route.ts`, OR
   - Update API client to call `/api/reports/${reportId}/pages/[pageId]` with PATCH method
2. Update documentation to match the actual implementation
3. Verify all other endpoint paths match

**Note**: This is a code issue, not just documentation. The reorder functionality may not work correctly.

---

## Documents Verified as Accurate

### ✅ Accurate Documentation

1. **`docs/architecture.md`** ✅
   - Comprehensive and up-to-date
   - Matches current codebase architecture
   - Includes all layers correctly

2. **`docs/architecture/data-flow.md`** ✅
   - Accurate data flow diagrams
   - Correctly describes auto-save mechanism
   - Database flow is documented

3. **`docs/architecture/database-schema.md`** ✅
   - Accurate schema description
   - Matches Prisma schema

4. **`docs/architecture/template-system.md`** ✅
   - Correctly describes registry system
   - Shows `getTemplateRegistryEntry()` function
   - Documents generic component fallback

5. **`docs/editor/report-03.md`** ✅
   - Template-specific documentation appears accurate

6. **`docs/editor/report-04.md`** ✅
   - Template-specific documentation appears accurate

7. **`docs/editor/report-05.md`** ✅
   - Template-specific documentation appears accurate

8. **`docs/editor/report-05-implementation-summary.md`** ✅
   - Implementation summary appears accurate

9. **`docs/editor/layout-improvements.md`** ✅
   - Layout documentation is accurate
   - Sidebar behavior matches code

---

## Summary Table

| Document | Status | Priority | Action Required |
|----------|--------|----------|-----------------|
| `editor/overview.md` | ❌ Outdated | HIGH | Major rewrite |
| `editor/flow.md` | ❌ Outdated | HIGH | Update diagram and flow |
| `editor/report-templates.md` | ⚠️ Partial | MEDIUM | Update registry section |
| `architecture/api-endpoints.md` | ✅ Mostly OK | LOW | Verify route paths |
| `architecture.md` | ✅ Accurate | - | None |
| `architecture/data-flow.md` | ✅ Accurate | - | None |
| `architecture/database-schema.md` | ✅ Accurate | - | None |
| `architecture/template-system.md` | ✅ Accurate | - | None |
| Other template docs | ✅ Accurate | - | None |

---

## Recommended Actions

### Immediate (High Priority)

1. **Update `docs/editor/overview.md`**
   - Remove localStorage references
   - Add database persistence information
   - Document multi-report architecture
   - Update auto-save mechanism description

2. **Update `docs/editor/flow.md`**
   - Replace localStorage flow with database flow
   - Add API route layer
   - Show debounced auto-save
   - Add optimistic update flow

### Short-term (Medium Priority)

3. **Update `docs/editor/report-templates.md`**
   - Document `getTemplateRegistryEntry()` as primary pattern
   - Explain custom vs generic component selection
   - Document fallback mechanism
   - Update registry examples

### Verification (Low Priority)

4. **Verify `docs/architecture/api-endpoints.md`**
   - Check all route paths match actual code
   - Verify HTTP methods
   - Ensure API client functions match

---

## Code References for Updates

### Current Auto-save Implementation
- **File**: `lib/store.ts`
- **Lines**: 197-238
- **Mechanism**: Debounced auto-save to database (2-second delay)
- **API**: `updatePageValues(currentReportId, currentPageId, values)`

### Current Registry Implementation
- **File**: `app/components/report-pages/registry.ts`
- **Primary Function**: `getTemplateRegistryEntry(pageId, template?)`
- **Lines**: 131-163
- **Fallback**: Generic components for unknown templates

### Database Schema
- **File**: `prisma/schema.prisma`
- **Models**: ReportTemplate, Report, ReportPage, ReportExport
- **Persistence**: PostgreSQL via Prisma ORM

---

## Notes

- The codebase has evolved from localStorage-based to database-backed architecture
- Multi-report support was added after initial documentation
- Template registry evolved from static to dynamic with generic fallback
- Documentation should reflect the current production-ready architecture

---

## Next Steps

1. Update the 3 identified documents
2. Verify API endpoint paths
3. Run documentation review again after updates
4. Consider adding changelog to track documentation updates

