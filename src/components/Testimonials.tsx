import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const testimonials = [
  {
    name: 'Sophie Martineau',
    location: 'Paris, France',
    rating: 5,
    text: "Un voyage absolument magique ! L'équipe de TBT Voyages a organisé notre circuit dans le Sud Tunisien avec une précision et une attention au détail remarquables. Les paysages des dunes au coucher du soleil, les ksars millénaires... des souvenirs gravés à jamais. Je recommande vivement !",
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: 'Ahmed Ben Khalil',
    location: 'Tunis, Tunisie',
    rating: 5,
    text: "Même en tant que Tunisien, j'ai redécouvert mon propre pays grâce à TBT Voyages. Notre guide Nour connaissait chaque pierre, chaque histoire de Matmata et Tataouine. Un service VIP à tous les niveaux, du transport luxueux aux hébergements choisis avec soin.",
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: 'Marie-Claire Dubois',
    location: 'Lyon, France',
    rating: 5,
    text: "Djerba avec TBT Voyages, c'était tout simplement parfait ! La plage, la médina, les dégustations culinaires... Le circuit était parfaitement rythmé, ni trop chargé, ni trop léger. L'équipe était disponible à toute heure pour répondre à nos besoins. Merci infiniment !",
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => advance(1), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const advance = (dir: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(c => (c + dir + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 200);
  };

  const t = testimonials[current];

  return (
    <section className="py-24 bg-[#FAF6F0]" aria-label="Témoignages de nos voyageurs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="reveal">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
              <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">
                Témoignages
              </span>
              <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
            </div>
            <h2 className="section-title">
              Ce que Disent nos
              <span className="text-[#F5A623]"> Voyageurs</span>
            </h2>
          </div>

          {/* Testimonial card */}
          <div
            className={`testimonial-card rounded-3xl p-8 md:p-12 shadow-xl border border-[#F5A623]/10 transition-opacity duration-200 ${
              animating ? 'opacity-0' : 'opacity-100'
            }`}
            role="region"
            aria-roledescription="carousel"
            aria-label={`Témoignage ${current + 1} sur ${testimonials.length}`}
            aria-live="polite"
          >
            <Quote size={48} className="text-[#F5A623]/20 mb-6" aria-hidden="true" />

            {/* Stars */}
            <div className="flex gap-1 mb-6" role="img" aria-label={`Note : ${t.rating} sur 5 étoiles`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} className="text-[#F5A623] fill-[#F5A623]" aria-hidden="true" />
              ))}
            </div>

            <blockquote className="text-[#1A1209] text-lg md:text-xl leading-relaxed font-light italic mb-8">
              <p>"{t.text}"</p>
            </blockquote>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <OptimizedImage
                  src={t.avatar}
                  alt={`Photo de ${t.name}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F5A623]/30"
                  width={48}
                  height={48}
                />
                <div>
                  <div className="font-semibold text-[#1A1209]">{t.name}</div>
                  <div className="text-sm text-[#6B5C45]">{t.location}</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2" role="group" aria-label="Contrôles du carousel">
                <button
                  onClick={() => advance(-1)}
                  className="w-10 h-10 rounded-full border border-[#F5A623]/30 hover:border-[#F5A623] hover:bg-[#F5A623] hover:text-white text-[#F5A623] flex items-center justify-center transition-all"
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <div className="flex gap-1.5 mx-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`rounded-full transition-all ${
                        i === current ? 'w-6 h-2 bg-[#F5A623]' : 'w-2 h-2 bg-[#F5A623]/30'
                      }`}
                      aria-label={`Aller au témoignage ${i + 1}`}
                      aria-current={i === current ? 'true' : undefined}
                    />
                  ))}
                </div>
                <button
                  onClick={() => advance(1)}
                  className="w-10 h-10 rounded-full border border-[#F5A623]/30 hover:border-[#F5A623] hover:bg-[#F5A623] hover:text-white text-[#F5A623] flex items-center justify-center transition-all"
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
