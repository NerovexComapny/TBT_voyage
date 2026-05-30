const IMAGEKIT_BASE = 'https://ik.imagekit.io/63sim85mp';

export function imageKitUrl(src, { width, quality = 80, format = 'webp' } = {}) {
  const base = src.startsWith('http') ? src.split('?')[0] : `${IMAGEKIT_BASE}/${src.replace(/^\//, '')}`;
  const transforms = [`q-${quality}`];
  if (width) transforms.unshift(`w-${width}`);
  if (format) transforms.push(`f-${format}`);
  return `${base}?tr=${transforms.join(',')}`;
}

export function imageKitSrcSet(src, widths = [640, 768, 1024, 1280, 1920]) {
  return widths.map((w) => `${imageKitUrl(src, { width: w })} ${w}w`).join(', ');
}

export function isImageKitUrl(src) {
  return typeof src === 'string' && src.includes('ik.imagekit.io');
}

export function isLocalAsset(src) {
  return typeof src === 'string' && src.startsWith('/') && !src.startsWith('//');
}
