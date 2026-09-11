import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { team } from '../data/team';

export default function QuemSomosDetalhe() {
  const { id } = useParams<{ id: string }>();

  const member = team.find((item) => item.id === id);

  if (!member) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:px-10">
        <h1 className="mb-4 text-2xl font-bold text-heading">Integrante não encontrado</h1>
        <p className="mb-8 text-faint">Não encontramos ninguém com esse identificador na equipe.</p>
        <Button to="/quem-somos">← Voltar para Quem Somos</Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <Button to="/quem-somos" variant="secondary" className="mb-8">
        ← Voltar
      </Button>

      <Card padding="large" className="flex flex-col items-center text-center">
        <div className="mb-6 h-36 w-36 overflow-hidden rounded-full border border-cardborder">
          <img
            src={member.photo}
            alt={`Foto de ${member.name}`}
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="mb-1 text-2xl font-bold text-heading">{member.name}</h1>
        <p className="mb-4 text-muted">{member.role}</p>

        <img src={member.logo} alt={member.logoAlt} className="mb-4 h-14 w-14 object-contain" />

        <span className="mb-6 text-xs text-faint">{member.rm}</span>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cardborder bg-base/40 px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-white"
          >
            <img src="/img/linkedin-logo.png" alt="" className="h-4 w-4 object-contain" />
            LinkedIn
          </a>
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cardborder bg-base/40 px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-white"
          >
            <img src="/img/github-logo.png" alt="" className="h-4 w-4 object-contain" />
            GitHub
          </a>
        </div>
      </Card>
    </section>
  );
}
