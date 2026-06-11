import React from 'react';
import './pie.css';

export const PIE_SEGMENT_IDS = ['pink', 'teal', 'cinnamon', 'blue', 'yellow'] as const;

export type PieSegmentId = (typeof PIE_SEGMENT_IDS)[number];

export interface PieSegment {
  id: PieSegmentId;
  label: string;
  value: string;
  startAngle: number;
  endAngle: number;
}

export interface PieProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Show white borders between pie segments. */
  stroke?: boolean;
  /** Additional class name for the root pie chart. */
  className?: string;
}

const CENTER = 110;
const RADIUS = 110;

const summarySegments: Array<Pick<PieSegment, 'label' | 'value'>> = [
  { label: 'Pink', value: '65' },
  { label: 'Teal', value: '60' },
  { label: 'Cinnamon', value: '90' },
  { label: 'Blue', value: '20' },
  { label: 'Yellow', value: '65' },
];

export const PIE_SEGMENTS: PieSegment[] = [
  { id: 'cinnamon', label: 'Cinnamon', value: '90', startAngle: 0, endAngle: 108 },
  { id: 'blue', label: 'Blue', value: '20', startAngle: 108, endAngle: 145 },
  { id: 'yellow', label: 'Yellow', value: '65', startAngle: 145, endAngle: 215 },
  { id: 'pink', label: 'Pink', value: '65', startAngle: 215, endAngle: 289 },
  { id: 'teal', label: 'Teal', value: '60', startAngle: 289, endAngle: 360 },
];

const round = (value: number) => Number(value.toFixed(3));

const polarToCartesian = (angle: number) => {
  const radians = (angle * Math.PI) / 180;

  return {
    x: round(CENTER + RADIUS * Math.cos(radians)),
    y: round(CENTER + RADIUS * Math.sin(radians)),
  };
};

const describeSegment = (startAngle: number, endAngle: number) => {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
};

export const PIE_SEGMENT_PATHS = PIE_SEGMENTS.map((segment) => ({
  ...segment,
  path: describeSegment(segment.startAngle, segment.endAngle),
}));

const getDefaultAriaLabel = (stroke: boolean) => {
  const borderPart = stroke ? ' with segment borders' : '';
  const values = summarySegments.map((segment) => `${segment.label} ${segment.value}`).join(', ');

  return `Pie chart${borderPart}: ${values}`;
};

export const Pie = React.forwardRef<HTMLDivElement, PieProps>(
  (
    {
      stroke = false,
      className,
      role = 'img',
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={['dls-pie', className].filter(Boolean).join(' ')}
      data-stroke={stroke ? 'true' : 'false'}
      role={role}
      aria-label={ariaLabel ?? getDefaultAriaLabel(stroke)}
      {...props}
    >
      <svg className="dls-pie__svg" viewBox="0 0 220 220" aria-hidden="true" focusable="false">
        {PIE_SEGMENT_PATHS.map((segment) => (
          <path
            className="dls-pie__segment"
            data-segment={segment.id}
            d={segment.path}
            key={segment.id}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  ),
);

Pie.displayName = 'Pie';
