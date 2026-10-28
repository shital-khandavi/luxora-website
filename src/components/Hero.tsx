import { ArrowRight, Sparkles } from 'lucide-react';
import WatchImage from './WatchImage';
import { heroWatch } from '@/lib/images';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Ambient particles */}
      <Particles />

      {/* Light sweep behind watch */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/2 h-[70vh] w-[45vw] -translate-y-1/2">
          <div className="absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-gold-400/15 to-transparent blur-3xl" />
        </div>
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-28 pb-10 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:px-10 lg:pt-16 lg:pb-8">
        {/* Text column */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <span
            className="section-label animate-rise"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            <Sparkles size={14} className="text-gold-400" />
            Timeless Luxury
          </span>

          <h1
            className="mt-6 animate-rise font-display text-5xl font-medium leading-[1.02] text-gold-100 text-shadow-gold sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            Elegance on
            <br />
            Your <span className="gold-text italic">Wrist.</span>
          </h1>

          <p
            className="mt-6 max-w-md animate-rise text-base font-light leading-relaxed text-gold-100/60 sm:text-lg"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            Where precision meets timeless design.
          </p>

          <div
            className="mt-9 flex animate-rise flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '0.7s', opacity: 0 }}
          >
            <a href="#collection" className="btn-gold">
              <span>Explore Collection</span>
            </a>
            <a href="#details" className="btn-ghost">
              Discover More
              <ArrowRight size={15} />
            </a>
          </div>

          <div
            className="mt-10 flex animate-rise items-center gap-8 text-gold-100/40"
            style={{ animationDelay: '0.9s', opacity: 0 }}
          >
            {['Swiss Made', '18k Gold', 'Sapphire Crystal'].map((t) => (
              <span key={t} className="text-[0.6rem] uppercase tracking-[0.3em]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Watch column — large luxury watch, full strap visible */}
        <div className="relative order-1 flex items-center justify-center lg:order-2">
          {/* Golden glow behind watch */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 animate-glowpulse rounded-full bg-gold-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30vh] w-[25vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/10 blur-[60px]" />

          {/* Realistic drop shadow */}
          <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-5 w-40 -translate-x-1/2 rounded-full bg-black/60 blur-2xl" />

          {/* The watch — sized to fit hero, complete strap visible */}
          <div className="animate-floaty relative z-10">
            <WatchImage
              src={heroWatch}
              alt="LUXORA TIME luxury wristwatch — complete black leather strap, gold bezel, black dial with gold hands"
              className="max-h-[55vh] w-auto lg:max-h-[68vh]"
              imgClassName="max-h-[55vh] w-auto lg:max-h-[68vh] drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gold-500/50 lg:flex">
        <span className="text-[0.55rem] uppercase tracking-[0.35em]">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-gold-500/20">
          <div className="h-1/2 w-full animate-[floaty_2s_ease-in-out_infinite] bg-gold-400" />
        </div>
      </div>
    </section>
  );
}

function Particles() {
  const dots = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = 1 + (i % 3);
        const delay = (i % 7) * 0.6;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold-300 animate-twinkle"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
