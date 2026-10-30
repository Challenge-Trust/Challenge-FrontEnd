import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { co2Service } from '../services/co2Service';
import type { Co2Economia, LocationState } from '../types';
import { formatarData, formatarNumero, gramasParaKg } from '../utils/formatacao';

/**
 * Exclusão de viagem com confirmação: `pedirExclusao(viagem)` abre o diálogo,
 * que chama DELETE /api/co2/{id} e volta para /viagens com mensagem de sucesso.
 */
export function useExclusaoViagem(aoExcluir?: () => void) {
  const navigate = useNavigate();
  const [alvo, setAlvo] = useState<Co2Economia | null>(null);

  const confirmar = async () => {
    if (!alvo) return;
    await co2Service.excluir(alvo.id);
    setAlvo(null);
    const state: LocationState = { sucesso: 'Viagem excluída com sucesso.' };
    navigate('/viagens', { replace: true, state });
    aoExcluir?.();
  };

  const dialogo = alvo && (
    <ConfirmDialog titulo="Excluir viagem?" onConfirm={confirmar} onCancel={() => setAlvo(null)}>
      <p>
        A viagem de {formatarData(alvo.dataCalculo)} ({formatarNumero(alvo.distanciaKm)} km,{' '}
        {formatarNumero(gramasParaKg(alvo.co2Economizado))} kg de CO₂) será removida do seu
        histórico.
      </p>
    </ConfirmDialog>
  );

  return { pedirExclusao: setAlvo, dialogo };
}
