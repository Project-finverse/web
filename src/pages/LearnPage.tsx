import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigation } from '../context/NavigationContext';

const T = {
  void: '#07111F',
  gold: '#FFC857',
  gold2: '#FFD76A',
  green: '#39FF88',
  greenBg: 'rgba(57,255,136,0.12)',
  greenBorder: 'rgba(57,255,136,0.4)',
  goldBg: 'rgba(255,200,87,0.08)',
  goldBorder: 'rgba(255,200,87,0.25)',
  premBg: 'rgba(255,200,87,0.10)',
  premBorder: 'rgba(255,200,87,0.35)',
  ink100: 'rgba(255,255,255,0.95)',
  ink70: '#9AA7B6',
  ink50: '#9CA8B5',
  ink40: '#8894A4',
  line: 'rgba(255,255,255,0.08)',
  panel: '#1D2735',
};

interface ClassData {
  number: string;
  icon: string;
  title: string;
  desc: string;
  features?: string[];
  available: boolean;
  premium?: boolean;
  page?: 'class9' | 'modules';
}

const classes: ClassData[] = [
  {
    number: '09', icon: '📘', title: 'Class 9',
    desc: 'Foundation of Financial Literacy',
    features: ['✓ 3 Learning Levels', '✓ 15 Finance Modules', '✓ Interactive Quizzes', '✓ Practical Activities'],
    available: true, page: 'class9',
  },
  {
    number: '10', icon: '📗', title: 'Class 10',
    desc: 'Advanced Financial Awareness',
    available: false,
  },
  {
    number: '11', icon: '📙', title: 'Class 11',
    desc: 'Commerce & Business Foundations',
    available: false,
  },
  {
    number: '12', icon: '📕', title: 'Class 12',
    desc: 'Career, Finance & Entrepreneurship',
    features: ['✓ Complete Curriculum', '✓ Financial Labs', '✓ Entrepreneurship', '✓ Premium Challenges'],
    available: true, premium: true, page: 'modules',
  },
];

export default function LearnPage() {
  const { navigate } = useNavigation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // Background glows
    if (sectionRef.current) {
      const g1 = sectionRef.current.querySelector('.lg-1');
      const g2 = sectionRef.current.querySelector('.lg-2');
      if (g1) gsap.to(g1, { x: 100, y: 60, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      if (g2) gsap.to(g2, { x: -80, y: -50, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }

    // Header entrance
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'power3.out' }
      );
    }

    // Cards stagger
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 60, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  return (
    <div ref={sectionRef} style={{
      padding: 'clamp(120px, 14vw, 160px) clamp(20px, 8%, 100px) clamp(80px, 10vw, 120px)',
      background: T.void, position: 'relative', overflow: 'hidden', minHeight: '100vh', zIndex: 1,
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="lg-1" style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          filter: 'blur(120px)', background: 'rgba(255,200,87,0.14)',
          left: -180, top: -120,
        }} />
        <div className="lg-2" style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          filter: 'blur(120px)', background: 'rgba(57,255,136,0.08)',
          right: -180, bottom: -120,
        }} />
      </div>

      {/* Header */}
      <div ref={headerRef} style={{
        maxWidth: 760, margin: '0 auto', textAlign: 'center', marginBottom: 70,
        position: 'relative', zIndex: 2,
      }}>
        <span style={{
          display: 'inline-block', padding: '10px 18px', borderRadius: 999,
          background: T.goldBg, border: `1px solid ${T.goldBorder}`,
          color: T.gold, fontSize: 13, letterSpacing: '0.12em',
          fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
        }}>FINVERSE LEARNING</span>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', fontWeight: 800,
          lineHeight: 1.05, margin: '20px 0',
        }}>
          Choose Your<br />
          <span style={{ color: T.gold }}>Learning Journey</span>
        </h1>

        <p style={{
          color: T.ink70, fontSize: 18, maxWidth: 620, margin: '0 auto', lineHeight: 1.8,
        }}>
          Select your class to access practical financial education,
          simulations and interactive learning.
        </p>
      </div>

      {/* Class Grid */}
      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 30, maxWidth: 1200, margin: '0 auto',
        position: 'relative', zIndex: 2,
      }}>
        {classes.map((c, i) => (
          <ClassCard key={i} data={c} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}

function ClassCard({ data, navigate }: { data: ClassData; navigate: (page: any) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !data.available) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // Mouse tilt for available cards
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 800, duration: 0.3, ease: 'power2.out' });
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
  }, [data.available]);

  const isAvailable = data.available;

  return (
    <div
      ref={cardRef}
      onClick={() => { if (isAvailable && data.page) navigate(data.page); }}
      style={{
        position: 'relative', padding: 34, borderRadius: 24, overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${T.line}`,
        transition: 'transform .45s cubic-bezier(.19,.8,.2,1), border-color .45s, box-shadow .45s',
        cursor: isAvailable ? 'pointer' : 'default',
        opacity: isAvailable ? 1 : 0.82,
        color: '#fff', textDecoration: 'none',
      }}
      onMouseEnter={e => {
        if (!isAvailable) return;
        e.currentTarget.style.borderColor = T.gold;
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(255,184,0,0.15)';
        e.currentTarget.style.transform = 'translateY(-10px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = T.line;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Large faded number */}
      <div style={{
        position: 'absolute', right: 20, top: 18,
        fontSize: 82, fontWeight: 800, opacity: 0.05,
        fontFamily: 'var(--font-display)', lineHeight: 1, pointerEvents: 'none',
      }}>{data.number}</div>

      {/* Status badge */}
      <div style={{
        display: 'inline-block', padding: '8px 16px', borderRadius: 999,
        marginBottom: 18, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
        fontFamily: 'var(--font-mono)',
        background: isAvailable
          ? (data.premium ? T.premBg : T.greenBg)
          : T.premBg,
        color: isAvailable
          ? (data.premium ? T.gold : T.green)
          : T.gold,
        border: `1px solid ${isAvailable
          ? (data.premium ? T.premBorder : T.greenBorder)
          : T.premBorder}`,
      }}>
        {isAvailable ? 'AVAILABLE' : 'COMING SOON'}
      </div>

      {/* Icon */}
      <div style={{ fontSize: 42, marginBottom: 24 }}>{data.icon}</div>

      {/* Title */}
      <h2 style={{ fontSize: 32, marginBottom: 10, fontWeight: 800 }}>{data.title}</h2>

      {/* Description */}
      <p style={{ color: T.ink50, marginBottom: 24, lineHeight: 1.7 }}>{data.desc}</p>

      {/* Features or disabled button */}
      {isAvailable && data.features ? (
        <>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {data.features.map((f, j) => (
              <li key={j} style={{ margin: '12px 0', color: '#DCE3EC', fontSize: 15 }}>{f}</li>
            ))}
          </ul>
          <span style={{
            display: 'inline-block', marginTop: 28,
            color: T.gold, fontWeight: 700, fontSize: 16,
          }}>
            Explore →
          </span>
        </>
      ) : (
        <button disabled style={{
          marginTop: 20, width: '100%', padding: 14,
          border: 'none', borderRadius: 14,
          background: T.panel, color: T.ink40,
          cursor: 'not-allowed', fontSize: 14, fontWeight: 600,
        }}>
          Launching Soon
        </button>
      )}
    </div>
  );
}
