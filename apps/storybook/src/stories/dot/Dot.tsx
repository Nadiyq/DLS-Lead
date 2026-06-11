import React from 'react';
import './dot.css';

export const DOT_SIZES = ['xs', 's', 'm'] as const;
export const DOT_INTENTS = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] as const;

export type DotSize = (typeof DOT_SIZES)[number];
export type DotIntent = (typeof DOT_INTENTS)[number];

export interface DotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Marker size from the Figma dot component. */
  size?: DotSize;
  /** Show the numeric label above the chart marker. */
  label?: boolean;
  /** Numeric label text shown when label is true. */
  text?: string;
  /** Semantic color for the filled marker. */
  intent?: DotIntent;
  /** Additional class name for the root dot. */
  className?: string;
}

export const Dot = React.forwardRef<HTMLSpanElement, DotProps>(
  (
    {
      size = 'xs',
      label = true,
      text = '120',
      intent = 'danger',
      className,
      ...props
    },
    ref,
  ) => {
    const showLabel = label && text !== '';

    return (
      <span
        ref={ref}
        className={['dls-dot', className].filter(Boolean).join(' ')}
        data-size={size}
        data-intent={intent}
        {...props}
      >
        {showLabel && <span className="dls-dot__label">{text}</span>}
        <span className="dls-dot__marker" aria-hidden="true" />
      </span>
    );
  },
);

Dot.displayName = 'Dot';
