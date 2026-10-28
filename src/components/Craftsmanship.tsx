import WatchImage from './WatchImage';
import { craftsmanshipImage, craftsmanshipSecondary } from '@/lib/images';

const stats = [
  { value: '1921', label: 'Year founded' },
  { value: '48', label: 'Hand operations' },
  { value: '300m', label: 'Water resistance' },
  { value: '72h', label: 'Power reserve' },
];

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="relative overflow-hidden py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image column */}
          <div className="reveal relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-sm border border-gold-500/15">
              <WatchImage
                src={craftsmanshipImage}
                alt="Master watchmaker inspecting a luxury movement"
                className="aspect-[4/5] w-full"
                imgClassName="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
            </div>

            {/* Floating secondary image */}
            <div className="absolute -bottom-8 -right-4 hidden w-48 overflow-hidden rounded-sm border border-gold-500/25 shadow-2xl shadow-ink-950 sm:block lg:-right-8 lg:w-56">
              <WatchImage
                src={craftsmanshipSecondary}
                alt="Detailed luxury watch dial"
                className="aspect-square w-full"
                imgClassName="object-cover"
              />
            </div>

            {/* Glow */}
            <div className="pointer-events-none absolute -left-10 top-1/3 h-40 w-40 rounded-full bg-gold-500/15 blur-3xl" />
          </div>

          {/* Text column */}
          <div className="reveal order-1 lg:order-2">
            <span className="section-label justify-start">
              <span className="h-px w-8 bg-gold-500" />
              Craftsmanship
            </span>
            <h2 className="mt-6 font-display text-4xl font-medium leading-tight text-gold-100 sm:text-5xl lg:text-6xl">
              Precision in Every <span className="gold-text italic">Second</span>
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-gold-100/60">
              Every detail reflects a commitment to timeless design, precision
              and refined craftsmanship. From the first sketch to the final
              regulation, a single timepiece passes through the hands of master
              artisans for over four months.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-gold-500/15 bg-gold-500/10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-ink-900/90 px-6 py-7 text-center transition-colors duration-500 hover:bg-ink-800"
                >
                  <div className="font-display text-3xl font-semibold text-gold-200 lg:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[0.58rem] uppercase tracking-[0.25em] text-gold-100/45">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
