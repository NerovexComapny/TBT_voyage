import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600&display=swap';

function loadWebFonts() {
  if (document.querySelector(`link[href="${FONTS_URL}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = FONTS_URL;
  link.onload = () => document.body.classList.add('fonts-loaded');
  document.head.appendChild(link);
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(loadWebFonts, { timeout: 5000 });
} else {
  window.setTimeout(loadWebFonts, 1500);
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(<App />);
