# Toolbar

Category: navigation / editor controls
React: <Toolbar> + <ToolbarGroup>
Spec: specs/components/toolbar.md
TSX: apps/storybook/src/stories/toolbar/Toolbar.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-toolbar--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=94-10637

--------------------------------------------
## State implementation contract (applies to all DLS components)

Figma shows hover/pressed as opacity overlays — this is a
SIMULATION of the code behavior, not the implementation.

In code, pick the mechanism by surface type:
- Base fill present (filled, soft, any tinted bg)
  → OKLCH L-shift: oklch(from <base> calc(l + <delta>) c h)
- Transparent surface (outline, dotted, ghost, link, or
  ghost-surface components like Accordion, ListItem, MenuItem)
  → overlay tokens.

This component uses: NONE on the Toolbar root (static surface).
Interactive states live on the Ghost Buttons inside, which use
overlay tokens (transparent surface).
See: specs/foundations/motion.md, specs/tokens/motion-tokens.md.
--------------------------------------------

## Purpose
Horizontal row of action controls for text formatting, editor
operations, and grouped contextual actions. Supports two surface
treatments — a floating panel (rounded, shadowed, used in popovers
and floating selection toolbars) and a sticky/embedded mode (flat,
no radius/shadow, anchored to a parent like MessageComposer or
sticky page header).

## Use when
- Text formatting controls in a rich-text editor (bold, italic,
  underline, alignment, lists, link).
- Floating toolbar that appears after a text selection.
- Editor / canvas toolbar similar to Miro (movable, sticky, or
  floating).
- Grouped icon-button actions that share a single labeled surface.

## Do NOT use for
- Page-level primary navigation → use `Sidebar` or `TopBar`.
- Tab switching → use `Tabs`.
- A single action → use `Button` directly.
- Dropdown menus → use `Dropdown` (a Toolbar may *contain* a
  trigger that opens a Dropdown for overflow actions).

## Figma → Code mapping

| Figma property | React prop  | Values                       |
|----------------|-------------|------------------------------|
| sticky         | sticky      | false (default) / true       |
| (slot)         | children    | ReactNode (Button / Separator / ToolbarGroup) |
| —              | className   | string                       |

`ToolbarGroup` is a code-only helper that has no separate Figma
component. In Figma, button clusters between separators read as
inline `button-button` (Button Group) instances; in code those
become `<ToolbarGroup>` wrappers.

## Anatomy

- Root — `.dls-toolbar` (`role="toolbar"`, `aria-label`)
  - Sticky variant — `[data-sticky]` attribute
- Children (composition):
  - Ghost icon-only `Button`s (formatting actions)
  - `ToolbarGroup` — cluster of buttons without inter-button gap
  - `Separator` (orientation="vertical")
- Active button state — `[data-active]` + `aria-pressed="true"`
  on child Buttons; toolbar applies a subtle background.

## Props / API

```ts
export interface ToolbarProps {
  sticky?: boolean;       // default false
  children: React.ReactNode;
  className?: string;
}

export interface ToolbarGroupProps {
  children: React.ReactNode;
}
```

## Tokens used

- `--dls-color-surface-base` (background)
- `--dls-color-border-subtle` (default border)
- `--dls-color-border-base` (sticky bottom border + separator)
- `--dls-radius-component-input-toolbar`
- `--dls-shadow-surface-sm`
- `--dls-color-intent-neutral-subtle` (active button background)
- `--dls-spacing-1` (gap + padding)
- `--dls-font-family`

## States

| State    | Figma representation       | Code implementation         |
|----------|----------------------------|-----------------------------|
| default  | Variant `sticky=false`     | Floating: rounded + shadow  |
| sticky   | Variant `sticky=true`      | Flat: no radius, bottom-border only, no shadow |
| active   | (instance override on button child) | `data-active` + `aria-pressed="true"` on the child Button → toolbar paints a subtle background |

No spatial motion on the Toolbar itself, so no
`prefers-reduced-motion` guard is required at this layer.
Color transitions on child Buttons live in the Button component.

## Accessibility contract

- Root is `<div role="toolbar">` with `aria-label="Formatting toolbar"`
  (consumers should override the label when the toolbar's purpose
  differs).
- Child buttons are native `<button>` (via DLS Button) — keyboard
  focus follows natural tab order.
- Icon-only buttons require `aria-label` (passed through to the
  child Button).
- Toggle buttons use `aria-pressed="true|false"` on the child
  Button, paired with `data-active` for the visual state.
- The vertical Separator is decorative inside the toolbar; the
  Separator component sets `role="separator"` and
  `aria-orientation="vertical"`.

## Composition rules

- Children must be one of: `Button` (ghost variant strongly preferred),
  `ToolbarGroup`, `Separator`.
- Use `ToolbarGroup` to cluster related buttons without gaps
  (e.g. alignment trio, list trio).
- Use `Separator` between groups for visual breathing room.
- Do not nest Toolbar inside Toolbar.
- The overflow action ("more") should be the final child, with its
  associated menu opened via a `Dropdown` outside the toolbar tree.

## Known deviations

- Active-button background uses the L2 token
  `--dls-color-intent-neutral-subtle` directly. A dedicated L4
  token (e.g. `--dls-color-component-toolbar-button-bg-active`)
  would be preferable. Deferred until a Toolbar token group is
  added to `tokens.json`.

(Inline SVG icons in stories were migrated to `lucide-react` in
this rollout.)

## Code example

```tsx
import { Toolbar, ToolbarGroup } from './toolbar/Toolbar';
import { Button } from './Button';
import { Separator } from './separator/Separator';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  Link2 as LinkIcon,
  Ellipsis as MoreIcon,
} from 'lucide-react';

<Toolbar>
  <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<BoldIcon />} aria-label="Bold" aria-pressed={isBold} data-active={isBold ? '' : undefined} />
  <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<ItalicIcon />} aria-label="Italic" />
  <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<UnderlineIcon />} aria-label="Underline" />
  <Separator orientation="vertical" />
  <ToolbarGroup>
    <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignLeftIcon />} aria-label="Align left" />
    <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignCenterIcon />} aria-label="Align center" />
    <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<AlignRightIcon />} aria-label="Align right" />
  </ToolbarGroup>
  <Separator orientation="vertical" />
  <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<LinkIcon />} aria-label="Link" />
  <Separator orientation="vertical" />
  <Button variant="ghost" intent="neutral" size="m" iconOnly icon={<MoreIcon />} aria-label="More" />
</Toolbar>
```

## Cross-references

- [button.md](../components/button.md)
- [separator.md](../components/separator.md)
- [message-composer.md](../components/message-composer.md)
- [dropdown.md](../components/dropdown.md)
- [../foundations/accessibility.md](../foundations/accessibility.md)
- [../foundations/motion.md](../foundations/motion.md)
