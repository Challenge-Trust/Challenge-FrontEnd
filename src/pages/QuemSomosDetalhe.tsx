import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { team } from '../data/team';

export default function QuemSomosDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const member = team.find((item) => item.id === id);

  useEffect(() => {
    document.title = member
      ? `${member.name} · SoulUp`
      : 'Integrante não encontrado · SoulUp';
  }, [member]);

  if (!member) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:px-10">
        <h1 className="mb-4 text-2xl font-bold text-heading">
          Integrante não encontrado
        </h1>
        <p className="mb-8 text-faint">
          Não encontramos ninguém com esse identificador na equipe.
        </p>
        <button
          type="button"
          onClick={() => navigate('/quem-somos')}
          className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brandhover"
        >
          ← Voltar para Quem Somos
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-8 text-sm text-muted transition-colors hover:text-white"
      >
        ← Voltar
      </button>

      <div className="flex flex-col items-center rounded-2xl border border-cardborder bg-card p-10 text-center">
        <div className="mb-6 h-36 w-36 overflow-hidden rounded-full border border-cardborder">
          <img
            src={member.photo}
            alt={`Foto de ${member.name}`}
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="mb-1 text-2xl font-bold text-heading">
          {member.name}
        </h1>
        <p className="mb-4 text-muted">{member.role}</p>

        <img
          src={member.logo}
          alt={member.logoAlt}
          className="mb-4 h-14 w-14 object-contain"
        />

        <span className="mb-6 text-xs text-faint">{member.rm}</span>

        <div className="flex gap-4">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#2a2a55] px-4 py-2 text-sm text-muted transition-colors hover:border-brand hover:text-white"
          >
            <img
              src="/img/linkedin-logo.png"
              alt=""
              className="h-4 w-4 object-contain"
            />
            LinkedIn
          </a>
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#2a2a55] px-4 py-2 text-sm text-muted transition-colors hover:border-brand hover:text-white"
          >
            <img
              src="/img/github-logo.png"
              alt=""
              className="h-4 w-4 object-contain"
            />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
