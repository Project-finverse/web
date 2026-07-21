import { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { inr } from '../helpers/format';

const T = { void: '#07111F', gold: '#F5B942', gold2: '#FFD37A', green: '#34D399', coral: '#FF6B6B', blue: '#3D5CFF', cyan: '#7C8CFF', ink100: 'rgba(255,255,255,0.95)', ink70: 'rgba(255,255,255,0.68)', ink45: 'rgba(255,255,255,0.44)', line: 'rgba(255,255,255,0.09)' };
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' };
const card: React.CSSProperties = { background: 'rgba(255,255,255,0.025)', border: `1px solid ${T.line}`, borderRadius: 18, padding: 24, marginBottom: 16 };

interface CardProduct {
  bank: string; name: string; type: 'credit' | 'debit';
  annualFee: number; joiningFee: number; cashback: string; rewards: string;
  lounge: string; fuel: string; studentEligible: boolean; interestRate: string;
  pros: string[]; cons: string[];
}

const cards: CardProduct[] = [
  { bank: 'SBI', name: 'SBI SimplyCLICK', type: 'credit', annualFee: 499, joiningFee: 499, cashback: '1.25% on online spends', rewards: '10x on partner sites', lounge: 'None', fuel: '1% surcharge waiver', studentEligible: false, interestRate: '3.35%/month (40.2% p.a.)', pros: ['Low annual fee', 'Good online cashback', 'Amazon/Flipkart rewards'], cons: ['No lounge access', 'Not for students'] },
  { bank: 'HDFC', name: 'HDFC Millennia', type: 'credit', annualFee: 1000, joiningFee: 1000, cashback: '5% on Amazon/Flipkart/Swiggy', rewards: '1% on all other spends', lounge: '8/year domestic', fuel: '1% surcharge waiver', studentEligible: false, interestRate: '3.49%/month (41.9% p.a.)', pros: ['High cashback on apps', 'Lounge access', 'Welcome vouchers'], cons: ['Higher annual fee', 'Min income ₹25K/month'] },
  { bank: 'ICICI', name: 'ICICI Amazon Pay', type: 'credit', annualFee: 0, joiningFee: 0, cashback: '5% on Amazon (Prime), 2% on bill payments', rewards: '1% on all spends', lounge: 'None', fuel: '1% surcharge waiver', studentEligible: false, interestRate: '3.40%/month (40.8% p.a.)', pros: ['Zero annual fee forever', 'Great for Amazon shoppers', 'Easy approval'], cons: ['No lounge access', 'Limited to Amazon ecosystem'] },
  { bank: 'Axis', name: 'Axis ACE', type: 'credit', annualFee: 499, joiningFee: 499, cashback: '5% on bill payments, 2% on everything else', rewards: 'Google Pay cashback', lounge: 'None', fuel: '1% surcharge waiver', studentEligible: false, interestRate: '3.35%/month (40.2% p.a.)', pros: ['Excellent for bill payments', 'Good general cashback', 'Google Pay integration'], cons: ['No lounge access', 'Annual fee not waived'] },
  { bank: 'SBI', name: 'SBI Classic Debit', type: 'debit', annualFee: 125, joiningFee: 0, cashback: 'None', rewards: 'SBI Rewards points', lounge: 'None', fuel: 'None', studentEligible: true, interestRate: 'N/A (debit)', pros: ['Student eligible', 'Low annual fee', 'Wide ATM network'], cons: ['No cashback', 'Basic features'] },
  { bank: 'HDFC', name: 'HDFC EasyShop Platinum', type: 'debit', annualFee: 750, joiningFee: 0, cashback: '0.5% on POS transactions', rewards: 'Reward points', lounge: '2/quarter domestic', fuel: '1% surcharge waiver', studentEligible: false, interestRate: 'N/A (debit)', pros: ['Lounge access', 'Cashback on purchases', 'Insurance cover'], cons: ['Higher annual fee', 'Min balance required'] },
  { bank: 'Kotak', name: 'Kotak 811 Debit', type: 'debit', annualFee: 0, joiningFee: 0, cashback: 'None', rewards: 'None', lounge: 'None', fuel: 'None', studentEligible: true, interestRate: 'N/A (debit)', pros: ['Zero fee', 'Zero balance account', 'Instant digital opening', 'Student friendly'], cons: ['Basic features', 'Limited benefits'] },
];

export default function CardIntelligenceLab() {
  const { navigate } = useNavigation();
  const [typeFilter, setTypeFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'fee' | 'cashback' | 'name'>('fee');
  const [selectedCard, setSelectedCard] = useState<CardProduct | null>(null);
  const [monthlySpend, setMonthlySpend] = useState(10000);
  const [priority, setPriority] = useState<'cashback' | 'lounge' | 'low-fee' | 'student'>('cashback');

  let filtered = typeFilter === 'all' ? cards : cards.filter(c => c.type === typeFilter);
  if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.bank.toLowerCase().includes(search.toLowerCase()));
  if (sortBy === 'fee') filtered.sort((a, b) => a.annualFee - b.annualFee);
  else if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  const recommended = priority === 'student' ? cards.filter(c => c.studentEligible)[0] : priority === 'low-fee' ? cards.filter(c => c.annualFee === 0)[0] : priority === 'lounge' ? cards.find(c => c.lounge !== 'None') : cards.find(c => c.cashback.includes('5%')) || cards[0];

  return (
    <section style={{ padding: '120px 0 80px', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <button onClick={() => navigate('labs-dashboard')} style={{ fontSize: 13, color: T.ink45, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6, ...M }}>← Back to Dashboard</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(245,185,66,0.10)', border: '1px solid rgba(245,185,66,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>💳</div>
          <div>
            <span style={{ ...M, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink45 }}>CREDIT & DEBIT CARD LAB</span>
            <h1 style={{ fontSize: 'clamp(22px,3.5vw,32px)', marginTop: 4 }}>Card Intelligence Center</h1>
          </div>
        </div>

        {/* Your Profile */}
        <div style={card}>
          <div style={{ fontSize: 12, ...M, color: T.gold, letterSpacing: '0.08em', marginBottom: 16 }}>YOUR PREFERENCES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: T.ink45, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', ...M }}>Monthly Spend (₹)</label>
              <input style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.line}`, borderRadius: 12, padding: '13px 14px', color: T.ink100, fontSize: 15, ...M, outline: 'none' }} type="number" value={monthlySpend} onChange={e => setMonthlySpend(Math.max(0, +e.target.value))} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: T.ink45, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', ...M }}>Priority</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {([['cashback', '💰 Cashback'], ['lounge', '✈️ Lounge'], ['low-fee', '🆓 Zero Fee'], ['student', '🎓 Student']] as const).map(([id, label]) => (
                  <button key={id} onClick={() => setPriority(id)} style={{ padding: '8px 14px', borderRadius: 100, fontSize: 11, fontWeight: 600, ...M, background: priority === id ? 'rgba(245,185,66,0.12)' : 'rgba(255,255,255,0.03)', color: priority === id ? T.gold : T.ink45, border: `1px solid ${priority === id ? 'rgba(245,185,66,0.3)' : T.line}`, cursor: 'pointer' }}>{label}</button>
                ))}
              </div>
            </div>
          </div>
          {recommended && (
            <div style={{ marginTop: 20, padding: 16, borderRadius: 14, background: 'rgba(245,185,66,0.06)', border: '1px solid rgba(245,185,66,0.18)' }}>
              <div style={{ fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', marginBottom: 8 }}>🤖 RECOMMENDED FOR YOU</div>
              <div style={{ fontSize: 15, color: T.ink100, fontWeight: 600, marginBottom: 4 }}>{recommended.name} ({recommended.bank})</div>
              <div style={{ fontSize: 13, color: T.ink70 }}>Annual Fee: {inr(recommended.annualFee)} · {recommended.cashback}</div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <input placeholder="Search cards..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.line}`, borderRadius: 12, padding: '10px 14px', color: T.ink100, fontSize: 13, ...M, outline: 'none' }} />
          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', 'credit', 'debit'] as const).map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} style={{ padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600, ...M, background: typeFilter === t ? `linear-gradient(135deg,${T.gold2},${T.gold})` : 'rgba(255,255,255,0.03)', color: typeFilter === t ? T.void : T.ink45, border: typeFilter === t ? 'none' : `1px solid ${T.line}`, cursor: 'pointer', textTransform: 'capitalize' }}>{t === 'all' ? 'All Cards' : `${t} Cards`}</button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} style={{ padding: '8px 14px', borderRadius: 12, fontSize: 12, ...M, background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.line}`, color: T.ink70, outline: 'none', appearance: 'none' as any, cursor: 'pointer' }}>
            <option value="fee" style={{ background: T.void }}>Sort: Fee ↑</option>
            <option value="name" style={{ background: T.void }}>Sort: Name</option>
          </select>
        </div>

        {/* Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((c, i) => (
            <button key={i} onClick={() => setSelectedCard(selectedCard?.name === c.name ? null : c)} style={{ ...card, marginBottom: 0, cursor: 'pointer', textAlign: 'left', width: '100%', border: selectedCard?.name === c.name ? '1px solid rgba(245,185,66,0.3)' : card.border, background: selectedCard?.name === c.name ? 'rgba(245,185,66,0.04)' : card.background }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, ...M, padding: '3px 8px', borderRadius: 100, background: c.type === 'credit' ? 'rgba(61,92,255,0.12)' : 'rgba(52,211,153,0.12)', color: c.type === 'credit' ? T.cyan : T.green, border: `1px solid ${c.type === 'credit' ? 'rgba(61,92,255,0.25)' : 'rgba(52,211,153,0.25)'}`, fontWeight: 700 }}>{c.type.toUpperCase()}</span>
                    {c.studentEligible && <span style={{ fontSize: 10, ...M, padding: '3px 8px', borderRadius: 100, background: 'rgba(52,211,153,0.12)', color: T.green, border: '1px solid rgba(52,211,153,0.25)', fontWeight: 700 }}>STUDENT</span>}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{c.name}</h3>
                  <div style={{ fontSize: 13, color: T.ink45 }}>{c.bank}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: T.ink45, ...M, marginBottom: 4 }}>ANNUAL FEE</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: c.annualFee === 0 ? T.green : T.gold2, fontFamily: 'var(--font-display)' }}>{c.annualFee === 0 ? 'FREE' : inr(c.annualFee)}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap', fontSize: 12, color: T.ink70 }}>
                <span>💰 {c.cashback}</span>
                <span>✈️ {c.lounge}</span>
                <span>⛽ {c.fuel}</span>
              </div>

              {/* Expanded details */}
              {selectedCard?.name === c.name && (
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${T.line}` }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 16 }}>
                    {[
                      { l: 'Joining Fee', v: c.joiningFee === 0 ? 'FREE' : inr(c.joiningFee) },
                      { l: 'Interest Rate', v: c.interestRate },
                      { l: 'Rewards', v: c.rewards },
                    ].map((d, j) => (
                      <div key={j} style={{ padding: 12, background: 'rgba(255,255,255,0.015)', borderRadius: 10, border: `1px solid ${T.line}` }}>
                        <div style={{ fontSize: 10, color: T.ink45, ...M, marginBottom: 4 }}>{d.l}</div>
                        <div style={{ fontSize: 13, color: T.ink100 }}>{d.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, color: T.green, ...M, marginBottom: 8, fontWeight: 600 }}>✓ PROS</div>
                      {c.pros.map((p, j) => <div key={j} style={{ fontSize: 13, color: T.ink70, marginBottom: 6 }}>• {p}</div>)}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: T.coral, ...M, marginBottom: 8, fontWeight: 600 }}>✗ CONS</div>
                      {c.cons.map((p, j) => <div key={j} style={{ fontSize: 13, color: T.ink70, marginBottom: 6 }}>• {p}</div>)}
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: T.ink45 }}>No cards match your search.</div>}

        <div style={{ marginTop: 24, padding: 18, borderRadius: 14, background: 'rgba(245,185,66,0.06)', border: '1px solid rgba(245,185,66,0.18)', fontSize: 13, color: T.ink70, lineHeight: 1.7 }}>
          <div style={{ fontSize: 10, ...M, color: T.gold, letterSpacing: '0.1em', marginBottom: 8 }}>🤖 AI INSIGHT</div>
          {typeFilter === 'credit' ? 'Credit cards charge 36-42% annual interest if you carry a balance. ALWAYS pay the full bill by due date. Minimum payment is a debt trap. (Source: RBI Master Direction on Credit Cards)' : typeFilter === 'debit' ? 'Debit cards spend directly from your bank balance — no debt risk. Ideal for students learning financial discipline.' : `Based on ${inr(monthlySpend)}/month spending, ${priority === 'cashback' ? 'look for cards with 2-5% cashback on your top spending categories' : priority === 'student' ? 'zero-fee debit cards like Kotak 811 are ideal for building banking habits' : priority === 'lounge' ? 'HDFC Millennia or EasyShop Platinum offer domestic lounge access' : 'ICICI Amazon Pay credit card offers zero annual fee forever'}. Never carry credit card balance — interest rates exceed 40% p.a.`}
        </div>
        <div style={{ fontSize: 10, color: T.ink45, marginTop: 16, ...M }}>Sources: Official bank websites · RBI Master Direction on Credit/Debit Cards · Card product pages (rates as of June 2025)</div>
      </div>
    </section>
  );
}
