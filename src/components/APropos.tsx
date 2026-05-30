import { useEffect, useRef } from 'react';
import { Award, Heart, Globe, Shield } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const values = [
  { icon: Award, title: 'Excellence', desc: "Chaque détail compte pour nous. Nous ne faisons aucun compromis sur la qualité de l'expérience." },
  { icon: Heart, title: 'Passion', desc: "Nous aimons la Tunisie et nous voulons partager cette passion avec chaque voyageur." },
  { icon: Globe, title: 'Authenticité', desc: "Immersion totale dans la culture locale, loin des circuits touristiques standardisés." },
  { icon: Shield, title: 'Confiance', desc: "Agence officielle Licence A, nous garantissons sécurité et transparence à chaque étape." },
];

export default function APropos() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="apropos" className="py-24 bg-white" aria-label="À Propos de TBT Voyages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — story */}
          <div
            ref={el => { refs.current[0] = el; }}
            className="reveal-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
              <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">
                À Propos
              </span>
            </div>

            <h2 className="section-title mb-6">
              Notre Histoire,
              <br />
              <span className="text-[#F5A623]">Votre Aventure</span>
            </h2>

            <div className="space-y-4 text-[#6B5C45] leading-relaxed">
              <p>
                Fondée à Tunis avec une vision claire — faire découvrir les merveilles cachées
                de la Tunisie à travers des expériences VIP inoubliables — TBT Voyages s'est
                imposée comme l'agence de référence pour les circuits dans le Sud Tunisien et Djerba.
              </p>
              <p>
                Notre équipe de guides natifs, passionnés et multilingues, vous emmènera
                au-delà des sentiers battus : dans les profondeurs du Sahara, au cœur des
                ksars berbères de Tataouine, sur les plages cristallines de l'île de Djerba.
              </p>
              <p>
                Titulaires de la <strong className="text-[#1A1209]">Licence A officielle</strong>,
                nous opérons avec les plus hauts standards professionnels,
                garantissant votre sécurité et votre satisfaction à chaque instant.
              </p>
            </div>

            {/* Licence badge */}
            <div className="mt-8 inline-flex items-center gap-4 bg-[#FFF8EC] border-2 border-[#F5A623]/30 rounded-2xl px-6 py-4">
              <div className="w-12 h-12 rounded-xl bg-[#F5A623] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-[#1A1209] text-sm">
                  Agence de Voyages
                </div>
                <div className="badge-shine font-black text-xl">LICENCE A</div>
                <div className="text-[#6B5C45] text-xs">Certifiée par les autorités tunisiennes</div>
              </div>
            </div>
          </div>

          {/* Right — image + values */}
          <div
            ref={el => { refs.current[1] = el; }}
            className="reveal-right"
          >
            {/* Image collage */}
            <div className="relative mb-8">
              <OptimizedImage
                src="https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Paysage du Sud Tunisien — désert et oasis"
                className="w-full h-72 object-cover rounded-3xl shadow-2xl"
                width={700}
                height={288}
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F5A623] flex items-center justify-center" aria-hidden="true">
                  <span className="text-white font-black text-xl">10</span>
                </div>
                <div>
                  <div className="font-bold text-[#1A1209] text-sm leading-none">Années</div>
                  <div className="text-[#6B5C45] text-xs">d'expérience</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-[#1A1209] rounded-2xl shadow-xl p-4 text-center">
                <div className="font-black text-[#F5A623] text-2xl leading-none">500+</div>
                <div className="text-white/70 text-xs mt-0.5">Clients heureux</div>
              </div>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    ref={el => { refs.current[i + 2] = el; }}
                    className="reveal bg-[#FAF6F0] rounded-xl p-4 border border-[#F5A623]/10"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <Icon size={20} className="text-[#F5A623] mb-2" aria-hidden="true" />
                    <div className="font-semibold text-[#1A1209] text-sm">{v.title}</div>
                    <div className="text-[#6B5C45] text-xs mt-1 leading-relaxed">{v.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
