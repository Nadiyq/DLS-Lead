import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Grid } from './Grid';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    horizontal: { control: 'boolean' },
    showPrimaryAxis: { control: 'boolean' },
    showSecondaryAxis: { control: 'boolean' },
    labels: { control: 'object' },
    secondaryLabels: { control: 'object' },
  },
  args: {
    labels: ['70', '60', '50', '40', '30', '20', '10', '0'],
    secondaryLabels: ['1 Jan', '7 Jan', '14 Jan', '21 Jan', '28 Jan'],
    showPrimaryAxis: true,
    showSecondaryAxis: true,
    horizontal: false,
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('.dls-grid__row');
    await expect(rows.length).toBe(8);
    const xLabels = canvasElement.querySelectorAll('.dls-grid__x-axis-label');
    await expect(xLabels.length).toBe(5);
  },
};

export const Horizontal: Story = {
  args: {
    horizontal: true,
    labels: ['0', '10', '20', '30', '40', '50', '60', '70'],
    secondaryLabels: [],
    showSecondaryAxis: false,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '320px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('[data-horizontal]')).not.toBeNull();
  },
};

export const NoAxes: Story = {
  args: {
    showPrimaryAxis: false,
    showSecondaryAxis: false,
  },
  play: async ({ canvasElement }) => {
    const labels = canvasElement.querySelectorAll('.dls-grid__label');
    await expect(labels.length).toBe(0);
    const xLabels = canvasElement.querySelectorAll('.dls-grid__x-axis-label');
    await expect(xLabels.length).toBe(0);
  },
};

export const YAxisOnly: Story = {
  args: {
    showPrimaryAxis: true,
    showSecondaryAxis: false,
  },
  play: async ({ canvasElement }) => {
    const labels = canvasElement.querySelectorAll('.dls-grid__label');
    await expect(labels.length).toBe(8);
    const xLabels = canvasElement.querySelectorAll('.dls-grid__x-axis-label');
    await expect(xLabels.length).toBe(0);
  },
};

export const XAxisOnly: Story = {
  args: {
    showPrimaryAxis: false,
    showSecondaryAxis: true,
  },
  play: async ({ canvasElement }) => {
    const labels = canvasElement.querySelectorAll('.dls-grid__label');
    await expect(labels.length).toBe(0);
    const xLabels = canvasElement.querySelectorAll('.dls-grid__x-axis-label');
    await expect(xLabels.length).toBe(5);
  },
};
