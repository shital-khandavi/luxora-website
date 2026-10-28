import WatchImage from './WatchImage';
import { detailShots } from '@/lib/images';

export default function Details() {
  return (
    <section id="details" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label">
            <span className="h-px w-8 bg-gold-500" />
            Close-Up Details
            <span className="h-px w-8 bg-gold-500" />
          </span>
          <h2 className="mt-6 font-display text-4xl font-medium text-gold-100 sm:text-5xl lg:text-6xl">
            Considered Down to the <span className="gold-text italic">Last Micron</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-relaxed text-gold-100/50">
            From the sun-brushed dial to the knurled crown, every surface is
            finished by hand and inspected under loupe.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {detailShots.map((d, i) => (
            <figure
              key={d.id}
              className={`reveal group relative overflow-hidden rounded-sm border border-gold-500/15 bg-ink-900 ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-105">
                  <WatchImage
                    src={d.image}
                    alt={`${d.title} macro close-up of a luxury watch`}
                    className="h-full w-full"
                    imgClassName="object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold-500/10 transition-colors duration-700 group-hover:ring-gold-500/30" />
              </div>

              <figcaption className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-400">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-2xl font-medium text-gold-100 lg:text-3xl">
                  {d.title}
                </h3>
                <p className="mt-2 max-w-md text-sm font-light text-gold-100/60">
                  {d.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
