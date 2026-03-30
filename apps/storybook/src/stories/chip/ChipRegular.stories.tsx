import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ChipRegular, type ChipRegularVariant, type ChipRegularIntent, type ChipRegularSize } from './ChipRegular';

const meta = {
  title: 'Components/ChipRegular',
  component: ChipRegular,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ChipRegular>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

const intents: ChipRegularIntent[] = ['neutral', 'info', 'success', 'warning', 'danger'];
const variants: ChipRegularVariant[] = ['filled', 'outline', 'soft', 'dot'];
const sizes: ChipRegularSize[] = ['m', 's', 'xs'];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Chip',
    variant: 'outline',
    intent: 'neutral',
    size: 'm',
  },
};

// ---------------------------------------------------------------------------
// All variants × intents — matches Figma regular component matrix
// Text + chevron (2-part chip), all states visible
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  args: { label: 'Chip' },
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <Section key={variant} title={variant.charAt(0).toUpperCase() + variant.slice(1)}>
          {intents.map((intent) => (
            <React.Fragment key={intent}>
              <ChipRegular variant={variant} intent={intent} label={intent} chevron />
              <ChipRegular variant={variant} intent={intent} label={intent} chevron disabled />
            </React.Fragment>
          ))}
        </Section>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// States — normal, disabled per variant (hover/focus/pressed are interactive)
// ---------------------------------------------------------------------------

export const States: Story = {
  args: { label: 'Chip' },
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {variants.map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, auto)', gap: '8px 24px', alignItems: 'center', justifyContent: 'start' }}>
            {intents.map((intent) => (
              <React.Fragment key={intent}>
                <ChipRegular variant={variant} intent={intent} label={intent} chevron onClick={() => {}} />
              </React.Fragment>
            ))}
            {intents.map((intent) => (
              <React.Fragment key={intent + '-disabled'}>
                <ChipRegular variant={variant} intent={intent} label={intent} chevron disabled />
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dot variant — all intents with dot indicator
// ---------------------------------------------------------------------------

export const DotVariant: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Dot + chevron">
        {intents.map((intent) => (
          <ChipRegular key={intent} variant="dot" intent={intent} label={intent} chevron />
        ))}
      </Section>
      <Section title="Dot + cross">
        {intents.map((intent) => (
          <ChipRegular key={intent} variant="dot" intent={intent} label={intent} onRemove={() => {}} />
        ))}
      </Section>
      <Section title="Dot disabled">
        {intents.map((intent) => (
          <ChipRegular key={intent} variant="dot" intent={intent} label={intent} chevron disabled />
        ))}
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {sizes.map((size) => (
        <Section key={size} title={`${size.toUpperCase()} (${size === 'm' ? '32' : size === 's' ? '28' : '24'}px)`}>
          <ChipRegular size={size} variant="filled" intent="info" label="Filled" chevron />
          <ChipRegular size={size} variant="outline" intent="info" label="Outline" chevron />
          <ChipRegular size={size} variant="soft" intent="info" label="Soft" chevron />
          <ChipRegular size={size} variant="dot" intent="info" label="Dot" chevron />
        </Section>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With cross (removable)
// ---------------------------------------------------------------------------

export const Removable: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Removable">
        <ChipRegular variant="filled" intent="neutral" label="Design" onRemove={() => {}} />
        <ChipRegular variant="outline" intent="info" label="Engineering" onRemove={() => {}} />
        <ChipRegular variant="soft" intent="success" label="Active" onRemove={() => {}} />
        <ChipRegular variant="dot" intent="danger" label="Error" onRemove={() => {}} />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Interactive (clickable)
// ---------------------------------------------------------------------------

export const Interactive: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Clickable">
        <ChipRegular variant="filled" intent="info" label="Click me" onClick={() => alert('Clicked!')} />
        <ChipRegular variant="outline" intent="neutral" label="Filter" chevron onClick={() => {}} />
        <ChipRegular variant="soft" intent="info" label="Tag" onClick={() => {}} />
      </Section>
    </div>
  ),
};
