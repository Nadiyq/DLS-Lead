# Component Patterns

How to scaffold, build, or modify a DLS-Lead component.

## Before You Start

1. Read `tokens/tokens.json` to find existing layer-4 tokens for the target component.
2. Check `apps/storybook/src/stories/` for existing components as reference.
3. Button (`Button.css`) is the canonical reference implementation.

## Component CSS Skeleton

```css
.dls-{name} {
  all: unset;
  box-sizing: border-box;

  /* Internal intent variables — set per data-intent */
  --_base: var(--dls-color-intent-neutral-base);
  --_on-base: var(--dls-color-intent-neutral-on-base);
  --_subtle: var(--dls-color-intent-neutral-subtle);
  --_text: var(--dls-color-intent-neutral-text);
  --_border: var(--dls-color-intent-neutral-border);

  border-radius: var(--dls-radius-component-{name});
}
```

## Attribute Model (never use classes for state/variant)

| Attribute | Values |
|-----------|--------|
| `data-variant` | `filled`, `outline`, `soft`, `dotted`, `ghost`, `link` |
| `data-intent` | `neutral`, `primary`, `info`, `success`, `warning`, `danger` |
| `data-size` | `xs`, `s`, `m`, `l` |
| `data-icon-only` | (presence) |
| `:disabled` | native HTML |

## Token Lookup Order

```
1. --dls-color-component-{name}-{property}-{state} exists? → Use it.
2. --dls-color-{semantic}-{role} exists? → Use it (layer 2).
3. No match? → Define a new token in tokens.json. NEVER hardcode.
```

## State Implementation

### Filled/soft variants — OKLCH lightness shift:
```css
.dls-{name}[data-variant="filled"]:hover:not(:disabled) {
  background: oklch(from var(--_base) calc(l + var(--dls-state-l-delta-hover)) c h);
}
.dls-{name}[data-variant="filled"]:active:not(:disabled) {
  background: oklch(from var(--_base) calc(l + var(--dls-state-l-delta-pressed)) c h);
}
```

### Transparent variants (outline, dotted, ghost, link) — overlay:
```css
.dls-{name}[data-variant="outline"]:hover:not(:disabled) {
  background: var(--dls-state-hover-overlay);
}
```

### Focus (all variants):
```css
.dls-{name}:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--dls-state-focus-ring-color);
}
```

### Disabled (all variants):
```css
.dls-{name}:disabled {
  background: var(--dls-color-surface-disabled);   /* filled/soft only */
  color: var(--dls-color-text-disabled);
  border-color: var(--dls-color-border-disabled);
  cursor: not-allowed;
  pointer-events: none;
}
```

## New Component Checklist

1. Define `radius.component.{name}` in `tokens.json`
2. Define `color.component.{name}` with bg/fg/border × base/disabled (minimum)
3. Regenerate `tokens.css` / `tokens.scss` / `tokens.ts`
4. Write CSS following skeleton above
5. Create React component + Storybook story in `apps/storybook/src/stories/`
6. Implement all 6 intents, all relevant variants
7. Test: hover, pressed, focus-visible, disabled across all variants
8. Sync to Figma via `figma-sync-4layer.js` → `addVariables()`

## Anti-Patterns (will be caught by lint hook)

```css
/* ✗ Hardcoded color */
background: #6941C6;

/* ✗ Layer-1 primitive in component */
border-radius: var(--dls-radius-m);

/* ✗ Class-based state */
.dls-button.is-disabled { opacity: 0.38; }

/* ✗ :hover without :not(:disabled) */
.dls-button:hover { background: ...; }

/* ✗ outline for focus ring */
.dls-button:focus-visible { outline: 2px solid blue; }

/* ✓ Correct patterns */
background: var(--_base);
border-radius: var(--dls-radius-component-button);
.dls-button:disabled { /* token-based */ }
.dls-button:hover:not(:disabled) { ... }
.dls-button:focus-visible { box-shadow: 0 0 0 3px var(--dls-state-focus-ring-color); }
```
