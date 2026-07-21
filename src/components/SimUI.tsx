import { useState, type ReactNode } from 'react';

/* ═══ SHARED DESIGN TOKENS ═══ */
export const ST = {
  gold: '#F5B942', gold2: '#FFD37A', blue: '#3D5CFF', cyan: '#7C8CFF',
  green: '#34D399', coral: '#FF6B6B',
  text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)',
  text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)',
  panel: '#0F1C3B',
};

const mono = { fontFamily: 'var(--font-mono)' };

/* ═══ VALIDATED NUMBER INPUT ═══ */
interface NumInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  error?: string;
}

export function NumInput({ label, value, onChange, min = 0, max, step = 1, suffix, error }: NumInputProps) {
  const [focused, setFocused] = useState(false);
  const [localErr, setLocalErr] = useState('');

  const handleChange = (raw: string) => {
    const n = parseFloat(raw);
    if (raw === '' || raw === '-') { onChange(0); setLocalErr(''); return; }
    if (isNaN(n)) { setLocalErr('Enter a valid number'); return; }
    if (min !== undefined && n < min) { setLocalErr(`Minimum is ${min}`); onChange(n); return; }
    if (max !== undefined && n > max) { setLocalErr(`Maximum is ${max}`); onChange(n); return; }
    setLocalErr('');
    onChange(n);
  };

  const err = error || localErr;

  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, color: ST.text3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', ...mono }}>
        {label}{suffix && <span style={{ opacity: 0.6 }}> ({suffix})</span>}
      </label>
      <input
        type="number"
        value={value || ''}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        min={min}
        max={max}
        step={step}
        style={{
          width: '100%',
          background: err ? 'rgba(255,107,107,0.04)' : focused ? 'rgba(245,185,66,0.04)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${err ? 'rgba(255,107,107,0.4)' : focused ? 'rgba(245,185,66,0.4)' : ST.border}`,
          borderRadius: 12, padding: '14px 16px',
          color: ST.text, fontSize: 15, ...mono,
          outline: 'none',
          transition: 'border-color .25s, background .25s',
        }}
      />
      {err && <div style={{ fontSize: 11, color: ST.coral, marginTop: 6, ...mono }}>{err}</div>}
    </div>
  );
}

/* ═══ SIMULATOR PANEL ═══ */
export function SimPanel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: `1px solid ${ST.border}`,
      borderRadius: 20,
      padding: '32px clamp(20px, 4vw, 36px)',
      marginBottom: 24,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Inner top-edge highlight */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  );
}

/* ═══ FORM GRID ═══ */
export function SimGrid({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 16, marginBottom: 8,
    }}>
      {children}
    </div>
  );
}

/* ═══ RESULTS ROW ═══ */
export function SimResults({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: 20, margin: '28px 0', paddingTop: 28,
      borderTop: `1px solid ${ST.border}`,
    }}>
      {children}
    </div>
  );
}

/* ═══ RESULT VALUE ═══ */
export function ResultVal({ label, value, color = 'gold' }: { label: string; value: string; color?: 'gold' | 'green' | 'coral' | 'blue' }) {
  const colors = { gold: ST.gold2, green: ST.green, coral: ST.coral, blue: ST.cyan };
  return (
    <div>
      <div style={{ fontSize: 11, color: ST.text3, ...mono, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px, 3vw, 30px)',
        color: colors[color],
        fontWeight: 600,
        letterSpacing: '-0.03em',
        transition: 'color .3s',
      }}>{value}</div>
    </div>
  );
}

/* ═══ PROGRESS BAR ═══ */
export function SimBar({ label, valueTxt, pct, color = 'gold' }: { label: string; valueTxt: string; pct: number; color?: 'gold' | 'coral' | 'blue' }) {
  const bg = color === 'gold' ? `linear-gradient(90deg,${ST.gold},${ST.gold2})` : color === 'coral' ? 'linear-gradient(90deg,#D94F4F,#FF6B6B)' : `linear-gradient(90deg,${ST.blue},${ST.cyan})`;
  const glow = color === 'coral' ? 'rgba(255,107,107,0.3)' : color === 'gold' ? 'rgba(245,185,66,0.3)' : 'rgba(61,92,255,0.3)';
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: ST.text3, ...mono, letterSpacing: '0.06em' }}>
        <span>{label}</span><span>{valueTxt}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginTop: 10 }}>
        <div style={{
          height: '100%', borderRadius: 3,
          width: `${Math.max(0, Math.min(100, pct))}%`,
          background: bg,
          boxShadow: `0 0 12px ${glow}`,
          transition: 'width .6s cubic-bezier(.19,.8,.2,1)',
        }} />
      </div>
    </div>
  );
}

/* ═══ AI INSIGHT BOX ═══ */
export function AiInsight({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontSize: 13.5, color: ST.text2, lineHeight: 1.65,
      background: 'rgba(245,185,66,0.06)',
      border: '1px solid rgba(245,185,66,0.18)',
      borderRadius: 14, padding: '18px 20px', marginTop: 16,
    }}>
      <div style={{
        fontSize: 10, ...mono, color: ST.gold,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        🤖 AI RECOMMENDATION
      </div>
      {children}
    </div>
  );
}

/* ═══ INFO INSIGHT (non-AI) ═══ */
export function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontSize: 13.5, color: ST.text2, lineHeight: 1.65,
      background: `rgba(61,92,255,0.06)`,
      border: `1px solid rgba(61,92,255,0.15)`,
      borderRadius: 12, padding: '14px 18px',
    }}>
      {children}
    </div>
  );
}

/* ═══ SIMULATOR HEADER ═══ */
export function SimHeader({ icon, tag, title, desc }: { icon: string; tag: string; title: string; desc: string }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 16,
          background: 'rgba(245,185,66,0.10)',
          border: '1px solid rgba(245,185,66,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24,
        }}>{icon}</div>
        <span style={{ ...mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: ST.text3 }}>{tag}</span>
      </div>
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.02em' }}>{title}</h2>
      <p style={{ fontSize: 15, color: ST.text2, maxWidth: 540, marginBottom: 32, lineHeight: 1.7 }}>{desc}</p>
    </>
  );
}

/* ═══ SOURCE CITATION ═══ */
export function Source({ text }: { text: string }) {
  return (
    <div style={{ fontSize: 11, color: ST.text3, marginTop: 14, ...mono, letterSpacing: '0.02em' }}>
      📋 {text}
    </div>
  );
}

/* ═══ SPARKLINE CHART ═══ */
export function Sparkline({ values, id, color = 'gold' }: { values: number[]; id: string; color?: 'gold' | 'blue' }) {
  if (!values.length) return null;
  const w = 300, h = 90, pad = 10;
  const max = Math.max(...values, 1), min = Math.min(...values, 0);
  const range = (max - min) || 1;
  const step = (w - pad * 2) / ((values.length - 1) || 1);
  const pts = values.map((v, i) => `${pad + i * step},${h - pad - ((v - min) / range) * (h - pad * 2)}`).join(' ');
  const fillPts = `${pad},${h - pad} ${pts} ${w - pad},${h - pad}`;
  const c1 = color === 'gold' ? ST.gold : ST.blue;
  const c2 = color === 'gold' ? ST.gold2 : ST.cyan;
  return (
    <div style={{ marginTop: 12 }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 90 }}>
        <defs>
          <linearGradient id={`sp-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <polygon points={fillPts} fill={`url(#sp-${id})`} opacity="0.10" />
        <polyline points={pts} fill="none" stroke={`url(#sp-${id})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ═══ TOOLTIP ═══ */
export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span style={{
          position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)',
          background: ST.panel, border: `1px solid ${ST.border}`, borderRadius: 10,
          padding: '8px 14px', fontSize: 12, color: ST.text2, whiteSpace: 'nowrap',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)', zIndex: 100,
          pointerEvents: 'none',
        }}>{text}</span>
      )}
    </span>
  );
}
