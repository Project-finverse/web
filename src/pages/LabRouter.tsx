import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { getLabById } from '../data/labRegistry';
import { inr } from '../helpers/format';
import IncomeTaxLab from './IncomeTaxLab';
import BankingLab from './BankingLab';
import CyberSafetyLab from './CyberSafetyLab';
import CardIntelligenceLab from './CardIntelligenceLab';

/*
 * Universal Lab Router
 * Maps every lab ID from labRegistry to either:
 * 1. A dedicated full-page lab component (like IncomeTaxLab)
 * 2. A functional inline lab built from the registry data
 *
 * To add a new dedicated lab: add a case to the switch below.
 * Everything else gets the GenericLab experience.
 */

const T = { void: '#07111F', panel: '#0F1C3B', gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', blue: '#3D5CFF', cyan: '#7C8CFF', coral: '#FF6B6B', ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)', line: 'rgba(255,255,255,0.09)' };
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const lbl: React.CSSProperties = { display: 'block', fontSize: 11, color: T.ink45, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', ...M };
const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.line}`, borderRadius: 12, padding: '13px 14px', color: T.ink100, fontSize: 15, ...M, outline: 'none', transition: 'border-color .2s' };
const card: React.CSSProperties = { background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.line}`, borderRadius: 18, padding: 24, marginBottom: 16 };
const aiBox: React.CSSProperties = { fontSize: 13, color: T.ink70, background: 'rgba(245,185,66,0.06)', border: '1px solid rgba(245,185,66,0.18)', borderRadius: 14, padding: '16px 18px', lineHeight: 1.7, marginTop: 16 };
const resLbl: React.CSSProperties = { fontSize: 11, color: T.ink45, ...M, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 };
const resVal: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,30px)', color: T.gold2, fontWeight: 600, letterSpacing: '-0.03em' };

export default function LabRouter() {
  const { state } = useNavigation();
  const labId = state.labId || '';

  // Route to dedicated lab components
  switch (labId) {
    case 'income-tax-lab':
      return <IncomeTaxLab />;
    case 'banking-lab':
      return <BankingLab />;
    case 'cyber-safety':
      return <CyberSafetyLab />;
    case 'card-intelligence':
      return <CardIntelligenceLab />;
    default:
      return <GenericLab labId={labId} />;
  }
}

/* ═══════════════════════════════════════════
   GENERIC LAB — Fully functional calculator
   for any lab in the registry
   ═══════════════════════════════════════════ */
function GenericLab({ labId }: { labId: string }) {
  const { navigate } = useNavigation();
  const lab = getLabById(labId);

  if (!lab) {
    return (
      <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Lab Not Found</h1>
          <p style={{ fontSize: 16, color: T.ink70, marginBottom: 32 }}>This Financial Lab doesn't exist or hasn't been created yet.</p>
          <button onClick={() => navigate('labs')} style={{ padding: '14px 28px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer' }}>Back to Labs</button>
        </div>
      </section>
    );
  }

  // Map lab IDs to their specific calculator components
  const calcMap: Record<string, () => React.JSX.Element> = {
    'budget-planner': BudgetLab,
    'fd-calculator': FDLab,
    'rd-calculator': RDLab,
    'gst-calculator': GSTLab,
    'emi-calculator': EMILab,
    'sip-calculator': SIPLab,
    'compound-interest': CompoundLab,
    'lumpsum-calculator': LumpsumLab,
    'goal-planner': GoalLab,
    'risk-analyzer': RiskLab,
    'insurance-analyzer': InsuranceLab,
    'breakeven-calculator': BreakevenLab,
    'profit-loss': PnLLab,
    'savings-goal': SavingsGoalLab,
    'inflation-calculator': InflationLab,
    'networth-calculator': NetWorthLab,
    'emergency-fund': EmergencyLab,
    'home-loan-studio': HomeLoanLab,
    'education-loan': EduLoanLab,
  };

  const CalcComponent = calcMap[labId];

  return (
    <section style={{ padding: '120px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
        <button onClick={() => navigate('labs-dashboard')} style={{ fontSize: 13, color: T.ink45, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6, ...M }}>← Back to Dashboard</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(245,185,66,0.10)', border: '1px solid rgba(245,185,66,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{lab.icon}</div>
          <div>
            <span style={{ ...M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink45 }}>{lab.category.toUpperCase()} LAB</span>
            <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', marginTop: 4 }}>{lab.title}</h1>
          </div>
        </div>
        <p style={{ fontSize: 15, color: T.ink70, marginBottom: 8, lineHeight: 1.7, maxWidth: 600 }}>{lab.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
          {lab.features.map((f, i) => (
            <span key={i} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.line}`, color: T.ink45, ...M }}>{f}</span>
          ))}
        </div>

        {CalcComponent ? <CalcComponent /> : <ComingSoonLab lab={lab} />}

        <div style={{ fontSize: 10, color: T.ink45, marginTop: 24, ...M }}>📋 Sources: {lab.sources.join(' · ')}</div>
      </div>
    </section>
  );
}

function ComingSoonLab({ lab: _lab }: { lab: any }) {
  const { navigate } = useNavigation();
  void _lab;
  return (
    <div style={{ ...card, textAlign: 'center', padding: 48 }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🚧</div>
      <h2 style={{ fontSize: 24, marginBottom: 12 }}>Coming Soon</h2>
      <p style={{ fontSize: 15, color: T.ink70, maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.6 }}>
        This Financial Lab is being developed. Check back soon for the full interactive experience.
      </p>
      <button onClick={() => navigate('labs-dashboard')} style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer' }}>Back to Dashboard</button>
    </div>
  );
}

/* ═══ HOME LOAN DECISION STUDIO — Fully independent ═══ */
function HomeLoanLab() {
  const [salary, setSalary] = useState(80000);
  const [amount, setAmount] = useState(3000000);
  const [tenure, setTenure] = useState(20);
  const [selBank, setSelBank] = useState(0);

  const banks = [
    { name: 'SBI', rate: 8.50, fee: '0.35%', prepay: 'Nil (floating)' },
    { name: 'HDFC', rate: 8.75, fee: '0.50%', prepay: 'Nil float / 2% fixed' },
    { name: 'ICICI', rate: 8.75, fee: '0.50%+GST', prepay: 'Nil (floating)' },
    { name: 'BoB', rate: 8.40, fee: '0.25-0.50%', prepay: 'Nil (floating)' },
    { name: 'PNB', rate: 8.45, fee: '0.35%', prepay: 'Nil (floating)' },
    { name: 'Axis', rate: 8.75, fee: 'Up to 1%', prepay: 'Nil float / 2% fixed' },
  ];

  const b = banks[selBank];
  const r = b.rate / 12 / 100;
  const n = tenure * 12;
  const emi = r > 0 ? amount * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1) : amount/n;
  const total = emi * n;
  const interest = total - amount;
  const dti = salary > 0 ? (emi / salary * 100) : 0;
  const maxEmi = salary * 0.4;

  const rec = dti > 50
    ? `Warning: EMI-to-income ratio is ${dti.toFixed(0)}%, exceeding the 40% RBI guideline. Consider a lower loan amount or longer tenure.`
    : dti > 40
    ? `EMI-to-income ratio is ${dti.toFixed(0)}% — at the upper limit. Consider reducing loan amount slightly.`
    : `EMI-to-income ratio is ${dti.toFixed(0)}% — within the recommended 40% limit. ${b.name} offers ${b.rate}% p.a. with ${b.prepay} prepayment charges.`;

  return (
    <div>
      <div style={card}>
        <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 20 }}>YOUR PROFILE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
          <div><label style={lbl}>Monthly Salary (₹)</label><input style={inp} type="number" value={salary} onChange={e => setSalary(Math.max(0,+e.target.value))} /></div>
          <div><label style={lbl}>Loan Amount (₹)</label><input style={inp} type="number" value={amount} onChange={e => setAmount(Math.max(0,+e.target.value))} /></div>
          <div><label style={lbl}>Tenure (Years)</label><input style={inp} type="number" min={1} max={30} value={tenure} onChange={e => setTenure(Math.min(30,Math.max(1,+e.target.value)))} /></div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, ...M, color: T.ink45, marginBottom: 6 }}><span>DEBT-TO-INCOME</span><span style={{ color: dti > 50 ? T.coral : dti > 40 ? T.gold : T.green }}>{dti.toFixed(1)}%</span></div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(100,dti)}%`, borderRadius: 3, background: dti > 50 ? 'linear-gradient(90deg,#D94F4F,#FF6B6B)' : dti > 40 ? `linear-gradient(90deg,${T.gold},${T.gold2})` : `linear-gradient(90deg,${T.green},#5EEAD4)`, transition: 'width .4s' }} />
          </div>
          <div style={{ fontSize: 10, color: T.ink45, marginTop: 6, ...M }}>Max affordable EMI (40%): {inr(maxEmi)}</div>
        </div>
      </div>

      <div style={card}>
        <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>SELECT BANK</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {banks.map((bk, i) => (
            <button key={i} onClick={() => setSelBank(i)} style={{ padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600, ...M, background: selBank === i ? 'rgba(245,185,66,0.15)' : 'rgba(255,255,255,0.03)', color: selBank === i ? T.gold : T.ink45, border: `1px solid ${selBank === i ? 'rgba(245,185,66,0.35)' : T.line}`, cursor: 'pointer' }}>{bk.name} ({bk.rate}%)</button>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 400 }}>
            <thead><tr style={{ borderBottom: `1px solid ${T.line}` }}>
              {['Bank','Rate','EMI','Total Interest','Processing','Prepayment'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 8px', color: T.ink45, ...M, fontSize: 10 }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {banks.map((bk, i) => {
                const ri = bk.rate/12/100;
                const em = ri > 0 ? amount*ri*Math.pow(1+ri,n)/(Math.pow(1+ri,n)-1) : amount/n;
                const ti = em*n - amount;
                const best = bk.rate === Math.min(...banks.map(x=>x.rate));
                return (
                  <tr key={i} onClick={() => setSelBank(i)} style={{ borderBottom: `1px solid rgba(255,255,255,0.04)`, background: i === selBank ? 'rgba(245,185,66,0.04)' : 'transparent', cursor: 'pointer' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: T.ink100 }}>{bk.name}{best && <span style={{ marginLeft: 6, fontSize: 9, ...M, color: T.green, background: 'rgba(52,211,153,0.12)', padding: '2px 6px', borderRadius: 100 }}>BEST</span>}</td>
                    <td style={{ padding: '12px 8px', ...M, color: best ? T.green : T.ink100 }}>{bk.rate}%</td>
                    <td style={{ padding: '12px 8px', ...M, color: T.gold2, fontWeight: 600 }}>{inr(em)}</td>
                    <td style={{ padding: '12px 8px', ...M, color: T.ink70 }}>{inr(ti)}</td>
                    <td style={{ padding: '12px 8px', color: T.ink45, fontSize: 11 }}>{bk.fee}</td>
                    <td style={{ padding: '12px 8px', color: T.ink45, fontSize: 11 }}>{bk.prepay}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={card}>
        <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>LOAN SUMMARY — {b.name}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16 }}>
          {[{l:'Monthly EMI',v:inr(emi),c:T.gold2},{l:'Total Payment',v:inr(total),c:T.ink100},{l:'Total Interest',v:inr(interest),c:T.coral},{l:'Interest Ratio',v:`${amount>0?((interest/amount)*100).toFixed(1):0}%`,c:T.ink70}].map((r,i) => (
            <div key={i} style={{ padding: 14, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: `1px solid ${T.line}`, textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: T.ink45, ...M, marginBottom: 4 }}>{r.l}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: r.c, fontFamily: 'var(--font-display)' }}>{r.v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, ...M, color: T.ink45, marginBottom: 6 }}><span>PRINCIPAL: {inr(amount)}</span><span>INTEREST: {inr(interest)}</span></div>
          <div style={{ height: 10, borderRadius: 5, background: T.line, overflow: 'hidden', display: 'flex' }}>
            <div style={{ height: '100%', width: `${total>0?(amount/total*100):50}%`, background: `linear-gradient(90deg,${T.blue},${T.cyan})` }} />
            <div style={{ height: '100%', flex: 1, background: 'linear-gradient(90deg,#D94F4F,#FF6B6B)' }} />
          </div>
        </div>
      </div>

      <div style={aiBox}><div style={{ fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', marginBottom: 8 }}>🤖 AI RECOMMENDATION</div>{rec}</div>
      <div style={{ fontSize: 10, color: T.ink45, marginTop: 12, ...M }}>📋 Sources: Official bank websites · RBI Master Direction on Interest Rates · RBI/2019-20/86</div>
    </div>
  );
}

/* ═══ EDUCATION LOAN PLANNER — Fully independent ═══ */
function EduLoanLab() {
  const [dest, setDest] = useState<'India'|'Abroad'>('India');
  const [tuition, setTuition] = useState(800000);
  const [living, setLiving] = useState(200000);
  const [years, setYears] = useState(4);
  const [hasCollateral, setHasCollateral] = useState(false);

  const totalCost = (tuition + living) * years;
  const loanNeeded = totalCost * 0.8;

  const banks = [
    { name: 'SBI', rate: 8.55, max: dest === 'Abroad' ? '₹1.5 Cr' : '₹40 L', moratorium: 'Course+12mo', repay: '15 yrs', fee: 'Nil' },
    { name: 'BoB', rate: 8.35, max: dest === 'Abroad' ? '₹80 L' : '₹40 L', moratorium: 'Course+12mo', repay: '15 yrs', fee: 'Nil' },
    { name: 'Canara', rate: 8.50, max: dest === 'Abroad' ? '₹80 L' : '₹40 L', moratorium: 'Course+12mo', repay: '15 yrs', fee: 'Nil' },
    { name: 'PNB', rate: 8.45, max: dest === 'Abroad' ? '₹30 L' : '₹20 L', moratorium: 'Course+12mo', repay: '15 yrs', fee: 'Nil' },
    { name: 'HDFC Credila', rate: 9.00, max: dest === 'Abroad' ? '₹1 Cr+' : '₹45 L', moratorium: 'Course+6mo', repay: '10-15 yrs', fee: '1-2%' },
  ];

  const bestRate = Math.min(...banks.map(b => b.rate));
  const bestBank = banks.find(b => b.rate === bestRate);
  const emi = bestBank ? (() => { const r = bestBank.rate/12/100; const n = 180; return r > 0 ? loanNeeded*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1) : loanNeeded/n; })() : 0;
  const totalRepay = emi * 180;

  const rec = totalCost > 2000000 && !hasCollateral
    ? 'For loans above ₹7.5L, most banks require collateral (IBA Model Scheme). Arrange collateral for better rates and higher limits.'
    : dest === 'Abroad'
    ? `For studying abroad, ${bestBank?.name || 'SBI'} offers the best rate at ${bestRate}%. Also check Vidyalakshmi Portal (vidyalakshmi.co.in).`
    : `For domestic education, loans up to ₹7.5L need no collateral (IBA Model Scheme). ${bestBank?.name || 'SBI'} offers ${bestRate}%.`;

  return (
    <div>
      <div style={card}>
        <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>COURSE DETAILS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
          <div>
            <label style={lbl}>Destination</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['India','Abroad'] as const).map(d => (
                <button key={d} onClick={() => setDest(d)} style={{ flex: 1, padding: 10, borderRadius: 10, fontSize: 13, fontWeight: 600, ...M, background: dest === d ? 'rgba(245,185,66,0.12)' : 'rgba(255,255,255,0.03)', color: dest === d ? T.gold : T.ink45, border: `1px solid ${dest === d ? 'rgba(245,185,66,0.3)' : T.line}`, cursor: 'pointer' }}>{d === 'India' ? '🇮🇳' : '🌍'} {d}</button>
              ))}
            </div>
          </div>
          <div><label style={lbl}>Annual Tuition (₹)</label><input style={inp} type="number" value={tuition} onChange={e => setTuition(Math.max(0,+e.target.value))} /></div>
          <div><label style={lbl}>Annual Living (₹)</label><input style={inp} type="number" value={living} onChange={e => setLiving(Math.max(0,+e.target.value))} /></div>
          <div><label style={lbl}>Duration (Years)</label><input style={inp} type="number" min={1} max={8} value={years} onChange={e => setYears(Math.min(8,Math.max(1,+e.target.value)))} /></div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.ink70, cursor: 'pointer' }}>
            <input type="checkbox" checked={hasCollateral} onChange={e => setHasCollateral(e.target.checked)} style={{ accentColor: T.gold }} />
            I can provide collateral (property/FD)
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 16 }}>
        {[{l:'Total Cost',v:inr(totalCost),c:T.ink100},{l:'Self Fund (20%)',v:inr(totalCost*0.2),c:T.ink70},{l:'Loan Required',v:inr(loanNeeded),c:T.gold2}].map((r,i) => (
          <div key={i} style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: `1px solid ${T.line}`, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: T.ink45, ...M, marginBottom: 4 }}>{r.l}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: r.c, fontFamily: 'var(--font-display)' }}>{r.v}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>COMPARE LENDERS</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 450 }}>
            <thead><tr style={{ borderBottom: `1px solid ${T.line}` }}>
              {['Bank','Rate','Max Amount','Moratorium','Repayment','Fee'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 8px', color: T.ink45, ...M, fontSize: 10 }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {banks.map((bk, i) => {
                const best = bk.rate === bestRate;
                return (
                  <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,0.04)`, background: best ? 'rgba(52,211,153,0.04)' : 'transparent' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: T.ink100 }}>{bk.name}{best && <span style={{ marginLeft: 6, fontSize: 9, ...M, color: T.green, background: 'rgba(52,211,153,0.12)', padding: '2px 6px', borderRadius: 100 }}>BEST</span>}</td>
                    <td style={{ padding: '12px 8px', ...M, color: best ? T.green : T.ink100 }}>{bk.rate}%</td>
                    <td style={{ padding: '12px 8px', color: T.ink70, fontSize: 11 }}>{bk.max}</td>
                    <td style={{ padding: '12px 8px', color: T.ink45, fontSize: 11 }}>{bk.moratorium}</td>
                    <td style={{ padding: '12px 8px', color: T.ink45, fontSize: 11 }}>{bk.repay}</td>
                    <td style={{ padding: '12px 8px', color: T.ink45, fontSize: 11 }}>{bk.fee}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {bestBank && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 16 }}>
          {[{l:'Monthly EMI',v:inr(emi),c:T.gold2},{l:'Total Repayment',v:inr(totalRepay),c:T.ink100},{l:'Total Interest',v:inr(totalRepay-loanNeeded),c:T.coral}].map((r,i) => (
            <div key={i} style={{ padding: 14, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: `1px solid ${T.line}`, textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: T.ink45, ...M, marginBottom: 4 }}>{r.l}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: r.c, fontFamily: 'var(--font-display)' }}>{r.v}</div>
            </div>
          ))}
        </div>
      )}

      <div style={aiBox}><div style={{ fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', marginBottom: 8 }}>🤖 AI RECOMMENDATION</div>{rec}</div>
      <div style={{ fontSize: 10, color: T.ink45, marginTop: 12, ...M }}>📋 Sources: IBA Model Education Loan Scheme · RBI Guidelines · Vidyalakshmi Portal · Official bank websites</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   INLINE LAB CALCULATORS
   Each is a fully functional, self-contained experience
   ═══════════════════════════════════════════ */

function BudgetLab() {
  const [income, setIncome] = useState(25000);
  const [needs, setNeeds] = useState(12000);
  const [wants, setWants] = useState(5000);
  const savings = income - needs - wants;
  const rate = income > 0 ? (savings / income * 100) : 0;
  const rec = rate >= 20 ? `Great! Saving ${rate.toFixed(0)}% — above the recommended 20% (RBI Financial Literacy guidelines).` : rate > 0 ? `Saving ${rate.toFixed(0)}%. Try to reach 20% by reducing wants.` : 'Spending exceeds income. Reduce expenses to start saving.';
  return (
    <div style={card}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 16 }}>
        <div><label style={lbl}>Monthly Income (₹)</label><input style={inp} type="number" value={income} onChange={e => setIncome(Math.max(0,+e.target.value))} /></div>
        <div><label style={lbl}>Needs (₹)</label><input style={inp} type="number" value={needs} onChange={e => setNeeds(Math.max(0,+e.target.value))} /></div>
        <div><label style={lbl}>Wants (₹)</label><input style={inp} type="number" value={wants} onChange={e => setWants(Math.max(0,+e.target.value))} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16, marginTop: 24, paddingTop: 24, borderTop: `1px solid ${T.line}` }}>
        <div><div style={resLbl}>Savings</div><div style={{ ...resVal, color: savings >= 0 ? T.green : T.coral }}>{inr(savings)}</div></div>
        <div><div style={resLbl}>Savings Rate</div><div style={resVal}>{rate.toFixed(0)}%</div></div>
      </div>
      <div style={{ marginTop: 16 }}>
        {[{ l: 'Needs', v: income > 0 ? needs/income*100 : 0, c: 'blue' as const }, { l: 'Wants', v: income > 0 ? wants/income*100 : 0, c: 'coral' as const }, { l: 'Savings', v: Math.max(0,rate), c: 'gold' as const }].map((b,i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, ...M, color: T.ink45 }}><span>{b.l}</span><span>{b.v.toFixed(0)}%</span></div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginTop: 4 }}>
              <div style={{ height: '100%', width: `${Math.min(100,b.v)}%`, borderRadius: 3, background: b.c === 'gold' ? `linear-gradient(90deg,${T.gold},${T.gold2})` : b.c === 'coral' ? 'linear-gradient(90deg,#D94F4F,#FF6B6B)' : `linear-gradient(90deg,${T.blue},${T.cyan})`, transition: 'width .5s' }} />
            </div>
          </div>
        ))}
      </div>
      <div style={aiBox}><div style={{ fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', marginBottom: 8 }}>🤖 AI INSIGHT</div>{rec}</div>
    </div>
  );
}

function FDLab() {
  const [p, setP] = useState(100000);
  const [r, setR] = useState(7.1);
  const [y, setY] = useState(5);
  const mat = p * Math.pow(1 + r/400, y*4);
  const int = mat - p;
  return <CalcShell inputs={[{l:'Principal (₹)',v:p,s:setP},{l:'Rate (% p.a.)',v:r,s:setR,step:0.1},{l:'Years',v:y,s:setY}]} results={[{l:'Maturity',v:inr(mat)},{l:'Interest',v:inr(int),c:'green'}]} rec={`Effective annual rate: ${((Math.pow(1+r/400,4)-1)*100).toFixed(2)}%. Quarterly compounding per RBI norms.`} />;
}

function RDLab() {
  const [m, setM] = useState(5000);
  const [r, setR] = useState(6.8);
  const [n, setN] = useState(60);
  const rate = r/400;
  const mat = m * ((Math.pow(1+rate,n)-1)/(1-Math.pow(1+rate,-1/3)));
  return <CalcShell inputs={[{l:'Monthly (₹)',v:m,s:setM},{l:'Rate (%)',v:r,s:setR,step:0.1},{l:'Months',v:n,s:setN}]} results={[{l:'Maturity',v:inr(mat)},{l:'Invested',v:inr(m*n),c:'green'},{l:'Interest',v:inr(mat-m*n)}]} rec="RDs build savings discipline. Consider pairing with SIP for higher long-term returns." />;
}

function GSTLab() {
  const [amt, setAmt] = useState(10000);
  const [r, setR] = useState(18);
  const base = amt / (1 + r/100);
  const gst = amt - base;
  return <CalcShell inputs={[{l:'Amount (₹)',v:amt,s:setAmt},{l:'GST Rate (%)',v:r,s:setR}]} results={[{l:'Base Price',v:inr(base)},{l:'GST',v:inr(gst),c:'green'},{l:'CGST',v:inr(gst/2)},{l:'SGST',v:inr(gst/2)}]} rec={`GST at ${r}% applied. CGST and SGST split equally for intra-state transactions (GST Council).`} />;
}

function EMILab() {
  const [p, setP] = useState(500000);
  const [r, setR] = useState(9.5);
  const [y, setY] = useState(5);
  const ri = r/12/100; const n = y*12;
  const emi = ri > 0 ? p*ri*Math.pow(1+ri,n)/(Math.pow(1+ri,n)-1) : p/n;
  const total = emi*n;
  return <CalcShell inputs={[{l:'Loan (₹)',v:p,s:setP},{l:'Rate (%)',v:r,s:setR,step:0.1},{l:'Years',v:y,s:setY}]} results={[{l:'Monthly EMI',v:inr(emi)},{l:'Total Payment',v:inr(total),c:'green'},{l:'Total Interest',v:inr(total-p)}]} rec={`${((p/(total||1))*100).toFixed(0)}% principal, ${(((total-p)/(total||1))*100).toFixed(0)}% interest. RBI mandates no prepayment penalty on floating-rate loans.`} />;
}

function SIPLab() {
  const [p, setP] = useState(5000);
  const [r, setR] = useState(12);
  const [y, setY] = useState(15);
  const i = r/12/100; const n = y*12;
  const fv = i > 0 ? p*((Math.pow(1+i,n)-1)/i)*(1+i) : p*n;
  return <CalcShell inputs={[{l:'Monthly (₹)',v:p,s:setP},{l:'Return (%)',v:r,s:setR,step:0.1},{l:'Years',v:y,s:setY}]} results={[{l:'Future Value',v:inr(fv)},{l:'Invested',v:inr(p*n),c:'green'},{l:'Wealth Gained',v:inr(fv-p*n)}]} rec={r > 0 ? `Money doubles every ${(72/r).toFixed(1)} years (Rule of 72). Source: SEBI Investor Education.` : 'Enter a return rate to see compounding.'} />;
}

function CompoundLab() {
  const [p, setP] = useState(50000);
  const [r, setR] = useState(10);
  const [y, setY] = useState(10);
  const fv = p * Math.pow(1+r/100,y);
  return <CalcShell inputs={[{l:'Principal (₹)',v:p,s:setP},{l:'Rate (%)',v:r,s:setR,step:0.1},{l:'Years',v:y,s:setY}]} results={[{l:'Future Value',v:inr(fv)},{l:'Interest',v:inr(fv-p),c:'green'}]} rec={r > 0 ? `Doubling time: ~${(72/r).toFixed(1)} years. Historical Nifty 50 CAGR: ~12% over 15 years (NSE data).` : 'Add a return rate.'} />;
}

function LumpsumLab() {
  const [a, setA] = useState(100000);
  const [r, setR] = useState(12);
  const [y, setY] = useState(10);
  const fv = a * Math.pow(1+r/100,y);
  return <CalcShell inputs={[{l:'Amount (₹)',v:a,s:setA},{l:'Return (%)',v:r,s:setR,step:0.1},{l:'Years',v:y,s:setY}]} results={[{l:'Future Value',v:inr(fv)},{l:'Total Gain',v:inr(fv-a),c:'green'},{l:'CAGR',v:`${r}%`}]} rec={y < 3 ? 'Short-term: consider debt funds or FDs. Equity is volatile under 3 years.' : 'Good horizon for equity investments based on SEBI guidelines.'} />;
}

function GoalLab() {
  const [g, setG] = useState(500000);
  const [y, setY] = useState(5);
  const [r, setR] = useState(12);
  const ri = r/12/100; const n = y*12;
  const sip = ri > 0 ? g / (((Math.pow(1+ri,n)-1)/ri)*(1+ri)) : g/n;
  const lump = g / Math.pow(1+r/100,y);
  return <CalcShell inputs={[{l:'Goal (₹)',v:g,s:setG},{l:'Years',v:y,s:setY},{l:'Return (%)',v:r,s:setR,step:0.1}]} results={[{l:'Monthly SIP',v:inr(sip)},{l:'Or Lumpsum',v:inr(lump),c:'green'}]} rec={`SIP of ${inr(sip)}/month or ${inr(lump)} today to reach ${inr(g)} in ${y} years at ${r}%.`} />;
}

function RiskLab() {
  const [age, setAge] = useState(16);
  const [h, setH] = useState(10);
  const eq = Math.min(90, Math.max(20, 100-age+(h>7?15:h>3?5:-10)));
  const profile = eq >= 70 ? 'Aggressive' : eq >= 50 ? 'Moderate' : 'Conservative';
  return <CalcShell inputs={[{l:'Age',v:age,s:setAge},{l:'Investment Horizon (Yrs)',v:h,s:setH}]} results={[{l:'Profile',v:profile},{l:'Equity',v:`${eq}%`,c:'green'},{l:'Debt',v:`${90-eq}%`},{l:'Gold',v:'10%'}]} rec={age < 20 ? 'Time is your biggest advantage. Higher equity is appropriate per SEBI investor education.' : 'Balanced approach recommended per AMFI guidelines.'} />;
}

function InsuranceLab() {
  const [age, setAge] = useState(25);
  const [inc, setInc] = useState(600000);
  const [dep, setDep] = useState(2);
  const life = inc * (dep > 0 ? 15 : 10);
  const health = dep > 2 ? 1000000 : dep > 0 ? 500000 : 300000;
  return <CalcShell inputs={[{l:'Age',v:age,s:setAge},{l:'Annual Income (₹)',v:inc,s:setInc},{l:'Dependents',v:dep,s:setDep}]} results={[{l:'Life Cover',v:inr(life)},{l:'Health Cover',v:inr(health),c:'green'}]} rec={dep === 0 ? 'Even without dependents, health insurance is essential. Medical inflation: 14% annually (IRDAI).' : 'Term life insurance (10-15x income) is recommended by IRDAI.'} />;
}

function BreakevenLab() {
  const [fc, setFc] = useState(50000);
  const [sp, setSp] = useState(500);
  const [vc, setVc] = useState(300);
  const cm = sp - vc;
  const be = cm > 0 ? Math.ceil(fc / cm) : 0;
  return <CalcShell inputs={[{l:'Fixed Costs (₹)',v:fc,s:setFc},{l:'Price/Unit (₹)',v:sp,s:setSp},{l:'Cost/Unit (₹)',v:vc,s:setVc}]} results={[{l:'Break-Even Units',v:String(be)},{l:'Revenue Needed',v:inr(be*sp),c:'green'},{l:'Margin',v:`${sp>0?((cm/sp)*100).toFixed(1):0}%`}]} rec={cm <= 0 ? 'Price doesn\'t cover variable costs — you\'ll lose on every sale.' : be > 500 ? 'High break-even. Reduce fixed costs or increase price.' : 'Achievable break-even point. Focus on customer acquisition.'} />;
}

function PnLLab() {
  const [rev, setRev] = useState(200000);
  const [cogs, setCogs] = useState(80000);
  const [opex, setOpex] = useState(60000);
  const gross = rev - cogs;
  const net = gross - opex;
  const nm = rev > 0 ? (net/rev*100).toFixed(1) : '0';
  return <CalcShell inputs={[{l:'Revenue (₹)',v:rev,s:setRev},{l:'Cost of Goods (₹)',v:cogs,s:setCogs},{l:'Operating Expenses (₹)',v:opex,s:setOpex}]} results={[{l:'Gross Profit',v:inr(gross)},{l:'Net Profit',v:inr(net),c:net>=0?'green':undefined},{l:'Net Margin',v:`${nm}%`}]} rec={+nm < 0 ? 'Operating at a loss. Review expenses.' : +nm < 10 ? 'Thin margins. Target 15-20% for sustainable growth.' : 'Healthy margins. Focus on scaling.'} />;
}

function SavingsGoalLab() {
  const [t, setT] = useState(100000);
  const [m, setM] = useState(12);
  const monthly = m > 0 ? t/m : 0;
  return <CalcShell inputs={[{l:'Target (₹)',v:t,s:setT},{l:'Months',v:m,s:setM}]} results={[{l:'Monthly Saving',v:inr(monthly)}]} rec="Without investment returns. Use SIP Planner for higher returns." />;
}

function InflationLab() {
  const [c, setC] = useState(1000);
  const [r, setR] = useState(6);
  const [y, setY] = useState(10);
  const fv = c * Math.pow(1+r/100,y);
  return <CalcShell inputs={[{l:"Today's Cost (₹)",v:c,s:setC},{l:'Inflation (%)',v:r,s:setR,step:0.1},{l:'Years',v:y,s:setY}]} results={[{l:'Future Cost',v:inr(fv)}]} rec={`${inr(c)} today → ${inr(fv)} in ${y} years at ${r}% inflation. India averages 5-6% (RBI target: 4%).`} />;
}

function NetWorthLab() {
  const [a, setA] = useState(150000);
  const [l, setL] = useState(40000);
  return <CalcShell inputs={[{l:'Assets (₹)',v:a,s:setA},{l:'Liabilities (₹)',v:l,s:setL}]} results={[{l:'Net Worth',v:inr(a-l),c:a-l>=0?'green':undefined}]} rec="Track quarterly — the clearest single measure of financial health." />;
}

function EmergencyLab() {
  const [e, setE] = useState(15000);
  const [m, setM] = useState(6);
  return <CalcShell inputs={[{l:'Monthly Expenses (₹)',v:e,s:setE},{l:'Months of Safety',v:m,s:setM}]} results={[{l:'Recommended Fund',v:inr(e*m)}]} rec="RBI-aligned guidance: maintain 3-6 months of expenses as liquid reserves." />;
}

/* ═══ REUSABLE CALCULATOR SHELL ═══ */
interface CalcInput { l: string; v: number; s: (n: number) => void; step?: number }
interface CalcResult { l: string; v: string; c?: 'green' }

function CalcShell({ inputs, results, rec }: { inputs: CalcInput[]; results: CalcResult[]; rec: string }) {
  return (
    <div style={card}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
        {inputs.map((i, idx) => (
          <div key={idx}>
            <label style={lbl}>{i.l}</label>
            <input style={inp} type="number" value={i.v} step={i.step || 1} onChange={e => i.s(Math.max(0, +e.target.value))} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16, marginTop: 24, paddingTop: 24, borderTop: `1px solid ${T.line}` }}>
        {results.map((r, idx) => (
          <div key={idx}>
            <div style={resLbl}>{r.l}</div>
            <div style={{ ...resVal, color: r.c === 'green' ? T.green : T.gold2 }}>{r.v}</div>
          </div>
        ))}
      </div>
      <div style={aiBox}>
        <div style={{ fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', marginBottom: 8 }}>🤖 AI INSIGHT</div>
        {rec}
      </div>
    </div>
  );
}
