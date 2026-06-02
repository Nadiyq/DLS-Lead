import React from 'react';
import { Avatar } from './Avatar';
import { List } from './list-item/List';
import { ListItem } from './list-item/ListItem';
import './avatar-stack.css';

export type AvatarStackSize = '88' | '80' | '72' | '48' | '40' | '32' | '28' | '24' | '20' | '18';

export interface OverflowUser {
  name: string;
  secondaryText?: string;
  src?: string;
  initials?: string;
}

export interface AvatarStackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Shared size for all avatars in the stack */
  size?: AvatarStackSize;
  /** Avatar elements to render */
  children: React.ReactNode;
  /** Max visible avatars — extra are hidden and counted */
  max?: number;
  /** Total count — if greater than visible, shows +N counter */
  total?: number;
  /** Info for hidden users — shown in the dropdown on counter hover */
  overflowUsers?: OverflowUser[];
  /** Currently selected user index in the overflow list */
  selectedIndex?: number;
  /** Called when the +N counter is clicked */
  onCounterClick?: () => void;
  /** Called when an overflow user is clicked */
  onOverflowUserClick?: (user: OverflowUser, index: number) => void;
  /** Additional class name for the root avatar stack */
  className?: string;
}

function extractOverflowFromChildren(
  items: ReturnType<typeof React.Children.toArray>,
  visibleCount: number,
): OverflowUser[] {
  return items.slice(visibleCount).map((child) => {
    if (!React.isValidElement(child)) return { name: 'User' };
    const p = child.props as Record<string, unknown>;
    const name = (p.alt as string) || (p.initials as string) || 'User';
    return { name, src: p.src as string | undefined, initials: p.initials as string | undefined };
  });
}

export const AvatarStack = React.forwardRef<HTMLDivElement, AvatarStackProps>(
  ({ size = '48', children, max, total, overflowUsers, selectedIndex, onCounterClick, onOverflowUserClick, className, ...props }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const items = React.Children.toArray(children);
    const visibleCount = max != null ? Math.min(items.length, max) : items.length;
    const visible = items.slice(0, visibleCount);
    const overflow = total != null ? total - visibleCount : items.length - visibleCount;

    const hiddenUsers = overflowUsers ?? extractOverflowFromChildren(items, visibleCount);
    const hasDropdown = overflow > 0 && hiddenUsers.length > 0;

    const closeDropdown = () => setIsDropdownOpen(false);

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      const nextTarget = event.relatedTarget as Node | null;
      if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
        closeDropdown();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        closeDropdown();
        event.currentTarget.querySelector<HTMLButtonElement>('.dls-avatar-stack__counter')?.focus();
      }
    };

    return (
      <div
        ref={ref}
        className={['dls-avatar-stack', className].filter(Boolean).join(' ')}
        data-size={size}
        {...props}
      >
        {visible.map((child, i) =>
          React.isValidElement<Record<string, unknown>>(child)
            ? React.cloneElement(child, {
                key: child.key ?? i,
                size,
                circle: true,
              })
            : child,
        )}
        {overflow > 0 && (
          <div
            className="dls-avatar-stack__counter-wrap"
            data-open={isDropdownOpen || undefined}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={closeDropdown}
            onFocusCapture={() => setIsDropdownOpen(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          >
            <button
              type="button"
              className="dls-avatar-stack__counter"
              onClick={() => {
                setIsDropdownOpen(true);
                onCounterClick?.();
              }}
              aria-label={`${overflow} more users`}
              aria-expanded={hasDropdown ? isDropdownOpen : undefined}
              aria-haspopup={hasDropdown ? 'listbox' : undefined}
            >
              +{overflow}
            </button>

            {hasDropdown && (
              <List className="dls-avatar-stack__dropdown">
                {hiddenUsers.map((user, i) => (
                  <ListItem
                    key={i}
                    type={user.secondaryText ? 'two-line-slots' : 'with-slots'}
                    text={user.name}
                    secondaryText={user.secondaryText}
                    slotLeft={
                      <Avatar size="24" circle src={user.src} initials={user.initials} />
                    }
                    selected={selectedIndex === i}
                    onClick={() => {
                      onOverflowUserClick?.(user, i);
                      closeDropdown();
                    }}
                  />
                ))}
              </List>
            )}
          </div>
        )}
      </div>
    );
  },
);

AvatarStack.displayName = 'AvatarStack';
