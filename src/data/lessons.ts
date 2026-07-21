export interface LessonContent {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  xp: number;
  sections: {
    heading: string;
    content: string;
    tip?: string;
    example?: { label: string; value: string }[];
  }[];
  keyTakeaways: string[];
}

export const lessonContents: Record<string, LessonContent[]> = {
  financial: [
    {
      id: 'fin-1',
      moduleId: 'financial',
      title: 'Introduction to Money',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'What is Money?',
          content: 'Money is a medium of exchange that allows people to trade goods and services efficiently. Before money existed, people used the barter system — exchanging goods directly. Imagine trying to trade your skills as a coder for groceries!',
          tip: 'Money serves three main functions: medium of exchange, store of value, and unit of account.',
        },
        {
          heading: 'The Evolution of Money',
          content: 'Money has evolved from cowrie shells and metal coins to paper currency and now digital payments. In India, we\'ve seen a massive shift to UPI-based digital payments, with over 10 billion transactions monthly.',
          example: [
            { label: 'Ancient Times', value: 'Barter, Cowrie Shells' },
            { label: 'Medieval Era', value: 'Gold & Silver Coins' },
            { label: 'Modern Era', value: 'Paper Currency, Banks' },
            { label: 'Digital Age', value: 'UPI, Crypto, Digital Wallets' },
          ],
        },
        {
          heading: 'Why Money Matters',
          content: 'Understanding money is the foundation of financial literacy. It\'s not just about earning — it\'s about making smart decisions on spending, saving, and growing your wealth over time.',
        },
      ],
      keyTakeaways: [
        'Money is a tool for exchanging value efficiently',
        'It has evolved from physical to digital forms',
        'Understanding money is essential for financial independence',
      ],
    },
    {
      id: 'fin-2',
      moduleId: 'financial',
      title: 'Budgeting',
      duration: '8 min',
      xp: 10,
      sections: [
        {
          heading: 'What is a Budget?',
          content: 'A budget is a plan for your money. It helps you understand where your money goes and ensures you don\'t spend more than you earn. Think of it as a roadmap for your finances.',
        },
        {
          heading: 'The 50-30-20 Rule',
          content: 'One of the simplest budgeting frameworks divides your income into three categories: 50% for Needs (rent, food, utilities), 30% for Wants (entertainment, shopping), and 20% for Savings & Investments.',
          example: [
            { label: 'Monthly Income', value: '₹25,000' },
            { label: 'Needs (50%)', value: '₹12,500' },
            { label: 'Wants (30%)', value: '₹7,500' },
            { label: 'Savings (20%)', value: '₹5,000' },
          ],
          tip: 'If you can save more than 20%, do it! Your future self will thank you.',
        },
        {
          heading: 'Creating Your First Budget',
          content: 'Start by tracking all your income sources. Then list your fixed expenses (rent, subscriptions) and variable expenses (food, transport). Finally, set savings goals before allocating money to wants.',
        },
      ],
      keyTakeaways: [
        'A budget is your financial roadmap',
        'The 50-30-20 rule is a great starting point',
        'Track expenses to understand spending patterns',
        'Pay yourself first — save before spending on wants',
      ],
    },
    {
      id: 'fin-3',
      moduleId: 'financial',
      title: 'Saving Money',
      duration: '6 min',
      xp: 10,
      sections: [
        {
          heading: 'Why Save?',
          content: 'Saving money gives you financial security and freedom. It protects you from unexpected expenses, helps you achieve goals, and reduces financial stress.',
        },
        {
          heading: 'Emergency Fund Basics',
          content: 'An emergency fund is money set aside for unexpected situations — medical emergencies, job loss, or urgent repairs. Financial experts recommend saving 3-6 months of expenses.',
          example: [
            { label: 'Monthly Expenses', value: '₹20,000' },
            { label: 'Minimum Emergency Fund', value: '₹60,000 (3 months)' },
            { label: 'Ideal Emergency Fund', value: '₹1,20,000 (6 months)' },
          ],
          tip: 'Keep your emergency fund in a savings account — accessible but separate from daily spending.',
        },
        {
          heading: 'Building the Saving Habit',
          content: 'Automate your savings by setting up auto-transfers on payday. Start small if needed — even ₹500/month adds up. The key is consistency, not amount.',
        },
      ],
      keyTakeaways: [
        'Savings provide security and enable future goals',
        'Build an emergency fund of 3-6 months expenses',
        'Automate savings to make it effortless',
        'Start small but stay consistent',
      ],
    },
    {
      id: 'fin-4',
      moduleId: 'financial',
      title: 'Understanding Inflation',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'What is Inflation?',
          content: 'Inflation is the rate at which prices increase over time. When inflation rises, your money buys less than before. A chocolate that cost ₹10 five years ago might cost ₹15 today.',
        },
        {
          heading: 'How Inflation Affects You',
          content: 'If your savings earn 4% interest but inflation is 6%, you\'re actually losing purchasing power. This is why simply saving isn\'t enough — you need to invest to beat inflation.',
          example: [
            { label: 'Today\'s Cost', value: '₹1,00,000' },
            { label: 'After 10 Years @ 6% Inflation', value: '₹1,79,085' },
            { label: 'Purchasing Power Lost', value: '44%' },
          ],
          tip: 'Investments in equity (stocks/mutual funds) historically beat inflation over the long term.',
        },
        {
          heading: 'Inflation in India',
          content: 'India\'s average inflation rate is around 5-6% annually. The RBI targets keeping it around 4%. Understanding this helps you make better financial decisions.',
        },
      ],
      keyTakeaways: [
        'Inflation erodes the value of money over time',
        'Savings alone may not keep up with inflation',
        'Investing helps protect and grow purchasing power',
        'India\'s inflation averages around 5-6% annually',
      ],
    },
    {
      id: 'fin-5',
      moduleId: 'financial',
      title: 'Financial Goal Setting',
      duration: '6 min',
      xp: 10,
      sections: [
        {
          heading: 'Why Set Financial Goals?',
          content: 'Goals give direction to your money. Without them, it\'s easy to spend aimlessly. Whether it\'s buying a phone, funding education, or building wealth — goals keep you motivated.',
        },
        {
          heading: 'SMART Goals Framework',
          content: 'Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of "I want to save money," say "I will save ₹50,000 for a laptop in 10 months by saving ₹5,000/month."',
          example: [
            { label: 'Specific', value: 'Save for a new laptop' },
            { label: 'Measurable', value: '₹50,000 target' },
            { label: 'Achievable', value: '₹5,000/month is realistic' },
            { label: 'Relevant', value: 'Needed for college' },
            { label: 'Time-bound', value: '10 months deadline' },
          ],
        },
        {
          heading: 'Short, Medium & Long-term Goals',
          content: 'Categorize goals by timeline: Short-term (< 1 year) like a new phone, Medium-term (1-5 years) like a bike or travel, Long-term (5+ years) like higher education or investments.',
          tip: 'Write down your goals and review them monthly to stay on track.',
        },
      ],
      keyTakeaways: [
        'Goals provide purpose and direction for your money',
        'Use the SMART framework to set effective goals',
        'Categorize by short, medium, and long-term timelines',
        'Review and adjust goals regularly',
      ],
    },
  ],
  banking: [
    {
      id: 'bank-1',
      moduleId: 'banking',
      title: 'How Banks Work',
      duration: '6 min',
      xp: 10,
      sections: [
        {
          heading: 'What Do Banks Actually Do?',
          content: 'Banks are institutions that accept deposits from people and lend that money to others who need it. They make money from the difference between interest paid on deposits and interest charged on loans.',
        },
        {
          heading: 'Types of Bank Accounts',
          content: 'The two main types are Savings Accounts (for individuals, earns interest) and Current Accounts (for businesses, no interest but more transaction freedom). As a student, you\'ll typically use a savings account.',
          example: [
            { label: 'Savings Account', value: 'Earns 2.5-4% interest, limited withdrawals' },
            { label: 'Current Account', value: 'No interest, unlimited transactions' },
            { label: 'Fixed Deposit', value: 'Higher interest, locked for a period' },
          ],
        },
        {
          heading: 'How Your Money is Protected',
          content: 'In India, the Deposit Insurance and Credit Guarantee Corporation (DICGC) insures deposits up to ₹5 lakh per depositor per bank. Your money is safer than keeping cash at home!',
          tip: 'Keep your account details, PIN, and passwords confidential — banks will never ask for these.',
        },
      ],
      keyTakeaways: [
        'Banks connect savers with borrowers',
        'Savings accounts earn interest, current accounts don\'t',
        'Deposits up to ₹5 lakh are insured by DICGC',
        'Never share banking credentials with anyone',
      ],
    },
    {
      id: 'bank-2',
      moduleId: 'banking',
      title: 'UPI & Digital Payments',
      duration: '7 min',
      xp: 10,
      sections: [
        {
          heading: 'What is UPI?',
          content: 'Unified Payments Interface (UPI) is India\'s revolutionary instant payment system. It lets you transfer money using just a phone number or UPI ID, 24/7, for free. Apps like Google Pay, PhonePe, and Paytm use UPI.',
        },
        {
          heading: 'How UPI Works',
          content: 'When you pay via UPI, the money moves directly from your bank account to the receiver\'s bank account in seconds. Your UPI ID (like name@upi) is linked to your bank account.',
          example: [
            { label: 'UPI ID Example', value: 'rahul@okicici' },
            { label: 'Transaction Limit', value: '₹1 lakh/transaction (most banks)' },
            { label: 'Daily Limit', value: 'Varies by bank, usually ₹1-2 lakh' },
            { label: 'Fee', value: 'Free for personal transfers' },
          ],
        },
        {
          heading: 'Staying Safe with UPI',
          content: 'Never share your UPI PIN. Verify the receiver\'s name before sending. Be wary of "request money" scams — you don\'t need to enter PIN to receive money. Only enter PIN when YOU are paying.',
          tip: 'Receiving money NEVER requires entering your PIN. If someone asks you to enter PIN to receive, it\'s a scam!',
        },
      ],
      keyTakeaways: [
        'UPI enables instant, free bank-to-bank transfers',
        'Your UPI ID is linked to your bank account',
        'Never share your UPI PIN with anyone',
        'You don\'t need PIN to receive money — that\'s a scam',
      ],
    },
    {
      id: 'bank-3',
      moduleId: 'banking',
      title: 'Debit Cards & ATMs',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'Understanding Debit Cards',
          content: 'A debit card is linked directly to your bank account. When you swipe or tap it, money is deducted immediately from your balance. It\'s like carrying your bank account in your wallet.',
        },
        {
          heading: 'Using ATMs Safely',
          content: 'ATMs let you withdraw cash, check balance, and more. Always cover the keypad when entering your PIN. Check for any suspicious devices attached to the card slot (skimmers).',
          example: [
            { label: 'Free ATM Withdrawals', value: '5/month at own bank, 3 at others' },
            { label: 'ATM Fee (after free limit)', value: '₹20-21 + GST' },
            { label: 'Daily Withdrawal Limit', value: '₹25,000-1,00,000 (varies)' },
          ],
          tip: 'Set daily transaction limits on your card through net banking for extra security.',
        },
        {
          heading: 'Card Security Best Practices',
          content: 'Sign the back of your card. Don\'t share card details online on suspicious sites. Enable SMS alerts for every transaction. Report lost cards immediately to block them.',
        },
      ],
      keyTakeaways: [
        'Debit cards give direct access to bank funds',
        'Cover keypad when entering PIN at ATMs',
        'Check for skimming devices before inserting card',
        'Enable transaction alerts and set limits',
      ],
    },
    {
      id: 'bank-4',
      moduleId: 'banking',
      title: 'NEFT, RTGS & IMPS',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'Different Ways to Transfer Money',
          content: 'Besides UPI, banks offer NEFT, RTGS, and IMPS for transferring money. Each has different speed, limits, and use cases.',
        },
        {
          heading: 'Comparing Transfer Methods',
          content: 'NEFT settles in batches (every 30 mins), RTGS is real-time for large amounts (₹2 lakh+), and IMPS is instant 24/7. For most daily needs, UPI has replaced these.',
          example: [
            { label: 'NEFT', value: 'Batch processing, no min limit, free' },
            { label: 'RTGS', value: 'Real-time, min ₹2 lakh, for large transfers' },
            { label: 'IMPS', value: 'Instant 24/7, up to ₹5 lakh, small fee' },
            { label: 'UPI', value: 'Instant 24/7, up to ₹1 lakh, free' },
          ],
        },
        {
          heading: 'When to Use Which',
          content: 'Use UPI for daily payments. Use NEFT/IMPS for larger amounts to other banks. Use RTGS when transferring ₹2 lakh or more urgently. Each serves a purpose in the banking ecosystem.',
          tip: 'Always double-check account number and IFSC code before large transfers — they can\'t be reversed!',
        },
      ],
      keyTakeaways: [
        'NEFT processes in batches, RTGS is real-time for large sums',
        'IMPS and UPI are instant 24/7 services',
        'UPI is best for daily transactions under ₹1 lakh',
        'Verify details carefully — transfers are usually irreversible',
      ],
    },
    {
      id: 'bank-5',
      moduleId: 'banking',
      title: 'Net Banking Essentials',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'What is Net Banking?',
          content: 'Net banking (Internet banking) lets you access your bank account through a website. You can check balances, transfer money, pay bills, and manage your account from anywhere.',
        },
        {
          heading: 'Key Features to Know',
          content: 'Net banking offers statement downloads, bill payments, FD/RD creation, standing instructions (auto-payments), and account settings management.',
          example: [
            { label: 'View Statements', value: 'Download PDF for any date range' },
            { label: 'Bill Payments', value: 'Electricity, mobile, DTH, etc.' },
            { label: 'Standing Instructions', value: 'Auto-pay rent, EMIs, SIPs' },
            { label: 'Card Management', value: 'Block card, set limits' },
          ],
        },
        {
          heading: 'Staying Secure Online',
          content: 'Always access banking through official website (check the URL). Never click banking links from emails. Use strong, unique passwords. Log out after every session.',
          tip: 'Bookmark your bank\'s official website to avoid phishing sites that look identical.',
        },
      ],
      keyTakeaways: [
        'Net banking provides full account access online',
        'Use it for statements, bills, and account management',
        'Always verify you\'re on the official bank website',
        'Use strong passwords and log out after use',
      ],
    },
  ],
  investing: [
    {
      id: 'inv-1',
      moduleId: 'investing',
      title: 'Why Money Should Work For You',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'Saving vs Investing',
          content: 'Saving is putting money aside. Investing is making that money grow. While savings accounts give 3-4% returns, investments can give 10-15% or more over time.',
        },
        {
          heading: 'The Power of Starting Early',
          content: 'Thanks to compound interest, starting early makes a massive difference. Someone who starts investing at 20 can accumulate significantly more wealth than someone starting at 30, even with the same monthly amount.',
          example: [
            { label: 'Start at 20, invest ₹5K/month', value: '₹3.2 Cr at 60 (12% return)' },
            { label: 'Start at 30, invest ₹5K/month', value: '₹1 Cr at 60 (12% return)' },
            { label: 'Difference', value: '₹2.2 Cr — just from starting 10 years earlier!' },
          ],
          tip: 'Time in the market beats timing the market. Start early, stay invested.',
        },
      ],
      keyTakeaways: [
        'Investing grows money faster than saving',
        'Compound interest rewards early starters massively',
        'Even small amounts grow big over decades',
        'Time is your biggest investing advantage',
      ],
    },
    {
      id: 'inv-2',
      moduleId: 'investing',
      title: 'Stocks 101',
      duration: '7 min',
      xp: 12,
      sections: [
        {
          heading: 'What is a Stock?',
          content: 'A stock represents ownership in a company. When you buy shares of Reliance or TCS, you own a tiny piece of that company. If the company grows, your shares become more valuable.',
        },
        {
          heading: 'How Stock Markets Work',
          content: 'In India, stocks are traded on BSE (Bombay Stock Exchange) and NSE (National Stock Exchange). Prices change based on supply and demand — if more people want to buy, price goes up.',
          example: [
            { label: 'Sensex', value: 'Index of 30 largest BSE companies' },
            { label: 'Nifty 50', value: 'Index of 50 largest NSE companies' },
            { label: 'Trading Hours', value: '9:15 AM - 3:30 PM (Mon-Fri)' },
          ],
        },
        {
          heading: 'Risks and Returns',
          content: 'Stocks can give high returns but also carry high risk. Prices can fall significantly in the short term. That\'s why stocks are best for long-term goals (5+ years).',
          tip: 'Never invest money you\'ll need in the next 2-3 years in stocks.',
        },
      ],
      keyTakeaways: [
        'Stocks represent ownership in companies',
        'Prices fluctuate based on supply and demand',
        'High potential returns come with higher risk',
        'Best suited for long-term investment horizon',
      ],
    },
    {
      id: 'inv-3',
      moduleId: 'investing',
      title: 'Mutual Funds & SIPs',
      duration: '8 min',
      xp: 12,
      sections: [
        {
          heading: 'What are Mutual Funds?',
          content: 'A mutual fund pools money from many investors and invests in a diversified portfolio of stocks, bonds, or both. A professional fund manager makes the decisions for you.',
        },
        {
          heading: 'SIP - Systematic Investment Plan',
          content: 'SIP lets you invest a fixed amount regularly (monthly). It removes the stress of timing the market and builds discipline. Even ₹500/month can grow substantially over time.',
          example: [
            { label: 'SIP Amount', value: '₹5,000/month' },
            { label: 'Duration', value: '20 years' },
            { label: 'Expected Return', value: '12% p.a.' },
            { label: 'Final Value', value: '~₹50 lakh' },
          ],
          tip: 'Rupee cost averaging through SIP means you buy more units when prices are low and fewer when high.',
        },
        {
          heading: 'Types of Mutual Funds',
          content: 'Equity funds invest in stocks (higher risk/return). Debt funds invest in bonds (lower risk/return). Hybrid funds mix both. Index funds simply track market indices like Nifty 50.',
        },
      ],
      keyTakeaways: [
        'Mutual funds provide professional management & diversification',
        'SIPs build discipline with small, regular investments',
        'Choose fund type based on your risk appetite and timeline',
        'Index funds are a simple, low-cost option for beginners',
      ],
    },
    {
      id: 'inv-4',
      moduleId: 'investing',
      title: 'Gold & Bonds',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'Gold as an Investment',
          content: 'Indians love gold, and it\'s actually a decent investment too. Gold tends to hold value during uncertain times and acts as a hedge against inflation.',
        },
        {
          heading: 'Ways to Invest in Gold',
          content: 'Physical gold (jewelry, coins) has making charges and storage issues. Better options include Gold ETFs, Sovereign Gold Bonds (SGBs), and Digital Gold.',
          example: [
            { label: 'Sovereign Gold Bonds', value: '2.5% annual interest + gold price gains, tax-free at maturity' },
            { label: 'Gold ETFs', value: 'Trade like stocks, no storage hassle' },
            { label: 'Digital Gold', value: 'Buy in small amounts, stored safely' },
          ],
          tip: 'SGBs are the best way to invest in gold — you get interest AND gold price appreciation, tax-free if held till maturity.',
        },
        {
          heading: 'Bonds - Lending to Earn',
          content: 'Bonds are loans you give to companies or government. In return, you get regular interest payments. Government bonds (like RBI bonds) are very safe but offer moderate returns.',
        },
      ],
      keyTakeaways: [
        'Gold is a good hedge against uncertainty',
        'SGBs offer interest plus gold appreciation',
        'Bonds provide stable, predictable income',
        'Include both in a diversified portfolio',
      ],
    },
    {
      id: 'inv-5',
      moduleId: 'investing',
      title: 'Understanding Risk & Diversification',
      duration: '6 min',
      xp: 10,
      sections: [
        {
          heading: 'What is Investment Risk?',
          content: 'Risk is the possibility that your investment loses value. Higher risk investments (stocks) can give higher returns, but can also fall more. Lower risk (FDs, bonds) means smaller but more stable returns.',
        },
        {
          heading: 'Diversification - Don\'t Put All Eggs in One Basket',
          content: 'Diversification means spreading investments across different assets. If one falls, others might stay stable or rise. A mix of stocks, bonds, and gold creates a balanced portfolio.',
          example: [
            { label: 'Aggressive Portfolio', value: '80% Equity, 15% Debt, 5% Gold' },
            { label: 'Balanced Portfolio', value: '60% Equity, 30% Debt, 10% Gold' },
            { label: 'Conservative Portfolio', value: '30% Equity, 60% Debt, 10% Gold' },
          ],
        },
        {
          heading: 'Know Your Risk Appetite',
          content: 'Young investors with stable income can take more risk (more equity). Those near retirement or with unstable income should be more conservative. Be honest about how you\'d feel if your investment dropped 30%.',
          tip: 'Only take as much risk as lets you sleep peacefully at night.',
        },
      ],
      keyTakeaways: [
        'Higher returns generally come with higher risk',
        'Diversification reduces overall portfolio risk',
        'Asset allocation should match your risk appetite',
        'Young investors can afford to take more risk',
      ],
    },
    {
      id: 'inv-6',
      moduleId: 'investing',
      title: 'Reading a Portfolio',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'Understanding Returns',
          content: 'Returns can be shown in different ways: Absolute return (total gain/loss), CAGR (Compound Annual Growth Rate - smoothed yearly return), and XIRR (accounts for irregular investments like SIPs).',
        },
        {
          heading: 'Key Metrics to Track',
          content: 'Track your portfolio\'s current value, total invested amount, overall gain/loss, and percentage return. Compare against benchmarks like Nifty 50 to see if you\'re doing well.',
          example: [
            { label: 'Amount Invested', value: '₹5,00,000' },
            { label: 'Current Value', value: '₹6,50,000' },
            { label: 'Absolute Return', value: '₹1,50,000 (30%)' },
            { label: 'CAGR (3 years)', value: '9.1% p.a.' },
          ],
        },
        {
          heading: 'Rebalancing Your Portfolio',
          content: 'Over time, some investments grow faster than others, changing your allocation. Rebalancing means adjusting back to your target allocation annually to maintain your risk level.',
          tip: 'Don\'t check your portfolio daily — it leads to emotional decisions. Monthly or quarterly review is enough.',
        },
      ],
      keyTakeaways: [
        'Understand different ways returns are calculated',
        'Compare performance against relevant benchmarks',
        'Rebalance periodically to maintain target allocation',
        'Avoid frequent checking to prevent emotional decisions',
      ],
    },
  ],
  tax: [
    {
      id: 'tax-1',
      moduleId: 'tax',
      title: 'Why We Pay Tax',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'What is Tax?',
          content: 'Tax is money collected by the government from citizens and businesses. It\'s used to fund public services like roads, schools, hospitals, defense, and welfare programs.',
        },
        {
          heading: 'Types of Taxes in India',
          content: 'Direct taxes (Income Tax) are paid directly to the government. Indirect taxes (GST) are included in the price of goods and services you buy.',
          example: [
            { label: 'Income Tax', value: 'Tax on your earnings' },
            { label: 'GST', value: 'Tax on goods & services (5-28%)' },
            { label: 'Property Tax', value: 'Tax on owned property' },
            { label: 'Capital Gains Tax', value: 'Tax on investment profits' },
          ],
        },
        {
          heading: 'Why Taxes Matter',
          content: 'Taxes fund everything from your school to the roads you drive on. Paying taxes honestly is both a legal obligation and civic responsibility. Understanding tax also helps you legally minimize your tax burden.',
          tip: 'Tax planning is legal and smart. Tax evasion is illegal. Know the difference.',
        },
      ],
      keyTakeaways: [
        'Taxes fund public services and infrastructure',
        'Direct taxes are paid to government, indirect are embedded in prices',
        'Everyone with income above threshold must pay income tax',
        'Legal tax planning can reduce your burden',
      ],
    },
    {
      id: 'tax-2',
      moduleId: 'tax',
      title: 'Income Tax Basics & Slabs',
      duration: '8 min',
      xp: 12,
      sections: [
        {
          heading: 'How Income Tax Works',
          content: 'India has a progressive tax system — you pay higher rates on higher income. Tax is calculated in slabs, not on your entire income at one rate.',
        },
        {
          heading: 'New Tax Regime (FY 2024-25)',
          content: 'The new regime has simplified slabs with lower rates but fewer deductions. Income up to ₹3 lakh is tax-free. Then rates increase in slabs up to 30%.',
          example: [
            { label: '₹0 - ₹3 lakh', value: 'Nil' },
            { label: '₹3 - ₹7 lakh', value: '5%' },
            { label: '₹7 - ₹10 lakh', value: '10%' },
            { label: '₹10 - ₹12 lakh', value: '15%' },
            { label: '₹12 - ₹15 lakh', value: '20%' },
            { label: 'Above ₹15 lakh', value: '30%' },
          ],
        },
        {
          heading: 'Old vs New Regime',
          content: 'Old regime allows deductions (80C, HRA, etc.) but has higher rates. New regime has lower rates but minimal deductions. Calculate which works better for your situation.',
          tip: 'If you have significant investments in PPF, insurance, home loan — old regime might save more tax.',
        },
      ],
      keyTakeaways: [
        'India uses progressive tax slabs',
        'New regime has lower rates, fewer deductions',
        'Old regime allows deductions like 80C',
        'Choose the regime that minimizes your tax',
      ],
    },
    {
      id: 'tax-3',
      moduleId: 'tax',
      title: 'GST — Tax On What You Buy',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'What is GST?',
          content: 'Goods and Services Tax replaced multiple indirect taxes in 2017. It\'s included in the price you pay for most goods and services. When you buy a ₹100 item with 18% GST, you\'re actually paying ₹118.',
        },
        {
          heading: 'GST Rates',
          content: 'GST has different slabs: 0% (essential goods), 5% (basic necessities), 12% (standard goods), 18% (most services), 28% (luxury items).',
          example: [
            { label: '0% GST', value: 'Fresh vegetables, milk, books' },
            { label: '5% GST', value: 'Packaged food, economy travel' },
            { label: '12% GST', value: 'Processed food, business class flights' },
            { label: '18% GST', value: 'Restaurants, most services' },
            { label: '28% GST', value: 'Luxury cars, tobacco, AC restaurants' },
          ],
        },
        {
          heading: 'Understanding Your Bills',
          content: 'GST is split into CGST (Central) and SGST (State) for local purchases, or IGST for inter-state. The total GST percentage remains the same, just collected differently.',
          tip: 'Always check GST details on bills to verify you\'re not overcharged.',
        },
      ],
      keyTakeaways: [
        'GST replaced multiple indirect taxes in India',
        'Different items have different GST rates (0-28%)',
        'GST is already included in listed prices',
        'Check invoices for correct GST charges',
      ],
    },
    {
      id: 'tax-4',
      moduleId: 'tax',
      title: 'TDS Explained',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'What is TDS?',
          content: 'Tax Deducted at Source (TDS) is tax collected at the point of income. If you earn interest, salary, or professional fees, TDS might be deducted before you receive the money.',
        },
        {
          heading: 'Common TDS Situations',
          content: 'Banks deduct TDS on FD interest above ₹40,000/year. Employers deduct TDS from salary. Freelancers face 10% TDS on professional income.',
          example: [
            { label: 'FD Interest (above ₹40K)', value: '10% TDS' },
            { label: 'Salary', value: 'As per tax slab' },
            { label: 'Professional Fees', value: '10% TDS' },
            { label: 'Rent (above ₹50K/month)', value: '5% TDS' },
          ],
        },
        {
          heading: 'Getting TDS Refund',
          content: 'If TDS deducted is more than your actual tax liability, you can claim a refund when filing your income tax return. This is common for people with income below taxable limits.',
          tip: 'Submit Form 15G/15H to avoid TDS on FD interest if your income is below taxable limit.',
        },
      ],
      keyTakeaways: [
        'TDS is tax collected at the source of income',
        'It applies to salary, interest, rent, and professional fees',
        'Excess TDS can be claimed as refund',
        'Form 15G/H helps avoid TDS if income is below threshold',
      ],
    },
    {
      id: 'tax-5',
      moduleId: 'tax',
      title: 'PAN, Aadhaar & Filing Basics',
      duration: '6 min',
      xp: 10,
      sections: [
        {
          heading: 'PAN Card',
          content: 'Permanent Account Number (PAN) is your unique tax ID. It\'s required for filing returns, major financial transactions (property, large cash deposits), and is linked to your tax records.',
        },
        {
          heading: 'Aadhaar and Tax',
          content: 'Aadhaar is now mandatory for filing income tax returns and must be linked to PAN. This helps the government track income and ensure compliance.',
          example: [
            { label: 'PAN required for', value: 'Bank account, tax filing, property purchase' },
            { label: 'Aadhaar required for', value: 'ITR filing, PAN application, subsidies' },
            { label: 'Linking deadline', value: 'PAN-Aadhaar linking is mandatory' },
          ],
        },
        {
          heading: 'Filing Your First Return',
          content: 'File on incometax.gov.in. Deadline is usually July 31st for salaried individuals. You need Form 16 (from employer), bank interest certificates, and investment proofs. e-Filing is now simple and can be done in under 30 minutes.',
          tip: 'Even if your income is below taxable limit, filing returns creates a financial record useful for loans and visas.',
        },
      ],
      keyTakeaways: [
        'PAN is your permanent tax identity number',
        'Aadhaar-PAN linking is mandatory',
        'ITR filing deadline is typically July 31st',
        'Filing returns is beneficial even below taxable limit',
      ],
    },
  ],
  cyber: [
    {
      id: 'cyber-1',
      moduleId: 'cyber',
      title: 'Spotting Phishing & Fake Links',
      duration: '6 min',
      xp: 10,
      sections: [
        {
          heading: 'What is Phishing?',
          content: 'Phishing is when scammers pretend to be legitimate organizations (banks, companies) to steal your information. They send fake emails, SMS, or create lookalike websites.',
        },
        {
          heading: 'Red Flags to Watch For',
          content: 'Suspicious sender emails (support@hdfc-bank-secure.com instead of @hdfcbank.com), urgent language ("Account will be blocked!"), requests for OTP/password, and shortened/suspicious links.',
          example: [
            { label: 'Fake', value: 'www.amaz0n.com (zero instead of o)' },
            { label: 'Fake', value: 'www.flipkart-offers.xyz' },
            { label: 'Real', value: 'www.amazon.in, www.flipkart.com' },
            { label: 'Red Flag', value: '"Click within 24 hours or account suspended"' },
          ],
          tip: 'Hover over links before clicking to see the actual URL. On mobile, long-press to preview.',
        },
        {
          heading: 'Staying Safe',
          content: 'Never click links in unexpected messages. Always go directly to official websites or apps. When in doubt, call the company\'s official customer service number (not the one in the suspicious message).',
        },
      ],
      keyTakeaways: [
        'Phishing disguises scams as legitimate communications',
        'Check sender addresses and URLs carefully',
        'Never share OTP or passwords via links',
        'When unsure, access services directly through official apps',
      ],
    },
    {
      id: 'cyber-2',
      moduleId: 'cyber',
      title: 'OTP & UPI Fraud',
      duration: '6 min',
      xp: 10,
      sections: [
        {
          heading: 'Common OTP Scams',
          content: 'Scammers call pretending to be bank executives, asking for OTP to "verify" your account or "reverse" a transaction. Remember: No legitimate organization ever asks for OTP over phone.',
        },
        {
          heading: 'UPI Request Scams',
          content: 'The most dangerous scam: Someone sends you a "collect request" claiming they\'re sending money, but it\'s actually a payment request FROM you. If you enter your PIN, money goes to them!',
          example: [
            { label: 'Scammer says', value: '"I\'m sending ₹5000, enter PIN to receive"' },
            { label: 'Reality', value: 'It\'s a COLLECT request — you\'ll PAY ₹5000!' },
            { label: 'Truth', value: 'You NEVER need PIN to receive money' },
          ],
          tip: 'Receiving money requires ZERO action from you. No PIN, no OTP, nothing. If someone asks you to enter anything, it\'s a scam.',
        },
        {
          heading: 'Protecting Yourself',
          content: 'Read UPI notifications carefully — "Pay" vs "Receive" is crucial. Never share screen or give remote access. If you suspect fraud, immediately call your bank and file complaint at cybercrime.gov.in.',
        },
      ],
      keyTakeaways: [
        'Never share OTP with anyone claiming to be from bank',
        'Receiving money needs NO action — no PIN, no OTP',
        'Collect requests are the opposite of receiving',
        'Report suspicious activity immediately',
      ],
    },
    {
      id: 'cyber-3',
      moduleId: 'cyber',
      title: 'QR Code Scams',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'How QR Scams Work',
          content: 'Scammers send QR codes claiming you\'ll receive money. But scanning a QR code and entering your PIN always means YOU are paying. QR codes are for paying, not receiving.',
        },
        {
          heading: 'Real-World Scenarios',
          content: 'Common in OLX/second-hand sales: "Scan this QR to receive payment for your product." This is a scam — the QR is a payment request, not a transfer to you.',
          example: [
            { label: 'Scam Story', value: '"I\'ll send advance payment, scan this QR"' },
            { label: 'What Happens', value: 'You scan, enter PIN, YOUR money is gone' },
            { label: 'Remember', value: 'QR = You pay. Never for receiving.' },
          ],
        },
        {
          heading: 'Safe Practices',
          content: 'Only scan QR codes when YOU want to pay a verified merchant. To receive money, share your UPI ID or phone number — no QR needed. If anyone sends QR for payment to you, it\'s fraud.',
          tip: 'Think of QR codes like handing over cash — you scan = you pay.',
        },
      ],
      keyTakeaways: [
        'QR codes are for PAYING, never receiving',
        'Scanning QR + entering PIN = sending money',
        'To receive, share UPI ID — no QR needed',
        'Reject any QR sent by buyer claiming to pay you',
      ],
    },
    {
      id: 'cyber-4',
      moduleId: 'cyber',
      title: 'Fake Investment Apps',
      duration: '5 min',
      xp: 10,
      sections: [
        {
          heading: 'Spotting Investment Scams',
          content: 'Fake apps promise unrealistic returns like "10% weekly" or "double your money in 30 days." They often use names similar to legitimate apps and run aggressive social media ads.',
        },
        {
          heading: 'Warning Signs',
          content: 'No SEBI registration, guaranteed high returns, pressure to invest quickly, referral bonuses to recruit friends, difficulty withdrawing money.',
          example: [
            { label: 'Red Flag', value: '"Guaranteed 20% monthly returns"' },
            { label: 'Red Flag', value: '"Earn ₹10,000 daily by investing ₹5,000"' },
            { label: 'Red Flag', value: '"Celebrity X invested — you should too"' },
            { label: 'Reality', value: 'No legitimate investment guarantees returns' },
          ],
          tip: 'If it sounds too good to be true, it definitely is. Real market returns average 10-15% annually, not monthly.',
        },
        {
          heading: 'Investing Safely',
          content: 'Use only SEBI-registered platforms (Zerodha, Groww, Upstox, etc.). Verify registration on sebi.gov.in. Never invest based on social media tips or Telegram groups.',
        },
      ],
      keyTakeaways: [
        'Guaranteed high returns are always a scam',
        'Verify platforms are SEBI registered',
        'Legitimate investments don\'t need referral schemes',
        'Stick to known, regulated investment platforms',
      ],
    },
  ],
  advanced: [
    {
      id: 'adv-1',
      moduleId: 'advanced',
      title: 'Insurance Basics',
      duration: '7 min',
      xp: 12,
      sections: [
        {
          heading: 'Why Insurance Matters',
          content: 'Insurance protects you from financial disasters. A medical emergency without health insurance can wipe out years of savings. Insurance transfers this risk to the insurance company.',
        },
        {
          heading: 'Types of Insurance',
          content: 'Health insurance covers medical expenses. Term life insurance provides money to family if you pass away. Vehicle insurance is mandatory for cars/bikes.',
          example: [
            { label: 'Health Insurance', value: '₹5-10 lakh cover, ₹5,000-15,000/year premium' },
            { label: 'Term Life Insurance', value: '₹1 Cr cover, ₹10,000-15,000/year premium' },
            { label: 'Vehicle Insurance', value: 'Third-party is mandatory, comprehensive is better' },
          ],
          tip: 'Buy term insurance, not traditional/ULIP plans. Term gives maximum coverage at minimum cost.',
        },
        {
          heading: 'Getting the Right Coverage',
          content: 'Health insurance should cover your family. Life insurance should be 10-15x annual income. Start early — premiums are cheaper when you\'re young and healthy.',
        },
      ],
      keyTakeaways: [
        'Insurance protects against financial catastrophes',
        'Health and term life are essential coverages',
        'Buy adequate cover, not minimum',
        'Premiums are cheaper when bought young',
      ],
    },
    {
      id: 'adv-2',
      moduleId: 'advanced',
      title: 'Loans & Credit Score',
      duration: '7 min',
      xp: 12,
      sections: [
        {
          heading: 'Understanding Loans',
          content: 'Loans let you borrow money and repay with interest. Good loans (education, home) build assets. Bad loans (credit card debt, personal loans for shopping) drain wealth.',
        },
        {
          heading: 'What is a Credit Score?',
          content: 'Your credit score (CIBIL score) is a number (300-900) showing how reliable you are as a borrower. Higher score = easier loan approval and lower interest rates.',
          example: [
            { label: '750-900', value: 'Excellent — best rates, easy approval' },
            { label: '650-749', value: 'Good — most loans approved' },
            { label: '550-649', value: 'Fair — higher rates, scrutiny' },
            { label: 'Below 550', value: 'Poor — loan rejection likely' },
          ],
        },
        {
          heading: 'Building Good Credit',
          content: 'Pay credit card bills in full, on time. Keep credit utilization below 30%. Don\'t apply for too many loans/cards. Maintain a long credit history.',
          tip: 'A credit card used responsibly (paid in full monthly) is great for building credit. Used irresponsibly, it\'s a debt trap.',
        },
      ],
      keyTakeaways: [
        'Not all loans are equal — asset-building loans are okay',
        'Credit score affects loan approval and interest rates',
        'Pay bills on time to build good credit',
        'Avoid credit card debt — pay full balance monthly',
      ],
    },
    {
      id: 'adv-3',
      moduleId: 'advanced',
      title: 'The Entrepreneur Mindset',
      duration: '6 min',
      xp: 12,
      sections: [
        {
          heading: 'Thinking Like an Entrepreneur',
          content: 'Entrepreneurs spot problems and create solutions people will pay for. It\'s not about having one "big idea" — it\'s about execution, persistence, and learning from failures.',
        },
        {
          heading: 'Identifying Opportunities',
          content: 'Look for things that annoy people, inefficiencies, or gaps in existing solutions. The best businesses solve real problems for real people.',
          example: [
            { label: 'Problem', value: 'Students struggle to find affordable textbooks' },
            { label: 'Opportunity', value: 'Book exchange platform for college' },
            { label: 'Problem', value: 'Parents need tutors but can\'t verify quality' },
            { label: 'Opportunity', value: 'Verified tutor marketplace' },
          ],
        },
        {
          heading: 'Starting Small',
          content: 'You don\'t need ₹10 lakh to start. Begin with what you have. A tutoring business needs only your knowledge. A content creation business needs only a phone. Start, learn, iterate.',
          tip: 'The best time to start is when you\'re young and have less to lose. Failure is just expensive education.',
        },
      ],
      keyTakeaways: [
        'Entrepreneurship is about solving problems',
        'Look for pain points and inefficiencies',
        'Start small with minimal investment',
        'Failure is learning, not defeat',
      ],
    },
    {
      id: 'adv-4',
      moduleId: 'advanced',
      title: 'Writing a Simple Business Plan',
      duration: '6 min',
      xp: 12,
      sections: [
        {
          heading: 'Why You Need a Plan',
          content: 'A business plan forces you to think through your idea clearly. It doesn\'t need to be 50 pages — even a one-page plan helps you understand if your idea makes sense.',
        },
        {
          heading: 'Key Elements',
          content: 'Answer these questions: What problem do you solve? Who are your customers? How will you make money? What do you need to start? How will customers find you?',
          example: [
            { label: 'Problem', value: 'Students waste time commuting for tutoring' },
            { label: 'Solution', value: 'Online tutoring for board exams' },
            { label: 'Customers', value: 'Class 10-12 students in Tier 2 cities' },
            { label: 'Revenue', value: '₹500/hour, 4 students/batch' },
            { label: 'Marketing', value: 'WhatsApp groups, school partnerships' },
          ],
        },
        {
          heading: 'Testing Your Idea',
          content: 'Before building anything big, test with real people. Can you get 5 paying customers? If not, refine the idea. This "MVP" approach saves time and money.',
          tip: 'Talk to 10 potential customers before building anything. Their feedback is more valuable than your assumptions.',
        },
      ],
      keyTakeaways: [
        'A simple one-page plan beats no plan',
        'Clearly define problem, solution, and customers',
        'Understand how you\'ll make money',
        'Test with real customers before scaling',
      ],
    },
  ],
};

// Placeholder for future content expansion
export const getPlaceholderContent = (moduleId: string, title: string, index: number): LessonContent => ({
  id: `${moduleId}-${index + 1}`,
  moduleId,
  title,
  duration: '5 min',
  xp: 10,
  sections: [
    {
      heading: 'Coming Soon',
      content: 'Detailed lesson content for this topic is being prepared. Check back soon for comprehensive learning materials with examples and practical tips.',
    }
  ],
  keyTakeaways: ['Content coming soon'],
});
