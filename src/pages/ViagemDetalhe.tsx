import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import ErrorState from '../components/ErrorState';
import FlashMessage from '../components/FlashMessage';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../hooks/useAuth';
import { useExclusaoViagem } from '../hooks/useExclusaoViagem';
import { useFetch } from '../hooks/useFetch';
import { co2Service } from '../services/co2Service';
import type { Co2Economia } from '../types';
import { EMISSAO_CARRO_G_KM, EMISSAO_ONIBUS_G_KM } from '../utils/co2';
import { formatarData, formatarNumero, gramasParaKg } from '../utils/formatacao';
import { lerId } from '../utils/params';

const voltar = { to: '/viagens', label: '← Voltar para viagens' };

export default function ViagemDetalhe() {
  const { sessao } = useAuth();
  const id = lerId(useParams<{ id: string }>().id);
  const { estado, recarregar } = useFetch(id === null ? null : `viagem-${id}`, (signal) =>
    co2Service.buscar(Number(id), signal),
  );
  /** Viagem de outro usuário é tratada como inexistente. */
  const deOutroUsuario = estado.status === 'success' && estado.data.usuarioId !== sessao?.id;

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-10 sm:py-16">
      {(id === null || deOutroUsuario) && (
        <ErrorState httpStatus={404} mensagem="Viagem não encontrada." voltar={voltar} />
      )}
      {id !== null && !deOutroUsuario && (
        <>
          {estado.status === 'loading' && <LoadingState mensagem="Carregando viagem…" />}
          {estado.status === 'error' && (
            <ErrorState
              mensagem={estado.message}
              httpStatus={estado.httpStatus}
              onRetry={recarregar}
              voltar={voltar}
            />
          )}
          {estado.status === 'success' && <Detalhe viagem={estado.data} />}
        </>
      )}
    </section>
  );
}

function Detalhe({ viagem }: { viagem: Co2Economia }) {
  const { pedirExclusao, dialogo } = useExclusaoViagem();
  const emissaoPorPassageiro = EMISSAO_ONIBUS_G_KM / viagem.passageiroOnibus;
  const campos = [
    { rotulo: 'Data do cálculo', valor: formatarData(viagem.dataCalculo) },
    { rotulo: 'Distância', valor: `${formatarNumero(viagem.distanciaKm)} km` },
    { rotulo: 'Passageiros no ônibus', valor: formatarNumero(viagem.passageiroOnibus) },
    {
      rotulo: 'CO₂ economizado',
      valor: `${formatarNumero(gramasParaKg(viagem.co2Economizado))} kg (${formatarNumero(viagem.co2Economizado)} g)`,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`Viagem #${viagem.id}`}
        titulo={`${formatarNumero(gramasParaKg(viagem.co2Economizado))} kg de CO₂ a menos`}
        acoes={
          <>
            <Button to={`/viagens/${viagem.id}/editar`}>Editar</Button>
            <Button variant="danger" onClick={() => pedirExclusao(viagem)}>
              Excluir
            </Button>
            <Button to="/viagens" variant="secondary">
              Voltar
            </Button>
          </>
        }
      />
      <FlashMessage />
      {dialogo}

      <Card className="mb-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {campos.map((campo) => (
            <div key={campo.rotulo}>
              <dt className="text-xs uppercase tracking-wide text-faint">{campo.rotulo}</dt>
              <dd className="mt-1 text-body">{campo.valor}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold text-heading">Como o cálculo é feito</h2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-muted">
          <li>Um carro emite em média {EMISSAO_CARRO_G_KM} g de CO₂ por km.</li>
          <li>
            Um ônibus emite {formatarNumero(EMISSAO_ONIBUS_G_KM)} g/km, divididos entre{' '}
            {viagem.passageiroOnibus} passageiros = {formatarNumero(emissaoPorPassageiro)} g/km por
            pessoa.
          </li>
          <li>
            Economia = ({EMISSAO_CARRO_G_KM} − {formatarNumero(emissaoPorPassageiro)}) ×{' '}
            {formatarNumero(viagem.distanciaKm)} km ={' '}
            <strong className="text-accent">{formatarNumero(viagem.co2Economizado)} g</strong>.
          </li>
        </ul>
      </Card>
    </>
  );
}
