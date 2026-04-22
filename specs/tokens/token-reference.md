---
name: Token Reference
category: tokens
status: active
read_when:
  - every_ui_task
  - token_lookup
source_of_truth:
  - tokens/tokens.json
  - tokens/tokens.css
---

# Token Reference

This is the everyday token map for AI agents. For exhaustive canonical definitions, use `tokens/tokens.json`.

## Lookup Order

1. Layer 4 component tokens
2. Layer 2 semantic tokens
3. Layer 3 state tokens for behavior
4. Layer 1 primitives only when editing the token system itself

## Layer Model

| Layer | Purpose | Example |
|---|---|---|
| 1 | Primitive raw values | `--dls-color-neutral-700` |
| 2 | Semantic UI meaning | `--dls-color-surface-base` |
| 3 | Interaction behavior | `--dls-state-hover-overlay` |
| 4 | Component-specific styling | `--dls-color-component-input-border-focus` |

## Semantic Color Tokens

### Surface

- `--dls-color-surface-base`
- `--dls-color-surface-subtle`
- `--dls-color-surface-muted`
- `--dls-color-surface-strong`
- `--dls-color-surface-inverse`
- `--dls-color-surface-disabled`

### Text

- `--dls-color-text-primary`
- `--dls-color-text-secondary`
- `--dls-color-text-inverse`
- `--dls-color-text-disabled`
- `--dls-color-text-placeholder`

### Border

- `--dls-color-border-base`
- `--dls-color-border-subtle`
- `--dls-color-border-strong`
- `--dls-color-border-focus`
- `--dls-color-border-disabled`
- `--dls-color-border-inverse`

### Intent Pattern

Use:

`--dls-color-intent-{intent}-{slot}`

Intents:

- `neutral`
- `primary`
- `info`
- `success`
- `warning`
- `danger`

Slots:

- `base`
- `on-base`
- `subtle`
- `strong`
- `text`
- `border`

## State Tokens

- `--dls-state-l-delta-hover`
- `--dls-state-l-delta-pressed`
- `--dls-state-hover-overlay`
- `--dls-state-pressed-overlay`
- `--dls-state-disabled-opacity`
- `--dls-state-focus-ring-color`

## Shadow Tokens

- `--dls-shadow-surface-sm`
- `--dls-shadow-surface-md`
- `--dls-shadow-surface-lg`
- `--dls-shadow-overlay`
- `--dls-shadow-focus-ring`

## Spacing Tokens

| Token | Value |
|---|---|
| `--dls-spacing-0` | `0px` |
| `--dls-spacing-0-5` | `2px` |
| `--dls-spacing-1` | `4px` |
| `--dls-spacing-1-5` | `6px` |
| `--dls-spacing-2` | `8px` |
| `--dls-spacing-2-5` | `10px` |
| `--dls-spacing-3` | `12px` |
| `--dls-spacing-4` | `16px` |
| `--dls-spacing-6` | `24px` |
| `--dls-spacing-8` | `32px` |
| `--dls-spacing-10` | `40px` |
| `--dls-spacing-11` | `44px` |
| `--dls-spacing-12` | `48px` |
| `--dls-spacing-14` | `56px` |
| `--dls-spacing-16` | `64px` |

## Typography Tokens

### Primitive Text Sizes

- `--dls-text-xs-font-size` / `--dls-text-xs-line-height`
- `--dls-text-s-font-size` / `--dls-text-s-line-height`
- `--dls-text-m-font-size` / `--dls-text-m-line-height`
- `--dls-text-l-font-size` / `--dls-text-l-line-height`
- `--dls-text-xl-font-size` / `--dls-text-xl-line-height`
- `--dls-text-2xl-font-size` / `--dls-text-2xl-line-height`
- `--dls-text-3xl-font-size` / `--dls-text-3xl-line-height`
- `--dls-text-hero-font-size` / `--dls-text-hero-line-height`

### Semantic Typography Families

Use patterns:

- `--dls-text-heading-{level}-*`
- `--dls-text-paragraph-{size}-{weight}-*`
- `--dls-text-button-{size}-*`
- `--dls-text-link-{size}-{weight}-*`
- `--dls-text-upper-{size}-*`
- `--dls-text-avatar-{size}-*`

## Radius Tokens

### Primitive

- `--dls-radius-0`
- `--dls-radius-xs`
- `--dls-radius-s`
- `--dls-radius-m`
- `--dls-radius-l`
- `--dls-radius-xl`
- `--dls-radius-2xl`
- `--dls-radius-full`

### Component Pattern

Use:

`--dls-radius-component-{name}`

Common examples:

- `--dls-radius-component-button`
- `--dls-radius-component-input`
- `--dls-radius-component-card`
- `--dls-radius-component-chip`
- `--dls-radius-component-list`
- `--dls-radius-component-list-item`
- `--dls-radius-component-tab`
- `--dls-radius-component-table`
- `--dls-radius-component-empty-state`

## Common Layer 4 Component Tokens

### Button

- `--dls-color-component-button-primary-*`
- `--dls-color-component-button-secondary-*`
- `--dls-color-component-button-ghost-*`

### Input

- `--dls-color-component-input-bg-base`
- `--dls-color-component-input-bg-disabled`
- `--dls-color-component-input-fg-base`
- `--dls-color-component-input-fg-placeholder`
- `--dls-color-component-input-fg-disabled`
- `--dls-color-component-input-border-base`
- `--dls-color-component-input-border-hover`
- `--dls-color-component-input-border-focus`
- `--dls-color-component-input-border-disabled`

### Table

- `--dls-color-component-table-row-bg-selected`
- `--dls-color-component-table-header-bg`
- `--dls-color-component-table-header-fg`

### Dialog / Dropdown / Avatar

- `--dls-color-component-dialog-*`
- `--dls-color-component-dropdown-*`
- `--dls-color-component-avatar-*`

## Do Not Invent

- Ad hoc token names
- New semantic families outside the 4-layer model
- Abbreviated token names
- CamelCase CSS variables

## Cross-References

- [../session-start.md](../session-start.md)
- [../foundations/color.md](../foundations/color.md)
- [../patterns/composition.md](../patterns/composition.md)
