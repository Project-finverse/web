import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { inr } from '../helpers/format';

const T = { gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', blue: '#3D5CFF', cyan: '#7C8CFF', coral: '#FF6B6B', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B', void: '#07111F' };
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const lbl: React.CSSProperties = { display: 'block', fontSize: 11, color: T.text3, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', ...M };
const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, borderRadius: 12, padding: '13px 14px', color: T.text, fontSize: 15, ...M, outline: 'none', transition: 'border-color .2s' };
const sel: React.CSSProperties = { ...inp, appearance: 'none' as const, cursor: 'pointer' };
const card: React.CSSProperties = { background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.border}`, borderRadius: 18, padding: 24 };

const STEPS = ['Profile', 'Income', 'Deductions', 'Summary', 'Filing'];

export default function IncomeTaxLab() {
  const { navigate } = useNavigation();
  const [step, setStep] = useState(0);

  // Profile
  const [name, setName] = useState('');
  const [pan, setPan] = useState('');
  const [fy, setFy] = useState('2025-26');
  const [regime, setRegime] = useState<'new' | 'old'>('new');
  const [itr, setItr] = useState('ITR-1');

  // Income
  const [salary, setSalary] = useState(800000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [interestIncome, setInterestIncome] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);

  // Deductions (old regime)
  const [d80c, setD80c] = useState(150000);
  const [d80d, setD80d] = useState(25000);
  const [hra, setHra] = useState(0);
  const [lta, setLta] = useState(0);
  const [nps80ccd, setNps80ccd] = useState(0);

  // Filed state
  const [filed, setFiled] = useState(false);

  const grossIncome = salary + otherIncome + interestIncome + rentalIncome;
  const stdDeduction = regime === 'new' ? 75000 : 50000;
  const totalDeductions = regime === 'old' ? Math.min(d80c, 150000) + Math.min(d80d, 100000) + hra + lta + Math.min(nps80ccd, 50000) + stdDeduction : stdDeduction;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  // Tax calculation
  function calcTax(taxable: number, reg: 'new' | 'old') {
    if (reg === 'new') {
      const slabs = [
        { w: 400000, r: 0 }, { w: 400000, r: 5 }, { w: 400000, r: 10 },
        { w: 400000, r: 15 }, { w: 400000, r: 20 }, { w: 400000, r: 25 },
        { w: Infinity, r: 30 },
      ];
      let rem = taxable, tax = 0, lower = 0;
      const rows: { from: number; to: number | null; rate: number; tax: number }[] = [];
      for (const s of slabs) {
        const amt = Math.max(0, Math.min(rem, s.w));
        const slabTax = amt * s.r / 100;
        const upper = s.w === Infinity ? null : lower + s.w;
        if (amt > 0 || s.r === 0) rows.push({ from: lower, to: upper, rate: s.r, tax: slabTax });
        tax += slabTax; rem -= amt; lower += s.w;
        if (rem <= 0) break;
      }
      if (taxable <= 1200000) tax = 0;
      return { tax, cess: tax * 0.04, total: tax + tax * 0.04, rows };
    } else {
      let tax = 0;
      if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
      if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.20;
      if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;
      if (taxable <= 500000) tax = 0;
      return { tax, cess: tax * 0.04, total: tax + tax * 0.04, rows: [] };
    }
  }

  const taxNew = calcTax(Math.max(0, grossIncome - (regime === 'new' ? 75000 : totalDeductions)), 'new');
  const taxOld = calcTax(Math.max(0, grossIncome - totalDeductions), 'old');
  const currentTax = regime === 'new' ? taxNew : taxOld;
  const betterRegime = taxNew.total <= taxOld.total ? 'new' : 'old';

  const canNext = step === 0 ? true : step === 1 ? salary > 0 : step === 2 ? true : step === 3 ? true : true;

  let aiRec = '';
  if (step === 3) {
    if (regime !== betterRegime) aiRec = `💡 The ${betterRegime === 'new' ? 'New' : 'Old'} Regime would save you ${inr(Math.abs(taxNew.total - taxOld.total))}. Consider switching.`;
    else if (regime === 'old' && d80c < 150000) aiRec = `💡 You're using only ${inr(d80c)} of the ₹1.5L Section 80C limit. Investing more in PPF, ELSS, or NPS could reduce your tax by ${inr((150000 - d80c) * 0.3 * 1.04)}.`;
    else if (currentTax.total === 0) aiRec = '✅ No tax payable! Your income is below the rebate threshold under Section 87A.';
    else aiRec = `Your effective tax rate is ${grossIncome > 0 ? ((currentTax.total / grossIncome) * 100).toFixed(1) : 0}%. ${regime === 'old' ? 'Maximize 80C and 80D deductions to reduce further.' : 'The New Regime offers lower rates but no deductions.'}`;
  }

  return (
    <section style={{ padding: '120px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <button onClick={() => navigate('labs')} style={{ fontSize: 13, color: T.text3, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6, ...M }}>← Back to Financial Labs</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(245,185,66,0.10)', border: '1px solid rgba(245,185,66,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📋</div>
          <div>
            <span style={{ ...M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.text3 }}>INCOME TAX LAB</span>
            <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', marginTop: 4 }}>Mock ITR Filing Experience</h1>
          </div>
        </div>
        <p style={{ fontSize: 15, color: T.text2, marginBottom: 40, lineHeight: 1.7, maxWidth: 600 }}>
          Experience the complete income tax filing workflow — from entering your income to generating a tax summary. Uses FY {fy} slabs from the Income Tax Department.
        </p>

        {/* Progress Steps */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 40 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: 4, borderRadius: 2, marginBottom: 8,
                background: i < step ? `linear-gradient(90deg,${T.gold},${T.gold2})` : i === step ? `linear-gradient(90deg,${T.blue},${T.cyan})` : 'rgba(255,255,255,0.06)',
                transition: 'background .4s',
              }} />
              <span style={{ fontSize: 11, ...M, color: i <= step ? T.text : T.text3, letterSpacing: '0.04em' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* ── STEP 0: Profile ── */}
        {step === 0 && (
          <div style={card}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 24 }}>STEP 1 — TAXPAYER PROFILE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
              <div><label style={lbl}>Full Name</label><input style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" /></div>
              <div><label style={lbl}>PAN (Mock)</label><input style={inp} value={pan} onChange={e => setPan(e.target.value.toUpperCase().slice(0, 10))} placeholder="ABCDE1234F" maxLength={10} /></div>
              <div><label style={lbl}>Financial Year</label>
                <select style={sel} value={fy} onChange={e => setFy(e.target.value)}>
                  <option value="2025-26" style={{ background: T.void }}>FY 2025-26</option>
                  <option value="2024-25" style={{ background: T.void }}>FY 2024-25</option>
                </select>
              </div>
              <div><label style={lbl}>Tax Regime</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['new', 'old'] as const).map(r => (
                    <button key={r} onClick={() => setRegime(r)} style={{ flex: 1, padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 600, ...M, background: regime === r ? 'rgba(245,185,66,0.12)' : 'rgba(255,255,255,0.03)', color: regime === r ? T.gold : T.text3, border: `1px solid ${regime === r ? 'rgba(245,185,66,0.3)' : T.border}`, cursor: 'pointer' }}>
                      {r === 'new' ? 'New Regime' : 'Old Regime'}
                    </button>
                  ))}
                </div>
              </div>
              <div><label style={lbl}>ITR Type</label>
                <select style={sel} value={itr} onChange={e => setItr(e.target.value)}>
                  {['ITR-1 (Sahaj)', 'ITR-2', 'ITR-3', 'ITR-4 (Sugam)'].map(t => <option key={t} value={t.split(' ')[0]} style={{ background: T.void }}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: 'rgba(61,92,255,0.06)', border: '1px solid rgba(61,92,255,0.15)', fontSize: 13, color: T.text2, lineHeight: 1.6 }}>
              💡 <b>ITR-1 (Sahaj)</b> is for salaried individuals with total income up to ₹50 lakh. Most students and young professionals file ITR-1.
            </div>
          </div>
        )}

        {/* ── STEP 1: Income ── */}
        {step === 1 && (
          <div style={card}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 24 }}>STEP 2 — INCOME DETAILS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
              <div><label style={lbl}>Salary Income (₹)</label><input style={inp} type="number" value={salary} onChange={e => setSalary(Math.max(0, +e.target.value))} /></div>
              <div><label style={lbl}>Other Income (₹)</label><input style={inp} type="number" value={otherIncome} onChange={e => setOtherIncome(Math.max(0, +e.target.value))} /></div>
              <div><label style={lbl}>Interest Income (₹)</label><input style={inp} type="number" value={interestIncome} onChange={e => setInterestIncome(Math.max(0, +e.target.value))} /></div>
              <div><label style={lbl}>Rental Income (₹)</label><input style={inp} type="number" value={rentalIncome} onChange={e => setRentalIncome(Math.max(0, +e.target.value))} /></div>
            </div>
            <div style={{ marginTop: 20, padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: T.text2 }}>Gross Total Income</span>
                <span style={{ color: T.gold2, fontWeight: 700, ...M, fontSize: 18 }}>{inr(grossIncome)}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Deductions ── */}
        {step === 2 && (
          <div style={card}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 24 }}>STEP 3 — DEDUCTIONS</div>
            {regime === 'new' ? (
              <div style={{ padding: 20, borderRadius: 14, background: 'rgba(61,92,255,0.06)', border: '1px solid rgba(61,92,255,0.15)', fontSize: 14, color: T.text2, lineHeight: 1.7 }}>
                <b>New Tax Regime</b> offers lower tax rates but <b>no deductions</b> except the standard deduction of ₹75,000. If you have significant investments (PPF, ELSS, insurance), the Old Regime may be better. You can compare on the next step.
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
                  <div><label style={lbl}>Section 80C (₹)</label><input style={inp} type="number" value={d80c} onChange={e => setD80c(Math.max(0, Math.min(150000, +e.target.value)))} /><div style={{ fontSize: 10, color: T.text3, marginTop: 4, ...M }}>Max ₹1,50,000 · PPF, ELSS, LIC, Tuition</div></div>
                  <div><label style={lbl}>Section 80D (₹)</label><input style={inp} type="number" value={d80d} onChange={e => setD80d(Math.max(0, Math.min(100000, +e.target.value)))} /><div style={{ fontSize: 10, color: T.text3, marginTop: 4, ...M }}>Max ₹1,00,000 · Health Insurance</div></div>
                  <div><label style={lbl}>HRA Exemption (₹)</label><input style={inp} type="number" value={hra} onChange={e => setHra(Math.max(0, +e.target.value))} /></div>
                  <div><label style={lbl}>LTA (₹)</label><input style={inp} type="number" value={lta} onChange={e => setLta(Math.max(0, +e.target.value))} /></div>
                  <div><label style={lbl}>NPS 80CCD(1B) (₹)</label><input style={inp} type="number" value={nps80ccd} onChange={e => setNps80ccd(Math.max(0, Math.min(50000, +e.target.value)))} /><div style={{ fontSize: 10, color: T.text3, marginTop: 4, ...M }}>Additional ₹50,000 deduction</div></div>
                </div>
                <div style={{ marginTop: 20, padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: T.text2 }}>Total Deductions</span>
                  <span style={{ color: T.green, fontWeight: 700, ...M, fontSize: 18 }}>{inr(totalDeductions)}</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── STEP 3: Summary ── */}
        {step === 3 && (
          <div style={card}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 24 }}>STEP 4 — TAX SUMMARY</div>

            {/* Regime comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'New Regime', tax: taxNew, active: regime === 'new', better: betterRegime === 'new' },
                { label: 'Old Regime', tax: taxOld, active: regime === 'old', better: betterRegime === 'old' },
              ].map((r, i) => (
                <div key={i} style={{ padding: 20, borderRadius: 14, background: r.active ? 'rgba(245,185,66,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${r.active ? 'rgba(245,185,66,0.25)' : T.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, ...M, color: T.text3, marginBottom: 8 }}>{r.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: r.active ? T.gold2 : T.text, fontFamily: 'var(--font-display)' }}>{inr(r.tax.total)}</div>
                  {r.better && <div style={{ fontSize: 10, ...M, color: T.green, marginTop: 6, background: 'rgba(52,211,153,0.12)', padding: '2px 8px', borderRadius: 100, display: 'inline-block' }}>RECOMMENDED</div>}
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {[
                { l: 'Gross Income', v: inr(grossIncome) },
                { l: `Standard Deduction`, v: `- ${inr(stdDeduction)}` },
                ...(regime === 'old' ? [{ l: 'Section 80C/80D/Others', v: `- ${inr(totalDeductions - stdDeduction)}` }] : []),
                { l: 'Taxable Income', v: inr(taxableIncome) },
                { l: 'Tax Before Cess', v: inr(currentTax.tax) },
                { l: 'Health & Education Cess (4%)', v: inr(currentTax.cess) },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', fontSize: 13 }}>
                  <span style={{ color: T.text2 }}>{row.l}</span>
                  <span style={{ color: T.text, ...M, fontWeight: 600 }}>{row.v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px', borderRadius: 12, background: 'rgba(245,185,66,0.08)', border: '1px solid rgba(245,185,66,0.2)', fontSize: 15 }}>
                <span style={{ color: T.text, fontWeight: 600 }}>Total Tax Payable</span>
                <span style={{ color: T.gold2, fontWeight: 700, ...M, fontSize: 22 }}>{inr(currentTax.total)}</span>
              </div>
            </div>

            {/* Slab breakdown (new regime) */}
            {regime === 'new' && currentTax.rows.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, ...M, color: T.text3, marginBottom: 10, letterSpacing: '0.06em' }}>SLAB BREAKDOWN</div>
                {currentTax.rows.map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, ...M, color: T.text3, padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', marginBottom: 4 }}>
                    <span>{r.to === null ? `Above ${inr(r.from)}` : `${inr(r.from)} – ${inr(r.to)}`} <b style={{ color: T.text2 }}>@{r.rate}%</b></span>
                    <span>{inr(r.tax)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* AI Recommendation */}
            {aiRec && (
              <div style={{ fontSize: 13.5, color: T.text2, background: 'rgba(245,185,66,0.06)', border: '1px solid rgba(245,185,66,0.18)', borderRadius: 14, padding: '16px 18px', lineHeight: 1.7 }}>
                <div style={{ fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>🤖 AI TAX INSIGHT</div>
                {aiRec}
              </div>
            )}
          </div>
        )}

        {/* ── STEP 4: Filing ── */}
        {step === 4 && !filed && (
          <div style={{ ...card, textAlign: 'center' }}>
            <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 24 }}>STEP 5 — MOCK SUBMISSION</div>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
            <h3 style={{ fontSize: 22, marginBottom: 12 }}>Ready to Submit</h3>
            <p style={{ fontSize: 14, color: T.text2, maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.6 }}>
              This is an educational mock filing. No real data is submitted to any government portal. Click below to complete the experience.
            </p>
            <div style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, marginBottom: 24, textAlign: 'left', maxWidth: 400, margin: '0 auto 24px' }}>
              <div style={{ fontSize: 12, ...M, color: T.text3, marginBottom: 8 }}>FILING DETAILS</div>
              <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.8 }}>
                Name: {name || 'Student'}<br />
                PAN: {pan || 'ABCDE1234F'}<br />
                FY: {fy}<br />
                Regime: {regime === 'new' ? 'New' : 'Old'}<br />
                ITR Type: {itr}<br />
                Tax Payable: {inr(currentTax.total)}
              </div>
            </div>
            <button onClick={() => setFiled(true)} style={{
              padding: '16px 40px', borderRadius: 100, fontWeight: 700, fontSize: 16,
              background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void,
              border: 'none', cursor: 'pointer', boxShadow: '0 8px 30px rgba(245,185,66,0.25)',
              transition: 'transform .3s, box-shadow .3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(245,185,66,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(245,185,66,0.25)'; }}
            >📤 Submit Mock ITR</button>
          </div>
        )}

        {/* ── Filed Success ── */}
        {step === 4 && filed && (
          <div style={{ ...card, textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>Filing Complete!</h2>
            <p style={{ fontSize: 15, color: T.text2, maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.65 }}>
              You've successfully completed the mock ITR filing experience. In real life, you'd file on <b>incometax.gov.in</b> before July 31st.
            </p>
            <div style={{ padding: 16, borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', marginBottom: 24, display: 'inline-block' }}>
              <span style={{ ...M, fontSize: 12, color: T.green }}>🏆 Badge Unlocked: Tax Filing Pro</span>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setStep(0); setFiled(false); }} style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: 'rgba(255,255,255,0.04)', color: T.text, border: `1px solid ${T.border}`, cursor: 'pointer' }}>Try Again</button>
              <button onClick={() => navigate('labs')} style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer' }}>Back to Labs</button>
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        {!(step === 4 && filed) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: 'rgba(255,255,255,0.04)', color: step === 0 ? T.text3 : T.text, border: `1px solid ${T.border}`, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>
              ← Previous
            </button>
            {step < 4 && (
              <button onClick={() => setStep(step + 1)} disabled={!canNext}
                style={{ padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, background: `linear-gradient(135deg,${T.gold2},${T.gold})`, color: T.void, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(245,185,66,0.2)', opacity: canNext ? 1 : 0.5 }}>
                Next Step →
              </button>
            )}
          </div>
        )}

        {/* Source */}
        <div style={{ fontSize: 10, color: T.text3, marginTop: 32, ...M, letterSpacing: '0.02em' }}>
          📋 Source: Income Tax Department (incometax.gov.in) · IT Act 1961 · Finance Act 2025 · New Tax Regime FY 2025-26
        </div>
      </div>
    </section>
  );
}
