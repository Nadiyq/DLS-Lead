import React from 'react';
import { X as XIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { Chip, type ChipSize, type ChipAvatar, type DotIntent } from './Chip';
import './chip-regular.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ChipRegularVariant = 'filled' | 'outline' | 'soft' | 'dot';
export type ChipRegularIntent = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type ChipRegularSize = ChipSize;

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
  /** Avatar (single) */
  avatar?: ChipAvatar;
  /** Show trailing chevron as second part */
  chevron?: boolean;
  /** Remove callback — shows trailing cross as second part */
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
      avatar,
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
    const hasSecondPart = !!chevron || !!onRemove;

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
        {/* Part 1: content — Chip building block */}
        <Chip
          label={label}
          dot={isDot ? (intent as DotIntent) : undefined}
          leadingIcon={leadingIcon}
          avatar={avatar}
          size={size}
        />

        {/* Part 2: action — chevron or cross */}
        {hasSecondPart && (
          <button
            type="button"
            className="dls-chip-regular__action"
            disabled={disabled}
            onClick={onRemove ? (e) => { e.stopPropagation(); onRemove(e); } : undefined}
            aria-label={onRemove ? `Remove ${label}` : undefined}
          >
            {onRemove ? <XIcon /> : <ChevronDownIcon />}
          </button>
        )}
      </div>
    );
  },
);

ChipRegular.displayName = 'ChipRegular';
