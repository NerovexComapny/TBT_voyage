import { useEffect, useRef } from 'react';
import { Crown, Users, TrendingDown } from 'lucide-react';

const reasons = [
  {
    icon: Crown,
    title: 'Circuits VIP',
    description:
      'Des itinéraires exclusifs conçus pour offrir le summum du luxe et de l\'authenticité. Hébergements premium, transport privé, expériences uniques.',
    color: '#F5A623',
    bg: '#FFF8EC',
  },
  {
    icon: Users,
    title: 'Guides Experts',
    description:
      'Nos guides passionnés, natifs du Sud Tunisien, partagent avec vous des histoires et des secrets que seuls les locaux connaissent.',
    color: '#29ABE2',
    bg: '#EAF7FF',
  },
  {
    icon: TrendingDown,
    title: 'Prix Compétitifs',
    description:
      'Qualité premium au meilleur prix. Nous négocions directement avec les prestataires pour vous garantir le meilleur rapport qualité-prix.',
    color: '#3A7D44',
    bg: '#EDF7EF',
  },
];

export default function WhyUs() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white sand-texture" aria-label="Pourquoi nous choisir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={el => { refs.current[0] = el; }}
          className="reveal text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">
              Notre Engagement
            </span>
            <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
          </div>
          <h2 className="section-title">
            Pourquoi Nous
            <span className="text-[#F5A623]"> Choisir ?</span>
          </h2>
          <p className="section-subtitle mt-4">
            TBT Voyages, c'est plus qu'une agence — c'est une promesse d'aventure,
            d'authenticité et de souvenirs inoubliables.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                ref={el => { refs.current[i + 1] = el; }}
                className="reveal card-hover rounded-2xl p-8 text-center border border-gray-100 shadow-sm"
                style={{ backgroundColor: reason.bg, transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: reason.color + '20' }}
                  aria-hidden="true"
                >
                  <Icon size={32} style={{ color: reason.color }} />
                </div>
                <h3 className="font-display font-bold text-xl text-[#1A1209] mb-3">
                  {reason.title}
                </h3>
                <p className="text-[#6B5C45] text-sm leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
