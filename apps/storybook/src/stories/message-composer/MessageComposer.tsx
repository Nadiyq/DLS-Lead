import React from 'react';
import './message-composer.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type MessageComposerChannel = 'sms' | 'email';

export interface MessageComposerProps {
  /** Channel type */
  channel?: MessageComposerChannel;
  /** Tabs / channel switcher slot */
  tabs?: React.ReactNode;
  /** Channel status slot (right side of top bar) */
  channelStatus?: React.ReactNode;
  /** Alert banner slot */
  alert?: React.ReactNode;
  /** Subject field value (email only) */
  subject?: string;
  /** Subject change handler */
  onSubjectChange?: (value: string) => void;
  /** Subject placeholder */
  subjectPlaceholder?: string;
  /** Recipients slot (email only). Pass a ChipInput or a static node. */
  recipients?: React.ReactNode;
  /** DOM id of the focusable recipients control inside the recipients slot. Wires the "to:" label via htmlFor. */
  recipientsInputId?: string;
  /** Sticky toolbar slot (embedded in header area) */
  toolbar?: React.ReactNode;
  /** Floating toolbar slot (appears on text selection) */
  floatingToolbar?: React.ReactNode;
  /** Text field placeholder */
  placeholder?: string;
  /** Text field value */
  value?: string;
  /** Text change handler */
  onChange?: (value: string) => void;
  /** Left action buttons slot */
  actionsLeft?: React.ReactNode;
  /** Right action buttons slot (submit) */
  actionsRight?: React.ReactNode;
  /** External ref to the underlying <textarea>. Useful for formatting
   *  toolbars that need to read selectionStart/selectionEnd and mutate
   *  the textarea value. */
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const MessageComposer = React.forwardRef<HTMLDivElement, MessageComposerProps>(
  (
    {
      channel = 'sms',
      tabs,
      channelStatus,
      alert,
      subject,
      onSubjectChange,
      subjectPlaceholder = 'Enter subject...',
      recipients,
      recipientsInputId,
      toolbar,
      floatingToolbar,
      placeholder = 'Enter...',
      value,
      onChange,
      actionsLeft,
      actionsRight,
      textareaRef: externalTextareaRef,
      className,
    },
    ref,
  ) => {
    const isEmail = channel === 'email';
    const [hasSelection, setHasSelection] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const subjectId = React.useId();
    // Mirror the textarea ref into the consumer's ref if provided.
    const assignTextareaRef = React.useCallback(
      (el: HTMLTextAreaElement | null) => {
        (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
        if (externalTextareaRef) {
          (externalTextareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
        }
      },
      [externalTextareaRef],
    );

    React.useEffect(() => {
      if (!floatingToolbar) return;
      const textarea = textareaRef.current;
      if (!textarea) return;

      const check = () => {
        const { selectionStart, selectionEnd } = textarea;
        setHasSelection(selectionStart !== selectionEnd);
      };
      const clear = () => setHasSelection(false);

      textarea.addEventListener('select', check);
      textarea.addEventListener('mouseup', check);
      textarea.addEventListener('keyup', check);
      textarea.addEventListener('blur', clear);

      return () => {
        textarea.removeEventListener('select', check);
        textarea.removeEventListener('mouseup', check);
        textarea.removeEventListener('keyup', check);
        textarea.removeEventListener('blur', clear);
      };
    }, [floatingToolbar]);

    /* Keep the textarea focused (and its selection alive) while the user
       interacts with the floating toolbar — without preventDefault on
       mousedown the textarea blurs, hasSelection flips to false, and the
       toolbar unmounts before the button click can fire. */
    const preserveSelectionOnPointer = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
      },
      [],
    );

    return (
      <div
        ref={ref}
        className={['dls-message-composer', className].filter(Boolean).join(' ')}
        data-channel={channel}
      >
        {/* Top bar */}
        {(tabs || channelStatus) && (
          <div className="dls-message-composer__top">
            <div>{tabs}</div>
            {channelStatus && (
              <div className="dls-message-composer__channel-status">{channelStatus}</div>
            )}
          </div>
        )}

        {/* Alert */}
        {alert && <div className="dls-message-composer__alert">{alert}</div>}

        {/* Email-only fields */}
        {isEmail && subject !== undefined && (
          <div className="dls-message-composer__field-row">
            <label
              className="dls-message-composer__field-label"
              htmlFor={subjectId}
            >
              Subject:
            </label>
            <input
              id={subjectId}
              className="dls-message-composer__textarea"
              type="text"
              value={subject}
              onChange={e => onSubjectChange?.(e.target.value)}
              placeholder={subjectPlaceholder}
            />
          </div>
        )}

        {isEmail && recipients && (
          <div className="dls-message-composer__field-row">
            {recipientsInputId ? (
              <label
                className="dls-message-composer__field-label"
                htmlFor={recipientsInputId}
              >
                to:
              </label>
            ) : (
              <span className="dls-message-composer__field-label">to:</span>
            )}
            <div className="dls-message-composer__field-value">{recipients}</div>
          </div>
        )}

        {/* Toolbar */}
        {toolbar && <div className="dls-message-composer__toolbar">{toolbar}</div>}

        {/* Text input */}
        <div className="dls-message-composer__input">
          <textarea
            ref={assignTextareaRef}
            className="dls-message-composer__textarea"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            rows={2}
          />
          {/* Floating toolbar — only visible when text is selected.
              onMouseDown preventDefault keeps the textarea focused so the
              selection survives the click on a toolbar button. */}
          {floatingToolbar && hasSelection && (
            <div
              className="dls-message-composer__floating-toolbar"
              onMouseDown={preserveSelectionOnPointer}
            >
              {floatingToolbar}
            </div>
          )}
        </div>

        {/* Actions */}
        {(actionsLeft || actionsRight) && (
          <div className="dls-message-composer__actions">
            <div className="dls-message-composer__actions-left">{actionsLeft}</div>
            <div className="dls-message-composer__actions-right">{actionsRight}</div>
          </div>
        )}
      </div>
    );
  },
);

MessageComposer.displayName = 'MessageComposer';
