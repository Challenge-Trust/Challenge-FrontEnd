import type { PropsWithChildren } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
}

export default function FormField({
  id,
  label,
  required,
  error,
  children,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-sm text-muted">
        {label}{' '}
        {required && (
          <span className="text-accent" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
