import React from 'react';
import './dialog.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type DialogBreakpoint = 'desktop' | 'mobile';

export interface DialogProps {
  /** Whether the dialog is open */
  open?: boolean;
  /** Breakpoint layout mode */
  breakpoint?: DialogBreakpoint;
  /** Dialog title */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Slot content — any ReactNode placed between title and actions */
  children?: React.ReactNode;
  /** Action buttons slot */
  actions?: React.ReactNode;
  /** Called when the close button is clicked or backdrop is clicked */
  onClose?: () => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Close icon
   --------------------------------------------------------------------------- */

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8L16 16M16 8L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      open = false,
      breakpoint = 'desktop',
      title,
      description,
      children,
      actions,
      onClose,
      className,
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLDialogElement>(null);
    const dialogRef = (ref as React.RefObject<HTMLDialogElement>) || innerRef;

    /* Sync open state with native <dialog> */
    React.useEffect(() => {
      const el = dialogRef.current;
      if (!el) return;
      if (open && !el.open) {
        el.showModal();
      } else if (!open && el.open) {
        el.close();
      }
    }, [open, dialogRef]);

    /* Close on backdrop click */
    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) {
        onClose?.();
      }
    };

    /* Close on native cancel (Escape key) */
    const handleCancel = (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClose?.();
    };

    return (
      <dialog
        ref={dialogRef}
        className={['dls-dialog', className].filter(Boolean).join(' ')}
        data-breakpoint={breakpoint}
        onClick={handleBackdropClick}
        onCancel={handleCancel}
      >
        {/* Top bar — title + close */}
        <div className="dls-dialog__top">
          <div className="dls-dialog__title-block">
            <div className="dls-dialog__title">{title}</div>
            {description && (
              <div className="dls-dialog__description">{description}</div>
            )}
          </div>
          {onClose && (
            <button
              type="button"
              className="dls-dialog__close"
              aria-label="Close"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Slot content */}
        {children && (
          <div className="dls-dialog__content">{children}</div>
        )}

        {/* Actions */}
        {actions && (
          <div className="dls-dialog__actions">{actions}</div>
        )}
      </dialog>
    );
  },
);

Dialog.displayName = 'Dialog';
