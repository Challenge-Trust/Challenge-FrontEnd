import Button from '../components/Button';
import ErrorState from '../components/ErrorState';
import FlashMessage from '../components/FlashMessage';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';
import ResumoUsuario from '../components/ResumoUsuario';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { usuarioService } from '../services/usuarioService';
import { formatarNumero } from '../utils/formatacao';

export default function Painel() {
  const { sessao, logout } = useAuth();
  const usuarioId = sessao?.id;
  const { estado, recarregar } = useFetch(
    usuarioId === undefined ? null : `painel-${usuarioId}`,
    (signal) => usuarioService.buscarResumo(Number(usuarioId), signal),
  );

  if (!sessao) return null;

  const minutos =
    estado.status === 'success' ? estado.data.usuario.viewMinutes : sessao.viewMinutes;

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-10 sm:py-16">
      <PageHeader
        eyebrow="Meu painel"
        titulo={`Olá, ${sessao.name.split(' ')[0]}!`}
        descricao={`${formatarNumero(minutos)} minutos acumulados para o próximo ponto (cada 180 minutos assistidos = 1 ponto).`}
        acoes={
          <>
            <Button to="/conversao">Registrar minutos</Button>
            <Button variant="secondary" onClick={logout}>
              Sair
            </Button>
          </>
        }
      />
      <FlashMessage />

      {estado.status === 'loading' && <LoadingState mensagem="Carregando seus dados…" />}
      {estado.status === 'error' && (
        <ErrorState mensagem={estado.message} httpStatus={estado.httpStatus} onRetry={recarregar} />
      )}
      {estado.status === 'success' && <ResumoUsuario dados={estado.data} />}
    </section>
  );
}
