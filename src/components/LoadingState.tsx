import { useEffect, useState } from 'react';

interface LoadingStateProps {
  mensagem?: string;
}

/** Tempo após o qual avisamos que a API gratuita pode estar "acordando". */
const AVISO_LENTIDAO_MS = 5000;

export default function LoadingState({ mensagem = 'Carregando…' }: LoadingStateProps) {
  const [demorando, setDemorando] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDemorando(true), AVISO_LENTIDAO_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-cardborder border-t-accent motion-reduce:animate-none"
      />
      <p className="text-muted">{mensagem}</p>
      {demorando && (
        <p className="max-w-sm text-sm text-faint">
          A API está hospedada em um plano gratuito e pode levar até 1 minuto para acordar. Aguarde
          só mais um pouco.
        </p>
      )}
    </div>
  );
}
