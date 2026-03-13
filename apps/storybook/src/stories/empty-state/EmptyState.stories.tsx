import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: 'var(--dls-font-family)', color: 'var(--dls-color-text-primary)' }}>
      {title}
    </h3>
    {children}
  </div>
);

const IconShape = ({ intent = 'primary' }: { intent?: string }) => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 'var(--dls-radius-component-icon-shape)',
      background: `var(--dls-color-intent-${intent}-subtle)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 15C21 15.55 20.55 16 20 16H8L4 20V4C4 3.45 4.45 3 5 3H20C20.55 3 21 3.45 21 4V15Z"
        stroke={`var(--dls-color-intent-${intent}-text)`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  </div>
);

const PlaceholderButton = ({
  label,
  variant = 'outline',
  fullWidth = false,
}: {
  label: string;
  variant?: 'outline' | 'filled';
  fullWidth?: boolean;
}) => (
  <button
    type="button"
    style={{
      all: 'unset',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      padding: '0 10px',
      gap: 8,
      borderRadius: 'var(--dls-radius-component-button)',
      fontSize: 'var(--dls-text-m-font-size)',
      lineHeight: 'var(--dls-text-m-line-height)',
      fontWeight: 'var(--dls-font-weight-medium)',
      fontFamily: 'var(--dls-font-family)',
      cursor: 'pointer',
      width: fullWidth ? '100%' : undefined,
      ...(variant === 'filled'
        ? {
            background: 'var(--dls-color-intent-neutral-base)',
            color: 'var(--dls-color-intent-neutral-on-base)',
            border: 'none',
          }
        : {
            background: 'transparent',
            color: 'var(--dls-color-text-primary)',
            border: '1px solid var(--dls-color-intent-neutral-base)',
          }),
    }}
  >
    {label}
  </button>
);

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    variant: 'borderless',
    title: 'No results found',
    description: 'Try adjusting your filters or searching with different keywords.',
    media: <IconShape intent="primary" />,
  },
};

/* ---------------------------------------------------------------------------
   Variants
   --------------------------------------------------------------------------- */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Borderless (default)">
        <EmptyState
          variant="borderless"
          media={<IconShape intent="primary" />}
          title="No results found"
          description="Try adjusting your filters or searching with different keywords."
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <PlaceholderButton label="Clear filters" variant="outline" />
            <PlaceholderButton label="New search" variant="filled" />
          </div>
        </EmptyState>
      </Section>

      <Section title="Bordered (card-like)">
        <EmptyState
          variant="bordered"
          media={<IconShape intent="danger" />}
          title="No messages yet"
          description="When someone sends you a message, it will appear here."
        />
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   With actions
   --------------------------------------------------------------------------- */

export const WithActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Horizontal buttons">
        <EmptyState
          media={<IconShape intent="primary" />}
          title="No results found"
          description="Try adjusting your filters or searching with different keywords."
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <PlaceholderButton label="Clear filters" variant="outline" />
            <PlaceholderButton label="New search" variant="filled" />
          </div>
        </EmptyState>
      </Section>

      <Section title="Vertical full-width buttons">
        <EmptyState
          media={<IconShape intent="primary" />}
          title="No saved items"
          description="Save items to quickly access them later from this page."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <PlaceholderButton label="Browse items" variant="outline" fullWidth />
            <PlaceholderButton label="Create new" variant="filled" fullWidth />
          </div>
        </EmptyState>
      </Section>

      <Section title="Bordered with three actions">
        <EmptyState
          variant="bordered"
          media={<IconShape intent="primary" />}
          title="You're all caught up"
          description="You don't have any new notifications right now."
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <PlaceholderButton label="Settings" variant="outline" />
              <PlaceholderButton label="Refresh" variant="filled" />
            </div>
            <PlaceholderButton label="View archive" variant="outline" />
          </div>
        </EmptyState>
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Content variations
   --------------------------------------------------------------------------- */

export const ContentVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Icon + title + description">
        <EmptyState
          media={<IconShape intent="primary" />}
          title="No saved items"
          description="Save items to quickly access them later from this page."
        />
      </Section>

      <Section title="Title + description only">
        <EmptyState
          title="No saved items"
          description="Save items to quickly access them later from this page."
        />
      </Section>

      <Section title="Title only">
        <EmptyState title="Nothing here yet" />
      </Section>

      <Section title="404 page with single action">
        <EmptyState
          media={<IconShape intent="primary" />}
          title="404 - We couldn't find that page"
          description="Check the link or return to a safe place to continue."
        >
          <PlaceholderButton label="Go home" variant="filled" />
        </EmptyState>
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Bordered with input
   --------------------------------------------------------------------------- */

export const BorderedWithInput: Story = {
  render: () => (
    <EmptyState
      variant="bordered"
      media={<IconShape intent="danger" />}
      title="No messages yet"
      description="When someone sends you a message, it will appear here."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label
            style={{
              fontSize: 'var(--dls-text-m-font-size)',
              fontWeight: 'var(--dls-font-weight-medium)',
              fontFamily: 'var(--dls-font-family)',
              color: 'var(--dls-color-text-primary)',
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              all: 'unset',
              boxSizing: 'border-box',
              width: '100%',
              height: 36,
              padding: '0 10px',
              borderRadius: 'var(--dls-radius-component-input)',
              border: '1px solid var(--dls-color-border-base)',
              fontSize: 'var(--dls-text-m-font-size)',
              fontFamily: 'var(--dls-font-family)',
              color: 'var(--dls-color-text-primary)',
              background: 'var(--dls-color-surface-base)',
            }}
          />
        </div>
        <span
          style={{
            fontSize: 'var(--dls-text-m-font-size)',
            lineHeight: 'var(--dls-text-m-line-height)',
            fontFamily: 'var(--dls-font-family)',
            color: 'var(--dls-color-text-secondary)',
          }}
        >
          Need help? Contact Support
        </span>
      </div>
    </EmptyState>
  ),
};
