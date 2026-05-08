---
name: DropdownExport
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dropdown-export/DropdownExport.tsx
  - apps/storybook/src/stories/dropdown-export/dropdown-export.css
  - tokens/tokens.json
---

# DropdownExport

## Metadata

- Category: table utilities
- Scopes: `all | visible`
- Formats: `csv | excel | pdf`

## Overview

Use `DropdownExport` for a table export settings panel — choose scope (all vs. visible columns) and format (CSV, Excel, PDF).

## Anatomy

- Root (role="dialog")
- "Export" label
- Scope radio group: all columns, visible only
- Divider
- "Format" label
- Format radio group: CSV, Excel, PDF

## Tokens Used

- `--dls-color-component-dropdown-export-*`
- radiobutton token families

## Props / API

- `scope` — `all | visible`
- `format` — `csv | excel | pdf`
- `onScopeChange`, `onFormatChange`

## States

- scope selected
- format selected

## Code Example

```tsx
<DropdownExport scope="all" format="excel" onScopeChange={setScope} onFormatChange={setFormat} />
```

## Cross-References

- [table.md](table.md)
- [radiobutton.md](radiobutton.md)
