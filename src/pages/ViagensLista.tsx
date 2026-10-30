import Button from '../components/Button';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import FlashMessage from '../components/FlashMessage';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../hooks/useAuth';
import { useExclusaoViagem } from '../hooks/useExclusaoViagem';
import { useFetch } from '../hooks/useFetch';
import { usuarioService } from '../services/usuarioService';
import type { Co2Economia } from '../types';
import { formatarData, formatarNumero, gramasParaKg } from '../utils/formatacao';

/** Viagens de ônibus do usuário logado e o CO₂ que cada uma economizou. */
export default function ViagensLista() {
  const { sessao } = useAuth();
  const usuarioId = sessao?.id;
  const { estado, recarregar } = useFetch(
    usuarioId === undefined ? null : `viagens-${usuarioId}`,
    (signal) => usuarioService.listarCo2(Number(usuarioId), signal),
  );
  const { pedirExclusao, dialogo } = useExclusaoViagem(recarregar);

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-10 sm:py-16">
      <PageHeader
        eyebrow="Mobilidade sustentável"
        titulo="Minhas viagens"
        descricao="Registre os trajetos que você fez de ônibus em vez de carro e veja quanto CO₂ deixou de ser emitido."
        acoes={<Button to="/viagens/nova">+ Nova viagem</Button>}
      />
      <FlashMessage />

      {estado.status === 'loading' && <LoadingState mensagem="Carregando suas viagens…" />}
      {estado.status === 'error' && (
        <ErrorState mensagem={estado.message} httpStatus={estado.httpStatus} onRetry={recarregar} />
      )}
      {estado.status === 'success' && estado.data.length === 0 && (
        <EmptyState
          titulo="Nenhuma viagem registrada"
          descricao="Informe a distância e a lotação do ônibus para calcular o CO₂ economizado."
        >
          <Button to="/viagens/nova">Registrar primeira viagem</Button>
        </EmptyState>
      )}
      {estado.status === 'success' && estado.data.length > 0 && (
        <Lista viagens={estado.data} onExcluir={pedirExclusao} />
      )}
      {dialogo}
    </section>
  );
}

interface ListaProps {
  viagens: Co2Economia[];
  onExcluir: (viagem: Co2Economia) => void;
}

function Lista({ viagens, onExcluir }: ListaProps) {
  const totalKg = gramasParaKg(viagens.reduce((soma, v) => soma + v.co2Economizado, 0));
  const totalKm = viagens.reduce((soma, v) => soma + v.distanciaKm, 0);

  return (
    <>
      <dl className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { rotulo: 'Viagens', valor: formatarNumero(viagens.length) },
          { rotulo: 'Distância total', valor: `${formatarNumero(totalKm)} km` },
          { rotulo: 'CO₂ economizado', valor: `${formatarNumero(totalKg)} kg` },
        ].map((item) => (
          <Card key={item.rotulo} padding="compact">
            <dt className="text-xs uppercase tracking-wide text-faint">{item.rotulo}</dt>
            <dd className="mt-2 text-2xl font-bold text-accent">{item.valor}</dd>
          </Card>
        ))}
      </dl>

      <ul className="flex flex-col gap-3">
        {viagens.map((viagem) => (
          <li key={viagem.id}>
            <Card
              padding="compact"
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-lg font-semibold text-heading">
                  {formatarNumero(gramasParaKg(viagem.co2Economizado))} kg de CO₂
                </p>
                <p className="text-sm text-faint">
                  {formatarData(viagem.dataCalculo)} · {formatarNumero(viagem.distanciaKm)} km ·{' '}
                  {viagem.passageiroOnibus} passageiros no ônibus
                </p>
              </div>
              <div className="flex gap-2">
                <Button to={`/viagens/${viagem.id}`} variant="secondary" className="flex-1">
                  Ver
                </Button>
                <Button to={`/viagens/${viagem.id}/editar`} variant="secondary" className="flex-1">
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onExcluir(viagem)}
                  aria-label={`Excluir viagem de ${formatarData(viagem.dataCalculo)}`}
                  className="flex-1"
                >
                  Excluir
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
