import { useState } from 'react';
import Overlay from './Overlay';
import { inr } from '../helpers/format';

const T = { blue: '#3D5CFF', cyan: '#7C8CFF', green: '#34D399', gold: '#F5B942', gold2: '#FFD37A', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B' };
const mono = { fontFamily: 'var(--font-mono)' };
const lbl: React.CSSProperties = { display: 'block', fontSize: 11, color: T.text3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', ...mono };
const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, borderRadius: 12, padding: '14px 16px', color: T.text, fontSize: 15, ...mono, outline: 'none' };
const pnl: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, borderRadius: 20, padding: '32px clamp(20px,4vw,36px)', marginBottom: 24 };
const rL: React.CSSProperties = { fontSize: 11, color: T.text3, ...mono, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 };
const rV: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,30px)', color: T.gold2, fontWeight: 600, letterSpacing: '-0.03em' };
const rVG: React.CSSProperties = { ...rV, color: T.green };
const ai: React.CSSProperties = { fontSize: 13.5, color: T.text2, background: 'rgba(245,185,66,0.06)', border: '1px solid rgba(245,185,66,0.18)', borderRadius: 12, padding: '16px 18px', lineHeight: 1.65, marginTop: 16 };
const aiTag: React.CSSProperties = { fontSize: 10, ...mono, color: T.gold, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 };
const Grid = ({ children }: { children: React.ReactNode }) => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 8 }}>{children}</div>;
const Res = ({ children }: { children: React.ReactNode }) => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 20, margin: '28px 0', paddingTop: 28, borderTop: `1px solid ${T.border}` }}>{children}</div>;
function Hdr({ icon, tag }: { icon: string; tag: string }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
    <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(245,185,66,0.10)', border: '1px solid rgba(245,185,66,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{icon}</div>
    <span style={{ ...mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.text3 }}>{tag}</span>
  </div>;
}

/* ══════════════════════════════════
   BANKING LAB
   ══════════════════════════════════ */

export function FdCalc({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(5);
  const maturity = principal * Math.pow(1 + rate / 400, years * 4);
  const interest = maturity - principal;
  const effectiveRate = (Math.pow(1 + rate / 400, 4) - 1) * 100;
  const rec = rate < 6.5 ? '🤖 Consider comparing FD rates across banks — SBI, HDFC, ICICI often offer different rates. Senior citizens typically get 0.5% extra.' : rate >= 7 ? '🤖 Good rate. Verify this is for your exact tenure. Premature withdrawal typically incurs a 1% penalty (RBI guidelines).' : '🤖 Average rate. Check if your bank offers special rates for specific tenures like 444 days or 2 years.';
  return (
    <Overlay active={active} onClose={onClose}>
      <Hdr icon="🏦" tag="Banking Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12 }}>Fixed Deposit Calculator</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Calculate FD maturity with quarterly compounding as per RBI norms. Compare across tenures to maximize returns.</p>
      <div style={pnl}>
        <Grid>
          <div><label style={lbl}>Principal (₹)</label><input style={inp} type="number" value={principal} onChange={e => setPrincipal(+e.target.value)} /></div>
          <div><label style={lbl}>Rate (% p.a.)</label><input style={inp} type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} /></div>
          <div><label style={lbl}>Tenure (Years)</label><input style={inp} type="number" value={years} onChange={e => setYears(+e.target.value)} /></div>
        </Grid>
        <Res>
          <div><div style={rL}>Maturity Amount</div><div style={rV}>{inr(maturity)}</div></div>
          <div><div style={rL}>Interest Earned</div><div style={rVG}>{inr(interest)}</div></div>
          <div><div style={rL}>Effective Rate</div><div style={rV}>{effectiveRate.toFixed(2)}%</div></div>
        </Res>
        <div style={ai}><div style={aiTag}>🤖 AI INSIGHT</div>{rec}</div>
        <div style={{ fontSize: 11, color: T.text3, marginTop: 12, ...mono }}>Source: RBI Master Direction on Interest Rates · Quarterly compounding</div>
      </div>
    </Overlay>
  );
}

export function RdCalc({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(6.8);
  const [months, setMonths] = useState(60);
  const r = rate / 400;
  const n = months;
  const maturity = monthly * ((Math.pow(1 + r, n) - 1) / (1 - Math.pow(1 + r, -1/3)));
  const invested = monthly * months;
  const interest = maturity - invested;
  const rec = monthly < 1000 ? '🤖 Even small RDs build discipline. Try increasing by ₹500/month — over 5 years, the compound effect is significant.' : '🤖 RDs are great for building savings habits. For higher returns, consider pairing your RD with a SIP in a balanced mutual fund.';
  return (
    <Overlay active={active} onClose={onClose}>
      <Hdr icon="🏦" tag="Banking Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12 }}>Recurring Deposit Calculator</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Plan your monthly RD savings. RDs build discipline while earning guaranteed returns.</p>
      <div style={pnl}>
        <Grid>
          <div><label style={lbl}>Monthly (₹)</label><input style={inp} type="number" value={monthly} onChange={e => setMonthly(+e.target.value)} /></div>
          <div><label style={lbl}>Rate (% p.a.)</label><input style={inp} type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} /></div>
          <div><label style={lbl}>Months</label><input style={inp} type="number" value={months} onChange={e => setMonths(+e.target.value)} /></div>
        </Grid>
        <Res>
          <div><div style={rL}>Maturity</div><div style={rV}>{inr(maturity)}</div></div>
          <div><div style={rL}>Invested</div><div style={rVG}>{inr(invested)}</div></div>
          <div><div style={rL}>Interest</div><div style={rV}>{inr(interest)}</div></div>
        </Res>
        <div style={ai}><div style={aiTag}>🤖 AI INSIGHT</div>{rec}</div>
      </div>
    </Overlay>
  );
}

/* ══════════════════════════════════
   INVESTMENT LAB
   ══════════════════════════════════ */

export function LumpsumCalc({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const fv = amount * Math.pow(1 + rate / 100, years);
  const gain = fv - amount;
  const gainPct = ((fv / amount - 1) * 100).toFixed(1);
  const rec = years < 3 ? '🤖 For short-term lumpsum, consider debt mutual funds or FDs. Equity is volatile under 3 years.' : years >= 7 ? '🤖 Excellent horizon. Historically, Indian equity (Nifty 50) has delivered 12-15% CAGR over 7+ year periods (NSE data).' : '🤖 Medium-term. Consider balanced/hybrid funds that mix equity and debt for this timeframe.';
  return (
    <Overlay active={active} onClose={onClose}>
      <Hdr icon="📈" tag="Investment Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12 }}>Lumpsum Investment</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Calculate returns on a one-time investment. Compare with SIP to find your optimal strategy.</p>
      <div style={pnl}>
        <Grid>
          <div><label style={lbl}>Amount (₹)</label><input style={inp} type="number" value={amount} onChange={e => setAmount(+e.target.value)} /></div>
          <div><label style={lbl}>Expected Return (%)</label><input style={inp} type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} /></div>
          <div><label style={lbl}>Years</label><input style={inp} type="number" value={years} onChange={e => setYears(+e.target.value)} /></div>
        </Grid>
        <Res>
          <div><div style={rL}>Future Value</div><div style={rV}>{inr(fv)}</div></div>
          <div><div style={rL}>Total Gain</div><div style={rVG}>{inr(gain)}</div></div>
          <div><div style={rL}>Absolute Return</div><div style={rV}>{gainPct}%</div></div>
        </Res>
        <div style={ai}><div style={aiTag}>🤖 AI INSIGHT</div>{rec}</div>
        <div style={{ fontSize: 11, color: T.text3, marginTop: 12, ...mono }}>Reference: NSE historical data · SEBI investor guidelines</div>
      </div>
    </Overlay>
  );
}

export function GoalPlanner({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [goal, setGoal] = useState(500000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(12);
  const r = rate / 12 / 100;
  const n = years * 12;
  const sipNeeded = r > 0 ? goal / (((Math.pow(1 + r, n) - 1) / r) * (1 + r)) : goal / n;
  const lumpNeeded = goal / Math.pow(1 + rate / 100, years);
  const rec = sipNeeded < 2000 ? `🤖 Very achievable! ₹${Math.round(sipNeeded).toLocaleString('en-IN')}/month is less than most people spend on food delivery.` : sipNeeded > 15000 ? '🤖 This requires significant monthly savings. Consider extending your timeline or breaking it into smaller milestones.' : '🤖 Reasonable target. Automate this SIP so you never miss a month — consistency matters more than timing.';
  return (
    <Overlay active={active} onClose={onClose}>
      <Hdr icon="🎯" tag="Investment Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12 }}>Financial Goal Planner</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Reverse-engineer how much to invest monthly to reach any financial goal. Based on SEBI-registered MF return expectations.</p>
      <div style={pnl}>
        <Grid>
          <div><label style={lbl}>Goal Amount (₹)</label><input style={inp} type="number" value={goal} onChange={e => setGoal(+e.target.value)} /></div>
          <div><label style={lbl}>Timeline (Years)</label><input style={inp} type="number" value={years} onChange={e => setYears(+e.target.value)} /></div>
          <div><label style={lbl}>Expected Return (%)</label><input style={inp} type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} /></div>
        </Grid>
        <Res>
          <div><div style={rL}>Monthly SIP Needed</div><div style={rV}>{inr(sipNeeded)}</div></div>
          <div><div style={rL}>Or Lumpsum Today</div><div style={rVG}>{inr(lumpNeeded)}</div></div>
        </Res>
        <div style={ai}><div style={aiTag}>🤖 AI INSIGHT</div>{rec}</div>
      </div>
    </Overlay>
  );
}

export function RiskAnalyzer({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [age, setAge] = useState(16);
  const [horizon, setHorizon] = useState(10);
  const [income, setIncome] = useState(0);
  const equityPct = Math.min(90, Math.max(20, 100 - age + (horizon > 7 ? 15 : horizon > 3 ? 5 : -10)));
  const debtPct = 100 - equityPct - 10;
  const goldPct = 10;
  const profile = equityPct >= 70 ? 'Aggressive' : equityPct >= 50 ? 'Moderate' : 'Conservative';
  const rec = age < 20 ? '🤖 At your age, time is your biggest advantage. Higher equity allocation is appropriate since you have decades to recover from market dips (SEBI investor education).' : '🤖 Your risk profile suggests a balanced approach. As your income grows, you can gradually increase equity exposure.';
  return (
    <Overlay active={active} onClose={onClose}>
      <Hdr icon="📊" tag="Investment Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12 }}>Risk Profile Analyzer</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Determine your ideal asset allocation based on age, timeline, and risk capacity. Based on SEBI/AMFI guidelines.</p>
      <div style={pnl}>
        <Grid>
          <div><label style={lbl}>Your Age</label><input style={inp} type="number" value={age} onChange={e => setAge(+e.target.value)} /></div>
          <div><label style={lbl}>Investment Horizon (Yrs)</label><input style={inp} type="number" value={horizon} onChange={e => setHorizon(+e.target.value)} /></div>
          <div><label style={lbl}>Monthly Income (₹)</label><input style={inp} type="number" value={income} onChange={e => setIncome(+e.target.value)} /></div>
        </Grid>
        <Res>
          <div><div style={rL}>Risk Profile</div><div style={{ ...rV, color: profile === 'Aggressive' ? '#FF6B6B' : profile === 'Moderate' ? T.gold2 : T.green }}>{profile}</div></div>
        </Res>
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          {[{ label: 'Equity', pct: equityPct, color: T.blue }, { label: 'Debt', pct: debtPct, color: T.green }, { label: 'Gold', pct: goldPct, color: T.gold }].map((a, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: a.color, fontFamily: 'var(--font-display)' }}>{a.pct}%</div>
              <div style={{ fontSize: 11, color: T.text3, marginTop: 4, ...mono }}>{a.label}</div>
            </div>
          ))}
        </div>
        <div style={ai}><div style={aiTag}>🤖 AI INSIGHT</div>{rec}</div>
        <div style={{ fontSize: 11, color: T.text3, marginTop: 12, ...mono }}>Based on SEBI Investor Education · AMFI Asset Allocation Guidelines</div>
      </div>
    </Overlay>
  );
}

/* ══════════════════════════════════
   INSURANCE LAB
   ══════════════════════════════════ */

export function InsuranceCalc({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [age, setAge] = useState(25);
  const [income, setIncome] = useState(600000);
  const [dependents, setDependents] = useState(2);
  const lifeCover = income * (dependents > 0 ? 15 : 10);
  const healthCover = dependents > 2 ? 1000000 : dependents > 0 ? 500000 : 300000;
  const termPremium = Math.round(age * 12 + income * 0.003);
  const healthPremium = Math.round(healthCover * (age < 30 ? 0.008 : age < 45 ? 0.015 : 0.025));
  const rec = dependents === 0 ? '🤖 Even without dependents, health insurance is essential. Medical inflation in India runs at 14% annually (IRDAI data). A ₹5L cover costs just ₹4,000-8,000/year at your age.' : '🤖 With dependents, term life insurance is non-negotiable. Buy pure term (not ULIP) — it gives maximum coverage at minimum cost. IRDAI recommends 10-15x annual income as cover.';
  return (
    <Overlay active={active} onClose={onClose}>
      <Hdr icon="🛡️" tag="Insurance Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12 }}>Insurance Need Analyzer</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Calculate your ideal life and health insurance coverage. Based on IRDAI guidelines and actuarial standards.</p>
      <div style={pnl}>
        <Grid>
          <div><label style={lbl}>Your Age</label><input style={inp} type="number" value={age} onChange={e => setAge(+e.target.value)} /></div>
          <div><label style={lbl}>Annual Income (₹)</label><input style={inp} type="number" value={income} onChange={e => setIncome(+e.target.value)} /></div>
          <div><label style={lbl}>Dependents</label><input style={inp} type="number" value={dependents} onChange={e => setDependents(+e.target.value)} /></div>
        </Grid>
        <Res>
          <div><div style={rL}>Life Cover Needed</div><div style={rV}>{inr(lifeCover)}</div></div>
          <div><div style={rL}>Health Cover</div><div style={rVG}>{inr(healthCover)}</div></div>
        </Res>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
          <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 11, color: T.text3, ...mono, marginBottom: 4 }}>EST. TERM PREMIUM/YR</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: T.text }}>{inr(termPremium)}</div>
          </div>
          <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 11, color: T.text3, ...mono, marginBottom: 4 }}>EST. HEALTH PREMIUM/YR</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: T.text }}>{inr(healthPremium)}</div>
          </div>
        </div>
        <div style={ai}><div style={aiTag}>🤖 AI INSIGHT</div>{rec}</div>
        <div style={{ fontSize: 11, color: T.text3, marginTop: 12, ...mono }}>Source: IRDAI Guidelines · Insurance coverage recommendations</div>
      </div>
    </Overlay>
  );
}

/* ══════════════════════════════════
   GST LAB
   ══════════════════════════════════ */

export function GstCalc({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [inclusive, setInclusive] = useState(false);
  const basePrice = inclusive ? amount / (1 + rate / 100) : amount;
  const gstAmount = basePrice * rate / 100;
  const totalPrice = basePrice + gstAmount;
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;
  return (
    <Overlay active={active} onClose={onClose}>
      <Hdr icon="🧾" tag="GST Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12 }}>GST Calculator</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Calculate GST breakdowns for any product or service. Understand CGST + SGST splits as per GST Council norms.</p>
      <div style={pnl}>
        <Grid>
          <div><label style={lbl}>Amount (₹)</label><input style={inp} type="number" value={amount} onChange={e => setAmount(+e.target.value)} /></div>
          <div><label style={lbl}>GST Rate (%)</label>
            <select style={{ ...inp, appearance: 'none' as const }} value={rate} onChange={e => setRate(+e.target.value)}>
              {[0, 5, 12, 18, 28].map(r => <option key={r} value={r} style={{ background: T.panel }}>{r}%</option>)}
            </select>
          </div>
        </Grid>
        <div style={{ marginTop: 12, marginBottom: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.text2, cursor: 'pointer' }}>
            <input type="checkbox" checked={inclusive} onChange={e => setInclusive(e.target.checked)} style={{ accentColor: T.gold }} />
            Amount is GST-inclusive
          </label>
        </div>
        <Res>
          <div><div style={rL}>Base Price</div><div style={rV}>{inr(basePrice)}</div></div>
          <div><div style={rL}>GST Amount</div><div style={rVG}>{inr(gstAmount)}</div></div>
          <div><div style={rL}>Total Price</div><div style={rV}>{inr(totalPrice)}</div></div>
        </Res>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
          <div style={{ padding: 14, background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: `1px solid ${T.border}`, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: T.text3, ...mono, marginBottom: 4 }}>CGST ({rate / 2}%)</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: T.text }}>{inr(cgst)}</div>
          </div>
          <div style={{ padding: 14, background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: `1px solid ${T.border}`, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: T.text3, ...mono, marginBottom: 4 }}>SGST ({rate / 2}%)</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: T.text }}>{inr(sgst)}</div>
          </div>
        </div>
        <div style={ai}><div style={aiTag}>🤖 AI INSIGHT</div>🤖 GST at {rate}% applies to {rate === 5 ? 'essential goods, economy travel' : rate === 12 ? 'processed food, business travel' : rate === 18 ? 'most services, restaurants' : rate === 28 ? 'luxury goods, automobiles' : 'exempt items'}. Always verify the applicable rate on cbic-gst.gov.in.</div>
        <div style={{ fontSize: 11, color: T.text3, marginTop: 12, ...mono }}>Source: GST Council · CBIC</div>
      </div>
    </Overlay>
  );
}

/* ══════════════════════════════════
   ENTREPRENEURSHIP LAB
   ══════════════════════════════════ */

export function BreakevenCalc({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [fixedCosts, setFixedCosts] = useState(50000);
  const [pricePerUnit, setPricePerUnit] = useState(500);
  const [costPerUnit, setCostPerUnit] = useState(300);
  const contribution = pricePerUnit - costPerUnit;
  const breakeven = contribution > 0 ? Math.ceil(fixedCosts / contribution) : 0;
  const breakevenRevenue = breakeven * pricePerUnit;
  const margin = pricePerUnit > 0 ? ((contribution / pricePerUnit) * 100).toFixed(1) : '0';
  const rec = contribution <= 0 ? '🤖 Your price doesn\'t cover variable costs. You\'ll lose money on every sale. Increase price or reduce cost per unit.' : breakeven > 500 ? '🤖 High breakeven point. Consider reducing fixed costs (negotiate rent, use shared spaces) or increasing your price to reach profitability faster.' : '🤖 Achievable breakeven. At this rate, if you sell consistently, you\'ll be profitable within a reasonable timeframe. Focus on customer acquisition.';
  return (
    <Overlay active={active} onClose={onClose}>
      <Hdr icon="🚀" tag="Entrepreneurship Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12 }}>Break-Even Calculator</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Find out how many units you need to sell to cover all costs. Essential for any business plan.</p>
      <div style={pnl}>
        <Grid>
          <div><label style={lbl}>Fixed Costs/Month (₹)</label><input style={inp} type="number" value={fixedCosts} onChange={e => setFixedCosts(+e.target.value)} /></div>
          <div><label style={lbl}>Selling Price/Unit (₹)</label><input style={inp} type="number" value={pricePerUnit} onChange={e => setPricePerUnit(+e.target.value)} /></div>
          <div><label style={lbl}>Cost/Unit (₹)</label><input style={inp} type="number" value={costPerUnit} onChange={e => setCostPerUnit(+e.target.value)} /></div>
        </Grid>
        <Res>
          <div><div style={rL}>Break-Even Units</div><div style={rV}>{breakeven}</div></div>
          <div><div style={rL}>Break-Even Revenue</div><div style={rVG}>{inr(breakevenRevenue)}</div></div>
          <div><div style={rL}>Contribution Margin</div><div style={rV}>{margin}%</div></div>
        </Res>
        <div style={ai}><div style={aiTag}>🤖 AI INSIGHT</div>{rec}</div>
      </div>
    </Overlay>
  );
}

export function ProfitLossCalc({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [revenue, setRevenue] = useState(200000);
  const [cogs, setCogs] = useState(80000);
  const [opex, setOpex] = useState(60000);
  const [tax, setTax] = useState(15);
  const gross = revenue - cogs;
  const grossMargin = revenue > 0 ? ((gross / revenue) * 100).toFixed(1) : '0';
  const opProfit = gross - opex;
  const netProfit = opProfit * (1 - tax / 100);
  const netMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : '0';
  const rec = +netMargin < 0 ? '🤖 Operating at a loss. Review your largest expense categories — can you reduce COGS through better suppliers or cut operational expenses?' : +netMargin < 10 ? '🤖 Thin margins. Most successful businesses target 15-20% net margins. Look for ways to increase pricing power or reduce costs.' : '🤖 Healthy margins. Focus on scaling revenue while maintaining this efficiency. Consider reinvesting profits into growth.';
  return (
    <Overlay active={active} onClose={onClose}>
      <Hdr icon="📊" tag="Entrepreneurship Lab" />
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,36px)', marginBottom: 12 }}>Profit & Loss Simulator</h2>
      <p style={{ fontSize: 15, color: T.text2, maxWidth: 520, marginBottom: 32, lineHeight: 1.7 }}>Build a simple P&L statement. Understand gross margin, operating profit, and net profit.</p>
      <div style={pnl}>
        <Grid>
          <div><label style={lbl}>Revenue (₹)</label><input style={inp} type="number" value={revenue} onChange={e => setRevenue(+e.target.value)} /></div>
          <div><label style={lbl}>Cost of Goods (₹)</label><input style={inp} type="number" value={cogs} onChange={e => setCogs(+e.target.value)} /></div>
          <div><label style={lbl}>Operating Expenses (₹)</label><input style={inp} type="number" value={opex} onChange={e => setOpex(+e.target.value)} /></div>
          <div><label style={lbl}>Tax Rate (%)</label><input style={inp} type="number" value={tax} onChange={e => setTax(+e.target.value)} /></div>
        </Grid>
        <Res>
          <div><div style={rL}>Gross Profit</div><div style={rV}>{inr(gross)}</div><div style={{ fontSize: 11, color: T.text3, ...mono }}>{grossMargin}% margin</div></div>
          <div><div style={rL}>Operating Profit</div><div style={rVG}>{inr(opProfit)}</div></div>
          <div><div style={rL}>Net Profit</div><div style={{ ...rV, color: netProfit >= 0 ? T.green : '#FF6B6B' }}>{inr(netProfit)}</div><div style={{ fontSize: 11, color: T.text3, ...mono }}>{netMargin}% net margin</div></div>
        </Res>
        <div style={ai}><div style={aiTag}>🤖 AI INSIGHT</div>{rec}</div>
      </div>
    </Overlay>
  );
}
