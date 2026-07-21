import type { Module } from '../data/modules';
import Overlay from './Overlay';
import { ModuleIcon } from './Icons';

const T = { blue: '#3D5CFF', cyan: '#7C8CFF', green: '#34D399', gold: '#F5B942', gold2: '#FFD37A', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B', void: '#07111F' };

interface Props { module: Module | null; onClose: () => void; }

export default function ModuleOverlay({ module, onClose }: Props) {
  if (!module) return null;
  return (
    <Overlay active={!!module} onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${T.blue}15`, border: `1px solid ${T.blue}20`, color: T.cyan, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ModuleIcon type={module.icon} size={24} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.text3 }}>
          Module {module.number} · {module.difficulty}
        </span>
      </div>

      {module.isPremium && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 10, color: T.gold, background: `${T.gold}12`, border: `1px solid ${T.gold}20`, padding: '4px 10px', borderRadius: 6, marginBottom: 16, letterSpacing: '0.06em' }}>PREMIUM MODULE</span>
      )}

      <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 14, letterSpacing: '-0.03em' }}>{module.title}</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 560, marginBottom: 32, lineHeight: 1.7 }}>{module.description}</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
        {[
          { label: `${module.lessonsCount} Lessons` },
          { label: module.xp },
          { label: module.duration },
        ].map((c, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.text2, background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, padding: '8px 14px', borderRadius: 8 }}>{c.label}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: T.border, border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 36 }}>
        {module.lessons.map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 20px', background: '#050505' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.cyan, width: 22, flexShrink: 0, paddingTop: 1 }}>{l.num}</span>
            <div>
              <h4 style={{ fontSize: 14, color: T.text, marginBottom: 3, fontWeight: 600 }}>{l.title}</h4>
              <p style={{ fontSize: 13, color: T.text3, lineHeight: 1.5 }}>{l.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <a href={module.ctaUrl} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '14px 28px', borderRadius: 12, fontWeight: 500, fontSize: 14,
        background: T.blue, color: '#fff',
        boxShadow: `0 0 0 1px ${T.blue}60, 0 4px 20px ${T.blue}30`,
        textDecoration: 'none', transition: 'all .3s',
      }}>
        {module.ctaText}
      </a>
    </Overlay>
  );
}
