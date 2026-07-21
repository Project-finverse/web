import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

const T = { blue: '#3D5CFF', cyan: '#7C8CFF', green: '#34D399', gold: '#F5B942', gold2: '#FFD37A', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, color: T.text, fontSize: 14, outline: 'none', transition: 'border-color .2s', fontFamily: 'inherit' };

export default function ContactPage() {
  const { navigate } = useNavigation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' });

  if (submitted) {
    return (
      <section style={{ padding: '140px 0 80px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '60px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>✓</div>
          <h1 style={{ fontSize: 28, marginBottom: 16 }}>Message Sent</h1>
          <p style={{ fontSize: 15, color: T.text2, marginBottom: 32, lineHeight: 1.7 }}>We'll respond within 24–48 hours.</p>
          <button onClick={() => navigate('home')} style={{ padding: '14px 28px', borderRadius: 12, fontWeight: 500, fontSize: 14, background: T.blue, color: '#fff', border: 'none', cursor: 'pointer' }}>Back to Home</button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 64px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.text3, paddingBottom: 32 }}>Contact</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,44px)', marginBottom: 16, letterSpacing: '-0.03em' }}>Get in Touch</h1>
          <p style={{ fontSize: 16, color: T.text2, lineHeight: 1.7 }}>Questions, feedback, or partnership inquiries — we'd love to hear from you.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 32 }}>
          <div>
            <h3 style={{ fontSize: 18, marginBottom: 28, fontWeight: 600 }}>Quick Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: '📧', label: 'Email', value: 'hello@finverse.in', color: T.cyan },
                { icon: '📱', label: 'Social', value: '@finverse_in', color: T.blue },
                { icon: '🕐', label: 'Response', value: 'Within 24–48 hours', color: T.green },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: `${c.color}10`, border: `1px solid ${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: T.text3, marginBottom: 3, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{c.label}</div>
                    <div style={{ fontSize: 14, color: T.text }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, marginTop: 32 }}>
              <h4 style={{ fontSize: 15, marginBottom: 16, fontWeight: 600 }}>Topics</h4>
              {['🎓 Student Support', '🏫 School Partnerships', '💼 Corporate Training', '💡 Feature Requests'].map((t, i) => (
                <div key={i} style={{ fontSize: 13.5, color: T.text2, padding: '8px 0', borderBottom: i < 3 ? `1px solid ${T.border}` : 'none' }}>{t}</div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}`, borderRadius: 20, padding: 36 }}>
            <h3 style={{ fontSize: 18, marginBottom: 28, fontWeight: 600 }}>Send a Message</h3>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, color: T.text3, marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Name</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = `${T.blue}60`} onBlur={e => e.currentTarget.style.borderColor = T.border} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, color: T.text3, marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = `${T.blue}60`} onBlur={e => e.currentTarget.style.borderColor = T.border} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, color: T.text3, marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Subject</label>
                <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={{...inputStyle, appearance: 'none' as any}}>
                  {['General Inquiry', 'Student Support', 'School Partnership', 'Feedback', 'Bug Report'].map(o => <option key={o} value={o} style={{background: '#050505'}}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, color: T.text3, marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Message</label>
                <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="How can we help?" rows={5} style={{...inputStyle, resize: 'vertical', minHeight: 120}} onFocus={e => e.currentTarget.style.borderColor = `${T.blue}60`} onBlur={e => e.currentTarget.style.borderColor = T.border} />
              </div>
              <button type="submit" style={{ width: '100%', padding: 16, borderRadius: 12, fontSize: 14, fontWeight: 500, background: T.blue, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: `0 4px 20px ${T.blue}30`, marginTop: 8 }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
