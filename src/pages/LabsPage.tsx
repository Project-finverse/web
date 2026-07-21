import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { labs, labCategories, getLabsByCategory } from '../data/labRegistry';

const T = { gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', blue: '#3D5CFF', cyan: '#7C8CFF', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B' };

export default function LabsPage() {
  const { openLab } = useNavigation();
  const [cat, setCat] = useState('all');
  const [classFilter, setClassFilter] = useState(0);

  let filtered = getLabsByCategory(cat);
  if (classFilter > 0) filtered = filtered.filter(l => l.classLevel.includes(classFilter));

  const tierOrder = { basic: 0, intermediate: 1, advanced: 2 };
  filtered.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);

  const liveCount = labs.filter(l => l.status === 'live').length;

  return (
    <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ maxWidth: 700, marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gold2, background: 'rgba(245,185,66,0.09)', border: '1px solid rgba(245,185,66,0.22)', padding: '6px 14px', borderRadius: 100, marginBottom: 20 }}>🏛️ Financial Experience Center</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', marginBottom: 16 }}>Financial Labs</h1>
          <p style={{ fontSize: 17, color: T.text2, lineHeight: 1.7 }}>
            {liveCount} interactive financial experiences that simulate real-world workflows. Learn by doing — not just reading. Every lab is built with data from official Indian regulators.
          </p>
        </div>

        {/* Class filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: T.text3, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', padding: '10px 0', marginRight: 8 }}>CLASS:</span>
          {[{ n: 0, l: 'All' }, { n: 9, l: '9' }, { n: 10, l: '10' }, { n: 11, l: '11' }, { n: 12, l: '12' }].map(c => (
            <button key={c.n} onClick={() => setClassFilter(c.n)} style={{
              padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-mono)',
              background: classFilter === c.n ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.03)',
              color: classFilter === c.n ? T.green : T.text3,
              border: `1px solid ${classFilter === c.n ? 'rgba(52,211,153,0.3)' : T.border}`,
              cursor: 'pointer', transition: 'all .2s',
            }}>Class {c.l}</button>
          ))}
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
          {labCategories.map(c => {
            const count = (c.id === 'all' ? labs : labs.filter(l => l.category === c.id)).filter(l => classFilter === 0 || l.classLevel.includes(classFilter)).length;
            return (
              <button key={c.id} onClick={() => setCat(c.id)} style={{
                padding: '10px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                background: cat === c.id ? `linear-gradient(135deg,${T.gold2},${T.gold})` : 'rgba(255,255,255,0.03)',
                color: cat === c.id ? '#07111F' : T.text2,
                border: cat === c.id ? 'none' : `1px solid ${T.border}`,
                cursor: 'pointer', transition: 'all .25s',
                boxShadow: cat === c.id ? '0 4px 16px rgba(245,185,66,0.25)' : 'none',
              }}>
                {c.icon} {c.label} <span style={{ opacity: 0.6, marginLeft: 4, fontSize: 11 }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Lab Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map(lab => (
            <button
              key={lab.id}
              onClick={() => lab.status === 'live' ? openLab(lab.id) : undefined}
              className="glass-card"
              style={{ textAlign: 'left', padding: 28, borderRadius: 20, cursor: lab.status === 'live' ? 'pointer' : 'default', width: '100%', position: 'relative', opacity: lab.status === 'live' ? 1 : 0.6 }}
            >
              {/* Tier badge */}
              <span style={{
                position: 'absolute', top: 16, right: 16, fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', fontWeight: 700, zIndex: 1,
                padding: '3px 8px', borderRadius: 100,
                background: lab.tier === 'advanced' ? 'rgba(245,185,66,0.12)' : lab.tier === 'intermediate' ? 'rgba(124,140,255,0.12)' : 'rgba(52,211,153,0.12)',
                color: lab.tier === 'advanced' ? T.gold : lab.tier === 'intermediate' ? T.cyan : T.green,
                border: `1px solid ${lab.tier === 'advanced' ? 'rgba(245,185,66,0.25)' : lab.tier === 'intermediate' ? 'rgba(124,140,255,0.25)' : 'rgba(52,211,153,0.25)'}`,
              }}>{lab.tier.toUpperCase()}</span>

              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 18,
                background: 'rgba(245,185,66,0.08)', border: '1px solid rgba(245,185,66,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                marginBottom: 20,
              }}>{lab.icon}</div>

              {/* Class tags */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {lab.classLevel.map(c => (
                  <span key={c} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.border}`, color: T.text3 }}>Class {c}</span>
                ))}
              </div>

              <h3 style={{ fontSize: 20, marginBottom: 10, fontWeight: 600, position: 'relative', zIndex: 1 }}>{lab.title}</h3>
              <p style={{ fontSize: 14, color: T.text2, lineHeight: 1.65, marginBottom: 18, position: 'relative', zIndex: 1 }}>{lab.desc}</p>

              {/* Features */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                {lab.features.slice(0, 4).map((f, i) => (
                  <span key={i} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, color: T.text3, fontFamily: 'var(--font-mono)' }}>{f}</span>
                ))}
              </div>

              <span style={{ fontSize: 13, fontWeight: 600, color: lab.status === 'live' ? T.gold2 : T.text3, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em', position: 'relative', zIndex: 1 }}>
                {lab.status === 'live' ? 'Open Lab →' : 'Coming Soon'}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: T.text3 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16 }}>No labs match this filter. Try a different category or class.</p>
          </div>
        )}

        {/* Sources */}
        <div style={{ marginTop: 48, padding: 20, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: T.text3, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Trusted Sources</div>
          <div style={{ display: 'flex', gap: '8px 20px', flexWrap: 'wrap', fontSize: 13, color: T.text2 }}>
            {['RBI', 'SEBI', 'IRDAI', 'GST Council', 'NPCI', 'Income Tax Dept', 'NSE', 'BSE', 'AMFI', 'NISM', 'PFRDA', 'IBA', 'NCERT'].map((s, i) => (
              <span key={i}>• {s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
