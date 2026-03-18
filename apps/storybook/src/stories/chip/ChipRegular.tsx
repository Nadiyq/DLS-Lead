import React from 'react';
import { XIcon, ChevronDown } from './chip-icons';
import './chip-regular.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ChipRegularVariant = 'filled' | 'outline' | 'soft' | 'dot';
export type ChipRegularIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export type ChipRegularSize = 'xs' | 's' | 'm';

export interface ChipRegularProps {
  /** Primary label */
  label: string;
  /** Visual variant */
  variant?: ChipRegularVariant;
  /** Color intent */
  intent?: ChipRegularIntent;
  /** Size */
  size?: ChipRegularSize;
  /** Leading icon element */
  leadingIcon?: React.ReactNode;
  /** Show trailing chevron (rendered as a separate segment with divider) */
  chevron?: boolean;
  /** Remove callback — shows trailing X */
  onRemove?: React.MouseEventHandler;
  /** Click handler — makes chip interactive */
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const ChipRegular = React.forwardRef<HTMLDivElement, ChipRegularProps>(
  (
    {
      label,
      variant = 'outline',
      intent = 'neutral',
      size = 'm',
      leadingIcon,
      chevron,
      onRemove,
      onClick,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const isInteractive = !!onClick;
    const isDot = variant === 'dot';
    const hasChevron = !!chevron && !onRemove;

    return (
      <div
        ref={ref}
        className={['dls-chip-regular', className].filter(Boolean).join(' ')}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        data-variant={variant}
        data-intent={intent}
        data-size={size}
        data-disabled={disabled || undefined}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={
          isInteractive && !disabled
            ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(e as unknown as React.MouseEvent); } }
            : undefined
        }
      >
        {/* Content segment — label, icons, remove */}
        <span className="dls-chip-regular__segment">
          {isDot && <span className="dls-chip-regular__dot" />}
          {leadingIcon && <span className="dls-chip-regular__icon">{leadingIcon}</span>}
          <span className="dls-chip-regular__label">{label}</span>
          {onRemove && (
            <button
              type="button"
              className="dls-chip-regular__action"
              disabled={disabled}
              onClick={(e) => { e.stopPropagation(); onRemove(e); }}
              aria-label={`Remove ${label}`}
            >
              <XIcon />
            </button>
          )}
        </span>

        {/* Chevron segment — separate zone with divider */}
        {hasChevron && (
          <span className="dls-chip-regular__segment dls-chip-regular__segment--chevron">
            <ChevronDown />
          </span>
        )}
      </div>
    );
  },
);

ChipRegular.displayName = 'ChipRegular';
