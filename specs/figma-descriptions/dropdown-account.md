# DropdownAccount

Category: menu / navigation
React: `<DropdownAccount>`
Spec: specs/components/dropdown-account.md
TSX: apps/storybook/src/stories/dropdown-account/DropdownAccount.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-dropdownaccount--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6629-4471

--------------------------------------------
## State implementation contract

This component is a static dropdown container. Interactive states
(hover, focus, selected) are delegated to child ListItem components.
The DropdownAccount root has no interactive states of its own.

--------------------------------------------

## Purpose

Account-level dropdown menus triggered from the sidebar. Four types
cover the main account management flows: profile menu with actions,
switching between user accounts, switching between companies/orgs,
and a multi-account log-out confirmation.

## Use when

- Displaying a profile menu with avatar, name, email, and action links.
- Letting users switch between multiple accounts or workspaces.
- Letting users switch between companies/organizations.
- Confirming log-out from multiple accounts.

## Do NOT use for

- Generic dropdown menus → use Dropdown or DropdownOptions.
- Navigation menus → use Sidebar + SidebarItem.
- Context menus → use ContextMenu.
- Settings or preferences → use Dialog or page-level UI.

## Figma → Code mapping

| Figma property | React prop | Values / Notes                                     |
|----------------|------------|----------------------------------------------------|
| type           | type       | menu \| switch-account \| switch-company \| log-out |

Notes:
- The Figma component is named "account" and uses a single `type`
  property. All content is composed via ListItem instances inside
  a List-like container.
- User data, account lists, company lists, and email lists are
  passed as structured props in code — they are not Figma properties.

## Anatomy

1. Root — `div[role="listbox"]` with `dls-dropdown-account` class.
   228px wide, surface-base background, subtle border, md shadow.
2. User header (menu type) — ListItem two-line-slots with Avatar.
3. Action items — ListItem with-slots rows with icons.
4. Dividers — ListItem type="divider" between sections.
5. Account/company list (switch types) — ListItem two-line-slots
   or with-slots rows with selection state.
6. Label header (switch types) — ListItem type="label".
7. Footer actions — ListItem with-slots for add/log-out actions.
8. Company logo — `dls-dropdown-account__logo` (24×24 square).

## Props / API

- `type` — `'menu' | 'switch-account' | 'log-out' | 'switch-company'`, required.
- `user` — `AccountUser`, optional. Current user for menu type.
- `actions` — `MenuAction[]`, optional. Menu action items.
- `accounts` — `AccountUser[]`, optional. Account list for switch-account.
- `currentAccountIndex` — `number`, optional. Currently selected account.
- `onSelectAccount` — `(index: number) => void`, optional.
- `emails` — `string[]`, optional. Email list for log-out type.
- `onLogOutAll` — `() => void`, optional.
- `companies` — `AccountCompany[]`, optional. Company list for switch-company.
- `currentCompanyIndex` — `number`, optional. Currently selected company.
- `onSelectCompany` — `(index: number) => void`, optional.
- `footerActions` — `MenuAction[]`, optional. Below-divider actions.
- `className` — `string`, optional.

Supporting interfaces:
- `AccountUser` — `{ name: string; email: string; initials?: string; avatarSrc?: string }`
- `AccountCompany` — `{ name: string; initials?: string; logoSrc?: string }`
- `MenuAction` — `{ label: string; icon?: React.ReactNode; onClick?: () => void }`

## Tokens used

- `--dls-color-surface-base` — dropdown background
- `--dls-color-border-subtle` — dropdown border
- `--dls-radius-component-list` — border radius (12px)
- `--dls-shadow-surface-md` — dropdown shadow
- `--dls-spacing-2` — dropdown padding
- `--dls-color-surface-muted` — company logo background
- `--dls-radius-component-sidebar-item` — company logo radius
- `--dls-text-xs-font-size` — company logo initials size
- `--dls-font-weight-semibold` — company logo initials weight
- `--dls-color-text-secondary` — company logo initials color

No L4 dropdown-account tokens exist in tokens.json.

## States

No interactive states on the container itself. All interactivity
is delegated to child ListItem components (hover, focus, selected).

## Accessibility contract

- Root element: `div[role="listbox"]`.
- Keyboard: delegated to ListItem children.
- Focus: delegated to ListItem children.
- No `prefers-reduced-motion` needed — no transitions on container.

## Composition rules

- All rows MUST be ListItem components — never custom `<div>` or `<button>`.
- Dividers use ListItem type="divider".
- Labels use ListItem type="label".
- Menu type shows Avatar + two-line-slots at top, with-slots for actions.
- Switch types show label header, account/company rows, divider, footer actions.
- Log-out type shows email list, divider, log-out-all action.
- Company logos use the `CompanyLogo` sub-component (24×24 square).
- Icons come from lucide-react only.

## Known deviations

None.

## Code example

```tsx
<DropdownAccount
  type="menu"
  user={{ name: "Anna Smith", email: "anna@company.com", initials: "AS" }}
  actions={[
    { label: "Settings", icon: <SettingsIcon /> },
    { label: "Log out", icon: <LogOutIcon /> },
  ]}
/>

<DropdownAccount
  type="switch-account"
  accounts={[
    { name: "Anna Smith", email: "anna@work.com", initials: "AS" },
    { name: "Anna Brown", email: "anna@personal.com", initials: "AB" },
  ]}
  currentAccountIndex={0}
  footerActions={[{ label: "Add Account", icon: <CirclePlusIcon /> }]}
/>
```

## Cross-references

- specs/components/dropdown.md
- specs/components/list-item.md
- specs/components/list.md
- specs/components/avatar.md
- specs/components/sidebar.md
