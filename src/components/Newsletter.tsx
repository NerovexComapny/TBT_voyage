import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      aria-label="Inscription à la newsletter"
      style={{
        background: 'linear-gradient(135deg, #1A1209 0%, #2D1F0A 50%, #1A1209 100%)',
      }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#F5A623]/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#29ABE2]/5 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={ref} className="reveal">
          <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">
            Newsletter
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-4">
            Recevez Nos Offres{' '}
            <span className="text-[#F5A623]">Exclusives</span>
          </h2>
          <p className="text-white/70 mb-8 text-sm leading-relaxed">
            Inscrivez-vous pour recevoir en avant-première nos circuits spéciaux,
            offres de dernière minute et conseils de voyage sur la Tunisie.
          </p>

          {submitted ? (
            <div className="bg-[#3A7D44]/20 border border-[#3A7D44]/40 text-[#7FCA8A] rounded-2xl py-5 px-8 font-medium" role="status">
              Merci ! Vous êtes maintenant inscrit(e) à notre newsletter.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" aria-label="Formulaire d'inscription newsletter">
              <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Votre adresse email..."
                required
                autoComplete="email"
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:border-[#F5A623]/60 focus:bg-white/15 transition-all"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#D4891A] text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 text-sm whitespace-nowrap"
              >
                <Send size={16} aria-hidden="true" />
                S'inscrire
              </button>
            </form>
          )}

          <p className="text-white/40 text-xs mt-4">
            Vos données sont confidentielles. Désabonnement en un clic.
          </p>
        </div>
      </div>
    </section>
  );
}
