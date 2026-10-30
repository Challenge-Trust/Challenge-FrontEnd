import type { ResumoUsuario as Resumo } from '../types';
import { formatarData, formatarNumero, gramasParaKg } from '../utils/formatacao';
import Card from './Card';

/** Indicadores (pontos, tickets, CO₂ e selo) e históricos de tickets e de CO₂ de um usuário. */
export default function ResumoUsuario({ dados }: { dados: Resumo }) {
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
          <h2 className="mb-4 text-lg font-semibold text-heading">Tickets emitidos</h2>
          {dados.tickets.length === 0 ? (
            <p className="text-sm text-muted">
              Nenhum ticket emitido ainda. A cada 10 pontos é emitido 1 ticket.
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
            <p className="text-sm text-muted">Nenhuma viagem de ônibus registrada até agora.</p>
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
