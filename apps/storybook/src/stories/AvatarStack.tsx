import React from 'react';
import './avatar-stack.css';

export type AvatarStackSize = '88' | '80' | '72' | '48' | '40' | '32' | '28' | '24' | '20' | '18';

export interface AvatarStackProps {
  /** Shared size for all avatars in the stack */
  size?: AvatarStackSize;
  /** Avatar elements to render */
  children: React.ReactNode;
  /** Max visible avatars — extra are hidden and counted */
  max?: number;
  /** Total count — if greater than visible, shows +N counter */
  total?: number;
  className?: string;
}

export const AvatarStack = React.forwardRef<HTMLDivElement, AvatarStackProps>(
  ({ size = '48', children, max, total, className, ...props }, ref) => {
    const items = React.Children.toArray(children);
    const visibleCount = max != null ? Math.min(items.length, max) : items.length;
    const visible = items.slice(0, visibleCount);
    const overflow = total != null ? total - visibleCount : items.length - visibleCount;

    return (
      <div
        ref={ref}
        className={['dls-avatar-stack', className].filter(Boolean).join(' ')}
        data-size={size}
        {...props}
      >
        {visible.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement, {
                key: (child as React.ReactElement).key ?? i,
                size,
                circle: true,
              })
            : child,
        )}
        {overflow > 0 && (
          <span className="dls-avatar-stack__counter">+{overflow}</span>
        )}
      </div>
    );
  },
);

AvatarStack.displayName = 'AvatarStack';
