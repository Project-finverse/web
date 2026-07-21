import { modules } from '../data/modules';
import { lessonContents } from '../data/lessons';
import { useNavigation } from '../context/NavigationContext';
import { ChevronRight } from '../components/Icons';

const T = { blue: '#3D5CFF', cyan: '#7C8CFF', green: '#34D399', gold: '#F5B942', gold2: '#FFD37A', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B' };
const btn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, fontWeight: 500, fontSize: 14, background: T.blue, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: `0 0 0 1px ${T.blue}50, 0 4px 20px ${T.blue}25` };
const btnG: React.CSSProperties = { ...btn, background: 'transparent', color: T.text, border: `1px solid ${T.border}`, boxShadow: 'none' };

export default function LessonPage() {
  const { state, navigate } = useNavigation();
  const { moduleId, lessonIndex = 0 } = state;
  const module = modules.find(m => m.id === moduleId);
  const lessons = lessonContents[moduleId || ''] || [];
  const lesson = lessons[lessonIndex];

  if (!module || !lesson) {
    return (
      <section style={{ padding: '140px 0 80px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px' }}>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Content Coming Soon</h1>
          <p style={{ color: T.text2, marginBottom: 24 }}>This lesson is being prepared with verified content from RBI, SEBI, and NCFE sources.</p>
          <button onClick={() => navigate('modules')} style={btnG}>← Back to Modules</button>
        </div>
      </section>
    );
  }

  const isLast = lessonIndex >= lessons.length - 1;
  const progress = ((lessonIndex + 1) / lessons.length) * 100;

  return (
    <section style={{ padding: '120px 0 80px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 12, fontFamily: 'var(--font-mono)', color: T.text3, letterSpacing: '0.04em' }}>
          <button onClick={() => navigate('modules')} style={{ color: T.text3, cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}>Modules</button>
          <ChevronRight size={10} />
          <span style={{ color: T.cyan }}>{module.title}</span>
          <ChevronRight size={10} />
          <span>Lesson {lessonIndex + 1}</span>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11, fontFamily: 'var(--font-mono)', color: T.text3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span>Lesson {lessonIndex + 1} of {lessons.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${T.blue}, ${T.cyan})`, borderRadius: 2, transition: 'width .5s', boxShadow: `0 0 12px ${T.blue}50` }} />
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', borderRadius: 6, background: `${T.blue}12`, color: T.cyan, letterSpacing: '0.06em' }}>⏱ {lesson.duration}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', borderRadius: 6, background: `${T.green}12`, color: T.green, letterSpacing: '0.06em' }}>+{lesson.xp} XP</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-0.03em' }}>{lesson.title}</h1>
        </div>

        {/* Content */}
        {lesson.sections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, marginBottom: 16, fontWeight: 600, letterSpacing: '-0.02em' }}>{section.heading}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: 20 }}>{section.content}</p>

            {section.example && (
              <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: T.cyan, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Example</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {section.example.map((ex, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, padding: '8px 0', borderBottom: i < section.example!.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                      <span style={{ color: T.text2 }}>{ex.label}</span>
                      <span style={{ color: T.text, fontFamily: 'var(--font-mono)', fontSize: 13 }}>{ex.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section.tip && (
              <div style={{ background: `${T.blue}08`, border: `1px solid ${T.blue}15`, borderRadius: 12, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>💡</span>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0 }}>{section.tip}</p>
              </div>
            )}
          </div>
        ))}

        {/* Key Takeaways */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, borderRadius: 16, padding: 28, marginBottom: 48 }}>
          <h3 style={{ fontSize: 17, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
            <span>🎯</span> Key Takeaways
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {lesson.keyTakeaways.map((t, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                <span style={{ color: T.green, fontSize: 13, marginTop: 2, flexShrink: 0 }}>✓</span>{t}
              </li>
            ))}
          </ul>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          {lessonIndex > 0 && <button onClick={() => navigate('lesson', moduleId, lessonIndex - 1)} style={btnG}>← Previous</button>}
          <div style={{ flex: 1 }} />
          {isLast ? (
            <button onClick={() => navigate('quiz', moduleId)} style={btn}>Take Quiz →</button>
          ) : (
            <button onClick={() => navigate('lesson', moduleId, lessonIndex + 1)} style={btn}>Next Lesson →</button>
          )}
        </div>
      </div>
    </section>
  );
}
