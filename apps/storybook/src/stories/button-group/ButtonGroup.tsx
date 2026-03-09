import React from 'react';
import './button-group.css';

export type ButtonGroupVariant = 'filled' | 'outline' | 'soft' | 'ghost';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupSize = 'm' | 's';

export interface ButtonGroupProps {
  variant?: ButtonGroupVariant;
  orientation?: ButtonGroupOrientation;
  size?: ButtonGroupSize;
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      variant = 'outline',
      orientation = 'horizontal',
      size = 'm',
      children,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role="group"
      className={['dls-button-group', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-orientation={orientation}
      data-size={size}
      {...props}
    >
      {children}
    </div>
  ),
);

ButtonGroup.displayName = 'ButtonGroup';
