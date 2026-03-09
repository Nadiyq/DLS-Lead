import React from 'react';
import './chip.css';

/* ---------------------------------------------------------------------------
   Icons
   --------------------------------------------------------------------------- */

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type ChipSize = 'xs' | 's' | 'm';
export type DotIntent = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';

export interface ChipAvatar {
  src?: string;
  initials?: string;
}

export interface ChipProps {
  /** Primary label text */
  label?: string;
  /** Secondary text (icon+two-text type) */
  secondaryLabel?: string;
  /** Leading icon element */
  leadingIcon?: React.ReactNode;
  /** Avatar (single) */
  avatar?: ChipAvatar;
  /** Stacked avatars */
  stackedAvatars?: ChipAvatar[];
  /** Flag emoji (e.g. "🇺🇸") */
  flag?: string;
  /** Dot indicator intent */
  dot?: DotIntent;
  /** Show trailing chevron */
  chevron?: boolean;
  /** Show trailing remove button / callback */
  onRemove?: React.MouseEventHandler;
  /** Click handler — makes chip interactive */
  onClick?: React.MouseEventHandler;
  size?: ChipSize;
  disabled?: boolean;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      secondaryLabel,
      leadingIcon,
      avatar,
      stackedAvatars,
      flag,
      dot,
      chevron,
      onRemove,
      onClick,
      size = 'm',
      disabled = false,
      className,
    },
    ref,
  ) => {
    const hasAvatar = !!(avatar || stackedAvatars);
    const isInteractive = !!onClick;
    const isIconOnly = !label && !secondaryLabel && (!!onRemove || !!chevron);

    const renderAvatar = (av: ChipAvatar, key?: string | number) => (
      <span key={key} className="dls-chip__avatar">
        {av.src ? (
          <img src={av.src} alt="" />
        ) : (
          av.initials
        )}
      </span>
    );

    return (
      <div
        ref={ref}
        className={['dls-chip', className].filter(Boolean).join(' ')}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        data-size={size}
        data-disabled={disabled || undefined}
        data-interactive={isInteractive || undefined}
        data-has-avatar={hasAvatar || undefined}
        data-icon-only={isIconOnly || undefined}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={
          isInteractive && !disabled
            ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(e as unknown as React.MouseEvent); } }
            : undefined
        }
      >
        {/* Leading: dot */}
        {dot && <span className="dls-chip__dot" data-intent={dot} />}

        {/* Leading: flag */}
        {flag && <span className="dls-chip__flag">{flag}</span>}

        {/* Leading: icon */}
        {leadingIcon && <span className="dls-chip__icon">{leadingIcon}</span>}

        {/* Leading: single avatar */}
        {avatar && renderAvatar(avatar)}

        {/* Leading: stacked avatars */}
        {stackedAvatars && stackedAvatars.length > 0 && (
          <span className="dls-chip__stacked">
            {stackedAvatars.map((av, i) => renderAvatar(av, i))}
          </span>
        )}

        {/* Label */}
        {label && <span className="dls-chip__label">{label}</span>}

        {/* Secondary label */}
        {secondaryLabel && <span className="dls-chip__secondary">{secondaryLabel}</span>}

        {/* Trailing: remove (cross) */}
        {onRemove && (
          <button
            type="button"
            className="dls-chip__remove"
            disabled={disabled}
            onClick={(e) => { e.stopPropagation(); onRemove(e); }}
            aria-label={label ? `Remove ${label}` : 'Remove'}
          >
            <XIcon />
          </button>
        )}

        {/* Trailing: chevron */}
        {chevron && !onRemove && (
          <span className="dls-chip__icon">
            <ChevronDown />
          </span>
        )}
      </div>
    );
  },
);

Chip.displayName = 'Chip';
