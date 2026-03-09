import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Button, PlusIcon } from '../Button';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant:     { control: 'select', options: ['filled', 'outline', 'soft', 'ghost'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size:        { control: 'select', options: ['m', 's'] },
  },
  args: {
    variant: 'outline',
    orientation: 'horizontal',
    size: 'm',
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>{children}</div>
);

const variants = ['filled', 'outline', 'soft', 'ghost'] as const;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    children: (
      <>
        <Button variant="ghost" intent="neutral" size="m">First</Button>
        <Button variant="ghost" intent="neutral" size="m">Second</Button>
        <Button variant="ghost" intent="neutral" size="m">Third</Button>
      </>
    ),
  },
};

// ---------------------------------------------------------------------------
// All variants — horizontal
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <Section key={variant} title={variant.charAt(0).toUpperCase() + variant.slice(1)}>
          <Row>
            <ButtonGroup variant={variant} orientation="horizontal" size="m">
              <Button variant={variant === 'filled' ? 'filled' : 'ghost'} intent="neutral" size="m">One</Button>
              <Button variant={variant === 'filled' ? 'filled' : 'ghost'} intent="neutral" size="m">Two</Button>
              <Button variant={variant === 'filled' ? 'filled' : 'ghost'} intent="neutral" size="m">Three</Button>
              <Button variant={variant === 'filled' ? 'filled' : 'ghost'} intent="neutral" size="m">Four</Button>
              <Button variant={variant === 'filled' ? 'filled' : 'ghost'} intent="neutral" size="m" icon={<PlusIcon />} iconOnly />
            </ButtonGroup>
          </Row>
        </Section>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Vertical orientation
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <Section key={variant} title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} — Vertical`}>
          <ButtonGroup variant={variant} orientation="vertical" size="m">
            <Button variant={variant === 'filled' ? 'filled' : 'ghost'} intent="neutral" size="m">One</Button>
            <Button variant={variant === 'filled' ? 'filled' : 'ghost'} intent="neutral" size="m">Two</Button>
            <Button variant={variant === 'filled' ? 'filled' : 'ghost'} intent="neutral" size="m">Three</Button>
          </ButtonGroup>
        </Section>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Size M">
        <ButtonGroup variant="outline" size="m">
          <Button variant="ghost" intent="neutral" size="m">One</Button>
          <Button variant="ghost" intent="neutral" size="m">Two</Button>
          <Button variant="ghost" intent="neutral" size="m">Three</Button>
        </ButtonGroup>
      </Section>
      <Section title="Size S">
        <ButtonGroup variant="outline" size="s">
          <Button variant="ghost" intent="neutral" size="s">One</Button>
          <Button variant="ghost" intent="neutral" size="s">Two</Button>
          <Button variant="ghost" intent="neutral" size="s">Three</Button>
        </ButtonGroup>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With icon buttons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  args: { children: null },
  render: () => (
    <Section title="Icon-only group">
      <Row>
        <ButtonGroup variant="outline" size="m">
          <Button variant="ghost" intent="neutral" size="m" icon={<PlusIcon />} iconOnly />
          <Button variant="ghost" intent="neutral" size="m" icon={<PlusIcon />} iconOnly />
          <Button variant="ghost" intent="neutral" size="m" icon={<PlusIcon />} iconOnly />
        </ButtonGroup>
        <ButtonGroup variant="filled" size="m">
          <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />} iconOnly />
          <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />} iconOnly />
          <Button variant="filled" intent="neutral" size="m" icon={<PlusIcon />} iconOnly />
        </ButtonGroup>
      </Row>
    </Section>
  ),
};
