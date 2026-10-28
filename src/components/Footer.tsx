export default function Footer() {
  return (
    <footer className="border-t border-gold-500/15 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span className="font-display text-2xl font-semibold tracking-[0.18em] text-gold-200">
              LUXORA
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.45em] text-gold-500/70">
              Time
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-[0.65rem] uppercase tracking-[0.25em] text-gold-100/45">
            {['Home', 'Customize', 'Collection', 'Craftsmanship', 'About', 'Contact'].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="transition-colors hover:text-gold-200"
              >
                {l}
              </a>
            ))}
          </nav>

          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-gold-100/35">
            © {new Date().getFullYear()} Luxora Time
          </p>
        </div>

        <div className="mt-10 gold-line opacity-30" />
        <p className="mt-6 text-center text-[0.6rem] uppercase tracking-[0.3em] text-gold-100/30">
          Crafted in Geneva · Worn Worldwide
        </p>
      </div>
    </footer>
  );
}
