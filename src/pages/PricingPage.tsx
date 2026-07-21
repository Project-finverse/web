import { useEffect, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import gsap from 'gsap';

const T = { void: '#07111F', panel: '#0F1C3B', indigo: '#3D5CFF', indigo2: '#7C8CFF', gold: '#F5B942', gold2: '#FFD37A', mint: '#34D399', ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)', line: 'rgba(255,255,255,0.09)' };

const plans = [
  { name: 'Free', price: '₹0', period: 'forever', desc: 'Perfect for getting started with financial literacy basics.', features: ['5 Core Modules', 'Interactive Quizzes', 'Basic Calculators', 'Progress Tracking', 'Completion Certificates', 'Community Access'], cta: 'Start Free', action: 'modules', highlighted: false, badge: null },
  { name: 'Basic', price: '₹399', period: '/year', desc: 'Enhanced learning with additional features and analytics.', features: ['Everything in Free, plus:', 'Advanced Module Access', 'Detailed Analytics', 'Priority Quiz Support', 'Monthly Webinars', 'Exclusive Study Materials'], cta: 'Get Basic', action: 'modules', highlighted: false, badge: null },
  { name: 'Advanced', price: '₹899', period: '/year', desc: 'Premium AI-powered features for serious financial learners.', features: ['AI Mentor', 'Portfolio Builder', 'Live Trading Simulator', 'Financial Planning', 'Premium Certificate'], cta: 'Launching Soon', action: null, highlighted: true, badge: 'PREMIUM' },
  { name: 'School License', price: 'Custom', period: '', desc: 'For schools and institutions wanting campus-wide access.', features: ['Everything in Advanced', 'Teacher Dashboard', 'Classroom Analytics', 'Custom Curriculum', 'Bulk Progress Reports', 'Dedicated Support'], cta: 'Contact Sales', action: 'contact', highlighted: false, badge: null },
];

const faqs = [
  { q: 'Can I really learn for free?', a: 'Yes! Our 5 core modules covering Financial Basics, Banking, Investing, Taxation, and Cyber Safety are completely free. No credit card required.' },
  { q: "What's included in Advanced?", a: 'Advanced unlocks AI mentor, portfolio builder, live trading simulator, financial planning tools, and premium certificates for serious learners.' },
  { q: 'Is there a student discount?', a: "Our pricing is already student-friendly. For families facing financial hardship, contact us for scholarship options." },
  { q: 'How does the School License work?', a: 'Schools get unlimited access for all students, teacher tools, analytics, and curriculum integration. Pricing varies by size.' },
  { q: 'Can I cancel anytime?', a: "Yes. Cancel anytime and retain access until the end of your billing period." },
];

export default function PricingPage() {
  const { navigate } = useNavigation();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(cardsRef.current.children, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)', delay: 0.3 });
  }, []);

  return (
    <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gold2, background: 'rgba(245,185,66,0.09)', border: '1px solid rgba(245,185,66,0.22)', padding: '6px 14px', borderRadius: 100, marginBottom: 20 }}>💎 Pricing</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', marginBottom: 16 }}>
            Simple, <span style={{ background: `linear-gradient(135deg,#fff 20%,${T.gold2} 80%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Student-Friendly</span> Pricing
          </h1>
          <p style={{ fontSize: 17, color: T.ink70 }}>Start free, upgrade when you're ready. Financial education shouldn't be a luxury.</p>
        </div>

        {/* Plans */}
        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 80 }}>
          {plans.map((p, idx) => {
            const isAdv = p.highlighted;
            return (
              <div key={idx} style={{
                background: isAdv ? `linear-gradient(165deg, rgba(245,185,66,0.08), rgba(124,140,255,0.04))` : T.panel,
                border: `1px solid ${isAdv ? 'rgba(245,185,66,0.30)' : T.line}`,
                borderRadius: 24, padding: '32px 28px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
                boxShadow: isAdv ? '0 0 60px rgba(245,185,66,0.10), 0 20px 60px rgba(0,0,0,0.4)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.19,1,0.22,1)',
              }}
                onMouseEnter={e => { if (!isAdv) { e.currentTarget.style.borderColor = 'rgba(245,185,66,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; } }}
                onMouseLeave={e => { if (!isAdv) { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.transform = 'none'; } }}
              >
                {/* Badge */}
                {p.badge && (
                  <span style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, padding: '6px 20px', borderRadius: '0 0 12px 12px', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', boxShadow: '0 4px 15px rgba(245,185,66,0.4)' }}>{p.badge}</span>
                )}

                {/* Ambient glow for highlighted */}
                {isAdv && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '160%', height: '160%', background: 'radial-gradient(circle, rgba(245,185,66,0.06) 0%, transparent 50%)', pointerEvents: 'none' }} />}

                <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                  <h3 style={{ fontSize: 22, marginBottom: 8, color: isAdv ? T.gold2 : T.ink100, marginTop: p.badge ? 12 : 0 }}>{p.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                    <span style={{ fontSize: 40, fontWeight: 700, color: T.ink100, fontFamily: 'var(--font-display)', textShadow: isAdv ? '0 0 30px rgba(245,185,66,0.5)' : 'none' }}>{p.price}</span>
                    <span style={{ fontSize: 14, color: T.ink45 }}>{p.period}</span>
                  </div>
                  <p style={{ fontSize: 14, color: T.ink70, lineHeight: 1.5, marginBottom: 28 }}>{p.desc}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                    {p.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: T.ink70 }}>
                        <span style={{ color: isAdv ? T.gold2 : T.mint, flexShrink: 0, textShadow: isAdv ? '0 0 10px rgba(245,185,66,0.5)' : 'none' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <button onClick={() => p.action && navigate(p.action as any)} disabled={!p.action}
                  style={{
                    width: '100%', padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 600,
                    background: isAdv ? `linear-gradient(135deg,${T.gold2},${T.gold})` : 'rgba(255,255,255,0.06)',
                    color: isAdv ? T.void : T.ink100,
                    border: isAdv ? 'none' : `1px solid ${T.line}`,
                    cursor: p.action ? 'pointer' : 'default',
                    position: 'relative', zIndex: 1,
                    opacity: p.action ? 1 : 0.7,
                    boxShadow: isAdv ? '0 8px 30px rgba(245,185,66,0.3)' : 'none',
                    transition: 'transform .3s, box-shadow .3s',
                  }}
                  onMouseEnter={e => { if (p.action) { e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                >{p.cta}</button>
              </div>
            );
          })}
        </div>

        {/* Tip */}
        <div style={{ background: 'rgba(124,140,255,0.08)', border: '1px solid rgba(124,140,255,0.2)', borderRadius: 20, padding: 28, marginBottom: 64, textAlign: 'center', backdropFilter: 'blur(10px)' }}>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
            💡 <strong>Pro Tip:</strong> Start with Free to see if FinVerse works for you. Most students find the free modules more than enough to build solid financial foundations.
          </p>
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, marginBottom: 32, textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 16, padding: 24 }}>
                <h4 style={{ fontSize: 16, marginBottom: 12 }}>{f.q}</h4>
                <p style={{ fontSize: 14, color: T.ink70, lineHeight: 1.6, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <p style={{ fontSize: 15, color: T.ink45 }}>Questions? <button onClick={() => navigate('contact')} style={{ color: T.gold2, cursor: 'pointer', fontSize: 'inherit' }}>Get in touch →</button></p>
        </div>
      </div>
    </section>
  );
}
