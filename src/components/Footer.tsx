import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#circuits', label: 'Nos Circuits' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#apropos', label: 'À Propos' },
  { href: '#contact', label: 'Contact' },
];

const circuits = [
  'Circuit Djerba — Île de Rêve',
  'Sud Tunisien 4 Jours',
  'Sud Tunisien 5 Jours',
  'Circuits sur Mesure',
];

const socials = [
  { Icon: Facebook, href: 'https://www.facebook.com/tbtvoyages/photos?locale=fr_FR&checkpoint_src=any', label: 'Suivez-nous sur Facebook' },
  { Icon: Instagram, href: 'https://www.instagram.com/tbtvoyagesofficiel/', label: 'Suivez-nous sur Instagram' },
  { Icon: Youtube, href: 'https://www.youtube.com/@-tbtvoyages3008', label: 'Suivez-nous sur YouTube' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E0B06] text-white/70" role="contentinfo">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <OptimizedImage
                src="/TBT_background.png"
                alt="Logo TBT Voyages"
                className="w-24 sm:w-32 md:w-36 lg:w-44 h-auto object-contain mb-3 mx-auto md:mx-0"
                width={176}
                height={64}
              />
              <span className="font-display font-black text-2xl text-[#F5A623]">
                TBT <span className="text-white">VOYAGES</span>
              </span>
              <p className="text-[#F5A623]/70 text-xs tracking-[0.2em] uppercase mt-1">
                Le Plaisir de Voyager
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              Agence de Voyages Licence A spécialisée en circuits VIP au Sud Tunisien
              et à Djerba. Vivez la Tunisie autrement.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#F5A623] hover:text-white text-white/50 flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Navigation
            </h2>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-white/50 hover:text-[#F5A623] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Circuits */}
          <div>
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Nos Circuits
            </h2>
            <ul className="space-y-3">
              {circuits.map(c => (
                <li key={c}>
                  <button
                    onClick={() => scrollTo('#circuits')}
                    className="text-sm text-white/50 hover:text-[#F5A623] transition-colors text-left"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Contact
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin size={15} className="text-[#F5A623] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-white/50 leading-snug">
                  Rue de Khartoum 63,
                  <br />Immeuble Belvédère Centre,
                  <br />1er étage B1-9, Tunis
                </span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone size={15} className="text-[#F5A623] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <a href="tel:+21626600388" className="block text-white/50 hover:text-[#F5A623] transition-colors">26 600 388</a>
                  <a href="tel:+21629629696" className="block text-white/50 hover:text-[#F5A623] transition-colors">29 629 696</a>
                  <a href="tel:+21626600142" className="block text-white/50 hover:text-[#F5A623] transition-colors">26 600 142</a>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail size={15} className="text-[#F5A623] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href="mailto:reservation.tbt@gmail.com"
                  className="text-white/50 hover:text-[#F5A623] transition-colors"
                >
                  reservation.tbt@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} TBT Voyages — Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-white/60">Made by Nerovex</p>
            <OptimizedImage
              src="/nerovex_logo.webp"
              alt="Logo Nerovex"
              className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain opacity-90 hover:opacity-100 transition duration-300"
              width={112}
              height={32}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
