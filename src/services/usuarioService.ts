import type { Co2Economia, Pontos, Selo, Ticket } from '../types';
import { request } from './api';

export const usuarioService = {
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
};
