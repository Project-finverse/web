import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import gsap from 'gsap';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ProgressProvider } from './context/ProgressContext';
import ParticleCanvas from './components/ParticleCanvas';
import FloatingBackground from './components/FloatingBackground';
import ModulesPage from './pages/ModulesPage';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import ProgressPage from './pages/ProgressPage';
import SimulatorsPage from './pages/SimulatorsPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import Class9Page from './pages/Class9Page';
import LearnPage from './pages/LearnPage';
import LabsClassSelect from './pages/LabsClassSelect';
import LabsPlanSelect from './pages/LabsPlanSelect';
import LabsDashboard from './pages/LabsDashboard';
import LabRouter from './pages/LabRouter';

/* ═══ DESIGN TOKENS ═══ */
const T = {
  void: '#07111F', void2: '#0B1730', panel: '#0F1C3B',
  indigo: '#3D5CFF', indigo2: '#7C8CFF',
  gold: '#F5B942', gold2: '#FFD37A',
  mint: '#34D399', coral: '#FF6B6B',
  ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)',
  line: 'rgba(255,255,255,0.09)', lineHi: 'rgba(255,255,255,0.16)',
};

const S = {
  wrap: { maxWidth: 1180, margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  section: { position: 'relative' as const, padding: 'clamp(80px, 12vw, 120px) 0', zIndex: 1 } as React.CSSProperties,
  eyebrow: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: T.gold2, background: 'rgba(245,185,66,0.09)', border: '1px solid rgba(245,185,66,0.22)', padding: '6px 14px', borderRadius: 100, marginBottom: 20 } as React.CSSProperties,
  h2: { fontSize: 'clamp(28px,4vw,44px)', marginBottom: 16 } as React.CSSProperties,
  sub: { fontSize: 17, color: T.ink70, maxWidth: 560 } as React.CSSProperties,
  btnPrimary: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 26px', borderRadius: 100, fontWeight: 600, fontSize: 14.5, background: `linear-gradient(135deg, ${T.gold2}, ${T.gold})`, color: T.void, boxShadow: '0 8px 30px rgba(245,185,66,0.22)', transition: 'transform .35s var(--ease), box-shadow .35s var(--ease)', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' as const } as React.CSSProperties,
  btnGhost: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 26px', borderRadius: 100, fontWeight: 600, fontSize: 14.5, background: 'rgba(255,255,255,0.04)', color: T.ink100, border: `1px solid ${T.lineHi}`, transition: 'transform .35s var(--ease), background .35s', cursor: 'pointer', whiteSpace: 'nowrap' as const } as React.CSSProperties,
  btnSm: { padding: '11px 20px', fontSize: 13.5 } as React.CSSProperties,
};

export const ArrowIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>;

function Reveal({ children, style, delay = 0 }: { children: ReactNode; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVis(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); io.unobserve(el); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(26px)', transition: 'opacity .8s var(--ease), transform .8s var(--ease)', ...style }}>{children}</div>;
}

function GlassCard({ children, onClick, style }: { children: ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouse = useCallback((e: React.MouseEvent) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`); }, []);
  const Tag = onClick ? 'button' : 'div';
  return <Tag ref={ref as any} className="glass-card" onClick={onClick} onMouseMove={handleMouse as any} style={{ textAlign: 'left' as const, width: '100%', padding: '28px 26px', cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</Tag>;
}

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(value);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, '')); if (isNaN(num)) { setDisplayed(value); return; }
    const prefix = value.replace(/[0-9.+]+.*/, ''); const postfix = value.replace(/^[^0-9.]*[0-9.]+/, '');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { const obj = { v: 0 }; gsap.to(obj, { v: num, duration: 2, ease: 'power2.out', onUpdate: () => { const n = num >= 100 ? Math.round(obj.v) : Number(obj.v.toFixed(1)); setDisplayed(`${prefix}${n.toLocaleString('en-IN')}${postfix}`); } }); io.unobserve(el); } }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{displayed}</span>;
}

/* ═══ NAVBAR ═══ */
function Navbar() {
  const { state, navigate, goHome } = useNavigation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);

  const links = [
    { label: 'Home', page: 'home' as const },
    { label: 'Learn', page: 'learn' as const },
    { label: 'Financial Labs', page: 'labs' as const },
    { label: 'Dashboard', page: 'progress' as const },
    { label: 'Pricing', page: 'pricing' as const },
    { label: 'About', page: 'about' as const },
  ];

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 150, padding: scrolled ? '14px 0' : '20px 0', background: scrolled ? 'rgba(7,17,31,0.78)' : 'transparent', backdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none', borderBottom: scrolled ? `1px solid ${T.line}` : '1px solid transparent', transition: 'all .4s var(--ease)' }}>
      <div style={{ ...S.wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <button onClick={goHome} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(145deg, ${T.gold}, #C98A24)`, color: T.void, fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-mono)' }}>₹</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: T.ink100 }}>FinVerse</span>
        </button>
        <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 14, color: T.ink70 }}>
          {links.map(l => (
            <button key={l.label} onClick={() => navigate(l.page)} style={{ padding: '4px 0', transition: 'color .25s', color: state.page === l.page ? T.ink100 : T.ink70, fontWeight: state.page === l.page ? 600 : 400 }}
              onMouseEnter={e => e.currentTarget.style.color = T.ink100} onMouseLeave={e => e.currentTarget.style.color = state.page === l.page ? T.ink100 : T.ink70}
            >{l.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => navigate('learn')} style={{ ...S.btnPrimary, ...S.btnSm }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(245,185,66,0.32)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(245,185,66,0.22)'; }}
          >Get Started</button>
          <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ display: 'none', flexDirection: 'column', gap: 5, width: 34, height: 34, alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 20, height: 1.6, background: T.ink100, transition: 'transform .3s var(--ease)', transform: menuOpen ? 'translateY(6.6px) rotate(45deg)' : 'none' }} />
            <span style={{ width: 20, height: 1.6, background: T.ink100, transition: 'opacity .3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 20, height: 1.6, background: T.ink100, transition: 'transform .3s var(--ease)', transform: menuOpen ? 'translateY(-6.6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>
      <div className="nav-mobile-menu" style={{ display: 'none', maxHeight: menuOpen ? 500 : 0, overflow: 'hidden', transition: 'max-height .4s var(--ease)', background: 'rgba(7,17,31,0.96)', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ padding: '8px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(l => <button key={l.label} onClick={() => { navigate(l.page); setMenuOpen(false); }} style={{ padding: '12px 4px', fontSize: 15, color: state.page === l.page ? T.ink100 : T.ink70, borderBottom: `1px solid ${T.line}`, textAlign: 'left' }}>{l.label}</button>)}
        </div>
      </div>
    </nav>
  );
}

/* ═══ HOMEPAGE — Clean: Hero + Vision + Classes + Testimonials ═══ */
function HomePage() {
  const { navigate } = useNavigation();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(heroRef.current.querySelectorAll('.ha'), { opacity: 0, y: 40, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
  }, []);

  const testimonials = [
    { text: 'The SIP and investing lessons made compound interest finally click for me — I wish every school taught money this way.', name: 'Om Jindal', initials: 'OJ' },
    { text: 'The financial labs made budgeting and banking actually click — it never felt like reading a textbook.', name: 'Lakshya Narang', initials: 'LN' },
    { text: 'Everything feels modern and interactive. The quizzes genuinely make learning about money enjoyable.', name: 'Arpit Jain', initials: 'AJ' },
    { text: 'FinVerse uses real Indian examples for real money topics. Every student should get to experience this.', name: 'Parth Gakhar', initials: 'PG' },
  ];

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} style={{ padding: 'clamp(140px,18vw,180px) 0 clamp(60px,8vw,90px)', position: 'relative', zIndex: 1 }}>
        <div style={{ ...S.wrap, maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div className="ha" style={S.eyebrow}>🎯 For CBSE SkillExpo 2026</div>
          <h1 className="ha" style={{ fontSize: 'clamp(38px,6.4vw,74px)', marginBottom: 22 }}>
            Master Money <span style={{ background: `linear-gradient(135deg,#fff 20%,${T.gold2} 80%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Before Adulthood.</span>
          </h1>
          <p className="ha" style={{ fontSize: 'clamp(16px,2vw,19px)', color: T.ink70, maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.6 }}>
            India's most immersive financial literacy platform for teenagers — learn budgeting, banking, investing, taxation and entrepreneurship through interactive financial experiences.
          </p>
          <div className="ha" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <button onClick={() => navigate('learn')} style={S.btnPrimary}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(245,185,66,0.32)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(245,185,66,0.22)'; }}>
              🚀 Start Learning Free
            </button>
            <button onClick={() => navigate('labs')} style={S.btnGhost}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'none'; }}>
              🏛️ Financial Experience Center
            </button>
          </div>
          <div className="ha" style={{ display: 'flex', gap: '10px 22px', justifyContent: 'center', flexWrap: 'wrap', fontSize: 13, color: T.ink45, fontFamily: 'var(--font-mono)' }}>
            <span>🎓 Student-Friendly</span><span>🎮 Gamified Learning</span><span>📜 Certificate Included</span><span>💯 Free Basics</span>
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section style={S.section}>
        <div style={S.wrap}>
          <Reveal>
            <div style={{ maxWidth: 640, marginBottom: 56, textAlign: 'center', margin: '0 auto 56px' }}>
              <div style={S.eyebrow}>🔭 Our Vision</div>
              <h2 style={S.h2}>What We're Building Toward</h2>
              <p style={{ ...S.sub, margin: '0 auto', textAlign: 'center' }}>These numbers represent FinVerse's future roadmap — the goals we're working toward, not current achievements.</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: T.line, border: `1px solid ${T.line}`, borderRadius: 24, overflow: 'hidden', maxWidth: 820, margin: '0 auto' }}>
              {[{ d: '50K+', l: 'Students', sub: 'TARGET' }, { d: '200+', l: 'Schools', sub: 'VISION' }, { d: '4', l: 'Class Curricula', sub: 'ROADMAP' }, { d: '15+', l: 'Modules', sub: 'GOAL' }].map((s, i) => (
                <div key={i} style={{ background: 'rgba(7,17,31,0.6)', padding: '28px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: T.ink45, letterSpacing: '0.12em', marginBottom: 8 }}>{s.sub}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,32px)', color: T.ink100, fontWeight: 700 }}><Counter value={s.d} /></div>
                  <div style={{ fontSize: 12.5, color: T.ink45, marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHOOSE YOUR CLASS */}
      <section style={S.section}>
        <div style={S.wrap}>
          <Reveal>
            <div style={{ maxWidth: 640, marginBottom: 56, textAlign: 'center', margin: '0 auto 56px' }}>
              <div style={S.eyebrow}>🎓 Choose Your Class</div>
              <h2 style={S.h2}>Select Your Learning Journey</h2>
              <p style={{ ...S.sub, margin: '0 auto', textAlign: 'center' }}>Pick your class to access tailored financial education, interactive modules, financial labs and real-world activities.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {[
              { num: '09', icon: '📘', title: 'Class 9', desc: 'Foundation of Financial Literacy', features: ['3 Learning Levels', '15 Finance Modules', 'Interactive Quizzes', 'Practical Activities'], available: true, page: 'class9' as const },
              { num: '10', icon: '📗', title: 'Class 10', desc: 'Advanced Financial Awareness', available: false },
              { num: '11', icon: '📙', title: 'Class 11', desc: 'Commerce & Business Foundations', available: false },
              { num: '12', icon: '📕', title: 'Class 12', desc: 'Career, Finance & Entrepreneurship', features: ['Complete Curriculum', 'Financial Labs', 'Entrepreneurship', 'Premium Challenges'], available: true, page: 'modules' as const },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <GlassCard onClick={c.available && c.page ? () => navigate(c.page!) : undefined} style={{ borderRadius: 24, padding: 32, opacity: c.available ? 1 : 0.75, position: 'relative' }}>
                  <div style={{ position: 'absolute', right: 20, top: 16, fontSize: 72, fontWeight: 800, opacity: 0.04, fontFamily: 'var(--font-display)', lineHeight: 1, pointerEvents: 'none', zIndex: 0 }}>{c.num}</div>
                  <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 100, marginBottom: 18, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', position: 'relative', zIndex: 1, background: c.available ? 'rgba(52,211,153,0.12)' : 'rgba(245,185,66,0.10)', color: c.available ? T.mint : T.gold2, border: `1px solid ${c.available ? 'rgba(52,211,153,0.35)' : 'rgba(245,185,66,0.30)'}` }}>{c.available ? 'AVAILABLE' : 'COMING SOON'}</div>
                  <div style={{ fontSize: 38, marginBottom: 18, position: 'relative', zIndex: 1 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 28, marginBottom: 8, fontWeight: 700, position: 'relative', zIndex: 1 }}>{c.title}</h3>
                  <p style={{ fontSize: 14.5, color: T.ink70, marginBottom: 20, lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{c.desc}</p>
                  {c.available && c.features ? (
                    <>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative', zIndex: 1 }}>{c.features.map((f, j) => <li key={j} style={{ margin: '10px 0', fontSize: 14, color: 'rgba(255,255,255,0.78)' }}>✓ {f}</li>)}</ul>
                      <span style={{ display: 'inline-block', marginTop: 22, color: T.gold2, fontWeight: 700, fontSize: 15, position: 'relative', zIndex: 1 }}>Explore →</span>
                    </>
                  ) : (
                    <button disabled style={{ marginTop: 12, width: '100%', padding: 13, border: 'none', borderRadius: 14, background: '#1D2735', color: '#8894A4', cursor: 'not-allowed', fontSize: 14, fontWeight: 600, position: 'relative', zIndex: 1 }}>Launching Soon</button>
                  )}
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={S.section}>
        <div style={S.wrap}>
          <Reveal>
            <div style={{ maxWidth: 640, marginBottom: 56, textAlign: 'center', margin: '0 auto 56px' }}>
              <div style={S.eyebrow}>❤️ Loved By Students</div>
              <h2 style={S.h2}>What Students Say About FinVerse</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <GlassCard style={{ borderRadius: 16, padding: 26 }}>
                  <div style={{ color: T.gold, fontSize: 14, letterSpacing: 2, marginBottom: 14, position: 'relative', zIndex: 1 }}>★★★★★</div>
                  <p style={{ fontSize: 14.5, color: T.ink70, marginBottom: 18, lineHeight: 1.65, position: 'relative', zIndex: 1 }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg,${T.indigo},${T.indigo2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{t.initials}</div>
                    <span style={{ fontSize: 13.5, color: T.ink100, fontWeight: 600 }}>{t.name}</span>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══ FOOTER — With all class links ═══ */
function Footer() {
  const { navigate } = useNavigation();
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, padding: '72px 0 32px', position: 'relative', zIndex: 1, background: 'linear-gradient(180deg,transparent,rgba(7,17,31,0.5))' }}>
      <div style={S.wrap}>
        <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 56 }}>
          <div>
            <button onClick={() => navigate('home')} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(145deg,${T.gold},#C98A24)`, color: T.void, fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-mono)' }}>₹</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: T.ink100 }}>FinVerse</span>
            </button>
            <p style={{ fontSize: 13.5, color: T.ink45, maxWidth: 280, lineHeight: 1.6 }}>India's interactive financial literacy platform, built for students by students.</p>
          </div>
          {[
            { title: 'Platform', links: [{ t: 'Class 9', p: 'class9' as const }, { t: 'Class 10 (Soon)', p: 'learn' as const }, { t: 'Class 11 (Soon)', p: 'learn' as const }, { t: 'Class 12', p: 'modules' as const }] },
            { title: 'Features', links: [{ t: 'Experience Center', p: 'labs' as const }, { t: 'Dashboard', p: 'progress' as const }] },
            { title: 'Company', links: [{ t: 'About Us', p: 'about' as const }, { t: 'Pricing', p: 'pricing' as const }, { t: 'Contact', p: 'contact' as const }] },
          ].map((col, ci) => (
            <div key={ci}>
              <h5 style={{ fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: T.ink45, fontFamily: 'var(--font-mono)', marginBottom: 16, fontWeight: 600 }}>{col.title}</h5>
              {col.links.map((l, li) => (
                <button key={li} onClick={() => navigate(l.p)} style={{ display: 'block', fontSize: 14, color: T.ink70, marginBottom: 12, transition: 'color .25s', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = T.gold2} onMouseLeave={e => e.currentTarget.style.color = T.ink70}>{l.t}</button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingTop: 28, borderTop: `1px solid ${T.line}`, fontSize: 12.5, color: T.ink45 }}>
          <span>© 2026 FinVerse. Built with ❤️ in India by Saksham Gupta &amp; Archit Jain.</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: T.gold2 }}>🎯 For CBSE SkillExpo 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══ APP ═══ */
function AppContent() {
  const { state } = useNavigation();
  const [pageKey, setPageKey] = useState(0);
  useEffect(() => { setPageKey(k => k + 1); }, [state.page, state.moduleId, state.lessonIndex]);

  const renderPage = () => {
    switch (state.page) {
      case 'modules': return <ModulesPage />;
      case 'lesson': return <LessonPage />;
      case 'quiz': return <QuizPage />;
      case 'progress': return <ProgressPage />;
      case 'simulators': return <SimulatorsPage />;
      case 'about': return <AboutPage />;
      case 'pricing': return <PricingPage />;
      case 'contact': return <ContactPage />;
      case 'class9': return <Class9Page />;
      case 'learn': return <LearnPage />;
      case 'labs': return <LabsClassSelect />;
      case 'labs-class': return <LabsClassSelect />;
      case 'labs-plan': return <LabsPlanSelect />;
      case 'labs-dashboard': return <LabsDashboard />;
      case 'lab': return <LabRouter />;
      default: return <HomePage />;
    }
  };

  return (
    <>
      <ParticleCanvas />
      <FloatingBackground />
      <Navbar />
      <main id="top" key={pageKey} className="page-enter">{renderPage()}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </NavigationProvider>
  );
}
