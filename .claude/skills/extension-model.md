# Extension Model

How to extend the design system: new intents, scales, shadows, and governance rules.

## Adding a New Intent

1. Add primitive color scale (50–950) to `color.{intent-name}` in `tokens.json`
2. Add semantic intent group `color.intent.{intent-name}` with all 6 props: `base`, `on-base`, `subtle`, `strong`, `text`, `border`
3. Add `data-intent="{intent-name}"` support to all intent-aware components
4. Regenerate outputs

## Adding a New Color Scale

1. Add 4-stop (100/300/500/700) or 11-stop (50–950) under `color.additional.{name}`
2. If used for intent, follow "Adding a New Intent" above
3. Regenerate

## Adding a New Shadow

1. Raw shadow → `shadow.raw.{name}` in tokens.json
2. Semantic reference → `shadow.surface.{name}`
3. Components reference `shadow.surface.*`, never `shadow.raw.*`

## Token Lifecycle

`PROPOSED → EXPERIMENTAL → STABLE → DEPRECATED → REMOVED`

- Experimental: `$description` contains `[experimental]`
- Deprecated: `$description` contains `[deprecated: use {replacement}]`, must remain 2 minor versions
- Removed: major version bump required

## Versioning

- Patch: value adjustments within existing tokens
- Minor: new tokens/components/intents (no removals)
- Major: removed or renamed tokens, structural changes

## Modification Rules

| Allowed | Forbidden |
|---------|-----------|
| Override L4 per-brand | Override L1 for a single component |
| Add new component tokens | Create L4 that skips L2 semantics |
| Adjust L1 values (global effect) | Adjust L1 expecting local effect |
| Dark-mode overrides on L2 | Dark-mode logic inside component CSS |
