# EmptyState

Category: feedback / zero state
React: `<EmptyState>`
Spec: `specs/components/empty-state.md`
TSX: `apps/storybook/src/stories/empty-state/EmptyState.tsx`
CSS: `apps/storybook/src/stories/empty-state/empty-state.css`
Storybook: https://storybook.dlslead.com/?path=/docs/components-emptystate--docs
Figma (component): https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6607-2170
Figma (slot content variants): https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6607-1068

--------------------------------------------
## State implementation contract (applies to all DLS components)

This component: NONE.
EmptyState is a static display component. No interactive states.
Interactive behavior comes from child components (Button, InputField, etc.).
--------------------------------------------

## Purpose

Placeholder shown when no content is available -- zero-data, no-results,
and onboarding gaps inside a page, card, or section. Explains the
situation and guides users toward the next action.

## Use when

- Empty data tables, lists, or feeds with no items yet.
- Search or filter results returning zero matches.
- Onboarding states before first content is created.
- 404 or not-found pages.
- Sections awaiting user action.

## Do NOT use for

- Alert banners or error toasts -- use Alert.
- Loading states -- use Spinner or Skeleton.
- Inline validation errors -- use FormField error state.
- Temporary notifications -- use Toast.

## Figma -> Code mapping

### EmptyState component (node 6607:2170)

| Figma property    | React prop   | Values / notes                                    |
|-------------------|-------------|---------------------------------------------------|
| title             | title        | string                                             |
| description       | (controls visibility) | Figma boolean -> React: description prop truthy/falsy |
| descriptionText   | description  | Figma string -> React `description` string prop    |
| media             | (controls visibility) | Figma boolean -> React: media prop truthy/falsy   |
| mediaContent      | media        | Figma instance swap -> React ReactNode (typically IconShape) |
| slot              | (controls visibility) | Figma boolean -> React: children prop truthy/falsy |
| slotContent       | children     | Figma instance swap -> React children (actions area) |


### Slot content variants (node 6607:1068)

Pre-built Figma compositions for the `slotContent` instance swap:

| Figma variant        | React equivalent                                      |
|----------------------|-------------------------------------------------------|
| 2 buttons            | Two horizontal Button components (Cancel + Action)    |
| 2 buttons vertical   | Two stacked full-width Button components              |
| 3 buttons            | Two horizontal Buttons + link Button below            |
| input + link         | InputField with search icon + help text with link     |

In React, these are composed freely as children -- no separate component needed.

## Anatomy

```
EmptyState (.dls-empty-state)
+-- Media (.dls-empty-state__media) [optional]
|   +-- IconShape or any visual content
+-- Text (.dls-empty-state__text) [optional]
|   +-- Title (.dls-empty-state__title) [optional]
|   +-- Description (.dls-empty-state__description) [optional]
+-- Actions (.dls-empty-state__actions) [optional]
    +-- consumer-provided children (buttons, inputs, links)
```

## Props / API

| Prop        | Type               | Required | Default | Description                         |
|-------------|-------------------|----------|---------|-------------------------------------|
| media       | React.ReactNode    | no       | --      | Media slot (IconShape, illustration) |
| title       | string             | no       | --           | Title text                          |
| description | string             | no       | --           | Description text                    |
| children    | React.ReactNode    | no       | --           | Action area (buttons, inputs, links) |
| className   | string             | no       | --           | Additional CSS class                |

## Tokens used

### Layout

| Token | Use |
|-------|-----|
| `--dls-font-family` | Container font family |
| `--dls-spacing-4` | Container gap |
| `--dls-spacing-2` | Text gap, actions gap |

### Color

| Token | Use |
|-------|-----|
| `--dls-color-text-primary` | Title color |
| `--dls-color-text-secondary` | Description color |

### Typography

| Token | Use |
|-------|-----|
| `--dls-text-l-font-size` | Title |
| `--dls-text-l-line-height` | Title |
| `--dls-font-weight-medium` | Title |
| `--dls-text-m-font-size` | Description |
| `--dls-text-m-line-height` | Description |
| `--dls-font-weight-normal` | Description |

## States

No interactive states. Static display component.
All interactivity is delegated to child components (Button, InputField, etc.).

## Accessibility contract

- Root: `div` (non-interactive container).
- No ARIA attributes required on the component itself.
- Not focusable. Child interactive elements handle their own focus.
- Title and description provide the accessible message; ensure they
  clearly communicate the empty state and next steps.
- No `prefers-reduced-motion` needed (no CSS transitions/animations).

## Composition rules

- Media slot typically contains an `IconShape` component with a semantic intent.
- Actions area accepts any DLS components: Button (all variants), InputField, links.
- Pre-built Figma slot patterns:
  - **2 buttons horizontal** -- Cancel + primary action side by side.
  - **2 buttons vertical** -- Cancel + primary action stacked full-width.
  - **3 buttons** -- Cancel + primary action + link button below.
  - **input + link** -- Search InputField with helper text.
- Do not nest EmptyState inside EmptyState.

## Known deviations

- **token-layer**: No L4 color or radius tokens for empty-state in `tokens.json`. Uses semantic tokens only.

## Code example

```tsx
{/* With icon + actions */}
<EmptyState
  media={<IconShape intent="warning" size="s"><OctagonAlertIcon /></IconShape>}
  title="No results found"
  description="Try adjusting your filters or searching with different keywords."
>
  <div style={{ display: 'flex', gap: 8 }}>
    <Button variant="outline" intent="neutral" size="m">Clear filters</Button>
    <Button variant="filled" intent="neutral" size="m">New search</Button>
  </div>
</EmptyState>

{/* With input */}
<EmptyState
  media={<IconShape intent="danger" size="m"><MessagesSquareIcon /></IconShape>}
  title="No messages yet"
  description="When someone sends you a message, it will appear here."
>
  <InputField placeholder="Try searching..." iconStart={<SearchIcon />} />
</EmptyState>
```

## Cross-references

- [icon-shape.md](../components/icon-shape.md) -- typical media slot content
- [button.md](../components/button.md) -- action buttons
- [input-field.md](../components/input-field.md) -- search action
