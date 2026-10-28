import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    (e.target as HTMLFormElement).reset();
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal overflow-hidden rounded-sm border border-gold-500/15 bg-gradient-to-b from-ink-800/80 to-ink-900/90">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — invitation */}
            <div className="relative flex flex-col justify-between gap-10 p-10 lg:p-14">
              <div>
                <span className="section-label justify-start">
                  <span className="h-px w-8 bg-gold-500" />
                  Contact
                </span>
                <h2 className="mt-6 font-display text-4xl font-medium leading-tight text-gold-100 sm:text-5xl">
                  Begin Your <span className="gold-text italic">Collection</span>
                </h2>
                <p className="mt-5 max-w-sm text-base font-light leading-relaxed text-gold-100/55">
                  Schedule a private viewing at one of our maisons, or request the
                  full catalogue. Our concierge will respond within one business
                  day.
                </p>
              </div>

              <ul className="space-y-5">
                {[
                  { icon: MapPin, label: '12 Rue du Rhône, Geneva, Switzerland' },
                  { icon: Phone, label: '+41 22 000 1921' },
                  { icon: Mail, label: 'concierge@luxoratime.com' },
                ].map((c) => (
                  <li key={c.label} className="flex items-center gap-4 text-sm text-gold-100/60">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/25 text-gold-300">
                      <c.icon size={15} />
                    </span>
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div className="border-t border-gold-500/10 p-10 lg:border-l lg:border-t-0 lg:p-14">
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <Field label="Full name" name="name" type="text" placeholder="Alexandre Durand" />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                <Field
                  label="Message"
                  name="message"
                  as="textarea"
                  placeholder="I would like to schedule a private viewing…"
                />
                <button type="submit" className="btn-gold mt-2 self-start">
                  <span>{sent ? 'Message Sent' : 'Send Message'}</span>
                  {!sent && <Send size={14} />}
                </button>
                {sent && (
                  <p className="text-xs text-gold-300/80">
                    Thank you — our concierge will be in touch shortly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  as,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  as?: 'textarea';
}) {
  const base =
    'w-full border-b border-gold-500/20 bg-transparent py-3 text-sm text-gold-100 placeholder:text-gold-100/25 focus:border-gold-400 focus:outline-none transition-colors duration-300';
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-500/80">
        {label}
      </span>
      {as === 'textarea' ? (
        <textarea name={name} placeholder={placeholder} rows={4} className={`${base} resize-none`} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}
