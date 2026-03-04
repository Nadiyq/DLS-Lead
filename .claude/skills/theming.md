# Theming

How light/dark themes and brand overrides work in DLS-Lead.

## Override Strategy by Scope

| Scope | Override target | Selector |
|-------|----------------|----------|
| Dark/light theme | Layer-2 semantic tokens | `[data-theme="dark"]` on `:root` |
| Brand | Layer-1 primitive scales | `[data-brand="X"]` on `:root` |
| Component type | Layer-4 tokens | `.dls-button { --dls-radius-component-button: 0; }` |
| Single instance | Internal variables | `.my-btn { --_base: var(--dls-color-danger-600); }` |
| Page section | Layer-2 scoped to container | `.dashboard { --dls-color-surface-base: ...; }` |

## Dark Theme

Currently defined overrides (apply via `[data-theme="dark"]`):
- `color.overlay.backdrop`: `rgba(0,0,0,0.3)`
- `state.overlay.hover`: `rgba(255,255,255,0.08)`
- `state.overlay.pressed`: `rgba(255,255,255,0.15)`

Full dark mode strategy: override all layer-2 semantic tokens. Primitives stay unchanged.

```css
[data-theme="dark"] {
  --dls-color-surface-base: var(--dls-color-neutral-900);
  --dls-color-text-primary: var(--dls-color-neutral-0);
  --dls-color-border-base: var(--dls-color-neutral-700);
  /* ... all layer-2 overrides */
}
```

## Brand Override

Override layer-1 primary scale. All layer-2/4 references update automatically via `var()`.

```css
[data-brand="acme"] {
  --dls-color-primary-50: #F0FDF4;
  --dls-color-primary-700: #15803D;
  /* ... full 50–950 scale */
}
```

## Anti-Patterns

- `✗` Theme via class: `.dark-mode .dls-button { background: #333; }`
- `✗` Override primitives for one component: `.dls-card { --dls-color-neutral-50: #111; }`
- `✗` Inline hardcoded: `style="background: #F9F5FF"`
- `✓` Use semantic tokens — they auto-switch with theme
