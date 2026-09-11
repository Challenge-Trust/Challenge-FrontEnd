import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigation } from '../data/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      aria-label="Navegação principal"
      className="contents lg:block"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="menu-principal"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cardborder bg-card px-4 text-sm text-heading lg:hidden"
      >
        <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        Menu
      </button>
      <ul
        id="menu-principal"
        className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-2 border-t border-cardborderalt pt-4 lg:flex lg:w-auto lg:flex-row lg:border-0 lg:pt-0`}
      >
        {navigation.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex min-h-11 items-center rounded-lg border px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'border-cardborder bg-card text-white'
                    : 'border-transparent text-nav hover:bg-card hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
