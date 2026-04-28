import React from 'react';
import './alert-dialog.css';
export { Info as InfoIcon, CheckCircle as CheckCircleIcon, AlertTriangle as AlertTriangleIcon, XCircle as XCircleIcon } from 'lucide-react';

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
