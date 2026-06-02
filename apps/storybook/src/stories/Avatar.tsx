import React from 'react';
import { User as UserIcon, X as XIcon } from 'lucide-react';
import './avatar.css';
export { UserIcon };

export type AvatarSize = '144' | '88' | '80' | '72' | '48' | '40' | '32' | '28' | '24' | '20' | '18';

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
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
  /** Additional class name for the root avatar */
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
      <span className="dls-avatar__icon" aria-hidden="true">{icon}</span>
    ) : initials ? (
      <span className="dls-avatar__initials">{initials}</span>
    ) : null;

    const removeLabel = alt ? `Remove ${alt}` : initials ? `Remove ${initials}` : 'Remove avatar';

    return (
      <div
        ref={ref}
        className={['dls-avatar', className].filter(Boolean).join(' ')}
        data-size={size}
        data-circle={circle || undefined}
        {...props}
      >
        {content}
        {dot && <span className="dls-avatar__dot" aria-hidden="true" />}
        {onRemove && (
          <button
            className="dls-avatar__remove"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            aria-label={removeLabel}
            type="button"
          >
            <XIcon aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
