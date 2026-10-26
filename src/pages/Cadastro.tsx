import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import AuthShell from '../components/AuthShell';
import Button from '../components/Button';
import FormField from '../components/FormField';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../services/api';
import { authService } from '../services/authService';
import type { LocationState } from '../types';
import { apenasDigitos, cpfValido, mascararCpf } from '../utils/cpf';

interface CadastroForm {
  name: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  viewMinutes: string;
}

export default function Cadastro() {
  const { autenticado } = useAuth();
  const navigate = useNavigate();
  const [erro, setErro] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CadastroForm>({
    defaultValues: { name: '', cpf: '', password: '', confirmPassword: '', viewMinutes: '0' },
  });

  if (autenticado) return <Navigate to="/painel" replace />;

  const onSubmit = async (data: CadastroForm) => {
    setErro(null);
    try {
      await authService.cadastrar({
        name: data.name.trim(),
        cpf: apenasDigitos(data.cpf),
        password: data.password,
        viewMinutes: Number(data.viewMinutes),
      });
      const state: LocationState = {
        aviso: 'Conta criada com sucesso! Faça login para continuar.',
      };
      navigate('/login', { replace: true, state });
    } catch (error) {
      setErro(error instanceof ApiError ? error.message : 'Erro inesperado ao criar a conta.');
    }
  };

  return (
    <AuthShell
      eyebrow="Novo por aqui?"
      title="Criar conta"
      description="Cadastre-se e informe quantos minutos de conteúdo você já assistiu."
    >
      {erro && <Alert tone="error">{erro}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <FormField id="name" label="Nome" required error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="form-control"
            {...register('name', {
              validate: (v) => {
                const nome = v.trim();
                if (nome.length === 0) return 'Informe seu nome.';
                if (nome.length > 100) return 'O nome deve ter no máximo 100 caracteres.';
                return true;
              },
            })}
          />
        </FormField>

        <FormField id="cpf" label="CPF" required error={errors.cpf?.message}>
          <input
            id="cpf"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="000.000.000-00"
            aria-required="true"
            aria-invalid={Boolean(errors.cpf)}
            aria-describedby={errors.cpf ? 'cpf-error' : undefined}
            className="form-control"
            {...register('cpf', {
              required: 'Informe seu CPF.',
              validate: (v) => cpfValido(v) || 'CPF inválido.',
              onChange: (e) => setValue('cpf', mascararCpf(e.target.value)),
            })}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField id="password" label="Senha" required error={errors.password?.message}>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="6 a 30 caracteres"
              aria-required="true"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="form-control"
              {...register('password', {
                required: 'Crie uma senha.',
                minLength: { value: 6, message: 'A senha deve ter pelo menos 6 caracteres.' },
                maxLength: { value: 30, message: 'A senha deve ter no máximo 30 caracteres.' },
              })}
            />
          </FormField>

          <FormField
            id="confirmPassword"
            label="Confirmar senha"
            required
            error={errors.confirmPassword?.message}
          >
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a senha"
              aria-required="true"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              className="form-control"
              {...register('confirmPassword', {
                required: 'Confirme a senha.',
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
            placeholder="0"
            aria-required="true"
            aria-invalid={Boolean(errors.viewMinutes)}
            aria-describedby={errors.viewMinutes ? 'viewMinutes-error' : undefined}
            className="form-control"
            {...register('viewMinutes', {
              required: 'Informe os minutos assistidos.',
              validate: (v) =>
                (Number.isInteger(Number(v)) && Number(v) >= 0) ||
                'Informe um número inteiro maior ou igual a 0.',
            })}
          />
        </FormField>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Criando conta…' : 'Criar conta'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Já tem conta?{' '}
        <Link to="/login" className="text-accent hover:underline">
          Entrar
        </Link>
      </p>
    </AuthShell>
  );
}
