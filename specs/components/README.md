---
name: Component Specs Index
category: components
status: active
read_when:
  - choosing_component
  - editing_component
---

# Component Specs Index

These files document the DLS components that agents should reach for first. Storybook remains the source of truth for exact props, variants, examples, and states.

## Actions

| Need | Spec |
|---|---|
| Direct action | [button.md](button.md) |
| Segmented button set | [button-group.md](button-group.md) |
| Input with attached button | [button-input-group.md](button-input-group.md) |

## Data Display

| Need | Spec |
|---|---|
| Status or metadata pill | [badge.md](badge.md) |
| Read-only tag / label | [chip.md](chip.md) |
| Interactive tag | [chip-regular.md](chip-regular.md) |
| User / entity image | [avatar.md](avatar.md) |
| Overlapping user group | [avatar-stack.md](avatar-stack.md) |
| Semantic icon badge | [icon-shape.md](icon-shape.md) |
| Standalone check indicator | [checkmark.md](checkmark.md) |
| Keyboard key display | [kbd.md](kbd.md) |
| Typographic primitive | [text.md](text.md) |

## Form Controls

| Need | Spec |
|---|---|
| Single-line text input | [input-field.md](input-field.md) |
| Text input with slots | [slot-input.md](slot-input.md) |
| Multi-line text input | [textarea.md](textarea.md) |
| Search input | [search-field.md](search-field.md) |
| Phone number input | [phone-input.md](phone-input.md) |
| Select / option picker | [dropdown.md](dropdown.md) |
| Multi-value token input | [chip-input.md](chip-input.md) |
| Single date picker | [date-input.md](date-input.md) |
| Date range picker | [date-range-input.md](date-range-input.md) |
| Calendar widget | [calendar.md](calendar.md) |
| Two-month range calendar | [calendar-range.md](calendar-range.md) |
| Preset period + calendar | [calendar-periods.md](calendar-periods.md) |
| OTP / verification code | [otp-input.md](otp-input.md) |
| Checkbox | [checkbox.md](checkbox.md) |
| Checkbox card | [checkbox-box.md](checkbox-box.md) |
| Radio button | [radiobutton.md](radiobutton.md) |
| Radio button card | [radiobutton-box.md](radiobutton-box.md) |
| Toggle switch | [switcher.md](switcher.md) |
| Toggle switch card | [switcher-box.md](switcher-box.md) |
| Numeric slider | [slider.md](slider.md) |
| Form field wrapper | [form-field.md](form-field.md) |

## Feedback

| Need | Spec |
|---|---|
| Inline message banner | [alert.md](alert.md) |
| Blocking confirmation | [alert-dialog.md](alert-dialog.md) |
| Hover / focus hint | [tooltip.md](tooltip.md) |
| Indeterminate loading | [spinner.md](spinner.md) |
| Completion indicator | [progress-bar.md](progress-bar.md) |
| Loading placeholder | [skeleton.md](skeleton.md) |

## Layout & Containers

| Need | Spec |
|---|---|
| Content surface | [card.md](card.md) |
| Modal overlay | [dialog.md](dialog.md) |
| Collapsible section | [accordion.md](accordion.md) |
| Empty or zero state | [empty-state.md](empty-state.md) |
| Visual divider | [separator.md](separator.md) |
| Drag resize handle | [resizable.md](resizable.md) |
| Scrollbar indicator | [scroll.md](scroll.md) |
| Content slider | [carousel.md](carousel.md) |
| Standalone content row | [item.md](item.md) |

## Lists & Menus

| Need | Spec |
|---|---|
| List container | [list.md](list.md) |
| List or menu row | [list-item.md](list-item.md) |
| Right-click menu | [context-menu.md](context-menu.md) |
| Generic action menu | [dropdown-options.md](dropdown-options.md) |
| Account / profile menu | [dropdown-account.md](dropdown-account.md) |
| Searchable select | [dropdown-autocomplete.md](dropdown-autocomplete.md) |

## Tables

| Need | Spec |
|---|---|
| Full table | [table.md](table.md) |
| Table column | [table-column.md](table-column.md) |
| Table data cell | [table-cell.md](table-cell.md) |
| Table header cell | [table-header-cell.md](table-header-cell.md) |
| Table toolbar | [table-top-bar.md](table-top-bar.md) |
| Pagination | [pagination.md](pagination.md) |
| Filter trigger | [filter-chip.md](filter-chip.md) |
| Filter row container | [filters.md](filters.md) |
| Add filter picker | [dropdown-filters.md](dropdown-filters.md) |
| Column actions menu | [dropdown-column-actions.md](dropdown-column-actions.md) |
| Column visibility/reorder | [dropdown-columns.md](dropdown-columns.md) |
| Sort settings panel | [dropdown-sorting.md](dropdown-sorting.md) |
| Export settings panel | [dropdown-export.md](dropdown-export.md) |

## Navigation

| Need | Spec |
|---|---|
| Sidebar panel | [sidebar.md](sidebar.md) |
| Sidebar nav item | [sidebar-item.md](sidebar-item.md) |
| Collapsible nav group | [submenu.md](submenu.md) |
| App header bar | [top-bar.md](top-bar.md) |
| Breadcrumb trail | [breadcrumbs.md](breadcrumbs.md) |
| Local view switcher | [tabs.md](tabs.md) |

## Composition

| Need | Spec |
|---|---|
| Rich message editor | [message-composer.md](message-composer.md) |
| Button/action toolbar | [toolbar.md](toolbar.md) |

## Storybook-First Rule

Before using a component in code:

1. Read the component spec.
2. Run `list-all-documentation` from the `dls-lead-storybook` MCP server.
3. Run `get-documentation` for the exact component.
4. Use only documented props, variants, states, and examples.

If Storybook documents a component that does not yet have a spec file, follow [../patterns/component-selection.md](../patterns/component-selection.md), then stop and ask before inventing usage rules.
