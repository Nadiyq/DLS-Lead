import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect, userEvent } from 'storybook/test';
import { DonutChart } from './DonutChart';

const meta = {
  title: 'Components/DonutChart',
  component: DonutChart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    hover: { control: 'boolean' },
    legend: { control: 'boolean' },
    legendBottom: { control: 'boolean' },
    text: { control: 'boolean' },
    totalText: { control: 'text' },
    unitText: { control: 'text' },
    legendItems: { control: 'object' },
  },
  args: {
    hover: false,
    legend: true,
    legendBottom: false,
    text: true,
    totalText: '1000',
    unitText: 'Unit',
  },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const matrixColumnWidth = 'calc(var(--dls-spacing-16) * 5 + var(--dls-spacing-6) + var(--dls-spacing-0-5))';

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(2, ${matrixColumnWidth})`,
      columnGap: 'var(--dls-spacing-8)',
      rowGap: 'calc(var(--dls-spacing-14) + var(--dls-spacing-1))',
      alignItems: 'start',
      justifyItems: 'center',
      padding: 'var(--dls-spacing-6)',
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
    await expect(canvas.getByRole('group', { name: 'Donut chart with side legend' })).toBeVisible();
    await expect(canvas.getByRole('group', { name: /Donut chart plot: total 1000 Unit/ })).toBeVisible();
    await expect(canvas.getByRole('list', { name: 'Chart legend' })).toBeVisible();
    await expect(canvas.getByText('1000')).toBeVisible();
    await expect(canvasElement.querySelectorAll('.dls-donut-chart__segment')).toHaveLength(5);
    const segment = canvasElement.querySelector('.dls-donut-chart__segment');
    await expect(segment).not.toBeNull();
    await userEvent.hover(segment as Element);
    const tooltip = canvas.getByRole('tooltip', { name: 'Chart tooltip' });
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('data-pointer-placement', 'bottom');
    const swatch = canvasElement.querySelector('.dls-tooltip-group .dls-legend-item__swatch');
    await expect(swatch).not.toBeNull();
    await expect(getComputedColor(swatch as Element, 'background-color')).toBe(
      getComputedColor(segment as Element, 'fill'),
    );
  },
};

export const FigmaMatrix: Story = {
  render: () => (
    <Matrix>
      <DonutChart />
      <DonutChart hover />
      <DonutChart legendBottom />
      <DonutChart legendBottom hover />
    </Matrix>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.dls-donut-chart')).toHaveLength(4);
    await expect(canvasElement.querySelectorAll('.dls-donut-chart__plot')).toHaveLength(4);
    await expect(canvas.getAllByRole('list', { name: 'Chart legend' })).toHaveLength(4);
    await expect(canvasElement.querySelectorAll('.dls-donut-chart__segment')).toHaveLength(20);
    await expect(canvasElement.querySelectorAll('.dls-donut-chart[data-hover="true"]')).toHaveLength(2);
  },
};

export const LegendSide: Story = {};

export const LegendBottom: Story = {
  args: {
    legendBottom: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('group', { name: 'Donut chart with bottom legend' })).toBeVisible();
    await expect(canvas.getByRole('list', { name: 'Chart legend' })).toBeVisible();
  },
};

export const Hovered: Story = {
  args: {
    hover: true,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('group', { name: 'Donut chart with side legend' })).toBeVisible();
    await expect(canvasElement.querySelector('.dls-donut-chart')).toHaveAttribute('data-hover', 'true');
    await expect(canvasElement.querySelector('.dls-donut-chart__segment[data-active="true"]')).toBeNull();
    const segment = canvasElement.querySelector('.dls-donut-chart__segment[data-segment="teal"]');
    await expect(segment).not.toBeNull();
    await userEvent.hover(segment as Element);
    const tooltip = canvas.getByRole('tooltip', { name: 'Chart tooltip' });
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('data-pointer-placement', 'bottom');
    const swatch = canvasElement.querySelector('.dls-tooltip-group .dls-legend-item__swatch');
    await expect(swatch).not.toBeNull();
    await expect(getComputedColor(swatch as Element, 'background-color')).toBe(
      getComputedColor(segment as Element, 'fill'),
    );
  },
};

export const WithoutLegend: Story = {
  args: {
    legend: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('group', { name: 'Donut chart' })).toBeVisible();
    await expect(canvas.queryByRole('list', { name: 'Chart legend' })).toBeNull();
  },
};

export const WithoutText: Story = {
  args: {
    text: false,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.queryByText('1000')).toBeNull();
    await expect(canvasElement.querySelectorAll('.dls-donut-chart__segment')).toHaveLength(5);
  },
};

export const CustomTotal: Story = {
  args: {
    totalText: '875',
    unitText: 'Leads',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('875')).toBeVisible();
    await expect(canvas.getByText('Leads')).toBeVisible();
  },
};
