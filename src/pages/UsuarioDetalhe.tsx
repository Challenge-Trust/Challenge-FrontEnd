import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import ConfirmarExclusaoUsuario from '../components/ConfirmarExclusaoUsuario';
import ErrorState from '../components/ErrorState';
import FlashMessage from '../components/FlashMessage';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';
import ResumoUsuario from '../components/ResumoUsuario';
import { useExclusaoUsuario } from '../hooks/useExclusaoUsuario';
import { useFetch } from '../hooks/useFetch';
import { usuarioService } from '../services/usuarioService';
import type { Usuario } from '../types';
import { formatarNumero } from '../utils/formatacao';
import { lerId } from '../utils/params';

const voltarParaLista = { to: '/usuarios', label: '← Voltar para usuários' };

export default function UsuarioDetalhe() {
  const id = lerId(useParams<{ id: string }>().id);
  const { estado, recarregar } = useFetch(id === null ? null : `usuario-${id}`, (signal) =>
    usuarioService.buscarResumo(Number(id), signal),
  );
  const { alvo, pedirExclusao, cancelar, confirmar } = useExclusaoUsuario();

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-10 sm:py-16">
      {id === null ? (
        <ErrorState
          httpStatus={404}
          mensagem="O endereço informado não corresponde a um usuário."
          voltar={voltarParaLista}
        />
      ) : (
        <>
          {estado.status === 'loading' && <LoadingState mensagem="Carregando usuário…" />}
          {estado.status === 'error' && (
            <ErrorState
              mensagem={estado.message}
              httpStatus={estado.httpStatus}
              onRetry={recarregar}
              voltar={voltarParaLista}
            />
          )}
          {estado.status === 'success' && (
            <>
              <PageHeader
                eyebrow={`Usuário #${estado.data.usuario.id}`}
                titulo={estado.data.usuario.name}
                acoes={
                  <>
                    <Button to={`/usuarios/${estado.data.usuario.id}/editar`}>Editar</Button>
                    <Button variant="danger" onClick={() => pedirExclusao(estado.data.usuario)}>
                      Excluir
                    </Button>
                    <Button to="/usuarios" variant="secondary">
                      Voltar
                    </Button>
                  </>
                }
              />
              <FlashMessage />
              <DadosCadastrais usuario={estado.data.usuario} />
              <ResumoUsuario dados={estado.data} />
            </>
          )}
        </>
      )}
      {alvo && (
        <ConfirmarExclusaoUsuario usuario={alvo} onConfirm={confirmar} onCancel={cancelar} />
      )}
    </section>
  );
}

function DadosCadastrais({ usuario }: { usuario: Usuario }) {
  const campos = [
    { rotulo: 'Nome', valor: usuario.name },
    { rotulo: 'Nome de usuário', valor: usuario.userName ? `@${usuario.userName}` : '—' },
    { rotulo: 'CPF', valor: usuario.cpf },
    {
      rotulo: 'Minutos para o próximo ponto',
      valor: `${formatarNumero(usuario.viewMinutes)} de 180`,
    },
  ];

  return (
    <Card className="mb-6">
      <h2 className="mb-4 text-lg font-semibold text-heading">Dados cadastrais</h2>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {campos.map((campo) => (
          <div key={campo.rotulo} className="min-w-0">
            <dt className="text-xs uppercase tracking-wide text-faint">{campo.rotulo}</dt>
            <dd className="mt-1 break-words text-body">{campo.valor}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
