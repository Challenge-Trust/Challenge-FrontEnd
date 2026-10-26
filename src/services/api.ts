import type { SessaoUsuario } from '../types';

/** URL base da API Spring Boot. Em produção (Vercel) defina VITE_API_URL. */
export const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/, '');

const SESSION_KEY = 'trustcorp.sessao';

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function lerSessao(): SessaoUsuario | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessaoUsuario) : null;
  } catch {
    return null;
  }
}

export function salvarSessao(sessao: SessaoUsuario | null): void {
  try {
    if (sessao) localStorage.setItem(SESSION_KEY, JSON.stringify(sessao));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* armazenamento indisponível: a sessão vale só até recarregar a página */
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: Method;
  body?: unknown;
  signal?: AbortSignal;
}

/** Único ponto de saída HTTP do front-end (fetch nativo, sem Axios). */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const token = lerSessao()?.token;
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new ApiError('Não foi possível conectar ao servidor. Tente novamente.', 0);
  }

  if (!response.ok) {
    throw new ApiError(await lerMensagemDeErro(response), response.status);
  }

  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

async function lerMensagemDeErro(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string; error?: string };
    if (data.message) return data.message;
    if (data.error) return data.error;
  } catch {
    /* corpo vazio ou não-JSON */
  }
  if (response.status === 401) return 'CPF ou senha inválidos.';
  if (response.status === 404) return 'Registro não encontrado.';
  if (response.status === 409) return 'Já existe um cadastro com esses dados.';
  if (response.status >= 500) return 'Erro no servidor. Tente novamente em instantes.';
  return 'Não foi possível concluir a solicitação.';
}
