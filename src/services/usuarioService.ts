import type {
  Co2Economia,
  ConversaoResponse,
  MinutosRequest,
  Pontos,
  ResumoUsuario,
  Selo,
  Ticket,
  Usuario,
  UsuarioRequest,
} from '../types';
import { ApiError, request } from './api';

export const usuarioService = {
  /** GET /api/usuarios */
  listar: (signal?: AbortSignal) => request<Usuario[]>('/api/usuarios', { signal }),

  /** GET /api/usuarios/{id} */
  buscar: (id: number, signal?: AbortSignal) => request<Usuario>(`/api/usuarios/${id}`, { signal }),

  /** POST /api/usuarios */
  criar: (data: UsuarioRequest) =>
    request<Usuario>('/api/usuarios', { method: 'POST', body: data }),

  /** PUT /api/usuarios/{id} */
  atualizar: (id: number, data: UsuarioRequest) =>
    request<Usuario>(`/api/usuarios/${id}`, { method: 'PUT', body: data }),

  /** DELETE /api/usuarios/{id} */
  excluir: (id: number) => request<void>(`/api/usuarios/${id}`, { method: 'DELETE' }),

  /** POST /api/usuarios/{id}/minutos */
  registrarMinutos: (id: number, data: MinutosRequest) =>
    request<ConversaoResponse>(`/api/usuarios/${id}/minutos`, { method: 'POST', body: data }),

  /** GET /api/usuarios/{id}/tickets */
  listarTickets: (id: number, signal?: AbortSignal) =>
    request<Ticket[]>(`/api/usuarios/${id}/tickets`, { signal }),

  /** GET /api/usuarios/{id}/pontos */
  buscarPontos: (id: number, signal?: AbortSignal) =>
    request<Pontos>(`/api/usuarios/${id}/pontos`, { signal }),

  /** GET /api/usuarios/{id}/co2 */
  listarCo2: (id: number, signal?: AbortSignal) =>
    request<Co2Economia[]>(`/api/usuarios/${id}/co2`, { signal }),

  /** GET /api/usuarios/{id}/selo */
  buscarSelo: (id: number, signal?: AbortSignal) =>
    request<Selo>(`/api/usuarios/${id}/selo`, { signal }),

  /** Usuário + pontos + tickets + CO₂ + selo em paralelo (pontos inexistentes viram null). */
  buscarResumo: async (id: number, signal?: AbortSignal): Promise<ResumoUsuario> => {
    const [usuario, pontos, tickets, co2, selo] = await Promise.all([
      usuarioService.buscar(id, signal),
      usuarioService.buscarPontos(id, signal).catch((error: unknown) => {
        if (error instanceof ApiError && error.status === 404) return null;
        throw error;
      }),
      usuarioService.listarTickets(id, signal),
      usuarioService.listarCo2(id, signal),
      usuarioService.buscarSelo(id, signal),
    ]);
    return { usuario, pontos, tickets, co2, selo };
  },
};
