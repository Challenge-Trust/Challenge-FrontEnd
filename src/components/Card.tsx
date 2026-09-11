import type { HTMLAttributes, PropsWithChildren } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverBrand?: boolean;
  padding?: 'compact' | 'normal' | 'large';
}

const spacing = {
  compact: 'p-4 sm:p-5',
  normal: 'p-5 sm:p-7',
  large: 'p-6 sm:p-10',
};

export default function Card({
  className = '',
  hoverBrand = false,
  padding = 'normal',
  children,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <div
      {...props}
      className={`min-w-0 rounded-2xl border border-cardborder bg-card ${spacing[padding]} ${hoverBrand ? 'transition-colors hover:border-accent' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
