import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarioService } from '../services/usuarioService';
import type { LocationState, Usuario } from '../types';
import { useAuth } from './useAuth';

/**
 * Fluxo de exclusão de usuário: guarda quem será excluído (para o diálogo de confirmação),
 * chama DELETE /api/usuarios/{id} e redireciona com mensagem. Excluir a própria conta encerra a sessão.
 */
export function useExclusaoUsuario(aoExcluir?: () => void) {
  const navigate = useNavigate();
  const { sessao, logout } = useAuth();
  const [alvo, setAlvo] = useState<Usuario | null>(null);

  const confirmar = async () => {
    if (!alvo) return;
    await usuarioService.excluir(alvo.id);
    setAlvo(null);

    if (sessao?.id === alvo.id) {
      logout();
      const state: LocationState = { aviso: 'Sua conta foi excluída.' };
      navigate('/login', { replace: true, state });
      return;
    }
    const state: LocationState = { sucesso: `Usuário "${alvo.name}" excluído com sucesso.` };
    navigate('/usuarios', { replace: true, state });
    aoExcluir?.();
  };

  return { alvo, pedirExclusao: setAlvo, cancelar: () => setAlvo(null), confirmar };
}
