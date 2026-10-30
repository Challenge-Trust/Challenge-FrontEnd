/** Mesmos fatores do CO2EconomiaBO da API (g de CO₂ por km). Usados só para a prévia no formulário. */
export const EMISSAO_CARRO_G_KM = 192;
export const EMISSAO_ONIBUS_G_KM = 1050;

/** Estimativa em gramas; o valor oficial é o calculado e gravado pela API. */
export function estimarEconomiaGramas(distanciaKm: number, passageiros: number): number | null {
  if (!(distanciaKm > 0) || !(passageiros > 0)) return null;
  return (EMISSAO_CARRO_G_KM - EMISSAO_ONIBUS_G_KM / passageiros) * distanciaKm;
}
