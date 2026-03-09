import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 348 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.5L9.79 5.86L14.5 6.32L10.97 9.47L11.96 14.07L8 11.77L4.04 14.07L5.03 9.47L1.5 6.32L6.21 5.86L8 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const PlaceholderButton = ({ label }: { label: string }) => (
  <button
    type="button"
    style={{
      all: 'unset',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      padding: '0 12px',
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'var(--dls-font-family)',
      cursor: 'pointer',
      border: '1px solid var(--dls-color-border-base)',
      color: 'var(--dls-color-text-primary)',
      background: 'var(--dls-color-surface-base)',
    }}
  >
    {label}
  </button>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    type: 'outline',
    title: 'Title',
    description: 'Description',
    headerIcon: <StarIcon />,
    footer: <PlaceholderButton label="Action" />,
  },
};

// ---------------------------------------------------------------------------
// All types
// ---------------------------------------------------------------------------

export const AllTypes: Story = {
  args: {
    title: 'Title',
    description: 'Description',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Regular (no background, no border)">
        <Card
          type="regular"
          headerIcon={<StarIcon />}
          title="Title"
          description="Description"
          footer={<PlaceholderButton label="Action" />}
        />
      </Section>
      <Section title="Outline (border only)">
        <Card
          type="outline"
          headerIcon={<StarIcon />}
          title="Title"
          description="Description"
          footer={<PlaceholderButton label="Action" />}
        />
      </Section>
      <Section title="Muted (filled background + subtle border)">
        <Card
          type="muted"
          headerIcon={<StarIcon />}
          title="Title"
          description="Description"
          footer={<PlaceholderButton label="Action" />}
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With custom header content
// ---------------------------------------------------------------------------

export const WithHeaderContent: Story = {
  args: {
    type: 'outline',
    title: 'Title',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Icon + custom header slot">
        <Card
          type="outline"
          headerIcon={<StarIcon />}
          headerContent={
            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
              Header Label
            </span>
          }
          title="Title"
          description="Description"
          footer={<PlaceholderButton label="Action" />}
        />
      </Section>
      <Section title="Header content only (no icon)">
        <Card
          type="outline"
          headerContent={
            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
              Header Label
            </span>
          }
          title="Title"
          description="Description"
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Content variations
// ---------------------------------------------------------------------------

export const ContentVariations: Story = {
  args: {
    type: 'outline',
    title: 'Title',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Title only">
        <Card type="outline" title="Title" />
      </Section>
      <Section title="Title + description">
        <Card type="outline" title="Title" description="This is a longer description that demonstrates how the card handles multi-line text content." />
      </Section>
      <Section title="Title + custom children">
        <Card type="outline" title="Title">
          <div style={{ padding: '8px 12px', borderRadius: 6, background: 'var(--dls-color-surface-muted)', fontSize: 13, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-secondary)' }}>
            Custom slot content
          </div>
        </Card>
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With footer actions
// ---------------------------------------------------------------------------

export const WithFooter: Story = {
  args: {
    type: 'outline',
    title: 'Title',
    description: 'Description',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Single action">
        <Card
          type="outline"
          title="Title"
          description="Description"
          footer={<PlaceholderButton label="Action" />}
        />
      </Section>
      <Section title="Multiple actions">
        <Card
          type="outline"
          title="Title"
          description="Description"
          footer={
            <>
              <PlaceholderButton label="Cancel" />
              <PlaceholderButton label="Confirm" />
            </>
          }
        />
      </Section>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Minimal
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  args: {
    type: 'outline',
    title: 'Just a title',
  },
};
