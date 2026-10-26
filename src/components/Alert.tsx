import type { PropsWithChildren } from 'react';

interface AlertProps {
  tone: 'error' | 'success' | 'info';
}

const tones = {
  error: 'border-red-400/40 bg-red-500/10 text-red-200',
  success: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  info: 'border-accent/40 bg-brand/10 text-body',
};

export default function Alert({ tone, children }: PropsWithChildren<AlertProps>) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`mb-5 rounded-lg border px-4 py-3 text-sm leading-relaxed ${tones[tone]}`}
    >
      {children}
    </div>
  );
}
