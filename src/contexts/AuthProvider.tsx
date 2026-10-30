import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';
import { lerSessao, salvarSessao } from '../services/api';
import { authService } from '../services/authService';
import type { LoginRequest, SessaoUsuario, Usuario } from '../types';
import { AuthContext } from './authContext';

export function AuthProvider({ children }: PropsWithChildren) {
  const [sessao, setSessao] = useState<SessaoUsuario | null>(lerSessao);

  const login = useCallback(async (data: LoginRequest) => {
    const resposta = await authService.login(data);
    salvarSessao(resposta);
    setSessao(resposta);
  }, []);

  const logout = useCallback(() => {
    salvarSessao(null);
    setSessao(null);
  }, []);

  const atualizarSessao = useCallback((usuario: Usuario) => {
    setSessao((atual) => {
      if (!atual || atual.id !== usuario.id) return atual;
      const nova = { ...atual, ...usuario };
      salvarSessao(nova);
      return nova;
    });
  }, []);

  const value = useMemo(
    () => ({ sessao, autenticado: sessao !== null, login, logout, atualizarSessao }),
    [sessao, login, logout, atualizarSessao],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
