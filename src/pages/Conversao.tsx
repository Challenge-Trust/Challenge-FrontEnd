import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import Button from '../components/Button';
import Card from '../components/Card';
import { controlClass } from '../components/formStyles';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../services/api';
import { usuarioService } from '../services/usuarioService';
import type { ConversaoResponse, LocationState } from '../types';
import { MINUTOS_POR_PONTO, PONTOS_POR_TICKET, simularConversao } from '../utils/conversao';
import { formatarNumero } from '../utils/formatacao';

export default function Conversao() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-12 sm:px-10 sm:py-16">
      <PageHeader
        eyebrow="Converter créditos"
        titulo="Minutos → pontos → tickets"
        descricao={`A cada ${MINUTOS_POR_PONTO} minutos assistidos você ganha 1 ponto, e a cada ${PONTOS_POR_TICKET} pontos recebe 1 ticket de transporte público.`}
      />
      <div className="flex flex-col gap-6">
        <RegistrarMinutos />
        <Simulador />
      </div>
    </section>
  );
}

/** Usuário logado credita minutos na API; visitante é convidado a entrar. */
function RegistrarMinutos() {
  const { sessao } = useAuth();
  const [minutos, setMinutos] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ConversaoResponse | null>(null);

  if (!sessao) {
    const state: LocationState = { from: '/conversao' };
    return (
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-lg font-semibold text-heading">Converta de verdade</h2>
          <p className="text-sm text-muted">
            Entre na sua conta para registrar os minutos assistidos e receber seus tickets.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
          <Button to="/login" state={state}>
            Entrar
          </Button>
          <Button to="/cadastro" variant="secondary">
            Criar conta
          </Button>
        </div>
      </Card>
    );
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valor = Number(minutos);
    if (!Number.isInteger(valor) || valor <= 0) {
      setErro('Informe os minutos assistidos (número inteiro maior que 0).');
      return;
    }
    setErro(null);
    setResultado(null);
    setEnviando(true);
    try {
      setResultado(await usuarioService.registrarMinutos(sessao.id, { minutos: valor }));
      setMinutos('');
    } catch (error) {
      setErro(
        error instanceof ApiError ? error.message : 'Erro inesperado ao registrar os minutos.',
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Card>
      <h2 className="mb-1 text-lg font-semibold text-heading">Registrar minutos assistidos</h2>
      <p className="mb-5 text-sm text-muted">
        Os minutos são somados ao seu saldo e convertidos automaticamente (máximo de 1440 por
        registro).
      </p>
      {erro && <Alert tone="error">{erro}</Alert>}
      {resultado && (
        <Alert tone="success">
          {resultado.pontosGanhos > 0 || resultado.ticketsEmitidos > 0
            ? `Você ganhou ${resultado.pontosGanhos} ponto(s) e ${resultado.ticketsEmitidos} ticket(s)! `
            : 'Minutos registrados! Ainda não completou um ponto. '}
          Saldo atual: {resultado.earnedPoints} ponto(s) e {resultado.viewMinutes} minuto(s) para o
          próximo ponto.{' '}
          <Link to="/painel" className="font-semibold underline">
            Ver meu painel
          </Link>
        </Alert>
      )}
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 sm:max-w-xs sm:flex-1">
          <label htmlFor="minutos" className="mb-2 block text-sm text-muted">
            Minutos assistidos
          </label>
          <input
            id="minutos"
            type="text"
            inputMode="numeric"
            placeholder="Ex.: 360"
            value={minutos}
            onChange={(event) => setMinutos(event.target.value.replace(/\D/g, '').slice(0, 4))}
            aria-invalid={Boolean(erro)}
            className={controlClass}
          />
        </div>
        <Button type="submit" disabled={enviando}>
          {enviando ? 'Convertendo…' : 'Registrar e converter'}
        </Button>
      </form>
    </Card>
  );
}

function Simulador() {
  const [minutos, setMinutos] = useState('');
  const simulacao = simularConversao(Number(minutos) || 0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinutos(event.target.value.replace(/\D/g, '').slice(0, 7));
  };

  const resultados = [
    { rotulo: 'Pontos gerados', valor: simulacao.pontos },
    { rotulo: 'Tickets', valor: simulacao.tickets },
    { rotulo: 'Pontos que sobram', valor: simulacao.pontosRestantes },
    { rotulo: 'Minutos que sobram', valor: simulacao.minutosRestantes },
  ];

  return (
    <Card>
      <h2 className="mb-1 text-lg font-semibold text-heading">Simulador</h2>
      <p className="mb-5 text-sm text-muted">Veja quantos tickets um tempo de conteúdo rende.</p>
      <label htmlFor="simulador-minutos" className="mb-2 block text-sm text-muted">
        Minutos assistidos
      </label>
      <input
        id="simulador-minutos"
        type="text"
        inputMode="numeric"
        placeholder="Ex.: 1800"
        value={minutos}
        onChange={handleChange}
        className={`${controlClass} mb-6 sm:max-w-xs`}
      />
      <dl aria-live="polite" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {resultados.map((item) => (
          <div key={item.rotulo} className="rounded-xl border border-cardborderalt bg-base/40 p-4">
            <dt className="text-xs uppercase tracking-wide text-faint">{item.rotulo}</dt>
            <dd className="mt-1 text-2xl font-bold text-accent">{formatarNumero(item.valor)}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
