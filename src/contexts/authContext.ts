import { createContext } from 'react';
import type { LoginRequest, SessaoUsuario, Usuario } from '../types';

export interface AuthContextValue {
  sessao: SessaoUsuario | null;
  autenticado: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  /** Mantém a sessão em dia quando o próprio usuário edita seus dados. */
  atualizarSessao: (usuario: Usuario) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
