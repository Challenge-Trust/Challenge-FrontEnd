import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../services/api';
import { usuarioService } from '../services/usuarioService';
import type { AsyncState, Co2Economia, Pontos, Selo, Ticket } from '../types';

interface DadosPainel {
  tickets: Ticket[];
  pontos: Pontos | null;
  co2: Co2Economia[];
  selo: Selo;
}

const formatarData = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const formatarNumero = (n: number) =>
  n.toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 0 });

/** A API calcula o CO₂ economizado em gramas; no painel exibimos em kg. */
const gramasParaKg = (gramas: number) => gramas / 1000;

/** Usuário sem registro de pontos ainda: a API pode responder 404, tratado como saldo zero. */
const pontosOuNulo = (promise: Promise<Pontos>) =>
  promise.catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  });

export default function Painel() {
  const { sessao, logout } = useAuth();
  const usuarioId = sessao?.id;
  const [estado, setEstado] = useState<AsyncState<DadosPainel>>({ status: 'loading' });
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    if (usuarioId === undefined) return;
    const controller = new AbortController();
    const { signal } = controller;

    Promise.all([
      usuarioService.listarTickets(usuarioId, signal),
      pontosOuNulo(usuarioService.buscarPontos(usuarioId, signal)),
      usuarioService.listarCo2(usuarioId, signal),
      usuarioService.buscarSelo(usuarioId, signal),
    ])
      .then(([tickets, pontos, co2, selo]) =>
        setEstado({ status: 'success', data: { tickets, pontos, co2, selo } }),
      )
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        if (error instanceof ApiError && error.status === 401) {
          logout();
          return;
        }
        setEstado({
          status: 'error',
          message: error instanceof ApiError ? error.message : 'Erro ao carregar seus dados.',
        });
      });

    return () => controller.abort();
  }, [usuarioId, tentativa, logout]);

  const recarregar = () => {
    setEstado({ status: 'loading' });
    setTentativa((n) => n + 1);
  };

  if (!sessao) return null;

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-10 sm:py-16">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Meu painel
          </span>
          <h1 className="mt-3 break-words text-3xl font-bold text-heading">
            Olá, {sessao.name.split(' ')[0]}!
          </h1>
          <p className="mt-2 text-sm text-muted">
            {formatarNumero(sessao.viewMinutes)} minutos acumulados para o próximo ponto (cada 180
            minutos assistidos = 1 ponto)
          </p>
        </div>
        <Button variant="secondary" onClick={logout} className="w-full sm:w-auto">
          Sair
        </Button>
      </div>

      {estado.status === 'loading' && (
        <p role="status" aria-live="polite" className="py-16 text-center text-muted">
          Carregando seus dados…
        </p>
      )}

      {estado.status === 'error' && (
        <div>
          <Alert tone="error">{estado.message}</Alert>
          <Button onClick={recarregar}>Tentar novamente</Button>
        </div>
      )}

      {estado.status === 'success' && <Resumo dados={estado.data} />}
    </section>
  );
}

function Resumo({ dados }: { dados: DadosPainel }) {
  const totalTickets = dados.tickets.reduce((soma, t) => soma + t.tickets, 0);
  const totalCo2 = gramasParaKg(dados.co2.reduce((soma, c) => soma + c.co2Economizado, 0));
  const saldoPontos = dados.pontos?.earnedPoints ?? 0;

  const indicadores = [
    { rotulo: 'Pontos', valor: formatarNumero(saldoPontos), unidade: 'pts' },
    { rotulo: 'Tickets', valor: formatarNumero(totalTickets), unidade: 'tickets' },
    { rotulo: 'CO₂ economizado', valor: formatarNumero(totalCo2), unidade: 'kg' },

    { rotulo: 'Selo sustentável', valor: dados.selo.selo, unidade: '' },
  ];

  return (
    <>
      <dl className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {indicadores.map((item) => (
          <Card key={item.rotulo} padding="compact">
            <dt className="text-xs uppercase tracking-wide text-faint">{item.rotulo}</dt>
            <dd className="mt-2 text-3xl font-bold text-accent">
              {item.valor} <span className="text-sm font-normal text-muted">{item.unidade}</span>
            </dd>
          </Card>
        ))}
      </dl>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-heading">Meus tickets</h2>
          {dados.tickets.length === 0 ? (
            <p className="text-sm text-muted">
              Você ainda não emitiu tickets. A cada 10 pontos você ganha 1 ticket.
            </p>
          ) : (
            <ul className="divide-y divide-cardborderalt">
              {dados.tickets.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="text-body">
                    {t.tickets} {t.tickets === 1 ? 'ticket' : 'tickets'}
                  </span>
                  <span className="text-faint">{formatarData(t.dataEmissao)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-heading">CO₂ economizado</h2>
          {dados.co2.length === 0 ? (
            <p className="text-sm text-muted">Nenhum cálculo de CO₂ registrado até agora.</p>
          ) : (
            <ul className="divide-y divide-cardborderalt">
              {dados.co2.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="min-w-0 text-body">
                    {formatarNumero(gramasParaKg(c.co2Economizado))} kg
                    <span className="block text-xs text-faint">
                      {formatarNumero(c.distanciaKm)} km · {c.passageiroOnibus}{' '}
                      {c.passageiroOnibus === 1 ? 'passageiro' : 'passageiros'}
                    </span>
                  </span>
                  <span className="shrink-0 text-faint">{formatarData(c.dataCalculo)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
