import { imageKitSrcSet, imageKitUrl, isImageKitUrl, isLocalAsset } from '../lib/imageKit';

export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  width,
  height,
  srcWebp,
  srcSet,
  sizes,
  priority = false,
  ...rest
}) {
  const loading = priority ? 'eager' : 'lazy';

  let resolvedSrc = src;
  let autoSrcSet = srcSet;

  if (!srcSet && src) {
    if (isImageKitUrl(src)) {
      resolvedSrc = imageKitUrl(src, { width: width || 768 });
      autoSrcSet = imageKitSrcSet(src);
    } else if (!isLocalAsset(src)) {
      try {
        const widths = [320, 480, 768, 1024, 1366, 1920];
        const hasWParam = /([?&])w=\d+/.test(src);
        autoSrcSet = widths
          .map((w) => {
            if (hasWParam) {
              return `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`;
            }
            const sep = src.includes('?') ? '&' : '?';
            return `${src}${sep}auto=compress&cs=tinysrgb&w=${w} ${w}w`;
          })
          .join(', ');
      } catch {
        autoSrcSet = undefined;
      }
    }
  }

  const autoSizes = sizes || (width ? `(max-width: ${width}px) 100vw, ${width}px` : undefined);

  const imgProps = {
    src: resolvedSrc,
    alt,
    loading,
    decoding: priority ? 'sync' : 'async',
    width,
    height,
    className,
    ...(autoSrcSet ? { srcSet: autoSrcSet } : {}),
    ...(autoSizes ? { sizes: autoSizes } : {}),
    ...(priority ? { fetchpriority: 'high' } : {}),
    ...rest,
  };

  if (srcWebp) {
    return (
      <picture>
        <source type="image/webp" srcSet={srcWebp} sizes={autoSizes} />
        <img {...imgProps} />
      </picture>
    );
  }

  return <img {...imgProps} />;
}
