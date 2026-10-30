import type { Co2Economia, Co2Request } from '../types';
import { request } from './api';

export const co2Service = {
  /** GET /api/co2 */
  listar: (signal?: AbortSignal) => request<Co2Economia[]>('/api/co2', { signal }),

  /** GET /api/co2/{id} */
  buscar: (id: number, signal?: AbortSignal) => request<Co2Economia>(`/api/co2/${id}`, { signal }),

  /** POST /api/co2 */
  criar: (data: Co2Request) => request<Co2Economia>('/api/co2', { method: 'POST', body: data }),

  /** PUT /api/co2/{id} */
  atualizar: (id: number, data: Co2Request) =>
    request<Co2Economia>(`/api/co2/${id}`, { method: 'PUT', body: data }),

  /** DELETE /api/co2/{id} */
  excluir: (id: number) => request<void>(`/api/co2/${id}`, { method: 'DELETE' }),
};
