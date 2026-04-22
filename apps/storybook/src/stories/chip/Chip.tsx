import React from 'react';
import { X as XIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
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
  /** Show trailing cross icon */
  cross?: boolean;
  size?: ChipSize;
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
      cross,
      size = 'm',
      className,
    },
    ref,
  ) => {
    const hasAvatar = !!(avatar || stackedAvatars);
    const avatarSize = AVATAR_SIZE_MAP[size];

    return (
      <div
        ref={ref}
        className={['dls-chip', className].filter(Boolean).join(' ')}
        data-size={size}
        data-has-avatar={hasAvatar || undefined}
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

        {/* Trailing: cross */}
        {cross && (
          <span className="dls-chip__icon">
            <XIcon />
          </span>
        )}

        {/* Trailing: chevron */}
        {chevron && (
          <span className="dls-chip__icon">
            <ChevronDownIcon />
          </span>
        )}
      </div>
    );
  },
);

Chip.displayName = 'Chip';
