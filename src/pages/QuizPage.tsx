import { useState } from 'react';
import { modules } from '../data/modules';
import { quizzes } from '../data/quizzes';
import { useNavigation } from '../context/NavigationContext';

const T = { blue: '#3D5CFF', cyan: '#7C8CFF', green: '#34D399', gold: '#F5B942', gold2: '#FFD37A', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B', void: '#07111F' };
const btn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, fontWeight: 500, fontSize: 14, background: T.blue, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: `0 0 0 1px ${T.blue}50, 0 4px 20px ${T.blue}25` };
const btnG: React.CSSProperties = { ...btn, background: 'transparent', color: T.text, border: `1px solid ${T.border}`, boxShadow: 'none' };

export default function QuizPage() {
  const { state, navigate } = useNavigation();
  const module = modules.find(m => m.id === state.moduleId);
  const quiz = quizzes[state.moduleId || ''];
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!module || !quiz) {
    return (
      <section style={{ padding: '140px 0 80px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px' }}>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Quiz Not Available</h1>
          <button onClick={() => navigate('modules')} style={btnG}>← Back to Modules</button>
        </div>
      </section>
    );
  }

  const question = quiz.questions[currentQ];
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;
  const handleSelect = (idx: number) => { if (!answered) setSelected(idx); };
  const handleSubmit = () => { if (selected === null) return; setAnswered(true); if (selected === question.correct) setScore(s => s + 1); };
  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) { setCurrentQ(c => c + 1); setSelected(null); setAnswered(false); }
    else setCompleted(true);
  };

  if (completed) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    const passed = pct >= 70;
    return (
      <section style={{ padding: '140px 0 80px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>{passed ? '🏆' : '📚'}</div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 16, letterSpacing: '-0.03em' }}>{passed ? 'Module Complete' : 'Keep Going'}</h1>
          <p style={{ fontSize: 18, color: T.text2, marginBottom: 32 }}>
            Score: <span style={{ color: passed ? T.green : '#FF6B6B', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{score}/{quiz.questions.length}</span> ({pct}%)
          </p>
          {passed && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, borderRadius: 20, padding: 32, marginBottom: 40 }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🏅</div>
              <h3 style={{ fontSize: 20, marginBottom: 6 }}>Badge Unlocked</h3>
              <p style={{ fontSize: 14, color: T.text3, marginBottom: 12 }}>{module.title} Master</p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: T.green }}>+{module.xp} XP</div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('lesson', state.moduleId, 0)} style={btnG}>Review Lessons</button>
            {passed ? <button onClick={() => navigate('modules')} style={btn}>Continue →</button>
              : <button onClick={() => { setCurrentQ(0); setSelected(null); setAnswered(false); setScore(0); setCompleted(false); }} style={btn}>Retry</button>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '120px 0 80px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 660, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.text3, marginBottom: 8 }}>{module.title} — Knowledge Check</div>
        <h1 style={{ fontSize: 28, marginBottom: 32, letterSpacing: '-0.03em' }}>Question {currentQ + 1} of {quiz.questions.length}</h1>

        {/* Progress */}
        <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 40 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${T.blue}, ${T.cyan})`, borderRadius: 2, transition: 'width .3s', boxShadow: `0 0 10px ${T.blue}40` }} />
        </div>

        {/* Question */}
        <div style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}`, borderRadius: 18, padding: 32, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, marginBottom: 28, lineHeight: 1.6, fontWeight: 500 }}>{question.question}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {question.options.map((opt, idx) => {
              let bg = 'rgba(255,255,255,0.03)';
              let border = T.border;
              let color = 'rgba(255,255,255,0.8)';
              if (answered) {
                if (idx === question.correct) { bg = `${T.green}12`; border = `${T.green}40`; color = T.green; }
                else if (idx === selected) { bg = '#FF6B6B12'; border = '#FF6B6B40'; color = '#FF6B6B'; }
              } else if (idx === selected) { bg = `${T.blue}12`; border = `${T.blue}40`; color = T.cyan; }
              return (
                <button key={idx} onClick={() => handleSelect(idx)} disabled={answered} style={{
                  padding: '16px 20px', borderRadius: 12, textAlign: 'left', background: bg,
                  border: `1px solid ${border}`, color, fontSize: 14, cursor: answered ? 'default' : 'pointer',
                  transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 14, lineHeight: 1.5,
                }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', fontFamily: 'var(--font-mono)', fontSize: 12, flexShrink: 0 }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && (
            <div style={{ marginTop: 24, padding: 18, borderRadius: 12, background: selected === question.correct ? `${T.green}08` : '#FF6B6B08', border: `1px solid ${selected === question.correct ? `${T.green}20` : '#FF6B6B20'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span>{selected === question.correct ? '✅' : '❌'}</span>
                <span style={{ fontWeight: 600, color: selected === question.correct ? T.green : '#FF6B6B', fontSize: 14 }}>{selected === question.correct ? 'Correct' : 'Incorrect'}</span>
              </div>
              <p style={{ fontSize: 13.5, color: T.text2, lineHeight: 1.65 }}>{question.explanation}</p>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          {!answered ? <button onClick={handleSubmit} disabled={selected === null} style={{ ...btn, opacity: selected === null ? 0.4 : 1 }}>Submit</button>
            : <button onClick={handleNext} style={btn}>{currentQ < quiz.questions.length - 1 ? 'Next →' : 'Results'}</button>}
        </div>
      </div>
    </section>
  );
}
