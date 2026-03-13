import React from 'react';
import './signup-form.css';

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type SignupFormType = '1' | '2' | '3' | '4';

type StrengthLevel = 'none' | 'weak' | 'fair' | 'good' | 'strong';

export interface SignupFormProps {
  /** Layout type */
  type?: SignupFormType;
  /** Form title */
  title?: string;
  /** Form subtitle */
  subtitle?: string;
  /** Logo slot (types 3 & 4) */
  logo?: React.ReactNode;
  /** Image slot (types 2 & 4) */
  image?: React.ReactNode;
  /** Primary button label */
  primaryButtonLabel?: string;
  /** Show social login button */
  showSocialLogin?: boolean;
  /** Social login label */
  socialLoginLabel?: string;
  /** Social login icon */
  socialLoginIcon?: React.ReactNode;
  /** Show "or" divider (type 3 & 4) */
  showOrDivider?: boolean;
  /** Show password strength bar */
  showPasswordStrength?: boolean;
  /** Bottom text */
  bottomText?: React.ReactNode;
  /** Terms text (types 3 & 4) */
  termsText?: React.ReactNode;
  /** Extra slot */
  slotContent?: React.ReactNode;
  /** Submit handler */
  onSubmit?: (data: { fullName: string; email: string; password: string; confirmPassword: string }) => void;
  className?: string;
}

/* ---------------------------------------------------------------------------
   Google icon
   --------------------------------------------------------------------------- */

const GoogleIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M15.5 8.2c0-.6-.1-1.1-.2-1.6H8v3h4.2c-.2.9-.7 1.7-1.5 2.2v1.8h2.4c1.4-1.3 2.4-3.2 2.4-5.4z" fill="#4285F4" />
    <path d="M8 16c2 0 3.7-.7 5-1.8l-2.4-1.9c-.7.5-1.5.7-2.6.7-2 0-3.7-1.4-4.3-3.2H1.2v1.9C2.5 14.2 5 16 8 16z" fill="#34A853" />
    <path d="M3.7 9.5c-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5V4.6H1.2C.4 6 0 7.5 0 8s.4 2 1.2 3.4l2.5-1.9z" fill="#FBBC05" />
    <path d="M8 3.2c1.1 0 2.1.4 2.9 1.1l2.2-2.2C11.7.8 10 0 8 0 5 0 2.5 1.8 1.2 4.6l2.5 1.9C4.3 4.5 6 3.2 8 3.2z" fill="#EA4335" />
  </svg>
);

/* ---------------------------------------------------------------------------
   Password strength helper
   --------------------------------------------------------------------------- */

function getStrength(password: string): { level: StrengthLevel; label: string; segments: number } {
  if (!password) return { level: 'none', label: '', segments: 0 };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 'weak', label: 'Weak', segments: 1 };
  if (score === 2) return { level: 'fair', label: 'So-so', segments: 2 };
  if (score === 3) return { level: 'good', label: 'Good', segments: 3 };
  return { level: 'strong', label: 'Strong', segments: 4 };
}

/* ---------------------------------------------------------------------------
   Strength bar
   --------------------------------------------------------------------------- */

const StrengthBar = ({ password }: { password: string }) => {
  const { level, label, segments } = getStrength(password);

  return (
    <div className="dls-signup__strength" data-level={level}>
      <div className="dls-signup__strength-bar">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="dls-signup__strength-segment"
            data-active={i <= segments ? '' : undefined}
          />
        ))}
      </div>
      {label && <span className="dls-signup__strength-label">{label}</span>}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   Form content
   --------------------------------------------------------------------------- */

const FormContent = (props: SignupFormProps) => {
  const {
    title = 'Create account',
    subtitle = 'Enter your information below to create your account',
    primaryButtonLabel = 'Create account',
    showSocialLogin = true,
    socialLoginLabel = 'Sign up with Google',
    socialLoginIcon,
    showOrDivider = false,
    showPasswordStrength = true,
    bottomText,
    slotContent,
    onSubmit,
  } = props;

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ fullName, email, password, confirmPassword });
  };

  return (
    <>
      <div className="dls-signup__header">
        <h2 className="dls-signup__title">{title}</h2>
        {subtitle && <p className="dls-signup__subtitle">{subtitle}</p>}
      </div>

      {/* Social first (types 3 & 4) */}
      {showOrDivider && showSocialLogin && (
        <div className="dls-signup__social">
          <button type="button" className="dls-signup__btn-outline">
            {socialLoginIcon || <GoogleIcon />}
            {socialLoginLabel}
          </button>
        </div>
      )}

      {showOrDivider && <div className="dls-signup__or">or</div>}

      <form className="dls-signup__form" onSubmit={handleSubmit}>
        <div className="dls-signup__field">
          <label className="dls-signup__label">Full name</label>
          <input
            className="dls-signup__input"
            type="text"
            placeholder="Enter..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className="dls-signup__field">
          <label className="dls-signup__label">Email</label>
          <input
            className="dls-signup__input"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="dls-signup__field">
          <label className="dls-signup__label">Password</label>
          <input
            className="dls-signup__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          {showPasswordStrength && <StrengthBar password={password} />}
          <span className="dls-signup__hint">Must be at least 8 characters long.</span>
        </div>

        <div className="dls-signup__field">
          <label className="dls-signup__label">Confirm password</label>
          <input
            className="dls-signup__input"
            type="password"
            placeholder="Enter..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
      </form>

      {slotContent}

      <div className="dls-signup__footer">
        <div className="dls-signup__buttons">
          <button
            type="submit"
            className="dls-signup__btn-primary"
            onClick={() => onSubmit?.({ fullName, email, password, confirmPassword })}
          >
            {primaryButtonLabel}
          </button>
          {!showOrDivider && showSocialLogin && (
            <button type="button" className="dls-signup__btn-outline">
              {socialLoginIcon || <GoogleIcon />}
              {socialLoginLabel}
            </button>
          )}
        </div>
        {bottomText && <p className="dls-signup__bottom-text">{bottomText}</p>}
      </div>
    </>
  );
};

/* ---------------------------------------------------------------------------
   Component
   --------------------------------------------------------------------------- */

export const SignupForm = React.forwardRef<HTMLDivElement, SignupFormProps>(
  (props, ref) => {
    const { type = '1', logo, image, termsText, className, ...formProps } = props;

    const defaults: SignupFormProps = {
      showOrDivider: type === '3' || type === '4',
      bottomText: <>Already have an account? <a href="#">Login</a></>,
      ...formProps,
    };

    const cardContent =
      type === '2' || type === '4' ? (
        <>
          <div className="dls-signup__card-form">
            <FormContent {...defaults} />
          </div>
          <div className="dls-signup__image">{image || 'Image'}</div>
        </>
      ) : (
        <FormContent {...defaults} />
      );

    return (
      <div
        ref={ref}
        className={['dls-signup', className].filter(Boolean).join(' ')}
        data-type={type}
      >
        {(type === '3' || type === '4') && logo && (
          <div className="dls-signup__logo">{logo}</div>
        )}

        <div className="dls-signup__card">{cardContent}</div>

        {(type === '3' || type === '4') && termsText && (
          <p className="dls-signup__terms">{termsText}</p>
        )}
      </div>
    );
  },
);

SignupForm.displayName = 'SignupForm';
