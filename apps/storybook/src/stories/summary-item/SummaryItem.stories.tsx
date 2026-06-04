import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';
import { expect } from 'storybook/test';
import { SummaryItem, type SummaryItemType } from './SummaryItem';

const summaryTypes: SummaryItemType[] = ['positive', 'negative', 'no-changes'];

const meta = {
  title: 'Components/SummaryItem',
  component: SummaryItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    trendValue: { control: 'text' },
    type: { control: 'select', options: summaryTypes },
    onlyTrend: { control: 'boolean' },
  },
  args: {
    value: '50%',
    label: 'Label',
    trendValue: '5%',
    type: 'positive',
    onlyTrend: false,
  },
} satisfies Meta<typeof SummaryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const Matrix = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, max-content)',
      columnGap: 'var(--dls-spacing-8)',
      rowGap: 'var(--dls-spacing-6)',
      alignItems: 'start',
    }}
  >
    {children}
  </div>
);

const trendValueFor = (type: SummaryItemType) => (type === 'no-changes' ? '0%' : '5%');

export const Playground: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('50%')).toBeVisible();
    await expect(canvas.getByText('Label')).toBeVisible();
  },
};

export const FigmaMatrix: Story = {
  render: () => (
    <Matrix>
      {summaryTypes.map((type) => (
        <SummaryItem key={type} type={type} value="50%" label="Label" trendValue={trendValueFor(type)} />
      ))}
      {summaryTypes.map((type) => (
        <SummaryItem key={`${type}-only`} type={type} onlyTrend trendValue={trendValueFor(type)} />
      ))}
    </Matrix>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText('50%')[0]).toBeVisible();
    await expect(canvas.getAllByText('Label')[0]).toBeVisible();
    await expect(canvas.getAllByText('0%')[0]).toBeVisible();
  },
};

export const Positive: Story = {
  args: {
    type: 'positive',
    trendValue: '5%',
  },
};

export const Negative: Story = {
  args: {
    type: 'negative',
    trendValue: '5%',
  },
};

export const NoChanges: Story = {
  args: {
    type: 'no-changes',
    trendValue: '0%',
  },
};

export const OnlyTrend: Story = {
  args: {
    onlyTrend: true,
    type: 'positive',
    trendValue: '5%',
  },
};

export const WithoutTrend: Story = {
  args: {
    trendValue: '',
  },
};

export const WithoutLabel: Story = {
  args: {
    label: null,
  },
};
