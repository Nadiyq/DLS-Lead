import React from 'react';
import './grid.css';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Labels for the primary axis (y-axis in vertical, x-axis in horizontal). */
  labels?: string[];
  /** Labels for the secondary axis (x-axis in vertical, y-axis in horizontal). */
  secondaryLabels?: string[];
  /** Show the primary axis labels. */
  showPrimaryAxis?: boolean;
  /** Show the secondary axis labels. */
  showSecondaryAxis?: boolean;
  /** Horizontal bar chart layout — grid lines run vertically. */
  horizontal?: boolean;
  /** Additional class name. */
  className?: string;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      labels = ['70', '60', '50', '40', '30', '20', '10', '0'],
      secondaryLabels = ['1 Jan', '7 Jan', '14 Jan', '21 Jan', '28 Jan'],
      showPrimaryAxis = true,
      showSecondaryAxis = true,
      horizontal = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={['dls-grid', className].filter(Boolean).join(' ')}
        role="presentation"
        {...(horizontal ? { 'data-horizontal': '' } : {})}
        {...(showPrimaryAxis ? (horizontal ? { 'data-x-axis': '' } : { 'data-y-axis': '' }) : {})}
        {...(showSecondaryAxis ? (horizontal ? { 'data-y-axis': '' } : { 'data-x-axis': '' }) : {})}
        {...props}
      >
        <div className="dls-grid__body">
          {labels.map((label, i) => (
            <div className="dls-grid__row" key={`${label}-${i}`}>
              {!horizontal && showPrimaryAxis && (
                <span className="dls-grid__label">{label}</span>
              )}
              <hr className="dls-grid__line" />
              {horizontal && showPrimaryAxis && (
                <span className="dls-grid__label">{label}</span>
              )}
            </div>
          ))}
        </div>
        {showSecondaryAxis && secondaryLabels.length > 0 && (
          <div className="dls-grid__x-axis">
            {secondaryLabels.map((label, i) => (
              <span className="dls-grid__x-axis-label" key={`${label}-${i}`}>
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Grid.displayName = 'Grid';
