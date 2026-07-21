import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigation } from '../context/NavigationContext';
import { labs } from '../data/labRegistry';

const T = { void: '#07111F', panel: '#0F1C3B', gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', indigo: '#3D5CFF', indigo2: '#7C8CFF', ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)', line: 'rgba(255,255,255,0.09)' };

const plans = [
  {
    id: 'basic' as const, title: 'Basic', price: 'Free', badge: '🟢', color: T.green,
    desc: 'Build your financial foundation with core concepts and beginner labs.',
    features: ['Core concept lessons', 'Beginner Financial Labs', 'Foundation quizzes', 'Basic activities', 'Progress tracking'],
    outcomes: ['Understand money fundamentals', 'Create simple budgets', 'Know banking basics'],
  },
  {
    id: 'intermediate' as const, title: 'Intermediate', price: '₹399/yr', badge: '🔵', color: T.indigo2,
    desc: 'Apply knowledge through guided workflows, case studies and real-world simulations.',
    features: ['Everything in Basic', 'Guided financial workflows', 'Case study analysis', 'Intermediate Financial Labs', 'Real document walkthroughs', 'Bank comparison tools'],
    outcomes: ['Compare financial products', 'Analyze GST invoices', 'Plan investments with SIP'],
  },
  {
    id: 'advanced' as const, title: 'Advanced', price: '₹899/yr', badge: '🟡', color: T.gold2,
    desc: 'Master complete financial workflows — tax filing, loan analysis, portfolio building and business planning.',
    features: ['Everything in Intermediate', 'Complete tax filing experience', 'Loan Decision Studio', 'Investment portfolio builder', 'Insurance comparison center', 'Business planning workspace', 'Capstone projects', 'Premium certificates'],
    outcomes: ['File mock income tax returns', 'Compare home/education loans across banks', 'Build investment portfolios', 'Create business plans'],
    highlighted: true,
  },
];

export default function LabsPlanSelect() {
  const { state, selectPlan, navigate } = useNavigation();
  const classNum = state.classNum || 9;
  const gridRef = useRef<HTMLDivElement>(null);

  const classLabs = labs.filter(l => l.classLevel.includes(classNum));
  const basicCount = classLabs.filter(l => l.tier === 'basic').length;
  const intCount = classLabs.filter(l => l.tier === 'intermediate').length;
  const advCount = classLabs.filter(l => l.tier === 'advanced').length;
  const labCounts = [basicCount, basicCount + intCount, basicCount + intCount + advCount];

  useEffect(() => {
    if (!gridRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)', delay: 0.3 }
    );
  }, []);

  return (
    <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <button onClick={() => navigate('labs')} style={{ fontSize: 13, color: T.ink45, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)' }}>
          ← Back to Class Selection
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gold2, background: 'rgba(245,185,66,0.09)', border: '1px solid rgba(245,185,66,0.22)', padding: '6px 14px', borderRadius: 100, marginBottom: 20 }}>📚 Class {classNum}</div>
          <h1 style={{ fontSize: 'clamp(30px,4.5vw,44px)', marginBottom: 16 }}>Choose Your Learning Plan</h1>
          <p style={{ fontSize: 16, color: T.ink70, lineHeight: 1.7 }}>
            Each plan unlocks progressively deeper financial experiences. Start with Basic and advance when you're ready.
          </p>
        </div>

        {/* Plan Cards */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {plans.map((p, idx) => (
            <div key={p.id}
              className="glass-card"
              onClick={() => selectPlan(p.id)}
              style={{
                cursor: 'pointer', width: '100%', textAlign: 'left', padding: 0,
                borderRadius: 24, position: 'relative', overflow: 'hidden',
                border: p.highlighted ? `1px solid rgba(245,185,66,0.3)` : undefined,
                boxShadow: p.highlighted ? '0 0 60px rgba(245,185,66,0.08)' : undefined,
              }}
            >
              {/* Top accent */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${p.color}, ${p.color}80)` }} />

              {/* Highlighted glow */}
              {p.highlighted && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(245,185,66,0.04), transparent 50%)', pointerEvents: 'none' }} />
              )}

              <div style={{ padding: '32px 28px' }}>
                {/* Badge + Title */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 24, marginBottom: 12 }}>{p.badge}</div>
                    <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{p.title}</h3>
                  </div>
                  {p.highlighted && (
                    <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: T.gold, background: 'rgba(245,185,66,0.12)', border: '1px solid rgba(245,185,66,0.25)', padding: '4px 10px', borderRadius: 100, fontWeight: 700 }}>RECOMMENDED</span>
                  )}
                </div>

                {/* Price */}
                <div style={{ fontSize: 32, fontWeight: 700, color: p.color, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{p.price}</div>
                <p style={{ fontSize: 14, color: T.ink70, marginBottom: 24, lineHeight: 1.6 }}>{p.desc}</p>

                {/* Lab count */}
                <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.line}`, marginBottom: 20, textAlign: 'center' }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: T.ink100, fontFamily: 'var(--font-display)' }}>{labCounts[idx]}</span>
                  <span style={{ fontSize: 12, color: T.ink45, marginLeft: 8, fontFamily: 'var(--font-mono)' }}>Financial Labs</span>
                </div>

                {/* Features */}
                <ul style={{ marginBottom: 24 }}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: T.ink70, marginBottom: 12, lineHeight: 1.5 }}>
                      <span style={{ color: p.color, flexShrink: 0, marginTop: 2 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>

                {/* Outcomes */}
                <div style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.015)', border: `1px solid ${T.line}`, marginBottom: 24 }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: T.ink45, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>LEARNING OUTCOMES</div>
                  {p.outcomes.map((o, i) => (
                    <div key={i} style={{ fontSize: 13, color: T.ink70, marginBottom: 6, lineHeight: 1.5 }}>→ {o}</div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{
                  width: '100%', padding: 14, borderRadius: 14, textAlign: 'center',
                  background: p.highlighted ? `linear-gradient(135deg, ${T.gold2}, ${T.gold})` : 'rgba(255,255,255,0.04)',
                  color: p.highlighted ? T.void : T.ink100,
                  fontWeight: 600, fontSize: 15,
                  border: p.highlighted ? 'none' : `1px solid ${T.line}`,
                }}>
                  {p.id === 'basic' ? 'Start Free' : `Select ${p.title}`} →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
