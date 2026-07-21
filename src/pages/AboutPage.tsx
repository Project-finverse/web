import { useEffect, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import gsap from 'gsap';

const T = { void: '#07111F', panel: '#0F1C3B', indigo: '#3D5CFF', indigo2: '#7C8CFF', gold: '#F5B942', gold2: '#FFD37A', mint: '#34D399', ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)', line: 'rgba(255,255,255,0.09)' };

export default function AboutPage() {
  const { navigate } = useNavigation();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(headerRef.current.children, { opacity: 0, y: 30, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.12, ease: 'power3.out' });
  }, []);

  return (
    <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gold2, background: 'rgba(245,185,66,0.09)', border: '1px solid rgba(245,185,66,0.22)', padding: '6px 14px', borderRadius: 100, marginBottom: 20 }}>📖 About FinVerse</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', marginBottom: 20 }}>
            Making Financial Literacy{' '}
            <span style={{ background: `linear-gradient(135deg,#fff 20%,${T.gold2} 80%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Accessible</span>
          </h1>
          <p style={{ fontSize: 18, color: T.ink70, lineHeight: 1.7 }}>
            FinVerse was born from a simple observation: Indian students graduate without understanding money. We're changing that through interactive, gamified learning designed specifically for teenagers.
          </p>
        </div>

        {/* ═══ MEET THE FOUNDERS — NEW SECTION ═══ */}
        <div style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 32, marginBottom: 12, textAlign: 'center' }}>Meet the Founders</h2>
          <p style={{ fontSize: 16, color: T.ink45, textAlign: 'center', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>The duo behind FinVerse — building India's financial literacy platform from the ground up.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {[
              { name: 'Saksham', role: 'Co-Founder & CEO', avatar: 'SG', desc: 'Leads product vision, technology, design and platform development.', gradient: `linear-gradient(135deg,${T.indigo},${T.indigo2})`, glow: 'rgba(124,140,255,0.12)' },
              { name: 'Archit', role: 'Co-Founder & CFO', avatar: 'AJ', desc: 'Leads finance strategy, operations and business growth.', gradient: `linear-gradient(135deg,${T.gold},${T.gold2})`, glow: 'rgba(245,185,66,0.10)' },
            ].map((f, i) => (
              <div key={i} className="glass-card" style={{ borderRadius: 24, padding: 36, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle, ${f.glow}, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ display: 'flex', gap: 20, alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 20, flexShrink: 0, background: f.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: i === 1 ? T.void : '#fff', fontFamily: 'var(--font-display)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>{f.avatar}</div>
                  <div>
                    <h3 style={{ fontSize: 24, marginBottom: 4, fontWeight: 700 }}>{f.name}</h3>
                    <p style={{ fontSize: 13, color: i === 0 ? T.indigo2 : T.gold2, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 10 }}>{f.role}</p>
                    <p style={{ fontSize: 15, color: T.ink70, lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ OUR STORY ═══ */}
        <div style={{ background: `linear-gradient(135deg, rgba(61,92,255,0.1), rgba(245,185,66,0.05))`, border: '1px solid rgba(124,140,255,0.2)', borderRadius: 24, padding: '48px 40px', marginBottom: 64, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>Our Story</h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
            Two students noticed a gap — schools teach calculus but not compound interest, literature but not loan literacy. FinVerse is our answer: a platform that makes financial education as engaging as a game, as practical as real life, and accessible to every Indian teenager.
          </p>
        </div>

        {/* Mission */}
        <div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 24, padding: '48px 40px', marginBottom: 64, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>Our Mission</h2>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            To ensure every Indian student enters adulthood with the financial knowledge and confidence to make smart money decisions.
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, marginBottom: 32, textAlign: 'center' }}>What We Believe</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { icon: '🎯', title: 'Practical First', desc: 'Every concept taught with real Indian examples and actionable knowledge.' },
              { icon: '🎮', title: 'Learn by Doing', desc: 'Interactive financial labs and quizzes make learning engaging, not boring.' },
              { icon: '🌱', title: 'Start Early', desc: 'Financial literacy should begin before adulthood, not after mistakes.' },
              { icon: '🤝', title: 'Accessible to All', desc: 'Core modules are free. Premium is affordable. No student left behind.' },
            ].map((v, i) => (
              <div key={i} style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 20, padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontSize: 18, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: T.ink70, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ TIMELINE — Fixed years: 2025, 2025, 2026, 2028 ═══ */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, marginBottom: 32, textAlign: 'center' }}>Our Journey</h2>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {[
              { year: '2025', event: 'FinVerse idea conceived — two students spot the financial literacy gap in Indian schools' },
              { year: '2025', event: 'Platform development begins with first module prototypes and simulator MVPs' },
              { year: '2026', event: '🎯 Selected for CBSE SkillExpo 2026 — platform presented at national level' },
              { year: '2028', event: '🚀 Vision: Reach 50,000+ students across 200+ schools nationwide' },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                <div style={{ width: 60, flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 14, color: T.gold2, paddingTop: 4, fontWeight: 600 }}>{m.year}</div>
                <div style={{ flex: 1, padding: '16px 20px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.line}`, borderRadius: 12, fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{m.event}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ VISION STATS — Clearly labeled as future goals ═══ */}
        <div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 24, padding: 40, marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, marginBottom: 8, textAlign: 'center' }}>What We're Building Toward</h2>
          <p style={{ fontSize: 14, color: T.ink45, textAlign: 'center', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>These numbers represent our roadmap targets — the future we're working toward, not current achievements.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 24, textAlign: 'center' }}>
            {[
              { val: '50K+', lbl: 'Students (Target)', sub: 'Goal', color: T.gold2 },
              { val: '200+', lbl: 'Schools (Vision)', sub: 'Roadmap', color: T.mint },
              { val: '15+', lbl: 'Modules (Planned)', sub: 'Target', color: T.indigo2 },
              { val: '4 Classes', lbl: 'Curriculum (Vision)', sub: 'Roadmap', color: '#FF6B6B' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: T.ink45, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{s.sub}</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: s.color, fontFamily: 'var(--font-display)' }}>{s.val}</div>
                <div style={{ fontSize: 13, color: T.ink45, marginTop: 4 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>Ready to Start Learning?</h2>
          <p style={{ fontSize: 16, color: T.ink70, marginBottom: 32 }}>Join students building financial confidence across India.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('learn')} style={{ padding: '16px 32px', borderRadius: 100, fontWeight: 600, fontSize: 15, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer', boxShadow: '0 8px 30px rgba(245,185,66,0.22)' }}>Start Learning Free</button>
            <button onClick={() => navigate('contact')} style={{ padding: '16px 32px', borderRadius: 100, fontWeight: 600, fontSize: 15, background: 'rgba(255,255,255,0.04)', color: T.ink100, border: '1px solid rgba(255,255,255,0.16)', cursor: 'pointer' }}>Contact Us</button>
          </div>
        </div>
      </div>
    </section>