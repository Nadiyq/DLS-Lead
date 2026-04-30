import React from 'react';
import './contact-form.css';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';
import { Textarea } from '../textarea/Textarea';
import { Checkbox } from '../checkbox/Checkbox';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface ContactFormProps {
  /** Form title */
  title?: string;
  /** Form subtitle */
  subtitle?: string;
  /** Full name field label */
  nameLabel?: string;
  /** Email field label */
  emailLabel?: string;
  /** Topic field label */
  topicLabel?: string;
  /** Topic options */
  topicOptions?: string[];
  /** Message field label */
  messageLabel?: string;
  /** Message placeholder */
  messagePlaceholder?: string;
  /** Checkbox label */
  checkboxLabel?: string;
  /** Show checkbox */
  showCheckbox?: boolean;
  /** Cancel button label */
  cancelLabel?: string;
  /** Submit button label */
  submitLabel?: string;
  /** Called on cancel */
  onCancel?: () => void;
  /** Called on submit */
  onSubmit?: (data: {
    name: string;
    email: string;
    topic: string;
    message: string;
    optIn: boolean;
  }) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const ContactForm = React.forwardRef<HTMLDivElement, ContactFormProps>(
  (props, ref) => {
    const {
      title = 'Contact us',
      subtitle = 'Have a question or feedback? Fill out the form below and we\'ll get back to you.',
      nameLabel = 'Full name',
      emailLabel = 'Email',
      topicLabel = 'Topic',
      topicOptions = ['General inquiry', 'Technical support', 'Billing', 'Partnership', 'Other'],
      messageLabel = 'Message',
      messagePlaceholder = 'Type your message here...',
      checkboxLabel = "I'd like to receive updates about products and promotions.",
      showCheckbox = true,
      cancelLabel = 'Cancel',
      submitLabel = 'Submit',
      onCancel,
      onSubmit,
      className,
    } = props;

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [topic, setTopic] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [optIn, setOptIn] = React.useState(false);

    const handleSubmit = () => {
      onSubmit?.({ name, email, topic, message, optIn });
    };

    return (
      <div
        ref={ref}
        className={['dls-contact-form', className].filter(Boolean).join(' ')}
      >
        {/* Header */}
        <div className="dls-contact-form__header">
          <h2 className="dls-contact-form__title">{title}</h2>
          {subtitle && <p className="dls-contact-form__subtitle">{subtitle}</p>}
        </div>

        {/* Body: form + footer */}
        <div className="dls-contact-form__body">
          {/* Form */}
          <div className="dls-contact-form__form">
            <InputField
              label={nameLabel}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputField
              label={emailLabel}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Topic — no DLS Select component yet */}
            <div className="dls-contact-form__field">
              <label className="dls-contact-form__label">{topicLabel}</label>
              <select
                className="dls-contact-form__select"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="" disabled>Select a topic</option>
                {topicOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <Textarea
              label={messageLabel}
              placeholder={messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {showCheckbox && (
              <Checkbox
                checked={optIn}
                onChange={(val) => setOptIn(val)}
                label={checkboxLabel}
              />
            )}
          </div>

          {/* Footer */}
          <div className="dls-contact-form__footer">
            <Button
              variant="outline"
              intent="neutral"
              size="m"
              onClick={onCancel}
              style={{ flex: 1 }}
            >
              {cancelLabel}
            </Button>
            <Button
              variant="filled"
              intent="neutral"
              size="m"
              onClick={handleSubmit}
              style={{ flex: 1 }}
            >
              {submitLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

ContactForm.displayName = 'ContactForm';
