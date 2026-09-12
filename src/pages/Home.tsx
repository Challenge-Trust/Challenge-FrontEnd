import Button from '../components/Button';
import Card from '../components/Card';

const steps = [
  {
    number: '1',
    title: 'Acumule Pontos!',
    text: 'Use seu cartão fidelidade no dia a dia e acumule pontos em compras, serviços e parceiros.',
  },
  {
    number: '2',
    title: 'Converta!',
    text: 'Acesse o app, escolha quantos pontos deseja converter e selecione a modalidade de transporte.',
  },
  {
    number: '3',
    title: 'Viaje!',
    text: 'Receba um voucher digital ou crédito direto no bilhete eletrônico integrado.',
  },
];

const features = [
  {
    title: 'Vouchers Digitais',
    text: 'Gere vouchers com QR Code para uso imediato nas catracas e terminais parceiros.',
  },
  {
    title: 'Integração com Bilhetagem',
    text: 'Crédito automático no seu cartão de transporte.',
  },
  {
    title: 'Acessibilidade',
    text: 'Interface com suporte a leitores de tela e fontes ajustáveis.',
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="flex min-h-[70vh] items-center justify-center px-6 py-20 sm:px-10">
        <Card padding="large" className="w-full max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-heading sm:text-4xl">
            Seus pontos valem <span className="text-accent">passagens reais</span>
          </h1>
          <p className="mb-8 leading-relaxed text-muted">
            Converta pontos de fidelidade em passagens de transporte público. Simples, rápido e sem
            burocracia.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/sobre" className="w-full sm:w-auto">
              Conhecer a solução →
            </Button>
            <Button to="/contato" variant="secondary" className="w-full sm:w-auto">
              Fale conosco
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
            Dos pontos ao bilhete
            <br />
            em 3 etapas
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-faint">
            Conectamos seu programa de pontos diretamente a rede de transporte público da sua
            cidade.
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
            <Card key={feature.title} hoverBrand>
              <h3 className="mb-2 font-semibold text-heading">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-faint">{feature.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
