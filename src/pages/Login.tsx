import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import AuthShell from '../components/AuthShell';
import Button from '../components/Button';
import FormField from '../components/FormField';
import { controlClass } from '../components/formStyles';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../services/api';
import type { LocationState } from '../types';
import { apenasDigitos, cpfValido, mascararCpf } from '../utils/cpf';

interface LoginForm {
  cpf: string;
  password: string;
}

export default function Login() {
  const { autenticado, login } = useAuth();
  const navigate = useNavigate();
  const state = (useLocation().state ?? {}) as LocationState;
  const [erro, setErro] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ defaultValues: { cpf: '', password: '' } });

  if (autenticado) return <Navigate to="/painel" replace />;

  const onSubmit = async (data: LoginForm) => {
    setErro(null);
    try {
      await login({ cpf: apenasDigitos(data.cpf), password: data.password });
      navigate(state.from ?? '/painel', { replace: true });
    } catch (error) {
      setErro(error instanceof ApiError ? error.message : 'Erro inesperado ao entrar.');
    }
  };

  return (
    <AuthShell
      eyebrow="Área do usuário"
      title="Entrar"
      description="Acesse com seu CPF e senha para ver seus tickets, pontos e CO₂ economizado."
    >
      {state.aviso && !erro && <Alert tone="info">{state.aviso}</Alert>}
      {erro && <Alert tone="error">{erro}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <FormField id="cpf" label="CPF" required error={errors.cpf?.message}>
          <input
            id="cpf"
            type="text"
            inputMode="numeric"
            autoComplete="username"
            placeholder="000.000.000-00"
            aria-required="true"
            aria-invalid={Boolean(errors.cpf)}
            aria-describedby={errors.cpf ? 'cpf-error' : undefined}
            className={controlClass}
            {...register('cpf', {
              required: 'Informe seu CPF.',
              validate: (v) => cpfValido(v) || 'CPF inválido.',
              onChange: (e) => setValue('cpf', mascararCpf(e.target.value)),
            })}
          />
        </FormField>

        <FormField id="password" label="Senha" required error={errors.password?.message}>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Sua senha"
            aria-required="true"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={controlClass}
            {...register('password', { required: 'Informe sua senha.' })}
          />
        </FormField>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>

      <div className="mt-6 flex flex-col gap-2 text-center text-sm text-muted sm:flex-row sm:justify-between">
        <Link to="/esqueci-senha" className="text-accent hover:underline">
          Esqueci minha senha
        </Link>
        <span>
          Não tem conta?{' '}
          <Link to="/cadastro" className="text-accent hover:underline">
            Criar conta
          </Link>
        </span>
      </div>
    </AuthShell>
  );
}
