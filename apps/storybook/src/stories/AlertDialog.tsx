import React from 'react';
import './alert-dialog.css';
export { Info as InfoIcon, CheckCircle as CheckCircleIcon, AlertTriangle as AlertTriangleIcon, XCircle as XCircleIcon } from 'lucide-react';

export type AlertDialogIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type AlertDialogBreakpoint = 'desktop' | 'mobile';

export interface AlertDialogProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'open' | 'onClose'> {
  /** Semantic intent that controls icon color and action button intent. */
  intent?: AlertDialogIntent;
  /** Layout mode for desktop or stacked mobile compositions. */
  breakpoint?: AlertDialogBreakpoint;
  /** Whether the native dialog is shown with showModal(). */
  open?: boolean;
  /** Optional leading decorative icon. Use lucide-react icons. */
  icon?: React.ReactNode;
  /** Dialog title used as the accessible name when present. */
  title?: string;
  /** Optional supporting text used as the accessible description when present. */
  description?: string;
  /** Primary action slot, usually a filled Button. */
  primaryAction?: React.ReactNode;
  /** Secondary action slot, usually an outline Button. */
  secondaryAction?: React.ReactNode;
  /** Called when native cancel, such as Escape, requests the dialog to close. */
  onClose?: () => void;
  /** Additional class name for the root dialog. */
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
      onCancel: onCancelProp,
      className,
      ...props
    },
    ref,
  ) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const mergedRef = useMergedRef(ref, dialogRef);
    const reactId = React.useId();
    const titleId = `${reactId}-title`;
    const descriptionId = `${reactId}-description`;
    const labelledBy = props['aria-labelledby'] ?? (title ? titleId : undefined);
    const describedBy = props['aria-describedby'] ?? (description ? descriptionId : undefined);

    React.useEffect(() => {
      const el = dialogRef.current;
      if (!el) return;
      if (open && !el.open) {
        el.showModal();
      } else if (!open && el.open) {
        el.close();
      }
    }, [open]);

    const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
      e.preventDefault();
      onCancelProp?.(e);
      onClose?.();
    };

    const hasActions = primaryAction || secondaryAction;

    return (
      <dialog
        ref={mergedRef}
        className={['dls-alert-dialog', className].filter(Boolean).join(' ')}
        data-intent={intent}
        data-breakpoint={breakpoint || undefined}
        {...props}
        onCancel={handleCancel}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
      >
        <div className="dls-alert-dialog__content">
          {icon && <span className="dls-alert-dialog__icon" aria-hidden="true">{icon}</span>}
          {(title || description) && (
            <div className="dls-alert-dialog__text">
              {title && <div className="dls-alert-dialog__title" id={titleId}>{title}</div>}
              {description && (
                <div className="dls-alert-dialog__description" id={descriptionId}>
                  {description}
                </div>
              )}
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
