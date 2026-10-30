import { useLocation, useNavigate } from 'react-router-dom';
import type { LocationState } from '../types';
import Alert from './Alert';

/** Mostra a mensagem de sucesso enviada no state da navegação (ex.: após salvar e redirecionar). */
export default function FlashMessage() {
  const location = useLocation();
  const navigate = useNavigate();
  const sucesso = (location.state as LocationState | null)?.sucesso;

  if (!sucesso) return null;

  const fechar = () => navigate(location.pathname, { replace: true, state: null });

  return (
    <Alert tone="success">
      <span className="flex items-start justify-between gap-4">
        <span>{sucesso}</span>
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar aviso"
          className="shrink-0 rounded px-1 text-emerald-200 hover:text-white"
        >
          ✕
        </button>
      </span>
    </Alert>
  );
}
