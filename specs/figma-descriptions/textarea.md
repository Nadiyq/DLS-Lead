# Textarea

Category: form input
React: <Textarea>
Spec: specs/components/textarea.md
TSX: apps/storybook/src/stories/textarea/Textarea.tsx
Storybook: https://storybook.dlslead.com/?path=/docs/components-textarea--docs
Figma: https://www.figma.com/design/oKckNLXwLm5fYEmdXaynYB/DLS-Lead?node-id=6433-6439

--------------------------------------------
## State implementation contract

Textarea box hover changes border color only — no background
OKLCH shift or overlay. The embedded send button uses OKLCH
L-shift for hover (filled surface), but that is a sub-element,
not the main component surface.

- Hover: border → `--dls-color-component-input-border-hover`
- Focus-within: border → `--dls-color-component-input-border-focus`,
  ring → `--dls-state-focus-ring-color`
- Error: bg → `--dls-color-intent-danger-subtle`,
  border → `--dls-color-intent-danger-border`
- Disabled: bg → `--dls-color-component-input-bg-disabled`,
  border → `--dls-color-component-input-border-disabled`
--------------------------------------------

## Purpose
Multi-line text field with optional character counter, clear
button, send action, used-percent indicator, and hint/error
feedback.

## Use when
- Multi-line text entry with character counting or limits.
- Comment or message composition with send action.
- Description or bio fields needing usage feedback.

## Do NOT use for
- Single-line text -> use InputField.
- Rich text editing -> use a rich text editor.
- Chat-style messaging -> use MessageComposer.

## Figma -> Code mapping
| Figma property   | React prop       | Values / Notes |
|------------------|------------------|----------------|
| state            | (none)           | Visual-only. In code: CSS :hover, :focus-within, data-error, data-disabled. |
| text             | value            | Figma text -> HTML textarea value attribute. |
| placeholder      | placeholder      | HTML attribute pass-through. |
| error            | error            | Figma boolean. In code, error is a string — truthy = error state + message. |
| errorText        | error            | Figma error text content -> React error string prop value. |
| bottomControls   | (none)           | Figma boolean toggles entire bottom bar. In code, visibility derived from showCount/maxLength/showUsedPercent/onSend. |
| characters       | showCount        | Figma boolean -> code shows counter when showCount=true or maxLength is set. |
| sendBtn          | onSend           | Figma boolean -> code shows send button when onSend callback provided. |
| used             | showUsedPercent  | Figma boolean -> React showUsedPercent prop (requires maxLength). |
| (none)           | label            | Code-only. Not in Figma component. |
| (none)           | hint             | Code-only. Not in Figma component. |
| (none)           | clearable        | Code-only. Clear button shown when clearable + filled + not disabled. |
| (none)           | onClear          | Code-only. Callback for clear button. |
| (none)           | maxLength        | Code-only. Sets character limit and enables counter. |

Notes:
- Figma "text-area" component covers the bordered box +
  bottom bar + error row. In code, Textarea also renders label
  and hint rows as a single component.
- No Figma variants, intents, or sizes. The single component
  set captures all visual states via the state property.

## Anatomy
1. Root wrapper — <div class="dls-textarea">, vertical
   stack: label -> box -> hint/error.
2. Label — <label class="dls-textarea__label">, associated
   via htmlFor.
3. Box — <div class="dls-textarea__box">, bordered container
   holding field row + bottom bar.
4. Field row — textarea element + optional clear button.
5. Textarea — <textarea class="dls-textarea__input">,
   native element with forwarded ref.
6. Clear button — shown when clearable + filled, replaces
   trailing icon pattern.
7. Bottom bar — character counter (left), actions (right):
   used-percent text + send button.
8. Send button — filled info-intent icon button with SendIcon.
9. Hint/Error row — shows error with TriangleAlert icon or
   hint text.

## Props / API
- label           string, optional. Label text above the
                  textarea.
- hint            string, optional. Hint text below the
                  textarea.
- error           string, optional. Error message — puts
                  field in error state.
- maxLength       number, optional. Maximum character count.
                  Shows counter when set.
- showCount       boolean, optional, default false. Show
                  counter even without maxLength.
- showUsedPercent boolean, optional, default false. Show
                  "N% used" indicator (requires maxLength).
- clearable       boolean, optional, default false. Show
                  clear button when textarea has value.
- onClear         () => void, optional. Callback when clear
                  button is clicked.
- onSend          () => void, optional. When provided, send
                  button renders in bottom bar.
- className       string, optional. Pass-through for layout
                  composition only.
- Extends Omit<React.TextareaHTMLAttributes, 'children'> —
  standard HTML textarea attributes passed through.

## Tokens used
L4 component tokens (shared with InputField, all in tokens.json):
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
- --dls-radius-component-button (send button)

L2/L3 semantic tokens also used:
- --dls-state-focus-ring-color (focus ring on box, clear,
  send)
- --dls-state-l-delta-hover (send button OKLCH hover)
- --dls-color-intent-info-strong (send button bg)
- --dls-color-intent-info-on-base (send button icon color)
- --dls-color-intent-danger-subtle (error bg)
- --dls-color-intent-danger-border (error border)
- --dls-color-intent-danger-text (error text)
- --dls-color-text-secondary (label, hint, counter, icons)
- --dls-color-text-primary (clear hover, text fg)
- --dls-color-text-disabled (disabled label, counter, icons)
- --dls-color-text-placeholder (placeholder)
- --dls-color-surface-disabled (disabled send bg)

## States

### Figma representation
state property with values: normal, filled, focused, error,
disabled. No hover state in Figma.

### Code implementation
- :hover:not(:disabled):not([data-disabled]):not([data-error])
  — border color shifts to hover token.
- :focus-within:not([data-disabled]):not([data-error])
  — border shifts to focus token, focus ring via box-shadow.
- [data-error] — danger intent bg + border.
  Textarea gets aria-invalid="true".
- [data-disabled] — disabled bg + border, cursor not-allowed.
  Send button disabled, counter uses disabled text color.
- Transitions: border-color, box-shadow, background-color
  150ms ease. Send button: background-color 150ms ease.
  Both guarded by @media (prefers-reduced-motion).

## Accessibility contract
- Textarea is a native <textarea> with forwarded ref.
- Label is associated via htmlFor / id.
- Hint and error text connected via aria-describedby.
- Error state sets aria-invalid="true" on the textarea.
- Clear button has aria-label="Clear input".
- Send button has aria-label="Send".
- Error icon (TriangleAlert) marked aria-hidden="true" —
  error is communicated via text, not icon alone.
- Focus-visible on clear and send buttons uses box-shadow
  ring.
- Respects prefers-reduced-motion.

## Composition rules
- Textarea is a leaf component. It does not accept component
  children.
- For form grouping, wrap in a FormField or use standard
  <form> / <fieldset> patterns.
- Do not nest Textarea inside another Textarea.

## Known deviations
- Figma "text-area" component does not include label or hint
  rows. In code, Textarea renders label, box, and hint/error
  as a single component. Severity: low.

## Code example
<Textarea
  label="Message"
  placeholder="Type your message..."
  maxLength={280}
  showCount
  showUsedPercent
  clearable
  onClear={() => setValue('')}
  onSend={() => handleSend()}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

## Cross-references
- InputField (shares input tokens)
- FormField (form grouping with validation)
- MessageComposer (chat-style messaging)
- specs/components/textarea.md
- specs/patterns/composition.md
