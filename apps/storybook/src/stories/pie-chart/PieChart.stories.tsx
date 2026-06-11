import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect, userEvent } from 'storybook/test';
import { PieChart } from './PieChart';

const meta = {
  title: 'Components/PieChart',
  component: PieChart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    stroke: { control: 'boolean' },
    labels: { control: 'boolean' },
    labelCategories: { control: 'boolean' },
    labelStroke: { control: 'boolean' },
    labelItems: { control: 'object' },
    legend: { control: 'boolean' },
    legendBottom: { control: 'boolean' },
    legendItems: { control: 'object' },
  },
  args: {
    stroke: true,
    labels: true,
    labelCategories: false,
    labelStroke: true,
    legend: true,
    legendBottom: false,
  },
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'calc(var(--dls-spacing-14) + var(--dls-spacing-0-5))',
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
    await expect(canvas.getByRole('group', { name: 'Pie chart with side legend' })).toBeVisible();
    await expect(canvas.getByRole('group', { name: /Pie chart plot: Pink 65/ })).toBeVisible();
    await expect(canvas.getByRole('list', { name: 'Chart legend' })).toBeVisible();
    await expect(canvasElement.querySelectorAll('.dls-pie__segment')).toHaveLength(5);
    await expect(canvasElement.querySelectorAll('.dls-pie-chart-labels__leader')).toHaveLength(5);
    const segment = canvasElement.querySelector('.dls-pie-chart__segment');
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
      <PieChart />
      <PieChart legendBottom />
    </Matrix>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.dls-pie-chart')).toHaveLength(2);
    await expect(canvasElement.querySelectorAll('.dls-pie-chart__plot')).toHaveLength(2);
    await expect(canvas.getAllByRole('list', { name: 'Chart legend' })).toHaveLength(2);
    await expect(canvasElement.querySelectorAll('.dls-pie-chart__plot')).toHaveLength(2);
    await expect(canvasElement.querySelectorAll('.dls-pie__segment')).toHaveLength(10);
  },
};

export const LegendSide: Story = {};

export const LegendBottom: Story = {
  args: {
    legendBottom: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('group', { name: 'Pie chart with bottom legend' })).toBeVisible();
    await expect(canvas.getByRole('list', { name: 'Chart legend' })).toBeVisible();
  },
};

export const WithoutLegend: Story = {
  args: {
    legend: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('group', { name: 'Pie chart' })).toBeVisible();
    await expect(canvas.queryByRole('list', { name: 'Chart legend' })).toBeNull();
  },
};

export const WithoutLabels: Story = {
  args: {
    labels: false,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.dls-pie-chart-labels')).toBeNull();
    await expect(canvasElement.querySelectorAll('.dls-pie__segment')).toHaveLength(5);
  },
};

export const WithoutStrokes: Story = {
  args: {
    stroke: false,
    labelStroke: false,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.dls-pie')).toHaveAttribute('data-stroke', 'false');
    await expect(canvasElement.querySelectorAll('.dls-pie-chart-labels__leader')).toHaveLength(0);
  },
};

export const WithCategoryLabels: Story = {
  args: {
    labelCategories: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pink')).toBeVisible();
    await expect(canvas.getByText('Cinnamon')).toBeVisible();
  },
};
