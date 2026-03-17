import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Item } from './Item';
import { Button } from '../Button';
import { IconShape } from '../icon-shape/IconShape';

const meta = {
  title: 'Components/Item',
  component: Item,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 443 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Item>;

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

const LayersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="3" r="1.2" fill="currentColor" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
    <circle cx="8" cy="13" r="1.2" fill="currentColor" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    type: 'regular',
    title: 'Title',
    description: 'Description',
    media: (
      <IconShape intent="neutral">
        <LayersIcon />
      </IconShape>
    ),
    controls: (
      <>
        <Button variant="soft" intent="neutral" size="m">Button</Button>
        <Button variant="ghost" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="More" />
      </>
    ),
  },
};

/* ---------------------------------------------------------------------------
   All types
   --------------------------------------------------------------------------- */

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Regular (no background, no border)">
        <Item
          type="regular"
          media={<IconShape intent="neutral"><LayersIcon /></IconShape>}
          title="Title"
          description="Description"
          controls={
            <>
              <Button variant="soft" intent="neutral" size="m">Button</Button>
              <Button variant="ghost" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="More" />
            </>
          }
        />
      </Section>
      <Section title="Outline (border only)">
        <Item
          type="outline"
          media={<IconShape intent="neutral"><LayersIcon /></IconShape>}
          title="Title"
          description="Description"
          controls={
            <>
              <Button variant="soft" intent="neutral" size="m">Button</Button>
              <Button variant="ghost" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="More" />
            </>
          }
        />
      </Section>
      <Section title="Muted (filled background + subtle border)">
        <Item
          type="muted"
          media={<IconShape intent="neutral"><LayersIcon /></IconShape>}
          title="Title"
          description="Description"
          controls={
            <>
              <Button variant="soft" intent="neutral" size="m">Button</Button>
              <Button variant="ghost" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="More" />
            </>
          }
        />
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Content variations
   --------------------------------------------------------------------------- */

export const ContentVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Title only">
        <Item type="outline" media={<IconShape intent="neutral"><LayersIcon /></IconShape>} title="Title" />
      </Section>
      <Section title="Title + description">
        <Item
          type="outline"
          media={<IconShape intent="neutral"><LayersIcon /></IconShape>}
          title="Project settings"
          description="Manage your project configuration and permissions."
        />
      </Section>
      <Section title="No media">
        <Item
          type="outline"
          title="Notification preferences"
          description="Choose how you want to be notified."
          controls={<Button variant="soft" intent="neutral" size="m">Edit</Button>}
        />
      </Section>
      <Section title="With inner content">
        <Item
          type="outline"
          media={<IconShape intent="primary"><LayersIcon /></IconShape>}
          title="Storage usage"
          description="2.4 GB of 10 GB used"
          innerContent={
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: 'var(--dls-color-surface-muted)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '24%',
                  height: '100%',
                  borderRadius: 2,
                  background: 'var(--dls-color-intent-primary-base)',
                }}
              />
            </div>
          }
          controls={<Button variant="soft" intent="neutral" size="m">Upgrade</Button>}
        />
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Interactive
   --------------------------------------------------------------------------- */

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Section title="Clickable items">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Item
            type="regular"
            interactive
            media={<IconShape intent="primary"><LayersIcon /></IconShape>}
            title="Account settings"
            description="Update your profile and preferences"
          />
          <Item
            type="regular"
            interactive
            media={<IconShape intent="info"><LayersIcon /></IconShape>}
            title="Billing"
            description="Manage subscription and payment methods"
          />
          <Item
            type="regular"
            interactive
            media={<IconShape intent="success"><LayersIcon /></IconShape>}
            title="Integrations"
            description="Connect with third-party services"
          />
        </div>
      </Section>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   With different intents
   --------------------------------------------------------------------------- */

export const WithIntents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(['neutral', 'primary', 'info', 'success', 'warning', 'danger'] as const).map((intent) => (
        <Item
          key={intent}
          type="outline"
          media={<IconShape intent={intent}><LayersIcon /></IconShape>}
          title={`${intent.charAt(0).toUpperCase() + intent.slice(1)} intent`}
          description={`Item with ${intent} icon shape`}
          controls={<Button variant="ghost" intent="neutral" size="m" icon={<MoreIcon />} iconOnly aria-label="More" />}
        />
      ))}
    </div>
  ),
};
