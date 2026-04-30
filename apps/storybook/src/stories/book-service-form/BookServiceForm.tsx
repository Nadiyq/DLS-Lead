import React from 'react';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';
import './book-service-form.css';
import { Button } from '../Button';
import { InputField } from '../input-field/InputField';
import { Checkbox } from '../checkbox/Checkbox';
import { DateInput } from '../date-input/DateInput';
import { List } from '../list-item/List';
import { ListItem } from '../list-item/ListItem';

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
    const [serviceOpen, setServiceOpen] = React.useState(false);
    const serviceWrapRef = React.useRef<HTMLDivElement>(null);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
    const [agreed, setAgreed] = React.useState(false);

    // Close service dropdown on outside click / Escape
    React.useEffect(() => {
      if (!serviceOpen) return;
      const onClick = (e: MouseEvent) => {
        if (serviceWrapRef.current && !serviceWrapRef.current.contains(e.target as Node)) {
          setServiceOpen(false);
        }
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setServiceOpen(false);
      };
      document.addEventListener('mousedown', onClick);
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', onClick);
        document.removeEventListener('keydown', onKey);
      };
    }, [serviceOpen]);

    const handleSubmit = () => {
      const date = selectedDate ? selectedDate.toISOString().slice(0, 10) : '';
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

        {/* Body: form + slot + footer */}
        <div className="dls-book-service-form__body">
          {/* Form */}
          <div className="dls-book-service-form__form">
            {/* Name */}
            <InputField
              label={nameLabel}
              placeholder={namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}
            <InputField
              label={emailLabel}
              type="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Service */}
            <div className="dls-book-service-form__field" ref={serviceWrapRef}>
              <label className="dls-book-service-form__label">{serviceLabel}</label>
              <button
                type="button"
                className="dls-book-service-form__select"
                onClick={() => setServiceOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={serviceOpen}
                data-placeholder={!service || undefined}
              >
                <span>{service || servicePlaceholder}</span>
                <span className="dls-book-service-form__select-chevron" data-open={serviceOpen || undefined}>
                  <ChevronDownIcon />
                </span>
              </button>
              {serviceOpen && (
                <List className="dls-book-service-form__service-list" role="listbox">
                  {serviceOptions.map((opt) => (
                    <ListItem
                      key={opt}
                      type="text"
                      text={opt}
                      selected={opt === service}
                      onClick={() => { setService(opt); setServiceOpen(false); }}
                    />
                  ))}
                </List>
              )}
            </div>

            {/* Date */}
            <DateInput
              label={dateLabel}
              placeholder="Select a date"
              selectedDate={selectedDate}
              onDateSelect={(d) => setSelectedDate(d)}
              onClear={() => setSelectedDate(undefined)}
            />

            {/* Checkbox */}
            {showCheckbox && (
              <Checkbox
                checked={agreed}
                onChange={(val) => setAgreed(val)}
                label={checkboxLabel}
              />
            )}
          </div>

          {/* Slot content */}
          {slotContent && (
            <div className="dls-book-service-form__slot">{slotContent}</div>
          )}

          {/* Footer */}
          <div className="dls-book-service-form__footer">
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

BookServiceForm.displayName = 'BookServiceForm';
