import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import Button from '../components/Button';
import Card from '../components/Card';
import ErrorState from '../components/ErrorState';
import FormField from '../components/FormField';
import { controlClass } from '../components/formStyles';
import LoadingState from '../components/LoadingState';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { ApiError } from '../services/api';
import { usuarioService } from '../services/usuarioService';
import type { LocationState, Usuario, UsuarioRequest } from '../types';
import { apenasDigitos, cpfValido, mascararCpf } from '../utils/cpf';
import { lerId } from '../utils/params';

interface UsuarioFormValues {
  name: string;
  userName: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  viewMinutes: string;
}

/** /usuarios/novo (cadastro) e /usuarios/:id/editar (edição). */
export default function UsuarioForm() {
  const { id: idParam } = useParams<{ id: string }>();
  const edicao = idParam !== undefined;
  const id = lerId(idParam);
  const { estado, recarregar } = useFetch(
    edicao && id !== null ? `usuario-form-${id}` : null,
    (signal) => usuarioService.buscar(Number(id), signal),
  );
  const voltar = { to: '/usuarios', label: '← Voltar para usuários' };

  return (
    <section className="mx-auto max-w-2xl px-5 py-12 sm:px-10 sm:py-16">
      <PageHeader
        eyebrow="Gestão de usuários"
        titulo={edicao ? 'Editar usuário' : 'Novo usuário'}
        descricao={
          edicao
            ? 'Atualize os dados cadastrais. Deixe CPF e senha em branco para mantê-los.'
            : 'Os minutos informados já são convertidos em pontos (180 min = 1 ponto) e tickets (10 pontos = 1 ticket).'
        }
      />

      {!edicao && <Formulario />}
      {edicao && id === null && (
        <ErrorState httpStatus={404} mensagem="Endereço de usuário inválido." voltar={voltar} />
      )}
      {edicao && id !== null && (
        <>
          {estado.status === 'loading' && <LoadingState mensagem="Carregando usuário…" />}
          {estado.status === 'error' && (
            <ErrorState
              mensagem={estado.message}
              httpStatus={estado.httpStatus}
              onRetry={recarregar}
              voltar={voltar}
            />
          )}
          {estado.status === 'success' && <Formulario usuario={estado.data} />}
        </>
      )}
    </section>
  );
}

function Formulario({ usuario }: { usuario?: Usuario }) {
  const navigate = useNavigate();
  const { atualizarSessao } = useAuth();
  const [erro, setErro] = useState<string | null>(null);
  const edicao = usuario !== undefined;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UsuarioFormValues>({
    defaultValues: {
      name: usuario?.name ?? '',
      userName: usuario?.userName ?? '',
      // A API só devolve o CPF mascarado; na edição o campo começa vazio (= manter o atual)
      cpf: '',
      password: '',
      confirmPassword: '',
      viewMinutes: String(usuario?.viewMinutes ?? 0),
    },
  });

  const onSubmit = async (data: UsuarioFormValues) => {
    setErro(null);
    const payload: UsuarioRequest = {
      name: data.name.trim(),
      userName: data.userName.trim() || null,
      viewMinutes: Number(data.viewMinutes),
      ...(data.cpf ? { cpf: apenasDigitos(data.cpf) } : {}),
      ...(data.password ? { password: data.password } : {}),
    };
    try {
      const salvo = usuario
        ? await usuarioService.atualizar(usuario.id, payload)
        : await usuarioService.criar(payload);
      atualizarSessao(salvo);
      const state: LocationState = {
        sucesso: usuario ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!',
      };
      navigate(`/usuarios/${salvo.id}`, { state });
    } catch (error) {
      setErro(error instanceof ApiError ? error.message : 'Erro inesperado ao salvar o usuário.');
    }
  };

  return (
    <Card>
      {erro && <Alert tone="error">{erro}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <FormField id="name" label="Nome" required error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Nome completo"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={controlClass}
            {...register('name', {
              validate: (v) => {
                const nome = v.trim();
                if (!nome) return 'Informe o nome.';
                if (nome.length > 100) return 'O nome deve ter no máximo 100 caracteres.';
                return true;
              },
            })}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField id="userName" label="Nome de usuário" error={errors.userName?.message}>
            <input
              id="userName"
              type="text"
              autoComplete="username"
              placeholder="opcional"
              aria-invalid={Boolean(errors.userName)}
              aria-describedby={errors.userName ? 'userName-error' : undefined}
              className={controlClass}
              {...register('userName', {
                maxLength: { value: 30, message: 'Máximo de 30 caracteres.' },
              })}
            />
          </FormField>

          <FormField
            id="cpf"
            label={edicao ? 'Novo CPF' : 'CPF'}
            required={!edicao}
            error={errors.cpf?.message}
          >
            <input
              id="cpf"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder={usuario ? `Atual: ${usuario.cpf}` : '000.000.000-00'}
              aria-required={!edicao}
              aria-invalid={Boolean(errors.cpf)}
              aria-describedby={errors.cpf ? 'cpf-error' : undefined}
              className={controlClass}
              {...register('cpf', {
                validate: (v) => {
                  if (!v) return edicao || 'Informe o CPF.';
                  return cpfValido(v) || 'CPF inválido.';
                },
                onChange: (e) => setValue('cpf', mascararCpf(e.target.value)),
              })}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="password"
            label={edicao ? 'Nova senha' : 'Senha'}
            required={!edicao}
            error={errors.password?.message}
          >
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder={edicao ? 'Em branco = manter' : '6 a 30 caracteres'}
              aria-required={!edicao}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={controlClass}
              {...register('password', {
                validate: (v) => {
                  if (!v) return edicao || 'Crie uma senha.';
                  if (v.length < 6 || v.length > 30)
                    return 'A senha deve ter de 6 a 30 caracteres.';
                  return true;
                },
              })}
            />
          </FormField>

          <FormField
            id="confirmPassword"
            label="Confirmar senha"
            required={!edicao}
            error={errors.confirmPassword?.message}
          >
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a senha"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              className={controlClass}
              {...register('confirmPassword', {
                validate: (v) => v === getValues('password') || 'As senhas não conferem.',
              })}
            />
          </FormField>
        </div>

        <FormField
          id="viewMinutes"
          label="Minutos assistidos"
          required
          error={errors.viewMinutes?.message}
        >
          <input
            id="viewMinutes"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            aria-required="true"
            aria-invalid={Boolean(errors.viewMinutes)}
            aria-describedby={errors.viewMinutes ? 'viewMinutes-error' : undefined}
            className={controlClass}
            {...register('viewMinutes', {
              required: 'Informe os minutos assistidos.',
              validate: (v) =>
                (Number.isInteger(Number(v)) && Number(v) >= 0) ||
                'Informe um número inteiro maior ou igual a 0.',
            })}
          />
        </FormField>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button to={usuario ? `/usuarios/${usuario.id}` : '/usuarios'} variant="secondary">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando…' : edicao ? 'Salvar alterações' : 'Cadastrar usuário'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
