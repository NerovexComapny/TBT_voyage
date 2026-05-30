import { IconChevronDown, IconStar } from './icons';
import { imageKitSrcSet, imageKitUrl } from '../lib/imageKit';

const HERO_IMAGE = 'sahratunisien.jpg';
const heroSrc = imageKitUrl(HERO_IMAGE, { width: 1280, quality: 70 });
const heroSrcSet = imageKitSrcSet(HERO_IMAGE, [640, 768, 1024, 1280]);

export default function Hero() {
  const scrollToCircuits = () => {
    document.getElementById('circuits')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Accueil — Circuits VIP au Sud Tunisien"
    >
      <img
        src={heroSrc}
        srcSet={heroSrcSet}
        sizes="100vw"
        alt=""
        role="presentation"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        fetchpriority="high"
        loading="eager"
        decoding="sync"
      />

      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1A1209] to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 hero-lcp">
        <div className="inline-flex items-center gap-2 bg-black/35 border border-[#F5A623]/40 text-[#F5A623] text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-8">
          <IconStar size={12} />
          Agence de Voyages Licence A
          <IconStar size={12} />
        </div>

        <h1 className="hero-headline font-black text-white leading-tight mb-6">
          <span className="block text-5xl md:text-7xl lg:text-8xl">
            Circuits
            <span className="text-[#F5A623]"> VIP</span>
          </span>
          <span className="block text-4xl md:text-5xl lg:text-6xl mt-2 text-white/90">
            au Sud Tunisien
          </span>
        </h1>

        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Découvrez la magie des dunes dorées, des ksars millénaires et des plages de Djerba.
          Une expérience luxueuse, guidée par des experts passionnés.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={scrollToCircuits}
            className="btn-gold text-base px-10 py-4 shadow-2xl shadow-[#F5A623]/30"
          >
            Réserver Maintenant
          </button>
          <a
            href="#circuits"
            onClick={(e) => { e.preventDefault(); scrollToCircuits(); }}
            className="btn-outline-gold text-base px-10 py-4 border-white/60 text-white hover:bg-white/10 hover:border-white"
          >
            Voir Nos Circuits
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto" role="list" aria-label="Statistiques">
          {[
            { value: '500+', label: 'Clients Satisfaits' },
            { value: '15+', label: 'Circuits Exclusifs' },
            { value: '10+', label: "Années d'Expérience" },
          ].map(stat => (
            <div key={stat.label} className="text-center" role="listitem">
              <div className="hero-headline font-black text-2xl md:text-3xl text-[#F5A623]">
                {stat.value}
              </div>
              <div className="text-white/70 text-xs mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToCircuits}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-[#F5A623] transition-colors"
        aria-label="Défiler vers la section Nos Circuits"
      >
        <IconChevronDown size={32} />
      </button>
    </section>
  );
}
