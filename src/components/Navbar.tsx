import { NavLink } from 'react-router-dom';

interface NavItem {
  label: string;
  to: string;
}

const navItems: NavItem[] = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Quem Somos', to: '/quem-somos' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contato', to: '/contato' },
  { label: 'Converter Créditos', to: '/conversao' },
];

const linkBase =
  'px-4 py-2 rounded-md text-sm transition-colors text-nav hover:text-white';
const linkActive = 'bg-[#1a1a2e] text-white border border-[#333]';

export default function Navbar() {
  return (
    <header>
      <nav className="flex items-center justify-between bg-navbg px-6 py-4 sm:px-10 flex-wrap gap-3">
        <NavLink to="/" className="text-2xl font-bold text-white no-underline">
          Trust<span className="text-brand">Corp.</span>
        </NavLink>
        <ul className="flex list-none flex-wrap gap-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
