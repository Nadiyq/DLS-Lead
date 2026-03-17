import React from 'react';
import { Avatar } from '../Avatar';
import { XIcon, ChevronDown } from './chip-icons';
import './chip.css';

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
   Size map: chip size → avatar size token
   --------------------------------------------------------------------------- */

const AVATAR_SIZE_MAP: Record<ChipSize, '24' | '20'> = {
  m: '24',
  s: '20',
  xs: '20',
};

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
    const avatarSize = AVATAR_SIZE_MAP[size];

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

        {/* Leading: single avatar — uses DLS Avatar component */}
        {avatar && (
          <Avatar
            size={avatarSize}
            src={avatar.src}
            initials={avatar.initials}
            className="dls-chip__avatar"
          />
        )}

        {/* Leading: stacked avatars — uses DLS Avatar component */}
        {stackedAvatars && stackedAvatars.length > 0 && (
          <span className="dls-chip__stacked">
            {stackedAvatars.map((av, i) => (
              <Avatar
                key={i}
                size={avatarSize}
                src={av.src}
                initials={av.initials}
                className="dls-chip__avatar"
              />
            ))}
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
