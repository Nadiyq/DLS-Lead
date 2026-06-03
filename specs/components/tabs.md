---
name: Tabs
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/tabs/Tabs.tsx
  - apps/storybook/src/stories/tabs/Tabs.stories.tsx
  - apps/storybook/src/stories/tabs/tabs.css
  - tokens/tokens.json
---

# Tabs

## Metadata

- Category: navigation / view switcher
- Types: `pill | folder`
- States: `normal | hover | focus | selected | disabled`

## Overview

Use `Tabs` to switch between sibling views or content sections in the same context.

Use it for local view switching, settings sections, entity detail subviews, and compact same-context navigation.

Do not use it as the global site navigation, a breadcrumb trail, a filter chip, or a primary action row.

## Anatomy

- Tab group container
- Tab item
- Optional leading icon
- Label
- Optional trailing slot content

## Tokens Used

- `--dls-color-surface-muted`
- `--dls-color-surface-base`
- `--dls-color-border-base`
- `--dls-color-text-primary`
- `--dls-color-text-disabled`
- `--dls-radius-component-tab`
- `--dls-radius-component-tab-group`
- `--dls-state-hover-overlay`
- `--dls-state-focus-ring-color`
- `--dls-shadow-surface-sm`
- text, spacing, and font weight tokens

## Props / API

- `items`
- `value`
- `onChange`
- `type`
- `className`

Tab item shape:

- `value`
- `label`
- optional `icon`
- optional `slotContent`
- optional `disabled`

## States

- default
- selected
- hover
- focus-visible
- disabled

Tabs use roving tab focus. Arrow keys move and activate enabled tabs.
The selected tab exposes `aria-selected`.

## Code Example

```tsx
<Tabs
  type="pill"
  value="overview"
  onChange={setTab}
  items={[
    { value: "overview", label: "Overview" },
    { value: "activity", label: "Activity" }
  ]}
/>
```

## Cross-References

- [button.md](button.md)
- [breadcrumbs.md](breadcrumbs.md)
- [pagination.md](pagination.md)
- [../patterns/component-selection.md](../patterns/component-selection.md)
