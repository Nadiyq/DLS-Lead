import React from 'react';
import './alert.css';
export { Info as InfoIcon, CheckCircle as CheckCircleIcon, AlertTriangle as AlertTriangleIcon, XCircle as XCircleIcon } from 'lucide-react';

export type AlertIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type AlertSize = 'm' | 's';

export interface AlertProps {
  intent?: AlertIntent;
  size?: AlertSize;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      intent = 'neutral',
      size = 'm',
      icon,
      title,
      description,
      action,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={['dls-alert', className].filter(Boolean).join(' ')}
        data-intent={intent}
        data-size={size}
        {...props}
      >
        {icon && <span className="dls-alert__icon">{icon}</span>}
        {(title || description) && (
          <div className="dls-alert__body">
            {title && <div className="dls-alert__title">{title}</div>}
            {description && <div className="dls-alert__description">{description}</div>}
          </div>
        )}
        {action && <div className="dls-alert__action">{action}</div>}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
