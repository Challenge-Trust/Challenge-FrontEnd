import { NavLink } from 'react-router-dom'

export function Navigation() {
  return (
    <nav>
      <NavLink to="/" className="logo">Trust<span>Corp.</span></NavLink>
      <ul className="nav-links" id="navLinks">
        <li><NavLink to="/" end id="nav-home">Inicio</NavLink></li>
        <li><NavLink to="/sobre" id="nav-about">Sobre</NavLink></li>
        <li><NavLink to="/quem-somos" id="nav-team">Quem Somos</NavLink></li>
        <li><NavLink to="/faq" id="nav-faq">FAQ</NavLink></li>
        <li><NavLink to="/contato" id="nav-contact">Contato</NavLink></li>
        <li><NavLink to="/conversao" id="nav-conversor">Converter Créditos</NavLink></li>
      </ul>
    </nav>
  )
}

export function Footer() {
  return <footer className="footer"><p>© 2026 SoulUp · Projeto acadêmico FIAP · Todos os direitos reservados ao grupo</p></footer>
}
