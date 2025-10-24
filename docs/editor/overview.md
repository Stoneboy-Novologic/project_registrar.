# Editor Overview

This module implements a three-pane image-backed editor:

- Left: Section outline (pages)
- Middle: Dynamic form generated from the JSON template
- Right: Pixel-perfect preview rendered as text overlays on a background image

Key concepts:
- Template JSON defines fields with percentage-based coordinates (xPct, yPct, wPct) and optional typography (sizePt, weight, color, align).
- Values are stored in a Zustand store and autosaved to localStorage.
- The preview is responsive while preserving accuracy for print/PDF.

Paths:
- Template: app/data/templates/default-v1/report-01.json
- Components: app/components/editor/*
- Utilities: lib/*

Export:
- HTML: /export/html (print-optimized shell)
- PDF: /api/export/pdf (stub; implement with Playwright later)
