import React from 'react';
import './contact-form.css';

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
   Icons
   --------------------------------------------------------------------------- */

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

        {/* Form */}
        <div className="dls-contact-form__form">
          {/* Full name */}
          <div className="dls-contact-form__field">
            <label className="dls-contact-form__label">{nameLabel}</label>
            <input
              type="text"
              className="dls-contact-form__input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="dls-contact-form__field">
            <label className="dls-contact-form__label">{emailLabel}</label>
            <input
              type="email"
              className="dls-contact-form__input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Topic */}
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

          {/* Message */}
          <div className="dls-contact-form__field">
            <label className="dls-contact-form__label">{messageLabel}</label>
            <textarea
              className="dls-contact-form__textarea"
              placeholder={messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Checkbox */}
          {showCheckbox && (
            <label className="dls-contact-form__checkbox-row">
              <span
                className="dls-contact-form__checkbox"
                role="checkbox"
                aria-checked={optIn}
                data-checked={optIn || undefined}
                onClick={() => setOptIn(!optIn)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    setOptIn(!optIn);
                  }
                }}
                tabIndex={0}
              >
                {optIn && <CheckIcon />}
              </span>
              <span className="dls-contact-form__checkbox-text">{checkboxLabel}</span>
            </label>
          )}
        </div>

        {/* Footer */}
        <div className="dls-contact-form__footer">
          <button
            type="button"
            className="dls-contact-form__btn-secondary"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="dls-contact-form__btn-primary"
            onClick={handleSubmit}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    );
  },
);

ContactForm.displayName = 'ContactForm';
