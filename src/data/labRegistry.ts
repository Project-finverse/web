/*
 * FinVerse Financial Lab Registry
 * ────────────────────────────────
 * Central registry of all Financial Labs.
 * Add new labs here — the hub page auto-discovers them.
 * Separated from UI for scalability.
 */

export interface LabDef {
  id: string;
  title: string;
  icon: string;
  category: string;
  classLevel: number[];
  tier: 'basic' | 'intermediate' | 'advanced';
  desc: string;
  features: string[];
  status: 'live' | 'coming';
  sources: string[];
}

export const labCategories = [
  { id: 'all', label: 'All Labs', icon: '🎮' },
  { id: 'banking', label: 'Banking', icon: '🏦' },
  { id: 'tax', label: 'Taxation', icon: '📋' },
  { id: 'loans', label: 'Loans & Credit', icon: '💳' },
  { id: 'investing', label: 'Investing', icon: '📈' },
  { id: 'insurance', label: 'Insurance', icon: '🛡️' },
  { id: 'business', label: 'Entrepreneurship', icon: '🚀' },
  { id: 'cyber', label: 'Cyber Safety', icon: '🔐' },
  { id: 'planning', label: 'Planning', icon: '🎯' },
];

export const labs: LabDef[] = [
  // ── BANKING ──
  { id: 'banking-lab', title: 'Virtual Banking Experience', icon: '🏦', category: 'banking', classLevel: [9, 10, 12], tier: 'intermediate', desc: 'Complete banking workflow — account opening, KYC, UPI, debit cards, passbook, and bank comparison.', features: ['Account setup', 'KYC verification', 'UPI registration', 'Debit card', 'Bank comparison', 'Transaction history'], status: 'live', sources: ['RBI', 'NPCI'] },
  { id: 'budget-planner', title: 'Personal Budget Lab', icon: '💰', category: 'planning', classLevel: [9], tier: 'basic', desc: 'Create your first monthly budget using the 50-30-20 framework.', features: ['Income allocation', 'Expense tracking', 'Savings rate'], status: 'live', sources: ['RBI Financial Literacy'] },
  { id: 'fd-calculator', title: 'Fixed Deposit Experience', icon: '🏦', category: 'banking', classLevel: [10, 12], tier: 'basic', desc: 'Calculate FD maturity with quarterly compounding per RBI norms.', features: ['Multi-bank rates', 'Maturity calculator', 'Effective rate'], status: 'live', sources: ['RBI Master Direction'] },
  { id: 'rd-calculator', title: 'Recurring Deposit Planner', icon: '🏦', category: 'banking', classLevel: [10], tier: 'intermediate', desc: 'Plan monthly RD savings with guaranteed returns.', features: ['Monthly deposits', 'Maturity projection', 'Bank comparison'], status: 'live', sources: ['RBI Guidelines'] },

  // ── TAX ──
  { id: 'income-tax-lab', title: 'Income Tax Filing Experience', icon: '📋', category: 'tax', classLevel: [12], tier: 'advanced', desc: 'Complete mock ITR filing — from salary entry to tax summary. Experience the full workflow.', features: ['Tax regime selection', 'Salary & income entry', 'Deductions (80C/80D)', 'Slab calculation', 'Tax saving suggestions', 'Mock submission'], status: 'live', sources: ['Income Tax Department', 'IT Act 1961'] },
  { id: 'gst-calculator', title: 'GST Bill Explorer', icon: '🧾', category: 'tax', classLevel: [10, 12], tier: 'basic', desc: 'Calculate GST breakdowns with CGST/SGST splits per GST Council.', features: ['All GST slabs', 'Inclusive/exclusive', 'Invoice breakdown'], status: 'live', sources: ['GST Council', 'CBIC'] },

  // ── LOANS ──
  { id: 'emi-calculator', title: 'EMI Calculator', icon: '🏠', category: 'loans', classLevel: [12], tier: 'basic', desc: 'Analyze loan structures, interest costs and repayment schedules.', features: ['EMI calculation', 'Interest breakdown', 'Amortization'], status: 'live', sources: ['RBI'] },
  { id: 'home-loan-studio', title: 'Home Loan Decision Studio', icon: '🏠', category: 'loans', classLevel: [12], tier: 'advanced', desc: 'Compare home loans across 6+ banks with amortization schedules and affordability analysis.', features: ['Multi-bank comparison', 'Amortization schedule', 'Affordability analysis', 'DTI ratio', 'Document checklist'], status: 'live', sources: ['SBI', 'HDFC Bank', 'ICICI Bank', 'RBI'] },
  { id: 'education-loan', title: 'Education Loan Planner', icon: '🎓', category: 'loans', classLevel: [12], tier: 'intermediate', desc: 'Plan university funding and compare education loan schemes across banks.', features: ['Cost estimation', 'Bank comparison', 'Moratorium planning', 'EMI projection'], status: 'live', sources: ['IBA Model Scheme', 'RBI', 'Vidyalakshmi Portal'] },

  // ── INVESTING ──
  { id: 'sip-calculator', title: 'SIP Planner', icon: '📈', category: 'investing', classLevel: [11, 12], tier: 'basic', desc: 'Model systematic compounding over decades with sparkline charts.', features: ['Monthly SIP', 'Growth projection', 'Wealth breakdown'], status: 'live', sources: ['SEBI', 'AMFI'] },
  { id: 'compound-interest', title: 'Compound Growth Experience', icon: '📈', category: 'investing', classLevel: [11], tier: 'basic', desc: 'Visualize exponential growth on lump-sum investments.', features: ['Growth chart', 'Rule of 72', 'Time comparison'], status: 'live', sources: ['NSE'] },
  { id: 'lumpsum-calculator', title: 'Lumpsum Calculator', icon: '📈', category: 'investing', classLevel: [11, 12], tier: 'intermediate', desc: 'One-time investment returns with CAGR analysis.', features: ['Future value', 'Absolute return', 'CAGR'], status: 'live', sources: ['SEBI', 'NSE'] },
  { id: 'goal-planner', title: 'Financial Goal Planner', icon: '🎯', category: 'investing', classLevel: [11, 12], tier: 'intermediate', desc: 'Reverse-engineer SIP or lumpsum for any financial goal.', features: ['SIP calculation', 'Lumpsum alternative', 'Timeline analysis'], status: 'live', sources: ['SEBI'] },
  { id: 'risk-analyzer', title: 'Risk Profile Analyzer', icon: '📊', category: 'investing', classLevel: [11, 12], tier: 'advanced', desc: 'Determine ideal asset allocation based on SEBI/AMFI guidelines.', features: ['Risk profiling', 'Asset allocation', 'Portfolio suggestion'], status: 'live', sources: ['SEBI', 'AMFI'] },

  // ── INSURANCE ──
  { id: 'insurance-analyzer', title: 'Insurance Need Analyzer', icon: '🛡️', category: 'insurance', classLevel: [12], tier: 'intermediate', desc: 'Calculate life and health coverage needs per IRDAI guidelines.', features: ['Life cover', 'Health cover', 'Premium estimation'], status: 'live', sources: ['IRDAI'] },

  // ── BUSINESS ──
  { id: 'breakeven-calculator', title: 'Break-Even Calculator', icon: '🚀', category: 'business', classLevel: [11, 12], tier: 'intermediate', desc: 'Find units to sell to cover costs for your business.', features: ['Fixed costs', 'Contribution margin', 'Break-even point'], status: 'live', sources: ['SIDBI'] },
  { id: 'profit-loss', title: 'Profit & Loss Simulator', icon: '📊', category: 'business', classLevel: [11, 12], tier: 'advanced', desc: 'Build a P&L statement with margin analysis.', features: ['Revenue entry', 'Cost analysis', 'Net margin'], status: 'live', sources: ['MCA'] },

  // ── PLANNING ──
  { id: 'savings-goal', title: 'Savings Goal', icon: '🎯', category: 'planning', classLevel: [9, 10], tier: 'basic', desc: 'How much to save monthly for any target.', features: ['Monthly target', 'Timeline'], status: 'live', sources: ['RBI Financial Literacy'] },
  { id: 'inflation-calculator', title: 'Inflation Impact', icon: '📉', category: 'planning', classLevel: [10, 11], tier: 'basic', desc: 'How purchasing power erodes over time.', features: ['Future cost', 'Purchasing power'], status: 'live', sources: ['RBI'] },
  { id: 'networth-calculator', title: 'Net Worth Calculator', icon: '💼', category: 'planning', classLevel: [9, 12], tier: 'basic', desc: 'Assets minus liabilities — your financial position.', features: ['Asset tracking', 'Liability tracking'], status: 'live', sources: ['RBI'] },
  { id: 'emergency-fund', title: 'Emergency Fund Calculator', icon: '☂️', category: 'planning', classLevel: [9, 10], tier: 'basic', desc: 'Calculate your ideal safety cushion.', features: ['Monthly expenses', 'Safety months'], status: 'live', sources: ['RBI'] },

  // ── CYBER SAFETY ──
  { id: 'cyber-safety', title: 'Digital Payments & Cyber Safety Lab', icon: '🔐', category: 'cyber', classLevel: [9, 10], tier: 'intermediate', desc: 'Scenario-based cyber safety training — spot UPI fraud, phishing, QR scams, and fake investment apps.', features: ['5 real-world scenarios', 'Decision-making quiz', 'Scam detection', 'Official safety guidelines'], status: 'live', sources: ['NPCI', 'RBI', 'CERT-In', 'SEBI'] },

  // ── CARDS ──
  { id: 'card-intelligence', title: 'Credit & Debit Card Intelligence', icon: '💳', category: 'banking', classLevel: [12], tier: 'advanced', desc: 'Compare credit and debit cards across major banks — fees, cashback, rewards, lounge access, and student eligibility.', features: ['7 card products', 'Search & filter', 'Pros & cons', 'AI recommendations', 'Student cards'], status: 'live', sources: ['RBI Master Direction on Cards', 'Official bank websites'] },
];

/*
 * TIER ORDERING: Advanced → Intermediate → Basic
 * This is enforced everywhere labs are displayed.
 */
const tierOrder: Record<string, number> = { advanced: 0, intermediate: 1, basic: 2 };

function sortByTier(a: LabDef, b: LabDef): number {
  return (tierOrder[a.tier] ?? 2) - (tierOrder[b.tier] ?? 2);
}

export function getLabsByClass(classNum: number): LabDef[] {
  return labs.filter(l => l.classLevel.includes(classNum)).sort(sortByTier);
}

export function getLabsByCategory(cat: string): LabDef[] {
  const result = cat === 'all' ? [...labs] : labs.filter(l => l.category === cat);
  return result.sort(sortByTier);
}

export function getLabById(id: string): LabDef | undefined {
  return labs.find(l => l.id === id);
}

export function getLabsSorted(): LabDef[] {
  return [...labs].sort(sortByTier);
}
