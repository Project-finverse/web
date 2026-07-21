import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigation } from '../context/NavigationContext';

const T = {
  void: '#07111F',
  panel: 'rgba(17,25,39,0.68)',
  gold: '#FFC857',
  gold2: '#FFD76A',
  goldBg: 'rgba(255,200,87,0.08)',
  goldBorder: 'rgba(255,200,87,0.25)',
  green: '#39FF88',
  greenBg: 'rgba(43,230,125,0.12)',
  greenBorder: 'rgba(43,230,125,0.4)',
  premBg: 'rgba(255,200,87,0.10)',
  premBorder: 'rgba(255,200,87,0.35)',
  ink100: 'rgba(255,255,255,0.95)',
  ink70: '#97A4B4',
  ink50: '#8E9BAC',
  ink40: '#94A2B3',
  ink35: '#8F9CAC',
  line: 'rgba(255,255,255,0.08)',
};

interface ModuleData {
  icon: string;
  id: string;
  title: string;
  desc: string;
  lessons: string;
  type: string;
  time: string;
}

const level1Modules: ModuleData[] = [
  { icon: '💰', id: 'MODULE 01', title: 'Pocket Money Protocol', desc: 'Needs vs Wants, budgeting, barter system and money basics.', lessons: '8 Lessons', type: 'Quiz', time: '25 mins' },
  { icon: '🏦', id: 'MODULE 02', title: 'The Digital Citizen', desc: 'Learn UPI, QR payments, banking safety and fraud awareness.', lessons: '7 Lessons', type: 'Activity', time: '20 mins' },
  { icon: '📈', id: 'MODULE 03', title: 'Inflation Detector', desc: 'Discover inflation, assets, liabilities and purchasing power.', lessons: '9 Lessons', type: 'Quiz', time: '30 mins' },
  { icon: '🌍', id: 'MODULE 04', title: 'Money Cycle', desc: "Understand RBI, money circulation and India's economy.", lessons: '8 Lessons', type: 'Activity', time: '24 mins' },
  { icon: '🛡️', id: 'MODULE 05', title: 'Risk Aware', desc: 'Learn emergencies, financial risks and smart decision making.', lessons: '6 Lessons', type: 'Quiz', time: '18 mins' },
];

const level2Modules: ModuleData[] = [
  { icon: '🎯', id: 'MODULE 06', title: 'Goal Architect', desc: 'Set SMART financial goals and build actionable savings plans.', lessons: '7 Lessons', type: 'Simulation', time: '28 mins' },
  { icon: '💳', id: 'MODULE 07', title: 'Credit Compass', desc: 'Understand credit scores, EMIs, loans and responsible borrowing.', lessons: '8 Lessons', type: 'Quiz', time: '30 mins' },
  { icon: '📊', id: 'MODULE 08', title: 'Market Explorer', desc: 'Introduction to stock markets, mutual funds and SIPs.', lessons: '9 Lessons', type: 'Activity', time: '35 mins' },
  { icon: '🧾', id: 'MODULE 09', title: 'Tax Navigator', desc: 'Income tax basics, GST, TDS and filing fundamentals.', lessons: '7 Lessons', type: 'Quiz', time: '26 mins' },
  { icon: '🔐', id: 'MODULE 10', title: 'Cyber Shield', desc: 'Advanced fraud detection, phishing defence and digital hygiene.', lessons: '6 Lessons', type: 'Activity', time: '22 mins' },
];

const level3Modules: ModuleData[] = [
  { icon: '🚀', id: 'MODULE 11', title: 'Startup Launchpad', desc: 'Business model canvas, revenue streams and entrepreneurial thinking.', lessons: '8 Lessons', type: 'Project', time: '40 mins' },
  { icon: '📉', id: 'MODULE 12', title: 'Portfolio Forge', desc: 'Build and manage a simulated investment portfolio.', lessons: '9 Lessons', type: 'Simulation', time: '45 mins' },
  { icon: '🏠', id: 'MODULE 13', title: 'Insurance & Assets', desc: 'Life insurance, health cover, real estate and asset allocation.', lessons: '7 Lessons', type: 'Quiz', time: '30 mins' },
  { icon: '🤖', id: 'MODULE 14', title: 'AI Finance Lab', desc: 'Use AI tools for financial analysis, forecasting and planning.', lessons: '6 Lessons', type: 'Lab', time: '35 mins' },
  { icon: '🏆', id: 'MODULE 15', title: 'Financial Mastery', desc: 'Capstone project combining all skills into a personal finance plan.', lessons: '5 Lessons', type: 'Project', time: '50 mins' },
];

function ModuleCard({ m }: { m: ModuleData }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Mouse tilt
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 900, transformOrigin: 'center', duration: 0.35, ease: 'power2.out' });
    };
    const handleLeave = () => {
      gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power3.out' });
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div ref={cardRef} style={{
      position: 'relative', overflow: 'hidden',
      background: T.panel, backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
      border: `1px solid ${T.line}`, borderRadius: 24, padding: 28,
      transition: 'transform .45s ease, border-color .45s ease, box-shadow .45s ease',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,200,87,0.35)';
        e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.45), 0 0 40px rgba(255,200,87,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = T.line;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Icon */}
      <div style={{
        width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 18, background: T.goldBg, fontSize: 30, marginBottom: 22,
      }}>{m.icon}</div>

      {/* Module ID */}
      <span style={{
        display: 'inline-block', color: T.gold, fontSize: 12,
        fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', marginBottom: 12,
      }}>{m.id}</span>

      {/* Title */}
      <h4 style={{ fontSize: 22, marginBottom: 14, fontWeight: 700 }}>{m.title}</h4>

      {/* Description */}
      <p style={{ color: T.ink40, lineHeight: 1.8, fontSize: 15 }}>{m.desc}</p>

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: 28, paddingTop: 22,
        borderTop: `1px solid ${T.line}`,
        color: T.ink35, fontSize: 13,
        fontFamily: 'var(--font-mono)',
      }}>
        <span>{m.lessons}</span>
        <span>{m.type}</span>
        <span>{m.time}</span>
      </div>
    </div>
  );
}

function LevelSection({ number, title, desc, badge, badgeType, modules: mods }: {
  number: string; title: string; desc: string; badge: string; badgeType: 'free' | 'premium'; modules: ModuleData[];
}) {
  const levelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Level header animation
    if (levelRef.current) {
      gsap.from(levelRef.current, {
        opacity: 0, y: 60, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: levelRef.current, start: 'top 85%' },
      });
    }

    // Cards stagger animation
    if (gridRef.current) {
      gsap.from(gridRef.current.children, {
        opacity: 0, y: 70, scale: 0.92, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      });

      // Floating cards
      Array.from(gridRef.current.children).forEach((card, index) => {
        gsap.to(card, {
          y: -10, duration: 2 + (index * 0.25),
          repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
      });
    }
  }, []);

  const isFree = badgeType === 'free';

  return (
    <section style={{ marginBottom: 100, position: 'relative', zIndex: 2 }}>
      {/* Level header */}
      <div ref={levelRef} style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        gap: 40, marginBottom: 40, flexWrap: 'wrap',
      }}>
        <div>
          <span style={{
            display: 'inline-block', color: T.gold,
            fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', marginBottom: 12,
          }}>{number}</span>
          <h3 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 14 }}>{title}</h3>
          <p style={{ color: T.ink50, maxWidth: 620, lineHeight: 1.8 }}>{desc}</p>
        </div>
        <div style={{
          padding: '12px 22px', borderRadius: 999, fontWeight: 700, fontSize: 13,
          letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', flexShrink: 0,
          background: isFree ? T.greenBg : T.premBg,
          color: isFree ? T.green : T.gold,
          border: `1px solid ${isFree ? T.greenBorder : T.premBorder}`,
        }}>{badge}</div>
      </div>

      {/* Module cards grid */}
      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 28,
      }}>
        {mods.map((m, i) => <ModuleCard key={i} m={m} />)}
      </div>
    </section>
  );
}

export default function Class9Page() {
  const { navigate } = useNavigation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Register ScrollTrigger-like behavior via IntersectionObserver
    // (since we use gsap directly without the plugin CDN)

    // Background glow animation
    if (sectionRef.current) {
      const glow1 = sectionRef.current.querySelector('.c9-glow-1');
      const glow2 = sectionRef.current.querySelector('.c9-glow-2');
      if (glow1) gsap.to(glow1, { x: 120, y: 80, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      if (glow2) gsap.to(glow2, { x: -100, y: -70, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }

    // Section header animation
    if (headerRef.current) {
      gsap.from(headerRef.current, { opacity: 0, y: 80, duration: 1, ease: 'power3.out' });
    }

    // CTA animation
    if (ctaRef.current) {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          gsap.from(ctaRef.current!, { opacity: 0, y: 60, duration: 1, ease: 'power3.out' });
          io.unobserve(e.target);
        }
      }, { threshold: 0.3 });
      io.observe(ctaRef.current);
    }

    // Magnetic CTA button
    const btn = ctaBtnRef.current;
    if (btn) {
      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3 });
      };
      const handleLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4 });
      };
      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
      return () => {
        btn.removeEventListener('mousemove', handleMove);
        btn.removeEventListener('mouseleave', handleLeave);
      };
    }
  }, []);

  // Fade in entire section
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from('.c9-section', { opacity: 0, duration: 1.2, ease: 'power2.out' });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="c9-section"
      style={{
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(100px, 12vw, 140px) clamp(20px, 8%, 120px)',
        background: T.void, minHeight: '100vh', zIndex: 1,
      }}
    >
      {/* ═══ ANIMATED BACKGROUND ═══ */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }} />
        {/* Glows */}
        <div className="c9-glow-1" style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          filter: 'blur(120px)', background: 'rgba(255,200,87,0.13)',
          top: -120, left: -120,
        }} />
        <div className="c9-glow-2" style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          filter: 'blur(120px)', background: 'rgba(43,230,125,0.09)',
          right: -120, bottom: -120,
        }} />
      </div>

      {/* ═══ SECTION HEADER ═══ */}
      <div ref={headerRef} style={{
        maxWidth: 760, margin: '0 auto', textAlign: 'center',
        position: 'relative', zIndex: 2, marginBottom: 90,
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 18px', borderRadius: 999,
          background: T.goldBg, border: `1px solid ${T.goldBorder}`,
          color: T.gold, fontSize: 13, letterSpacing: '0.12em',
          textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
        }}>📚 CLASS 9 ROADMAP</span>

        <h2 style={{
          marginTop: 28, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          lineHeight: 1.05, fontWeight: 800,
        }}>
          Learn Finance<br />
          <span style={{ color: T.gold }}>Step by Step.</span>
        </h2>

        <p style={{ marginTop: 22, color: T.ink70, fontSize: 18, lineHeight: 1.8 }}>
          Build practical money skills through interactive lessons,
          simulations, quizzes and real-life activities.
        </p>
      </div>

      {/* ═══ LEVELS ═══ */}
      <LevelSection
        number="LEVEL 01"
        title="Basic Foundation"
        desc="Build financial awareness before diving into banking, investing and entrepreneurship."
        badge="FREE ACCESS"
        badgeType="free"
        modules={level1Modules}
      />

      <LevelSection
        number="LEVEL 02"
        title="Practical Application"
        desc="Apply financial concepts through realistic exercises and simulations."
        badge="PREMIUM"
        badgeType="premium"
        modules={level2Modules}
      />

      <LevelSection
        number="LEVEL 03"
        title="Financial Hacker"
        desc="Master advanced finance through interactive market simulations and real-world tools."
        badge="PREMIUM"
        badgeType="premium"
        modules={level3Modules}
      />

      {/* ═══ CTA ═══ */}
      <div ref={ctaRef} style={{ textAlign: 'center', marginTop: 80, position: 'relative', zIndex: 2 }}>
        <h3 style={{ fontSize: 'clamp(28px, 5vw, 42px)', marginBottom: 18 }}>
          Ready to unlock every module?
        </h3>
        <p style={{ color: '#96A2B2', marginBottom: 35 }}>
          Access premium lessons, simulations, certificates and challenges.
        </p>
        <a
          ref={ctaBtnRef}
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('pricing'); }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '18px 36px', borderRadius: 999,
            background: `linear-gradient(135deg, ${T.gold2}, #FFB800)`,
            color: T.void, fontWeight: 700, fontSize: 16,
            transition: 'transform .35s, box-shadow .35s',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,184,0,0.35)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          🚀 Upgrade to Premium
        </a>
      </div>
    </div>
  );
}
