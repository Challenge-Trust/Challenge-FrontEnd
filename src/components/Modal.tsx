import { useEffect, useId, useRef, type PropsWithChildren } from 'react';
import Button from './Button';

interface ModalProps {
  title: string;
  onClose: () => void;
}

export default function Modal({ title, onClose, children }: PropsWithChildren<ModalProps>) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-cardborder bg-card p-6 text-center text-body backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:p-8"
    >
      <h2 id={titleId} className="mb-3 text-xl font-bold text-heading">
        {title}
      </h2>
      <div className="mb-6 text-sm leading-relaxed text-muted">{children}</div>
      <Button onClick={onClose}>Concluir</Button>
    </dialog>
  );
}
