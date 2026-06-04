import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import {
  LEGEND_GROUP_DEFAULT_ITEMS,
  LegendGroup,
  type LegendGroupItem,
} from './LegendGroup';

const valueItems: LegendGroupItem[] = [
  { label: 'Pipeline', value: '42%', color: 'green' },
  { label: 'Expansion', value: '28%', color: 'yellow' },
  { label: 'Renewals', value: '18%', color: 'blue' },
  { label: 'Referral', value: '8%', color: 'pink' },
  { label: 'Risk', value: '4%', color: 'violet' },
];

const longItems: LegendGroupItem[] = [
  { label: 'North America Enterprise', value: '38%', color: 'green' },
  { label: 'EMEA Mid-Market', value: '24%', color: 'yellow' },
  { label: 'APAC Strategic', value: '19%', color: 'blue' },
  { label: 'Partner Channel', value: '12%', color: 'pink' },
  { label: 'Self-Serve', value: '7%', color: 'violet' },
];

const meta = {
  title: 'Components/LegendGroup',
  component: LegendGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    tone: { control: 'select', options: ['100', '300', '500', '700'] },
    items: { control: 'object' },
  },
  args: {
    items: LEGEND_GROUP_DEFAULT_ITEMS,
    orientation: 'vertical',
    tone: '500',
  },
} satisfies Meta<typeof LegendGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const CompactFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--dls-spacing-8)',
      alignItems: 'flex-start',
      minWidth: 'calc(var(--dls-spacing-10) * 9)',
    }}
  >
    {children}
  </div>
);

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('list', { name: 'Chart legend' })).toBeVisible();
  },
};

export const FigmaVertical: Story = {
  args: {
    items: LEGEND_GROUP_DEFAULT_ITEMS,
    orientation: 'vertical',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('list', { name: 'Chart legend' })).toBeVisible();
    await expect(canvas.getByText('Item 1')).toBeVisible();
    await expect(canvas.getByText('Item 5')).toBeVisible();
  },
};

export const FigmaHorizontal: Story = {
  args: {
    items: LEGEND_GROUP_DEFAULT_ITEMS,
    orientation: 'horizontal',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('list', { name: 'Chart legend' })).toBeVisible();
    await expect(canvas.getByText('Item 3')).toBeVisible();
  },
};

export const FigmaMatrix: Story = {
  render: () => (
    <CompactFrame>
      <LegendGroup items={LEGEND_GROUP_DEFAULT_ITEMS} orientation="vertical" />
      <LegendGroup items={LEGEND_GROUP_DEFAULT_ITEMS} orientation="horizontal" />
    </CompactFrame>
  ),
};

export const WithValues: Story = {
  args: {
    items: valueItems,
    orientation: 'vertical',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pipeline')).toBeVisible();
    await expect(canvas.getByText('42%')).toBeVisible();
  },
};

export const HorizontalWithValues: Story = {
  args: {
    items: valueItems,
    orientation: 'horizontal',
  },
};

export const Wrapping: Story = {
  render: () => (
    <div style={{ width: 'calc(var(--dls-spacing-10) * 8)' }}>
      <LegendGroup items={longItems} orientation="horizontal" aria-label="Regional revenue legend" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('list', { name: 'Regional revenue legend' })).toBeVisible();
    await expect(canvas.getByText('North America Enterprise')).toBeVisible();
  },
};

export const Empty: Story = {
  args: {
    items: [],
    orientation: 'vertical',
    'aria-label': 'Empty chart legend',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('list', { name: 'Empty chart legend' })).toBeVisible();
  },
};
