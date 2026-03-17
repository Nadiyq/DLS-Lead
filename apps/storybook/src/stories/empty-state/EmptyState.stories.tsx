import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { EmptyState } from './EmptyState';
import { IconShape } from '../icon-shape/IconShape';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';

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

const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 15C21 15.55 20.55 16 20 16H8L4 20V4C4 3.45 4.45 3 5 3H20C20.55 3 21 3.45 21 4V15Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    variant: 'borderless',
    title: 'No results found',
    description: 'Try adjusting your filters or searching with different keywords.',
    media: <IconShape intent="primary" size="m"><MessageIcon /></IconShape>,
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
          media={<IconShape intent="primary" size="m"><MessageIcon /></IconShape>}
          title="No results found"
          description="Try adjusting your filters or searching with different keywords."
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outline" intent="neutral" size="m">Clear filters</Button>
            <Button variant="filled" intent="neutral" size="m">New search</Button>
          </div>
        </EmptyState>
      </Section>

      <Section title="Bordered (card-like)">
        <EmptyState
          variant="bordered"
          media={<IconShape intent="danger" size="m"><MessageIcon /></IconShape>}
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
          media={<IconShape intent="primary" size="m"><MessageIcon /></IconShape>}
          title="No results found"
          description="Try adjusting your filters or searching with different keywords."
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outline" intent="neutral" size="m">Clear filters</Button>
            <Button variant="filled" intent="neutral" size="m">New search</Button>
          </div>
        </EmptyState>
      </Section>

      <Section title="Vertical full-width buttons">
        <EmptyState
          media={<IconShape intent="primary" size="m"><MessageIcon /></IconShape>}
          title="No saved items"
          description="Save items to quickly access them later from this page."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <Button variant="outline" intent="neutral" size="m" style={{ width: '100%' }}>Browse items</Button>
            <Button variant="filled" intent="neutral" size="m" style={{ width: '100%' }}>Create new</Button>
          </div>
        </EmptyState>
      </Section>

      <Section title="Bordered with three actions">
        <EmptyState
          variant="bordered"
          media={<IconShape intent="primary" size="m"><MessageIcon /></IconShape>}
          title="You're all caught up"
          description="You don't have any new notifications right now."
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" intent="neutral" size="m">Settings</Button>
              <Button variant="filled" intent="neutral" size="m">Refresh</Button>
            </div>
            <Button variant="outline" intent="neutral" size="m">View archive</Button>
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
          media={<IconShape intent="primary" size="m"><MessageIcon /></IconShape>}
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
          media={<IconShape intent="primary" size="m"><MessageIcon /></IconShape>}
          title="404 - We couldn't find that page"
          description="Check the link or return to a safe place to continue."
        >
          <Button variant="filled" intent="neutral" size="m">Go home</Button>
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
      media={<IconShape intent="danger" size="m"><MessageIcon /></IconShape>}
      title="No messages yet"
      description="When someone sends you a message, it will appear here."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <InputField
          label="Email"
          placeholder="you@example.com"
          type="email"
          hint="Need help? Contact Support"
        />
      </div>
    </EmptyState>
  ),
};
