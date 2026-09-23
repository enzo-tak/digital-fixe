import { useState, useEffect } from 'react';
import BotaoFluido from './BotaoFluido';

const logoImg = '/assets/4b6a6.png';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Sobre Nós', href: '#sobre-nos' },
  { label: 'Equipa', href: '#equipa' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <header className="w-full flex justify-center px-3 md:px-10 xl:px-20 pt-3 md:pt-5 fixed top-0 left-0 z-50">
      <nav
        className="w-full max-w-[1280px] flex items-center justify-between pl-4 pr-2 py-2 md:px-6 md:py-3 rounded-[10px]"
        style={{ background: 'rgba(54, 54, 54, 0.6)', backdropFilter: 'blur(12px)' }}
      >
        {/* Logo */}
        <a href="#inicio" className="flex-shrink-0">
          <img src={logoImg} alt="Digital Fixe" className="h-[40px] w-[137px] md:h-[48px] md:w-[164px] object-contain" />
        </a>

        {/* Desktop links */}
        <ul
          className="hidden xl:flex items-center gap-[15px] list-none m-0 p-0"
          style={{ fontFamily: '"Special Gothic Expanded One:Regular", sans-serif', fontSize: 20, color: '#fff' }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap transition-opacity hover:opacity-75"
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CONTACTO button */}
        <div className="hidden xl:flex">
          <BotaoFluido href="#contacto-section" tamanho="pequeno">CONTACTO</BotaoFluido>
        </div>

        {/* Hamburger button (tablet & mobile) */}
        <button
          className="xl:hidden flex flex-col justify-center items-center w-11 h-11 gap-[6px] focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <span className="block w-6 h-[2px] bg-white rounded" />
          <span className="block w-6 h-[2px] bg-white rounded" />
          <span className="block w-6 h-[2px] bg-white rounded" />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(10, 13, 20, 0.98)', backdropFilter: 'blur(16px)' }}
        >
          {/* Close button */}
          <div className="flex items-center justify-between px-7 md:px-16 pt-5 md:pt-8">
            <a href="#inicio" onClick={() => setMenuOpen(false)}>
              <img src={logoImg} alt="Digital Fixe" className="h-[40px] w-[137px] md:h-[48px] md:w-[164px] object-contain" />
            </a>
            <button
              className="flex items-center justify-center w-11 h-11 focus:outline-none"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <ul className="flex flex-col items-center justify-center flex-1 gap-5 md:gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-[24px] md:text-[32px] transition-opacity hover:opacity-75"
                  style={{ fontFamily: '"Special Gothic Expanded One:Regular", sans-serif', textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CONTACTO button full width at bottom */}
          <div className="px-5 md:px-10 pb-10 md:max-w-[520px] md:w-full md:mx-auto" style={{ display: 'flex' }}>
            <BotaoFluido
              href="#contacto-section"
              onClick={() => setMenuOpen(false)}
              className="w-full"
            >
              CONTACTO
            </BotaoFluido>
          </div>
        </div>
      )}
    </header>
  );
}

