import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF6F0]" aria-label="Contactez-nous">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={el => { refs.current[0] = el; }}
          className="reveal text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">
              Contact
            </span>
            <div className="h-px w-12 bg-[#F5A623]" aria-hidden="true" />
          </div>
          <h2 className="section-title">
            Planifiez Votre
            <span className="text-[#F5A623]"> Voyage</span>
          </h2>
          <p className="section-subtitle mt-4">
            Notre équipe est à votre disposition pour créer l'expérience sur mesure
            dont vous rêvez.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — contact info + map */}
          <div
            ref={el => { refs.current[1] = el; }}
            className="reveal-left space-y-6"
          >
            {/* Info cards */}
            {[
              {
                icon: MapPin,
                title: 'Notre Adresse',
                lines: [
                  'Rue de Khartoum 63',
                  'Immeuble Belvédère Centre',
                  '1er étage B1-9, Tunis',
                ],
                color: '#F5A623',
              },
              {
                icon: Phone,
                title: 'Téléphones',
                lines: ['26 600 388', '29 629 696', '26 600 142'],
                color: '#29ABE2',
                href: 'tel:+21626600388',
              },
              {
                icon: Mail,
                title: 'Email',
                lines: ['reservation.tbt@gmail.com'],
                color: '#3A7D44',
                href: 'mailto:reservation.tbt@gmail.com',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.color + '15' }}
                    aria-hidden="true"
                  >
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1209] text-sm mb-1">{item.title}</div>
                    {item.lines.map((line, i) =>
                      item.href && i === 0 ? (
                        <a
                          key={line}
                          href={item.href}
                          className="block text-[#6B5C45] text-sm hover:text-[#F5A623] transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <div key={line} className="text-[#6B5C45] text-sm">{line}</div>
                      )
                    )}
                  </div>
                </div>
              );
            })}

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 h-56">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=10.1636,36.8019,10.1876,36.8259&layer=mapnik&marker=36.81395,10.17563"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Localisation de TBT Voyages sur la carte — Tunis"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Licence A Officielle', sub: 'Certifiée' },
                { label: 'Réservation Sécurisée', sub: 'Protégée' },
                { label: 'Support 24/7', sub: 'Disponible' },
              ].map(badge => (
                <div
                  key={badge.label}
                  className="bg-white rounded-xl p-3 text-center border border-[#F5A623]/20 shadow-sm"
                >
                  <div className="text-[#F5A623] font-bold text-xs leading-tight">{badge.label}</div>
                  <div className="text-[#6B5C45] text-[10px] mt-0.5">{badge.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            ref={el => { refs.current[2] = el; }}
            className="reveal-right"
          >
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-[400px]" role="status">
                <CheckCircle size={56} className="text-[#3A7D44] mb-4" aria-hidden="true" />
                <h3 className="font-display font-bold text-2xl text-[#1A1209] mb-2">
                  Message envoyé !
                </h3>
                <p className="text-[#6B5C45] leading-relaxed">
                  Merci pour votre message. Notre équipe vous contactera
                  dans les plus brefs délais pour organiser votre voyage de rêve.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 btn-gold text-sm"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100"
                aria-label="Formulaire de demande de renseignements"
              >
                <h3 className="font-display font-bold text-2xl text-[#1A1209] mb-6">
                  Demande de Renseignements
                </h3>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[#1A1209] text-sm font-medium mb-1.5">
                        Nom complet <span aria-label="requis">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="Votre nom"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-[#1A1209] text-sm font-medium mb-1.5">
                        Téléphone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        placeholder="+216 XX XXX XXX"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[#1A1209] text-sm font-medium mb-1.5">
                      Email <span aria-label="requis">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="votre@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[#1A1209] text-sm font-medium mb-1.5">
                      Message <span aria-label="requis">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Parlez-nous de votre voyage idéal : destination, dates, nombre de personnes..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-gold flex items-center justify-center gap-2 py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" role="status" aria-label="Envoi en cours" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        Envoyer ma Demande
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-[#6B5C45] text-xs mt-4">
                  Nous répondons généralement sous 2h pendant les heures de bureau.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
