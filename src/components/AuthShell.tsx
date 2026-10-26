import type { PropsWithChildren } from 'react';
import Card from './Card';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
}

/** Moldura compartilhada pelas páginas de login, cadastro e recuperação de senha. */
export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: PropsWithChildren<AuthShellProps>) {
  return (
    <section className="mx-auto max-w-md px-5 py-12 sm:px-10 sm:py-16">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
        <h1 className="my-3 text-3xl font-bold text-heading">{title}</h1>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
      <Card>{children}</Card>
    </section>
  );
}
