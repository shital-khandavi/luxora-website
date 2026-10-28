import { useEffect, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

/**
 * Image with graceful fallback: if the remote photo fails to load,
 * a gold-on-black monogrammed placeholder is shown instead of a
 * broken-image icon.
 */
export default function WatchImage({ src, alt, className = '', imgClassName = '' }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-ink-800 to-ink-950 ${className}`}
      >
        <div className="flex flex-col items-center gap-3 text-gold-500/60">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/40 font-display text-3xl text-gold-300">
            L
          </div>
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">LUXORA TIME</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-800 to-ink-950" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`block max-w-full object-contain transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  );
}
