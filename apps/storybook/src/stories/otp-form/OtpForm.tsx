import React from 'react';
import './otp-form.css';
import { OtpInput } from '../otp-input/OtpInput';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type OtpFormType = '1' | '2' | '3' | '4';

export interface OtpFormProps {
  /** Layout type */
  type?: OtpFormType;
  /** Form title */
  title?: string;
  /** Form subtitle */
  subtitle?: string;
  /** Number of OTP digits */
  length?: number;
  /** OTP input hint text */
  hint?: string;
  /** Button label */
  buttonLabel?: string;
  /** Resend text */
  resendText?: React.ReactNode;
  /** Logo slot (types 3 & 4) */
  logo?: React.ReactNode;
  /** Image slot (types 2 & 4) */
  image?: React.ReactNode;
  /** Terms text (types 3 & 4) */
  termsText?: React.ReactNode;
  /** Extra slot content */
  slotContent?: React.ReactNode;
  /** Called when verify is clicked */
  onVerify?: (code: string) => void;
  /** Called when resend is clicked */
  onResend?: () => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Form content
   --------------------------------------------------------------------------- */

const FormContent = ({
  title = 'Enter verification code',
  subtitle = 'We sent a 6-digit code to your email.',
  length = 6,
  hint = 'Enter the 6-digit code sent to your email.',
  buttonLabel = 'Verify',
  resendText,
  slotContent,
  onVerify,
  onResend,
}: OtpFormProps) => {
  const [code, setCode] = React.useState('');

  return (
    <>
      <div className="dls-otp-form__header">
        <h2 className="dls-otp-form__title">{title}</h2>
        {subtitle && <p className="dls-otp-form__subtitle">{subtitle}</p>}
      </div>

      <div className="dls-otp-form__content">
        <OtpInput
          length={length}
          type="spacing"
          value={code}
          onChange={setCode}
          hint={hint}
        />
      </div>

      {slotContent}

      <div className="dls-otp-form__footer">
        <button
          type="button"
          className="dls-otp-form__btn"
          onClick={() => onVerify?.(code)}
        >
          {buttonLabel}
        </button>
        <p className="dls-otp-form__resend">
          {resendText || (
            <>Didn&apos;t receive the code?{' '}<button type="button" onClick={onResend}>Resend</button></>
          )}
        </p>
      </div>
    </>
  );
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const OtpForm = React.forwardRef<HTMLDivElement, OtpFormProps>(
  (props, ref) => {
    const { type = '1', logo, image, termsText, className, ...formProps } = props;

    const cardContent =
      type === '2' || type === '4' ? (
        <>
          <div className="dls-otp-form__card-form">
            <FormContent {...formProps} />
          </div>
          <div className="dls-otp-form__image">{image || 'Image'}</div>
        </>
      ) : (
        <FormContent {...formProps} />
      );

    return (
      <div
        ref={ref}
        className={['dls-otp-form', className].filter(Boolean).join(' ')}
        data-type={type}
      >
        {(type === '3' || type === '4') && logo && (
          <div className="dls-otp-form__logo">{logo}</div>
        )}

        <div className="dls-otp-form__card">{cardContent}</div>

        {(type === '3' || type === '4') && termsText && (
          <p className="dls-otp-form__terms">{termsText}</p>
        )}
      </div>
    );
  },
);

OtpForm.displayName = 'OtpForm';
