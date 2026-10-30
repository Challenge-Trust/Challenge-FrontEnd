import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError } from '../services/api';
import type { AsyncState } from '../types';

/**
 * Carrega dados da API com estado de loading/sucesso/erro, cancelamento ao sair da tela
 * e função para tentar de novo. A requisição roda de novo sempre que `chave` muda;
 * com `chave` nula nada é carregado.
 */
export function useFetch<T>(
  chave: string | null,
  carregar: (signal: AbortSignal) => Promise<T>,
): { estado: AsyncState<T>; recarregar: () => void } {
  const [estado, setEstado] = useState<AsyncState<T>>({ status: 'loading' });
  const [tentativa, setTentativa] = useState(0);
  const carregarRef = useRef(carregar);

  useEffect(() => {
    carregarRef.current = carregar;
  });

  useEffect(() => {
    if (chave === null) return;
    const controller = new AbortController();
    setEstado({ status: 'loading' });

    carregarRef
      .current(controller.signal)
      .then((data) => setEstado({ status: 'success', data }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setEstado(
          error instanceof ApiError
            ? { status: 'error', message: error.message, httpStatus: error.status }
            : { status: 'error', message: 'Erro inesperado ao carregar os dados.' },
        );
      });

    return () => controller.abort();
  }, [chave, tentativa]);

  const recarregar = useCallback(() => setTentativa((n) => n + 1), []);

  return { estado, recarregar };
}
