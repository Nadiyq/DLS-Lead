import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactForm } from './ContactForm';

const meta = {
  title: 'Templates/ContactForm',
  component: ContactForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Playground
   --------------------------------------------------------------------------- */

export const Playground: Story = {
  args: {
    title: 'Contact us',
    subtitle: 'Have a question or feedback? Fill out the form below and we\'ll get back to you.',
    showCheckbox: true,
  },
};

/* ---------------------------------------------------------------------------
   Default
   --------------------------------------------------------------------------- */

export const Default: Story = {
  args: {},
};

/* ---------------------------------------------------------------------------
   Custom topics
   --------------------------------------------------------------------------- */

export const CustomTopics: Story = {
  args: {
    title: 'Get in touch',
    subtitle: 'We\'d love to hear from you.',
    topicOptions: ['Sales', 'Support', 'Press', 'Careers'],
  },
};

/* ---------------------------------------------------------------------------
   Without checkbox
   --------------------------------------------------------------------------- */

export const WithoutCheckbox: Story = {
  args: {
    title: 'Send us a message',
    subtitle: 'Fill in the details below.',
    showCheckbox: false,
  },
};

/* ---------------------------------------------------------------------------
   Custom labels
   --------------------------------------------------------------------------- */

export const CustomLabels: Story = {
  args: {
    title: 'Feedback',
    subtitle: 'Let us know how we can improve.',
    nameLabel: 'Your name',
    emailLabel: 'Your email',
    topicLabel: 'Category',
    messageLabel: 'Your feedback',
    messagePlaceholder: 'Tell us what you think...',
    cancelLabel: 'Discard',
    submitLabel: 'Send feedback',
    checkboxLabel: 'I agree to the privacy policy.',
  },
};
