import { useState, type ChangeEvent } from 'react';
import Card from '../components/Card';
import { controlClass } from '../components/formStyles';
import PageHeader from '../components/PageHeader';
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
      <Simulador />
    </section>
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
