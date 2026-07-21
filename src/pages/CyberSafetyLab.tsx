import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

const T = { void: '#07111F', gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', coral: '#FF6B6B', ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)', line: 'rgba(255,255,255,0.09)' };
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const card: React.CSSProperties = { background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.line}`, borderRadius: 18, padding: 24, marginBottom: 16 };

interface Scenario { id: number; title: string; situation: string; options: { text: string; safe: boolean; explanation: string }[]; category: string; source: string }

const scenarios: Scenario[] = [
  { id: 1, title: 'UPI Payment Request', category: 'UPI Fraud', situation: 'You listed a second-hand phone for sale online. A buyer says: "I am sending you ₹8,000. Please enter your UPI PIN to receive the payment."', options: [
    { text: 'Enter my UPI PIN to receive the money', safe: false, explanation: 'SCAM! You NEVER need to enter UPI PIN to receive money. Entering PIN means YOU are paying. The buyer sent a "Collect Request" which debits your account. (Source: NPCI)' },
    { text: 'Refuse and ask them to send money directly to my UPI ID', safe: true, explanation: 'Correct! To receive money, you only need to share your UPI ID or QR code. You never enter PIN to receive. Always verify that the notification says "Received" not "Pay". (Source: NPCI UPI Guidelines)' },
    { text: 'Share my bank account password instead', safe: false, explanation: 'NEVER share any banking credentials. No bank or payment app will ever ask for your password, PIN, or OTP via call/message. (Source: RBI)' },
  ], source: 'NPCI UPI Guidelines' },
  { id: 2, title: 'Suspicious QR Code', category: 'QR Scam', situation: 'A street vendor shows you a QR code and says "Scan this QR code and I will send ₹500 to your account as cashback." You scan it and it shows "Pay ₹500 to Vendor."', options: [
    { text: 'Enter my PIN because they promised cashback', safe: false, explanation: 'SCAM! QR codes are for PAYING, never receiving. Scanning a QR and entering PIN means you are sending money to them. No legitimate cashback works this way. (Source: NPCI)' },
    { text: 'Cancel immediately and do not enter PIN', safe: true, explanation: 'Correct! QR codes always trigger payment FROM you. To receive money, someone scans YOUR QR or sends to your UPI ID. If a QR asks you to pay when you expect to receive, it is a scam. (Source: NPCI)' },
    { text: 'Ask them to send a smaller amount first to test', safe: false, explanation: 'There is no "test" for QR payments. Any QR scan + PIN entry = money leaving your account. Cancel the transaction entirely. (Source: RBI Cyber Safety)' },
  ], source: 'NPCI, RBI' },
  { id: 3, title: 'OTP Phone Call', category: 'OTP Fraud', situation: 'You receive a call: "This is SBI customer care. Your account will be blocked in 24 hours. Please share the OTP we just sent to verify your identity and prevent blocking."', options: [
    { text: 'Share the OTP to save my account', safe: false, explanation: 'SCAM! No bank ever calls to ask for OTP. OTP is a one-time password meant only for YOUR transactions. Sharing it gives scammers access to your account. (Source: RBI)' },
    { text: 'Hang up and call the official bank number from their website', safe: true, explanation: 'Correct! Banks never ask for OTP, PIN, or passwords over phone. If concerned, call the number printed on your debit card or from the official bank website. Never use numbers from SMS or the caller. (Source: RBI Master Direction on Cyber Security)' },
    { text: 'Ask the caller to prove they are from the bank', safe: false, explanation: 'Scammers can fake caller IDs and provide partial account details. No amount of "proof" makes it safe to share OTP. The only safe action is to hang up. (Source: RBI)' },
  ], source: 'RBI Master Direction' },
  { id: 4, title: 'Phishing Email', category: 'Phishing', situation: 'You receive an email: "Dear Customer, your HDFC Bank account has been compromised. Click here to update your password immediately: hdfc-bank-secure-update.com/login"', options: [
    { text: 'Click the link and update my password', safe: false, explanation: 'SCAM! The URL "hdfc-bank-secure-update.com" is fake. Real HDFC Bank URL is hdfcbank.com. Phishing sites look identical to real ones but steal your credentials. (Source: CERT-In)' },
    { text: 'Ignore the email and go directly to hdfcbank.com', safe: true, explanation: 'Correct! Always access your bank by typing the official URL directly or using the official app. Never click links in emails or SMS about account issues. Bookmark your bank website. (Source: CERT-In, RBI)' },
    { text: 'Reply asking if this is real', safe: false, explanation: 'Replying confirms your email is active and you may receive more scam attempts. Never engage with suspicious emails. Report them to your bank. (Source: CERT-In)' },
  ], source: 'CERT-In, RBI' },
  { id: 5, title: 'Fake Investment App', category: 'Investment Fraud', situation: 'A friend shares a link to "CryptoGains India" app promising "guaranteed 20% monthly returns" with screenshots of their profits. They earn ₹500 for every person they refer.', options: [
    { text: 'Download and invest ₹5,000 to test it', safe: false, explanation: 'SCAM! No legitimate investment guarantees 20% monthly (240% annual). Even the best performing funds average 12-15% annually. Referral bonuses are classic Ponzi scheme signs. (Source: SEBI Investor Education)' },
    { text: 'Check if the app is SEBI-registered before investing', safe: true, explanation: 'Correct! Verify any investment platform on sebi.gov.in. No legitimate investment guarantees returns. If it sounds too good to be true, it is. Real market returns average 10-15% annually. (Source: SEBI)' },
    { text: 'Invest because my friend is already earning', safe: false, explanation: 'Ponzi schemes pay early investors using new investors money. Your friend may be earning now but will lose everything when it collapses. Report to SEBI/cybercrime.gov.in. (Source: SEBI)' },
  ], source: 'SEBI Investor Education' },
];

export default function CyberSafetyLab() {
  const { navigate } = useNavigation();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = scenarios[currentIdx];
  const total = scenarios.length;

  const handleSelect = (idx: number) => { if (!answered) setSelected(idx); };
  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);
    if (scenario.options[selected].safe) setScore(s => s + 1);
  };
  const handleNext = () => {
    if (currentIdx < total - 1) { setCurrentIdx(c => c + 1); setSelected(null); setAnswered(false); }
    else setCompleted(true);
  };

  if (completed) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 60;
    return (
      <section style={{ padding: '120px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>{passed ? '🛡️' : '📚'}</div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 16 }}>{passed ? 'Cyber Safety Expert!' : 'Keep Learning!'}</h1>
          <p style={{ fontSize: 18, color: T.ink70, marginBottom: 32 }}>Score: <span style={{ color: passed ? T.green : T.coral, fontWeight: 700 }}>{score}/{total}</span> ({pct}%)</p>
          {passed && <div style={{ padding: 14, borderRadius: 12, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', marginBottom: 24, display: 'inline-block' }}><span style={{ ...M, fontSize: 12, color: T.green }}>🏆 Badge: Cyber Guardian</span></div>}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => { setCurrentIdx(0); setSelected(null); setAnswered(false); setScore(0); setCompleted(false); }} style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: 'rgba(255,255,255,0.04)', color: T.ink100, border: `1px solid ${T.line}`, cursor: 'pointer' }}>Try Again</button>
            <button onClick={() => navigate('labs-dashboard')} style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer' }}>Back to Labs</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '120px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
        <button onClick={() => navigate('labs-dashboard')} style={{ fontSize: 13, color: T.ink45, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6, ...M }}>← Back to Dashboard</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(245,185,66,0.10)', border: '1px solid rgba(245,185,66,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🔐</div>
          <div>
            <span style={{ ...M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink45 }}>CYBER SAFETY LAB</span>
            <h1 style={{ fontSize: 'clamp(22px,3.5vw,32px)', marginTop: 4 }}>Digital Payments & Cyber Safety</h1>
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11, ...M, color: T.ink45 }}>
          <span>Scenario {currentIdx + 1} of {total}</span>
          <span>Score: {score}</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 32 }}>
          <div style={{ height: '100%', width: `${((currentIdx + 1) / total) * 100}%`, background: `linear-gradient(90deg,${T.gold},${T.gold2})`, borderRadius: 2, transition: 'width .4s' }} />
        </div>

        {/* Scenario */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 10, ...M, padding: '4px 10px', borderRadius: 100, background: 'rgba(255,107,107,0.12)', color: T.coral, border: '1px solid rgba(255,107,107,0.25)', fontWeight: 700 }}>{scenario.category.toUpperCase()}</span>
          </div>
          <h2 style={{ fontSize: 20, marginBottom: 16, fontWeight: 600 }}>{scenario.title}</h2>
          <div style={{ padding: 20, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.line}`, marginBottom: 24 }}>
            <p style={{ fontSize: 15, color: T.ink70, lineHeight: 1.75 }}>{scenario.situation}</p>
          </div>

          <div style={{ fontSize: 13, color: T.ink45, marginBottom: 16, fontWeight: 600 }}>What would you do?</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {scenario.options.map((opt, idx) => {
              let bg = 'rgba(255,255,255,0.03)';
              let border = T.line;
              let color = T.ink100;
              if (answered) {
                if (opt.safe) { bg = 'rgba(52,211,153,0.08)'; border = 'rgba(52,211,153,0.3)'; color = T.green; }
                else if (idx === selected) { bg = 'rgba(255,107,107,0.08)'; border = 'rgba(255,107,107,0.3)'; color = T.coral; }
              } else if (idx === selected) { bg = 'rgba(245,185,66,0.08)'; border = 'rgba(245,185,66,0.3)'; color = T.gold2; }
              return (
                <button key={idx} onClick={() => handleSelect(idx)} disabled={answered} style={{
                  padding: '16px 20px', borderRadius: 14, textAlign: 'left', background: bg,
                  border: `1px solid ${border}`, color, fontSize: 14, cursor: answered ? 'default' : 'pointer',
                  transition: 'all .2s', lineHeight: 1.6,
                }}>{opt.text}</button>
              );
            })}
          </div>

          {answered && selected !== null && (
            <div style={{ marginTop: 20, padding: 18, borderRadius: 14, background: scenario.options[selected].safe ? 'rgba(52,211,153,0.06)' : 'rgba(255,107,107,0.06)', border: `1px solid ${scenario.options[selected].safe ? 'rgba(52,211,153,0.2)' : 'rgba(255,107,107,0.2)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>{scenario.options[selected].safe ? '✅' : '❌'}</span>
                <span style={{ fontWeight: 600, color: scenario.options[selected].safe ? T.green : T.coral, fontSize: 15 }}>{scenario.options[selected].safe ? 'Safe Choice!' : 'Dangerous Choice!'}</span>
              </div>
              <p style={{ fontSize: 14, color: T.ink70, lineHeight: 1.7 }}>{scenario.options[selected].explanation}</p>
              <div style={{ fontSize: 10, color: T.ink45, marginTop: 10, ...M }}>Source: {scenario.source}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
          {!answered ? (
            <button onClick={handleSubmit} disabled={selected === null} style={{ padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: selected === null ? 'default' : 'pointer', opacity: selected === null ? 0.5 : 1 }}>Submit Answer</button>
          ) : (
            <button onClick={handleNext} style={{ padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer' }}>
              {currentIdx < total - 1 ? 'Next Scenario →' : 'See Results'}
            </button>
          )}
        </div>

        <div style={{ fontSize: 10, color: T.ink45, marginTop: 32, ...M }}>Sources: NPCI UPI Guidelines · RBI Cyber Security Framework · CERT-In · SEBI Investor Education · cybercrime.gov.in</div>
      </div>
    </section>
  );
}
