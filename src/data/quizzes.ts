export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Quiz {
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
}

export const quizzes: Record<string, Quiz> = {
  financial: {
    moduleId: 'financial',
    title: 'Financial Basics Quiz',
    questions: [
      {
        question: 'What is the recommended percentage of income to save according to the 50-30-20 rule?',
        options: ['10%', '15%', '20%', '30%'],
        correct: 2,
        explanation: 'The 50-30-20 rule suggests allocating 50% to needs, 30% to wants, and 20% to savings and investments.',
      },
      {
        question: 'What is inflation?',
        options: ['Decrease in prices over time', 'Increase in prices over time', 'Stable prices', 'Government spending'],
        correct: 1,
        explanation: 'Inflation is the rate at which the general level of prices for goods and services rises, reducing purchasing power.',
      },
      {
        question: 'How many months of expenses should an emergency fund cover?',
        options: ['1-2 months', '3-6 months', '12 months', 'No specific amount'],
        correct: 1,
        explanation: 'Financial experts recommend maintaining 3-6 months of expenses as an emergency fund.',
      },
      {
        question: 'What does SMART stand for in goal setting?',
        options: ['Save Money And Retire Today', 'Specific, Measurable, Achievable, Relevant, Time-bound', 'Simple Methods Achieve Real Targets', 'None of the above'],
        correct: 1,
        explanation: 'SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound.',
      },
      {
        question: 'If inflation is 6% and your savings account gives 4% interest, what happens to your purchasing power?',
        options: ['It increases', 'It decreases', 'It stays the same', 'Cannot determine'],
        correct: 1,
        explanation: 'When inflation exceeds your returns, your purchasing power decreases. You\'re effectively losing 2% per year.',
      },
      {
        question: 'Which category does rent fall under in the 50-30-20 rule?',
        options: ['Wants', 'Needs', 'Savings', 'Investments'],
        correct: 1,
        explanation: 'Rent is a necessity and falls under the 50% "Needs" category.',
      },
      {
        question: 'What is the primary purpose of budgeting?',
        options: ['To restrict spending', 'To plan and track money usage', 'To eliminate all expenses', 'To maximize debt'],
        correct: 1,
        explanation: 'Budgeting helps you plan where your money goes and ensures you don\'t spend more than you earn.',
      },
      {
        question: 'Which is a short-term financial goal?',
        options: ['Retirement planning', 'Buying a house', 'Saving for a new phone', 'Children\'s education fund'],
        correct: 2,
        explanation: 'Short-term goals are typically achievable within 1 year, like saving for a phone or vacation.',
      },
      {
        question: 'What happens if you don\'t account for inflation in long-term savings?',
        options: ['Your money grows faster', 'Your money loses real value', 'Nothing changes', 'Interest rates increase'],
        correct: 1,
        explanation: 'Without beating inflation, your savings lose purchasing power over time even if the number grows.',
      },
      {
        question: 'When should you start building an emergency fund?',
        options: ['After retirement', 'When you get your first job', 'Only if you\'re wealthy', 'As soon as you have any income'],
        correct: 3,
        explanation: 'You should start building an emergency fund as soon as you have any income, even while in school.',
      },
    ],
  },
  banking: {
    moduleId: 'banking',
    title: 'Banking Quiz',
    questions: [
      {
        question: 'What does UPI stand for?',
        options: ['Universal Payment Integration', 'Unified Payments Interface', 'United Payment Initiative', 'Unified Payment Integration'],
        correct: 1,
        explanation: 'UPI stands for Unified Payments Interface, India\'s instant real-time payment system.',
      },
      {
        question: 'How much deposit is insured by DICGC per depositor per bank?',
        options: ['₹1 lakh', '₹2 lakh', '₹5 lakh', '₹10 lakh'],
        correct: 2,
        explanation: 'DICGC insures deposits up to ₹5 lakh per depositor per bank.',
      },
      {
        question: 'Which transfer method is real-time and requires a minimum of ₹2 lakh?',
        options: ['NEFT', 'IMPS', 'RTGS', 'UPI'],
        correct: 2,
        explanation: 'RTGS (Real Time Gross Settlement) is for large-value transactions with a minimum of ₹2 lakh.',
      },
      {
        question: 'Do you need to enter your PIN to receive money via UPI?',
        options: ['Yes, always', 'Only for large amounts', 'No, never', 'Only for new contacts'],
        correct: 2,
        explanation: 'You NEVER need to enter your PIN to receive money. If someone asks you to, it\'s a scam.',
      },
      {
        question: 'What is a savings account best used for?',
        options: ['Business transactions', 'Personal savings with interest', 'Unlimited transactions', 'Foreign currency'],
        correct: 1,
        explanation: 'Savings accounts are for personal use, earning interest while allowing limited transactions.',
      },
      {
        question: 'How many free ATM transactions are typically allowed at other bank ATMs per month?',
        options: ['1', '3', '5', 'Unlimited'],
        correct: 1,
        explanation: 'Most banks allow 3 free transactions at other bank ATMs per month.',
      },
      {
        question: 'What should you do if you suspect your debit card is compromised?',
        options: ['Wait and see', 'Block it immediately', 'Continue using it', 'Share the details to verify'],
        correct: 1,
        explanation: 'Block your card immediately through net banking or by calling your bank\'s helpline.',
      },
      {
        question: 'Which is NOT a feature of net banking?',
        options: ['View statements', 'Physical cash withdrawal', 'Bill payments', 'Fund transfers'],
        correct: 1,
        explanation: 'Net banking is online-only. Physical cash withdrawal requires ATM or branch visit.',
      },
      {
        question: 'What is IMPS best suited for?',
        options: ['Large corporate transfers', 'Instant small to medium transfers 24/7', 'Batch processing', 'Only weekday transfers'],
        correct: 1,
        explanation: 'IMPS allows instant transfers 24/7, even on holidays, for up to ₹5 lakh.',
      },
      {
        question: 'Why should you bookmark your bank\'s website?',
        options: ['To save time', 'To avoid phishing sites', 'Banks require it', 'For better interest rates'],
        correct: 1,
        explanation: 'Bookmarking prevents accidentally accessing fake phishing sites that look like your bank.',
      },
    ],
  },
  investing: {
    moduleId: 'investing',
    title: 'Investing Quiz',
    questions: [
      {
        question: 'What is a stock?',
        options: ['A loan to a company', 'Ownership share in a company', 'A government bond', 'A type of savings account'],
        correct: 1,
        explanation: 'A stock represents partial ownership in a company. When you buy shares, you own a piece of that company.',
      },
      {
        question: 'What does SIP stand for?',
        options: ['Simple Investment Plan', 'Systematic Investment Plan', 'Standard Investment Protocol', 'Savings Investment Platform'],
        correct: 1,
        explanation: 'SIP stands for Systematic Investment Plan - investing a fixed amount regularly.',
      },
      {
        question: 'According to the Rule of 72, how long does it take to double money at 12% annual return?',
        options: ['4 years', '6 years', '8 years', '12 years'],
        correct: 1,
        explanation: 'Rule of 72: Years to double = 72 ÷ Interest Rate. 72 ÷ 12 = 6 years.',
      },
      {
        question: 'Which type of mutual fund is generally considered lowest risk?',
        options: ['Equity Fund', 'Debt Fund', 'Small Cap Fund', 'Sectoral Fund'],
        correct: 1,
        explanation: 'Debt funds invest in bonds and fixed-income securities, making them lower risk than equity funds.',
      },
      {
        question: 'What is diversification?',
        options: ['Putting all money in one stock', 'Spreading investments across different assets', 'Investing only in gold', 'Day trading'],
        correct: 1,
        explanation: 'Diversification means spreading investments to reduce risk - not putting all eggs in one basket.',
      },
      {
        question: 'Which is considered a safe investment for gold in India?',
        options: ['Gold jewelry', 'Digital Gold only', 'Sovereign Gold Bonds', 'Gold coins from unknown sources'],
        correct: 2,
        explanation: 'Sovereign Gold Bonds (SGBs) are government-backed, offer interest, and are tax-free at maturity.',
      },
      {
        question: 'Why is starting to invest early important?',
        options: ['You can take more risk', 'Compound interest has more time to work', 'Stocks are cheaper', 'No reason'],
        correct: 1,
        explanation: 'Starting early allows compound interest more time to grow your wealth exponentially.',
      },
      {
        question: 'What does CAGR stand for?',
        options: ['Current Annual Growth Rate', 'Compound Annual Growth Rate', 'Common Annual Gain Rate', 'Calculated Average Growth Return'],
        correct: 1,
        explanation: 'CAGR (Compound Annual Growth Rate) shows the smoothed annual return over a period.',
      },
      {
        question: 'What is rebalancing a portfolio?',
        options: ['Selling all investments', 'Adjusting back to target allocation', 'Only buying new stocks', 'Avoiding investments'],
        correct: 1,
        explanation: 'Rebalancing means adjusting your portfolio back to your desired asset allocation.',
      },
      {
        question: 'Which index tracks 50 large companies on NSE?',
        options: ['Sensex', 'Nifty 50', 'Bank Nifty', 'Dow Jones'],
        correct: 1,
        explanation: 'Nifty 50 tracks the 50 largest companies listed on the National Stock Exchange.',
      },
    ],
  },
  tax: {
    moduleId: 'tax',
    title: 'Taxation Quiz',
    questions: [
      {
        question: 'What type of tax is GST?',
        options: ['Direct Tax', 'Indirect Tax', 'Wealth Tax', 'Property Tax'],
        correct: 1,
        explanation: 'GST is an indirect tax included in the price of goods and services.',
      },
      {
        question: 'What is the income tax exemption limit under the new regime?',
        options: ['₹2.5 lakh', '₹3 lakh', '₹5 lakh', '₹7 lakh'],
        correct: 1,
        explanation: 'Under the new tax regime, income up to ₹3 lakh is exempt from tax.',
      },
      {
        question: 'What does TDS stand for?',
        options: ['Tax Deducted at Source', 'Total Deduction System', 'Tax Distribution Service', 'Total Direct Savings'],
        correct: 0,
        explanation: 'TDS (Tax Deducted at Source) is tax collected at the point of income payment.',
      },
      {
        question: 'What is PAN used for?',
        options: ['Cooking', 'Unique tax identification', 'Banking only', 'Travel'],
        correct: 1,
        explanation: 'PAN (Permanent Account Number) is your unique tax identification number in India.',
      },
      {
        question: 'Which GST slab applies to most restaurant bills?',
        options: ['5%', '12%', '18%', '28%'],
        correct: 2,
        explanation: 'Most restaurants charge 18% GST (5% for non-AC restaurants).',
      },
      {
        question: 'What form do you submit to avoid TDS on FD interest if income is below threshold?',
        options: ['Form 16', 'Form 26AS', 'Form 15G/15H', 'ITR-1'],
        correct: 2,
        explanation: 'Form 15G (below 60) or 15H (senior citizens) prevents TDS deduction on FD interest.',
      },
      {
        question: 'By when should salaried individuals file ITR?',
        options: ['March 31', 'June 30', 'July 31', 'December 31'],
        correct: 2,
        explanation: 'The usual deadline for salaried individuals to file ITR is July 31st.',
      },
      {
        question: 'India has which type of income tax system?',
        options: ['Flat rate', 'Progressive', 'Regressive', 'No system'],
        correct: 1,
        explanation: 'India has a progressive tax system - higher income is taxed at higher rates.',
      },
      {
        question: 'What is Section 80C famous for?',
        options: ['GST exemptions', 'Tax deductions on investments', 'Free tax filing', 'No TDS'],
        correct: 1,
        explanation: 'Section 80C allows deductions up to ₹1.5 lakh on investments like PPF, ELSS, and life insurance (old regime).',
      },
      {
        question: 'Is linking Aadhaar with PAN mandatory?',
        options: ['No, optional', 'Yes, for all Indians', 'Only for businesses', 'Only for senior citizens'],
        correct: 1,
        explanation: 'Linking Aadhaar with PAN is mandatory for filing income tax returns.',
      },
    ],
  },
  cyber: {
    moduleId: 'cyber',
    title: 'Cyber Safety Quiz',
    questions: [
      {
        question: 'What is phishing?',
        options: ['A type of fishing', 'Scam pretending to be legitimate to steal info', 'A banking feature', 'Password protection'],
        correct: 1,
        explanation: 'Phishing is when scammers impersonate legitimate organizations to steal your personal information.',
      },
      {
        question: 'Do you need to enter PIN to receive money via UPI?',
        options: ['Yes, always', 'Only above ₹10,000', 'No, never', 'Sometimes'],
        correct: 2,
        explanation: 'You NEVER need to enter PIN to receive money. Anyone asking you to enter PIN for receiving is scamming you.',
      },
      {
        question: 'What should you do if you receive an urgent message about your bank account being blocked?',
        options: ['Click the link immediately', 'Call the number in the message', 'Ignore or call bank\'s official number', 'Share OTP'],
        correct: 2,
        explanation: 'Never click links in such messages. Call your bank using the official number from their website.',
      },
      {
        question: 'What is a QR code used for in UPI?',
        options: ['Receiving money', 'Paying money', 'Both equally', 'Account verification'],
        correct: 1,
        explanation: 'Scanning a QR code and entering PIN means YOU are PAYING. QR codes are for payment, not receiving.',
      },
      {
        question: 'What is a red flag for fake investment apps?',
        options: ['SEBI registration', 'Reasonable returns', 'Guaranteed 20% monthly returns', 'Company information available'],
        correct: 2,
        explanation: 'Guaranteed high returns (like 20% monthly) are impossible and are a clear sign of fraud.',
      },
      {
        question: 'How can you identify a fake website URL?',
        options: ['It has https', 'Minor spelling differences like amaz0n', 'It loads quickly', 'It has a logo'],
        correct: 1,
        explanation: 'Fake sites often have minor URL variations (numbers for letters, extra words, wrong domain).',
      },
      {
        question: 'What should you do if you accidentally shared OTP with a scammer?',
        options: ['Wait and see', 'Block card and report immediately', 'Share more details', 'Nothing, OTPs expire'],
        correct: 1,
        explanation: 'Immediately block your card, contact your bank, and report at cybercrime.gov.in.',
      },
      {
        question: 'Which is a safe practice for online banking?',
        options: ['Using public WiFi', 'Saving password in browser on shared computers', 'Bookmarking official bank site', 'Clicking email links'],
        correct: 2,
        explanation: 'Bookmarking the official site prevents accidentally accessing phishing sites.',
      },
      {
        question: 'What do collect requests in UPI do?',
        options: ['Send money to you', 'Request money FROM you', 'Verify your account', 'Nothing'],
        correct: 1,
        explanation: 'Collect requests ask YOU to pay. Scammers send these claiming they\'re "sending" money.',
      },
      {
        question: 'Where should you report cybercrime in India?',
        options: ['Local police only', 'cybercrime.gov.in', 'Bank only', 'Cannot report'],
        correct: 1,
        explanation: 'Report cybercrimes at cybercrime.gov.in - India\'s official cybercrime reporting portal.',
      },
    ],
  },
  advanced: {
    moduleId: 'advanced',
    title: 'Advanced & Entrepreneurship Quiz',
    questions: [
      {
        question: 'What type of life insurance gives maximum coverage at minimum cost?',
        options: ['ULIP', 'Endowment Plan', 'Term Insurance', 'Money-back Policy'],
        correct: 2,
        explanation: 'Term insurance provides pure life coverage without investment, giving maximum coverage at lowest premiums.',
      },
      {
        question: 'What is a good credit score range?',
        options: ['300-450', '450-600', '600-750', '750-900'],
        correct: 3,
        explanation: 'A credit score of 750-900 is considered excellent and gets you the best loan terms.',
      },
      {
        question: 'What is the recommended health insurance coverage?',
        options: ['₹1 lakh', '₹2-3 lakh', '₹5-10 lakh or more', 'No need if young'],
        correct: 2,
        explanation: 'With rising medical costs, ₹5-10 lakh coverage is recommended, more for metro cities.',
      },
      {
        question: 'What hurts your credit score?',
        options: ['Paying bills on time', 'Missing credit card payments', 'Low credit utilization', 'Having a credit history'],
        correct: 1,
        explanation: 'Missing or late payments significantly damage your credit score.',
      },
      {
        question: 'What is an MVP in entrepreneurship?',
        options: ['Most Valuable Player', 'Minimum Viable Product', 'Maximum Value Proposition', 'Money Venture Plan'],
        correct: 1,
        explanation: 'MVP (Minimum Viable Product) is the simplest version of your product to test with real customers.',
      },
      {
        question: 'How much life insurance coverage is typically recommended?',
        options: ['Equal to annual income', '3-5x annual income', '10-15x annual income', 'No specific amount'],
        correct: 2,
        explanation: 'Financial planners recommend term life coverage of 10-15 times your annual income.',
      },
      {
        question: 'What is credit utilization?',
        options: ['Total credit limit', 'Percentage of credit limit used', 'Number of credit cards', 'Credit score itself'],
        correct: 1,
        explanation: 'Credit utilization is the percentage of your available credit that you\'re using. Keep it below 30%.',
      },
      {
        question: 'What makes a good business idea?',
        options: ['Copying successful companies exactly', 'Solving a real problem people will pay to solve', 'Requiring huge investment', 'Having no competition'],
        correct: 1,
        explanation: 'The best business ideas solve real problems that people are willing to pay to have solved.',
      },
      {
        question: 'What is the first step before building a business?',
        options: ['Get investors', 'Build the full product', 'Talk to potential customers', 'Register a company'],
        correct: 2,
        explanation: 'Talking to potential customers validates if your idea solves a real problem before investing time/money.',
      },
      {
        question: 'Which loan is generally considered "good debt"?',
        options: ['Credit card debt for shopping', 'Personal loan for vacation', 'Education loan', 'Payday loans'],
        correct: 2,
        explanation: 'Education loans invest in your earning potential and are considered good debt, unlike consumption loans.',
      },
    ],
  },
};
