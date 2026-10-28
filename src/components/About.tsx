import { ShieldCheck, Gem, Award } from 'lucide-react';

const pillars = [
  {
    icon: Gem,
    title: 'Ethically Sourced Gold',
    text: 'Every gram of 18k gold is traced from responsible refineries — luxury with a clear conscience.',
  },
  {
    icon: ShieldCheck,
    title: 'Lifetime Guarantee',
    text: 'Each movement is certified and serviced for life. A promise that outlives trends.',
  },
  {
    icon: Award,
    title: 'Award-Winning Design',
    text: 'Recognised by the Grand Prix d\u2019Horlogerie for two consecutive editions.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label">
            <span className="h-px w-8 bg-gold-500" />
            The Maison
            <span className="h-px w-8 bg-gold-500" />
          </span>
          <h2 className="mt-6 font-display text-4xl font-medium text-gold-100 sm:text-5xl lg:text-6xl">
            A Century of <span className="gold-text italic">Quiet Perfection</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-gold-100/55">
            Founded in 1921 in the heart of the Jura mountains, LUXORA TIME has
            devoted itself to a single idea: that a watch should not merely tell
            the hour, but honour it. We build fewer than two thousand timepieces
            a year — each one carrying the patience of the hands that made it.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal group relative rounded-sm border border-gold-500/15 bg-gradient-to-b from-ink-800/70 to-ink-900/70 p-9 transition-all duration-700 hover:border-gold-500/35"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-500/10">
                <p.icon size={20} />
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-gold-100">
                {p.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-gold-100/50">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
