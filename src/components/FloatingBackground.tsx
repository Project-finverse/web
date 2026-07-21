import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    ref.current.querySelectorAll('.bg-orb').forEach((orb, i) => {
      gsap.to(orb, {
        x: `random(-60, 60)`,
        y: `random(-40, 40)`,
        scale: `random(0.85, 1.15)`,
        duration: `random(18, 30)`,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 1.5,
      });
    });
  }, []);

  return (
    <div ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
      {/* Scrim — matches original HTML void-scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(120% 60% at 50% -10%, rgba(61,92,255,0.10), transparent 60%),
          radial-gradient(80% 50% at 90% 10%, rgba(245,185,66,0.06), transparent 60%)
        `,
      }} />

      {/* Floating gradient orbs */}
      <div className="bg-orb" style={{
        position: 'absolute', top: '-15%', left: '-5%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(61,92,255,0.10) 0%, transparent 60%)',
        filter: 'blur(60px)',
      }} />
      <div className="bg-orb" style={{
        position: 'absolute', top: '40%', right: '-8%', width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(245,185,66,0.06) 0%, transparent 55%)',
        filter: 'blur(80px)',
      }} />
      <div className="bg-orb" style={{
        position: 'absolute', bottom: '-5%', left: '15%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 55%)',
        filter: 'blur(70px)',
      }} />

      {/* Film grain noise */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
}
