import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Card from '../components/Card';
import FormField from '../components/FormField';
import Modal from '../components/Modal';
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
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-2">
      <div className="min-w-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Entre em Contato
        </span>
        <h1 className="my-4 text-3xl font-bold leading-tight text-heading">
          Fale com
          <br />a equipe
        </h1>
        <p className="mb-8 leading-relaxed text-muted">
          Tem alguma dúvida, sugestão ou quer saber mais sobre o projeto? Preencha o formulário ou
          use um dos canais abaixo.
        </p>
        <ul className="mb-8 flex flex-col gap-4">
          {channels.map((channel) => (
            <li key={channel.text} className="flex items-start gap-3 text-sm text-muted">
              <span aria-hidden="true" className="shrink-0 text-lg">
                {channel.icon}
              </span>
              <span>{channel.text}</span>
            </li>
          ))}
        </ul>
        <Card padding="compact">
          <span className="mb-1 block text-xs uppercase tracking-wide text-faint">
            Projeto desenvolvido para
          </span>
          <p className="mb-1 font-semibold text-heading">FIAP · Challenge Soul Up</p>
          <span className="text-sm text-faint">Análise e Desenvolvimento de Sistemas</span>
        </Card>
      </div>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <p className="mb-5 text-sm text-faint">Campos com * são obrigatórios.</p>
          <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField id="nome" label="Nome" required error={errors.nome?.message}>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome"
                autoComplete="name"
                aria-required="true"
                aria-invalid={Boolean(errors.nome)}
                aria-describedby={errors.nome ? 'nome-error' : undefined}
                className="form-control"
                {...register('nome', {
                  validate: (value) => value.trim().length > 0 || 'Informe seu nome.',
                })}
              />
            </FormField>
            <FormField id="email" label="E-mail" required error={errors.email?.message}>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="form-control"
                {...register('email', {
                  required: 'Informe seu e-mail.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Informe um e-mail válido.',
                  },
                })}
              />
            </FormField>
          </div>
          <div className="mb-5">
            <FormField id="assunto" label="Assunto">
              <select id="assunto" className="form-control" {...register('assunto')}>
                <option value="" disabled>
                  Selecione um assunto
                </option>
                <option value="duvida">Dúvida sobre o projeto</option>
                <option value="sugestao">Sugestão</option>
                <option value="parceria">Parceria</option>
                <option value="outro">Outro</option>
              </select>
            </FormField>
          </div>
          <div className="mb-6">
            <FormField id="mensagem" label="Mensagem" required error={errors.mensagem?.message}>
              <textarea
                id="mensagem"
                rows={6}
                placeholder="Descreva sua mensagem aqui…"
                aria-required="true"
                aria-invalid={Boolean(errors.mensagem)}
                aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
                className="form-control resize-y"
                {...register('mensagem', {
                  required: 'Escreva sua mensagem.',
                  validate: (value) =>
                    value.trim().length >= 10 ||
                    'Escreva uma mensagem com pelo menos 10 caracteres.',
                })}
              />
            </FormField>
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            Enviar Mensagem →
          </Button>
        </form>
      </Card>
      {showModal && (
        <Modal title="Mensagem enviada com sucesso!" onClose={() => setShowModal(false)}>
          <p>
            Você receberá um retorno por email em até{' '}
            <strong className="text-white">72 horas.</strong>
          </p>
        </Modal>
      )}
    </section>
  );
}
