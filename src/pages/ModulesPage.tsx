import { useEffect, useRef } from 'react';
import { modules } from '../data/modules';
import { useNavigation } from '../context/NavigationContext';
import { ModuleIcon, ChevronRight } from '../components/Icons';
import gsap from 'gsap';

const T = { bg: '#07111F', blue: '#3D5CFF', cyan: '#7C8CFF', green: '#34D399', gold: '#F5B942', gold2: '#FFD37A', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)' };

export default function ModulesPage() {
  const { navigate } = useNavigation();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(listRef.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.2 });
  }, []);

  return (
    <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ maxWidth: 560, marginBottom: 64 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.text3, paddingBottom: 32 }}>Intelligence Modules</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', marginBottom: 16, letterSpacing: '-0.035em' }}>Your Learning Architecture</h1>
          <p style={{ fontSize: 16, color: T.text2, lineHeight: 1.7 }}>
            Six modules built from RBI, SEBI, and NCFE frameworks. Each one advances your financial intelligence score.
          </p>
        </div>

        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {modules.map((m) => (
            <button key={m.id} onClick={() => navigate('lesson', m.id, 0)}
              className="glass-card"
              style={{
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center',
                padding: '28px 32px', borderRadius: 16, cursor: 'pointer', textAlign: 'left', width: '100%',
              }}>
              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                  background: `${T.blue}12`, border: `1px solid ${T.blue}18`, color: T.cyan,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ModuleIcon type={m.icon} size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: T.text3, letterSpacing: '0.08em' }}>MODULE {m.number}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px', borderRadius: 6,
                      background: m.difficulty === 'Easy' ? `${T.green}15` : m.difficulty === 'Medium' ? `${T.gold}15` : '#FF6B6B15',
                      color: m.difficulty === 'Easy' ? T.green : m.difficulty === 'Medium' ? T.gold : '#FF6B6B',
                      letterSpacing: '0.06em',
                    }}>{m.difficulty.toUpperCase()}</span>
                    {m.isPremium && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px', borderRadius: 6, background: `${T.gold}12`, color: T.gold, letterSpacing: '0.06em' }}>PREMIUM</span>}
                  </div>
                  <h3 style={{ fontSize: 20, marginBottom: 8, fontWeight: 600, letterSpacing: '-0.02em' }}>{m.title}</h3>
                  <p style={{ fontSize: 14, color: T.text2, marginBottom: 12, maxWidth: 480, lineHeight: 1.6 }}>{m.description}</p>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 11, fontFamily: 'var(--font-mono)', color: T.text3, letterSpacing: '0.04em' }}>
                    <span>{m.lessonsCount} lessons</span>
                    <span>{m.xp}</span>
                    <span>{m.duration}</span>
                  </div>
                </div>
              </div>
              <div style={{ color: T.cyan, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, letterSpacing: '0.02em' }}>
                Start <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

