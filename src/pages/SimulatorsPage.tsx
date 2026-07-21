import { useState } from 'react';
import { ModuleIcon } from '../components/Icons';
import {
  BudgetSim, SipSim, EmiSim, CiSim, GoalSim,
  InflationSim, NetWorthSim, EmergencySim, TaxSim,
} from '../components/SimulatorOverlays';
import {
  FdCalc, RdCalc, LumpsumCalc, GoalPlanner, RiskAnalyzer,
  InsuranceCalc, GstCalc, BreakevenCalc, ProfitLossCalc,
} from '../components/AdvancedSimulators';
import { HomeLoanStudio, EduLoanCenter } from '../components/LoanStudios';

const T = { blue: '#3D5CFF', cyan: '#7C8CFF', green: '#34D399', gold: '#F5B942', gold2: '#FFD37A', text: 'rgba(255,255,255,0.95)', text2: 'rgba(255,255,255,0.68)', text3: 'rgba(255,255,255,0.44)', border: 'rgba(255,255,255,0.09)', panel: '#0F1C3B' };

interface SimDef { id: string; icon: string; emoji?: string; title: string; desc: string; cat: string; isNew?: boolean }

const allSims: SimDef[] = [
  // Core
  { id: 'budget', icon: 'card', title: 'Budget Planner', desc: 'Allocate income using the 50-30-20 framework.', cat: 'Core' },
  { id: 'networth', icon: 'briefcase', title: 'Net Worth', desc: 'Assets minus liabilities — your financial position.', cat: 'Core' },
  { id: 'emergency', icon: 'umbrella', title: 'Emergency Fund', desc: 'Calculate your ideal safety cushion.', cat: 'Core' },
  { id: 'goal', icon: 'target', title: 'Savings Goal', desc: 'How much to save monthly for any target.', cat: 'Core' },
  { id: 'inflation', icon: 'percent', title: 'Inflation Impact', desc: 'How purchasing power erodes over time.', cat: 'Core' },
  // Banking
  { id: 'fd', icon: 'card', emoji: '🏦', title: 'FD Calculator', desc: 'Fixed deposit maturity with quarterly compounding per RBI norms.', cat: 'Banking', isNew: true },
  { id: 'rd', icon: 'card', emoji: '🏦', title: 'RD Calculator', desc: 'Recurring deposit returns for disciplined monthly saving.', cat: 'Banking', isNew: true },
  // Investing
  { id: 'sip', icon: 'coins', title: 'SIP Calculator', desc: 'Model systematic compounding over decades.', cat: 'Investing' },
  { id: 'ci', icon: 'chart', title: 'Compound Interest', desc: 'Exponential growth on lump-sum investments.', cat: 'Investing' },
  { id: 'lumpsum', icon: 'chart', emoji: '📈', title: 'Lumpsum Calculator', desc: 'One-time investment returns with CAGR analysis.', cat: 'Investing', isNew: true },
  { id: 'goalplanner', icon: 'target', emoji: '🎯', title: 'Goal Planner', desc: 'Reverse-engineer SIP or lumpsum for any goal.', cat: 'Investing', isNew: true },
  { id: 'risk', icon: 'chart', emoji: '📊', title: 'Risk Analyzer', desc: 'Your ideal asset allocation based on SEBI/AMFI guidelines.', cat: 'Investing', isNew: true },
  // Loans
  { id: 'emi', icon: 'calc', title: 'EMI Calculator', desc: 'Loan structures, interest costs and repayment schedules.', cat: 'Loans' },
  { id: 'homeloan', icon: 'calc', emoji: '🏠', title: 'Home Loan Studio', desc: 'Compare home loans across 6 major banks with amortization schedules.', cat: 'Loans', isNew: true },
  { id: 'eduloan', icon: 'calc', emoji: '🎓', title: 'Education Loan Center', desc: 'Plan university funding and compare education loan schemes.', cat: 'Loans', isNew: true },
  // Taxes
  { id: 'tax', icon: 'doc', title: 'Income Tax', desc: "New Tax Regime FY 2025-26 with full slab breakdown.", cat: 'Taxes' },
  { id: 'gst', icon: 'doc', emoji: '🧾', title: 'GST Calculator', desc: 'GST breakdowns with CGST/SGST splits per GST Council.', cat: 'Taxes', isNew: true },
  // Insurance
  { id: 'insurance', icon: 'shield', emoji: '🛡️', title: 'Insurance Analyzer', desc: 'Life + health coverage needs based on IRDAI guidelines.', cat: 'Insurance', isNew: true },
  // Entrepreneurship
  { id: 'breakeven', icon: 'chart', emoji: '🚀', title: 'Break-Even Calculator', desc: 'Units to sell to cover all costs for your business.', cat: 'Business', isNew: true },
  { id: 'pnl', icon: 'chart', emoji: '📊', title: 'Profit & Loss', desc: 'Build a P&L statement with margin analysis.', cat: 'Business', isNew: true },
];

export default function SimulatorsPage() {
  const [activeSim, setActiveSim] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const cats = ['All', 'Core', 'Banking', 'Investing', 'Loans', 'Taxes', 'Insurance', 'Business'];
  const filtered = filter === 'All' ? allSims : allSims.filter(s => s.cat === filter);
  const catCounts = cats.map(c => ({ cat: c, count: c === 'All' ? allSims.length : allSims.filter(s => s.cat === c).length }));

  return (
    <>
      <section style={{ padding: '140px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gold2, background: 'rgba(245,185,66,0.09)', border: '1px solid rgba(245,185,66,0.22)', padding: '6px 14px', borderRadius: 100, marginBottom: 20 }}>🎮 Financial OS</div>
            <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', marginBottom: 16 }}>Simulator Ecosystem</h1>
            <p style={{ fontSize: 17, color: T.text2, lineHeight: 1.7 }}>
              {allSims.length} interactive financial tools built with data from RBI, SEBI, IRDAI, GST Council and other official sources. Each simulator includes AI-powered recommendations.
            </p>
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
            {catCounts.map(({ cat: c, count }) => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: '10px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                background: filter === c ? `linear-gradient(135deg,${T.gold2},${T.gold})` : 'rgba(255,255,255,0.03)',
                color: filter === c ? '#07111F' : T.text2,
                border: filter === c ? 'none' : `1px solid ${T.border}`,
                cursor: 'pointer', transition: 'all .25s',
                boxShadow: filter === c ? '0 4px 16px rgba(245,185,66,0.25)' : 'none',
              }}>
                {c} <span style={{ opacity: 0.7, marginLeft: 4, fontSize: 11 }}>({count})</span>
              </button>
            ))}
          </div>

          {/* Simulator Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {filtered.map(sim => (
              <button key={sim.id} onClick={() => setActiveSim(sim.id)} className="glass-card"
                style={{ textAlign: 'left', padding: 28, borderRadius: 20, cursor: 'pointer', width: '100%', position: 'relative' }}>
                {sim.isNew && (
                  <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: T.gold, background: 'rgba(245,185,66,0.10)', border: '1px solid rgba(245,185,66,0.25)', padding: '3px 8px', borderRadius: 100, fontWeight: 700, zIndex: 1 }}>NEW</span>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: 'rgba(245,185,66,0.08)', border: '1px solid rgba(245,185,66,0.20)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: sim.emoji ? 24 : 20,
                    color: sim.emoji ? undefined : T.cyan,
                  }}>
                    {sim.emoji || <ModuleIcon type={sim.icon} size={22} />}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.03)', color: T.text3, letterSpacing: '0.06em' }}>{sim.cat}</span>
                </div>
                <h3 style={{ fontSize: 19, marginBottom: 10, fontWeight: 600, position: 'relative', zIndex: 1 }}>{sim.title}</h3>
                <p style={{ fontSize: 14, color: T.text2, lineHeight: 1.6, marginBottom: 18, position: 'relative', zIndex: 1 }}>{sim.desc}</p>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.gold2, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em', position: 'relative', zIndex: 1 }}>Open Simulator →</span>
              </button>
            ))}
          </div>

          {/* AI-powered note */}
          <div style={{ marginTop: 56, background: 'rgba(245,185,66,0.06)', border: '1px solid rgba(245,185,66,0.18)', borderRadius: 20, padding: 32, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>🤖</div>
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>AI-Powered Recommendations</h3>
              <p style={{ fontSize: 15, color: T.text2, lineHeight: 1.7 }}>Every simulator analyzes your inputs and provides personalized insights explaining <em>why</em>, not just <em>what</em>. Recommendations are based on RBI, SEBI, IRDAI, and GST Council guidelines. No financial advice — educational insights only.</p>
            </div>
          </div>

          {/* Source credibility */}
          <div style={{ marginTop: 32, padding: 20, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: T.text3, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Trusted Sources</div>
            <div style={{ display: 'flex', gap: '8px 20px', flexWrap: 'wrap', fontSize: 13, color: T.text2 }}>
              {['RBI', 'SEBI', 'IRDAI', 'GST Council', 'NPCI', 'Income Tax Dept', 'NSE', 'BSE', 'AMFI', 'NISM', 'PFRDA', 'NCERT'].map((s, i) => (
                <span key={i}>• {s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All simulator overlays */}
      <BudgetSim active={activeSim === 'budget'} onClose={() => setActiveSim(null)} />
      <SipSim active={activeSim === 'sip'} onClose={() => setActiveSim(null)} />
      <EmiSim active={activeSim === 'emi'} onClose={() => setActiveSim(null)} />
      <CiSim active={activeSim === 'ci'} onClose={() => setActiveSim(null)} />
      <GoalSim active={activeSim === 'goal'} onClose={() => setActiveSim(null)} />
      <InflationSim active={activeSim === 'inflation'} onClose={() => setActiveSim(null)} />
      <NetWorthSim active={activeSim === 'networth'} onClose={() => setActiveSim(null)} />
      <EmergencySim active={activeSim === 'emergency'} onClose={() => setActiveSim(null)} />
      <TaxSim active={activeSim === 'tax'} onClose={() => setActiveSim(null)} />
      {/* New labs */}
      <FdCalc active={activeSim === 'fd'} onClose={() => setActiveSim(null)} />
      <RdCalc active={activeSim === 'rd'} onClose={() => setActiveSim(null)} />
      <LumpsumCalc active={activeSim === 'lumpsum'} onClose={() => setActiveSim(null)} />
      <GoalPlanner active={activeSim === 'goalplanner'} onClose={() => setActiveSim(null)} />
      <RiskAnalyzer active={activeSim === 'risk'} onClose={() => setActiveSim(null)} />
      <InsuranceCalc active={activeSim === 'insurance'} onClose={() => setActiveSim(null)} />
      <GstCalc active={activeSim === 'gst'} onClose={() => setActiveSim(null)} />
      <BreakevenCalc active={activeSim === 'breakeven'} onClose={() => setActiveSim(null)} />
      <ProfitLossCalc active={activeSim === 'pnl'} onClose={() => setActiveSim(null)} />
      <HomeLoanStudio active={activeSim === 'homeloan'} onClose={() => setActiveSim(null)} />
      <EduLoanCenter active={activeSim === 'eduloan'} onClose={() => setActiveSim(null)} />
    </>
  );
}
