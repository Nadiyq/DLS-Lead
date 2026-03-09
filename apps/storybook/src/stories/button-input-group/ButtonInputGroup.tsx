import React from 'react';
import './button-input-group.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ButtonInputGroupSize = 's' | 'm';

export interface ButtonInputGroupProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Button label(s): string for one side, [start, end] for both */
  buttonLabel: string | [string, string];
  /** Button position relative to input */
  location?: 'start' | 'end' | 'both';
  /** Size */
  size?: ButtonInputGroupSize;
  /** Start button click */
  onStartClick?: React.MouseEventHandler;
  /** End button click */
  onEndClick?: React.MouseEventHandler;
  /** Start button disabled */
  startDisabled?: boolean;
  /** End button disabled */
  endDisabled?: boolean;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const ButtonInputGroup = React.forwardRef<HTMLInputElement, ButtonInputGroupProps>(
  (
    {
      buttonLabel,
      location = 'start',
      size = 'm',
      onStartClick,
      onEndClick,
      startDisabled,
      endDisabled,
      disabled,
      className,
      ...inputProps
    },
    ref,
  ) => {
    const startLabel = Array.isArray(buttonLabel) ? buttonLabel[0] : buttonLabel;
    const endLabel = Array.isArray(buttonLabel) ? buttonLabel[1] : buttonLabel;
    const showStart = location === 'start' || location === 'both';
    const showEnd = location === 'end' || location === 'both';

    return (
      <div
        className={['dls-button-input-group', className].filter(Boolean).join(' ')}
        data-size={size}
        data-disabled={disabled || undefined}
      >
        {showStart && (
          <>
            <button
              type="button"
              className="dls-button-input-group__button"
              onClick={onStartClick}
              disabled={disabled || startDisabled}
            >
              {startLabel}
            </button>
            <span className="dls-button-input-group__divider" />
          </>
        )}

        <input
          ref={ref}
          className="dls-button-input-group__input"
          disabled={disabled}
          {...inputProps}
        />

        {showEnd && (
          <>
            <span className="dls-button-input-group__divider" />
            <button
              type="button"
              className="dls-button-input-group__button"
              onClick={onEndClick}
              disabled={disabled || endDisabled}
            >
              {endLabel}
            </button>
          </>
        )}
      </div>
    );
  },
);

ButtonInputGroup.displayName = 'ButtonInputGroup';
