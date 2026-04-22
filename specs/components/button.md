---
name: Button
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/Button.tsx
  - apps/storybook/src/stories/button.css
  - tokens/tokens.json
---

# Button

## Metadata

- Category: action
- Variants: `filled | outline | soft | dotted | ghost | link`
- Intents: `neutral | primary | info | success | warning | danger`
- Sizes: `m | s`

## Overview

Use `Button` for direct actions. Prefer it for CTAs, row actions, toolbar actions, modal actions, and small inline actions.

Do not use it for passive status, tags, or filter summaries.

## Anatomy

- Root button
- Leading icon slot
- Label content
- Trailing icon slot

## Tokens Used

- `--dls-radius-component-button`
- `--dls-color-intent-*`
- `--dls-state-l-delta-*`
- `--dls-state-hover-overlay`
- `--dls-state-pressed-overlay`
- `--dls-state-focus-ring-color`
- `--dls-spacing-*`

## Props / API

- `variant`
- `intent`
- `size`
- `icon`
- `iconEnd`
- `iconOnly`
- standard button HTML attributes

## States

- default
- hover
- active / pressed
- focus-visible
- disabled

Filled buttons use OKLCH shifts. Outline, dotted, ghost, and link buttons use overlay tokens.

## Code Example

```tsx
<Button variant="filled" intent="primary" size="m">
  Save
</Button>

<Button variant="ghost" intent="neutral" size="s" icon={<SettingsIcon />} iconOnly aria-label="Settings" />
```

## Cross-References

- [badge.md](badge.md)
- [filter-chip.md](filter-chip.md)
- [../patterns/component-selection.md](../patterns/component-selection.md)
