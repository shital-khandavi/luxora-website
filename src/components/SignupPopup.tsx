import { useEffect, useState } from 'react';
import { X, Mail, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const DISMISS_KEY = 'luxora_signup_dismissed';
const SUCCESS_KEY = 'luxora_signup_subscribed';
const SHOW_DELAY = 8000; // ms after page load

export default function SignupPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY) === '1';
    const subscribed = localStorage.getItem(SUCCESS_KEY) === '1';
    if (dismissed || subscribed) return;

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem(DISMISS_KEY, '1');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('subscribers')
      .insert({ email: trimmed, source: 'popup' });

    if (error) {
      // 23505 = unique_violation — already subscribed, treat as success
      if (error.code === '23505') {
        setStatus('success');
        localStorage.setItem(SUCCESS_KEY, '1');
        return;
      }
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
      return;
    }

    setStatus('success');
    localStorage.setItem(SUCCESS_KEY, '1');
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 animate-[rise_0.4s_ease-out_forwards] bg-ink-950/80 backdrop-blur-md"
        onClick={close}
        style={{ opacity: 0 }}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-md animate-[rise_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards] overflow-hidden rounded-sm border border-gold-500/30 bg-gradient-to-b from-ink-800 to-ink-900 shadow-2xl shadow-black/60"
        style={{ opacity: 0 }}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-gold-400/8 to-transparent" />

        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-sm p-1.5 text-gold-200/60 transition-colors hover:bg-gold-500/10 hover:text-gold-100"
        >
          <X size={18} />
        </button>

        <div className="relative p-8 sm:p-10">
          {status === 'success' ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 bg-gold-500/10 text-gold-300">
                <Check size={26} />
              </div>
              <h3 id="signup-title" className="mt-6 font-display text-2xl font-medium text-gold-100">
                Welcome to the Inner Circle
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-gold-100/55">
                You now have priority access to private collection releases and
                new LUXORA TIME editions. Our concierge will be in touch.
              </p>
              <button onClick={close} className="btn-ghost mt-8">
                Continue
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2.5 text-gold-400">
                <Mail size={16} />
                <span className="text-[0.6rem] uppercase tracking-[0.35em]">
                  Private Invitation
                </span>
              </div>

              <h3 id="signup-title" className="mt-5 text-center font-display text-3xl font-medium leading-tight text-gold-100 sm:text-4xl">
                Early Access to <span className="gold-text italic">New Editions</span>
              </h3>

              <p className="mt-4 text-center text-sm font-light leading-relaxed text-gold-100/55">
                Join an exclusive list for private collection releases, limited
                editions, and early access — before they reach the public.
              </p>

              <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="your@email.com"
                  className="w-full border-b border-gold-500/25 bg-transparent py-3 text-center text-sm text-gold-100 placeholder:text-gold-100/25 focus:border-gold-400 focus:outline-none"
                  autoFocus
                />

                {status === 'error' && (
                  <p className="text-center text-xs text-red-300/80">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-gold mt-2 w-full disabled:opacity-60"
                >
                  <span className="flex items-center gap-2">
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Subscribing…
                      </>
                    ) : (
                      'Request Early Access'
                    )}
                  </span>
                </button>
              </form>

              <p className="mt-5 text-center text-[0.6rem] uppercase tracking-[0.2em] text-gold-100/30">
                No spam · Unsubscribe anytime
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
