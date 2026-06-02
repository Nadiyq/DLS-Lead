import React from 'react';
import { Info as InfoIcon } from 'lucide-react';
import './progress-bar.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ProgressBarType = 'continuous' | 'segmented';
export type ProgressBarSize = 'xs' | 's' | 'm';

export interface ProgressBarProps {
  /** Display type */
  type?: ProgressBarType;
  /** Progress value (0–100) */
  value: number;
  /** Number of segments (for type="segmented") */
  segments?: number;
  /** Show percentage label (continuous only) */
  showLabel?: boolean;
  /** Hint label text (segmented only) */
  hintLabel?: string;
  /** Show hint info icon (segmented only) */
  showHintIcon?: boolean;
  /** Fixed size for small variant (omit for full-width) */
  size?: ProgressBarSize;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      type = 'continuous',
      value,
      segments = 4,
      showLabel = true,
      hintLabel,
      showHintIcon = false,
      size,
      className,
    },
    ref,
  ) => {
    const clamped = Math.max(0, Math.min(100, value));
    const filledSegments = Math.round((clamped / 100) * segments);
    const isEmpty = clamped === 0;

    return (
      <div
        ref={ref}
        className={['dls-progress-bar', className].filter(Boolean).join(' ')}
        data-type={type}
        data-size={size || undefined}
        role="progressbar"
        aria-label={type === 'segmented' && hintLabel ? hintLabel : 'Progress'}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="dls-progress-bar__bar">
          {type === 'continuous' ? (
            <div
              className="dls-progress-bar__fill"
              style={{ width: `${Math.max(clamped, 2)}%` }}
            />
          ) : (
            Array.from({ length: segments }, (_, i) => (
              <div
                key={i}
                className="dls-progress-bar__segment"
                data-filled={i < filledSegments ? 'true' : undefined}
              />
            ))
          )}
        </div>

        {type === 'continuous' && showLabel && !size && (
          <span
            className="dls-progress-bar__label"
            data-empty={isEmpty ? 'true' : undefined}
          >
            {clamped}%
          </span>
        )}

        {type === 'segmented' && (hintLabel || showHintIcon) && (
          <div className="dls-progress-bar__hint">
            {hintLabel && (
              <span className="dls-progress-bar__hint-label">{hintLabel}</span>
            )}
            {showHintIcon && (
              <span className="dls-progress-bar__hint-icon"><InfoIcon /></span>
            )}
          </div>
        )}
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
