import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: AccordionItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title:       { control: 'text' },
    disabled:    { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
  },
  args: {
    title: 'Accordion title',
    children: 'This is content text',
  },
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <h3 style={{
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      fontFamily: 'var(--dls-font-family)',
      color: 'var(--dls-color-text-primary)',
    }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {children}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    title: 'Accordion title',
    children: 'This is content text',
  },
};

// ---------------------------------------------------------------------------
// Single item states
// ---------------------------------------------------------------------------

export const Closed: Story = {
  args: {
    title: 'Accordion title',
    children: 'This is content text',
  },
};

export const Open: Story = {
  args: {
    title: 'Accordion title',
    children: 'This is content text',
    defaultOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Accordion title',
    children: 'This is content text',
    disabled: true,
  },
};

export const DisabledOpen: Story = {
  args: {
    title: 'Accordion title',
    children: 'This is content text',
    defaultOpen: true,
    disabled: true,
  },
};

// ---------------------------------------------------------------------------
// Group
// ---------------------------------------------------------------------------

export const Group: Story = {
  render: () => (
    <Section title="Accordion Group">
      <Accordion>
        <AccordionItem title="Accordion title">This is content text</AccordionItem>
        <AccordionItem title="Accordion title" defaultOpen>This is content text</AccordionItem>
        <AccordionItem title="Accordion title">This is content text</AccordionItem>
        <AccordionItem title="Accordion title">This is content text</AccordionItem>
        <AccordionItem title="Accordion title">This is content text</AccordionItem>
      </Accordion>
    </Section>
  ),
};

// ---------------------------------------------------------------------------
// Rich content
// ---------------------------------------------------------------------------

export const WithRichContent: Story = {
  render: () => (
    <Section title="Rich Content">
      <Accordion>
        <AccordionItem title="What is a design system?">
          A design system is a collection of reusable components, patterns, and guidelines
          that help teams build consistent user interfaces efficiently.
        </AccordionItem>
        <AccordionItem title="How do I use tokens?" defaultOpen>
          Tokens are referenced as CSS custom properties in component styles.
          Use semantic tokens (Layer 2) in components, not primitives.
        </AccordionItem>
        <AccordionItem title="What are the available states?">
          Each AccordionItem supports normal, hover, focus, pressed, and disabled states,
          all driven by the design token system via CSS pseudo-classes.
        </AccordionItem>
      </Accordion>
    </Section>
  ),
};
