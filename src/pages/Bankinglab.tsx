import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { inr } from '../helpers/format';

const T = { void: '#07111F', gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', blue: '#3D5CFF', cyan: '#7C8CFF', coral: '#FF6B6B', ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)', line: 'rgba(255,255,255,0.09)', panel: '#0F1C3B' };
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const lbl: React.CSSProperties = { display: 'block', fontSize: 11, color: T.ink45, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', ...M };
const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.line}`, borderRadius: 12, padding: '13px 14px', color: T.ink100, fontSize: 15, ...M, outline: 'none' };
// select style available for future use
void 0;
const card: React.CSSProperties = { background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.line}`, borderRadius: 18, padding: 24, marginBottom: 16 };
const aiBox: React.CSSProperties = { fontSize: 13, color: T.ink70, background: 'rgba(245,185,66,0.06)', border: '1px solid rgba(245,185,66,0.18)', borderRadius: 14, padding: '16px 18px', lineHeight: 1.7, marginTop: 16 };

const STEPS = ['Account Type', 'KYC Details', 'Banking Setup', 'UPI & Cards', 'Bank Comparison', 'Summary'];

const bankData = [
  { name: 'SBI', savings: '2.70%', minBal: '₹1,000–3,000', debit: 'RuPay/Visa', fd: '6.50–7.10%', rd: '6.50–7.10%', student: true, zero: true, src: 'sbi.co.in' },
  { name: 'HDFC', savings: '3.00%', minBal: '₹10,000', debit: 'Visa/MC', fd: '6.60–7.25%', rd: '6.60–7.25%', student: true, zero: false, src: 'hdfcbank.com' },
  { name: 'ICICI', savings: '3.00%', minBal: '₹10,000', debit: 'Visa/MC', fd: '6.70–7.20%', rd: '6.70–7.20%', student: true, zero: false, src: 'icicibank.com' },
  { name: 'Axis', savings: '3.00%', minBal: '₹10,000', debit: 'Visa/MC/RuPay', fd: '6.70–7.25%', rd: '6.70–7.25%', student: true, zero: false, src: 'axisbank.com' },
  { name: 'BoB', savings: '2.75%', minBal: '₹1,000', debit: 'RuPay/Visa', fd: '6.50–7.15%', rd: '6.50–7.15%', student: true, zero: true, src: 'bankofbaroda.in' },
  { name: 'PNB', savings: '2.70%', minBal: '₹1,000–2,000', debit: 'RuPay/Visa', fd: '6.50–7.05%', rd: '6.50–7.05%', student: true, zero: true, src: 'pnbindia.in' },
  { name: 'Canara', savings: '2.90%', minBal: '₹1,000', debit: 'RuPay/Visa', fd: '6.50–7.15%', rd: '6.50–7.15%', student: true, zero: true, src: 'canarabank.com' },
];

export default function BankingLab() {
  const { navigate } = useNavigation();
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Step 0 — Account Type
  const [accType, setAccType] = useState('savings');
  const [isMinor, setIsMinor] = useState(true);

  // Step 1 — KYC
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [pan, setPan] = useState('');
  const [address, setAddress] = useState('');
  const [kycDone, setKycDone] = useState(false);

  // Step 2 — Banking Setup
  const [netBanking, setNetBanking] = useState(false);
  const [mobileBanking, setMobileBanking] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);

  // Step 3 — UPI
  const [upiId, setUpiId] = useState('');
  const [upiPinSet, setUpiPinSet] = useState(false);
  const [debitCardActive, setDebitCardActive] = useState(false);

  // Step 4 — Comparison
  const [compFilter, setCompFilter] = useState('all');

  // Transactions (mock)
  const [balance] = useState(25000);
  const transactions = [
    { date: '15 Jun', desc: 'Initial Deposit', amt: 25000, type: 'credit' },
    { date: '16 Jun', desc: 'UPI - Grocery Store', amt: -450, type: 'debit' },
    { date: '17 Jun', desc: 'UPI - Friend Transfer', amt: -1000, type: 'debit' },
    { date: '18 Jun', desc: 'Received from Parent', amt: 5000, type: 'credit' },
  ];

  const kycValid = name.length >= 2 && dob.length >= 8 && aadhaar.length >= 12;

  const filteredBanks = compFilter === 'all' ? bankData : compFilter === 'student' ? bankData.filter(b => b.student) : bankData.filter(b => b.zero);

  return (
    <section style={{ padding: '120px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <button onClick={() => navigate('labs-dashboard')} style={{ fontSize: 13, color: T.ink45, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6, ...M }}>← Back to Dashboard</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(245,185,66,0.10)', border: '1px solid rgba(245,185,66,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🏦</div>
          <div>
            <span style={{ ...M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink45 }}>BANKING LAB</span>
            <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', marginTop: 4 }}>Virtual Banking Experience</h1>
          </div>
        </div>
        <p style={{ fontSize: 15, color: T.ink70, marginBottom: 40, lineHeight: 1.7, maxWidth: 600 }}>
          Experience the complete banking workflow — from opening an account to UPI registration. All data is mock and educational. Source: RBI Financial Literacy guidelines.
        </p>

        {/* Progress */}
        {!completed && (
          <div style={{ display: 'flex', gap: 4, marginBottom: 40 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 4, borderRadius: 2, marginBottom: 8, background: i < step ? `linear-gradient(90deg,${T.gold},${T.gold2})` : i === step ? `linear-gradient(90deg,${T.blue},${T.cyan})` : 'rgba(255,255,255,0.06)', transition: 'background .4s' }} />
                <span style={{ fontSize: 10, ...M, color: i <= step ? T.ink100 : T.ink45, letterSpacing: '0.03em' }}>{s}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Step 0: Account Type ── */}
        {step === 0 && (
          <div style={card}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 20 }}>STEP 1 — CHOOSE ACCOUNT TYPE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12, marginBottom: 20 }}>
              {[
                { id: 'savings', title: 'Savings Account', desc: 'Earn interest on deposits. Most common for students.', icon: '💰' },
                { id: 'current', title: 'Current Account', desc: 'For businesses. No interest, unlimited transactions.', icon: '🏢' },
                { id: 'minor', title: 'Minor Account', desc: 'For under-18. Requires guardian. Limited features.', icon: '👦' },
              ].map(a => (
                <button key={a.id} onClick={() => setAccType(a.id)} style={{ ...card, marginBottom: 0, cursor: 'pointer', textAlign: 'left', background: accType === a.id ? 'rgba(245,185,66,0.06)' : card.background, border: accType === a.id ? '1px solid rgba(245,185,66,0.3)' : card.border }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{a.icon}</div>
                  <h4 style={{ fontSize: 15, marginBottom: 6, fontWeight: 600 }}>{a.title}</h4>
                  <p style={{ fontSize: 12, color: T.ink45, lineHeight: 1.5 }}>{a.desc}</p>
                </button>
              ))}
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.ink70, cursor: 'pointer' }}>
              <input type="checkbox" checked={isMinor} onChange={e => setIsMinor(e.target.checked)} style={{ accentColor: T.gold }} />
              I am under 18 years old
            </label>
            <div style={{ ...aiBox, marginTop: 20 }}>
              <div style={{ fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', marginBottom: 8 }}>🤖 AI INSIGHT</div>
              {isMinor ? 'As a minor, you can open a Minor Savings Account with a parent/guardian as joint holder. Full control transfers to you at 18 (RBI guidelines).' : 'A regular Savings Account earns 2.7-3.5% interest (varies by bank). RBI mandates quarterly interest crediting.'}
            </div>
          </div>
        )}

        {/* ── Step 1: KYC ── */}
        {step === 1 && (
          <div style={card}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 20 }}>STEP 2 — KYC VERIFICATION (Mock)</div>
            <p style={{ fontSize: 13, color: T.ink45, marginBottom: 20, lineHeight: 1.6 }}>KYC (Know Your Customer) is mandatory for all bank accounts per RBI Master Direction. This is a mock experience — no real data is collected.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
              <div><label style={lbl}>Full Name</label><input style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" /></div>
              <div><label style={lbl}>Date of Birth</label><input style={inp} type="date" value={dob} onChange={e => setDob(e.target.value)} /></div>
              <div><label style={lbl}>Aadhaar Number (Mock)</label><input style={inp} value={aadhaar} onChange={e => setAadhaar(e.target.value.replace(/\D/g,'').slice(0,12))} placeholder="1234 5678 9012" maxLength={12} /></div>
              <div><label style={lbl}>PAN (Mock)</label><input style={inp} value={pan} onChange={e => setPan(e.target.value.toUpperCase().slice(0,10))} placeholder="ABCDE1234F" maxLength={10} /></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={lbl}>Address</label><input style={inp} value={address} onChange={e => setAddress(e.target.value)} placeholder="Your address" /></div>
            </div>
            {!kycValid && name.length > 0 && (
              <div style={{ fontSize: 12, color: T.coral, marginTop: 12, ...M }}>Please fill Name, DOB, and 12-digit Aadhaar to proceed.</div>
            )}
            {kycValid && !kycDone && (
              <button onClick={() => setKycDone(true)} style={{ marginTop: 20, padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer' }}>
                ✓ Verify KYC (Mock)
              </button>
            )}
            {kycDone && (
              <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>✅</span>
                <span style={{ fontSize: 14, color: T.green, fontWeight: 600 }}>KYC Verified Successfully (Mock)</span>
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Banking Setup ── */}
        {step === 2 && (
          <div style={card}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 20 }}>STEP 3 — ACTIVATE BANKING SERVICES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Internet Banking', desc: 'Access your account via bank website. Check balance, transfer funds, pay bills.', checked: netBanking, set: setNetBanking, icon: '🌐' },
                { label: 'Mobile Banking', desc: 'Bank app on your phone. Most convenient for daily banking.', checked: mobileBanking, set: setMobileBanking, icon: '📱' },
                { label: 'SMS Alerts', desc: 'Get notified for every transaction. Essential for security (RBI mandates for all accounts).', checked: smsAlerts, set: setSmsAlerts, icon: '💬' },
              ].map((s, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: 18, borderRadius: 14, background: s.checked ? 'rgba(245,185,66,0.04)' : 'rgba(255,255,255,0.015)', border: `1px solid ${s.checked ? 'rgba(245,185,66,0.2)' : T.line}`, cursor: 'pointer', transition: 'border-color .2s' }}>
                  <input type="checkbox" checked={s.checked} onChange={e => s.set(e.target.checked)} style={{ accentColor: T.gold, marginTop: 4 }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{s.icon}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: T.ink100 }}>{s.label}</span>
                    </div>
                    <p style={{ fontSize: 12, color: T.ink45, marginTop: 4, lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: UPI & Cards ── */}
        {step === 3 && (
          <div style={card}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 20 }}>STEP 4 — UPI & DEBIT CARD SETUP</div>

            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 16, marginBottom: 12, fontWeight: 600 }}>UPI Registration (Mock)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 12 }}>
                <div><label style={lbl}>UPI ID</label><input style={inp} value={upiId} onChange={e => setUpiId(e.target.value)} placeholder={`${name.split(' ')[0]?.toLowerCase() || 'student'}@upi`} /></div>
              </div>
              {!upiPinSet ? (
                <button onClick={() => { if (upiId.length >= 3) setUpiPinSet(true); }} disabled={upiId.length < 3} style={{ padding: '10px 24px', borderRadius: 100, fontSize: 13, fontWeight: 600, background: upiId.length >= 3 ? `linear-gradient(135deg,${T.gold2},${T.gold})` : 'rgba(255,255,255,0.04)', color: upiId.length >= 3 ? T.void : T.ink45, border: 'none', cursor: upiId.length >= 3 ? 'pointer' : 'default', opacity: upiId.length >= 3 ? 1 : 0.5 }}>
                  Set UPI PIN (Mock)
                </button>
              ) : (
                <div style={{ padding: 12, borderRadius: 10, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', fontSize: 13, color: T.green, fontWeight: 600 }}>✅ UPI PIN set successfully! UPI ID: {upiId}</div>
              )}
              <div style={{ fontSize: 12, color: T.ink45, marginTop: 12, ...M, lineHeight: 1.6 }}>
                💡 You NEVER need to enter your UPI PIN to receive money. If someone asks you to enter PIN to receive, it is a scam. (Source: NPCI)
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 16, marginBottom: 12, fontWeight: 600 }}>Debit Card (Mock)</h4>
              {!debitCardActive ? (
                <button onClick={() => setDebitCardActive(true)} style={{ padding: '10px 24px', borderRadius: 100, fontSize: 13, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer' }}>
                  Activate Debit Card (Mock)
                </button>
              ) : (
                <div style={{ padding: 20, borderRadius: 16, background: 'linear-gradient(135deg, rgba(61,92,255,0.15), rgba(124,140,255,0.08))', border: '1px solid rgba(124,140,255,0.25)' }}>
                  <div style={{ fontSize: 10, ...M, color: T.ink45, marginBottom: 12 }}>MOCK DEBIT CARD</div>
                  <div style={{ fontSize: 18, ...M, color: T.ink100, letterSpacing: '0.12em', marginBottom: 8 }}>•••• •••• •••• 4521</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: T.ink45, ...M }}>
                    <span>VALID: 06/30</span>
                    <span>RuPay/Visa</span>
                  </div>
                  <div style={{ fontSize: 14, color: T.ink100, marginTop: 8, fontWeight: 600 }}>{name || 'STUDENT USER'}</div>
                </div>
              )}
            </div>

            {/* Mock Passbook */}
            <div style={{ marginTop: 24 }}>
              <h4 style={{ fontSize: 16, marginBottom: 12, fontWeight: 600 }}>Mini Statement</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 360 }}>
                  <thead><tr style={{ borderBottom: `1px solid ${T.line}` }}>
                    {['Date', 'Description', 'Amount', 'Balance'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px', color: T.ink45, ...M, fontSize: 10 }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {transactions.reduce((acc: { date: string; desc: string; amt: number; bal: number }[], tx) => {
                      const prevBal = acc.length > 0 ? acc[acc.length - 1].bal : 0;
                      acc.push({ ...tx, bal: prevBal + tx.amt });
                      return acc;
                    }, []).map((tx, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                        <td style={{ padding: '10px 8px', ...M, color: T.ink45 }}>{tx.date}</td>
                        <td style={{ padding: '10px 8px', color: T.ink100 }}>{tx.desc}</td>
                        <td style={{ padding: '10px 8px', ...M, color: tx.amt >= 0 ? T.green : T.coral, fontWeight: 600 }}>{tx.amt >= 0 ? '+' : ''}{inr(tx.amt)}</td>
                        <td style={{ padding: '10px 8px', ...M, color: T.ink70 }}>{inr(tx.bal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 12, padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.line}`, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: T.ink45 }}>Available Balance</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: T.gold2, fontFamily: 'var(--font-display)' }}>{inr(balance)}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Bank Comparison ── */}
        {step === 4 && (
          <div style={card}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>STEP 5 — COMPARE BANKS</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {[{ id: 'all', l: 'All Banks' }, { id: 'student', l: 'Student-Friendly' }, { id: 'zero', l: 'Zero Balance' }].map(f => (
                <button key={f.id} onClick={() => setCompFilter(f.id)} style={{ padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600, ...M, background: compFilter === f.id ? 'rgba(245,185,66,0.12)' : 'rgba(255,255,255,0.03)', color: compFilter === f.id ? T.gold : T.ink45, border: `1px solid ${compFilter === f.id ? 'rgba(245,185,66,0.3)' : T.line}`, cursor: 'pointer' }}>{f.l}</button>
              ))}
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 600 }}>
                <thead><tr style={{ borderBottom: `1px solid ${T.line}` }}>
                  {['Bank', 'Savings Rate', 'Min Balance', 'Debit Card', 'FD Rate', 'Zero Bal', 'Student'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 8px', color: T.ink45, ...M, fontSize: 10 }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {filteredBanks.map((b, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                      <td style={{ padding: '12px 8px', fontWeight: 600, color: T.ink100 }}>{b.name}</td>
                      <td style={{ padding: '12px 8px', ...M, color: T.green }}>{b.savings}</td>
                      <td style={{ padding: '12px 8px', color: T.ink70, fontSize: 11 }}>{b.minBal}</td>
                      <td style={{ padding: '12px 8px', color: T.ink45, fontSize: 11 }}>{b.debit}</td>
                      <td style={{ padding: '12px 8px', ...M, color: T.gold2 }}>{b.fd}</td>
                      <td style={{ padding: '12px 8px', color: b.zero ? T.green : T.coral }}>{b.zero ? '✓' : '✗'}</td>
                      <td style={{ padding: '12px 8px', color: b.student ? T.green : T.coral }}>{b.student ? '✓' : '✗'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={aiBox}>
              <div style={{ fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', marginBottom: 8 }}>🤖 AI RECOMMENDATION</div>
              {isMinor ? 'For students under 18, SBI, BoB, PNB, and Canara offer zero-balance minor accounts. These are ideal for building banking habits with parental oversight.' : 'Compare minimum balance requirements carefully. PSU banks (SBI, BoB, PNB) generally have lower minimums than private banks (HDFC, ICICI, Axis).'}
            </div>
          </div>
        )}

        {/* ── Step 5: Summary ── */}
        {step === 5 && !completed && (
          <div style={{ ...card, textAlign: 'center' }}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 24 }}>STEP 6 — YOUR BANKING SETUP</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 24, textAlign: 'center' }}>
              {[
                { l: 'Account Type', v: accType === 'savings' ? 'Savings' : accType === 'current' ? 'Current' : 'Minor', ic: '🏦' },
                { l: 'KYC Status', v: kycDone ? 'Verified' : 'Pending', ic: kycDone ? '✅' : '⏳' },
                { l: 'Net Banking', v: netBanking ? 'Active' : 'Off', ic: '🌐' },
                { l: 'Mobile Banking', v: mobileBanking ? 'Active' : 'Off', ic: '📱' },
                { l: 'UPI', v: upiPinSet ? 'Ready' : 'Not Set', ic: '💸' },
                { l: 'Debit Card', v: debitCardActive ? 'Active' : 'Not Activated', ic: '💳' },
              ].map((s, i) => (
                <div key={i} style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: `1px solid ${T.line}` }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{s.ic}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.ink100 }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: T.ink45, ...M, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setCompleted(true)} style={{ padding: '16px 40px', borderRadius: 100, fontWeight: 700, fontSize: 16, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer', boxShadow: '0 8px 30px rgba(245,185,66,0.25)' }}>
              ✓ Complete Banking Lab
            </button>
          </div>
        )}

        {/* ── Completed ── */}
        {completed && (
          <div style={{ ...card, textAlign: 'center', padding: 48 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>Banking Lab Complete!</h2>
            <p style={{ fontSize: 15, color: T.ink70, maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.65 }}>
              You have experienced the complete banking workflow. In real life, visit your nearest bank branch or apply online to open an account.
            </p>
            <div style={{ padding: 14, borderRadius: 12, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', marginBottom: 24, display: 'inline-block' }}>
              <span style={{ ...M, fontSize: 12, color: T.green }}>🏆 Badge Unlocked: Banking Pro</span>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setStep(0); setCompleted(false); }} style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: 'rgba(255,255,255,0.04)', color: T.ink100, border: `1px solid ${T.line}`, cursor: 'pointer' }}>Try Again</button>
              <button onClick={() => navigate('labs-dashboard')} style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer' }}>Back to Labs</button>
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        {!completed && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: 'rgba(255,255,255,0.04)', color: step === 0 ? T.ink45 : T.ink100, border: `1px solid ${T.line}`, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>← Previous</button>
            {step < 5 && (
              <button onClick={() => setStep(step + 1)} style={{ padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(245,185,66,0.2)' }}>Next Step →</button>
            )}
          </div>
        )}

        <div style={{ fontSize: 10, color: T.ink45, marginTop: 32, ...M }}>📋 Sources: RBI Master Direction on KYC · RBI Financial Literacy · NPCI UPI Guidelines · Official bank websites</div>
      </div>
    </section>
  );
}
