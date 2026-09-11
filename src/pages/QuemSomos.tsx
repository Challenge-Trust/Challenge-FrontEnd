import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { team } from '../data/team';

export default function QuemSomos() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-10 sm:py-16">
      <div className="mb-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">Equipe</span>
        <h1 className="my-3 text-2xl font-bold text-heading sm:text-3xl">Quem Somos</h1>
        <p className="text-sm text-faint">Selecione um integrante para conhecer seu perfil.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Link key={member.id} to={`/quem-somos/${member.id}`} className="min-w-0 rounded-2xl">
            <Card hoverBrand className="flex h-full flex-col items-center text-center">
              <div className="mb-4 h-28 w-28 overflow-hidden rounded-full border border-cardborder">
                <img
                  src={member.photo}
                  alt={`Foto de ${member.name}`}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-1 font-semibold text-heading">{member.name}</h2>
              <p className="mb-3 text-sm text-faint">{member.role}</p>
              <img
                src={member.logo}
                alt={member.logoAlt}
                width={40}
                height={40}
                className="mb-3 h-10 w-10 object-contain"
              />
              <span className="text-xs text-muted">{member.rm}</span>
              <span className="mt-4 text-sm text-accent">Ver perfil →</span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
