# DropdownExport

Category: menu / table-utility
React: <DropdownExport>
Spec: specs/components/dropdown-export.md
TSX: apps/storybook/src/stories/dropdown-export/DropdownExport.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dropdownexport--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6122-15056

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

This component uses: NONE on the dropdown panel itself (passive
floating surface). Interactive states live on the composed
`Radiobutton`s (hybrid — checked uses OKLCH L-shift on neutral-base)
and the trailing `Button` (outline variant uses overlay tokens).
ListItem rows holding the radiobuttons render as non-interactive
`<div>` containers (`interactive={false}`) because the focusable
control is the `<input type="radio">` inside.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Export-settings panel that opens adjacent to the main
`DropdownOptions` (the **Export** row in the table top-bar options
menu opens this dropdown as a sibling, never overlapping the parent).

Two mutually-exclusive radio groups:
1. **Export** scope — `All columns` (default) or `Only visible columns`.
2. **Format** — `CSV` (default), `Excel`, or `PDF`.

A trailing **Export** button fires `onExport(scope, format)` with
the staged selection.

## Use when

- Below the **Export** item in the `DropdownOptions` menu on a
  table top bar.
- Any in-app surface that triggers a table / dataset export with
  scope + format choices.

## Do NOT use for

- Column visibility / order → use `DropdownColumns`.
- Filter management → use `DropdownFilters`.
- Sort controls → use `DropdownSorting`.
- Saving / downloading a single file → use a plain `Button`.
- Multi-step export wizards → use `Dialog` with a stepper.

## Figma → Code mapping

| Figma property      | React prop      | Values / Notes                                  |
|---------------------|-----------------|--------------------------------------------------|
| (Export label)      | (auto-rendered) | `<ListItem type="label" text="Export" />`        |
| (scope radio rows)  | scope / onScopeChange | Two `<Radiobutton>` rows in a single `name` group: `all` (default) / `visible`. |
| (divider)           | (auto-rendered) | `<ListItem type="divider" />` between scope and format sections. |
| (Format label)      | (auto-rendered) | `<ListItem type="label" text="Format" />`        |
| (format radio rows) | format / onFormatChange | Three `<Radiobutton>` rows in a single `name` group: `csv` (default) / `excel` / `pdf`. |
| (Export button row) | onExport        | Outline `Button`. Receives `(scope, format)` payload. |
| —                   | className       | Root class extension.                            |

## Anatomy

- Root — `.dls-dropdown-export` with `role="dialog"` and
  `aria-label="Export settings"`.
- Body (rendered via Lists / ListItems composition):
  - `<ListItem type="label" text="Export" />`
  - `<ListItem type="with-slots" interactive={false} selected={…} slotLeft={<Radiobutton …name="export-scope-{groupId}" />} />` × 2
  - `<ListItem type="divider" />`
  - `<ListItem type="label" text="Format" />`
  - `<ListItem type="with-slots" interactive={false} selected={…} slotLeft={<Radiobutton …name="export-format-{groupId}" />} />` × 3
  - `<ListItem type="buttons"><Button variant="outline" intent="neutral" size="m">Export</Button></ListItem>`
- The two radio groups use distinct `name` attributes scoped by a
  `React.useId()` group ID so multiple DropdownExport instances on
  the same page don't collide.

## Props / API

```ts
export type ExportScope = 'all' | 'visible';
export type ExportFormat = 'csv' | 'excel' | 'pdf';

export interface DropdownExportProps {
  scope?: ExportScope;        // default 'all'
  format?: ExportFormat;      // default 'csv' (matches Figma spec)
  onScopeChange?: (scope: ExportScope) => void;
  onFormatChange?: (format: ExportFormat) => void;
  onExport?: (scope: ExportScope, format: ExportFormat) => void;
  className?: string;
}
```

## Tokens used

- `--dls-color-surface-base` (panel background — via List)
- `--dls-color-border-subtle` (panel border — via List)
- `--dls-shadow-surface-md` (panel shadow — via List)
- `--dls-radius-component-list` (panel radius — via List)
- `--dls-spacing-2` (panel padding — via List)
- `--dls-font-family`
- All `ListItem` + `Radiobutton` + `Button` tokens (composed)

## States

| State                 | Figma representation     | Code implementation                          |
|-----------------------|--------------------------|----------------------------------------------|
| default               | `selected` on All columns + CSV | `scope="all"` + `format="csv"` (the React defaults) |
| different scope       | `selected` on Only visible columns | `scope="visible"` via onScopeChange |
| different format      | `selected` on Excel / PDF | `format="excel"` / `"pdf"` via onFormatChange |
| row selected highlight | `state=pressed` info-subtle fill | `selected={true}` on the ListItem (paints info-subtle background via L4 ListItem state token) |

No spatial motion on the panel itself. Color transitions on the
composed Radiobuttons + Button carry their own contracts.

## Accessibility contract

- Root is `<div role="dialog" aria-label="Export settings">`.
- Each scope row + each format row is a non-interactive
  `<ListItem interactive={false}>` rendered as a `<div>` so the
  focusable `<input type="radio">` inside is not nested in a
  `<button>`.
- Radio groups are scoped by unique `name` attributes:
  `export-scope-{useId()}` and `export-format-{useId()}` — so
  multiple instances of DropdownExport on the same page don't
  collide.
- Each `Radiobutton` carries its own label (visible text) and
  native focus / arrow-key behavior (Radiobutton component uses
  native `<input type="radio">` inside a `<label>` per the DLS
  Radiobutton contract).
- The Export Button is a native `<button>` with its visible label
  providing the accessible name.

## Composition rules

- Always render `DropdownExport` as a SIBLING of the main
  `DropdownOptions` panel — never nested — so the parent menu
  stays visible.
- Do not nest a `DropdownExport` inside another `DropdownExport`.
- Do not add additional radio groups to the panel — the contract
  is exactly two groups (scope, format) plus one Export button.
- The Export button MUST be outline (variant="outline",
  intent="neutral"), size="m" — the action is a "send these
  staged choices upstream," not a primary CTA.

## Known deviations

- The component spec mentions
  `--dls-color-component-dropdown-export-*` tokens but those do
  not exist in `tokens.json`. The CSS uses semantic surface/border
  tokens directly via the composed `<List>` building blocks.
  (Low severity.)
- The Figma frame uses simple Radiobutton primitives without the
  outer label tap-target; in code, the entire ListItem row is the
  selectable hit area (the row's slotLeft contains the Radiobutton,
  and the row carries `selected={…}` to paint the info-subtle
  fill). Both visuals match. (Low severity — intentional.)
- The Figma frame shows the "All columns" row in a `state=pressed`
  treatment; in code, that highlight is driven by
  `selected={scope === 'all'}` which paints
  `--dls-color-intent-info-subtle` via the ListItem `selected`
  contract.

## Code example

```tsx
import { DropdownExport } from './dropdown-export/DropdownExport';

function ExportButton() {
  const [scope, setScope] = useState<'all' | 'visible'>('all');
  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');

  return (
    <DropdownExport
      scope={scope}
      format={format}
      onScopeChange={setScope}
      onFormatChange={setFormat}
      onExport={(s, f) => {
        startExport({ scope: s, format: f });
      }}
    />
  );
}
```

## Cross-references

- [dropdown-options.md](dropdown-options.md)
- [dropdown-columns.md](dropdown-columns.md)
- [dropdown-filters.md](dropdown-filters.md)
- [dropdown-sorting.md](../components/dropdown-sorting.md)
- [radiobutton.md](../components/radiobutton.md)
- [button.md](../components/button.md)
- [list.md](../components/list.md)
- [list-item.md](../components/list-item.md)
- [table-top-bar.md](table-top-bar.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)
