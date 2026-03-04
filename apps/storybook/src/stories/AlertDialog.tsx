import React from 'react';
import './alert-dialog.css';

export type AlertDialogIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type AlertDialogBreakpoint = 'desktop' | 'mobile';

export interface AlertDialogProps {
  intent?: AlertDialogIntent;
  breakpoint?: AlertDialogBreakpoint;
  open?: boolean;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const AlertDialog = React.forwardRef<HTMLDialogElement, AlertDialogProps>(
  (
    {
      intent = 'neutral',
      breakpoint,
      open = false,
      icon,
      title,
      description,
      primaryAction,
      secondaryAction,
      onClose,
      className,
      ...props
    },
    ref,
  ) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const mergedRef = useMergedRef(ref, dialogRef);

    React.useEffect(() => {
      const el = dialogRef.current;
      if (!el) return;
      if (open && !el.open) {
        el.showModal();
      } else if (!open && el.open) {
        el.close();
      }
    }, [open]);

    const handleCancel = (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClose?.();
    };

    const hasActions = primaryAction || secondaryAction;

    return (
      <dialog
        ref={mergedRef}
        className={['dls-alert-dialog', className].filter(Boolean).join(' ')}
        data-intent={intent}
        data-breakpoint={breakpoint || undefined}
        onCancel={handleCancel}
        {...props}
      >
        <div className="dls-alert-dialog__content">
          {icon && <span className="dls-alert-dialog__icon">{icon}</span>}
          {(title || description) && (
            <div className="dls-alert-dialog__text">
              {title && <div className="dls-alert-dialog__title">{title}</div>}
              {description && <div className="dls-alert-dialog__description">{description}</div>}
            </div>
          )}
        </div>
        {hasActions && (
          <div className="dls-alert-dialog__actions">
            {secondaryAction}
            {primaryAction}
          </div>
        )}
      </dialog>
    );
  },
);

AlertDialog.displayName = 'AlertDialog';

function useMergedRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return React.useCallback((node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object')
        (ref as React.MutableRefObject<T | null>).current = node;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

export const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const AlertTriangleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const XCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
