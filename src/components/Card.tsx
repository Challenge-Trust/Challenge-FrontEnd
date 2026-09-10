import type { PropsWithChildren } from 'react';

interface CardProps {
  className?: string;
  hoverBrand?: boolean;
}

export default function Card({
  className = '',
  hoverBrand = false,
  children,
}: PropsWithChildren<CardProps>) {
  return (
    <div
      className={`rounded-xl border border-cardborder bg-card p-7 ${
        hoverBrand ? 'transition-colors hover:border-brand' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
