# Button / button-filled

Category: action
Figma component set: button-filled
React: <Button variant="filled">
Spec: specs/components/button.md
TSX: apps/storybook/src/stories/Button.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-button--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=46-1829

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a
SIMULATION of the code behavior, not always the implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  -> OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like Accordion, ListItem, MenuItem)
  -> overlay tokens.

This component uses: HYBRID.
- filled and soft -> OKLCH L-shift
- outline, dotted, ghost, link -> overlay tokens

For this Figma component set (`button-filled`), the code
variant is fixed to `variant="filled"`, so hover/pressed use
OKLCH L-shift in code.

See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
Primary direct action control for CTAs, row actions, toolbar
actions, modal actions, and compact inline actions. The filled
variant is the primary-action treatment, regardless of intent.

## Use when
- Triggering an immediate user action.
- Submitting, saving, deleting, confirming, or opening a workflow.
- The action is the primary action in its row, group, dialog footer,
  or toolbar.
- Pairing with an outline secondary action, such as
  `Do something` + `Cancel`.
- Showing a compact action with optional leading or trailing icon.
- Displaying icon-only actions when the button has an accessible name.

## Do NOT use for
- Secondary actions in a primary/secondary row -> use outline.
- Rows where another filled button already represents the primary
  action. Do not create filled + filled action pairs.
- Rows where both actions have equal hierarchy but one action is
  clearly primary and the other is secondary; express the hierarchy
  with filled + outline.
- Passive status, labels, or tags -> use Badge or text label.
- Navigation lists -> use SidebarItem, Tabs, Breadcrumbs, or links.
- Form fields -> use InputField, ButtonInputGroup, or related form components.
- Menu rows -> use ListItem inside the relevant dropdown/menu component.

## Figma -> Code mapping
| Figma property | React prop | Values |
|----------------|------------|--------|
| size | size | M -> m, S -> s |
| type | intent | neutral / primary / info / success / warning / danger |
| state | (native CSS) | normal / hover / focus / pressed |
| disabled | disabled | false / true |
| icon-left | icon | false -> omitted, true -> ReactNode |
| change-left | icon | icon instance, default Plus |
| icon-right | iconEnd | false -> omitted, true -> ReactNode |
| change-right | iconEnd | icon instance, default ChevronDown |
| text | children | string / ReactNode |
| component set | variant | fixed: filled |

Notes:
- `state` in Figma is visual only. In code, states come from
  native pseudo-classes and the disabled attribute.
- `type` is the Figma name for React `intent`. Keep values the
  same, but map the prop name during implementation.
- `icon-left` and `icon-right` are visibility toggles. `change-*`
  selects the actual nested icon instance.
- This Figma component set covers filled buttons only. Other
  React variants should be separate Figma component sets or
  explicitly mapped before manifest generation.
- Icon-only buttons must set an accessible name on the button
  with `aria-label` or `aria-labelledby`.
- Icons come from lucide-react and inherit size/color from the
  Button slot; do not draw custom SVGs in the component.

## Anatomy
1. Root button — native <button>, inline-flex.
2. Leading icon slot — optional, lucide-react icon.
3. Label content — hidden only when iconOnly=true.
4. Trailing icon slot — optional, lucide-react icon.

## Props / API
- variant  optional. Default: filled.
- intent   optional. Default: neutral.
- size     optional. Default: m.
- icon     optional. ReactNode leading icon.
- iconEnd  optional. ReactNode trailing icon.
- iconOnly optional. Default: false. Requires accessible name.
- children optional. Visible label unless iconOnly=true.
- disabled and other standard button HTML attributes.

## Tokens used
- --dls-radius-component-button
- --dls-color-intent-*
- --dls-state-l-delta-hover
- --dls-state-l-delta-pressed
- --dls-state-hover-overlay
- --dls-state-pressed-overlay
- --dls-state-focus-ring-color
- --dls-color-surface-disabled
- --dls-color-text-disabled
- --dls-color-border-disabled
- --dls-spacing-*
- --dls-text-*

Lookup order: L4 component -> L2 semantic -> L3 state.
Never reference L1 primitive colors or radii in component CSS.

## States

### Figma representation
Figma may use overlay layers for hover and pressed states. This
is only a tooling-compatible representation.

### Code implementation
- filled -> background and border shift with OKLCH L-delta tokens.
- soft -> background shifts with OKLCH L-delta tokens.
- outline / dotted / ghost / link -> overlay tokens.
- focus-visible -> box-shadow ring with focus-ring color.
- disabled -> disabled semantic colors and native disabled attribute.

### Per-state behavior
- normal -> variant, intent, and size define the visual surface.
- hover -> :hover:not(:disabled).
- pressed -> :active:not(:disabled).
- focus-visible -> box-shadow focus ring. Never plain :focus.
- disabled -> native [disabled], not aria-disabled alone.

## Accessibility contract
- Root MUST be a native <button>.
- Button text provides the accessible name for normal buttons.
- Icon-only buttons MUST provide aria-label or aria-labelledby.
- Decorative icons inside the button should be hidden from AT by
  their icon component or slot treatment.
- Keyboard: Enter and Space activate the native button.
- Focus: visible focus ring via :focus-visible and DLS tokens.
- prefers-reduced-motion disables Button transitions.

## Composition rules
- Label copy should be concise and action-oriented.
- In a primary/secondary action row, use one filled Button for the
  primary action and one outline Button for the secondary action.
- Do not pair filled + filled or outline + outline when one action is
  primary and the other is secondary.
- Intent communicates semantic meaning; variant communicates hierarchy.
- Do not place interactive descendants inside Button.
- Do not use iconOnly without an accessible name.
- Do not pass inline size or color to lucide icons; the slot owns
  icon dimensions and color.
- Use ButtonGroup when buttons form a segmented set.
- Use ButtonInputGroup when an input and button are coupled.

## Known deviations from system rules
Known Figma/code naming deviations:
- Figma property `type` maps to React prop `intent`.
- Figma properties `icon-left` / `icon-right` map to whether
  `icon` / `iconEnd` are provided.
- Figma properties `change-left` / `change-right` map to the
  actual icon slots, not standalone React props.
- Figma `state` maps to native CSS states, not a React prop.

Resolved code deviations after Phase 2 cleanup:
- prefers-reduced-motion media query added.
- Storybook icon-only examples now include accessible names.

## Code example
<div role="group" aria-label="Form actions">
  <Button variant="filled" intent="primary" size="m">
    Save
  </Button>
  <Button variant="outline" intent="neutral" size="m">
    Cancel
  </Button>
</div>

<Button
  variant="ghost"
  intent="neutral"
  size="s"
  icon={<SettingsIcon />}
  iconOnly
  aria-label="Settings"
/>

## Cross-references
- specs/foundations/motion.md
- specs/foundations/accessibility.md
- specs/tokens/motion-tokens.md
- specs/patterns/component-selection.md
- specs/components/button-group.md
- specs/components/button-input-group.md
- specs/components/badge.md
- specs/components/chip.md
