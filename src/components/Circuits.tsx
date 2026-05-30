import { useEffect, useRef } from 'react';
import { Calendar, MapPin, Check, ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const circuits = [
  {
    id: 'djerba',
    title: 'Djerba',
    subtitle: "L'Île de Rêve",
    duration: '3 - 5 jours',
    image: 'https://ik.imagekit.io/63sim85mp/t%C3%A9l%C3%A9chargement%20(32).jpg',
    highlights: [
      'Plages de sable fin',
      'Médina de Houmt Souk',
      'Musée du Judaïsme',
      'Cuisine locale authentique',
    ],
    tag: 'Mer & Culture',
    color: '#29ABE2',
  },
  {
    id: 'sud4',
    title: 'Sud Tunisien',
    subtitle: '4 Jours de Magie',
    duration: '4 jours / 3 nuits',
    image: 'https://ik.imagekit.io/63sim85mp/702443172_1001214575754690_8509717006853702677_n.jpg',
    highlights: [
      'Erg Chebbi & dunes dorées',
      'Ksar Ouled Soltane',
      'Douz — Porte du Sahara',
      'Balade en chameau au coucher du soleil',
    ],
    tag: 'Désert & Aventure',
    color: '#F5A623',
  },
  {
    id: 'sud5',
    title: 'Sud Tunisien',
    subtitle: '5 Jours de Découverte',
    duration: '5 jours / 4 nuits',
    image: 'https://ik.imagekit.io/63sim85mp/703635886_1004470635429084_7189036010959581417_n.jpg',
    highlights: [
      'Matmata & maisons troglodytes',
      'Tataouine & ksour berbères',
      'Lac Chott el Jérid',
      'Nuit sous les étoiles du Sahara',
    ],
    tag: 'Immersion Totale',
    color: '#3A7D44',
  },
];

function CircuitCard({ circuit, delay }: { circuit: typeof circuits[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const openWhatsApp = () => {
    const msg = encodeURIComponent(`Bonjour, je souhaite obtenir des informations sur le circuit "${circuit.title} — ${circuit.subtitle}".`);
    window.open(`https://wa.me/21626600388?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <article ref={ref} className="reveal card-hover rounded-2xl overflow-hidden shadow-lg bg-white group">
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <OptimizedImage
          src={circuit.image}
          alt={`Circuit ${circuit.title} — ${circuit.subtitle}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={400}
          height={224}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span
          className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: circuit.color }}
        >
          {circuit.tag}
        </span>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
          <Calendar size={14} aria-hidden="true" />
          <span>{circuit.duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-bold text-2xl text-[#1A1209] leading-tight">
          {circuit.title}
        </h3>
        <p className="text-[#F5A623] font-semibold text-sm mt-0.5">{circuit.subtitle}</p>

        <ul className="mt-4 space-y-2">
          {circuit.highlights.map(h => (
            <li key={h} className="flex items-start gap-2 text-sm text-[#6B5C45]">
              <Check size={15} className="text-[#3A7D44] mt-0.5 flex-shrink-0" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={openWhatsApp}
            className="flex-1 btn-gold text-sm py-3 text-center"
          >
            Prix sur Demande
          </button>
          <button
            onClick={openWhatsApp}
            className="p-3 rounded-full border-2 border-[#F5A623]/30 hover:border-[#F5A623] text-[#F5A623] transition-colors"
            aria-label={`Plus d'informations sur le circuit ${circuit.title}`}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Circuits() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="circuits" className="py-24 bg-[#FAF6F0]" aria-label="Nos Circuits VIP">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">
              Nos Circuits VIP
            </span>
            <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
          </div>
          <h2 className="section-title">
            Voyages Inoubliables en
            <span className="text-[#F5A623]"> Tunisie</span>
          </h2>
          <p className="section-subtitle mt-4">
            Chaque circuit est soigneusement conçu pour vous offrir le meilleur de la Tunisie :
            paysages époustouflants, culture millénaire et hospitalité sincère.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {circuits.map((circuit, i) => (
            <CircuitCard key={circuit.id} circuit={circuit} delay={i * 120} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-[#6B5C45] text-sm bg-white/80 px-6 py-3 rounded-full border border-[#F5A623]/20">
            <MapPin size={14} className="text-[#F5A623]" aria-hidden="true" />
            Circuits personnalisables selon vos désirs — contactez-nous pour un devis sur mesure
          </div>
        </div>
      </div>
    </section>
  );
}
