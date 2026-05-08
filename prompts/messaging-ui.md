---
name: Messaging UI Prompt
category: prompts
status: active
use_when:
  - message_composer
  - chat_ui
  - notification_center
  - inbox_screen
---

# Messaging UI Prompt

Use this when asking an agent to build messaging, email composition, chat, or notification interfaces.

```text
Build `[messaging UI name]` in `[route/file path]` using DLS-Lead.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/spacing.md`, `specs/foundations/color.md`, `specs/foundations/typography.md`, `specs/foundations/accessibility.md`, and `specs/foundations/motion.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `MessageComposer`, `Toolbar`, `Textarea`, `Button`, `ChipInput`, `Tabs`, `Avatar`, `Badge`, `BadgeIndicator`, `List`, `ListItem`, `Item`, `Alert`, `Separator`, and `EmptyState`
  - run `get-documentation-for-story` for MessageComposer SMS and Email variants
  - if a component is not documented, stop and ask before substituting

Screen requirements:
- Use `MessageComposer` for rich message editing. Choose the correct channel (`sms` or `email`).
- Use `Toolbar` for formatting controls (bold, italic, link). Do not build custom toolbar markup.
- Use `Textarea` for plain-text message entry when `MessageComposer` is not needed.
- Use `ChipInput` for recipient or tag entry.
- Use `List` + `ListItem` for message threads, inbox rows, or notification lists.
- Use `Item` for standalone message or notification cards.
- Use `Avatar` for sender/recipient images.
- Use `Badge` or `BadgeIndicator` for unread counts.
- Use `Alert` for delivery status or error banners.
- Use `EmptyState` for empty inbox or empty search results.
- Use `Tabs` for switching between inbox categories (e.g., "All", "Unread", "Sent").
- Use `lucide-react` icons only, aliased with an `Icon` suffix.

Token constraints:
- Composer surface uses `--dls-color-component-message-composer-bg` if available, otherwise `--dls-color-surface-base`.
- Toolbar uses documented toolbar tokens.
- Message bubbles or rows use semantic surface and border tokens.
- Unread indicators use `--dls-color-intent-primary-bg` or documented badge tokens.
- Spacing between messages uses `--dls-spacing-2` or `--dls-spacing-3`; section gaps use `--dls-spacing-6`.

Implementation constraints:
- Do not create custom composer, toolbar, or chat-bubble markup outside DLS components.
- Do not use inline visual styles.
- Do not hardcode hex, rgba, px spacing, radius, or shadow values.
- Before finishing, run type checks and any available Storybook tests.
```
