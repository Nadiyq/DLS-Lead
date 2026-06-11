import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect, userEvent } from 'storybook/test';
import { TREND_CHART_TYPES, TrendChart, type TrendChartType } from './TrendChart';

const meta = {
  title: 'Components/TrendChart',
  component: TrendChart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    dot: { control: 'boolean' },
    grid: { control: 'boolean' },
    legend: { control: 'boolean' },
    smooth: { control: 'boolean' },
    type: { control: 'select', options: TREND_CHART_TYPES },
  },
  args: {
    dot: true,
    grid: true,
    legend: true,
    smooth: false,
    type: 'single',
  },
} satisfies Meta<typeof TrendChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const trendChartStoryWidth = 'calc(var(--dls-spacing-16) * 12 + var(--dls-spacing-8))';

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(2, ${trendChartStoryWidth})`,
      gap: 'var(--dls-spacing-8)',
      padding: 'var(--dls-spacing-8)',
    }}
  >
    {children}
  </div>
);

const getComputedColor = (element: Element, property: string) => (
  element.ownerDocument.defaultView?.getComputedStyle(element).getPropertyValue(property).trim()
);

const getElementCenter = (element: Element) => {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

export const Playground: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('group', { name: /^single series straight trend chart$/i })).toBeVisible();
    await expect(canvas.getByRole('group', { name: /single series straight trend chart plot/i })).toBeVisible();
    await expect(canvas.getByRole('list', { name: 'Trend chart legend' })).toBeVisible();
    await expect(canvasElement.querySelectorAll('.dls-trend-chart__line')).toHaveLength(1);
    const point = canvasElement.querySelector('.dls-trend-chart__dot');
    await expect(point).not.toBeNull();
    await userEvent.hover(point as Element);
    const tooltip = canvas.getByRole('tooltip', { name: 'Chart tooltip' });
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('data-pointer-placement', 'bottom');
    const pointsLayer = canvasElement.querySelector('.dls-trend-chart__points');
    const marker = canvasElement.querySelector('.dls-trend-chart__dot-marker');
    await expect(pointsLayer).not.toBeNull();
    await expect(marker).not.toBeNull();
    const pointsRect = (pointsLayer as Element).getBoundingClientRect();
    const markerCenter = getElementCenter(marker as Element);
    await expect(Math.abs(markerCenter.x - (pointsRect.left + pointsRect.width * 0.715))).toBeLessThan(1);
    await expect(Math.abs(markerCenter.y - (pointsRect.top + pointsRect.height * 0.381))).toBeLessThan(1);
    const line = canvasElement.querySelector('.dls-trend-chart__line[data-series="danger"]');
    const swatch = canvasElement.querySelector('.dls-tooltip-group .dls-legend-item__swatch');
    await expect(line).not.toBeNull();
    await expect(swatch).not.toBeNull();
    await expect(getComputedColor(swatch as Element, 'background-color')).toBe(
      getComputedColor(line as Element, 'stroke'),
    );
  },
};

export const FigmaMatrix: Story = {
  render: () => (
    <Matrix>
      <TrendChart type="single" />
      <TrendChart type="single" smooth />
      <TrendChart type="multiple" />
      <TrendChart type="multiple" smooth />
    </Matrix>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.dls-trend-chart')).toHaveLength(4);
    await expect(canvasElement.querySelectorAll('.dls-trend-chart__line')).toHaveLength(6);
    await expect(canvasElement.querySelectorAll('.dls-trend-chart__dot')).toHaveLength(6);
  },
};

export const SingleSmooth: Story = {
  args: {
    smooth: true,
  },
};

export const MultipleStraight: Story = {
  args: {
    type: 'multiple',
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('group', { name: /^multiple series straight trend chart$/i })).toBeVisible();
    await expect(canvasElement.querySelectorAll('.dls-trend-chart__line')).toHaveLength(2);
    const greenPoint = canvas.getByRole('button', { name: 'Item 2: 120' });
    await userEvent.hover(greenPoint);
    const tooltip = canvas.getByRole('tooltip', { name: 'Chart tooltip' });
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('data-pointer-placement', 'bottom');
    const pointsLayer = canvasElement.querySelector('.dls-trend-chart__points');
    const marker = canvasElement.querySelector(
      '.dls-trend-chart__dot[data-series="green"] .dls-trend-chart__dot-marker',
    );
    await expect(pointsLayer).not.toBeNull();
    await expect(marker).not.toBeNull();
    const pointsRect = (pointsLayer as Element).getBoundingClientRect();
    const markerCenter = getElementCenter(marker as Element);
    await expect(Math.abs(markerCenter.x - (pointsRect.left + pointsRect.width * 0.715))).toBeLessThan(1);
    await expect(Math.abs(markerCenter.y - (pointsRect.top + pointsRect.height * 0.646))).toBeLessThan(1);
  },
};

export const MultipleSmooth: Story = {
  args: {
    type: 'multiple',
    smooth: true,
  },
};

export const WithoutGrid: Story = {
  args: {
    grid: false,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.dls-grid')).toBeNull();
  },
};

export const WithoutDots: Story = {
  args: {
    dot: false,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.dls-trend-chart__dot')).toBeNull();
  },
};

export const WithoutLegend: Story = {
  args: {
    legend: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('list', { name: 'Trend chart legend' })).toBeNull();
  },
};

export const Types: Story = {
  render: () => (
    <Matrix>
      {TREND_CHART_TYPES.map((type: TrendChartType) => (
        <TrendChart key={`${type}-straight`} type={type} />
      ))}
      {TREND_CHART_TYPES.map((type: TrendChartType) => (
        <TrendChart key={`${type}-smooth`} type={type} smooth />
      ))}
    </Matrix>
  ),
};
