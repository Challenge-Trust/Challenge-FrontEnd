import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  titulo: string;
  descricao?: string;
  /** Botões exibidos à direita no desktop e abaixo do título no mobile. */
  acoes?: ReactNode;
}

export default function PageHeader({ eyebrow, titulo, descricao, acoes }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
        <h1 className="mt-3 break-words text-2xl font-bold text-heading sm:text-3xl">{titulo}</h1>
        {descricao && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{descricao}</p>
        )}
      </div>
      {acoes && <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">{acoes}</div>}
    </div>
  );
}
