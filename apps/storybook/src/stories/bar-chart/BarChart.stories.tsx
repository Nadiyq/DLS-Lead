import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect, userEvent } from 'storybook/test';
import { BAR_CHART_TYPES, BarChart, type BarChartType } from './BarChart';

const meta = {
  title: 'Components/BarChart',
  component: BarChart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    grid: { control: 'boolean' },
    horizontal: { control: 'boolean' },
    legend: { control: 'boolean' },
    type: { control: 'select', options: BAR_CHART_TYPES },
  },
  args: {
    grid: true,
    horizontal: true,
    legend: true,
    type: 'negative',
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const horizontalStoryWidth = 'calc(var(--dls-spacing-16) * 10 + var(--dls-spacing-14) + var(--dls-spacing-1) + calc(var(--dls-spacing-0-5) / 2))';
const verticalStoryWidth = 'calc(var(--dls-spacing-16) * 8 + var(--dls-spacing-12) + var(--dls-spacing-0-5))';
const figmaMatrixOrder: BarChartType[] = ['negative', 'default', 'stacked', 'multiple'];

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `${horizontalStoryWidth} ${verticalStoryWidth}`,
      columnGap: 'var(--dls-spacing-8)',
      rowGap: 'calc(var(--dls-spacing-16) * 2 + var(--dls-spacing-8))',
      alignItems: 'start',
      justifyItems: 'center',
      padding: 'var(--dls-spacing-6)',
    }}
  >
    {children}
  </div>
);

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      gap: 'var(--dls-spacing-8)',
      alignItems: 'start',
      padding: 'var(--dls-spacing-8)',
    }}
  >
    {children}
  </div>
);

const getComputedColor = (element: Element, property: string) => (
  element.ownerDocument.defaultView?.getComputedStyle(element).getPropertyValue(property).trim()
);

export const Playground: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('group', { name: 'horizontal negative bar chart' })).toBeVisible();
    await expect(canvas.getByRole('group', { name: 'horizontal negative bar chart plot' })).toBeVisible();
    await expect(canvas.getByRole('list', { name: 'Chart legend' })).toBeVisible();
    await expect(canvasElement.querySelectorAll('.dls-bar-chart__bar')).toHaveLength(6);
    const bar = canvasElement.querySelector('.dls-bar-chart__bar');
    await expect(bar).not.toBeNull();
    await userEvent.hover(bar as Element);
    const tooltip = canvas.getByRole('tooltip', { name: 'Chart tooltip' });
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('data-pointer-placement', 'bottom');
    const swatches = canvasElement.querySelectorAll('.dls-tooltip-group .dls-legend-item__swatch');
    const positive = canvasElement.querySelector('.dls-bar-chart__negative-positive');
    const negative = canvasElement.querySelector('.dls-bar-chart__negative-negative');
    await expect(swatches).toHaveLength(2);
    await expect(positive).not.toBeNull();
    await expect(negative).not.toBeNull();
    await expect(getComputedColor(swatches[0], 'background-color')).toBe(
      getComputedColor(positive as Element, 'background-color'),
    );
    await expect(getComputedColor(swatches[1], 'background-color')).toBe(
      getComputedColor(negative as Element, 'background-color'),
    );
  },
};

export const FigmaMatrix: Story = {
  render: () => (
    <Matrix>
      {figmaMatrixOrder.flatMap((type: BarChartType) => [
        <BarChart key={`${type}-horizontal`} type={type} horizontal />,
        <BarChart key={`${type}-vertical`} type={type} horizontal={false} />,
      ])}
    </Matrix>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.dls-bar-chart')).toHaveLength(8);
    await expect(canvasElement.querySelectorAll('.dls-bar-chart__chart')).toHaveLength(8);
    await expect(canvas.getAllByRole('list', { name: 'Chart legend' })).toHaveLength(8);
    await expect(canvasElement.querySelectorAll('.dls-bar-chart__chart')).toHaveLength(8);
    await expect(canvasElement.querySelectorAll('.dls-bar-chart__bar')).toHaveLength(48);
  },
};

export const DefaultHorizontal: Story = {
  args: {
    type: 'default',
  },
  play: async ({ canvas, canvasElement }) => {
    const bar = canvasElement.querySelector('.dls-bar-chart__bar');
    await expect(bar).not.toBeNull();
    await userEvent.hover(bar as Element);
    const tooltip = canvas.getByRole('tooltip', { name: 'Chart tooltip' });
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('data-pointer-placement', 'bottom');
    const swatch = canvasElement.querySelector('.dls-tooltip-group .dls-legend-item__swatch');
    const segment = canvasElement.querySelector('.dls-bar-chart-item__segment[data-segment="default"]');
    await expect(swatch).not.toBeNull();
    await expect(segment).not.toBeNull();
    await expect(getComputedColor(swatch as Element, 'background-color')).toBe(
      getComputedColor(segment as Element, 'background-color'),
    );
  },
};

export const MultipleHorizontal: Story = {
  args: {
    type: 'multiple',
  },
  play: async ({ canvas, canvasElement }) => {
    const bar = canvasElement.querySelector('.dls-bar-chart__bar');
    await expect(bar).not.toBeNull();
    await userEvent.hover(bar as Element);
    const tooltip = canvas.getByRole('tooltip', { name: 'Chart tooltip' });
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('data-pointer-placement', 'bottom');
    const swatches = canvasElement.querySelectorAll('.dls-tooltip-group .dls-legend-item__swatch');
    const orange = canvasElement.querySelector('.dls-bar-chart__item[data-series="orange"] .dls-bar-chart-item__segment');
    const teal = canvasElement.querySelector('.dls-bar-chart__item[data-series="teal"] .dls-bar-chart-item__segment');
    await expect(swatches).toHaveLength(2);
    await expect(orange).not.toBeNull();
    await expect(teal).not.toBeNull();
    await expect(getComputedColor(swatches[0], 'background-color')).toBe(
      getComputedColor(orange as Element, 'background-color'),
    );
    await expect(getComputedColor(swatches[1], 'background-color')).toBe(
      getComputedColor(teal as Element, 'background-color'),
    );
  },
};

export const StackedHorizontal: Story = {
  args: {
    type: 'stacked',
  },
  play: async ({ canvas, canvasElement }) => {
    const bar = canvasElement.querySelector('.dls-bar-chart__bar');
    await expect(bar).not.toBeNull();
    await userEvent.hover(bar as Element);
    const tooltip = canvas.getByRole('tooltip', { name: 'Chart tooltip' });
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('data-pointer-placement', 'bottom');
    const swatches = canvasElement.querySelectorAll('.dls-tooltip-group .dls-legend-item__swatch');
    const primary = canvasElement.querySelector('.dls-bar-chart-item__segment[data-segment="stack-primary"]');
    const secondary = canvasElement.querySelector('.dls-bar-chart-item__segment[data-segment="stack-secondary"]');
    await expect(swatches).toHaveLength(2);
    await expect(primary).not.toBeNull();
    await expect(secondary).not.toBeNull();
    await expect(getComputedColor(swatches[0], 'background-color')).toBe(
      getComputedColor(primary as Element, 'background-color'),
    );
    await expect(getComputedColor(swatches[1], 'background-color')).toBe(
      getComputedColor(secondary as Element, 'background-color'),
    );
  },
};

export const NegativeVertical: Story = {
  args: {
    horizontal: false,
    type: 'negative',
  },
};

export const TypesHorizontal: Story = {
  render: () => (
    <Stack>
      {BAR_CHART_TYPES.map((type) => (
        <BarChart key={type} type={type} horizontal />
      ))}
    </Stack>
  ),
};

export const TypesVertical: Story = {
  render: () => (
    <Stack>
      {BAR_CHART_TYPES.map((type) => (
        <BarChart key={type} type={type} horizontal={false} />
      ))}
    </Stack>
  ),
};

export const WithoutGrid: Story = {
  args: {
    grid: false,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.dls-grid')).toBeNull();
  },
};

export const WithoutLegend: Story = {
  args: {
    legend: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('list', { name: 'Chart legend' })).toBeNull();
  },
};
