# TabItem / tab-item

Category: navigation / tab item
Figma component set: tab-item
React: <Tabs> items[]
Spec: specs/components/tabs.md
TSX: apps/storybook/src/stories/tabs/Tabs.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-tabs--docs

--------------------------------------------
## State implementation contract

`tab-item` is the item-level Figma component used inside Tab Group.
In code, there is no exported `<TabItem>` React component. Tab items are
configured through the `Tabs` `items` array.

In code:
- `role="tab"` is applied to each tab button.
- `aria-selected` is controlled by `Tabs.value`.
- Focus uses `:focus-visible` and the DLS focus ring token.
- Hover uses the state hover overlay token.
- Disabled uses the native button `disabled` attribute.
- Arrow keys, Home, and End move selection between enabled tabs.
--------------------------------------------

## Purpose
Item-level tab control for switching between related sibling views
inside a local tab group.

## Use when
- Creating a tab item inside Tab Group.
- A tab needs optional leading icon content.
- A tab needs optional trailing slot content.
- A tab belongs to a local view switcher controlled by `Tabs`.

## Do NOT use for
- Standalone buttons or actions -> use Button.
- Global navigation -> use Sidebar or TopBar.
- Breadcrumb trails -> use Breadcrumbs.
- Filters, chips, badges, or tags.
- Manually composing tab buttons outside `Tabs`.

## Figma -> Code mapping
| Figma property | React prop | Values |
|----------------|------------|--------|
| type | type | pill / folder |
| state | value / CSS state | selected -> `value === item.value`; normal / hover / focus are native CSS states |
| icon | items | true -> `items[].icon`, false -> omit icon |
| slot | items | true -> `items[].slotContent`, false -> omit slot content |
| text | items | `items[].label` |
| component set | (React component) | fixed: tab-item inside Tabs |

Notes:
- `state` is not a React prop. Selected state comes from `value`; hover
  and focus come from CSS pseudo-classes.
- `icon`, `slot`, and `text` are item-level fields inside `items`.
- Use lucide-react icons for `items[].icon`.

## Anatomy
1. Root tab button.
2. Optional leading icon.
3. Label text.
4. Optional trailing slot content.

## Props / API
Tab item shape inside `Tabs.items`:
- value required. Unique tab key.
- label required. Visible tab label.
- icon optional. Leading ReactNode.
- slotContent optional. Trailing ReactNode.
- disabled optional. Native disabled state.

## Tokens used
- --dls-radius-component-tab
- --dls-color-surface-base
- --dls-color-surface-muted
- --dls-color-border-base
- --dls-color-text-primary
- --dls-color-text-disabled
- --dls-state-hover-overlay
- --dls-state-focus-ring-color
- --dls-shadow-surface-sm
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
- normal -> transparent for pill, muted surface for folder.
- hover -> state hover overlay.
- focus-visible -> focus ring.
- selected -> base surface, active border, medium text, optional shadow.
- disabled -> disabled text and native disabled behavior.

## Accessibility contract
- Each tab item is a native `button` with `role="tab"`.
- Each tab item exposes `aria-selected`.
- Disabled tabs use native `disabled`.
- Arrow keys, Home, and End are handled by `Tabs`.
- Focus uses visible `:focus-visible` ring.

## Composition rules
- Use only inside Tab Group / `Tabs`.
- Do not nest buttons, links, inputs, dropdowns, or other tabs inside a
  tab item.
- Slot content must be compact and decorative or status-like; do not put
  interactive controls in the slot.

## Known deviations from system rules
Known Figma/code mapping deviations:
- Figma exposes `tab-item` as a separate component set. Code does not
  export `TabItem`; tab items are data objects inside `Tabs.items`.
- Figma selected state is a visual variant. Code selected state is
  controlled by `Tabs.value`.
- Tabs currently do not own tab panels, so tab buttons do not set
  `aria-controls`.

Resolved in this rollout:
- Storybook tab icons were migrated from inline SVGs to lucide-react.
- Tabs now expose explicit `aria-selected` values and roving tab focus.

## Code example
```tsx
<Tabs
  type="pill"
  value="overview"
  onChange={setTab}
  items={[
    { value: 'overview', label: 'Overview' },
    { value: 'activity', label: 'Activity' },
  ]}
/>
```

## Cross-references
- specs/components/tabs.md
- specs/figma-descriptions/tab-group.md
- specs/components/button.md
- specs/components/breadcrumbs.md
- specs/patterns/accessibility-generation.md
