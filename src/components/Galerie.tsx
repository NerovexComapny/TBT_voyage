import { useEffect, useRef } from 'react';
import OptimizedImage from './OptimizedImage';

const photos = [
  {
    src: 'https://ik.imagekit.io/63sim85mp/sahratunisien.jpg',
    alt: 'Sahara tunisien — dunes dorées au coucher du soleil',
    tall: true,
  },
  {
    src: 'https://ik.imagekit.io/63sim85mp/Djerba.jpg',
    alt: 'Île de Djerba — vue panoramique',
    tall: false,
  },
  {
    src: 'https://ik.imagekit.io/63sim85mp/t%C3%A9l%C3%A9chargement%20(31).jpg',
    alt: 'Paysage du Sud Tunisien',
    tall: false,
  },
  {
    src: 'https://ik.imagekit.io/63sim85mp/Medina%20of%20Tozeur%20(Ouled%20El%20Hadef)%20-%20Tunisia.jpg',
    alt: 'Médina de Tozeur — Ouled El Hadef',
    tall: true,
  },
  {
    src: 'https://ik.imagekit.io/63sim85mp/unnamed%20(4).webp',
    alt: 'Paysage désertique tunisien',
    tall: false,
  },
  {
    src: 'https://ik.imagekit.io/63sim85mp/700189653_997708846105263_3442220571947645826_n.jpg',
    alt: 'Circuit VIP — découverte du Sud',
    tall: true,
  },
  {
    src: 'https://ik.imagekit.io/63sim85mp/703635886_1004470635429084_7189036010959581417_n.jpg',
    alt: 'Aventure dans le désert tunisien',
    tall: false,
  },
  {
    src: 'https://ik.imagekit.io/63sim85mp/unnamed%20(5).webp',
    alt: 'Architecture traditionnelle tunisienne',
    tall: false,
  },
  {
    src: 'https://ik.imagekit.io/63sim85mp/Douz%20-%20Tunisia.jpg',
    alt: 'Douz — Porte du Sahara',
    tall: true,
  },
];

export default function Galerie() {
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [titleRef.current, gridRef.current].filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    els.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="galerie" className="py-24 bg-[#1A1209]" aria-label="Galerie photos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">
              Notre Galerie
            </span>
            <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
          </div>
          <h2 className="section-title text-white">
            La Beauté de la
            <span className="text-[#F5A623]"> Tunisie</span>
          </h2>
          <p className="section-subtitle text-white/70 mt-4">
            Des paysages qui coupent le souffle — dunes infinies, ksars millénaires,
            plages turquoise et médinas envoûtantes.
          </p>
        </div>

        {/* Masonry grid */}
        <div ref={gridRef} className="reveal masonry-grid" role="list" aria-label="Photos de la Tunisie">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="masonry-item group overflow-hidden rounded-xl"
              style={{ transitionDelay: `${i * 50}ms` }}
              role="listitem"
            >
              <div className="relative overflow-hidden">
                <OptimizedImage
                  src={photo.src}
                  alt={photo.alt}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    photo.tall ? 'h-72' : 'h-48'
                  }`}
                  width={400}
                  height={photo.tall ? 288 : 192}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{photo.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
