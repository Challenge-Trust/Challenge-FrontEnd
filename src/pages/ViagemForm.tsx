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
import { co2Service } from '../services/co2Service';
import type { Co2Economia, Co2Request, LocationState } from '../types';
import { estimarEconomiaGramas } from '../utils/co2';
import { formatarNumero, gramasParaKg } from '../utils/formatacao';
import { lerId } from '../utils/params';

interface ViagemFormValues {
  distanciaKm: string;
  passageiroOnibus: string;
}

const voltar = { to: '/viagens', label: '← Voltar para viagens' };

/** Aceita vírgula ou ponto como separador decimal. */
const lerKm = (valor: string) => Number(valor.replace(',', '.'));

/** /viagens/nova (POST /api/co2) e /viagens/:id/editar (PUT /api/co2/{id}). */
export default function ViagemForm() {
  const { sessao } = useAuth();
  const { id: idParam } = useParams<{ id: string }>();
  const edicao = idParam !== undefined;
  const id = lerId(idParam);
  const { estado, recarregar } = useFetch(
    edicao && id !== null ? `viagem-form-${id}` : null,
    (signal) => co2Service.buscar(Number(id), signal),
  );
  const deOutroUsuario = estado.status === 'success' && estado.data.usuarioId !== sessao?.id;

  return (
    <section className="mx-auto max-w-2xl px-5 py-12 sm:px-10 sm:py-16">
      <PageHeader
        eyebrow="Mobilidade sustentável"
        titulo={edicao ? 'Editar viagem' : 'Nova viagem'}
        descricao="Informe a distância percorrida de ônibus e quantas pessoas estavam no veículo. A API calcula o CO₂ que deixou de ser emitido em comparação com o mesmo trajeto de carro."
      />

      {!edicao && <Formulario />}
      {edicao && (id === null || deOutroUsuario) && (
        <ErrorState httpStatus={404} mensagem="Viagem não encontrada." voltar={voltar} />
      )}
      {edicao && id !== null && !deOutroUsuario && (
        <>
          {estado.status === 'loading' && <LoadingState mensagem="Carregando viagem…" />}
          {estado.status === 'error' && (
            <ErrorState
              mensagem={estado.message}
              httpStatus={estado.httpStatus}
              onRetry={recarregar}
              voltar={voltar}
            />
          )}
          {estado.status === 'success' && <Formulario viagem={estado.data} />}
        </>
      )}
    </section>
  );
}

function Formulario({ viagem }: { viagem?: Co2Economia }) {
  const navigate = useNavigate();
  const { sessao } = useAuth();
  const [erro, setErro] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ViagemFormValues>({
    defaultValues: {
      distanciaKm: viagem ? String(viagem.distanciaKm) : '',
      passageiroOnibus: viagem ? String(viagem.passageiroOnibus) : '',
    },
  });

  const estimativa = estimarEconomiaGramas(
    lerKm(watch('distanciaKm')),
    Number(watch('passageiroOnibus')),
  );

  const onSubmit = async (data: ViagemFormValues) => {
    if (!sessao) return;
    setErro(null);
    const payload: Co2Request = {
      usuarioId: sessao.id,
      distanciaKm: lerKm(data.distanciaKm),
      passageiroOnibus: Number(data.passageiroOnibus),
    };
    try {
      const salva = viagem
        ? await co2Service.atualizar(viagem.id, payload)
        : await co2Service.criar(payload);
      const kg = formatarNumero(gramasParaKg(salva.co2Economizado));
      const state: LocationState = {
        sucesso: viagem
          ? `Viagem atualizada! Economia recalculada: ${kg} kg de CO₂.`
          : `Viagem registrada! Você evitou a emissão de ${kg} kg de CO₂.`,
      };
      navigate(`/viagens/${salva.id}`, { state });
    } catch (error) {
      setErro(error instanceof ApiError ? error.message : 'Erro inesperado ao salvar a viagem.');
    }
  };

  return (
    <Card>
      {erro && <Alert tone="error">{erro}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="distanciaKm"
            label="Distância (km)"
            required
            error={errors.distanciaKm?.message}
          >
            <input
              id="distanciaKm"
              type="text"
              inputMode="decimal"
              placeholder="Ex.: 12,5"
              aria-required="true"
              aria-invalid={Boolean(errors.distanciaKm)}
              aria-describedby={errors.distanciaKm ? 'distanciaKm-error' : undefined}
              className={controlClass}
              {...register('distanciaKm', {
                required: 'Informe a distância.',
                validate: (v) => {
                  const km = lerKm(v);
                  if (!Number.isFinite(km) || km <= 0) return 'Informe uma distância maior que 0.';
                  if (km > 1000) return 'Informe no máximo 1000 km por viagem.';
                  return true;
                },
              })}
            />
          </FormField>

          <FormField
            id="passageiroOnibus"
            label="Passageiros no ônibus"
            required
            error={errors.passageiroOnibus?.message}
          >
            <input
              id="passageiroOnibus"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              placeholder="Ex.: 40"
              aria-required="true"
              aria-invalid={Boolean(errors.passageiroOnibus)}
              aria-describedby={errors.passageiroOnibus ? 'passageiroOnibus-error' : undefined}
              className={controlClass}
              {...register('passageiroOnibus', {
                required: 'Informe a quantidade de passageiros.',
                validate: (v) => {
                  const n = Number(v);
                  if (!Number.isInteger(n) || n <= 0)
                    return 'Informe um número inteiro maior que 0.';
                  if (n > 200) return 'Informe no máximo 200 passageiros.';
                  return true;
                },
              })}
            />
          </FormField>
        </div>

        <p
          aria-live="polite"
          className="rounded-lg border border-cardborderalt bg-base/40 px-4 py-3 text-sm text-muted"
        >
          {estimativa === null && 'Preencha os campos para ver a estimativa de CO₂ economizado.'}
          {estimativa !== null && estimativa > 0 && (
            <>
              Estimativa:{' '}
              <strong className="text-accent">
                {formatarNumero(gramasParaKg(estimativa))} kg de CO₂
              </strong>{' '}
              a menos que fazer o mesmo trajeto de carro.
            </>
          )}
          {estimativa !== null &&
            estimativa <= 0 &&
            'Com tão poucos passageiros, o ônibus emite mais CO₂ por pessoa do que um carro.'}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button to={viagem ? `/viagens/${viagem.id}` : '/viagens'} variant="secondary">
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando…' : viagem ? 'Salvar alterações' : 'Registrar viagem'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
