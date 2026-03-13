import React from 'react';
import './kbd.css';

/* ---------------------------------------------------------------------------
   Kbd — single keyboard key
   --------------------------------------------------------------------------- */

export interface KbdProps {
  /** Key label text */
  children: React.ReactNode;
  /** Leading icon */
  iconStart?: React.ReactNode;
  /** Trailing icon */
  iconEnd?: React.ReactNode;
  className?: string;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ children, iconStart, iconEnd, className }, ref) => (
    <kbd
      ref={ref}
      className={['dls-kbd', className].filter(Boolean).join(' ')}
    >
      {iconStart && <span className="dls-kbd__icon">{iconStart}</span>}
      {children}
      {iconEnd && <span className="dls-kbd__icon">{iconEnd}</span>}
    </kbd>
  ),
);

Kbd.displayName = 'Kbd';

/* ---------------------------------------------------------------------------
   KbdGroup — group of keyboard keys
   --------------------------------------------------------------------------- */

export type KbdGroupType = 'regular' | 'separated';

export interface KbdGroupProps {
  /** Group type: regular (adjacent) or separated (with + between keys) */
  type?: KbdGroupType;
  /** Kbd elements */
  children: React.ReactNode;
  className?: string;
}

export const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(
  ({ type = 'regular', children, className }, ref) => {
    const items = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={['dls-kbd-group', className].filter(Boolean).join(' ')}
        data-type={type}
      >
        {type === 'separated'
          ? items.map((child, i) => (
              <React.Fragment key={i}>
                {child}
                {i < items.length - 1 && (
                  <span className="dls-kbd-group__separator">+</span>
                )}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  },
);

KbdGroup.displayName = 'KbdGroup';
