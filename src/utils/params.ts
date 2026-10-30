/** Converte o :id da URL; só aceita inteiros positivos (senão null → tela de "não encontrado"). */
export function lerId(valor: string | undefined): number | null {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}
