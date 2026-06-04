import React from 'react';
import {
  Minus as MinusIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  type LucideIcon,
} from 'lucide-react';
import './summary-item.css';

export type SummaryItemType = 'positive' | 'negative' | 'no-changes';

const TREND_ICONS: Record<SummaryItemType, LucideIcon> = {
  positive: TrendingUpIcon,
  negative: TrendingDownIcon,
  'no-changes': MinusIcon,
};

export interface SummaryItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Primary metric value. */
  value?: string | null;
  /** Supporting metric label. */
  label?: string | null;
  /** Trend value shown beside the icon. */
  trendValue?: string | null;
  /** Trend direction/meaning. */
  type?: SummaryItemType;
  /** Render only the trend line without the value and label. */
  onlyTrend?: boolean;
  /** Additional class name for the root summary item. */
  className?: string;
}

const getTrendValue = (type: SummaryItemType, trendValue: string | null | undefined) => {
  if (trendValue !== null && trendValue !== undefined) {
    return trendValue;
  }

  return type === 'no-changes' ? '0%' : '5%';
};

export const SummaryItem = React.forwardRef<HTMLDivElement, SummaryItemProps>(
  (
    {
      value = '50%',
      label = 'Label',
      trendValue,
      type = 'positive',
      onlyTrend = false,
      className,
      ...props
    },
    ref,
  ) => {
    const TrendIcon = TREND_ICONS[type];
    const resolvedTrendValue = getTrendValue(type, trendValue);
    const showValue = value !== null && value !== '';
    const showLabel = label !== null && label !== '';
    const showTrend = resolvedTrendValue !== '';

    return (
      <div
        ref={ref}
        className={['dls-summary-item', className].filter(Boolean).join(' ')}
        data-type={type}
        data-only-trend={onlyTrend ? 'true' : 'false'}
        {...props}
      >
        {!onlyTrend && (
          <>
            <div className="dls-summary-item__top">
              {showValue && <span className="dls-summary-item__value">{value}</span>}
              {showTrend && (
                <span className="dls-summary-item__trend">
                  <TrendIcon className="dls-summary-item__trend-icon" aria-hidden="true" />
                  <span className="dls-summary-item__trend-text">{resolvedTrendValue}</span>
                </span>
              )}
            </div>
            {showLabel && <span className="dls-summary-item__label">{label}</span>}
          </>
        )}

        {onlyTrend && showTrend && (
          <span className="dls-summary-item__trend">
            <TrendIcon className="dls-summary-item__trend-icon" aria-hidden="true" />
            <span className="dls-summary-item__trend-text">{resolvedTrendValue}</span>
          </span>
        )}
      </div>
    );
  },
);

SummaryItem.displayName = 'SummaryItem';
