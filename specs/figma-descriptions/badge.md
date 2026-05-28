# Badge

Category: status / metadata
React: <Badge>
Spec: specs/components/badge.md
TSX: apps/storybook/src/stories/Badge.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-badge--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=45-1503

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma may show hover/pressed as opacity overlays. Badge is
informational and does not define interactive hover, pressed, focus,
or disabled states.

This component uses: NO INTERACTIVE STATE IMPLEMENTATION.
Visual variation is controlled only by variant, intent, and size data
attributes.
--------------------------------------------

## Purpose
Compact informational label for status, counts, categorical metadata,
and short passive labels.

## Use when
- Showing compact status such as Active, Pending, or Failed.
- Labelling a category, plan, object type, or small metadata value.
- Pairing a short label with an optional decorative icon.
- Showing a ghost dot plus text for lightweight status.
- Showing color-coded ghost status without a dot in dense tables where
  text color is the status signal.

## Do NOT use for
- Actions or toggles -> use Button, ChipRegular, or FilterChip.
- Editable filters -> use FilterChip or DropdownFilters.
- Notification counts -> use BadgeNumber.
- Dot-only status -> use BadgeIndicator.
- Long body text or sentence-level messages -> use Text or Alert.

## Figma -> Code mapping
| Figma property | React prop | Values |
|---|---|---|
| size | size | M -> m, S -> s, XS -> xs |
| type | variant | outline, soft, filled, ghost |
| intent | intent | neutral, info, success, warning, danger |
| text | children | string / ReactNode label |
| iconLeft | iconStart | false -> undefined, true -> ReactNode |
| iconRight | iconEnd | false -> undefined, true -> ReactNode |
| dot | dot | false / true. Only applies when variant="ghost"; default true. |

Notes:
- `type` in Figma is the React `variant` prop, not intent.
- Size values are uppercase in Figma and lowercase in React.
- Icons in React should come from lucide-react and are treated as
  decorative. The visible badge text must carry the accessible meaning.
- Use `dot={false}` for ghost badges in table cells or other dense
  metadata areas where the colored status text should stand alone.

## Anatomy
1. Root badge container — <span class="dls-badge">.
2. Optional ghost dot — rendered only for variant="ghost".
3. Optional leading icon slot — iconStart.
4. Label text — children.
5. Optional trailing icon slot — iconEnd.

## Props / API
- variant  BadgeVariant, optional. Default: outline.
  Values: outline, soft, filled, ghost.
- intent   BadgeIntent, optional. Default: neutral.
  Values: neutral, info, success, warning, danger.
- size     BadgeSize, optional. Default: m.
  Values: m, s, xs.
- dot      boolean, optional. Default: true.
  Controls the decorative ghost status dot. Only applies when
  variant="ghost".
- iconStart ReactNode, optional. Leading decorative icon slot.
- iconEnd   ReactNode, optional. Trailing decorative icon slot.
- children  ReactNode, required. Visible badge label.
- className string, optional. Additional root class.

## Tokens used (L4 first, then L2/L3 as needed)
- --dls-color-component-badge-neutral-bg
- --dls-color-component-badge-neutral-fg
- --dls-color-component-badge-neutral-border
- --dls-color-component-badge-info-bg
- --dls-color-component-badge-info-fg
- --dls-color-component-badge-info-border
- --dls-color-component-badge-success-bg
- --dls-color-component-badge-success-fg
- --dls-color-component-badge-success-border
- --dls-color-component-badge-warning-bg
- --dls-color-component-badge-warning-fg
- --dls-color-component-badge-warning-border
- --dls-color-component-badge-danger-bg
- --dls-color-component-badge-danger-fg
- --dls-color-component-badge-danger-border
- --dls-color-intent-neutral-base
- --dls-color-intent-neutral-on-base
- --dls-color-intent-info-base
- --dls-color-intent-info-on-base
- --dls-color-intent-success-base
- --dls-color-intent-success-on-base
- --dls-color-intent-warning-base
- --dls-color-intent-warning-on-base
- --dls-color-intent-danger-base
- --dls-color-intent-danger-on-base
- --dls-color-border-base
- --dls-font-family
- --dls-font-weight-medium
- --dls-radius-component-badge
- --dls-spacing-0-5
- --dls-spacing-1
- --dls-spacing-1-5
- --dls-spacing-2
- --dls-text-m-font-size
- --dls-text-m-line-height
- --dls-text-s-font-size
- --dls-text-s-line-height
- --dls-text-xs-font-size
- --dls-text-xs-line-height

Lookup order: L4 component -> L2 semantic/intent -> primitives only
through token aliases. Do not reference raw hex or primitive color
scales in component CSS.

## States

### Figma representation
Figma represents a matrix of variant, intent, and size symbols. The
canonical regular set is node 45:1503.

### Code implementation
Badge exposes:
- data-variant="outline | soft | filled | ghost"
- data-intent="neutral | info | success | warning | danger"
- data-size="m | s | xs"
Ghost badges also expose the `dot` prop in React. When `dot={false}`,
the ghost dot is not rendered.

No hover, active, disabled, selected, or focus states are defined
because Badge is not interactive.

### Per-variant behavior
- outline -> transparent surface, intent text color, 1px border.
  Neutral outline uses --dls-color-border-base.
- soft -> intent subtle background, intent text, intent border.
- filled -> intent base background, intent on-base text.
- ghost -> transparent surface, no padding, text with optional dot.

## Accessibility contract
- Root is a <span>; Badge is passive and not keyboard focusable.
- Badge must not replace a button, link, or filter trigger.
- Visible text must provide the accessible meaning.
- Decorative dot and icon slots use aria-hidden="true".
- Dynamic status updates should be announced by the consuming surface
  with aria-live="polite" when needed.
- Consumers may pass standard span attributes such as aria-label,
  title, or aria-live when context requires them.

## Composition rules
- Keep label copy short, typically one to three words.
- Do not place interactive controls inside Badge.
- Use Badge inside Card, TableCell, ListItem, Item, TopBar, and other
  metadata regions.
- In tables, prefer `variant="ghost"` with `dot={false}` when the
  column is already titled Status or when a repeated dot creates visual
  clutter.
- Use BadgeNumber for compact numeric counters.
- Use BadgeIndicator for dot-only status.
- Use ChipRegular or FilterChip when the pill is interactive.

## Known deviations from system rules
None.

## Code example
```tsx
<Badge variant="soft" intent="success" size="s">
  Active
</Badge>
```

```tsx
<Badge variant="ghost" intent="info" size="xs" iconStart={<Check />}>
  Synced
</Badge>
```

```tsx
<Badge variant="ghost" intent="warning" size="s" dot={false}>
  Pending
</Badge>
```

## Cross-references
- specs/components/badge.md
- specs/components/filter-chip.md
- specs/components/chip-regular.md
- specs/components/table-cell.md
- specs/components/card.md
- specs/foundations/accessibility.md
- specs/tokens/token-reference.md
