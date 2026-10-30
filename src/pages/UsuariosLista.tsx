import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import ConfirmarExclusaoUsuario from '../components/ConfirmarExclusaoUsuario';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import FlashMessage from '../components/FlashMessage';
import { controlClass } from '../components/formStyles';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';
import { useExclusaoUsuario } from '../hooks/useExclusaoUsuario';
import { useFetch } from '../hooks/useFetch';
import { usuarioService } from '../services/usuarioService';
import type { Usuario } from '../types';
import { apenasDigitos } from '../utils/cpf';
import { formatarNumero } from '../utils/formatacao';

/** Filtra por nome, nome de usuário ou CPF (com ou sem máscara). */
function filtrar(usuarios: Usuario[], busca: string): Usuario[] {
  const termo = busca.trim().toLowerCase();
  if (!termo) return usuarios;
  const digitos = apenasDigitos(termo);
  return usuarios.filter(
    (u) =>
      u.name.toLowerCase().includes(termo) ||
      (u.userName ?? '').toLowerCase().includes(termo) ||
      (digitos.length > 0 && apenasDigitos(u.cpf).includes(digitos)),
  );
}

export default function UsuariosLista() {
  const [busca, setBusca] = useState('');
  const { estado, recarregar } = useFetch('usuarios', (signal) => usuarioService.listar(signal));
  const { alvo, pedirExclusao, cancelar, confirmar } = useExclusaoUsuario(recarregar);

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-10 sm:py-16">
      <PageHeader
        eyebrow="Gestão"
        titulo="Usuários"
        descricao="Usuários cadastrados na SoulUp. Abra um usuário para ver pontos, tickets e CO₂ economizado."
        acoes={<Button to="/usuarios/novo">+ Novo usuário</Button>}
      />
      <FlashMessage />

      {estado.status === 'loading' && <LoadingState mensagem="Carregando usuários…" />}
      {estado.status === 'error' && (
        <ErrorState mensagem={estado.message} httpStatus={estado.httpStatus} onRetry={recarregar} />
      )}
      {estado.status === 'success' && estado.data.length === 0 && (
        <EmptyState
          titulo="Nenhum usuário cadastrado"
          descricao="Cadastre o primeiro usuário para começar a acumular pontos."
        >
          <Button to="/usuarios/novo">Cadastrar usuário</Button>
        </EmptyState>
      )}
      {estado.status === 'success' && estado.data.length > 0 && (
        <ListaUsuarios
          usuarios={estado.data}
          busca={busca}
          onBuscar={setBusca}
          onExcluir={pedirExclusao}
        />
      )}
      {alvo && (
        <ConfirmarExclusaoUsuario usuario={alvo} onConfirm={confirmar} onCancel={cancelar} />
      )}
    </section>
  );
}

interface ListaUsuariosProps {
  usuarios: Usuario[];
  busca: string;
  onBuscar: (valor: string) => void;
  onExcluir: (usuario: Usuario) => void;
}

function ListaUsuarios({ usuarios, busca, onBuscar, onExcluir }: ListaUsuariosProps) {
  const filtrados = filtrar(usuarios, busca);

  return (
    <>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="busca" className="sr-only">
          Buscar usuário
        </label>
        <input
          id="busca"
          type="search"
          value={busca}
          onChange={(event) => onBuscar(event.target.value)}
          placeholder="Buscar por nome ou CPF"
          className={`${controlClass} sm:max-w-sm`}
        />
        <p className="text-sm text-faint" aria-live="polite">
          {filtrados.length} de {usuarios.length} usuário(s)
        </p>
      </div>

      {filtrados.length === 0 ? (
        <EmptyState
          titulo="Nenhum resultado"
          descricao={`Nenhum usuário corresponde a "${busca}".`}
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((usuario) => (
            <li key={usuario.id} className="min-w-0">
              <Card padding="compact" className="flex h-full flex-col gap-4">
                <div className="min-w-0">
                  <Link
                    to={`/usuarios/${usuario.id}`}
                    className="break-words text-lg font-semibold text-heading hover:text-accent"
                  >
                    {usuario.name}
                  </Link>
                  {usuario.userName && <p className="text-sm text-faint">@{usuario.userName}</p>}
                </div>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-faint">CPF</dt>
                    <dd className="text-body">{usuario.cpf}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-faint">Minutos</dt>
                    <dd className="text-body">{formatarNumero(usuario.viewMinutes)}</dd>
                  </div>
                </dl>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Button to={`/usuarios/${usuario.id}`} variant="secondary" className="flex-1">
                    Ver
                  </Button>
                  <Button
                    to={`/usuarios/${usuario.id}/editar`}
                    variant="secondary"
                    className="flex-1"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onExcluir(usuario)}
                    aria-label={`Excluir ${usuario.name}`}
                    className="flex-1"
                  >
                    Excluir
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
