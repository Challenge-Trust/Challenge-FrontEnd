import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import AuthShell from '../components/AuthShell';
import Button from '../components/Button';
import FormField from '../components/FormField';
import { controlClass } from '../components/formStyles';
import { ApiError } from '../services/api';
import { authService } from '../services/authService';
import { apenasDigitos, cpfValido, mascararCpf } from '../utils/cpf';

interface RecuperarForm {
  cpf: string;
  name: string;
  newPassword: string;
  confirmPassword: string;
}

export default function EsqueciSenha() {
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecuperarForm>({
    defaultValues: { cpf: '', name: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: RecuperarForm) => {
    setErro(null);
    try {
      await authService.recuperarSenha({
        cpf: apenasDigitos(data.cpf),
        name: data.name.trim(),
        newPassword: data.newPassword,
      });
      setSucesso(true);
      reset();
    } catch (error) {
      setErro(error instanceof ApiError ? error.message : 'Erro inesperado ao redefinir a senha.');
    }
  };

  return (
    <AuthShell
      eyebrow="Recuperação"
      title="Esqueci minha senha"
      description="Confirme seu CPF e nome cadastrados para definir uma nova senha."
    >
      {sucesso && (
        <Alert tone="success">
          Senha redefinida com sucesso.{' '}
          <Link to="/login" className="font-semibold underline">
            Ir para o login
          </Link>
        </Alert>
      )}
      {erro && <Alert tone="error">{erro}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
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
            className={controlClass}
            {...register('cpf', {
              required: 'Informe seu CPF.',
              validate: (v) => cpfValido(v) || 'CPF inválido.',
              onChange: (e) => setValue('cpf', mascararCpf(e.target.value)),
            })}
          />
        </FormField>

        <FormField id="name" label="Nome cadastrado" required error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Nome usado no cadastro"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={controlClass}
            {...register('name', {
              validate: (v) => v.trim().length > 0 || 'Informe o nome cadastrado.',
            })}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="newPassword"
            label="Nova senha"
            required
            error={errors.newPassword?.message}
          >
            <input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              placeholder="6 a 30 caracteres"
              aria-required="true"
              aria-invalid={Boolean(errors.newPassword)}
              aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
              className={controlClass}
              {...register('newPassword', {
                required: 'Crie uma nova senha.',
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
              className={controlClass}
              {...register('confirmPassword', {
                required: 'Confirme a senha.',
                validate: (v) => v === getValues('newPassword') || 'As senhas não conferem.',
              })}
            />
          </FormField>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Redefinindo…' : 'Redefinir senha'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Lembrou?{' '}
        <Link to="/login" className="text-accent hover:underline">
          Voltar ao login
        </Link>
      </p>
    </AuthShell>
  );
}
