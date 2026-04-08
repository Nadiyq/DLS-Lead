import React from 'react';
import './comment.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type CommentChannel = 'sms' | 'email';

export interface CommentProps {
  /** Channel type */
  channel?: CommentChannel;
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

export const Comment = React.forwardRef<HTMLDivElement, CommentProps>(
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
        className={['dls-comment', className].filter(Boolean).join(' ')}
        data-channel={channel}
      >
        {/* Top bar */}
        {(tabs || channelStatus) && (
          <div className="dls-comment__top">
            <div>{tabs}</div>
            {channelStatus && (
              <div className="dls-comment__channel-status">{channelStatus}</div>
            )}
          </div>
        )}

        {/* Alert */}
        {alert && <div className="dls-comment__alert">{alert}</div>}

        {/* Email-only fields */}
        {isEmail && subject !== undefined && (
          <div className="dls-comment__field-row">
            <span className="dls-comment__field-label">Subject:</span>
            <input
              className="dls-comment__textarea"
              type="text"
              value={subject}
              onChange={e => onSubjectChange?.(e.target.value)}
              placeholder="Enter subject..."
            />
          </div>
        )}

        {isEmail && recipients && (
          <div className="dls-comment__field-row">
            <span className="dls-comment__field-label">To:</span>
            <div className="dls-comment__field-value">{recipients}</div>
          </div>
        )}

        {/* Toolbar */}
        {toolbar && <div className="dls-comment__toolbar">{toolbar}</div>}

        {/* Text input */}
        <div className="dls-comment__input">
          <textarea
            ref={textareaRef}
            className="dls-comment__textarea"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            rows={2}
          />
          {/* Floating toolbar — only visible when text is selected */}
          {floatingToolbar && hasSelection && (
            <div className="dls-comment__floating-toolbar">{floatingToolbar}</div>
          )}
        </div>

        {/* Actions */}
        {(actionsLeft || actionsRight) && (
          <div className="dls-comment__actions">
            <div className="dls-comment__actions-left">{actionsLeft}</div>
            <div className="dls-comment__actions-right">{actionsRight}</div>
          </div>
        )}
      </div>
    );
  },
);

Comment.displayName = 'Comment';
