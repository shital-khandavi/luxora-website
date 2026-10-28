import { memo } from 'react';

export type StrapColor = 'black' | 'brown' | 'navy' | 'burgundy' | 'tan';
export type BezelFinish = 'gold' | 'rose-gold' | 'silver' | 'gunmetal';
export type DialStyle = 'classic' | 'minimal' | 'chronograph' | 'guilloche';

export type WatchConfig = {
  strap: StrapColor;
  bezel: BezelFinish;
  dial: DialStyle;
};

export const strapOptions: { id: StrapColor; label: string; swatch: string }[] = [
  { id: 'black', label: 'Black', swatch: '#1a1a1e' },
  { id: 'brown', label: 'Chestnut', swatch: '#4a2c1a' },
  { id: 'navy', label: 'Midnight Blue', swatch: '#152039' },
  { id: 'burgundy', label: 'Burgundy', swatch: '#3a1216' },
  { id: 'tan', label: 'Cognac', swatch: '#7a4e23' },
];

export const bezelOptions: {
  id: BezelFinish;
  label: string;
  ring: string;
  ringLight: string;
  ringDark: string;
}[] = [
  { id: 'gold', label: '18k Gold', ring: '#c49a2e', ringLight: '#f7eccf', ringDark: '#7c5c1c' },
  { id: 'rose-gold', label: 'Rose Gold', ring: '#b76e7a', ringLight: '#f0d4d8', ringDark: '#7a3a48' },
  { id: 'silver', label: 'Silver', ring: '#c8c8d0', ringLight: '#f4f4f8', ringDark: '#6e6e78' },
  { id: 'gunmetal', label: 'Gunmetal', ring: '#4a4a52', ringLight: '#7e7e88', ringDark: '#2a2a30' },
];

export const dialOptions: { id: DialStyle; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'chronograph', label: 'Chronograph' },
  { id: 'guilloche', label: 'Guilloché' },
];

const strapColors: Record<StrapColor, { base: string; shade: string; stitch: string }> = {
  black: { base: '#1c1c20', shade: '#0e0e12', stitch: '#c49a2e' },
  brown: { base: '#4a2c1a', shade: '#2e1a0e', stitch: '#d4a93c' },
  navy: { base: '#152039', shade: '#0a1020', stitch: '#c8c8d0' },
  burgundy: { base: '#3a1216', shade: '#220a0d', stitch: '#c49a2e' },
  tan: { base: '#7a4e23', shade: '#4e3014', stitch: '#f0d4a0' },
};

const dialColors: Record<DialStyle, { bg: string; bgStop: string; marker: string; subdial: string }> = {
  classic: { bg: '#0a0a0e', bgStop: '#16161e', marker: '#e4be66', subdial: '#121218' },
  minimal: { bg: '#0d0d12', bgStop: '#1a1a22', marker: '#c8c8d0', subdial: '#141418' },
  chronograph: { bg: '#08080c', bgStop: '#14141c', marker: '#e4be66', subdial: '#101016' },
  guilloche: { bg: '#0c0c10', bgStop: '#1c1c26', marker: '#e4be66', subdial: '#141420' },
};

/**
 * A detailed, photoreal-style luxury wristwatch rendered entirely in SVG.
 * Every part — strap, case, bezel, dial, hands, crown — is driven by the
 * WatchConfig so the preview updates instantly when a visitor changes
 * strap color, bezel finish, or dial style.
 */
function ConfigurableWatchBase({ config }: { config: WatchConfig }) {
  const strap = strapColors[config.strap];
  const bezel = bezelOptions.find((b) => b.id === config.bezel)!;
  const dial = dialColors[config.dial];

  const cx = 200;
  const cy = 300;
  const r = 165; // outer case radius

  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    return {
      x1: cx + Math.cos(angle) * 120,
      y1: cy + Math.sin(angle) * 120,
      x2: cx + Math.cos(angle) * 140,
      y2: cy + Math.sin(angle) * 140,
      textX: cx + Math.cos(angle) * 104,
      textY: cy + Math.sin(angle) * 104,
      label: i === 0 ? 'XII' : i === 3 ? 'III' : i === 6 ? 'VI' : i === 9 ? 'IX' : '',
    };
  });

  const stichSpacing = 16;
  const topStitches = Array.from({ length: 9 }, (_, i) => ({
    y: 48 + i * stichSpacing + 4,
  }));
  const bottomStitches = Array.from({ length: 9 }, (_, i) => ({
    y: 430 + i * stichSpacing + 4,
  }));

  return (
    <svg
      viewBox="0 0 400 880"
      className="h-full w-full"
      style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))' }}
    >
      <defs>
        {/* Strap gradient — vertical for natural leather sheen */}
        <linearGradient id="strapGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={strap.shade} />
          <stop offset="25%" stopColor={strap.base} />
          <stop offset="50%" stopColor={strap.base} />
          <stop offset="75%" stopColor={strap.base} />
          <stop offset="100%" stopColor={strap.shade} />
        </linearGradient>

        {/* Bezel metallic gradient */}
        <linearGradient id="bezelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bezel.ringLight} />
          <stop offset="30%" stopColor={bezel.ring} />
          <stop offset="50%" stopColor={bezel.ringLight} />
          <stop offset="70%" stopColor={bezel.ring} />
          <stop offset="100%" stopColor={bezel.ringDark} />
        </linearGradient>

        <linearGradient id="bezelInner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bezel.ringLight} stopOpacity="0.4" />
          <stop offset="100%" stopColor={bezel.ringDark} stopOpacity="0.4" />
        </linearGradient>

        {/* Case metallic gradient */}
        <linearGradient id="caseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bezel.ringDark} />
          <stop offset="50%" stopColor={bezel.ring} />
          <stop offset="100%" stopColor={bezel.ringLight} />
        </linearGradient>

        {/* Dial radial gradient */}
        <radialGradient id="dialGrad" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0%" stopColor={dial.bgStop} />
          <stop offset="100%" stopColor={dial.bg} />
        </radialGradient>

        {/* Crystal reflection */}
        <radialGradient id="crystal" cx="0.3" cy="0.2" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Guilloché pattern */}
        <pattern id="guillochePat" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="3.5" fill="none" stroke={dial.marker} strokeWidth="0.3" opacity="0.25" />
          <circle cx="4" cy="4" r="1.5" fill="none" stroke={dial.marker} strokeWidth="0.3" opacity="0.15" />
        </pattern>

        {/* Hands gradient */}
        <linearGradient id="handGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={bezel.ringDark} />
          <stop offset="50%" stopColor={bezel.ring} />
          <stop offset="100%" stopColor={bezel.ringLight} />
        </linearGradient>

        {/* Strap texture */}
        <pattern id="strapTex" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="none" />
          <line x1="0" y1="0" x2="6" y2="0" stroke={strap.shade} strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>

      {/* ============ UPPER STRAP ============ */}
      <path
        d={`M ${cx - 62} 48 Q ${cx - 72} 24 ${cx - 58} 10 L ${cx + 58} 10 Q ${cx + 72} 24 ${cx + 62} 48 L ${cx + 52} 138 Q ${cx + 56} 160 ${cx + 48} 175 L ${cx - 48} 175 Q ${cx - 56} 160 ${cx - 52} 138 Z`}
        fill="url(#strapGrad)"
      />
      <path
        d={`M ${cx - 62} 48 Q ${cx - 72} 24 ${cx - 58} 10 L ${cx + 58} 10 Q ${cx + 72} 24 ${cx + 62} 48 L ${cx + 52} 138 Q ${cx + 56} 160 ${cx + 48} 175 L ${cx - 48} 175 Q ${cx - 56} 160 ${cx - 52} 138 Z`}
        fill="url(#strapTex)"
      />
      {/* Strap edge shadow */}
      <path
        d={`M ${cx - 48} 175 Q ${cx - 56} 160 ${cx - 52} 138 L ${cx - 62} 48 Q ${cx - 72} 24 ${cx - 58} 10 L ${cx - 50} 10 Q ${cx - 64} 24 ${cx - 54} 48 L ${cx - 44} 138 Q ${cx - 48} 160 ${cx - 40} 175 Z`}
        fill={strap.shade}
        opacity="0.5"
      />

      {/* ============ LOWER STRAP ============ */}
      <path
        d={`M ${cx - 48} 425 Q ${cx - 56} 440 ${cx - 52} 462 L ${cx - 62} 790 Q ${cx - 72} 820 ${cx - 58} 870 L ${cx + 58} 870 Q ${cx + 72} 820 ${cx + 62} 790 L ${cx + 52} 462 Q ${cx + 56} 440 ${cx + 48} 425 Z`}
        fill="url(#strapGrad)"
      />
      <path
        d={`M ${cx - 48} 425 Q ${cx - 56} 440 ${cx - 52} 462 L ${cx - 62} 790 Q ${cx - 72} 820 ${cx - 58} 870 L ${cx + 58} 870 Q ${cx + 72} 820 ${cx + 62} 790 L ${cx + 52} 462 Q ${cx + 56} 440 ${cx + 48} 425 Z`}
        fill="url(#strapTex)"
      />
      <path
        d={`M ${cx + 48} 425 Q ${cx + 56} 440 ${cx + 52} 462 L ${cx + 62} 790 Q ${cx + 72} 820 ${cx + 58} 870 L ${cx + 50} 870 Q ${cx + 64} 820 ${cx + 54} 790 L ${cx + 44} 462 Q ${cx + 48} 440 ${cx + 40} 425 Z`}
        fill={strap.shade}
        opacity="0.5"
      />

      {/* ============ STITCHING ============ */}
      {/* Upper strap stitches */}
      {topStitches.map((s, i) => (
        <g key={`ts-${i}`}>
          <line x1={cx - 48} y1={s.y} x2={cx - 42} y2={s.y} stroke={strap.stitch} strokeWidth="1.2" opacity="0.55" />
          <line x1={cx + 42} y1={s.y} x2={cx + 48} y2={s.y} stroke={strap.stitch} strokeWidth="1.2" opacity="0.55" />
        </g>
      ))}
      {/* Lower strap stitches */}
      {bottomStitches.map((s, i) => (
        <g key={`bs-${i}`}>
          <line x1={cx - 48} y1={s.y} x2={cx - 42} y2={s.y} stroke={strap.stitch} strokeWidth="1.2" opacity="0.55" />
          <line x1={cx + 42} y1={s.y} x2={cx + 48} y2={s.y} stroke={strap.stitch} strokeWidth="1.2" opacity="0.55" />
        </g>
      ))}

      {/* Strap keeper loops (upper) */}
      <rect x={cx - 30} y={175} width={60} height={10} rx="3" fill={strap.shade} opacity="0.7" />
      <rect x={cx - 14} y={175} width={28} height={10} rx="3" fill={strap.base} stroke={strap.shade} strokeWidth="0.5" />

      {/* ============ LUGS ============ */}
      <path d={`M ${cx - 62} 150 L ${cx - 58} 180 L ${cx - 38} 180 L ${cx - 35} 150 Z`} fill="url(#caseGrad)" />
      <path d={`M ${cx + 62} 150 L ${cx + 58} 180 L ${cx + 38} 180 L ${cx + 35} 150 Z`} fill="url(#caseGrad)" />
      <path d={`M ${cx - 62} 420 L ${cx - 58} 450 L ${cx - 38} 450 L ${cx - 35} 420 Z`} fill="url(#caseGrad)" />
      <path d={`M ${cx + 62} 420 L ${cx + 58} 450 L ${cx + 38} 450 L ${cx + 35} 420 Z`} fill="url(#caseGrad)" />

      {/* ============ CASE BODY ============ */}
      <circle cx={cx} cy={cy} r={r} fill="url(#caseGrad)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={bezel.ringDark} strokeWidth="1" opacity="0.5" />

      {/* ============ BEZEL ============ */}
      <circle cx={cx} cy={cy} r={152} fill="url(#bezelGrad)" />
      <circle cx={cx} cy={cy} r={152} fill="none" stroke={bezel.ringDark} strokeWidth="0.8" opacity="0.6" />

      {/* Bezel knurling ticks */}
      {Array.from({ length: 120 }, (_, i) => {
        const angle = (i * 3) * (Math.PI / 180);
        const x1 = cx + Math.cos(angle) * 148;
        const y1 = cy + Math.sin(angle) * 148;
        const x2 = cx + Math.cos(angle) * 152;
        const y2 = cy + Math.sin(angle) * 152;
        return (
          <line key={`kn-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={bezel.ringDark} strokeWidth="0.5" opacity="0.4" />
        );
      })}

      {/* Bezel inner ring */}
      <circle cx={cx} cy={cy} r={140} fill="url(#bezelInner)" />
      <circle cx={cx} cy={cy} r={138} fill="none" stroke={bezel.ringDark} strokeWidth="0.5" opacity="0.5" />

      {/* ============ DIAL ============ */}
      <circle cx={cx} cy={cy} r={136} fill="url(#dialGrad)" />

      {/* Guilloché pattern overlay */}
      {config.dial === 'guilloche' && (
        <circle cx={cx} cy={cy} r={134} fill="url(#guillochePat)" />
      )}

      {/* Sunburst texture for classic & minimal */}
      {(config.dial === 'classic' || config.dial === 'minimal') &&
        Array.from({ length: 72 }, (_, i) => {
          const angle = (i * 5) * (Math.PI / 180);
          return (
            <line
              key={`sb-${i}`}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(angle) * 134}
              y2={cy + Math.sin(angle) * 134}
              stroke={dial.marker}
              strokeWidth="0.15"
              opacity="0.06"
            />
          );
        })}

      {/* Chronograph subdials */}
      {config.dial === 'chronograph' && (
        <>
          {[210, 30, 150].map((deg, i) => {
            const rad = deg * (Math.PI / 180);
            const sx = cx + Math.cos(rad) * 70;
            const sy = cy + Math.sin(rad) * 70;
            return (
              <g key={`sub-${i}`}>
                <circle cx={sx} cy={sy} r={38} fill={dial.subdial} stroke={dial.marker} strokeWidth="0.6" opacity="0.7" />
                <circle cx={sx} cy={sy} r={38} fill="none" stroke={dial.marker} strokeWidth="0.3" opacity="0.3" />
                {/* Subdial ticks */}
                {Array.from({ length: 12 }, (_, j) => {
                  const ta = (j * 30) * (Math.PI / 180);
                  return (
                    <line
                      key={`st-${i}-${j}`}
                      x1={sx + Math.cos(ta) * 32}
                      y1={sy + Math.sin(ta) * 32}
                      x2={sx + Math.cos(ta) * 36}
                      y2={sy + Math.sin(ta) * 36}
                      stroke={dial.marker}
                      strokeWidth="0.4"
                      opacity="0.5"
                    />
                  );
                })}
                {/* Subdial hand */}
                <line
                  x1={sx}
                  y1={sy}
                  x2={sx + Math.cos(rad + Math.PI / 4) * 28}
                  y2={sy + Math.sin(rad + Math.PI / 4) * 28}
                  stroke="url(#handGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx={sx} cy={sy} r={2.5} fill={bezel.ring} />
              </g>
            );
          })}
        </>
      )}

      {/* ============ HOUR MARKERS ============ */}
      {hourMarkers.map((m, i) => {
        if (m.label) {
          return (
            <text
              key={`mk-${i}`}
              x={m.textX}
              y={m.textY}
              fill={dial.marker}
              fontSize="20"
              fontFamily="Cormorant Garamond, serif"
              fontWeight="500"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {m.label}
            </text>
          );
        }
        if (config.dial === 'minimal') {
          return (
            <circle key={`mk-${i}`} cx={m.x2 - (m.x2 - m.x1) * 0.15} cy={m.y2 - (m.y2 - m.y1) * 0.15} r={2.5} fill={dial.marker} opacity="0.7" />
          );
        }
        return (
          <line
            key={`mk-${i}`}
            x1={m.x1}
            y1={m.y1}
            x2={m.x2}
            y2={m.y2}
            stroke={dial.marker}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        );
      })}

      {/* Minute track */}
      {Array.from({ length: 60 }, (_, i) => {
        if (i % 5 === 0) return null;
        const angle = (i * 6 - 90) * (Math.PI / 180);
        return (
          <line
            key={`min-${i}`}
            x1={cx + Math.cos(angle) * 128}
            y1={cy + Math.sin(angle) * 128}
            x2={cx + Math.cos(angle) * 132}
            y2={cy + Math.sin(angle) * 132}
            stroke={dial.marker}
            strokeWidth="0.5"
            opacity="0.4"
          />
        );
      })}

      {/* Date window (classic & chronograph) */}
      {(config.dial === 'classic' || config.dial === 'chronograph') && (
        <>
          <rect x={cx + 92} y={cy - 14} width={26} height={28} rx="3" fill={dial.subdial} stroke={dial.marker} strokeWidth="0.8" opacity="0.6" />
          <text x={cx + 105} y={cy} fill={dial.marker} fontSize="12" fontFamily="Jost, sans-serif" textAnchor="middle" dominantBaseline="central" opacity="0.6">
            28
          </text>
        </>
      )}

      {/* Brand text */}
      <text x={cx} y={cy - 75} fill={dial.marker} fontSize="11" fontFamily="Cormorant Garamond, serif" fontWeight="600" letterSpacing="3" textAnchor="middle" opacity="0.8">
        LUXORA
      </text>
      <text x={cx} y={cy - 60} fill={dial.marker} fontSize="7" fontFamily="Jost, sans-serif" fontWeight="400" letterSpacing="4" textAnchor="middle" opacity="0.5">
        TIME
      </text>

      {/* Automatic text (bottom) */}
      <text x={cx} y={cy + 80} fill={dial.marker} fontSize="6" fontFamily="Jost, sans-serif" letterSpacing="2.5" textAnchor="middle" opacity="0.4">
        AUTOMATIC · SWISS MADE
      </text>

      {/* ============ HANDS ============ */}
      {/* Hour hand */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: 'rotate(42deg)' }}>
        <rect x={cx - 3} y={cy - 70} width="6" height="80" rx="2" fill="url(#handGrad)" />
        <rect x={cx - 1.5} y={cy - 70} width="3" height="80" rx="1" fill={bezel.ringLight} opacity="0.3" />
      </g>
      {/* Minute hand */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: 'rotate(165deg)' }}>
        <rect x={cx - 2.5} y={cy - 105} width="5" height="115" rx="2" fill="url(#handGrad)" />
        <rect x={cx - 1} y={cy - 105} width="2" height="115" rx="1" fill={bezel.ringLight} opacity="0.3" />
      </g>
      {/* Second hand */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: 'rotate(310deg)' }}>
        <line x1={cx} y1={cy + 30} x2={cx} y2={cy - 120} stroke={config.dial === 'minimal' ? '#e4be66' : '#e4be66'} strokeWidth="1.2" opacity="0.8" />
        <circle cx={cx} cy={cy - 110} r="3" fill="#e4be66" opacity="0.8" />
      </g>

      {/* Center cap */}
      <circle cx={cx} cy={cy} r="6" fill="url(#handGrad)" />
      <circle cx={cx} cy={cy} r="3" fill={bezel.ringLight} />

      {/* ============ CRYSTAL REFLECTION ============ */}
      <ellipse cx={cx - 40} cy={cy - 60} rx="55" ry="75" fill="url(#crystal)" transform={`rotate(-25 ${cx - 40} ${cy - 60})`} />
      <ellipse cx={cx + 60} cy={cy + 70} rx="25" ry="35" fill="url(#crystal)" opacity="0.3" />

      {/* ============ CROWN ============ */}
      <g>
        {/* Crown stem */}
        <rect x={cx + r - 2} y={cy - 8} width="14" height="16" rx="2" fill="url(#caseGrad)" />
        {/* Crown head */}
        <circle cx={cx + r + 18} cy={cy} r="13" fill="url(#bezelGrad)" />
        <circle cx={cx + r + 18} cy={cy} r="13" fill="none" stroke={bezel.ringDark} strokeWidth="0.8" opacity="0.5" />
        {/* Crown knurling */}
        {Array.from({ length: 20 }, (_, i) => {
          const angle = (i * 18) * (Math.PI / 180);
          return (
            <line
              key={`cw-${i}`}
              x1={cx + r + 18 + Math.cos(angle) * 11}
              y1={cy + Math.sin(angle) * 11}
              x2={cx + r + 18 + Math.cos(angle) * 14}
              y2={cy + Math.sin(angle) * 14}
              stroke={bezel.ringDark}
              strokeWidth="0.6"
              opacity="0.4"
            />
          );
        })}
        {/* Crown logo dot */}
        <circle cx={cx + r + 18} cy={cy} r="3" fill={bezel.ringLight} opacity="0.6" />
      </g>
    </svg>
  );
}

export const ConfigurableWatch = memo(ConfigurableWatchBase);
