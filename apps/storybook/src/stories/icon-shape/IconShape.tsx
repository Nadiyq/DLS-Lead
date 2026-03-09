import React from 'react';
import './icon-shape.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type IconShapeIntent = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type IconShapeSize = 'm' | 's' | 'xs';

export interface IconShapeProps {
  /** Intent color */
  intent?: IconShapeIntent;
  /** Size */
  size?: IconShapeSize;
  /** Icon element (SVG) */
  children: React.ReactNode;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const IconShape = React.forwardRef<HTMLDivElement, IconShapeProps>(
  (
    {
      intent = 'neutral',
      size = 'm',
      children,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-icon-shape', className].filter(Boolean).join(' ')}
        data-intent={intent}
        data-size={size}
      >
        {children}
      </div>
    );
  },
);

IconShape.displayName = 'IconShape';
