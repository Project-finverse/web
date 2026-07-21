export interface Lesson {
  num: string;
  title: string;
  desc: string;
}

export interface Module {
  id: string;
  number: string;
  difficulty: string;
  title: string;
  description: string;
  lessonsCount: string;
  xp: string;
  duration: string;
  icon: string;
  lessons: Lesson[];
  isPremium?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

/*
 * CLASS 12 — FINANCIAL, BUSINESS & STARTUP ACADEMY
 * ─────────────────────────────────────────────────
 * 12 industry-grade modules. Goes beyond CBSE to prepare students for
 * internships, startup building, investment analysis, consulting
 * competitions, finance careers and entrepreneurship.
 *
 * Sources: RBI, SEBI, AMFI, NSE, BSE, NSDL, CDSL, Income Tax Dept,
 * GST Council, IRDAI, PFRDA, NPCI, MCA, EPFO, SIDBI, Ministry of Finance
 */

export const modules: Module[] = [
  // ── MODULE 1 ──
  {
    id: 'banking-digital',
    number: '01',
    difficulty: 'Medium',
    title: 'Advanced Banking & Digital Finance',
    description: 'Master the Indian banking system end-to-end — NEFT/RTGS/IMPS architecture, UPI payment flows, KYC/CKYC compliance, credit scoring (CIBIL), API banking, embedded finance, and digital fraud prevention. Includes fintech concepts: open banking, tokenisation, CBDC (Digital Rupee), and Banking-as-a-Service.',
    lessonsCount: '10',
    xp: '100 XP',
    duration: '60 Min',
    icon: 'bank',
    lessons: [
      { num: '01', title: 'The Indian Banking System', desc: 'RBI structure, scheduled vs non-scheduled banks, SLR, CRR, and how money moves through the system.' },
      { num: '02', title: 'Payment Rails: NEFT, RTGS, IMPS, UPI', desc: 'Settlement cycles, transaction limits, NPCI architecture, and when to use each method.' },
      { num: '03', title: 'KYC, CKYC & Digital Identity', desc: 'RBI Master Direction on KYC, Aadhaar-based e-KYC, Video KYC, and CKYC central registry.' },
      { num: '04', title: 'Credit Score & CIBIL', desc: 'How scores are calculated (payment history 35%, utilisation 30%, length 15%, mix 10%, inquiries 10%), what affects them, and score ranges.' },
      { num: '05', title: 'Fintech Revolution', desc: 'Open banking, API banking, embedded finance, digital lending, BNPL, digital wallets, and payment gateways.' },
      { num: '06', title: 'CBDC & Digital Rupee', desc: 'RBI pilot for e-Rupee, wholesale vs retail CBDC, blockchain basics, and how digital currency differs from UPI.' },
      { num: '07', title: 'Banking-as-a-Service & RegTech', desc: 'How fintechs partner with banks, regulatory compliance automation, and the future of financial services.' },
      { num: '08', title: 'Digital Fraud Prevention', desc: 'Phishing, vishing, SIM swap, QR scams, social engineering — identification and reporting (RBI, NPCI, CERT-In).' },
      { num: '09', title: 'Bank Product Comparison', desc: 'Savings accounts, FD/RD, debit/credit cards, and charges across SBI, HDFC, ICICI, Axis, BoB, PNB.' },
      { num: '🏁', title: 'Banking Assessment', desc: 'Complete the Virtual Banking Experience + Card Intelligence labs.' },
    ],
    ctaText: 'Start Module',
  },
  // ── MODULE 2 ──
  {
    id: 'investing-wealth',
    number: '02',
    difficulty: 'Advanced',
    title: 'Investing, Wealth Creation & Market Analysis',
    description: 'Build a virtual portfolio, analyze companies like a research analyst, and understand market dynamics. Covers equity, mutual funds, SIPs, ETFs, bonds, gold, asset allocation — plus investment analysis: P/E ratio, EV/EBITDA, ROE, ROCE, earnings reports, quarterly results, and sector analysis using NSE/BSE data.',
    lessonsCount: '12',
    xp: '140 XP',
    duration: '80 Min',
    icon: 'chart',
    lessons: [
      { num: '01', title: 'Equity Markets & How Exchanges Work', desc: 'NSE, BSE, SEBI regulation, market orders, limit orders, circuit breakers, and settlement (T+1).' },
      { num: '02', title: 'Mutual Funds & AMFI Framework', desc: 'Fund types, NAV calculation, expense ratios, direct vs regular plans, and AMFI industry regulation.' },
      { num: '03', title: 'SIP, Lumpsum & Rupee Cost Averaging', desc: 'Why systematic investing outperforms timing — with historical Nifty 50 CAGR data (NSE).' },
      { num: '04', title: 'ETFs, Index Funds & Passive Investing', desc: 'Tracking error, liquidity, Nifty 50 ETFs, and why passive strategies often beat active management.' },
      { num: '05', title: 'Bonds, G-Secs & Sovereign Gold Bonds', desc: 'RBI Retail Direct, yield curves, coupon rates, and how debt instruments work.' },
      { num: '06', title: 'Company Analysis & Equity Research', desc: 'Reading annual reports, quarterly results, management discussion, and analyst reports.' },
      { num: '07', title: 'Financial Ratios for Investors', desc: 'P/E, PEG, EV/EBITDA, ROE, ROCE, ROA, EPS, Price-to-Book, Dividend Yield — what each ratio reveals.' },
      { num: '08', title: 'Economic Indicators & Market Cycles', desc: 'GDP, CPI, WPI, Repo Rate, Reverse Repo, inflation analysis, and interest rate cycles (RBI MPC).' },
      { num: '09', title: 'Asset Allocation & Risk Profiling', desc: 'Conservative/moderate/aggressive profiles, rebalancing, and SEBI/AMFI asset allocation guidelines.' },
      { num: '10', title: 'Portfolio Returns: CAGR, XIRR & Benchmarks', desc: 'Absolute vs annualised returns, benchmark comparison, and the metrics professionals use.' },
      { num: '11', title: 'Sector & Industry Analysis', desc: 'Top-down analysis, sector rotation, cyclical vs defensive, and identifying investment themes.' },
      { num: '🏁', title: 'Investment Lab', desc: 'Build a virtual portfolio in the Risk Profile Analyzer + SIP Planner + Goal Planner labs.' },
    ],
    ctaText: 'Start Module',
  },
  // ── MODULE 3 ──
  {
    id: 'taxation-compliance',
    number: '03',
    difficulty: 'Advanced',
    title: 'Taxation, Compliance & Tax Optimization',
    description: 'File a complete mock ITR, compare old vs new tax regimes with real calculations, maximize deductions under 80C/80D/80CCD, understand capital gains taxation (STCG/LTCG with indexation), GST compliance, and learn tax optimization strategies used by professionals — all based on the Income Tax Act and GST Council regulations.',
    lessonsCount: '10',
    xp: '120 XP',
    duration: '65 Min',
    icon: 'doc',
    lessons: [
      { num: '01', title: 'Income Tax Framework', desc: 'Progressive taxation, assessment year vs financial year, residential status, and income heads (IT Act 1961).' },
      { num: '02', title: 'Old vs New Regime: Deep Comparison', desc: 'Side-by-side calculations for different income levels — which regime saves more and when to switch.' },
      { num: '03', title: 'Deductions: 80C, 80D, 80CCD & Beyond', desc: 'PPF, ELSS, NPS, health insurance, home loan interest (24b), education loan (80E) — maximizing legally.' },
      { num: '04', title: 'TDS, Advance Tax & Form 26AS', desc: 'Who deducts, TDS rates, quarterly advance tax, and reconciling TDS credits.' },
      { num: '05', title: 'Capital Gains Taxation', desc: 'STCG (15%), LTCG (10% above ₹1L on equity), indexation on debt, property gains, and exemptions (54/54EC).' },
      { num: '06', title: 'GST: Architecture & Compliance', desc: 'CGST, SGST, IGST, Input Tax Credit, reverse charge, composition scheme, and GST return filing.' },
      { num: '07', title: 'Tax Optimization Strategies', desc: 'Salary structuring, HRA optimization, NPS employer contribution, Section 10 exemptions — professional approaches.' },
      { num: '08', title: 'PAN, Aadhaar & Complete ITR Filing', desc: 'Step-by-step filing workflow — login, ITR selection, income entry, deductions, verification, e-filing.' },
      { num: '09', title: 'Wealth Planning & Estate Basics', desc: 'Asset allocation for tax efficiency, nomination, will basics, and succession planning fundamentals.' },
      { num: '🏁', title: 'Tax Filing Lab', desc: 'Complete the Income Tax Filing Experience — 5-step mock ITR + GST Calculator lab.' },
    ],
    ctaText: 'Start Module',
  },
  // ── MODULE 4 ──
  {
    id: 'corporate-finance',
    number: '04',
    difficulty: 'Advanced',
    title: 'Corporate Finance & Financial Modeling',
    description: 'Build a three-statement financial model, calculate DCF valuations, understand NPV/IRR/payback period, analyze capital structure (debt vs equity), and learn WACC, free cash flow, enterprise value, and sensitivity analysis — the exact skills used in investment banking, equity research, and corporate finance roles.',
    lessonsCount: '12',
    xp: '160 XP',
    duration: '90 Min',
    icon: 'briefcase',
    isPremium: true,
    lessons: [
      { num: '01', title: 'Financial Statements Deep Dive', desc: 'P&L, Balance Sheet, Cash Flow Statement — reading them like an analyst, not an accountant (MCA/ICAI format).' },
      { num: '02', title: 'Three-Statement Financial Model', desc: 'How P&L, BS, and CF link together — the foundation of every financial model in investment banking.' },
      { num: '03', title: 'Revenue & Expense Forecasting', desc: 'Top-down, bottom-up, driver-based forecasting — building realistic financial projections.' },
      { num: '04', title: 'Discounted Cash Flow (DCF)', desc: 'Time value of money, discount rates, terminal value, and building a DCF from scratch.' },
      { num: '05', title: 'NPV, IRR & Payback Period', desc: 'Capital budgeting decisions — which projects to invest in and which to reject.' },
      { num: '06', title: 'Cost of Capital & WACC', desc: 'Cost of equity (CAPM), cost of debt, optimal capital structure, and weighted average calculation.' },
      { num: '07', title: 'Enterprise Value & Equity Value', desc: 'EV = Market Cap + Debt - Cash, equity bridges, and why EV matters for M&A.' },
      { num: '08', title: 'Free Cash Flow & Valuation', desc: 'FCFF, FCFE, unlevered FCF — the cash that actually matters for investors.' },
      { num: '09', title: 'Sensitivity & Scenario Analysis', desc: 'What-if analysis, data tables, tornado charts — stress-testing your financial model.' },
      { num: '10', title: 'Capital Structure & Leverage', desc: 'Debt vs equity financing, Modigliani-Miller, financial leverage, and interest coverage.' },
      { num: '11', title: 'Working Capital Optimization', desc: 'Current ratio, quick ratio, cash conversion cycle, inventory and receivable management.' },
      { num: '🏁', title: 'Corporate Finance Lab', desc: 'Build a P&L model in the Profit & Loss Simulator + Break-Even Calculator.' },
    ],
    ctaText: 'Unlock With Premium',
  },
  // ── MODULE 5 ──
  {
    id: 'startup-finance',
    number: '05',
    difficulty: 'Advanced',
    title: 'Startup Finance & Venture Capital',
    description: 'Think like a founder and an investor. Learn lean startup methodology, unit economics (CAC/LTV), burn rate, cash runway, cohort analysis, SaaS metrics — then understand VC funding: seed to Series C, valuations, cap tables, equity dilution, ESOPs, term sheets, and exit strategies including IPO.',
    lessonsCount: '14',
    xp: '180 XP',
    duration: '100 Min',
    icon: 'rocket',
    isPremium: true,
    lessons: [
      { num: '01', title: 'Lean Startup Methodology', desc: 'Build-Measure-Learn, MVP, product-market fit, and why most startups fail (and how to avoid it).' },
      { num: '02', title: 'Business Model Canvas & Lean Canvas', desc: 'One-page frameworks for mapping value proposition, customers, channels, revenue, and cost structure.' },
      { num: '03', title: 'Unit Economics Deep Dive', desc: 'CAC, LTV, LTV/CAC ratio, payback period, gross margin, contribution margin — the metrics VCs evaluate.' },
      { num: '04', title: 'Burn Rate, Runway & Cash Management', desc: 'Monthly burn, gross vs net burn, calculating runway, and when to fundraise vs cut costs.' },
      { num: '05', title: 'SaaS & Subscription Metrics', desc: 'MRR, ARR, churn rate, retention, expansion revenue, and the unit economics of recurring businesses.' },
      { num: '06', title: 'Cohort Analysis & Growth Metrics', desc: 'Retention curves, growth loops, North Star metrics, and product analytics frameworks.' },
      { num: '07', title: 'Venture Capital & Funding Stages', desc: 'Angel investing, seed, Series A/B/C, growth equity — what investors look for at each stage.' },
      { num: '08', title: 'Startup Valuation Methods', desc: 'Pre-money, post-money, comparable analysis, DCF for startups, and why narrative matters.' },
      { num: '09', title: 'Cap Tables & Equity Dilution', desc: 'Founder equity, investor rounds, option pools, ESOP vesting, and dilution math.' },
      { num: '10', title: 'Term Sheets & SAFE Notes', desc: 'Key terms: valuation cap, discount, pro-rata, liquidation preference, anti-dilution — what each means.' },
      { num: '11', title: 'Investor Pitch & Financial Projections', desc: 'Building a 3-year model for pitch decks — revenue, costs, headcount, and key assumptions.' },
      { num: '12', title: 'Due Diligence & Deal Flow', desc: 'What investors check: market size, team, traction, unit economics, legal, and IP.' },
      { num: '13', title: 'Exit Strategies: IPO, M&A & Secondaries', desc: 'How founders and investors make money — IPO process (SEBI), acquisitions, and secondary sales.' },
      { num: '🏁', title: 'Startup Finance Lab', desc: 'Complete Break-Even Calculator + P&L Simulator + build a startup financial model.' },
    ],
    ctaText: 'Unlock With Premium',
  },
  // ── MODULE 6 ──
  {
    id: 'insurance-risk',
    number: '06',
    difficulty: 'Medium',
    title: 'Insurance, Risk Management & Protection',
    description: 'Calculate exact coverage needs using IRDAI formulas. Compare term, endowment, ULIP, and health policies. Understand claim workflows, exclusions, co-pay, sub-limits, and why pure term insurance outperforms traditional plans. Includes vehicle, travel, and professional indemnity insurance.',
    lessonsCount: '8',
    xp: '80 XP',
    duration: '45 Min',
    icon: 'shield',
    lessons: [
      { num: '01', title: 'Insurance Principles & IRDAI', desc: 'Risk pooling, insurable interest, utmost good faith, and how IRDAI regulates insurers in India.' },
      { num: '02', title: 'Term vs Endowment vs ULIP', desc: 'Pure protection vs savings-linked — the math showing why term gives 10x more coverage per rupee.' },
      { num: '03', title: 'Health Insurance Deep Dive', desc: 'Sum insured, co-pay, sub-limits, waiting periods, room rent caps, and reading policy documents.' },
      { num: '04', title: 'Vehicle & Travel Insurance', desc: 'Third-party (mandatory), comprehensive, no-claim bonus, and travel medical coverage.' },
      { num: '05', title: 'Risk Assessment & Coverage Planning', desc: 'Human Life Value method, income replacement, and how much insurance you actually need.' },
      { num: '06', title: 'Claim Process & Grievance Redressal', desc: 'Filing claims, documentation, timelines, IRDAI ombudsman, and escalation procedures.' },
      { num: '07', title: 'InsurTech & Digital Insurance', desc: 'Online-first insurers, sachet insurance, embedded insurance, and how technology is changing the industry.' },
      { num: '🏁', title: 'Insurance Lab', desc: 'Complete the Insurance Need Analyzer — calculate life and health coverage needs.' },
    ],
    ctaText: 'Start Module',
  },
  // ── MODULE 7 ──
  {
    id: 'entrepreneurship-strategy',
    number: '07',
    difficulty: 'Advanced',
    title: 'Entrepreneurship & Business Strategy',
    description: 'From opportunity identification to market entry strategy. Learn Design Thinking, competitive analysis (SWOT, Porter\'s Five Forces, Blue Ocean), market sizing (TAM/SAM/SOM), customer journey mapping, go-to-market strategy, pricing models, and operations management — frameworks used by consultants, founders, and product managers.',
    lessonsCount: '12',
    xp: '140 XP',
    duration: '75 Min',
    icon: 'rocket',
    isPremium: true,
    lessons: [
      { num: '01', title: 'Opportunity Identification', desc: 'Spotting problems worth solving, market gaps, and the difference between ideas and opportunities.' },
      { num: '02', title: 'Design Thinking & Customer Discovery', desc: 'Empathize, Define, Ideate, Prototype, Test — the 5-step framework used by IDEO and Stanford d.school.' },
      { num: '03', title: 'Competitive Analysis: SWOT & Porter\'s 5 Forces', desc: 'Analyzing industry structure, competitive rivalry, threat of substitutes, and barrier to entry.' },
      { num: '04', title: 'Blue Ocean Strategy & Differentiation', desc: 'Creating uncontested market space, value innovation, and the strategy canvas framework.' },
      { num: '05', title: 'Market Sizing: TAM, SAM, SOM', desc: 'Top-down and bottom-up approaches to estimating market opportunity — the way VCs evaluate markets.' },
      { num: '06', title: 'Value Proposition & Brand Positioning', desc: 'Why customers choose you over alternatives — Jobs-to-be-Done, positioning statements, and brand building.' },
      { num: '07', title: 'Go-To-Market Strategy', desc: 'Channel strategy, launch planning, early adopter targeting, and scaling from 0 to 1.' },
      { num: '08', title: 'Pricing Models & Strategy', desc: 'Cost-plus, value-based, freemium, subscription, marketplace — choosing the right model for your business.' },
      { num: '09', title: 'Operations & Supply Chain Basics', desc: 'Inventory management, supply chain optimization, quality control, and lean operations.' },
      { num: '10', title: 'Product Strategy & Roadmapping', desc: 'Feature prioritization, MVP scoping, product lifecycle, and building for scale.' },
      { num: '11', title: 'Customer Journey Mapping & Market Segmentation', desc: 'Understanding buyer behavior, touchpoints, conversion funnels, and segment-specific strategies.' },
      { num: '🏁', title: 'Strategy Lab', desc: 'Complete Break-Even Calculator + build a competitive analysis for a real Indian startup.' },
    ],
    ctaText: 'Unlock With Premium',
  },
  // ── MODULE 8 ──
  {
    id: 'consulting-frameworks',
    number: '08',
    difficulty: 'Advanced',
    title: 'Consulting Frameworks & Decision Science',
    description: 'Think like a McKinsey consultant. Master MECE principle, issue trees, hypothesis-driven thinking, decision trees, cost-benefit analysis, and prioritization frameworks. Learn OKRs, KPIs, Balanced Scorecard, and root cause analysis — essential for case competitions, consulting internships, and analytical problem-solving.',
    lessonsCount: '10',
    xp: '120 XP',
    duration: '60 Min',
    icon: 'target',
    isPremium: true,
    lessons: [
      { num: '01', title: 'MECE Principle & Structured Thinking', desc: 'Mutually Exclusive, Collectively Exhaustive — the foundation of consulting problem-solving.' },
      { num: '02', title: 'Issue Trees & Problem Decomposition', desc: 'Breaking complex problems into solvable sub-problems, layer by layer.' },
      { num: '03', title: 'Hypothesis-Driven Approach', desc: 'Start with an answer, then test it — how consultants work 10x faster than bottom-up thinkers.' },
      { num: '04', title: 'Decision Trees & Expected Value', desc: 'Probability-weighted decision making for business choices with uncertain outcomes.' },
      { num: '05', title: 'Cost-Benefit Analysis', desc: 'Quantifying trade-offs, opportunity costs, and making data-driven recommendations.' },
      { num: '06', title: 'Prioritization: Impact vs Effort Matrix', desc: 'Quick wins, strategic projects, fill-ins, and thankless tasks — allocating limited resources.' },
      { num: '07', title: 'Risk Matrix & Risk Management', desc: 'Probability vs impact, risk mitigation strategies, and building risk registers.' },
      { num: '08', title: 'OKRs & KPIs', desc: 'Objectives and Key Results, Key Performance Indicators — how companies measure what matters.' },
      { num: '09', title: 'Root Cause Analysis & 5 Whys', desc: 'Finding the real problem behind symptoms — Ishikawa diagrams and systematic debugging.' },
      { num: '🏁', title: 'Case Competition Prep', desc: 'Solve a structured business case using all frameworks learned — consulting-style presentation.' },
    ],
    ctaText: 'Unlock With Premium',
  },
  // ── MODULE 9 ──
  {
    id: 'personal-finance-mastery',
    number: '09',
    difficulty: 'Medium',
    title: 'Personal Finance & Financial Independence',
    description: 'Build a complete personal financial plan. Learn goal-based investing, debt management, emergency fund planning, retirement calculation (NPS/EPF via PFRDA/EPFO), estate planning basics, and the path to financial independence — every strategy backed by RBI/SEBI investor education guidelines.',
    lessonsCount: '10',
    xp: '100 XP',
    duration: '55 Min',
    icon: 'target',
    lessons: [
      { num: '01', title: 'Goal-Based Financial Planning', desc: 'Short, medium, long-term goals — mapping each to the right investment vehicle and timeline.' },
      { num: '02', title: 'Emergency Fund Strategy', desc: 'How much, where to keep it, and why 3-6 months of expenses is the minimum (RBI guidance).' },
      { num: '03', title: 'Debt Management & Credit Optimization', desc: 'Good debt vs bad debt, debt-to-income ratio, snowball vs avalanche repayment, and credit score building.' },
      { num: '04', title: 'Asset Allocation by Life Stage', desc: 'How your portfolio should evolve from age 20 to 60 — dynamic allocation strategies.' },
      { num: '05', title: 'Retirement Planning: NPS, EPF & PPF', desc: 'National Pension System (PFRDA), Employee Provident Fund (EPFO), PPF — comparing all three.' },
      { num: '06', title: 'Insurance as Financial Protection', desc: 'Term + health insurance as the foundation of any financial plan — why it comes before investing.' },
      { num: '07', title: 'Tax-Efficient Investing', desc: 'ELSS, NPS 80CCD, LTCG harvesting, and structuring investments to minimize tax legally.' },
      { num: '08', title: 'Estate Planning Basics', desc: 'Nomination, will, POA, succession planning — preparing for the unexpected (Indian Succession Act).' },
      { num: '09', title: 'Financial Independence & FIRE', desc: 'The math behind early retirement — savings rate, SWR (Safe Withdrawal Rate), and corpus calculation.' },
      { num: '🏁', title: 'Personal Finance Lab', desc: 'Build your own financial plan using Goal Planner + Emergency Fund + SIP Planner labs.' },
    ],
    ctaText: 'Start Module',
  },
  // ── MODULE 10 ──
  {
    id: 'fintech-innovation',
    number: '10',
    difficulty: 'Advanced',
    title: 'Fintech, Digital Finance & Innovation',
    description: 'Understand the technology transforming finance — open banking APIs, embedded finance, digital lending, BNPL, payment gateways, tokenisation, CBDC (RBI Digital Rupee), blockchain basics, smart contracts, WealthTech, InsurTech, and RegTech. Learn how India became the world\'s fintech leader.',
    lessonsCount: '10',
    xp: '120 XP',
    duration: '60 Min',
    icon: 'chart',
    isPremium: true,
    lessons: [
      { num: '01', title: 'India\'s Fintech Revolution', desc: 'UPI, Jan Dhan, Aadhaar (India Stack) — how India leapfrogged to digital payments leadership.' },
      { num: '02', title: 'Open Banking & API Economy', desc: 'Account Aggregator framework (RBI), API banking, and how data sharing is transforming finance.' },
      { num: '03', title: 'Embedded Finance & BaaS', desc: 'When non-financial companies offer financial products — why every app is becoming a fintech.' },
      { num: '04', title: 'Digital Lending & BNPL', desc: 'P2P lending (RBI), digital loan origination, BNPL models, and the RBI Digital Lending Guidelines 2022.' },
      { num: '05', title: 'Payment Gateways & Tokenisation', desc: 'How online payments work, PCI-DSS, card tokenisation (RBI mandate), and payment security.' },
      { num: '06', title: 'Blockchain & Smart Contracts', desc: 'Distributed ledgers, consensus mechanisms, Ethereum, and how smart contracts automate agreements.' },
      { num: '07', title: 'CBDC: RBI Digital Rupee', desc: 'Wholesale vs retail CBDC, pilot program, programmable money, and implications for banking.' },
      { num: '08', title: 'WealthTech & Robo-Advisory', desc: 'Algorithm-based investing, goal-based platforms, and how technology democratizes wealth management.' },
      { num: '09', title: 'InsurTech & RegTech', desc: 'Digital-first insurance, parametric products, regulatory technology, and compliance automation.' },
      { num: '🏁', title: 'Fintech Innovation Lab', desc: 'Analyze a fintech business model and present a go-to-market strategy.' },
    ],
    ctaText: 'Unlock With Premium',
  },
  // ── MODULE 11 ──
  {
    id: 'business-accounting',
    number: '11',
    difficulty: 'Advanced',
    title: 'Business Finance, Accounting & Ratios',
    description: 'Build financial statements from scratch. Analyze profitability using ratios (ROE, ROCE, ROA, EPS, D/E), calculate break-even, manage cash flow and working capital. Every calculation follows MCA/ICAI standards. Includes financial ratio dashboard and balance sheet analysis used in equity research.',
    lessonsCount: '10',
    xp: '120 XP',
    duration: '65 Min',
    icon: 'briefcase',
    isPremium: true,
    lessons: [
      { num: '01', title: 'P&L, Balance Sheet & Cash Flow', desc: 'The three financial statements — structure, components, and how they interconnect (MCA format).' },
      { num: '02', title: 'Revenue Recognition & Expense Matching', desc: 'Accrual vs cash accounting, when to recognize revenue, and matching principle (Ind AS/IFRS).' },
      { num: '03', title: 'Profitability Ratios', desc: 'Gross margin, EBITDA margin, operating margin, net margin — what each reveals about business health.' },
      { num: '04', title: 'Return Ratios: ROE, ROCE, ROA', desc: 'Return on Equity, Return on Capital Employed, Return on Assets — DuPont decomposition analysis.' },
      { num: '05', title: 'Leverage & Solvency Ratios', desc: 'Debt-to-Equity, Interest Coverage, Debt Service Coverage — assessing financial risk.' },
      { num: '06', title: 'Liquidity & Working Capital', desc: 'Current ratio, Quick ratio, Cash Conversion Cycle, and managing day-to-day business finance.' },
      { num: '07', title: 'Break-Even & Margin of Safety', desc: 'Fixed costs, variable costs, contribution margin, and calculating the break-even revenue point.' },
      { num: '08', title: 'Cash Flow Analysis & Forecasting', desc: 'Operating, investing, financing activities — free cash flow and why cash is king.' },
      { num: '09', title: 'Budget Planning & Variance Analysis', desc: 'Master budgets, flexible budgets, and analyzing actual vs planned performance.' },
      { num: '🏁', title: 'Accounting Lab', desc: 'Build a P&L statement + calculate ratios in the P&L Simulator and Break-Even Calculator.' },
    ],
    ctaText: 'Unlock With Premium',
  },
  // ── MODULE 12 ──
  {
    id: 'career-preparation',
    number: '12',
    difficulty: 'Advanced',
    title: 'Career Readiness & Professional Finance',
    description: 'Prepare for finance internships, consulting case competitions, startup pitch events, and investment club activities. Learn to read annual reports, build financial dashboards, create investment memos, evaluate businesses Shark Tank-style, and present financial analysis professionally — the skills that separate candidates.',
    lessonsCount: '10',
    xp: '130 XP',
    duration: '70 Min',
    icon: 'target',
    isPremium: true,
    lessons: [
      { num: '01', title: 'Reading Annual Reports Like an Analyst', desc: 'MD&A, auditor notes, related party transactions, contingent liabilities — what matters beyond the numbers.' },
      { num: '02', title: 'Analyzing Company Financials', desc: 'Step-by-step company analysis: revenue trends, margin evolution, cash generation, and red flags.' },
      { num: '03', title: 'Building Financial Dashboards', desc: 'Key metrics, data visualization, storytelling with data, and presenting insights clearly.' },
      { num: '04', title: 'Excel for Finance', desc: 'Essential functions (VLOOKUP, INDEX-MATCH, NPV, IRR, PMT), pivot tables, and modeling shortcuts.' },
      { num: '05', title: 'Investment Memos & Research Notes', desc: 'How analysts write investment recommendations — structure, thesis, risks, and target price.' },
      { num: '06', title: 'Business Case Studies', desc: 'Analyzing real Indian companies — what worked, what failed, and the financial decisions behind outcomes.' },
      { num: '07', title: 'Shark Tank-Style Business Evaluation', desc: 'Evaluating pitches: market size, unit economics, team, traction, valuation, and deal terms.' },
      { num: '08', title: 'Consulting Case Problem Solving', desc: 'Market entry, profitability, pricing, M&A — structured frameworks for case interviews and competitions.' },
      { num: '09', title: 'Financial Presentation Skills', desc: 'Building compelling pitch decks, presenting data, storytelling, and handling Q&A professionally.' },
      { num: '🏁', title: 'Capstone Project', desc: 'Complete a full company analysis OR startup financial model — present to earn the Career Ready badge.' },
    ],
    ctaText: 'Unlock With Premium',
  },
];

export const tileDescriptions: Record<string, string> = {
  'banking-digital': 'Banking architecture, UPI, KYC, credit scoring, fintech, CBDC, and digital fraud prevention.',
  'investing-wealth': 'Equity research, mutual funds, SIP, ETFs, financial ratios, economic indicators, and portfolio building.',
  'taxation-compliance': 'ITR filing, old vs new regime, capital gains, GST, TDS, tax optimization, and estate planning.',
  'corporate-finance': 'Financial modeling, DCF, NPV/IRR, WACC, enterprise value, sensitivity analysis, and capital structure.',
  'startup-finance': 'Unit economics, burn rate, VC funding, cap tables, valuations, term sheets, and exit strategies.',
  'insurance-risk': 'Term vs ULIP, health insurance deep dive, claims, InsurTech, and coverage planning (IRDAI).',
  'entrepreneurship-strategy': 'Design thinking, SWOT, Porter\'s 5 Forces, TAM/SAM/SOM, pricing, go-to-market, and operations.',
  'consulting-frameworks': 'MECE, issue trees, decision trees, cost-benefit, OKRs, KPIs, and case competition preparation.',
  'personal-finance-mastery': 'Goal-based investing, debt management, NPS/EPF, retirement planning, and financial independence.',
  'fintech-innovation': 'Open banking, embedded finance, CBDC, blockchain, BNPL, WealthTech, InsurTech, and RegTech.',
  'business-accounting': 'Financial statements, ratio analysis (ROE/ROCE/ROA), break-even, cash flow, and budget planning.',
  'career-preparation': 'Annual reports, financial dashboards, investment memos, case studies, and professional presentation.',
  // Legacy
  financial: 'Money, inflation, budgeting, savings and emergency funds.',
  banking: 'Accounts, UPI, debit cards, NEFT, RTGS and digital banking.',
  investing: 'Stocks, SIP, Mutual Funds, Gold, Bonds and risk.',
  tax: 'Income Tax, GST, TDS, PAN, Aadhaar and filing basics.',
  cyber: 'QR scams, phishing, OTP frauds and staying safe online.',
  advanced: 'Insurance, loans, credit score and building a business mindset.',
};
