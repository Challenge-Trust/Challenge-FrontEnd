/** Mesmas regras do ConversaoBO da API. */
export const MINUTOS_POR_PONTO = 180;
export const PONTOS_POR_TICKET = 10;

export interface Simulacao {
  pontos: number;
  tickets: number;
  pontosRestantes: number;
  minutosRestantes: number;
}

/** Simula quantos pontos e tickets um total de minutos gera (sem considerar saldo anterior). */
export function simularConversao(minutos: number): Simulacao {
  const total = Math.max(0, Math.floor(minutos));
  const pontos = Math.floor(total / MINUTOS_POR_PONTO);
  return {
    pontos,
    tickets: Math.floor(pontos / PONTOS_POR_TICKET),
    pontosRestantes: pontos % PONTOS_POR_TICKET,
    minutosRestantes: total % MINUTOS_POR_PONTO,
  };
}
