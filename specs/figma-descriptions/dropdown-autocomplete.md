# DropdownAutocomplete

Category: form input / selection
React: <DropdownAutocomplete>
Spec: specs/components/dropdown-autocomplete.md
TSX: apps/storybook/src/stories/dropdown-autocomplete/DropdownAutocomplete.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dropdownautocomplete--docs

--------------------------------------------
## State implementation contract

DropdownAutocomplete trigger hover changes border color only —
no background OKLCH shift or overlay on the main surface. Same
input-family token-swap pattern as Dropdown.

- Hover: border → `--dls-color-component-input-border-hover`
- Focus-within / Open: border → `--dls-color-component-input-border-focus`,
  ring → `--dls-state-focus-ring-color`
- Error: bg → `--dls-color-intent-danger-subtle`,
  border → `--dls-color-intent-danger-border`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
Searchable select with type-to-filter input, clear button,
chevron indicator, and a listbox of ListItem rows. Combobox
pattern supporting leading icons/avatars, label, hint, and
error feedback.

## Use when
- Searchable selection from a list of options.
- Type-to-filter with icon or avatar option rows.
- Form fields requiring filtered single-value selection with
  label and validation.

## Do NOT use for
- Simple select without filtering -> use Dropdown.
- Multi-select -> use a dedicated multi-select component.
- Free-form text input -> use InputField.
- Command palette -> use a dedicated command component.

## Figma -> Code mapping
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| state            | (none)           | Visual-only. In code: CSS pseudo-classes and data attributes (data-error, data-disabled, data-open). |
| type             | (none)           | Figma type (text/avatar/icon) controls leading content. In code, determined by option.icon, option.avatarSrc/avatarInitials, or leadingIcon prop. |
| text             | value            | Figma text -> selected item label. In code, resolved from options by matching value. When open, input shows search text. |
| placeholder      | placeholder      | Direct mapping. Default "Select" in both. |
| error            | error            | Figma boolean. In code, error is a string — truthy = error state + message. |
| errorText        | error            | Figma error text -> React error string prop value. |
| clear            | (none)           | Figma boolean toggles clear button. In code, clear shows automatically when selected or searching (not disabled). |
| chevronDown      | (none)           | Figma boolean toggles chevron. In code, chevron is always rendered. |
| change           | leadingIcon      | Figma icon swap slot -> leadingIcon prop or option.icon. |
| (none)           | label            | Code-only. Optional label above trigger. |
| (none)           | hint             | Code-only. Optional hint text below trigger. |
| (none)           | options          | Code-only. Array of { value, label, icon?, avatarSrc?, avatarInitials? }. |
| (none)           | onChange         | Code-only. Callback receiving value or undefined when cleared. |

Notes:
- Figma uses a single "dropdown+autocomplete" component set
  for both Dropdown and DropdownAutocomplete. They are visually
  identical; the difference is behavioral. In code, they are
  separate components.
- Figma component does not include label, hint, or listbox rows.

## Anatomy
1. Root wrapper — <div class="dls-dropdown-autocomplete">,
   vertical stack: label -> trigger -> listbox -> hint/error.
   Position relative for listbox positioning.
2. Label — <label class="dls-dropdown-autocomplete__label">,
   optional, associated via htmlFor.
3. Trigger — <div class="dls-dropdown-autocomplete__trigger">,
   bordered container wrapping input + clear + chevron.
   Uses data-disabled, data-error, data-has-leading.
4. Leading content — optional avatar or icon from option data
   or leadingIcon prop.
5. Input — <input type="text" role="combobox">, drives
   type-to-filter. Shows selected label when closed, search
   text when open.
6. Clear button — <button class="dls-dropdown-autocomplete__clear">,
   shows when value selected or search text entered (not
   disabled). Has aria-label="Clear selection".
7. Chevron — <span class="dls-dropdown-autocomplete__chevron">,
   rotates 180° when open. aria-hidden="true".
8. Listbox — <div role="listbox">, positioned absolutely
   below trigger, uses dropdown L4 tokens.
9. Options — ListItem components with role="option",
   aria-selected. Keyboard highlight via data-highlighted.
10. Hint/Error row — shows error with TriangleAlert icon or
    hint text.

## Props / API
- options       DropdownAutocompleteOption[], required. Array
                of { value, label, icon?, avatarSrc?,
                avatarInitials? }.
- value         string, optional. Currently selected value.
- onChange      (value: string | undefined) => void, optional.
                Callback when selection changes. Receives
                undefined when cleared.
- placeholder   string, optional, default "Select".
- label         string, optional. Label text above trigger.
- hint          string, optional. Hint text below trigger.
- error         string, optional. Error message — puts field
                in error state.
- leadingIcon   React.ReactNode, optional. Leading icon for
                trigger when no value selected.
- disabled      boolean, optional, default false.
- className     string, optional. Layout composition only.
- id            string, optional. ID for the input element.
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
- --dls-state-focus-ring-color (focus ring on trigger, clear)
- --dls-state-hover-overlay (keyboard highlight on list items)
- --dls-shadow-overlay (listbox shadow)
- --dls-color-intent-danger-subtle (error bg)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-secondary (label, hint, chevron, leading
  icon, clear)
- --dls-color-text-primary (value text, clear hover)
- --dls-color-text-disabled (disabled label, input, chevron)

## States

### Figma representation
state property with values: normal, filled, focused, error,
disabled. No hover state in Figma.

### Code implementation
- :hover:not([data-disabled]):not([data-error]) — border
  color shifts to hover token.
- :focus-within / [data-open] — border shifts to focus,
  ring via box-shadow. Listbox becomes visible.
- [data-error] — danger intent bg + border. Input gets
  aria-invalid="true".
- [data-disabled] — disabled bg + border, cursor not-allowed.
  Input and icons use disabled text color.
- Transitions: border-color, box-shadow, background-color
  150ms ease on trigger. Transform 150ms ease on chevron.
  Guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Input uses role="combobox" with aria-autocomplete="list".
- Label is associated via htmlFor / id.
- Hint and error text connected via aria-describedby.
- Error state sets aria-invalid="true" on the input.
- Listbox has role="listbox" with aria-label.
- Each option has role="option" with aria-selected.
- Clear button has aria-label="Clear selection".
- Chevron icon marked aria-hidden="true" (decorative).
- Error icon (TriangleAlert) marked aria-hidden="true".
- Keyboard: ArrowDown/ArrowUp to navigate, Enter to select,
  Escape to close and clear search. Typing filters options.
- Focus-visible on clear button uses box-shadow ring.
- Respects prefers-reduced-motion.

## Composition rules
- DropdownAutocomplete renders ListItem rows as options.
  Each row is a <ListItem type="with-slots">.
- For form grouping, wrap in FormField or standard form
  patterns.
- Do not nest DropdownAutocomplete inside another dropdown.

## Known deviations
- Figma uses a single "dropdown+autocomplete" component set
  for both Dropdown and DropdownAutocomplete. In code, they
  are separate components. Severity: low.
- Figma component does not include label, hint, or listbox
  rows. In code, DropdownAutocomplete renders all sections
  as a single component. Severity: low.

## Code example
<DropdownAutocomplete
  label="Assignee"
  hint="Start typing to filter."
  placeholder="Search..."
  options={[
    { value: 'nadia', label: 'Nadiia Abrosimova', avatarInitials: 'NA' },
    { value: 'bob', label: 'Bob Smith', avatarInitials: 'BS' },
  ]}
  value={assignee}
  onChange={setAssignee}
/>

## Cross-references
- Dropdown (non-searchable select)
- InputField (shares input tokens)
- ListItem (option rows)
- FormField (form grouping)
- specs/components/dropdown-autocomplete.md
