import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Chip, type ChipAvatar, type ChipSize } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

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

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 8C2.5 5 5 3 8 3C11 3 13.5 5 14.5 8C13.5 11 11 13 8 13C5 13 2.5 11 1.5 8Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.33" />
  </svg>
);

const avatarA: ChipAvatar = { src: 'https://i.pravatar.cc/48?u=a' };
const avatarB: ChipAvatar = { src: 'https://i.pravatar.cc/48?u=b' };
const avatarC: ChipAvatar = { src: 'https://i.pravatar.cc/48?u=c' };

const sizes: ChipSize[] = ['m', 's', 'xs'];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Chip',
    size: 'm',
  },
};

// ---------------------------------------------------------------------------
// Building blocks — all types × all sizes (matches Figma node 7132:2616)
// ---------------------------------------------------------------------------

export const BuildingBlocks: Story = {
  args: { label: 'text' },
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <Chip size={size} label="text" />
          <Chip size={size} leadingIcon={<EyeIcon />} label="text" />
          <Chip size={size} avatar={avatarA} label="text" />
          <Chip size={size} stackedAvatars={[avatarA, avatarB, avatarC]} label="text" />
          <Chip size={size} flag="🇺🇸" label="text" />
          <Chip size={size} dot="neutral" label="text" />
          <Chip size={size} cross />
          <Chip size={size} chevron />
          <Chip size={size} leadingIcon={<EyeIcon />} label="text" secondaryLabel="text" />
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// All types (labeled)
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Text">
        <Chip label="Label" />
      </Section>
      <Section title="Icon + text">
        <Chip leadingIcon={<EyeIcon />} label="Email" />
      </Section>
      <Section title="Icon + two texts">
        <Chip leadingIcon={<EyeIcon />} label="Email" secondaryLabel="3 new" />
      </Section>
      <Section title="Avatar">
        <Chip avatar={avatarA} label="Alice" />
      </Section>
      <Section title="Stacked avatars">
        <Chip stackedAvatars={[avatarA, avatarB, avatarC]} label="Team" />
      </Section>
      <Section title="Flag">
        <Chip flag="🇺🇸" label="US" />
      </Section>
      <Section title="Dot">
        <Chip dot="success" label="Active" />
      </Section>
      <Section title="Cross (icon-only)">
        <Chip cross />
      </Section>
      <Section title="Chevron (icon-only)">
        <Chip chevron />
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
      <Section title="M (32px)">
        <Chip size="m" leadingIcon={<EyeIcon />} label="Medium" />
        <Chip size="m" avatar={avatarA} label="Alice" />
        <Chip size="m" dot="info" label="Info" />
      </Section>
      <Section title="S (28px)">
        <Chip size="s" leadingIcon={<EyeIcon />} label="Small" />
        <Chip size="s" avatar={avatarA} label="Alice" />
        <Chip size="s" dot="info" label="Info" />
      </Section>
      <Section title="XS (24px)">
        <Chip size="xs" leadingIcon={<EyeIcon />} label="XSmall" />
        <Chip size="xs" avatar={avatarA} label="Alice" />
        <Chip size="xs" dot="info" label="Info" />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dot intents
// ---------------------------------------------------------------------------

export const DotIntents: Story = {
  args: { label: 'Chip' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Dot intents">
        <Chip dot="neutral" label="Neutral" />
        <Chip dot="primary" label="Primary" />
        <Chip dot="info" label="Info" />
        <Chip dot="success" label="Success" />
        <Chip dot="warning" label="Warning" />
        <Chip dot="danger" label="Danger" />
      </Section>
    </div>
  ),
};
