import { useState, useMemo } from 'react';
import Overlay from './Overlay';
import { inr } from '../helpers/format';
import { homeLoanProducts, eduLoanProducts } from '../data/bankProducts';

const T = { gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', blue: '#3D5CFF', cyan: '#7C8CFF', coral: '#FF6B6B', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B', void: '#07111F' };
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const lbl: React.CSSProperties = { display: 'block', fontSize: 11, color: T.text3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', ...M };
const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, borderRadius: 12, padding: '13px 14px', color: T.text, fontSize: 15, ...M, outline: 'none', transition: 'border-color .2s' };
const sel: React.CSSProperties = { ...inp, appearance: 'none' as const, cursor: 'pointer' };
const card: React.CSSProperties = { background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, transition: 'border-color .3s, transform .3s' };
const aiBox: React.CSSProperties = { fontSize: 13, color: T.text2, background: 'rgba(245,185,66,0.06)', border: '1px solid rgba(245,185,66,0.18)', borderRadius: 14, padding: '16px 18px', lineHeight: 1.7, marginTop: 20 };
const aiTag: React.CSSProperties = { fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 };

function calcEMI(p: number, annualRate: number, months: number) {
  if (p <= 0 || months <= 0) return 0;
  if (annualRate <= 0) return p / months;
  const r = annualRate / 12 / 100;
  return p * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

function amortization(p: number, annualRate: number, months: number) {
  const schedule: { month: number; emi: number; principal: number; interest: number; balance: number }[] = [];
  const r = annualRate / 12 / 100;
  const emi = calcEMI(p, annualRate, months);
  let balance = p;
  for (let m = 1; m <= Math.min(months, 360); m++) {
    const interest = balance * r;
    const principal = emi - interest;
    balance = Math.max(0, balance - principal);
    if (m <= 12 || m % 12 === 0 || m === months) {
      schedule.push({ month: m, emi, principal, interest, balance });
    }
  }
  return schedule;
}

/* ══════════════════════════════════════════
   HOME LOAN DECISION STUDIO
   ══════════════════════════════════════════ */
export function HomeLoanStudio({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [salary, setSalary] = useState(80000);
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [tenure, setTenure] = useState(20);
  const [selectedBanks, setSelectedBanks] = useState<string[]>(['SBI', 'HDFC', 'ICICI']);
  const [showAmort, setShowAmort] = useState(false);
  const [primaryBank, setPrimaryBank] = useState('SBI');

  const togBank = (s: string) => {
    setSelectedBanks(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s].slice(0, 4));
  };

  const banks = useMemo(() => homeLoanProducts.filter(b => selectedBanks.includes(b.shortName)), [selectedBanks]);
  const months = tenure * 12;
  const maxAffordableEMI = salary * 0.4;
  const dti = salary > 0 ? ((calcEMI(loanAmount, banks[0]?.rateMin || 8.5, months) / salary) * 100) : 0;

  const primaryProduct = homeLoanProducts.find(b => b.shortName === primaryBank) || homeLoanProducts[0];
  const primaryEMI = calcEMI(loanAmount, primaryProduct.rateMin, months);
  const totalPayment = primaryEMI * months;
  const totalInterest = totalPayment - loanAmount;
  const schedule = useMemo(() => amortization(loanAmount, primaryProduct.rateMin, months), [loanAmount, primaryProduct.rateMin, months]);

  const bestRate = Math.min(...banks.map(b => b.rateMin));
  const bestBank = banks.find(b => b.rateMin === bestRate);
  const worstRate = Math.max(...banks.map(b => b.rateMin));
  const savingsVsWorst = (calcEMI(loanAmount, worstRate, months) - calcEMI(loanAmount, bestRate, months)) * months;

  let recommendation = '';
  if (dti > 50) recommendation = `⚠️ Your EMI-to-income ratio is ${dti.toFixed(0)}%, which exceeds the RBI-recommended 40% threshold. Consider a lower loan amount or longer tenure.`;
  else if (dti > 40) recommendation = `Your EMI-to-income ratio is ${dti.toFixed(0)}%. This is at the upper limit of the 40% guideline (RBI). A slightly lower loan amount would improve your debt comfort.`;
  else recommendation = `Your EMI-to-income ratio is ${dti.toFixed(0)}% — within the recommended 40% limit. ${bestBank ? `${bestBank.bank} offers the lowest rate at ${bestRate}%` : ''}, which could save you ${inr(savingsVsWorst)} over the full tenure compared to higher-rate options.`;

  return (
    <Overlay active={active} onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(245,185,66,0.10)', border: '1px solid rgba(245,185,66,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏠</div>
        <div>
          <span style={{ ...M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.text3 }}>FINANCIAL EXPERIENCE CENTER</span>
          <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', marginTop: 4 }}>Home Loan Decision Studio</h2>
        </div>
      </div>
      <p style={{ fontSize: 15, color: T.text2, marginBottom: 32, lineHeight: 1.7, maxWidth: 600 }}>
        Compare home loans across major Indian banks. Rates sourced from official bank websites. RBI mandates no prepayment penalty on floating-rate loans for individual borrowers.
      </p>

      {/* ── STEP 1: Your Profile ── */}
      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>STEP 1 — YOUR PROFILE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          <div><label style={lbl}>Monthly Salary (₹)</label><input style={inp} type="number" value={salary} onChange={e => setSalary(Math.max(0, +e.target.value))} /></div>
          <div><label style={lbl}>Loan Amount (₹)</label><input style={inp} type="number" value={loanAmount} onChange={e => setLoanAmount(Math.max(0, +e.target.value))} /></div>
          <div><label style={lbl}>Tenure (Years)</label><input style={inp} type="number" min={1} max={30} value={tenure} onChange={e => setTenure(Math.min(30, Math.max(1, +e.target.value)))} /></div>
        </div>
        {/* Affordability meter */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.text3, ...M, marginBottom: 6 }}>
            <span>DEBT-TO-INCOME RATIO</span>
            <span style={{ color: dti > 50 ? T.coral : dti > 40 ? T.gold : T.green }}>{dti.toFixed(1)}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(100, dti)}%`, borderRadius: 4, background: dti > 50 ? 'linear-gradient(90deg,#D94F4F,#FF6B6B)' : dti > 40 ? `linear-gradient(90deg,${T.gold},${T.gold2})` : `linear-gradient(90deg,${T.green},#5EEAD4)`, transition: 'width .5s' }} />
          </div>
          <div style={{ fontSize: 11, color: T.text3, marginTop: 6, ...M }}>
            Max affordable EMI (40% of salary): {inr(maxAffordableEMI)}
          </div>
        </div>
      </div>

      {/* ── STEP 2: Select Banks ── */}
      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>STEP 2 — SELECT BANKS TO COMPARE (max 4)</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {homeLoanProducts.map(b => (
            <button key={b.shortName} onClick={() => togBank(b.shortName)} style={{
              padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600, ...M,
              background: selectedBanks.includes(b.shortName) ? 'rgba(245,185,66,0.15)' : 'rgba(255,255,255,0.03)',
              color: selectedBanks.includes(b.shortName) ? T.gold : T.text3,
              border: `1px solid ${selectedBanks.includes(b.shortName) ? 'rgba(245,185,66,0.35)' : T.border}`,
              cursor: 'pointer', transition: 'all .2s',
            }}>{b.shortName}</button>
          ))}
        </div>
      </div>

      {/* ── STEP 3: Bank Comparison Table ── */}
      {banks.length > 0 && (
        <div style={{ ...card, marginBottom: 16, overflowX: 'auto' }}>
          <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>STEP 3 — COMPARISON</div>
          <div style={{ minWidth: 600 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  {['Bank', 'Rate (% p.a.)', 'EMI', 'Total Interest', 'Processing Fee', 'Prepayment'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 10px', color: T.text3, ...M, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {banks.map(b => {
                  const emi = calcEMI(loanAmount, b.rateMin, months);
                  const totalInt = emi * months - loanAmount;
                  const isBest = b.rateMin === bestRate;
                  return (
                    <tr key={b.shortName} style={{ borderBottom: `1px solid ${T.border}`, background: isBest ? 'rgba(52,211,153,0.04)' : 'transparent', cursor: 'pointer' }}
                      onClick={() => setPrimaryBank(b.shortName)}>
                      <td style={{ padding: '14px 10px', color: T.text, fontWeight: 600 }}>
                        {b.shortName}
                        {isBest && <span style={{ marginLeft: 8, fontSize: 9, ...M, color: T.green, background: 'rgba(52,211,153,0.12)', padding: '2px 6px', borderRadius: 100 }}>BEST RATE</span>}
                      </td>
                      <td style={{ padding: '14px 10px', color: isBest ? T.green : T.text, ...M }}>{b.rateMin}% – {b.rateMax}%</td>
                      <td style={{ padding: '14px 10px', color: T.gold2, ...M, fontWeight: 600 }}>{inr(emi)}</td>
                      <td style={{ padding: '14px 10px', color: T.text2, ...M }}>{inr(totalInt)}</td>
                      <td style={{ padding: '14px 10px', color: T.text3, fontSize: 12 }}>{b.processingFee}</td>
                      <td style={{ padding: '14px 10px', color: T.text3, fontSize: 12 }}>{b.prepayment}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Primary Bank Detail ── */}
      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em' }}>DETAILED VIEW — {primaryProduct.bank.toUpperCase()}</div>
          <select style={{ ...sel, width: 'auto', padding: '8px 14px', fontSize: 12 }} value={primaryBank} onChange={e => setPrimaryBank(e.target.value)}>
            {homeLoanProducts.map(b => <option key={b.shortName} value={b.shortName} style={{ background: T.void }}>{b.shortName}</option>)}
          </select>
        </div>

        {/* Key results */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16, marginBottom: 24 }}>
          {[
            { l: 'Monthly EMI', v: inr(primaryEMI), c: T.gold2 },
            { l: 'Total Payment', v: inr(totalPayment), c: T.text },
            { l: 'Total Interest', v: inr(totalInterest), c: T.coral },
            { l: 'Interest %', v: `${loanAmount > 0 ? ((totalInterest / loanAmount) * 100).toFixed(1) : 0}%`, c: T.text2 },
          ].map((r, i) => (
            <div key={i} style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: `1px solid ${T.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: T.text3, ...M, letterSpacing: '0.08em', marginBottom: 6 }}>{r.l}</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: r.c, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>{r.v}</div>
            </div>
          ))}
        </div>

        {/* Principal vs Interest visual */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, ...M, color: T.text3, marginBottom: 6 }}>
            <span>PRINCIPAL: {inr(loanAmount)}</span>
            <span>INTEREST: {inr(totalInterest)}</span>
          </div>
          <div style={{ height: 12, borderRadius: 6, background: T.border, overflow: 'hidden', display: 'flex' }}>
            <div style={{ height: '100%', width: `${totalPayment > 0 ? (loanAmount / totalPayment * 100) : 50}%`, background: `linear-gradient(90deg,${T.blue},${T.cyan})` }} />
            <div style={{ height: '100%', flex: 1, background: 'linear-gradient(90deg,#D94F4F,#FF6B6B)' }} />
          </div>
        </div>

        {/* Amortization toggle */}
        <button onClick={() => setShowAmort(!showAmort)} style={{
          padding: '10px 20px', borderRadius: 100, fontSize: 12, fontWeight: 600, ...M,
          background: showAmort ? 'rgba(245,185,66,0.12)' : 'rgba(255,255,255,0.04)',
          color: showAmort ? T.gold : T.text3,
          border: `1px solid ${showAmort ? 'rgba(245,185,66,0.3)' : T.border}`,
          cursor: 'pointer', transition: 'all .2s',
        }}>
          {showAmort ? '▼ Hide' : '▶ Show'} Amortization Schedule
        </button>

        {showAmort && schedule.length > 0 && (
          <div style={{ marginTop: 16, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => (
                    <th key={h} style={{ textAlign: 'right', padding: '10px 8px', color: T.text3, ...M, fontSize: 10 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map(row => (
                  <tr key={row.month} style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                    <td style={{ padding: '8px', ...M, color: T.text3, textAlign: 'right' }}>{row.month}</td>
                    <td style={{ padding: '8px', ...M, color: T.text, textAlign: 'right' }}>{inr(row.emi)}</td>
                    <td style={{ padding: '8px', ...M, color: T.green, textAlign: 'right' }}>{inr(row.principal)}</td>
                    <td style={{ padding: '8px', ...M, color: T.coral, textAlign: 'right' }}>{inr(row.interest)}</td>
                    <td style={{ padding: '8px', ...M, color: T.text2, textAlign: 'right' }}>{inr(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Required Documents */}
        <div style={{ marginTop: 20, padding: 16, background: 'rgba(255,255,255,0.015)', borderRadius: 12, border: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10, ...M, color: T.text3, letterSpacing: '0.08em', marginBottom: 10 }}>REQUIRED DOCUMENTS — {primaryProduct.shortName}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {primaryProduct.docs.map((d, i) => (
              <span key={i} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, color: T.text2 }}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      <div style={aiBox}>
        <div style={aiTag}>🤖 AI RECOMMENDATION</div>
        {recommendation}
      </div>
      <div style={{ fontSize: 10, color: T.text3, marginTop: 12, ...M }}>
        📋 Sources: {banks.map(b => b.source).join(' · ')} · RBI Master Direction on Interest Rates · RBI/2019-20/86 (Prepayment rules)
      </div>
    </Overlay>
  );
}

/* ══════════════════════════════════════════
   EDUCATION LOAN CENTER
   ══════════════════════════════════════════ */
export function EduLoanCenter({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [destination, setDestination] = useState<'India' | 'Abroad'>('India');
  const [tuition, setTuition] = useState(800000);
  const [living, setLiving] = useState(200000);
  const [duration, setDuration] = useState(4);
  const [collateral, setCollateral] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState<string[]>(['SBI', 'BoB', 'Canara']);

  const totalCost = (tuition + living) * duration;
  const loanNeeded = totalCost * 0.8; // Assume 20% self-funding

  const banks = useMemo(() => {
    return eduLoanProducts.filter(b => {
      if (!selectedBanks.includes(b.shortName)) return false;
      if (destination === 'Abroad' && !b.coversAbroad) return false;
      return true;
    });
  }, [selectedBanks, destination]);

  const togBank = (s: string) => {
    setSelectedBanks(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s].slice(0, 4));
  };

  const bestRate = banks.length > 0 ? Math.min(...banks.map(b => b.rateMin)) : 0;
  const bestBank = banks.find(b => b.rateMin === bestRate);

  let recommendation = '';
  if (totalCost > 2000000 && !collateral) {
    recommendation = 'For loans above ₹7.5 lakh, most banks require collateral (IBA Model Scheme). Consider arranging collateral to access better rates and higher loan limits.';
  } else if (destination === 'Abroad') {
    recommendation = `For studying abroad, ${bestBank?.bank || 'SBI'} typically offers competitive rates. Check Vidyalakshmi Portal (vidyalakshmi.co.in) — the central govt platform for comparing education loan schemes across banks.`;
  } else {
    recommendation = `For domestic education, loans up to ₹7.5L don't require collateral under the IBA Model Education Loan Scheme. ${bestBank ? `${bestBank.bank} currently offers the lowest rate at ${bestRate}%.` : ''} Apply through Vidyalakshmi Portal for faster processing.`;
  }

  return (
    <Overlay active={active} onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(61,92,255,0.10)', border: '1px solid rgba(61,92,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🎓</div>
        <div>
          <span style={{ ...M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.text3 }}>FINANCIAL EXPERIENCE CENTER</span>
          <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', marginTop: 4 }}>Education Loan Center</h2>
        </div>
      </div>
      <p style={{ fontSize: 15, color: T.text2, marginBottom: 32, lineHeight: 1.7, maxWidth: 600 }}>
        Plan your education funding. Compare loans from major banks. Framework based on IBA Model Education Loan Scheme and RBI guidelines.
      </p>

      {/* ── Course Details ── */}
      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>STEP 1 — COURSE DETAILS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
          <div>
            <label style={lbl}>Destination</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['India', 'Abroad'] as const).map(d => (
                <button key={d} onClick={() => setDestination(d)} style={{
                  flex: 1, padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 600, ...M,
                  background: destination === d ? 'rgba(245,185,66,0.12)' : 'rgba(255,255,255,0.03)',
                  color: destination === d ? T.gold : T.text3,
                  border: `1px solid ${destination === d ? 'rgba(245,185,66,0.3)' : T.border}`,
                  cursor: 'pointer',
                }}>{d === 'India' ? '🇮🇳' : '🌍'} {d}</button>
              ))}
            </div>
          </div>
          <div><label style={lbl}>Annual Tuition (₹)</label><input style={inp} type="number" value={tuition} onChange={e => setTuition(Math.max(0, +e.target.value))} /></div>
          <div><label style={lbl}>Annual Living (₹)</label><input style={inp} type="number" value={living} onChange={e => setLiving(Math.max(0, +e.target.value))} /></div>
          <div><label style={lbl}>Duration (Years)</label><input style={inp} type="number" min={1} max={8} value={duration} onChange={e => setDuration(Math.min(8, Math.max(1, +e.target.value)))} /></div>
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.text2, cursor: 'pointer' }}>
            <input type="checkbox" checked={collateral} onChange={e => setCollateral(e.target.checked)} style={{ accentColor: T.gold }} />
            I can provide collateral (property/FD)
          </label>
        </div>
      </div>

      {/* Cost Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 16 }}>
        {[
          { l: 'Total Course Cost', v: inr(totalCost), c: T.text },
          { l: 'Self Funding (20%)', v: inr(totalCost * 0.2), c: T.text2 },
          { l: 'Loan Required', v: inr(loanNeeded), c: T.gold2 },
        ].map((r, i) => (
          <div key={i} style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: `1px solid ${T.border}`, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: T.text3, ...M, marginBottom: 6 }}>{r.l}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: r.c, fontFamily: 'var(--font-display)' }}>{r.v}</div>
          </div>
        ))}
      </div>

      {/* ── Bank Selection ── */}
      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>STEP 2 — COMPARE LENDERS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {eduLoanProducts.map(b => (
            <button key={b.shortName} onClick={() => togBank(b.shortName)} style={{
              padding: '8px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, ...M,
              background: selectedBanks.includes(b.shortName) ? 'rgba(61,92,255,0.12)' : 'rgba(255,255,255,0.03)',
              color: selectedBanks.includes(b.shortName) ? T.cyan : T.text3,
              border: `1px solid ${selectedBanks.includes(b.shortName) ? 'rgba(61,92,255,0.3)' : T.border}`,
              cursor: 'pointer',
            }}>{b.shortName}</button>
          ))}
        </div>

        {/* Comparison */}
        {banks.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 500 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  {['Bank', 'Rate', 'Max Amount', 'Collateral', 'Moratorium', 'Repayment'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 8px', color: T.text3, ...M, fontSize: 10, letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {banks.map(b => {
                  const isBest = b.rateMin === bestRate;
                  return (
                    <tr key={b.shortName} style={{ borderBottom: `1px solid rgba(255,255,255,0.04)`, background: isBest ? 'rgba(52,211,153,0.04)' : 'transparent' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 600, color: T.text }}>
                        {b.shortName}
                        {isBest && <span style={{ marginLeft: 6, fontSize: 9, ...M, color: T.green, background: 'rgba(52,211,153,0.12)', padding: '2px 6px', borderRadius: 100 }}>BEST</span>}
                      </td>
                      <td style={{ padding: '12px 8px', ...M, color: isBest ? T.green : T.text }}>{b.rateMin}%–{b.rateMax}%</td>
                      <td style={{ padding: '12px 8px', color: T.text2, fontSize: 11 }}>{b.maxAmount}</td>
                      <td style={{ padding: '12px 8px', color: T.text3, fontSize: 11 }}>{b.collateralRequired}</td>
                      <td style={{ padding: '12px 8px', color: T.text3, fontSize: 11 }}>{b.moratorium}</td>
                      <td style={{ padding: '12px 8px', color: T.text3, fontSize: 11 }}>{b.maxRepayment}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Estimated Repayment */}
      {bestBank && (
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>ESTIMATED REPAYMENT — {bestBank.shortName} ({bestRate}%)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12 }}>
            {[
              { l: 'Monthly EMI', v: inr(calcEMI(loanNeeded, bestRate, 15 * 12)), c: T.gold2 },
              { l: 'Total Repayment', v: inr(calcEMI(loanNeeded, bestRate, 15 * 12) * 15 * 12), c: T.text },
              { l: 'Total Interest', v: inr(calcEMI(loanNeeded, bestRate, 15 * 12) * 15 * 12 - loanNeeded), c: T.coral },
            ].map((r, i) => (
              <div key={i} style={{ padding: 14, background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: `1px solid ${T.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: T.text3, ...M, marginBottom: 4 }}>{r.l}</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: r.c, fontFamily: 'var(--font-display)' }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendation */}
      <div style={aiBox}>
        <div style={aiTag}>🤖 AI RECOMMENDATION</div>
        {recommendation}
      </div>
      <div style={{ fontSize: 10, color: T.text3, marginTop: 12, ...M }}>
        📋 Sources: IBA Model Education Loan Scheme · RBI Guidelines · Vidyalakshmi Portal (vidyalakshmi.co.in) · {banks.map(b => b.source).join(' · ')}
      </div>
    </Overlay>
  );
}
