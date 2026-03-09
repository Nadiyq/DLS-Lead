import React from 'react';
import './avatar.css';

export type AvatarSize = '144' | '88' | '80' | '72' | '48' | '40' | '32' | '28' | '24' | '20' | '18';

export interface AvatarProps {
  /** Pixel size of the avatar */
  size?: AvatarSize;
  /** Render as circle instead of rounded square */
  circle?: boolean;
  /** Image URL — takes priority over icon and initials */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Initials to display (e.g. "AB") — used when no src or icon */
  initials?: string;
  /** Icon element — used when no src provided */
  icon?: React.ReactNode;
  /** Show status dot indicator */
  dot?: boolean;
  /** Called when remove button is clicked — shows X button on hover */
  onRemove?: () => void;
  className?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = '48',
      circle = false,
      src,
      alt,
      initials,
      icon,
      dot = false,
      onRemove,
      className,
      ...props
    },
    ref,
  ) => {
    const content = src ? (
      <img className="dls-avatar__image" src={src} alt={alt || ''} />
    ) : icon ? (
      <span className="dls-avatar__icon">{icon}</span>
    ) : initials ? (
      <span className="dls-avatar__initials">{initials}</span>
    ) : null;

    return (
      <div
        ref={ref}
        className={['dls-avatar', className].filter(Boolean).join(' ')}
        data-size={size}
        data-circle={circle || undefined}
        {...props}
      >
        {content}
        {dot && <span className="dls-avatar__dot" />}
        {onRemove && (
          <button
            className="dls-avatar__remove"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            aria-label="Remove"
            type="button"
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6" fill="var(--dls-color-component-avatar-remove-btn-bg)" />
              <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="var(--dls-color-component-avatar-remove-btn-fg)" strokeWidth="1.33" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';

/** Default user icon for the "icon" content type */
export const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
