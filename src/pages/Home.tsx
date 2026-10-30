import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const steps = [
  {
    number: '1',
    title: 'Assista!',
    text: 'Consuma vídeos educativos e relevantes na SoulUp. Cada minuto assistido conta.',
  },
  {
    number: '2',
    title: 'Acumule pontos!',
    text: 'A cada 180 minutos assistidos você ganha 1 ponto, somado automaticamente ao seu saldo.',
  },
  {
    number: '3',
    title: 'Viaje!',
    text: 'A cada 10 pontos você recebe 1 ticket de transporte público. Simples assim.',
  },
];

const features = [
  {
    title: 'Conversão de minutos',
    text: 'Registre o tempo assistido e veja na hora quantos pontos e tickets você ganhou.',
    to: '/conversao',
  },
  {
    title: 'Viagens sustentáveis',
    text: 'Registre trajetos de ônibus e descubra quanto CO₂ deixou de emitir em relação ao carro.',
    to: '/viagens',
  },
  {
    title: 'Painel e selo verde',
    text: 'Acompanhe pontos, tickets e CO₂ economizado e conquiste os selos Bronze, Prata e Ouro.',
    to: '/painel',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="flex min-h-[70vh] items-center justify-center px-6 py-20 sm:px-10">
        <Card padding="large" className="w-full max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-heading sm:text-4xl">
            Seu tempo assistindo vale <span className="text-accent">passagens reais</span>
          </h1>
          <p className="mb-8 leading-relaxed text-muted">
            Assista conteúdos, acumule pontos e troque por tickets de transporte público. Ainda
            acompanhe o CO₂ que você deixa de emitir indo de ônibus.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/cadastro" className="w-full sm:w-auto">
              Criar minha conta →
            </Button>
            <Button to="/conversao" variant="secondary" className="w-full sm:w-auto">
              Simular conversão
            </Button>
          </div>
        </Card>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Como funciona?
          </span>
          <h2 className="my-3 text-2xl font-bold leading-tight text-heading sm:text-3xl">
            Do vídeo ao bilhete
            <br />
            em 3 etapas
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-faint">
            Transformamos tempo de conteúdo em mobilidade urbana para quem usa o transporte público.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.number}>
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-xl font-bold text-accent">
                {step.number}
              </span>
              <h3 className="mb-2 font-semibold text-heading">{step.title}</h3>
              <p className="text-sm leading-relaxed text-faint">{step.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="px-6 pb-20 sm:px-10">
        <h2 className="mb-8 mt-4 text-center text-xs font-semibold uppercase tracking-widest text-accent">
          Funcionalidades
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.to} className="min-w-0 rounded-2xl">
              <Card hoverBrand className="h-full">
                <h3 className="mb-2 font-semibold text-heading">{feature.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-faint">{feature.text}</p>
                <span className="text-sm text-accent">Acessar →</span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
