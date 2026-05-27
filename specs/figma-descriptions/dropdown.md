# Dropdown

Category: input / selection
React: <Dropdown>
Spec: specs/components/dropdown.md
TSX: apps/storybook/src/stories/dropdown/Dropdown.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dropdown--docs

--------------------------------------------
## State implementation contract

Dropdown trigger hover changes border color only — no background
OKLCH shift or overlay on the main surface. ListItem rows within
the listbox use their own hover treatment. Keyboard highlight on
list items uses the state hover overlay.

- Hover: border → `--dls-color-component-input-border-hover`
- Focus-visible / Open: border → `--dls-color-component-input-border-focus`,
  ring → `--dls-state-focus-ring-color`
- Error: bg → `--dls-color-intent-danger-subtle`,
  border → `--dls-color-intent-danger-border`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
Select field with a bordered trigger, chevron indicator, and a
listbox of ListItem rows. Supports optional leading icon or
avatar per option, label, hint, and error feedback.

## Use when
- Choosing from a predefined list of options.
- Select fields with icon or avatar leading content.
- Form fields requiring single-value selection with label
  and validation.

## Do NOT use for
- Searchable/filterable selection -> use DropdownAutocomplete.
- Multi-select -> use a dedicated multi-select component.
- Action menus -> use ContextMenu.
- Navigation -> use Tabs or Sidebar.

## Figma -> Code mapping
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| state            | (none)           | Visual-only. In code: CSS :hover, :focus-visible, :disabled, data-error, data-open. |
| type             | (none)           | Figma type (text/avatar/icon) controls leading content. In code, determined by option.icon, option.avatarSrc/avatarInitials, or leadingIcon prop. |
| text             | value            | Figma text -> selected item label. In code, resolved from options array by matching value prop. |
| placeholder      | placeholder      | Direct mapping. Default "Select" in both. |
| error            | error            | Figma boolean. In code, error is a string — truthy = error state + message. |
| errorText        | error            | Figma error text -> React error string prop value. |
| clear            | (none)           | Figma boolean toggles clear button. Dropdown in code does not support clearable — only DropdownAutocomplete has clear. |
| chevronDown      | (none)           | Figma boolean toggles chevron. In code, chevron is always rendered. |
| change           | leadingIcon      | Figma icon swap slot -> leadingIcon prop or option.icon. |
| (none)           | label            | Code-only. Optional label above trigger. |
| (none)           | hint             | Code-only. Optional hint text below trigger. |
| (none)           | options          | Code-only. Array of { value, label, icon?, avatarSrc?, avatarInitials? }. |
| (none)           | onChange         | Code-only. Callback when selection changes. |

Notes:
- Figma uses a single "dropdown+autocomplete" component set for
  both Dropdown and DropdownAutocomplete. They are visually
  identical; the difference is behavioral (type-to-filter vs
  click-to-select). In code, they are separate components.
- Figma component does not include label, hint, or listbox rows.
  In code, Dropdown renders label, trigger, listbox, and
  hint/error as a single component.

## Anatomy
1. Root wrapper — <div class="dls-dropdown">, vertical stack:
   label -> trigger -> listbox -> hint/error. Position relative
   for listbox absolute positioning.
2. Label — <label class="dls-dropdown__label">, optional,
   associated via htmlFor.
3. Trigger — <button class="dls-dropdown__trigger">, bordered
   container with leading content + value text + chevron.
   Has aria-haspopup="listbox", aria-expanded, aria-controls.
4. Leading content — optional avatar (Avatar component) or icon
   from option data or leadingIcon prop.
5. Value text — <span class="dls-dropdown__value">, shows
   selected label or placeholder.
6. Chevron — <span class="dls-dropdown__chevron">, rotates
   180° when open. aria-hidden="true".
7. Listbox — <div role="listbox" class="dls-dropdown__listbox">,
   positioned absolutely below trigger, uses dropdown L4 tokens
   for bg/border/radius. Shadow from --dls-shadow-overlay.
8. Options — ListItem components with role="option",
   aria-selected. Keyboard highlight via data-highlighted.
9. Hint/Error row — shows error with TriangleAlert icon or hint.

## Props / API
- options       DropdownOption[], required. Array of
                { value, label, icon?, avatarSrc?,
                avatarInitials? }.
- value         string, optional. Currently selected value.
- onChange      (value: string) => void, optional. Callback
                when selection changes.
- placeholder   string, optional, default "Select".
- label         string, optional. Label text above trigger.
- hint          string, optional. Hint text below trigger.
- error         string, optional. Error message — puts field
                in error state.
- leadingIcon   React.ReactNode, optional. Leading icon for
                trigger when no value selected.
- disabled      boolean, optional, default false.
- className     string, optional. Layout composition only.
- id            string, optional. ID for trigger button.
                Auto-generated if not provided.
- Ref forwarded to root <div> wrapper.

## Tokens used
L4 component tokens (trigger — shared with InputField):
- --dls-color-component-input-bg-base
- --dls-color-component-input-bg-disabled
- --dls-color-component-input-fg-base
- --dls-color-component-input-fg-placeholder
- --dls-color-component-input-fg-disabled
- --dls-color-component-input-border-base
- --dls-color-component-input-border-hover
- --dls-color-component-input-border-focus
- --dls-color-component-input-border-disabled
- --dls-radius-component-input

L4 component tokens (listbox — dropdown-specific):
- --dls-color-component-dropdown-bg
- --dls-color-component-dropdown-border
- --dls-radius-component-dropdown

L2/L3 semantic tokens also used:
- --dls-state-focus-ring-color (focus ring on trigger)
- --dls-state-hover-overlay (keyboard highlight on list items)
- --dls-shadow-overlay (listbox shadow)
- --dls-color-intent-danger-subtle (error bg)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-secondary (label, hint, chevron, leading icon)
- --dls-color-text-primary (value text)
- --dls-color-text-disabled (disabled label, value, chevron)

## States

### Figma representation
state property with values: normal, filled, focused, error,
disabled. No hover state in Figma.

### Code implementation
- :hover:not(:disabled):not([data-error]) — border color
  shifts to hover token.
- :focus-visible / [data-open] — border shifts to focus,
  ring via box-shadow. Listbox becomes visible.
- [data-error] — danger intent bg + border. Trigger gets
  aria-invalid="true".
- :disabled — disabled bg + border, cursor not-allowed.
  Chevron and value use disabled text color.
- Transitions: border-color, box-shadow, background-color
  150ms ease on trigger. Transform 150ms ease on chevron.
  Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Trigger is a native <button> with aria-haspopup="listbox".
- Label is associated via htmlFor / id.
- Hint and error text connected via aria-describedby.
- Error state sets aria-invalid="true" on the trigger.
- Listbox has role="listbox" with aria-label.
- Each option has role="option" with aria-selected.
- Chevron icon marked aria-hidden="true" (decorative).
- Error icon (TriangleAlert) marked aria-hidden="true".
- Keyboard: ArrowDown/ArrowUp to navigate, Enter to select,
  Escape to close.
- Focus-visible on trigger uses box-shadow ring.
- Respects prefers-reduced-motion.

## Composition rules
- Dropdown renders ListItem rows as options. Each row is
  a <ListItem type="with-slots">.
- For form grouping, wrap in FormField or standard form
  patterns.
- Do not nest Dropdown inside another Dropdown.

## Known deviations
- Figma uses a single "dropdown+autocomplete" component set
  for both Dropdown and DropdownAutocomplete. In code, they
  are separate components. Severity: low.
- Figma component does not include label, hint, or listbox
  rows. In code, Dropdown renders all sections as a single
  component. Severity: low.
- Figma "clear" property exists on shared component set. In
  code, Dropdown does not support clearable — only
  DropdownAutocomplete has clear. Severity: low.

## Code example
<Dropdown
  label="Owner"
  hint="Choose the project owner."
  placeholder="Select"
  options={[
    { value: 'nadia', label: 'Nadiia Abrosimova', avatarInitials: 'NA' },
    { value: 'team', label: 'Design team' },
  ]}
  value={owner}
  onChange={setOwner}
/>

## Cross-references
- DropdownAutocomplete (searchable select)
- InputField (shares input tokens)
- ListItem (option rows)
- FormField (form grouping)
- specs/components/dropdown.md
