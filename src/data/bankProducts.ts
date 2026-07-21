/*
 * FinVerse Bank Product Data Layer
 * ─────────────────────────────────
 * SEPARATED from UI for easy updates.
 * When policies change, update ONLY this file.
 * Source: Official bank websites + RBI guidelines.
 * Last verified: June 2025
 *
 * IMPORTANT: Rates are indicative/educational.
 * Actual rates vary by applicant profile, CIBIL score,
 * loan amount, and bank discretion.
 */

export interface HomeLoanProduct {
  bank: string;
  shortName: string;
  rateMin: number;
  rateMax: number;
  rateType: 'Floating' | 'Fixed' | 'Both';
  maxTenure: number;
  maxLoan: string;
  processingFee: string;
  minIncome: string;
  prepayment: string;
  docs: string[];
  source: string;
}

export const homeLoanProducts: HomeLoanProduct[] = [
  {
    bank: 'State Bank of India', shortName: 'SBI',
    rateMin: 8.50, rateMax: 9.85, rateType: 'Floating',
    maxTenure: 30, maxLoan: '₹15 Cr+',
    processingFee: '0.35% (min ₹2,000, max ₹10,000)',
    minIncome: '₹25,000/month (salaried)',
    prepayment: 'No charge on floating rate (RBI rule)',
    docs: ['PAN', 'Aadhaar', 'Salary slips (3 months)', 'Bank statements (6 months)', 'Property documents', 'Form 16'],
    source: 'sbi.co.in',
  },
  {
    bank: 'HDFC Bank', shortName: 'HDFC',
    rateMin: 8.75, rateMax: 9.65, rateType: 'Both',
    maxTenure: 30, maxLoan: '₹10 Cr+',
    processingFee: 'Up to 0.50% or ₹3,000 (whichever is higher)',
    minIncome: '₹25,000/month',
    prepayment: 'Nil on floating; 2% on fixed',
    docs: ['PAN', 'Aadhaar', 'Salary slips (3 months)', 'IT Returns (2 years)', 'Property papers', 'Bank statements'],
    source: 'hdfcbank.com',
  },
  {
    bank: 'ICICI Bank', shortName: 'ICICI',
    rateMin: 8.75, rateMax: 9.90, rateType: 'Floating',
    maxTenure: 30, maxLoan: '₹10 Cr+',
    processingFee: '0.50% of loan amount + GST',
    minIncome: '₹30,000/month',
    prepayment: 'Nil on floating rate',
    docs: ['PAN', 'Aadhaar', 'Salary slips', 'Form 16', 'Bank statements (6 months)', 'Property documents'],
    source: 'icicibank.com',
  },
  {
    bank: 'Axis Bank', shortName: 'Axis',
    rateMin: 8.75, rateMax: 13.30, rateType: 'Both',
    maxTenure: 30, maxLoan: '₹5 Cr+',
    processingFee: 'Up to 1% of loan amount',
    minIncome: '₹25,000/month',
    prepayment: 'Nil on floating; up to 2% on fixed',
    docs: ['PAN', 'Aadhaar', 'Income proof', 'Property documents', 'Bank statements'],
    source: 'axisbank.com',
  },
  {
    bank: 'Bank of Baroda', shortName: 'BoB',
    rateMin: 8.40, rateMax: 10.65, rateType: 'Floating',
    maxTenure: 30, maxLoan: '₹10 Cr+',
    processingFee: '0.25-0.50% (max ₹25,000)',
    minIncome: '₹20,000/month',
    prepayment: 'Nil on floating rate',
    docs: ['PAN', 'Aadhaar', 'Salary slips', 'IT Returns', 'Property papers'],
    source: 'bankofbaroda.in',
  },
  {
    bank: 'Punjab National Bank', shortName: 'PNB',
    rateMin: 8.45, rateMax: 10.25, rateType: 'Floating',
    maxTenure: 30, maxLoan: '₹Varies',
    processingFee: '0.35% (min ₹2,500, max ₹15,000)',
    minIncome: '₹20,000/month',
    prepayment: 'Nil on floating rate',
    docs: ['PAN', 'Aadhaar', 'Income proof', 'Property documents'],
    source: 'pnbindia.in',
  },
];

export interface EduLoanProduct {
  bank: string;
  shortName: string;
  rateMin: number;
  rateMax: number;
  maxAmount: string;
  collateralRequired: string;
  moratorium: string;
  maxRepayment: string;
  processingFee: string;
  coversAbroad: boolean;
  source: string;
}

export const eduLoanProducts: EduLoanProduct[] = [
  {
    bank: 'State Bank of India', shortName: 'SBI',
    rateMin: 8.55, rateMax: 10.20,
    maxAmount: '₹1.5 Cr (abroad), ₹40 L (India)',
    collateralRequired: 'Above ₹7.5 L',
    moratorium: 'Course + 12 months',
    maxRepayment: '15 years after moratorium',
    processingFee: 'Nil',
    coversAbroad: true,
    source: 'sbi.co.in – SBI Student Loan Scheme',
  },
  {
    bank: 'HDFC Credila', shortName: 'HDFC Credila',
    rateMin: 9.00, rateMax: 13.50,
    maxAmount: '₹45 L (India), ₹1 Cr+ (abroad)',
    collateralRequired: 'Above ₹7.5 L typically',
    moratorium: 'Course + 6 months',
    maxRepayment: '10-15 years',
    processingFee: '1-2% of loan amount',
    coversAbroad: true,
    source: 'hdfccredila.com',
  },
  {
    bank: 'Bank of Baroda', shortName: 'BoB',
    rateMin: 8.35, rateMax: 9.85,
    maxAmount: '₹80 L (abroad), ₹40 L (India)',
    collateralRequired: 'Above ₹4 L',
    moratorium: 'Course + 12 months',
    maxRepayment: '15 years',
    processingFee: 'Nil',
    coversAbroad: true,
    source: 'bankofbaroda.in – Baroda Vidya',
  },
  {
    bank: 'Punjab National Bank', shortName: 'PNB',
    rateMin: 8.45, rateMax: 10.15,
    maxAmount: '₹20 L (India), ₹30 L (abroad)',
    collateralRequired: 'Above ₹7.5 L',
    moratorium: 'Course + 12 months',
    maxRepayment: '15 years',
    processingFee: 'Nil',
    coversAbroad: true,
    source: 'pnbindia.in – PNB Saraswati',
  },
  {
    bank: 'Canara Bank', shortName: 'Canara',
    rateMin: 8.50, rateMax: 9.90,
    maxAmount: '₹40 L (India), ₹80 L (abroad)',
    collateralRequired: 'Above ₹7.5 L',
    moratorium: 'Course + 12 months',
    maxRepayment: '15 years',
    processingFee: 'Nil',
    coversAbroad: true,
    source: 'canarabank.com – Vidya Turant',
  },
];

/*
 * RBI REGULATORY NOTES (for educational display):
 * ─ RBI Master Direction on Interest Rates: Banks must use EBLR/RLLR for floating rate loans
 * ─ RBI/2019-20/86: No prepayment penalty on floating rate loans for individual borrowers
 * ─ IBA Model Education Loan Scheme: Framework for education loans up to ₹7.5L without collateral
 * ─ Vidyalakshmi Portal (vidyalakshmi.co.in): Central govt education loan platform
 */
