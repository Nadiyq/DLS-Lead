import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const meta: Meta<typeof AccordionItem> = {
  title: 'Components/Accordion',
  component: AccordionItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title:       { control: 'text' },
    disabled:    { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AccordionItem>;

// ─── Single item states ───────────────────────────────────────────────────────

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

// ─── Group ────────────────────────────────────────────────────────────────────

export const Group: StoryObj = {
  render: () => (
    <Accordion>
      <AccordionItem title="Accordion title">This is content text</AccordionItem>
      <AccordionItem title="Accordion title" defaultOpen>This is content text</AccordionItem>
      <AccordionItem title="Accordion title">This is content text</AccordionItem>
      <AccordionItem title="Accordion title">This is content text</AccordionItem>
      <AccordionItem title="Accordion title">This is content text</AccordionItem>
    </Accordion>
  ),
};

export const WithRichContent: StoryObj = {
  render: () => (
    <Accordion>
      <AccordionItem title="What is a design system?">
        A design system is a collection of reusable components, patterns, and guidelines
        that help teams build consistent user interfaces efficiently.
      </AccordionItem>
      <AccordionItem title="How do I use tokens?" defaultOpen>
        Import tokens from <code>@tokens/tokens</code> and reference them in your
        component styles. Use semantic tokens (Layer 2) in components, not primitives.
      </AccordionItem>
      <AccordionItem title="What are the available states?">
        Each AccordionItem supports normal, hover, focus, pressed, and disabled states,
        all driven by the design token system.
      </AccordionItem>
    </Accordion>
  ),
};
