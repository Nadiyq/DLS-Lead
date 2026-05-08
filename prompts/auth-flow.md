---
name: Auth Flow Prompt
category: prompts
status: active
use_when:
  - login_page
  - signup_page
  - otp_verification
  - onboarding_flow
  - password_reset
---

# Auth Flow Prompt

Use this when asking an agent to build login, signup, OTP verification, or onboarding screens.

```text
Build `[auth flow name]` in `[route/file path]` using DLS-Lead.

Before implementing:
- Read `specs/session-start.md`.
- Read `specs/tokens/README.md`, `specs/tokens/token-reference.md`, `specs/foundations/spacing.md`, `specs/foundations/color.md`, `specs/foundations/typography.md`, `specs/foundations/accessibility.md`, and `specs/foundations/motion.md`.
- Use the `dls-lead-storybook` MCP server:
  - run `list-all-documentation`
  - run `get-documentation` for `Card`, `Text`, `Button`, `InputField`, `Checkbox`, `OtpInput`, `Alert`, `Spinner`, and `FormField`
  - run `get-documentation-for-story` for documented LoginForm, SignupForm, OtpForm template stories if they exist
  - if a component is not documented, stop and ask before substituting

Screen requirements:
- Center the auth card on the page using tokenized spacing and surface tokens.
- Use `Card` for the form container, not a custom wrapper.
- Use `InputField` for email, password, and name fields with visible labels.
- Use `OtpInput` for verification code entry, not custom digit boxes.
- Use `Checkbox` for "remember me" or terms acceptance.
- Use `Button` with `variant="filled"` and `intent="primary"` for the primary submit action. Secondary actions use `variant="ghost"` or `variant="link"`.
- Use `Alert` for inline error or success messages, not custom banners.
- Use `Spinner` for loading states on the submit button.
- Use `Text` for heading, subtitle, and footer links.
- Use `lucide-react` icons only, aliased with an `Icon` suffix.

Token constraints:
- Page background uses `--dls-color-surface-subtle` or `--dls-color-surface-muted`.
- Card surface uses `--dls-color-component-card-bg` and `--dls-radius-component-card`.
- Form field spacing uses `--dls-spacing-4` between fields, `--dls-spacing-6` above the submit button.
- Error states use `--dls-color-intent-danger-text` and `--dls-color-intent-danger-border`.
- Focus uses `--dls-state-focus-ring-color`.
- Link text uses `--dls-color-intent-primary-text`.

Implementation constraints:
- Do not create custom form controls or input wrappers.
- Do not use placeholder text as the only label.
- Do not indicate validation with color alone; include visible error text.
- Password fields should use `type="password"` with a show/hide toggle if the input supports it.
- Do not hardcode hex, rgba, px spacing, radius, or shadow values.
- Before finishing, run type checks and any available Storybook tests.
```
