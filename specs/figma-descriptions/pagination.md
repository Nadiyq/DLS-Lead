# Pagination

Category: navigation
React: <Pagination>, <PageButton>, <ItemsPerPage>
Spec: specs/components/pagination.md
TSX: apps/storybook/src/stories/pagination/Pagination.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-pagination--docs
Figma page button: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6115-12644

--------------------------------------------
## State implementation contract

Overlay state model. PageButton is a transparent surface
(surface-base background). Hover/pressed use overlay tokens.

- Hover: bg → --dls-state-hover-overlay
- Pressed: bg → --dls-state-pressed-overlay
- Focus-visible: ring → --dls-state-focus-ring-color
  (0 0 0 3px box-shadow)
- Selected: border → --dls-color-border-base,
  aria-current="page"
- Disabled: bg → --dls-color-surface-disabled,
  text → --dls-color-text-disabled
--------------------------------------------

## Purpose
Navigate paged data sets. Includes page number buttons with
smart ellipsis, previous/next arrows, and optional
items-per-page selector. Composed of three sub-components:
PageButton (individual controls), ItemsPerPage (page size
picker), and Pagination (full composed bar).

## Use when
- Paginated data tables.
- Search results with pages.
- Any paged content navigation.

## Do NOT use for
- In-page section navigation → use Tabs.
- Infinite scroll → handle programmatically.
- Step-by-step wizards → use Stepper.

## Figma → Code mapping

### Figma component set: page (6115:12644)
| Figma property | React prop       | Values / Notes |
|----------------|------------------|----------------|
| type           | type             | "number" / "more" / "previous" / "next". |
| state          | —                | Figma-only (normal/hover/focus/pressed/selected/disabled). CSS pseudo-classes + disabled/selected props in code. |
| text           | children         | Page number or label text. |

### Code-only props — PageButton
| React prop       | Notes |
|------------------|-------|
| type             | PageButtonType, default "number". |
| selected         | boolean, default false. |
| disabled         | boolean, default false. |
| onClick          | MouseEventHandler, optional. |
| children         | ReactNode. Page number for type="number". |
| className        | string, optional. |

### Code-only props — Pagination (composed)
| React prop       | Notes |
|------------------|-------|
| variant          | "bordered" | "borderless", default "bordered". |
| currentPage      | number, required (1-based). |
| totalPages       | number, required. |
| totalItems       | number, optional. Enables ItemsPerPage. |
| pageSize         | number, optional. |
| pageSizeOptions  | number[], default [5,10,20,50,100]. |
| onPageChange     | (page: number) => void, optional. |
| onPageSizeChange | (size: number) => void, optional. |
| className        | string, optional. |

### Code-only props — ItemsPerPage
| React prop       | Notes |
|------------------|-------|
| value            | number, required. |
| total            | number, required. |
| options          | number[], default [5,10,20,50,100]. |
| onChange         | (value: number) => void, optional. |
| className        | string, optional. |

Notes:
- Figma "page" component set covers PageButton only.
  Pagination bar and ItemsPerPage are code-only composed
  components.
- Figma state "selected" maps to selected=true + 
  aria-current="page" in code.
- Icons: lucide-react ChevronLeft, ChevronRight, ChevronDown.

## Anatomy
### PageButton
1. Root — <button class="dls-page-button">, native button.
   data-type, data-selected.
2. Icon (prev/next) — <span class="dls-page-button__icon">
   with ChevronLeft or ChevronRight.
3. Label text — page number or "Previous"/"Next"/"...".

### ItemsPerPage
1. Root — <div class="dls-items-per-page">.
2. Label — "Items per page".
3. Trigger — <button> with value + ChevronDown icon.
4. Dropdown — <List> with <ListItem> options.
5. Total label — "of {total}".

### Pagination
1. Root — <nav class="dls-pagination" aria-label="Pagination">.
   data-variant.
2. ItemsPerPage — optional, when totalItems + pageSize present.
3. Pages row — <div class="dls-pagination__pages">, flex row
   of PageButton instances.

## Props / API
See code-only props tables above.
- PageButton: ref forwarded to <button>.
- ItemsPerPage: ref forwarded to root <div>.
- Pagination: ref forwarded to <nav>.

## Tokens used
L4 component tokens:
- --dls-radius-component-pagination (page button radius)
- --dls-color-component-pagination-* (L4 color namespace exists)
- --dls-radius-component-input (ItemsPerPage trigger radius)

L2 semantic tokens:
- --dls-color-surface-base (page button bg)
- --dls-color-surface-disabled (disabled bg)
- --dls-color-intent-neutral-text (text color)
- --dls-color-text-disabled (disabled text)
- --dls-color-text-primary (ItemsPerPage text)
- --dls-color-text-secondary (chevron icon)
- --dls-color-border-base (selected border, trigger border)
- --dls-color-border-subtle (pagination bar border)

L3 state tokens:
- --dls-state-hover-overlay (hover bg)
- --dls-state-pressed-overlay (pressed bg)
- --dls-state-focus-ring-color (focus ring)

Spacing:
- --dls-spacing-1, --dls-spacing-1-5, --dls-spacing-2,
  --dls-spacing-2-5, --dls-spacing-3, --dls-spacing-4

Typography:
- --dls-font-family, --dls-font-weight-normal
- --dls-text-m-font-size, --dls-text-m-line-height

Shadow:
- --dls-shadow-surface-md (ItemsPerPage dropdown)

## States

### Figma representation (page 6115:12644)
- type: number / more / previous / next
- state: normal / hover / focus / pressed / selected / disabled

### Code implementation
- :hover:not(:disabled) — overlay hover bg.
- :active:not(:disabled) — overlay pressed bg.
- :focus-visible — box-shadow focus ring.
- [data-selected="true"] — border-base border,
  aria-current="page".
- :disabled — disabled surface + text, pointer-events none.
- ItemsPerPage trigger: transition background-color 100ms.
- ItemsPerPage chevron: transition transform 150ms
  (rotates 180° when open).
- @media (prefers-reduced-motion): transitions disabled.

## Accessibility contract
- PageButton is a native <button>.
- Selected page has aria-current="page".
- Pagination root is <nav aria-label="Pagination">.
- Previous/next buttons use visible text labels.
- Icons have no aria-label (text provides name).
- More button ("...") is disabled (non-interactive ellipsis).
- ItemsPerPage trigger has aria-haspopup="listbox" and
  aria-expanded.
- Keyboard: standard button Tab/Enter/Space. Dropdown
  closes on Escape + outside click.
- Focus-visible ring on all interactive elements.
- Respects prefers-reduced-motion.

## Composition rules
- Use Pagination for the full composed bar.
- Use PageButton standalone only in custom pagination layouts.
- ItemsPerPage appears automatically when totalItems and
  pageSize are provided.
- Bordered variant has container border; borderless has none.
- ItemsPerPage dropdown uses List + ListItem.
- At narrow widths (<600px), ItemsPerPage auto-hides via
  container query.

## Known deviations
- Figma "page" component set only covers PageButton.
  ItemsPerPage and Pagination bar are code-only compositions.
  Severity: low.

## Code example
<Pagination
  variant="bordered"
  currentPage={3}
  totalPages={10}
  totalItems={100}
  pageSize={10}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>

<!-- Borderless -->
<Pagination
  variant="borderless"
  currentPage={1}
  totalPages={5}
  onPageChange={setPage}
/>

<!-- Standalone PageButton -->
<PageButton type="number" selected>3</PageButton>

## Cross-references
- Table (primary pagination consumer)
- List / ListItem (ItemsPerPage dropdown)
- specs/components/pagination.md
