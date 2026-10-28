import { useState } from 'react';
import { Check, RotateCcw, Palette, Circle, Clock, Download, type LucideIcon } from 'lucide-react';
import {
  ConfigurableWatch,
  strapOptions,
  bezelOptions,
  dialOptions,
  type WatchConfig,
  type StrapColor,
  type BezelFinish,
  type DialStyle,
} from './ConfigurableWatch';

const defaultConfig: WatchConfig = {
  strap: 'black',
  bezel: 'gold',
  dial: 'classic',
};

export default function Customizer() {
  const [config, setConfig] = useState<WatchConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof WatchConfig>(key: K, value: WatchConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const reset = () => {
    setConfig(defaultConfig);
    setSaved(false);
  };

  const strapName = strapOptions.find((s) => s.id === config.strap)?.label ?? '';
  const bezelName = bezelOptions.find((b) => b.id === config.bezel)?.label ?? '';
  const dialName = dialOptions.find((d) => d.id === config.dial)?.label ?? '';

  return (
    <section id="customize" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="section-label">
            <span className="h-px w-8 bg-gold-500" />
            Make It Yours
            <span className="h-px w-8 bg-gold-500" />
          </span>
          <h2 className="mt-6 font-display text-4xl font-medium text-gold-100 sm:text-5xl lg:text-6xl">
            Design Your <span className="gold-text italic">Signature</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-relaxed text-gold-100/50">
            Choose the strap, bezel finish, and dial style — and see your
            timepiece come to life in real time.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* ========== WATCH PREVIEW ========== */}
          <div className="reveal relative flex items-center justify-center">
            <div className="relative">
              {/* Golden glow */}
              <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 animate-glowpulse rounded-full bg-gold-500/15 blur-[80px]" />
              {/* Light sweep */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm">
                <div className="absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-gold-400/8 to-transparent blur-2xl" />
              </div>

              <div className="animate-floaty relative h-[520px] w-[280px] sm:h-[600px] sm:w-[320px]">
                <ConfigurableWatch config={config} />
              </div>

              {/* Config summary bar */}
              <div className="mt-6 flex items-center justify-center gap-3 rounded-sm border border-gold-500/15 bg-ink-900/60 px-5 py-3">
                <span className="text-[0.6rem] uppercase tracking-[0.25em] text-gold-500/70">Your Build</span>
                <span className="text-xs text-gold-100/70">
                  {strapName} · {bezelName} · {dialName}
                </span>
              </div>
            </div>
          </div>

          {/* ========== CONTROLS ========== */}
          <div className="reveal flex flex-col gap-8">
            {/* Strap Color */}
            <ControlGroup icon={Palette} title="Strap Color">
              <div className="flex flex-wrap gap-3">
                {strapOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => update('strap', s.id as StrapColor)}
                    className={`group flex items-center gap-3 rounded-sm border px-4 py-3 transition-all duration-300 ${
                      config.strap === s.id
                        ? 'border-gold-400 bg-gold-500/10'
                        : 'border-gold-500/15 hover:border-gold-500/30'
                    }`}
                  >
                    <span
                      className="h-7 w-7 rounded-full border border-gold-500/20 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: s.swatch }}
                    />
                    <span className={`text-[0.65rem] uppercase tracking-[0.2em] transition-colors ${config.strap === s.id ? 'text-gold-100' : 'text-gold-100/50'}`}>
                      {s.label}
                    </span>
                    {config.strap === s.id && <Check size={14} className="text-gold-300" />}
                  </button>
                ))}
              </div>
            </ControlGroup>

            {/* Bezel Finish */}
            <ControlGroup icon={Circle} title="Bezel Finish">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {bezelOptions.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => update('bezel', b.id as BezelFinish)}
                    className={`flex flex-col items-center gap-3 rounded-sm border px-3 py-5 transition-all duration-300 ${
                      config.bezel === b.id
                        ? 'border-gold-400 bg-gold-500/10'
                        : 'border-gold-500/15 hover:border-gold-500/30'
                    }`}
                  >
                    <span
                      className="h-10 w-10 rounded-full border border-gold-500/20 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${b.ringLight}, ${b.ring} 50%, ${b.ringDark})`,
                      }}
                    />
                    <span className={`text-[0.6rem] uppercase tracking-[0.2em] transition-colors ${config.bezel === b.id ? 'text-gold-100' : 'text-gold-100/50'}`}>
                      {b.label}
                    </span>
                  </button>
                ))}
              </div>
            </ControlGroup>

            {/* Dial Style */}
            <ControlGroup icon={Clock} title="Dial Style">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {dialOptions.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => update('dial', d.id as DialStyle)}
                    className={`flex flex-col items-center gap-2 rounded-sm border px-3 py-5 transition-all duration-300 ${
                      config.dial === d.id
                        ? 'border-gold-400 bg-gold-500/10'
                        : 'border-gold-500/15 hover:border-gold-500/30'
                    }`}
                  >
                    <DialPreview style={d.id} />
                    <span className={`text-[0.6rem] uppercase tracking-[0.2em] transition-colors ${config.dial === d.id ? 'text-gold-100' : 'text-gold-100/50'}`}>
                      {d.label}
                    </span>
                  </button>
                ))}
              </div>
            </ControlGroup>

            {/* Actions */}
            <div className="mt-2 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => setSaved(true)}
                className="btn-gold flex-1"
              >
                <span className="flex items-center justify-center gap-2">
                  {saved ? <Check size={14} /> : <Download size={14} />}
                  {saved ? 'Configuration Saved' : 'Save Configuration'}
                </span>
              </button>
              <button onClick={reset} className="btn-ghost">
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
            {saved && (
              <p className="text-xs text-gold-300/70">
                Your configuration has been noted. Our concierge will reach out
                to finalize your bespoke timepiece.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlGroup({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-gold-500/15 bg-gradient-to-b from-ink-800/50 to-ink-900/50 p-6">
      <div className="mb-5 flex items-center gap-2.5 text-gold-300">
        <Icon size={16} />
        <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-gold-100/80">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function DialPreview({ style }: { style: DialStyle }) {
  if (style === 'classic') {
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx="20" cy="20" r="18" fill="#0a0a0e" stroke="#c49a2e" strokeWidth="1" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 - 90) * (Math.PI / 180);
          return <line key={i} x1={20 + Math.cos(a) * 14} y1={20 + Math.sin(a) * 14} x2={20 + Math.cos(a) * 16} y2={20 + Math.sin(a) * 16} stroke="#e4be66" strokeWidth="0.8" />;
        })}
        <line x1="20" y1="20" x2="20" y2="10" stroke="#c49a2e" strokeWidth="0.8" />
      </svg>
    );
  }
  if (style === 'minimal') {
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx="20" cy="20" r="18" fill="#0d0d12" stroke="#c8c8d0" strokeWidth="0.5" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 - 90) * (Math.PI / 180);
          return <circle key={i} cx={20 + Math.cos(a) * 15} cy={20 + Math.sin(a) * 15} r="0.6" fill="#c8c8d0" />;
        })}
        <line x1="20" y1="20" x2="20" y2="11" stroke="#c8c8d0" strokeWidth="0.6" />
      </svg>
    );
  }
  if (style === 'chronograph') {
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx="20" cy="20" r="18" fill="#08080c" stroke="#c49a2e" strokeWidth="1" />
        <circle cx="14" cy="20" r="5" fill="#101016" stroke="#e4be66" strokeWidth="0.3" />
        <circle cx="26" cy="20" r="5" fill="#101016" stroke="#e4be66" strokeWidth="0.3" />
        <line x1="20" y1="20" x2="20" y2="11" stroke="#c49a2e" strokeWidth="0.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <circle cx="20" cy="20" r="18" fill="#0c0c10" stroke="#c49a2e" strokeWidth="1" />
      {Array.from({ length: 5 }, (_, i) => (
        <circle key={i} cx="20" cy="20" r={3 + i * 3} fill="none" stroke="#e4be66" strokeWidth="0.2" opacity="0.4" />
      ))}
      <line x1="20" y1="20" x2="20" y2="11" stroke="#c49a2e" strokeWidth="0.6" />
    </svg>
  );
}
