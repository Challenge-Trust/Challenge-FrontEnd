/** Valida o ID da URL e retorna null quando o valor não é um inteiro positivo seguro. */
export function lerId(valor: string | undefined): number | null {
  const id = Number(valor);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
