import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const outerItems = [
  { label: '₹', angle: 0 },
  { label: '📊', angle: 60 },
  { label: '🏦', angle: 120 },
  { label: '🛡️', angle: 180 },
  { label: '📈', angle: 240 },
  { label: '💳', angle: 300 },
];

const innerItems = [
  { label: '🎯', angle: 45 },
  { label: '🤖', angle: 135 },
  { label: '📋', angle: 225 },
  { label: '💰', angle: 315 },
];

export default function OrbitalHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const core = containerRef.current.querySelector('.core-glow');
    if (core && !reduced) {
      gsap.to(core, { scale: 1.15, opacity: 0.6, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }

    if (!reduced) {
      const rings = containerRef.current.querySelectorAll('.orbit-ring');
      rings.forEach((ring, i) => {
        gsap.to(ring, { rotation: i === 0 ? 360 : -360, duration: 50 + i * 20, repeat: -1, ease: 'none' });
      });
      containerRef.current.querySelectorAll('.orbit-node-outer').forEach(n => {
        gsap.to(n, { rotation: -360, duration: 50, repeat: -1, ease: 'none' });
      });
      containerRef.current.querySelectorAll('.orbit-node-inner').forEach(n => {
        gsap.to(n, { rotation: 360, duration: 70, repeat: -1, ease: 'none' });
      });
    }
  }, []);

  const nodeStyle = (size: number, fontSize: number): React.CSSProperties => ({
    width: size, height: size,
    borderRadius: size * 0.28,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
    position: 'absolute' as const,
    left: '50%', top: '50%',
  });

  return (
    <div ref={containerRef} style={{ position: 'relative', width: 340, height: 340, margin: '0 auto' }} aria-hidden="true">
      {/* Ambient glow — warm indigo */}
      <div style={{ position: 'absolute', inset: -120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(61,92,255,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Core breathing glow — gold tint */}
      <div className="core-glow" style={{ position: 'absolute', inset: 50, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,185,66,0.10) 0%, transparent 55%)', pointerEvents: 'none' }} />

      {/* Outer ring */}
      <div className="orbit-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}>
        <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
        {outerItems.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const r = 152;
          return (
            <div key={i} className="orbit-node-outer" style={{
              ...nodeStyle(36, item.label === '₹' ? 16 : 15),
              marginLeft: Math.cos(rad) * r - 18,
              marginTop: Math.sin(rad) * r - 18,
            }}>
              {item.label}
            </div>
          );
        })}
      </div>

      {/* Inner ring */}
      <div className="orbit-ring" style={{ position: 'absolute', inset: 65, borderRadius: '50%' }}>
        <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.04)' }} />
        {innerItems.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const r = 88;
          return (
            <div key={i + 10} className="orbit-node-inner" style={{
              ...nodeStyle(28, 13),
              marginLeft: Math.cos(rad) * r - 14,
              marginTop: Math.sin(rad) * r - 14,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              {item.label}
            </div>
          );
        })}
      </div>

      {/* Core — gold gradient, FinVerse signature */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 68, height: 68,
        borderRadius: 20,
        background: 'linear-gradient(145deg, rgba(245,185,66,0.22), rgba(61,92,255,0.12))',
        border: '1px solid rgba(245,185,66,0.30)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 50px rgba(245,185,66,0.18), 0 0 100px rgba(61,92,255,0.08), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.2)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}>
        <span style={{
          fontSize: 30, fontWeight: 700,
          fontFamily: 'var(--font-display)',
          color: '#FFD37A',
          letterSpacing: '-0.04em',
          textShadow: '0 0 24px rgba(245,185,66,0.5)',
        }}>₹</span>
      </div>

      {/* Pulse rings — gold tinted */}
      {[0, 1, 2].map(i => (
        <div key={`p-${i}`} style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 68, height: 68,
          borderRadius: '50%',
          border: '1px solid rgba(245,185,66,0.08)',
          animation: `pulse-ring ${3 + i * 0.6}s ease-out infinite`,
          animationDelay: `${i * 1}s`,
          pointerEvents: 'none',
        }} />
      ))}
    </div>
  );
}
