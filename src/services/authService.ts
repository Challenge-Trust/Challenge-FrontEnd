import type {
  CadastroRequest,
  LoginRequest,
  MensagemResponse,
  RecuperarSenhaRequest,
  SessaoUsuario,
  Usuario,
} from '../types';
import { request } from './api';

export const authService = {
  /** POST /api/auth/login */
  login: (data: LoginRequest) =>
    request<SessaoUsuario>('/api/auth/login', { method: 'POST', body: data }),

  /** POST /api/usuarios */
  cadastrar: (data: CadastroRequest) =>
    request<Usuario>('/api/usuarios', { method: 'POST', body: data }),

  /** POST /api/auth/recuperar-senha */
  recuperarSenha: (data: RecuperarSenhaRequest) =>
    request<MensagemResponse>('/api/auth/recuperar-senha', { method: 'POST', body: data }),
};
