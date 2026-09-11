import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { navigation } from '../data/navigation';
import { team } from '../data/team';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    const page = navigation.find((item) => item.to === pathname);
    const member = pathname.startsWith('/quem-somos/')
      ? team.find((item) => pathname === `/quem-somos/${item.id}`)
      : undefined;
    document.title = `${page?.label ?? member?.name ?? 'Página não encontrada'} · SoulUp`;
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      main.current?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="conteudo" ref={main} tabIndex={-1} className="min-w-0 flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
