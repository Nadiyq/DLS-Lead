import React from 'react';
import './toolbar.css';

/* ---------------------------------------------------------------------------
   Toolbar
   --------------------------------------------------------------------------- */

export interface ToolbarProps {
  /** Sticky mode — flat, no radius, no shadow */
  sticky?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ sticky = false, children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={['dls-toolbar', className].filter(Boolean).join(' ')}
        data-sticky={sticky ? '' : undefined}
        role="toolbar"
        aria-label="Formatting toolbar"
      >
        {children}
      </div>
    );
  },
);

Toolbar.displayName = 'Toolbar';

/* ---------------------------------------------------------------------------
   Toolbar Separator
   --------------------------------------------------------------------------- */

export const ToolbarSeparator = () => (
  <div className="dls-toolbar__separator" role="separator" aria-orientation="vertical" />
);

ToolbarSeparator.displayName = 'ToolbarSeparator';

/* ---------------------------------------------------------------------------
   Toolbar Group
   --------------------------------------------------------------------------- */

export interface ToolbarGroupProps {
  children: React.ReactNode;
}

export const ToolbarGroup = ({ children }: ToolbarGroupProps) => (
  <div className="dls-toolbar__group">{children}</div>
);

ToolbarGroup.displayName = 'ToolbarGroup';

/* ---------------------------------------------------------------------------
   Toolbar Button — icon-only ghost button
   --------------------------------------------------------------------------- */

export interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Active/toggled state */
  active?: boolean;
  /** Accessible label */
  'aria-label': string;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ active, children, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={['dls-toolbar__button', className].filter(Boolean).join(' ')}
        data-active={active ? '' : undefined}
        aria-pressed={active}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

ToolbarButton.displayName = 'ToolbarButton';

/* ---------------------------------------------------------------------------
   Toolbar Text Button — ghost button with label + optional icons
   --------------------------------------------------------------------------- */

export interface ToolbarTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label */
  label: string;
  /** Icon before label */
  iconStart?: React.ReactNode;
  /** Icon after label */
  iconEnd?: React.ReactNode;
}

export const ToolbarTextButton = React.forwardRef<HTMLButtonElement, ToolbarTextButtonProps>(
  ({ label, iconStart, iconEnd, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={['dls-toolbar__text-button', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {iconStart}
        <span>{label}</span>
        {iconEnd}
      </button>
    );
  },
);

ToolbarTextButton.displayName = 'ToolbarTextButton';
