import React from 'react';
import './book-service-form.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export interface BookServiceFormProps {
  /** Form title */
  title?: string;
  /** Form subtitle */
  subtitle?: string;
  /** Name field label */
  nameLabel?: string;
  /** Name field placeholder */
  namePlaceholder?: string;
  /** Email field label */
  emailLabel?: string;
  /** Email field placeholder */
  emailPlaceholder?: string;
  /** Service field label */
  serviceLabel?: string;
  /** Service options */
  serviceOptions?: string[];
  /** Service placeholder */
  servicePlaceholder?: string;
  /** Date field label */
  dateLabel?: string;
  /** Checkbox label */
  checkboxLabel?: string;
  /** Show checkbox */
  showCheckbox?: boolean;
  /** Cancel button label */
  cancelLabel?: string;
  /** Submit button label */
  submitLabel?: string;
  /** Extra slot content between form and footer */
  slotContent?: React.ReactNode;
  /** Called on cancel */
  onCancel?: () => void;
  /** Called on submit */
  onSubmit?: (data: {
    name: string;
    email: string;
    service: string;
    date: string;
    agreed: boolean;
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

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.2" />
    <path d="M5.5 1.5V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M10.5 1.5V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const BookServiceForm = React.forwardRef<HTMLDivElement, BookServiceFormProps>(
  (props, ref) => {
    const {
      title = 'Book a service',
      subtitle = 'Fill out the form below to schedule your appointment.',
      nameLabel = 'Name',
      namePlaceholder = 'Enter your full name',
      emailLabel = 'Email',
      emailPlaceholder = 'my@example.com',
      serviceLabel = 'Service',
      serviceOptions = ['Consultation', 'Haircut', 'Massage', 'Facial', 'Manicure'],
      servicePlaceholder = 'Select a service',
      dateLabel = 'Date',
      checkboxLabel = 'I agree to the terms and conditions',
      showCheckbox = true,
      cancelLabel = 'Cancel',
      submitLabel = 'Book now',
      slotContent,
      onCancel,
      onSubmit,
      className,
    } = props;

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [service, setService] = React.useState('');
    const [date, setDate] = React.useState('');
    const [agreed, setAgreed] = React.useState(false);

    const handleSubmit = () => {
      onSubmit?.({ name, email, service, date, agreed });
    };

    return (
      <div
        ref={ref}
        className={['dls-book-service-form', className].filter(Boolean).join(' ')}
      >
        {/* Header */}
        <div className="dls-book-service-form__header">
          <h2 className="dls-book-service-form__title">{title}</h2>
          {subtitle && <p className="dls-book-service-form__subtitle">{subtitle}</p>}
        </div>

        {/* Form */}
        <div className="dls-book-service-form__form">
          {/* Name */}
          <div className="dls-book-service-form__field">
            <label className="dls-book-service-form__label">{nameLabel}</label>
            <input
              type="text"
              className="dls-book-service-form__input"
              placeholder={namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="dls-book-service-form__field">
            <label className="dls-book-service-form__label">{emailLabel}</label>
            <input
              type="email"
              className="dls-book-service-form__input"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Service */}
          <div className="dls-book-service-form__field">
            <label className="dls-book-service-form__label">{serviceLabel}</label>
            <select
              className="dls-book-service-form__select"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="" disabled>{servicePlaceholder}</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="dls-book-service-form__field">
            <label className="dls-book-service-form__label">{dateLabel}</label>
            <div className="dls-book-service-form__date-wrapper">
              <input
                type="date"
                className="dls-book-service-form__input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <span className="dls-book-service-form__date-icon">
                <CalendarIcon />
              </span>
            </div>
          </div>

          {/* Checkbox */}
          {showCheckbox && (
            <label className="dls-book-service-form__checkbox-row">
              <span
                className="dls-book-service-form__checkbox"
                role="checkbox"
                aria-checked={agreed}
                data-checked={agreed || undefined}
                onClick={() => setAgreed(!agreed)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    setAgreed(!agreed);
                  }
                }}
                tabIndex={0}
              >
                {agreed && <CheckIcon />}
              </span>
              <span className="dls-book-service-form__checkbox-text">{checkboxLabel}</span>
            </label>
          )}
        </div>

        {/* Slot content */}
        {slotContent && (
          <div className="dls-book-service-form__slot">{slotContent}</div>
        )}

        {/* Footer */}
        <div className="dls-book-service-form__footer">
          <button
            type="button"
            className="dls-book-service-form__btn-secondary"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="dls-book-service-form__btn-primary"
            onClick={handleSubmit}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    );
  },
);

BookServiceForm.displayName = 'BookServiceForm';
