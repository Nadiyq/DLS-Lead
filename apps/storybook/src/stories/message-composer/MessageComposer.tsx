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
  /** Recipients slot (email only) */
  recipients?: React.ReactNode;
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
      recipients,
      toolbar,
      floatingToolbar,
      placeholder = 'Enter...',
      value,
      onChange,
      actionsLeft,
      actionsRight,
      className,
    },
    ref,
  ) => {
    const isEmail = channel === 'email';
    const [hasSelection, setHasSelection] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
      if (!floatingToolbar) return;
      const textarea = textareaRef.current;
      if (!textarea) return;

      const check = () => {
        const { selectionStart, selectionEnd } = textarea;
        setHasSelection(selectionStart !== selectionEnd);
      };

      textarea.addEventListener('select', check);
      textarea.addEventListener('mouseup', check);
      textarea.addEventListener('keyup', check);
      textarea.addEventListener('blur', () => setHasSelection(false));

      return () => {
        textarea.removeEventListener('select', check);
        textarea.removeEventListener('mouseup', check);
        textarea.removeEventListener('keyup', check);
        textarea.removeEventListener('blur', () => setHasSelection(false));
      };
    }, [floatingToolbar]);

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
            <span className="dls-message-composer__field-label">Subject:</span>
            <input
              className="dls-message-composer__textarea"
              type="text"
              value={subject}
              onChange={e => onSubjectChange?.(e.target.value)}
              placeholder="Enter subject..."
            />
          </div>
        )}

        {isEmail && recipients && (
          <div className="dls-message-composer__field-row">
            <span className="dls-message-composer__field-label">to:</span>
            <div className="dls-message-composer__field-value">{recipients}</div>
          </div>
        )}

        {/* Toolbar */}
        {toolbar && <div className="dls-message-composer__toolbar">{toolbar}</div>}

        {/* Text input */}
        <div className="dls-message-composer__input">
          <textarea
            ref={textareaRef}
            className="dls-message-composer__textarea"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            rows={2}
          />
          {/* Floating toolbar — only visible when text is selected */}
          {floatingToolbar && hasSelection && (
            <div className="dls-message-composer__floating-toolbar">{floatingToolbar}</div>
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
