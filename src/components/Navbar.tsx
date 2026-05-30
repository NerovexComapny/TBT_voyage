import { useState, useEffect } from 'react';
import { IconMenu, IconPhone, IconX } from './icons';

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#circuits', label: 'Nos Circuits' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#apropos', label: 'À Propos' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#accueil');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let observer;

    const startObserver = () => {
      if (observer) return;
      const sections = navLinks.map((l) => l.href.slice(1));
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(`#${entry.target.id}`);
          });
        },
        { threshold: 0.4 },
      );
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    if (document.getElementById('circuits')) {
      startObserver();
      return () => observer?.disconnect();
    }

    const onSectionsReady = () => {
      startObserver();
      window.removeEventListener('tbt:sections-ready', onSectionsReady);
    };
    window.addEventListener('tbt:sections-ready', onSectionsReady);

    return () => {
      window.removeEventListener('tbt:sections-ready', onSectionsReady);
      observer?.disconnect();
    };
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#1A1209]/95 shadow-xl py-3'
          : 'bg-transparent py-5'
      }`}
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('#accueil')}
          className="flex flex-col items-start group"
        >
          <span className="font-display font-black text-2xl text-[#F5A623] leading-none tracking-wide group-hover:text-[#FFD060] transition-colors">
            TBT
            <span className="text-white"> VOYAGES</span>
          </span>
          <span className="text-[10px] text-[#F5A623]/70 uppercase tracking-[0.2em] font-medium mt-0.5">
            Le Plaisir de Voyager
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`nav-link text-sm font-medium tracking-wide transition-colors pb-0.5 ${
                active === link.href ? 'text-[#F5A623] active' : 'text-white/90 hover:text-[#F5A623]'
              }`}
              aria-current={active === link.href ? 'true' : undefined}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:+21626600388"
            className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#D4891A] text-[#1A1209] text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:scale-105"
            aria-label="Appeler pour réserver : +216 26 600 388"
          >
            <IconPhone size={14} />
            Réserver
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <IconX size={24} /> : <IconMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        <div className="bg-[#1A1209]/98 border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              role="menuitem"
              className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                active === link.href
                  ? 'text-[#F5A623] bg-white/5'
                  : 'text-white/80 hover:text-[#F5A623] hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:+21626600388"
            role="menuitem"
            className="mt-2 flex items-center justify-center gap-2 bg-[#F5A623] text-[#1A1209] font-semibold py-3 rounded-full transition-all hover:bg-[#D4891A]"
            aria-label="Appeler maintenant : +216 26 600 388"
          >
            <IconPhone size={16} />
            Appeler Maintenant
          </a>
        </div>
      </div>
    </nav>
  );
}
