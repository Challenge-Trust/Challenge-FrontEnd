import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="border-b border-cardborderalt bg-navbg">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-10">
        <Link to="/" className="inline-flex min-h-11 items-center text-2xl font-bold text-white">
          Trust<span className="text-accent">Corp.</span>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
