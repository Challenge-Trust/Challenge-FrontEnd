import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Appearance = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

type ButtonProps = Appearance &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { to?: never })
    | (LinkProps & { to: LinkProps['to'] })
  );

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props;
  const appearance =
    variant === 'primary'
      ? 'bg-brand text-white hover:bg-brandhover'
      : 'border border-cardborder bg-base/40 text-muted hover:border-accent hover:text-white';
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
