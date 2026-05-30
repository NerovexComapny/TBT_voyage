import { Suspense, lazy, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
const Circuits = lazy(() => import('./components/Circuits'));
const WhyUs = lazy(() => import('./components/WhyUs'));
const Galerie = lazy(() => import('./components/Galerie'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const APropos = lazy(() => import('./components/APropos'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Contact = lazy(() => import('./components/Contact'));

const SectionFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center" role="status">
    <span className="text-white/60 text-sm">Chargement...</span>
  </div>
);

function DeferredSections() {
  return (
    <>
      <Suspense fallback={<SectionFallback />}>
        <Circuits />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Galerie />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <APropos />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Newsletter />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  );
}

function App() {
  const [sectionsReady, setSectionsReady] = useState(false);

  useEffect(() => {
    let fallbackId;

    const enableSections = () => {
      setSectionsReady(true);
      window.dispatchEvent(new Event('tbt:sections-ready'));
      window.removeEventListener('scroll', onScroll);
      if (fallbackId) clearTimeout(fallbackId);
    };

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        enableSections();
      }
    };

    if (window.location.hash && window.location.hash !== '#accueil') {
      enableSections();
      return undefined;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    fallbackId = window.setTimeout(enableSections, 8000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (fallbackId) clearTimeout(fallbackId);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <Hero />
        {sectionsReady ? <DeferredSections /> : null}
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {sectionsReady ? (
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
      ) : null}
    </div>
  );
}

export default App;
