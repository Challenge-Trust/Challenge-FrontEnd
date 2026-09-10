import Card from '../components/Card';

const stats = [
  { icon: '🎥', label: 'Vídeos Recompensados' },
  { icon: '🎯', label: 'Sistema de Pontos' },
  { icon: '🚌', label: 'Créditos de Transporte' },
];

const infoCards = [
  {
    title: 'Como Funciona?',
    text: 'O usuário assiste vídeos dentro da plataforma, interage com conteúdos e acumula pontos conforme sua participação.',
  },
  {
    title: 'Recompensas',
    text: 'Os pontos acumulados podem ser convertidos em créditos para transporte público, incentivando o uso consciente da plataforma.',
  },
  {
    title: 'Nosso Objetivo',
    text: 'Criar uma rede social que transforme tempo online em benefícios reais, promovendo acesso à mobilidade urbana de forma inovadora.',
  },
];

export default function Sobre() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2">
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-brand">
          Sobre a solução para Soul Up
        </span>
        <h1 className="my-4 text-2xl font-bold leading-snug text-heading sm:text-3xl">
          Assista conteúdos, acumule pontos e transforme em mobilidade!
        </h1>

        <p className="mb-4 leading-relaxed text-muted">
          O SoulUp é uma rede social criada para incentivar o consumo de
          conteúdos relevantes e educativos de forma recompensadora.
        </p>
        <p className="mb-4 leading-relaxed text-muted">
          Na plataforma, os usuários assistem vídeos, acumulam pontos por
          participação e podem trocar esses pontos por créditos para
          transporte público, tornando o acesso à mobilidade mais acessível.
        </p>
        <p className="mb-8 leading-relaxed text-muted">
          Nosso objetivo é unir entretenimento, aprendizado e impacto social,
          criando uma experiência onde o tempo investido em conteúdo gera
          benefícios reais no dia a dia.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-cardborder bg-card p-4 text-center"
            >
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-sm text-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {infoCards.map((card) => (
          <Card key={card.title}>
            <h3 className="mb-2 font-semibold text-heading">{card.title}</h3>
            <p className="text-sm leading-relaxed text-faint">{card.text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
