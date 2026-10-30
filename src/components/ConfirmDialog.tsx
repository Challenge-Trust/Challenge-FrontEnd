import { useEffect, useId, useRef, useState, type PropsWithChildren } from 'react';
import { ApiError } from '../services/api';
import Alert from './Alert';
import Button from './Button';

interface ConfirmDialogProps {
  titulo: string;
  rotuloConfirmar?: string;
  /** Ação confirmada (ex.: DELETE na API). Se lançar erro, a mensagem aparece no diálogo. */
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDialog({
  titulo,
  rotuloConfirmar = 'Excluir',
  onConfirm,
  onCancel,
  children,
}: PropsWithChildren<ConfirmDialogProps>) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement;
    element?.showModal();
    return () => {
      element?.close();
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
    };
  }, []);

  const confirmar = async () => {
    setEnviando(true);
    setErro(null);
    try {
      await onConfirm();
    } catch (error) {
      setErro(error instanceof ApiError ? error.message : 'Não foi possível concluir a ação.');
      setEnviando(false);
    }
  };

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        if (!enviando) onCancel();
      }}
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-cardborder bg-card p-6 text-body backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:p-8"
    >
      <h2 id={titleId} className="mb-3 text-xl font-bold text-heading">
        {titulo}
      </h2>
      <div className="mb-6 text-sm leading-relaxed text-muted">{children}</div>
      {erro && <Alert tone="error">{erro}</Alert>}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={enviando}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmar} disabled={enviando}>
          {enviando ? 'Excluindo…' : rotuloConfirmar}
        </Button>
      </div>
    </dialog>
  );
}
