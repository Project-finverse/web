import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigation } from '../context/NavigationContext';
import { useProgress } from '../context/ProgressContext';
import { getLabsByClass } from '../data/labRegistry';

const T = { void: '#07111F', panel: '#0F1C3B', gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', indigo: '#3D5CFF', indigo2: '#7C8CFF', coral: '#FF6B6B', ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)', line: 'rgba(255,255,255,0.09)' };

export default function LabsDashboard() {
  const { state, navigate, openLab } = useNavigation();
  const { progress } = useProgress();
  const classNum = state.classNum || 9;
  const plan = state.plan || 'basic';
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(heroRef.current.querySelectorAll('.dh'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
  }, []);

  const tierAccess = plan === 'advanced' ? ['basic', 'intermediate', 'advanced'] : plan === 'intermediate' ? ['basic', 'intermediate'] : ['basic'];
  const allClassLabs = getLabsByClass(classNum);
  const accessibleLabs = allClassLabs.filter(l => tierAccess.includes(l.tier));
  const lockedLabs = allClassLabs.filter(l => !tierAccess.includes(l.tier));

  const topics = ['all', ...Array.from(new Set(accessibleLabs.map(l => l.category)))];

  let displayLabs = topicFilter === 'all' ? accessibleLabs : accessibleLabs.filter(l => l.category === topicFilter);
  if (search) displayLabs = displayLabs.filter(l => l.title.toLowerCase().includes(search.toLowerCase()) || l.desc.toLowerCase().includes(search.toLowerCase()));

  const completedCount = accessibleLabs.filter(l => progress.completedModules.includes(l.id)).length;
  const pct = accessibleLabs.length > 0 ? Math.round((completedCount / accessibleLabs.length) * 100) : 0;

  const recentLabs = accessibleLabs.filter(l => l.status === 'live').slice(0, 3);

  return (
    <section style={{ padding: '120px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontSize: 12, fontFamily: 'var(--font-mono)', color: T.ink45 }}>
          <button onClick={() => navigate('labs')} style={{ color: T.ink45, cursor: 'pointer' }}>Experience Center</button>
          <span>›</span>
          <button onClick={() => navigate('labs')} style={{ color: T.ink45, cursor: 'pointer' }}>Class {classNum}</button>
          <span>›</span>
          <span style={{ color: T.gold2, textTransform: 'capitalize' }}>{plan} Plan</span>
        </div>

        {/* Hero */}
        <div ref={heroRef} style={{ marginBottom: 48 }}>
          <div className="dh" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gold2, background: 'rgba(245,185,66,0.09)', border: '1px solid rgba(245,185,66,0.22)', padding: '6px 14px', borderRadius: 100, marginBottom: 16 }}>
                🧪 Class {classNum} · {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
              </div>
              <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 8 }}>Financial Lab Dashboard</h1>
              <p style={{ fontSize: 16, color: T.ink70, maxWidth: 480 }}>{accessibleLabs.length} labs available · {completedCount} completed</p>
            </div>
            {/* Progress ring */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: `conic-gradient(${T.gold} ${pct * 3.6}deg, rgba(255,255,255,0.06) 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: T.void, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: T.gold2, fontFamily: 'var(--font-display)' }}>{pct}%</span>
                </div>
              </div>
              <div style={{ fontSize: 10, color: T.ink45, marginTop: 6, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>PROGRESS</div>
            </div>
          </div>

          {/* Stats */}
          <div className="dh" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {[
              { v: accessibleLabs.length, l: 'Labs Available', ic: '🧪', c: T.gold2 },
              { v: completedCount, l: 'Completed', ic: '✅', c: T.green },
              { v: progress.xp, l: 'XP Earned', ic: '⚡', c: T.indigo2 },
              { v: progress.streak, l: 'Day Streak', ic: '🔥', c: T.coral },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.line}`, borderRadius: 14, padding: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>{s.ic}</span>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: s.c, fontFamily: 'var(--font-display)' }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: T.ink45, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search + Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            placeholder="Search labs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1 1 240px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.line}`, borderRadius: 12, padding: '12px 16px', color: T.ink100, fontSize: 14, fontFamily: 'var(--font-mono)', outline: 'none' }}
          />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {topics.map(t => (
              <button key={t} onClick={() => setTopicFilter(t)} style={{
                padding: '8px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-mono)',
                background: topicFilter === t ? `linear-gradient(135deg,${T.gold2},${T.gold})` : 'rgba(255,255,255,0.03)',
                color: topicFilter === t ? T.void : T.ink45,
                border: topicFilter === t ? 'none' : `1px solid ${T.line}`,
                cursor: 'pointer', textTransform: 'capitalize',
              }}>{t === 'all' ? 'All Topics' : t}</button>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        {recentLabs.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16, fontWeight: 600, color: T.ink70 }}>🚀 Quick Start</h3>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
              {recentLabs.map(l => (
                <button key={l.id} onClick={() => openLab(l.id)}
                  style={{ flexShrink: 0, width: 240, padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.line}`, cursor: 'pointer', textAlign: 'left', transition: 'border-color .3s, transform .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,185,66,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{l.icon}</div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{l.title}</h4>
                  <span style={{ fontSize: 11, color: T.gold2, fontFamily: 'var(--font-mono)' }}>Launch →</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lab Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {displayLabs.map(lab => {
            const isCompleted = progress.completedModules.includes(lab.id);
            return (
              <button key={lab.id} onClick={() => lab.status === 'live' ? openLab(lab.id) : undefined}
                className="glass-card"
                style={{ textAlign: 'left', padding: 28, borderRadius: 20, cursor: lab.status === 'live' ? 'pointer' : 'default', width: '100%', position: 'relative' }}>
                
                {/* Tier + completion badge */}
                <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 6 }}>
                  {isCompleted && <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: 'rgba(52,211,153,0.12)', color: T.green, border: '1px solid rgba(52,211,153,0.25)' }}>DONE</span>}
                  <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', fontWeight: 700, padding: '3px 8px', borderRadius: 100,
                    background: lab.tier === 'advanced' ? 'rgba(245,185,66,0.12)' : lab.tier === 'intermediate' ? 'rgba(124,140,255,0.12)' : 'rgba(52,211,153,0.12)',
                    color: lab.tier === 'advanced' ? T.gold : lab.tier === 'intermediate' ? T.indigo2 : T.green,
                    border: `1px solid ${lab.tier === 'advanced' ? 'rgba(245,185,66,0.25)' : lab.tier === 'intermediate' ? 'rgba(124,140,255,0.25)' : 'rgba(52,211,153,0.25)'}`,
                  }}>{lab.tier.toUpperCase()}</span>
                </div>

                <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(245,185,66,0.08)', border: '1px solid rgba(245,185,66,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 18 }}>{lab.icon}</div>

                <h3 style={{ fontSize: 18, marginBottom: 8, fontWeight: 600, position: 'relative', zIndex: 1 }}>{lab.title}</h3>
                <p style={{ fontSize: 13.5, color: T.ink70, lineHeight: 1.6, marginBottom: 16, position: 'relative', zIndex: 1 }}>{lab.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {lab.features.slice(0, 3).map((f, i) => (
                    <span key={i} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 100, background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.line}`, color: T.ink45, fontFamily: 'var(--font-mono)' }}>{f}</span>
                  ))}
                </div>

                <span style={{ fontSize: 12, fontWeight: 600, color: lab.status === 'live' ? T.gold2 : T.ink45, fontFamily: 'var(--font-mono)', position: 'relative', zIndex: 1 }}>
                  {lab.status === 'live' ? (isCompleted ? 'Review Lab →' : 'Launch Lab →') : 'Coming Soon'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Locked Labs Preview */}
        {lockedLabs.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16, fontWeight: 600, color: T.ink45 }}>🔒 Unlock More Labs</h3>
            <p style={{ fontSize: 14, color: T.ink45, marginBottom: 20, lineHeight: 1.6 }}>
              These {lockedLabs.length} labs require a higher plan. Complete the {plan} plan first, then upgrade to access advanced experiences.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {lockedLabs.slice(0, 4).map(lab => (
                <div key={lab.id} style={{ padding: 22, borderRadius: 16, background: 'rgba(255,255,255,0.015)', border: `1px solid ${T.line}`, opacity: 0.5 }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{lab.icon}</div>
                  <h4 style={{ fontSize: 15, marginBottom: 4, fontWeight: 600 }}>{lab.title}</h4>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: T.ink45, textTransform: 'uppercase' }}>{lab.tier} · Locked</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('pricing')} style={{ marginTop: 20, padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer' }}>
              Upgrade Plan →
            </button>
          </div>
        )}

        {displayLabs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16, color: T.ink45 }}>No labs match your search. Try different keywords.</p>
          </div>
        )}
      </div>
    </section>
  );
}
