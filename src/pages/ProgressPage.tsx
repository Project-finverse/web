import { useNavigation } from '../context/NavigationContext';
import { useProgress } from '../context/ProgressContext';

const T = { blue: '#3D5CFF', cyan: '#7C8CFF', green: '#34D399', gold: '#F5B942', gold2: '#FFD37A', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B' };

export default function ProgressPage() {
  const { navigate } = useNavigation();
  const { progress, overallPercent, resetProgress } = useProgress();

  return (
    <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gold2, background: 'rgba(245,185,66,0.09)', border: '1px solid rgba(245,185,66,0.22)', padding: '6px 14px', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>📊 Your Dashboard</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', marginBottom: 12, letterSpacing: '-0.01em' }}>Learning Progress</h1>
          <p style={{ fontSize: 17, color: T.text2, lineHeight: 1.6 }}>Track your journey to financial mastery. Your progress is saved automatically.</p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔥', val: `${progress.streak}`, lbl: 'Day Streak', color: '#FF6B6B' },
            { icon: '⚡', val: `${progress.xp}`, lbl: 'Total XP', color: T.gold2 },
            { icon: '📖', val: `${progress.completedLessons.length}`, lbl: 'Lessons Done', color: T.cyan },
            { icon: '🏆', val: `${progress.completedModules.length}`, lbl: 'Modules Done', color: T.green },
          ].map((s, i) => (
            <div key={i} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: T.text, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: T.text3, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.lbl}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="dash-grid-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
          {/* Left — Progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <h3 style={{ fontSize: 18, marginBottom: 20, fontWeight: 600 }}>Overall Progress</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12, fontFamily: 'var(--font-mono)', color: T.text3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <span>Course Completion</span><span>{overallPercent}%</span>
              </div>
              <div style={{ height: 10, borderRadius: 100, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 28 }}>
                <div style={{ height: '100%', width: `${overallPercent}%`, background: `linear-gradient(90deg, ${T.gold}, ${T.gold2})`, borderRadius: 100, transition: 'width .6s cubic-bezier(.19,.8,.2,1)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <div style={{ textAlign: 'center', padding: '14px 0', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: T.text, fontFamily: 'var(--font-display)' }}>{progress.completedLessons.length}</div>
                  <div style={{ fontSize: 11, color: T.text3, marginTop: 3, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Lessons</div>
                </div>
                <div style={{ textAlign: 'center', padding: '14px 0', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: T.text, fontFamily: 'var(--font-display)' }}>{progress.completedQuizzes.length}</div>
                  <div style={{ fontSize: 11, color: T.text3, marginTop: 3, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quizzes</div>
                </div>
                <div style={{ textAlign: 'center', padding: '14px 0', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: T.text, fontFamily: 'var(--font-display)' }}>{progress.badges.length}</div>
                  <div style={{ fontSize: 11, color: T.text3, marginTop: 3, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Badges</div>
                </div>
              </div>

              {progress.completedLessons.length === 0 && (
                <p style={{ fontSize: 13.5, color: T.text3, marginTop: 24, fontStyle: 'italic', textAlign: 'center' }}>
                  Start a lesson to see your progress here. Your data saves automatically.
                </p>
              )}
            </div>

            {/* Continue Learning */}
            <div style={{ background: `linear-gradient(135deg, rgba(61,92,255,0.12), rgba(124,140,255,0.05))`, border: '1px solid rgba(124,140,255,0.2)', borderRadius: 20, padding: 28 }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: T.text3, marginBottom: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Continue Learning</div>
              <h4 style={{ fontSize: 20, marginBottom: 16, fontWeight: 600 }}>Pick up where you left off</h4>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('learn')} style={{ padding: '12px 24px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: `linear-gradient(135deg, ${T.gold2}, ${T.gold})`, color: '#07111F', border: 'none', cursor: 'pointer' }}>Choose a Class</button>
                <button onClick={() => navigate('labs')} style={{ padding: '12px 24px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'rgba(255,255,255,0.04)', color: T.text, border: '1px solid rgba(255,255,255,0.16)', cursor: 'pointer' }}>Experience Center</button>
              </div>
            </div>
          </div>

          {/* Right — Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <h3 style={{ fontSize: 18, marginBottom: 20, fontWeight: 600 }}>Achievement System</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { ic: '💰', title: 'Budget Master', desc: 'Create first budget', earned: progress.badges.includes('budget_master') },
                  { ic: '📈', title: 'Growth Analyst', desc: 'Run compound sim', earned: progress.badges.includes('growth_analyst') },
                  { ic: '🏦', title: 'Loan Expert', desc: 'Complete EMI analysis', earned: progress.badges.includes('loan_expert') },
                  { ic: '🎯', title: 'Goal Setter', desc: 'Set savings target', earned: progress.badges.includes('goal_setter') },
                  { ic: '📊', title: 'Market Watcher', desc: 'Complete investing module', earned: progress.badges.includes('market_watcher') },
                  { ic: '🛡️', title: 'Cyber Guardian', desc: 'Pass cyber safety quiz', earned: progress.badges.includes('cyber_guardian') },
                ].map((b, i) => (
                  <div key={i} style={{
                    background: b.earned ? 'rgba(245,185,66,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${b.earned ? 'rgba(245,185,66,0.25)' : T.border}`,
                    borderRadius: 14, padding: 18, textAlign: 'center',
                    opacity: b.earned ? 1 : 0.5,
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{b.ic}</div>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 3 }}>{b.title}</h4>
                    <p style={{ fontSize: 11, color: T.text3 }}>{b.earned ? '✓ Earned' : b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset */}
            <div style={{ textAlign: 'center', padding: 16 }}>
              <button onClick={resetProgress} style={{ fontSize: 12, color: T.text3, cursor: 'pointer', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF6B6B'}
                onMouseLeave={e => e.currentTarget.style.color = T.text3}
              >Reset All Progress</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
