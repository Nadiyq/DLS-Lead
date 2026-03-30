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

```css
/* Hover -- filled/soft: OKLCH shift */
.dls-{name}[data-variant="filled"]:hover:not(:disabled) {
  background: oklch(from var(--_base) calc(l + var(--dls-state-l-delta-hover)) c h);
}
/* Hover -- transparent variants: overlay */
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
