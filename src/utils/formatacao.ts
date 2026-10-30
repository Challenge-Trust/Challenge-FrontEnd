/** Data ISO-8601 da API → dd/mm/aaaa. */
export const formatarData = (iso: string): string =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

/** Número no padrão brasileiro com até 2 casas decimais. */
export const formatarNumero = (n: number): string =>
  n.toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

/** A API calcula o CO₂ economizado em gramas; nas telas exibimos em kg. */
export const gramasParaKg = (gramas: number): number => gramas / 1000;
