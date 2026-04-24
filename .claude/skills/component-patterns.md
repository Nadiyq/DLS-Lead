# Component CSS Patterns

## CSS Skeleton

```css
.dls-{name} {
  all: unset;
  box-sizing: border-box;
  --_base: var(--dls-color-intent-neutral-base);
  --_on-base: var(--dls-color-intent-neutral-on-base);
  --_subtle: var(--dls-color-intent-neutral-subtle);
  --_text: var(--dls-color-intent-neutral-text);
  --_border: var(--dls-color-intent-neutral-border);
  border-radius: var(--dls-radius-component-{name});
}
```

## Attribute Model (never classes for state/variant)

- `data-variant`: filled, outline, soft, dotted, ghost, link
- `data-intent`: neutral, primary, info, success, warning, danger
- `data-size`: xs, s, m, l
- `:disabled`: native HTML

## Token Lookup Order

1. `--dls-color-component-{name}-{property}-{state}` exists -> use it (L4)
2. `--dls-color-{semantic}-{role}` exists -> use it (L2)
3. No match -> define a new token in tokens.json. NEVER hardcode.

## State Implementation

**Golden rule: every interactive component with a base fill uses OKLCH L-shift for hover/pressed in CSS.** This applies to buttons, chips, tabs, menu items, toggles, list items, cards — any interactive component with a fill. Figma's `state/hover-overlay` / `state/pressed-overlay` tokens are **only a Figma simulation** of the OKLCH shift — NEVER port them into CSS for filled/soft/any-fill variants. Overlays are only appropriate for truly transparent variants (outline, dotted, ghost, link) where there is no base fill to shift.

```css
/* Hover -- filled / soft / any variant WITH a base fill: OKLCH L-shift */
.dls-{name}[data-variant="filled"]:hover:not(:disabled) {
  background: oklch(from var(--_base) calc(l + var(--dls-state-l-delta-hover)) c h);
}
.dls-{name}[data-variant="soft"]:hover:not(:disabled) {
  background: oklch(from var(--_subtle) calc(l + var(--dls-state-l-delta-hover)) c h);
}
/* Pressed -- same pattern, with the pressed L-delta */
.dls-{name}[data-variant="filled"]:active:not(:disabled) {
  background: oklch(from var(--_base) calc(l + var(--dls-state-l-delta-pressed)) c h);
}
/* Hover -- transparent variants ONLY (outline, dotted, ghost, link): overlay */
.dls-{name}[data-variant="outline"]:hover:not(:disabled) {
  background: var(--dls-state-hover-overlay);
}
/* Focus -- all variants */
.dls-{name}:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--dls-state-focus-ring-color);
}
/* Disabled -- all variants */
.dls-{name}:disabled {
  color: var(--dls-color-text-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
```

## Component Composition

Building blocks (e.g., `Chip`) are plain containers with NO visual chrome (no bg, border, states).
Styled components (e.g., `ChipRegular`) compose building blocks and add all visual styling.
Complex components (e.g., `FilterChip`) compose building blocks or styled components.

When composing, override building block styles to inherit from parent:
```css
.dls-styled-component .dls-building-block {
  color: inherit;
  height: auto;
}
```

## Anti-Patterns

- `background: #6941C6;` -- hardcoded color
- `border-radius: var(--dls-radius-m);` -- L1 primitive in component
- `.dls-button.is-disabled` -- class-based state
- `.dls-button:hover` -- missing `:not(:disabled)`
- `outline: 2px solid blue;` -- use `box-shadow` for focus ring
