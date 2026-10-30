import Alert from './Alert';
import Button from './Button';
import Card from './Card';

interface ErrorStateProps {
  mensagem: string;
  /** Status HTTP da resposta (0 quando nem chegou ao servidor). */
  httpStatus?: number;
  onRetry?: () => void;
  voltar?: { to: string; label: string };
}

/** Erro de carregamento: 404 vira "não encontrado"; 400/500/rede mostram a mensagem e permitem tentar de novo. */
export default function ErrorState({ mensagem, httpStatus, onRetry, voltar }: ErrorStateProps) {
  if (httpStatus === 404) {
    return (
      <Card padding="large" className="text-center">
        <p className="mb-3 font-semibold text-accent">404</p>
        <h2 className="mb-3 text-2xl font-bold text-heading">Registro não encontrado</h2>
        <p className="mb-8 text-muted">{mensagem}</p>
        {voltar && <Button to={voltar.to}>{voltar.label}</Button>}
      </Card>
    );
  }

  const titulo =
    httpStatus === undefined || httpStatus === 0 || httpStatus >= 500
      ? 'Não foi possível carregar os dados.'
      : 'Não foi possível concluir a solicitação.';

  return (
    <div className="py-8">
      <Alert tone="error">
        <strong className="block font-semibold">{titulo}</strong>
        {mensagem}
      </Alert>
      <div className="flex flex-wrap gap-3">
        {onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
        {voltar && (
          <Button to={voltar.to} variant="secondary">
            {voltar.label}
          </Button>
        )}
      </div>
    </div>
  );
}
