# Tabs

Category: navigation / view switcher
React: <Tabs>
Spec: specs/components/tabs.md
TSX: apps/storybook/src/stories/tabs/Tabs.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tabs--docs
Figma component sets:
- tab-group → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=328-4689
- tab-item  → https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=60-2050

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a SIMULATION
of the code behavior, not the implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  → OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or ghost-surface
  components like Accordion, ListItem, MenuItem)
  → overlay tokens.

This component uses: OVERLAY TOKENS (transparent unselected surface).
Selected pill tabs are filled white panels with a small shadow; the
selected state is a *swap* (not a hover-style L-shift) because the
selected style is qualitatively different from unselected.
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose

Local tablist for switching between related sibling views or content
sections without leaving the current page. The React `Tabs`
component wraps both Figma component sets (`tab-group` + `tab-item`)
into a single API: items go into `items`, the selected tab into
`value`/`onChange`, and the visual treatment into `type`.

## Use when

- Switching between sibling views in the same local context
  (e.g. profile/activity/settings sub-views of one record).
- Entity detail pages with compact sub-views.
- Settings or admin pages with related sections.
- Dense interfaces that need a low-height view switcher.

## Do NOT use for

- Global navigation → use `Sidebar` or `TopBar`.
- Breadcrumb trails → use `Breadcrumbs`.
- Primary or secondary actions → use `Button`.
- Step-by-step progress or wizard flow.
- Filters, chips, badges, or tags.

## Figma → Code mapping

### Figma component set: tab-group (328:4689)

| Figma property | React prop  | Values / Notes                            |
|----------------|-------------|-------------------------------------------|
| type           | type        | `pill` → `pill`, `folder` → `folder`      |
| tab1 / tab2 / tab3 | items   | Figma visibility toggles. In code, the items array drives count, order, labels, and icons. |
| (slot)         | items       | Tab Item instances in the slot are configured via the `items` array. |
| —              | value       | Currently-selected tab value (controlled). |
| —              | onChange    | `(value: string) => void`                  |
| —              | className   | Root class extension.                      |

### Figma component set: tab-item (60:2050)

| Figma property | React prop  | Values / Notes                            |
|----------------|-------------|-------------------------------------------|
| type           | (inherited from Tabs) | `pill` / `folder`. In Figma each tab-item carries its own type; in code the Tabs root sets `data-type`. |
| state          | —           | Figma visual: `normal` / `hover` / `focus` / `selected`. In code these come from CSS pseudo-classes + `data-selected`. |
| icon           | items[].icon | Figma boolean toggles the leading icon slot; in code, pass an icon ReactNode on the item. |
| slot           | items[].slotContent | Figma boolean toggles the trailing slot; in code, pass slotContent on the item. |
| text           | items[].label | Figma editable text → item label.        |

`TabItem` is **not** a separate React export. Items are configured
through the `Tabs` items array; the React component renders them
internally as `<button role="tab">`.

## Anatomy

- Root — `<div class="dls-tab-group" role="tablist" data-type="pill | folder">`
- Items — `<button class="dls-tab-item" role="tab" aria-selected={…} data-selected={…}>`
  - Optional leading icon — `.dls-tab-item__icon`
  - Label text
  - Optional trailing slot content

## Props / API

```ts
export type TabType = 'pill' | 'folder';

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  slotContent?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  type?: TabType;        // default 'pill'
  className?: string;
}
```

## Tokens used

- `--dls-radius-component-tab`
- `--dls-radius-component-tab-group`
- `--dls-color-surface-base` (selected pill)
- `--dls-color-surface-muted` (folder group background, unselected folder tab)
- `--dls-color-border-base` (selected tab border)
- `--dls-color-text-primary`
- `--dls-color-text-disabled`
- `--dls-shadow-surface-sm` (selected pill shadow)
- `--dls-state-hover-overlay` (unselected tab hover)
- `--dls-state-focus-ring-color`
- `--dls-spacing-0-5`, `--dls-spacing-1`, `--dls-spacing-1-5`, `--dls-spacing-2`
- `--dls-text-m-font-size`, `--dls-text-m-line-height`
- `--dls-font-weight-medium` (selected label), `--dls-font-weight-normal` (unselected label)
- `--dls-font-family`

## States

| State    | Figma representation         | Code implementation             |
|----------|------------------------------|---------------------------------|
| normal   | `state=normal`               | default                         |
| hover    | `state=hover` overlay        | `:hover:not(:disabled):not([data-selected])` |
| focus    | `state=focus` ring           | `:focus-visible` + focus-ring shadow |
| selected | `state=selected`             | `value === item.value` → `data-selected` + `aria-selected="true"` + selected fill/border/shadow + medium weight |
| disabled | (n/a in Figma variants)      | `disabled` prop → `disabled` + `aria-disabled` + `--dls-color-text-disabled` |

No spatial motion. Color transitions on hover/focus do not require a
`prefers-reduced-motion` guard.

## Accessibility contract

- Root is `<div role="tablist">`.
- Each tab is a native `<button role="tab">` with `aria-selected`,
  `aria-disabled` (when disabled), and `tabIndex={selected ? 0 : -1}`
  (roving tabindex).
- Keyboard:
  - **Tab** → moves focus to the selected tab.
  - **ArrowLeft / ArrowUp** → previous enabled tab (wraps).
  - **ArrowRight / ArrowDown** → next enabled tab (wraps).
  - **Home** → first enabled tab.
  - **End** → last enabled tab.
  - **Space / Enter** → native button activation.
- Focus ring uses `box-shadow` via `--dls-state-focus-ring-color` —
  visible on `:focus-visible`.
- Disabled tabs use native `disabled` + `aria-disabled` so screen
  readers and keyboard skip them.

## Composition rules

- Render at least 2 items (a single tab is meaningless).
- 3–5 items is the typical sweet spot; more than ~7 hurts scannability.
- Tabs is a leaf navigation primitive — do not nest a Tabs inside
  another Tabs, and do not place a Tabs inside a `Button`.
- The Tabs component does not own tab panels — consumers render the
  matching panel below the tablist based on `value`.

## Known deviations

- Figma exposes `tab-item` as a separate component set; React does
  not export a `TabItem` — items are configured through the Tabs
  `items` array.
- Figma `tab-group` exposes fixed `tab1` / `tab2` / `tab3` visibility
  toggles. React uses a dynamic `items` array.
- Tabs currently does not own panels, so tab buttons do not set
  `aria-controls`. (Medium-severity gap; deferred until Tabs owns a
  panel slot.)
- L4 tab foreground tokens exist in `tokens.json` but the current CSS
  uses semantic text tokens to match the Figma `text/primary` bindings.

## Code example

```tsx
import { Tabs } from './tabs/Tabs';

const items = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'settings', label: 'Settings' },
];

function ProfilePage() {
  const [view, setView] = React.useState('overview');
  return (
    <>
      <Tabs type="pill" items={items} value={view} onChange={setView} />
      {view === 'overview' && <Overview />}
      {view === 'activity' && <Activity />}
      {view === 'settings' && <Settings />}
    </>
  );
}
```

## Cross-references

- [breadcrumbs.md](../components/breadcrumbs.md)
- [pagination.md](../components/pagination.md)
- [sidebar.md](../components/sidebar.md)
- [button.md](../components/button.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)
