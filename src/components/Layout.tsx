import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  dynamicTitles,
  extraTitles,
  guestNavigation,
  navigation,
  userNavigation,
} from '../data/navigation';
import { team } from '../data/team';
import Header from './Header';
import Footer from './Footer';

/** Fundo da aplicação: brilho azul no topo e grade sutil de 50px. */
const fundo =
  'bg-base bg-[radial-gradient(ellipse_at_50%_0%,rgba(57,99,192,0.16),transparent_65%),linear-gradient(rgba(133,163,218,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(133,163,218,0.025)_1px,transparent_1px)] bg-[size:100%_100%,50px_50px,50px_50px]';

export default function Layout() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    const page = [...navigation, ...guestNavigation, ...userNavigation].find(
      (item) => item.to === pathname,
    );
    const dinamico = dynamicTitles.find(([padrao]) => padrao.test(pathname))?.[1];
    const member = pathname.startsWith('/integrantes/')
      ? team.find((item) => pathname === `/integrantes/${item.id}`)
      : undefined;
    document.title = `${page?.label ?? extraTitles[pathname] ?? dinamico ?? member?.name ?? 'Página não encontrada'} · SoulUp`;
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      main.current?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname]);

  return (
    <div className={`flex min-h-screen flex-col ${fundo}`}>
      <Header />
      <main id="conteudo" ref={main} tabIndex={-1} className="min-w-0 flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
