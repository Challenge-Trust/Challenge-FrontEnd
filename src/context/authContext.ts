import { createContext } from 'react';
import type { LoginRequest, SessaoUsuario } from '../types';

export interface AuthContextValue {
  sessao: SessaoUsuario | null;
  autenticado: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
