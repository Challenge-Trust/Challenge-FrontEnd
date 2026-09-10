import { useState } from 'react';
import { Link } from 'react-router-dom';
import { team } from '../data/team';

export default function QuemSomos() {
  const [headerActive, setHeaderActive] = useState(false);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
      <button
        type="button"
        onClick={() => setHeaderActive((prev) => !prev)}
        className="mb-12 block w-full text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-brand">
          Equipe
        </span>
        <h1
          className={`my-3 text-2xl font-bold text-heading transition-colors sm:text-3xl ${
            headerActive ? 'text-brand' : ''
          }`}
        >
          Quem Somos
        </h1>
        <p className="text-sm text-faint">
          Clique e conheça os integrantes por trás da SoulUp!
        </p>
      </button>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Link
            key={member.id}
            to={`/quem-somos/${member.id}`}
            className="flex flex-col items-center rounded-xl border border-cardborder bg-card p-6 text-center transition-colors hover:border-brand"
          >
            <div className="mb-4 h-28 w-28 overflow-hidden rounded-full border border-cardborder">
              <img
                src={member.photo}
                alt={`Foto de ${member.name}`}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mb-1 font-semibold text-heading">{member.name}</h3>
            <p className="mb-3 text-sm text-faint">{member.role}</p>
            <img
              src={member.logo}
              alt={member.logoAlt}
              className="mb-3 h-10 w-10 object-contain"
            />
            <span className="text-xs text-muted">{member.rm}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
