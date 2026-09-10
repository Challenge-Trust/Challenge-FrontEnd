import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ContactFormData } from '../types';

const channels = [
  { icon: '✉', text: 'contato@email.com' },
  { icon: '📍', text: 'FIAP — Av. Paulista, 1106 - São Paulo, SP' },
  { icon: '🏫', text: 'Turma 1TDSPI · 2026' },
];

export default function Contato() {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: { nome: '', email: '', assunto: '', mensagem: '' },
  });

  const onSubmit = () => {
    setShowModal(true);
    reset();
  };

  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2">
      {/* Coluna esquerda */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-brand">
          Entre em Contato
        </span>
        <h1 className="my-4 text-3xl font-bold leading-tight text-heading">
          Fale com
          <br />a equipe
        </h1>
        <p className="mb-8 leading-relaxed text-muted">
          Tem alguma dúvida, sugestão ou quer saber mais sobre o projeto?
          Preencha o formulário ou use um dos canais abaixo.
        </p>

        <ul className="mb-8 flex flex-col gap-4">
          {channels.map((channel) => (
            <li key={channel.text} className="flex items-center gap-3 text-sm text-muted">
              <span className="text-lg">{channel.icon}</span>
              <span>{channel.text}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-cardborder bg-card p-5">
          <span className="mb-1 block text-xs uppercase tracking-wide text-faint">
            Projeto desenvolvido para
          </span>
          <p className="mb-1 font-semibold text-heading">
            FIAP · Challenge Soul Up
          </p>
          <span className="text-sm text-faint">
            Análise e Desenvolvimento de Sistemas
          </span>
        </div>
      </div>

      {/* Coluna direita: formulário */}
      <div className="rounded-2xl border border-cardborder bg-card p-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm text-muted">
                Nome <span className="text-brand">*</span>
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome"
                autoComplete="off"
                className="w-full rounded-lg border border-cardborder bg-base px-4 py-2.5 text-sm text-body outline-none focus:border-brand"
                {...register('nome', { required: 'Informe seu nome.' })}
              />
              {errors.nome && (
                <p className="mt-1 text-xs text-red-400">{errors.nome.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-muted">
                E-mail <span className="text-brand">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="off"
                className="w-full rounded-lg border border-cardborder bg-base px-4 py-2.5 text-sm text-body outline-none focus:border-brand"
                {...register('email', {
                  required: 'Informe seu e-mail.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Informe um e-mail válido.',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="assunto" className="mb-2 block text-sm text-muted">
              Assunto
            </label>
            <select
              id="assunto"
              defaultValue=""
              className="w-full rounded-lg border border-cardborder bg-base px-4 py-2.5 text-sm text-body outline-none focus:border-brand"
              {...register('assunto')}
            >
              <option value="" disabled>
                Selecione um assunto
              </option>
              <option value="duvida">Dúvida sobre o projeto</option>
              <option value="sugestao">Sugestão</option>
              <option value="parceria">Parceria</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="mensagem" className="mb-2 block text-sm text-muted">
              Mensagem <span className="text-brand">*</span>
            </label>
            <textarea
              id="mensagem"
              rows={6}
              placeholder="Descreva sua mensagem aqui…"
              className="w-full resize-none rounded-lg border border-cardborder bg-base px-4 py-2.5 text-sm text-body outline-none focus:border-brand"
              {...register('mensagem', {
                required: 'Escreva sua mensagem.',
                minLength: { value: 10, message: 'Mensagem muito curta.' },
              })}
            />
            {errors.mensagem && (
              <p className="mt-1 text-xs text-red-400">{errors.mensagem.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brandhover sm:w-auto"
          >
            Enviar Mensagem →
          </button>
        </form>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-sm rounded-2xl border border-cardborder bg-card p-8 text-center">
            <h2 className="mb-3 text-xl font-bold text-heading">
              Mensagem enviada com sucesso!
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              Você receberá um retorno por email em até{' '}
              <strong className="text-white">72 horas.</strong>
            </p>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brandhover"
            >
              Concluir
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
