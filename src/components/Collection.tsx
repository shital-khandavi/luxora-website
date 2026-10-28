import { ArrowUpRight } from 'lucide-react';
import WatchImage from './WatchImage';
import { collection } from '@/lib/images';

export default function Collection() {
  return (
    <section id="collection" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label">
            <span className="h-px w-8 bg-gold-500" />
            The Collection
            <span className="h-px w-8 bg-gold-500" />
          </span>
          <h2 className="mt-6 font-display text-4xl font-medium text-gold-100 sm:text-5xl lg:text-6xl">
            Three Expressions of <span className="gold-text italic">Excellence</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-relaxed text-gold-100/50">
            Each timepiece is a study in restraint and radiance — engineered for
            those who measure life in moments, not minutes.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {collection.map((w, i) => (
            <article
              key={w.id}
              className="reveal group relative flex flex-col overflow-hidden rounded-sm border border-gold-500/15 bg-gradient-to-b from-ink-800/80 to-ink-900/80 transition-all duration-700 hover:border-gold-500/40"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute -inset-x-10 top-0 h-40 bg-gradient-to-b from-gold-500/10 to-transparent blur-2xl" />
              </div>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-ink-950">
                <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-105">
                  <WatchImage
                    src={w.image}
                    alt={`${w.name} luxury wristwatch`}
                    className="h-full w-full"
                    imgClassName="object-contain p-6"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold-500/5" />
              </div>

              {/* Body */}
              <div className="relative flex flex-1 flex-col px-7 pb-8 pt-6">
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-500/80">
                  {w.tagline}
                </span>
                <h3 className="mt-3 font-display text-2xl font-medium text-gold-100">
                  {w.name}
                </h3>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-gold-100/50">
                  {w.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-gold-500/10 pt-5">
                  <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-300/70">
                    {w.price}
                  </span>
                  <button className="group/btn inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-gold-200 transition-colors hover:text-gold-100">
                    View Details
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
