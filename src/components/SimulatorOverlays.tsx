import { useState } from 'react';
import Overlay from './Overlay';
import { ModuleIcon } from './Icons';
import { inr } from '../helpers/format';

const T = { blue: '#3D5CFF', cyan: '#7C8CFF', green: '#34D399', gold: '#F5B942', gold2: '#FFD37A', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B' };
const mono = { fontFamily: 'var(--font-mono)' };
const lbl: React.CSSProperties = { display: 'block', fontSize: 11, color: T.text3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', ...mono };
const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, borderRadius: 12, padding: '14px 16px', color: T.text, fontSize: 15, ...mono, outline: 'none', transition: 'border-color .2s' };
const panel: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, borderRadius: 20, padding: '32px clamp(20px,4vw,36px)', marginBottom: 24 };
const rLbl: React.CSSProperties = { fontSize: 11, color: T.text3, ...mono, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 };
const rVal: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,30px)', color: T.cyan, fontWeight: 600, letterSpacing: '-0.03em' };
const rValG: React.CSSProperties = { ...rVal, color: T.green };
const ins: React.CSSProperties = { fontSize: 13.5, color: T.text2, background: `${T.blue}08`, border: `1px solid ${T.blue}12`, borderRadius: 12, padding: '14px 18px', lineHeight: 1.65 };

function Bar({ pct, color }: { pct: number; color: string }) {
  const bg = color === 'gold' ? `linear-gradient(90deg,${T.gold},#F5D37A)` : color === 'coral' ? 'linear-gradient(90deg,#D94F4F,#FF6B6B)' : `linear-gradient(90deg,${T.blue},${T.cyan})`;
  return (
    <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginTop: 10 }}>
      <div style={{ height: '100%', borderRadius: 2, width: `${Math.max(0, Math.min(100, pct))}%`, background: bg, transition: 'width .6s cubic-bezier(.19,.8,.2,1)', boxShadow: `0 0 12px ${color === 'coral' ? '#FF6B6B40' : `${T.blue}40`}` }} />
    </div>
  );
}

function BarRow({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.text3, ...mono, letterSpacing: '0.06em' }}><span>{label}</span><span>{value}</span></div>
      <Bar pct={pct} color={color} />
    </div>
  );
}

function OvHeader({ icon, tag }: { icon: string; tag: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${T.blue}12`, border: `1px solid ${T.blue}18`, color: T.cyan, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModuleIcon type={icon} size={22} />
      </div>
      <span style={{ ...mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.text3 }}>{tag}</span>
    </div>
  );
}

function Sparkline({ values, id }: { values: number[]; id: string }) {
  if (!values.length) return null;
  const w = 280, h = 80, pad = 8;
  const max = Math.max(...values, 1), min = Math.min(...values, 0);
  const range = (max - min) || 1;
  const step = (w - pad * 2) / ((values.length - 1) || 1);
  const pts = values.map((v, i) => `${pad + i * step},${h - pad - ((v - min) / range) * (h - pad * 2)}`).join(' ');
  const fillPts = `${pad},${h - pad} ${pts} ${w - pad},${h - pad}`;
  return (
    <div style={{ marginTop: 8 }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 80 }}>
        <defs>
          <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={T.blue} />
            <stop offset="100%" stopColor={T.cyan} />
          </linearGradient>
        </defs>
        <polygon points={fillPts} fill={`url(#sg-${id})`} opacity="0.08" />
        <polyline points={pts} fill="none" stroke={`url(#sg-${id})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SimGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 8 }}>{children}</div>;
}

function Results({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 20, margin: '28px 0', paddingTop: 28, borderTop: `1px solid ${T.border}` }}>{children}</div>;
}

/* ═══ BUDGET ═══ */
export function BudgetSim({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [income, setIncome] = useState(25000);
  const [expenses, setExpenses] = useState(17000);
  const savings = income - expenses;
  const rate = income > 0 ? (savings / income * 100) : 0;
  const expPct = income > 0 ? Math.min(100, expenses / income * 100) : 0;
  const savPct = income > 0 ? Math.max(0, Math.min(100, rate)) : 0;
  let msg = 'Enter your income and expenses to see your savings rate.';
  if (income > 0 && savings < 0) msg = 'Spending exceeds income. Identify one category to reduce.';
  else if (income > 0 && rate >= 20) msg = `Strong — saving ${rate.toFixed(0)}% of income, meeting the recommended 20% threshold.`;
  else if (income > 0) msg = `Saving ${rate.toFixed(0)}%. Financial advisors recommend targeting at least 20%.`;
  return (
    <Overlay active={active} onClose={onClose}>
      <OvHeader icon="card" tag="Financial Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.03em' }}>Budget Planner</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Divide monthly income between needs, wants and savings.</p>
      <div style={panel}>
        <SimGrid>
          <div><label style={lbl}>Monthly Income (₹)</label><input style={inp} type="number" value={income} onChange={e => setIncome(+e.target.value)} /></div>
          <div><label style={lbl}>Monthly Expenses (₹)</label><input style={inp} type="number" value={expenses} onChange={e => setExpenses(+e.target.value)} /></div>
        </SimGrid>
        <Results>
          <div><div style={rLbl}>Monthly Savings</div><div style={rVal}>{inr(savings)}</div></div>
          <div><div style={rLbl}>Savings Rate</div><div style={rValG}>{rate.toFixed(0)}%</div></div>
        </Results>
        <BarRow label="Expenses" value={`${expPct.toFixed(0)}%`} pct={expPct} color="coral" />
        <BarRow label="Savings" value={`${savPct.toFixed(0)}%`} pct={savPct} color="gold" />
        <div style={ins}>{msg}</div>
      </div>
    </Overlay>
  );
}

/* ═══ SIP ═══ */
export function SipSim({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [P, setP] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);
  const i = rate / 12 / 100, n = years * 12;
  const fv = i > 0 ? P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i) : P * n;
  const invested = P * n, gain = fv - invested;
  const pts: number[] = [];
  for (let y = 0; y <= years; y++) { const nn = y * 12; pts.push(i > 0 ? P * ((Math.pow(1 + i, nn) - 1) / i) * (1 + i) : P * nn); }
  const msg = rate > 0 ? `At ${rate}% p.a., your money doubles roughly every ${(72 / rate).toFixed(1)} years (Rule of 72).` : 'Add an expected return to see compounding effect.';
  return (
    <Overlay active={active} onClose={onClose}>
      <OvHeader icon="coins" tag="Financial Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.03em' }}>SIP Calculator</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Model the future value of systematic monthly investments.</p>
      <div style={panel}>
        <SimGrid>
          <div><label style={lbl}>Monthly (₹)</label><input style={inp} type="number" value={P} onChange={e => setP(+e.target.value)} /></div>
          <div><label style={lbl}>Return (% p.a.)</label><input style={inp} type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} /></div>
          <div><label style={lbl}>Years</label><input style={inp} type="number" value={years} onChange={e => setYears(+e.target.value)} /></div>
        </SimGrid>
        <Results>
          <div><div style={rLbl}>Future Value</div><div style={rVal}>{inr(fv)}</div></div>
          <div><div style={rLbl}>Invested</div><div style={rValG}>{inr(invested)}</div></div>
          <div><div style={rLbl}>Wealth Gained</div><div style={rVal}>{inr(gain)}</div></div>
        </Results>
        <Sparkline values={pts} id="sip" />
        <div style={ins}>{msg}</div>
      </div>
    </Overlay>
  );
}

/* ═══ EMI ═══ */
export function EmiSim({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(9.5);
  const [years, setYears] = useState(5);
  const r = rate / 12 / 100, n = years * 12;
  let emi = 0;
  if (r > 0 && n > 0) emi = amount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  else if (n > 0) emi = amount / n;
  const total = emi * n, interest = total - amount;
  const pPct = total > 0 ? (amount / total * 100) : 0;
  return (
    <Overlay active={active} onClose={onClose}>
      <OvHeader icon="calc" tag="Financial Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.03em' }}>EMI Calculator</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Analyze loan structures, interest costs and repayment schedules.</p>
      <div style={panel}>
        <SimGrid>
          <div><label style={lbl}>Loan (₹)</label><input style={inp} type="number" value={amount} onChange={e => setAmount(+e.target.value)} /></div>
          <div><label style={lbl}>Rate (% p.a.)</label><input style={inp} type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} /></div>
          <div><label style={lbl}>Tenure (Yrs)</label><input style={inp} type="number" value={years} onChange={e => setYears(+e.target.value)} /></div>
        </SimGrid>
        <Results>
          <div><div style={rLbl}>Monthly EMI</div><div style={rVal}>{inr(emi)}</div></div>
          <div><div style={rLbl}>Total Payment</div><div style={rValG}>{inr(total)}</div></div>
          <div><div style={rLbl}>Total Interest</div><div style={rVal}>{inr(interest)}</div></div>
        </Results>
        <BarRow label="Principal" value="Interest" pct={pPct} color="indigo" />
        <div style={ins}>{pPct.toFixed(0)}% principal, {(100 - pPct).toFixed(0)}% interest paid to lender.</div>
      </div>
    </Overlay>
  );
}

/* ═══ COMPOUND INTEREST ═══ */
export function CiSim({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [principal, setPrincipal] = useState(50000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const fv = principal * Math.pow(1 + rate / 100, years);
  const pts: number[] = [];
  for (let y = 0; y <= years; y++) pts.push(principal * Math.pow(1 + rate / 100, y));
  const msg = rate > 0 ? `Doubling time: ~${(72 / rate).toFixed(1)} years (Rule of 72).` : 'Add a return rate to see growth.';
  return (
    <Overlay active={active} onClose={onClose}>
      <OvHeader icon="chart" tag="Financial Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.03em' }}>Compound Interest</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Visualize exponential growth on a one-time investment.</p>
      <div style={panel}>
        <SimGrid>
          <div><label style={lbl}>Investment (₹)</label><input style={inp} type="number" value={principal} onChange={e => setPrincipal(+e.target.value)} /></div>
          <div><label style={lbl}>Return (%)</label><input style={inp} type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} /></div>
          <div><label style={lbl}>Years</label><input style={inp} type="number" value={years} onChange={e => setYears(+e.target.value)} /></div>
        </SimGrid>
        <Results>
          <div><div style={rLbl}>Future Value</div><div style={rVal}>{inr(fv)}</div></div>
          <div><div style={rLbl}>Interest Earned</div><div style={rValG}>{inr(fv - principal)}</div></div>
        </Results>
        <Sparkline values={pts} id="ci" />
        <div style={ins}>{msg}</div>
      </div>
    </Overlay>
  );
}

/* ═══ SAVINGS GOAL ═══ */
export function GoalSim({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [target, setTarget] = useState(100000);
  const [months, setMonths] = useState(12);
  return (
    <Overlay active={active} onClose={onClose}>
      <OvHeader icon="target" tag="Financial Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.03em' }}>Savings Goal</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Calculate monthly savings needed to reach your target.</p>
      <div style={panel}>
        <SimGrid>
          <div><label style={lbl}>Target (₹)</label><input style={inp} type="number" value={target} onChange={e => setTarget(+e.target.value)} /></div>
          <div><label style={lbl}>Months</label><input style={inp} type="number" value={months} onChange={e => setMonths(+e.target.value)} /></div>
        </SimGrid>
        <Results><div><div style={rLbl}>Monthly Saving</div><div style={rVal}>{inr(months > 0 ? target / months : 0)}</div></div></Results>
        <div style={ins}>Without investment returns. Use SIP Calculator to see how investing accelerates this goal.</div>
      </div>
    </Overlay>
  );
}

/* ═══ INFLATION ═══ */
export function InflationSim({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [cost, setCost] = useState(1000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);
  const future = cost * Math.pow(1 + rate / 100, years);
  return (
    <Overlay active={active} onClose={onClose}>
      <OvHeader icon="percent" tag="Financial Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.03em' }}>Inflation Impact</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>See how inflation erodes purchasing power over time.</p>
      <div style={panel}>
        <SimGrid>
          <div><label style={lbl}>Today's Cost (₹)</label><input style={inp} type="number" value={cost} onChange={e => setCost(+e.target.value)} /></div>
          <div><label style={lbl}>Inflation (%)</label><input style={inp} type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} /></div>
          <div><label style={lbl}>Years</label><input style={inp} type="number" value={years} onChange={e => setYears(+e.target.value)} /></div>
        </SimGrid>
        <Results><div><div style={rLbl}>Future Cost</div><div style={rVal}>{inr(future)}</div></div></Results>
        <div style={ins}>{inr(cost)} today will cost {inr(future)} in {years} years at {rate}% inflation.</div>
      </div>
    </Overlay>
  );
}

/* ═══ NET WORTH ═══ */
export function NetWorthSim({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [assets, setAssets] = useState(150000);
  const [liab, setLiab] = useState(40000);
  return (
    <Overlay active={active} onClose={onClose}>
      <OvHeader icon="briefcase" tag="Financial Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.03em' }}>Net Worth</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Assets minus liabilities — your complete financial position.</p>
      <div style={panel}>
        <SimGrid>
          <div><label style={lbl}>Assets (₹)</label><input style={inp} type="number" value={assets} onChange={e => setAssets(+e.target.value)} /></div>
          <div><label style={lbl}>Liabilities (₹)</label><input style={inp} type="number" value={liab} onChange={e => setLiab(+e.target.value)} /></div>
        </SimGrid>
        <Results><div><div style={rLbl}>Net Worth</div><div style={rVal}>{inr(assets - liab)}</div></div></Results>
        <div style={ins}>Track quarterly. This single number is the clearest measure of financial health.</div>
      </div>
    </Overlay>
  );
}

/* ═══ EMERGENCY FUND ═══ */
export function EmergencySim({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [exp, setExp] = useState(15000);
  const [months, setMonths] = useState(6);
  return (
    <Overlay active={active} onClose={onClose}>
      <OvHeader icon="umbrella" tag="Financial Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.03em' }}>Emergency Fund</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Calculate your recommended financial safety cushion.</p>
      <div style={panel}>
        <SimGrid>
          <div><label style={lbl}>Expenses (₹)</label><input style={inp} type="number" value={exp} onChange={e => setExp(+e.target.value)} /></div>
          <div><label style={lbl}>Months</label><input style={inp} type="number" value={months} onChange={e => setMonths(+e.target.value)} /></div>
        </SimGrid>
        <Results><div><div style={rLbl}>Recommended Fund</div><div style={rVal}>{inr(exp * months)}</div></div></Results>
        <div style={ins}>RBI-aligned guidance: maintain 3–6 months of expenses as liquid reserves.</div>
      </div>
    </Overlay>
  );
}

/* ═══ INCOME TAX ═══ */
export function TaxSim({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [income, setIncome] = useState(800000);
  const std = 75000;
  const taxable = Math.max(0, income - std);
  const slabs = [
    { width: 400000, rate: 0 }, { width: 400000, rate: 5 }, { width: 400000, rate: 10 },
    { width: 400000, rate: 15 }, { width: 400000, rate: 20 }, { width: 400000, rate: 25 },
    { width: Infinity, rate: 30 },
  ];
  let remaining = taxable, tax = 0, lower = 0;
  const rows: { from: number; to: number | null; rate: number; tax: number }[] = [];
  for (const s of slabs) {
    const slabAmt = Math.max(0, Math.min(remaining, s.width));
    const slabTax = slabAmt * s.rate / 100;
    const upper = s.width === Infinity ? null : lower + s.width;
    if (slabAmt > 0 || s.rate === 0) rows.push({ from: lower, to: upper, rate: s.rate, tax: slabTax });
    tax += slabTax; remaining -= slabAmt; lower += s.width;
    if (remaining <= 0) break;
  }
  let rebate = false;
  if (taxable <= 1200000) { tax = 0; rebate = true; }
  const cess = tax * 0.04, total = tax + cess;
  const base = 'New Tax Regime FY 2025-26 · ₹75,000 standard deduction · excludes surcharge.';
  const msg = rebate ? `Section 87A rebate applies (taxable ≤ ₹12L). ${base}` : base;

  return (
    <Overlay active={active} onClose={onClose}>
      <OvHeader icon="doc" tag="Financial Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12, letterSpacing: '-0.03em' }}>Income Tax</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Estimate liability under India's New Tax Regime.</p>
      <div style={panel}>
        <SimGrid><div><label style={lbl}>Annual Income (₹)</label><input style={inp} type="number" value={income} onChange={e => setIncome(+e.target.value)} /></div></SimGrid>
        <Results>
          <div><div style={rLbl}>Taxable Income</div><div style={rValG}>{inr(taxable)}</div></div>
          <div><div style={rLbl}>Tax Payable</div><div style={rVal}>{inr(total)}</div></div>
        </Results>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, ...mono, color: T.text3, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', letterSpacing: '0.02em' }}>
              <span>{r.to === null ? `Above ${inr(r.from)}` : `${inr(r.from)} – ${inr(r.to)}`} <b style={{ color: T.text2 }}>@{r.rate}%</b></span>
              <span>{inr(r.tax)}</span>
            </div>
          ))}
        </div>
        <div style={{ ...ins, marginTop: 16 }}>{msg}</div>
      </div>
    </Overlay>
  );
}
