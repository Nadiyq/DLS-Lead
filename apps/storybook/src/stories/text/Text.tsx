import React from 'react';
import './text.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type TextSize = 'm' | 's' | 'xs';

export interface TextProps {
  /** Size variant */
  size?: TextSize;
  /** Title text (optional — omit for single-line description only) */
  title?: string;
  /** Description text */
  description: string;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Text = React.forwardRef<HTMLDivElement, TextProps>(
  (
    {
      size = 'm',
      title,
      description,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-text', className].filter(Boolean).join(' ')}
        data-size={size}
      >
        {title && <span className="dls-text__title">{title}</span>}
        <span className="dls-text__description">{description}</span>
      </div>
    );
  },
);

Text.displayName = 'Text';
