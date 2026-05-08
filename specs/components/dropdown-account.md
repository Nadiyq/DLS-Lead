---
name: DropdownAccount
category: component
status: active
source_of_truth:
  - apps/storybook/src/stories/dropdown-account/DropdownAccount.tsx
  - apps/storybook/src/stories/dropdown-account/dropdown-account.css
  - tokens/tokens.json
---

# DropdownAccount

## Metadata

- Category: menu / navigation
- Types: `menu | switch-account | log-out | switch-company`

## Overview

Use `DropdownAccount` for account-level actions — profile menu, switching between accounts or companies, and log-out flows. Composed with `Avatar` and `ListItem`.

## Anatomy

- Root (role="listbox")
- User header (avatar + name + email)
- Action items (ListItem rows)
- Account/company list (for switch types)
- Footer actions

## Tokens Used

- `--dls-color-component-dropdown-account-*`
- `--dls-radius-component-dropdown-account`
- list-item token families

## Props / API

- `type` — `menu | switch-account | log-out | switch-company`
- `user` — `{ name, email, initials, avatarSrc }`
- `actions` — menu items `{ label, icon, onClick }[]`
- `accounts` — account list for switch-account
- `currentAccountIndex`, `onSelectAccount`
- `emails` — email list for log-out
- `onLogOutAll`
- `companies` — `{ name, initials, logoSrc }[]`
- `currentCompanyIndex`, `onSelectCompany`
- `footerActions`

## States

- menu mode
- switch-account with selected indicator
- log-out with email list
- switch-company with selected indicator

## Code Example

```tsx
<DropdownAccount type="menu"
  user={{ name: "Nadiia", email: "nadiia@acme.com", initials: "NA" }}
  actions={[{ label: "Settings", icon: <SettingsIcon /> }, { label: "Log out", icon: <LogOutIcon /> }]} />
```

## Cross-References

- [dropdown.md](dropdown.md)
- [avatar.md](avatar.md)
- [sidebar.md](sidebar.md)
