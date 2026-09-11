import Button from '../components/Button';
import Card from '../components/Card';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-10">
      <Card padding="large" className="text-center">
        <p className="mb-3 font-semibold text-accent">404</p>
        <h1 className="mb-4 text-3xl font-bold text-heading">Página não encontrada</h1>
        <p className="mb-8 text-muted">
          Este endereço não existe. Volte ao início para continuar navegando.
        </p>
        <Button to="/">Ir para o início</Button>
      </Card>
    </section>
  );
}
