import type { PropsWithChildren } from 'react';
import Card from './Card';

interface EmptyStateProps {
  titulo: string;
  descricao: string;
}

/** Lista vazia: explica o motivo e (opcionalmente) oferece uma ação em `children`. */
export default function EmptyState({
  titulo,
  descricao,
  children,
}: PropsWithChildren<EmptyStateProps>) {
  return (
    <Card className="flex flex-col items-center gap-3 py-12 text-center">
      <span aria-hidden="true" className="text-4xl">
        🗂️
      </span>
      <h2 className="text-lg font-semibold text-heading">{titulo}</h2>
      <p className="max-w-md text-sm text-muted">{descricao}</p>
      {children && <div className="mt-3">{children}</div>}
    </Card>
  );
}
