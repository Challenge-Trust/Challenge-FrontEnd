import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'danger';

/** Classes Tailwind de cada variante do botão. */
const appearances: Record<Variant, string> = {
  primary:
    'bg-brand bg-[linear-gradient(135deg,rgba(153,180,255,0.16),transparent)] text-white shadow-[0_8px_24px_-12px_rgba(66,99,220,0.8)] hover:bg-brandhover',
  secondary: 'border border-cardborder bg-base/40 text-muted hover:border-accent hover:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

type Appearance = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonProps = Appearance &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { to?: never })
    | (LinkProps & { to: LinkProps['to'] })
  );

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props;
  const appearance = appearances[variant];
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-center text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${appearance} ${className}`;

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link {...(rest as LinkProps)} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} type={buttonProps.type ?? 'button'} className={classes}>
      {children}
    </button>
  );
}
