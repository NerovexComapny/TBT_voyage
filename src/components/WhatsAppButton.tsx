import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    const msg = encodeURIComponent("Bonjour TBT Voyages ! Je souhaite obtenir des informations sur vos circuits.");
    window.open(`https://wa.me/21626600388?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="whatsapp-btn fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1EA952] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      aria-label="Contacter TBT Voyages sur WhatsApp"
    >
      <MessageCircle size={26} fill="white" aria-hidden="true" />
      <span className="absolute right-16 bg-[#1A1209] text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg" aria-hidden="true">
        Discuter sur WhatsApp
      </span>
    </button>
  );
}
