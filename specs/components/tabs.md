---
name: Tabs
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/tabs/Tabs.tsx
  - tokens/tokens.json
---

# Tabs

## Metadata

- Category: navigation / view switcher
- Types: `pill | folder`

## Overview

Use `Tabs` to switch between sibling views or content sections in the same context.

Do not use it as the global site navigation.

## Anatomy

- Tab group container
- Tab item
- Optional leading icon
- Label
- Optional trailing slot content

## Tokens Used

- `color.component.tab.*`
- `--dls-radius-component-tab`
- text semantic tokens

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
- disabled

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
- [../patterns/component-selection.md](../patterns/component-selection.md)
