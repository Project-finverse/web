import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigation } from '../context/NavigationContext';
import { useProgress } from '../context/ProgressContext';
import { labs } from '../data/labRegistry';

const T = { void: '#07111F', panel: '#0F1C3B', gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', indigo: '#3D5CFF', indigo2: '#7C8CFF', ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)', line: 'rgba(255,255,255,0.09)' };

const classData = [
  { num: 9, icon: '📘', title: 'Class 9', desc: 'Foundation of Financial Literacy', topics: 'Budgeting, Savings, Banking Basics, Digital Payments, Cyber Safety', hours: 12, status: 'available' as const },
  { num: 10, icon: '📗', title: 'Class 10', desc: 'Applied Financial Awareness', topics: 'GST, Inflation, Insurance, FD/RD, Financial Planning', hours: 16, status: 'available' as const },
  { num: 11, icon: '📙', title: 'Class 11', desc: 'Investment & Business Finance', topics: 'SIP, Mutual Funds, Entrepreneurship, Cash Flow, Portfolio', hours: 20, status: 'available' as const },
  { num: 12, icon: '📕', title: 'Class 12', desc: 'Complete Financial Mastery', topics: 'Income Tax, Loans, Credit, Stock Market, Retirement, Insurance', hours: 28, status: 'available' as const },
];

export default function LabsClassSelect() {
  const { selectClass } = useNavigation();
  const { progress } = useProgress();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gold2, background: 'rgba(245,185,66,0.09)', border: '1px solid rgba(245,185,66,0.22)', padding: '6px 14px', borderRadius: 100, marginBottom: 20 }}>🏛️ Financial Experience Center</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', marginBottom: 16 }}>Choose Your Class</h1>
          <p style={{ fontSize: 17, color: T.ink70, lineHeight: 1.7 }}>
            Select your class to access structured financial education with interactive labs, real-world workflows, and practical assessments.
          </p>
        </div>

        {/* Class Cards */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {classData.map(c => {
            const classLabs = labs.filter(l => l.classLevel.includes(c.num));
            const completedLabs = classLabs.filter(l => progress.completedModules.includes(l.id)).length;
            const pct = classLabs.length > 0 ? Math.round((completedLabs / classLabs.length) * 100) : 0;

            return (
              <button key={c.num} onClick={() => selectClass(c.num)} className="glass-card"
                style={{ textAlign: 'left', width: '100%', padding: 0, borderRadius: 24, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                
                {/* Top gradient band */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${T.gold}, ${T.gold2}, ${T.green})` }} />
                
                <div style={{ padding: '32px 28px 28px' }}>
                  {/* Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div style={{ fontSize: 44 }}>{c.icon}</div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: 'rgba(52,211,153,0.12)', color: T.green, border: '1px solid rgba(52,211,153,0.3)' }}>
                      {c.status === 'available' ? 'AVAILABLE' : 'COMING SOON'}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{ fontSize: 28, marginBottom: 8, fontWeight: 700, position: 'relative', zIndex: 1 }}>{c.title}</h2>
                  <p style={{ fontSize: 15, color: T.ink70, marginBottom: 20, lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{c.desc}</p>

                  {/* Stats row */}
                  <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                    {[
                      { v: classLabs.length, l: 'Labs' },
                      { v: `${c.hours}h`, l: 'Hours' },
                      { v: 3, l: 'Plans' },
                    ].map((s, i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: T.ink100, fontFamily: 'var(--font-display)' }}>{s.v}</div>
                        <div style={{ fontSize: 10, color: T.ink45, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress */}
                  {pct > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.ink45, fontFamily: 'var(--font-mono)', marginBottom: 6, letterSpacing: '0.06em' }}>
                        <span>PROGRESS</span><span>{pct}%</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${T.gold}, ${T.gold2})`, borderRadius: 2 }} />
                      </div>
                    </div>
                  )}

                  {/* Topics */}
                  <div style={{ fontSize: 12, color: T.ink45, lineHeight: 1.6, fontFamily: 'var(--font-mono)', position: 'relative', zIndex: 1 }}>
                    {c.topics}
                  </div>

                  {/* CTA */}
                  <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8, color: T.gold2, fontWeight: 700, fontSize: 15, position: 'relative', zIndex: 1 }}>
                    Explore {c.title} →
                  </div>
                </div>

                {/* Large faded number */}
                <div style={{ position: 'absolute', right: 16, bottom: 16, fontSize: 120, fontWeight: 800, opacity: 0.03, fontFamily: 'var(--font-display)', lineHeight: 1, pointerEvents: 'none' }}>{c.num}</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
