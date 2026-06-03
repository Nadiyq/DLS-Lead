# Tabs / tab-group

Category: navigation / view switcher
Figma component set: tab-group
React: <Tabs>
Spec: specs/components/tabs.md
TSX: apps/storybook/src/stories/tabs/Tabs.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tabs--docs

--------------------------------------------
## State implementation contract

`tab-group` maps to the React `Tabs` component. It owns the tablist and
renders tab items from the `items` array.

In code:
- Root exposes `role="tablist"`.
- Each rendered item is a native button with `role="tab"`.
- Selected state is controlled by `value`.
- `onChange` is called when an enabled tab is selected.
- Arrow keys, Home, and End move selection between enabled tabs.
- Hover uses overlay tokens; focus uses the DLS focus ring token.
--------------------------------------------

## Purpose
Local view switcher for moving between related sibling views or content
sections without leaving the current page.

## Use when
- Switching between sections in the same context.
- Entity detail pages need compact sibling views.
- Settings or admin pages need local subviews.
- A dense interface needs a low-height view switcher.

## Do NOT use for
- Global navigation -> use Sidebar or TopBar.
- Breadcrumb trails -> use Breadcrumbs.
- Primary or secondary actions -> use Button.
- Step-by-step progress or wizard flow.
- Filters, chips, badges, or tags.

## Figma -> Code mapping
| Figma property | React prop | Values |
|----------------|------------|--------|
| type | type | pill / folder |
| tab1 | items | true -> include an item, false -> omit it |
| tab2 | items | true -> include an item, false -> omit it |
| tab3 | items | true -> include an item, false -> omit it |
| component set | (React component) | fixed: Tabs |

Notes:
- Figma `tab1`, `tab2`, and `tab3` are design-time visibility toggles.
  In code, tab count and order come from the `items` array.
- The selected tab is controlled by `value`, not by a Figma group prop.
- Item-level icon, slot, and text behavior lives in the `tab-item`
  component set and maps to fields inside `items`.

## Anatomy
1. Tab group root.
2. Slot containing one or more tab items.
3. Tab item root button.
4. Optional item icon.
5. Item label.
6. Optional item slot content.

## Props / API
- items required. Array of tab item objects.
- value optional. Currently selected item value.
- onChange optional. Called with selected value.
- type optional. Default: pill.
- className optional.

Tab item shape:
- value required.
- label required.
- icon optional.
- slotContent optional.
- disabled optional.

## Tokens used
- --dls-radius-component-tab
- --dls-radius-component-tab-group
- --dls-color-surface-muted
- --dls-color-surface-base
- --dls-color-border-base
- --dls-color-text-primary
- --dls-color-text-disabled
- --dls-state-hover-overlay
- --dls-state-focus-ring-color
- --dls-shadow-surface-sm
- --dls-spacing-0-5
- --dls-spacing-1
- --dls-spacing-1-5
- --dls-spacing-2
- --dls-text-m-font-size
- --dls-text-m-line-height
- --dls-font-weight-normal
- --dls-font-weight-medium

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.

## States
- pill normal -> muted group surface, transparent tab item.
- pill selected -> base surface, active border, medium text, small shadow.
- folder normal -> tab item on muted surface.
- folder selected -> base surface with border and open bottom edge.
- hover -> state hover overlay on unselected enabled tab items.
- focus-visible -> focus ring on the focused tab item.
- disabled -> disabled text and native disabled behavior.

## Accessibility contract
- Root uses `role="tablist"`.
- Items use native button plus `role="tab"`.
- Items expose `aria-selected`.
- Tabs use roving tab focus.
- ArrowLeft/ArrowUp select previous enabled tab.
- ArrowRight/ArrowDown select next enabled tab.
- Home selects the first enabled tab.
- End selects the last enabled tab.
- Focus uses visible `:focus-visible` ring.

## Composition rules
- Use `Tabs` as the only tablist wrapper.
- Provide at least two enabled tab items.
- Keep labels short enough for compact navigation.
- Do not nest interactive controls inside item icon or slot content.
- Do not use Tabs for navigation that leaves the current context.

## Known deviations from system rules
Known Figma/code mapping deviations:
- Figma exposes fixed `tab1`, `tab2`, and `tab3` visibility toggles.
  Code uses the dynamic `items` array instead.
- Figma exposes `tab-item` separately; code keeps item rendering internal
  to `Tabs`.
- Tabs currently do not own tab panels, so tab buttons do not set
  `aria-controls`.
- L4 tab foreground tokens exist in `tokens.json`, but current CSS uses
  semantic text tokens to match Figma `text/primary`.

Resolved in this rollout:
- Storybook tab icons were migrated from inline SVGs to lucide-react.
- Tabs now expose explicit `aria-selected` values and roving tab focus.

## Code example
```tsx
<Tabs
  type="folder"
  value="activity"
  onChange={setTab}
  items={[
    { value: 'overview', label: 'Overview' },
    { value: 'activity', label: 'Activity' },
    { value: 'settings', label: 'Settings', disabled: true },
  ]}
/>
```

## Cross-references
- specs/components/tabs.md
- specs/figma-descriptions/tab-item.md
- specs/components/breadcrumbs.md
- specs/components/pagination.md
- specs/foundations/accessibility.md
- specs/foundations/motion.md
