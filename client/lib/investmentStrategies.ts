export interface InvestmentStrategy {
  id: string;
  name: string;
  category: string;
  riskLevel: "Low" | "Medium" | "High" | "Very High";
  minInvestment: number;
  expectedReturn: string;
  timeline: string;
  description: string;
  detailedDescription: string;
  howItWorks: string;
  examples: string[];
  platforms: string[];
  pros: string[];
  cons: string[];
  whoShouldInvest: string[];
  taxImplications: string;
  exitStrategy: string;
  marketRisks: string[];
  allocation: {
    conservative: number;
    moderate: number;
    aggressive: number;
  };
}

export const personalInvestmentStrategies: InvestmentStrategy[] = [
  {
    id: "equity_sip",
    name: "Equity Mutual Fund SIP",
    category: "Mutual Funds",
    riskLevel: "High",
    minInvestment: 500,
    expectedReturn: "12-15%",
    timeline: "5+ years",
    description:
      "Systematic Investment Plan in diversified equity mutual funds for long-term wealth creation",
    detailedDescription:
      "Equity SIPs allow you to invest a fixed amount regularly in equity mutual funds, which primarily invest in stocks. This strategy leverages rupee cost averaging and the power of compounding to potentially generate significant wealth over the long term.",
    howItWorks:
      "You invest a fixed amount monthly in an equity mutual fund. The fund manager uses this money to buy shares of various companies. Over time, market volatility averages out, and your investment grows through capital appreciation and dividends.",
    examples: [
      "Axis Bluechip Fund",
      "ICICI Pru Bluechip Fund",
      "SBI Large & Midcap Fund",
      "Mirae Asset Large Cap Fund",
    ],
    platforms: ["Groww", "Zerodha Coin", "Paytm Money", "ET Money", "Kuvera"],
    pros: [
      "High growth potential over long term",
      "Professional fund management",
      "Diversification across multiple stocks",
      "Rupee cost averaging benefits",
      "High liquidity - can redeem anytime",
      "Tax efficiency under LTCG",
    ],
    cons: [
      "High volatility in short term",
      "No guaranteed returns",
      "Market risk exposure",
      "Fund management fees",
      "Requires discipline and patience",
    ],
    whoShouldInvest: [
      "Young investors with 5+ year horizon",
      "Those comfortable with market volatility",
      "Investors seeking inflation-beating returns",
      "People with regular income",
    ],
    taxImplications:
      "LTCG tax of 10% on gains above ₹1 lakh per year. STCG tax of 15% for holding less than 1 year.",
    exitStrategy:
      "Can redeem partially or fully anytime. Recommended to stay invested for full tenure for optimal returns.",
    marketRisks: [
      "Market volatility",
      "Economic downturns",
      "Sectoral risks",
      "Fund manager risk",
    ],
    allocation: { conservative: 20, moderate: 40, aggressive: 60 },
  },
  {
    id: "elss",
    name: "ELSS Tax Saver Funds",
    category: "Tax Saving",
    riskLevel: "High",
    minInvestment: 500,
    expectedReturn: "10-14%",
    timeline: "3+ years",
    description:
      "Equity Linked Savings Scheme with tax benefits under Section 80C",
    detailedDescription:
      "ELSS funds combine wealth creation with tax savings. These equity mutual funds offer tax deduction up to ₹1.5 lakh under Section 80C and have the shortest lock-in period among all tax-saving investments.",
    howItWorks:
      "Invest in ELSS funds and claim tax deduction. The fund invests in equity markets. After 3-year lock-in, you can redeem with potential capital gains.",
    examples: [
      "Axis Long Term Equity Fund",
      "Mirae Asset Tax Saver Fund",
      "DSP Tax Saver Fund",
      "Invesco India Tax Plan",
    ],
    platforms: [
      "All major platforms",
      "Direct from AMC websites",
      "Bank branches",
    ],
    pros: [
      "Tax deduction up to ₹1.5 lakh",
      "Shortest lock-in among tax-saving options",
      "Wealth creation potential",
      "Professional management",
      "High liquidity post lock-in",
    ],
    cons: [
      "3-year mandatory lock-in period",
      "Market risk exposure",
      "No guaranteed returns",
      "Tax on capital gains",
    ],
    whoShouldInvest: [
      "Taxpayers in higher tax brackets",
      "Investors with 3+ year horizon",
      "Those seeking tax-efficient wealth creation",
    ],
    taxImplications:
      "80C deduction on investment. LTCG tax of 10% on gains above ₹1 lakh after 3 years.",
    exitStrategy:
      "Cannot redeem before 3 years. Post lock-in, can redeem as per market conditions.",
    marketRisks: [
      "Equity market volatility",
      "Sectoral concentration risk",
      "Fund management risk",
    ],
    allocation: { conservative: 15, moderate: 25, aggressive: 30 },
  },
  {
    id: "ppf",
    name: "Public Provident Fund (PPF)",
    category: "Government Scheme",
    riskLevel: "Low",
    minInvestment: 500,
    expectedReturn: "7-8%",
    timeline: "15 years",
    description:
      "Government-backed long-term savings scheme with tax benefits and guaranteed returns",
    detailedDescription:
      "PPF is a 15-year government-backed savings scheme offering triple tax benefits - tax deduction on investment, tax-free interest, and tax-free maturity amount. It's ideal for long-term wealth creation with safety.",
    howItWorks:
      "Invest minimum ₹500 to maximum ₹1.5 lakh annually. Government credits interest quarterly. After 15 years, get tax-free maturity amount.",
    examples: [
      "PPF accounts at any bank",
      "Post office PPF accounts",
      "Online PPF through bank websites",
    ],
    platforms: [
      "All nationalized banks",
      "Post offices",
      "Online banking platforms",
    ],
    pros: [
      "Triple tax benefit (EEE status)",
      "Government guarantee",
      "Compound interest growth",
      "Partial withdrawal after 7th year",
      "Loan facility from 3rd year",
      "Extension possible in 5-year blocks",
    ],
    cons: [
      "Long 15-year lock-in period",
      "Lower returns compared to equity",
      "Annual investment limit of ₹1.5 lakh",
      "Interest rate changes with government policy",
    ],
    whoShouldInvest: [
      "Conservative investors",
      "Those seeking guaranteed returns",
      "Long-term financial planners",
      "Taxpayers wanting 80C benefits",
    ],
    taxImplications:
      "Tax deduction under 80C. Interest and maturity amount completely tax-free.",
    exitStrategy:
      "Mandatory 15-year tenure. Can extend in 5-year blocks without fresh contributions.",
    marketRisks: ["Interest rate risk", "Inflation risk", "Policy change risk"],
    allocation: { conservative: 30, moderate: 20, aggressive: 10 },
  },
  {
    id: "sgb",
    name: "Sovereign Gold Bonds (SGB)",
    category: "Government Securities",
    riskLevel: "Medium",
    minInvestment: 5000,
    expectedReturn: "8-12%",
    timeline: "8 years",
    description:
      "Government-issued bonds backed by gold with additional interest and tax benefits",
    detailedDescription:
      "SGBs are government securities denominated in grams of gold, eliminating the risk of holding physical gold while providing additional interest income of 2.5% per annum.",
    howItWorks:
      "Buy SGBs at issue price based on gold rate. Government pays 2.5% annual interest. At maturity, receive current gold price or can trade on exchanges.",
    examples: [
      "SGB 2024 Series I",
      "SGB 2024 Series II",
      "RBI Gold Bond Series",
    ],
    platforms: ["Banks", "Zerodha", "Groww", "Post offices", "Stock exchanges"],
    pros: [
      "Gold price appreciation potential",
      "Additional 2.5% annual interest",
      "No storage cost or theft risk",
      "Tax-free capital gains if held till maturity",
      "Can be traded on exchanges",
      "Government guarantee",
    ],
    cons: [
      "8-year lock-in for tax benefits",
      "Gold price volatility",
      "Limited issue windows",
      "Interest income is taxable",
      "Currency risk for NRIs",
    ],
    whoShouldInvest: [
      "Those wanting gold exposure",
      "Investors seeking inflation hedge",
      "Conservative to moderate risk takers",
      "Long-term investors",
    ],
    taxImplications:
      "Interest taxable as per income tax slab. Capital gains tax-free if held till maturity.",
    exitStrategy:
      "Can exit after 5th year on interest payment dates or trade on exchanges.",
    marketRisks: [
      "Gold price volatility",
      "Currency fluctuation",
      "Interest rate changes",
    ],
    allocation: { conservative: 15, moderate: 10, aggressive: 5 },
  },
  {
    id: "liquid_funds",
    name: "Liquid Mutual Funds",
    category: "Debt Funds",
    riskLevel: "Low",
    minInvestment: 1000,
    expectedReturn: "4-6%",
    timeline: "Flexible",
    description:
      "Ultra-short term debt funds for parking surplus cash with high liquidity",
    detailedDescription:
      "Liquid funds invest in very short-term money market instruments and debt securities with maturity up to 91 days. They offer higher returns than savings accounts with minimal risk.",
    howItWorks:
      "Fund invests in treasury bills, commercial papers, and short-term deposits. You can invest and redeem on any working day with quick processing.",
    examples: [
      "Axis Liquid Fund",
      "ICICI Pru Liquid Fund",
      "HDFC Liquid Fund",
      "SBI Liquid Fund",
    ],
    platforms: ["All investment platforms", "Direct from AMC", "Bank websites"],
    pros: [
      "High liquidity - instant redemption",
      "Better returns than savings account",
      "Very low risk",
      "No exit load after 7 days",
      "Professional fund management",
      "Can invest any amount",
    ],
    cons: [
      "Lower returns compared to other options",
      "Interest rate risk",
      "Credit risk of underlying securities",
      "Taxation on gains",
    ],
    whoShouldInvest: [
      "Those needing emergency fund",
      "Short-term cash parking needs",
      "Conservative investors",
      "First-time mutual fund investors",
    ],
    taxImplications:
      "Gains taxed as per income tax slab if held less than 3 years. 20% with indexation after 3 years.",
    exitStrategy:
      "Can redeem anytime. Instant redemption up to ₹50,000 or 90% of holding.",
    marketRisks: [
      "Interest rate changes",
      "Credit risk of securities",
      "Liquidity risk in extreme scenarios",
    ],
    allocation: { conservative: 20, moderate: 15, aggressive: 10 },
  },
  {
    id: "nps",
    name: "National Pension System (NPS)",
    category: "Retirement Planning",
    riskLevel: "Medium",
    minInvestment: 500,
    expectedReturn: "9-12%",
    timeline: "Till retirement",
    description:
      "Government-sponsored pension scheme for systematic retirement planning with tax benefits",
    detailedDescription:
      "NPS is a voluntary, long-term retirement savings scheme where you can choose your fund manager and investment mix. It offers additional tax deduction under Section 80CCD(1B).",
    howItWorks:
      "Regular contributions get invested in chosen funds (equity, corporate bonds, government securities). At retirement, you can withdraw 60% tax-free and use 40% to buy annuity.",
    examples: [
      "NPS Tier I account",
      "NPS Tier II account",
      "Corporate NPS plans",
    ],
    platforms: [
      "Banks",
      "Online NPS platforms",
      "NPS Trust website",
      "Mutual fund distributors",
    ],
    pros: [
      "Additional ₹50,000 tax deduction",
      "Professional fund management",
      "Low cost structure",
      "Choice of fund managers",
      "Partial withdrawal allowed",
      "Government co-contribution for some",
    ],
    cons: [
      "Long lock-in till retirement",
      "Mandatory annuity purchase",
      "Limited withdrawal options",
      "Market risk exposure",
      "Annuity returns may be low",
    ],
    whoShouldInvest: [
      "Salaried individuals",
      "Those planning for retirement",
      "Investors wanting additional tax benefits",
      "Long-term systematic investors",
    ],
    taxImplications:
      "Tax deduction under 80C and 80CCD(1B). 60% withdrawal tax-free at retirement, annuity income taxable.",
    exitStrategy:
      "Cannot exit before 60 years except in specific circumstances. At retirement, 60% lump sum, 40% annuity.",
    marketRisks: [
      "Market volatility",
      "Fund manager risk",
      "Interest rate risk",
      "Annuity rate risk",
    ],
    allocation: { conservative: 25, moderate: 20, aggressive: 15 },
  },
  {
    id: "fd_laddering",
    name: "Fixed Deposit Laddering",
    category: "Fixed Income",
    riskLevel: "Low",
    minInvestment: 10000,
    expectedReturn: "5-7%",
    timeline: "1-5 years",
    description:
      "Strategic creation of multiple FDs with different maturity periods for optimal returns and liquidity",
    detailedDescription:
      "FD laddering involves creating multiple fixed deposits with staggered maturity dates to benefit from potentially higher rates while maintaining liquidity.",
    howItWorks:
      "Divide your investment into multiple FDs with different tenures. As each FD matures, reinvest at current rates or use the money as needed.",
    examples: [
      "Bank FDs with 1,2,3,4,5 year tenures",
      "Corporate FDs",
      "Small Finance Bank FDs",
    ],
    platforms: [
      "All banks",
      "Online banking",
      "Corporate FD platforms",
      "Financial advisors",
    ],
    pros: [
      "Guaranteed returns",
      "Capital protection",
      "Staggered liquidity",
      "Rate optimization",
      "Simple strategy",
      "Senior citizen benefits",
    ],
    cons: [
      "Lower returns vs inflation",
      "Tax on interest income",
      "Penalty on premature withdrawal",
      "Interest rate risk",
      "No capital appreciation",
    ],
    whoShouldInvest: [
      "Conservative investors",
      "Senior citizens",
      "Those needing regular income",
      "Risk-averse individuals",
    ],
    taxImplications:
      "Interest income taxable as per income tax slab. TDS applicable if interest exceeds ₹40,000 per year.",
    exitStrategy:
      "Can withdraw prematurely with penalty. Better to plan ladder according to liquidity needs.",
    marketRisks: [
      "Interest rate risk",
      "Inflation risk",
      "Bank credit risk (for corporate FDs)",
    ],
    allocation: { conservative: 30, moderate: 15, aggressive: 5 },
  },
  {
    id: "hybrid_funds",
    name: "Hybrid Mutual Funds",
    category: "Balanced Funds",
    riskLevel: "Medium",
    minInvestment: 500,
    expectedReturn: "8-12%",
    timeline: "3-5 years",
    description:
      "Balanced approach investing in both equity and debt for moderate risk and returns",
    detailedDescription:
      "Hybrid funds invest in a mix of equity and debt instruments, providing balanced exposure. They aim to provide capital appreciation with lower volatility than pure equity funds.",
    howItWorks:
      "Fund manager allocates money between stocks and bonds based on fund mandate. Equity component provides growth while debt provides stability.",
    examples: [
      "ICICI Pru Balanced Advantage Fund",
      "HDFC Hybrid Equity Fund",
      "Axis Balanced Fund",
    ],
    platforms: ["All mutual fund platforms", "Banks", "Direct from AMCs"],
    pros: [
      "Balanced risk-return profile",
      "Professional asset allocation",
      "Lower volatility than equity funds",
      "Diversification benefits",
      "Suitable for moderate risk appetite",
      "Regular income potential",
    ],
    cons: [
      "Lower returns than pure equity",
      "Complex fund selection",
      "Fund manager dependency",
      "Higher expense ratio",
      "Tax complexity",
    ],
    whoShouldInvest: [
      "Moderate risk investors",
      "First-time equity investors",
      "Those wanting balanced exposure",
      "Investors with 3-5 year horizon",
    ],
    taxImplications:
      "Taxation depends on equity allocation. If equity >65%, treated as equity fund for tax purposes.",
    exitStrategy:
      "High liquidity, can redeem anytime. Consider market conditions and fund performance.",
    marketRisks: [
      "Market volatility",
      "Interest rate risk",
      "Credit risk",
      "Fund manager risk",
    ],
    allocation: { conservative: 20, moderate: 30, aggressive: 15 },
  },
  {
    id: "international_funds",
    name: "International Mutual Funds",
    category: "Global Equity",
    riskLevel: "High",
    minInvestment: 500,
    expectedReturn: "10-15%",
    timeline: "5+ years",
    description:
      "Invest in global markets for geographical diversification and currency hedge",
    detailedDescription:
      "These funds invest in stocks of companies listed on foreign stock exchanges, providing exposure to global markets and currencies.",
    howItWorks:
      "Fund invests in international stocks either directly or through feeder route. Provides rupee depreciation benefits and global diversification.",
    examples: [
      "Motilal Oswal Nasdaq 100 Fund",
      "ICICI Pru US Bluechip Fund",
      "Franklin India Feeder Fund",
    ],
    platforms: [
      "Mutual fund platforms",
      "International brokers",
      "Bank platforms",
    ],
    pros: [
      "Global diversification",
      "Currency hedge benefits",
      "Access to global giants",
      "Professional management",
      "Rupee depreciation advantage",
      "Exposure to developed markets",
    ],
    cons: [
      "Currency risk",
      "Higher expense ratios",
      "Tax complexity",
      "Regulatory changes",
      "Double taxation issues",
      "Market timing challenges",
    ],
    whoShouldInvest: [
      "Experienced investors",
      "Those wanting global exposure",
      "Long-term investors",
      "High-income individuals",
    ],
    taxImplications:
      "Treated as debt funds for tax - gains taxed as per slab if held <3 years, 20% with indexation if held >3 years.",
    exitStrategy:
      "Can redeem anytime but consider currency movements and market conditions.",
    marketRisks: [
      "Global market volatility",
      "Currency fluctuation",
      "Geopolitical risks",
      "Regulatory changes",
    ],
    allocation: { conservative: 5, moderate: 10, aggressive: 20 },
  },
  {
    id: "ulip",
    name: "Unit Linked Insurance Plans (ULIP)",
    category: "Insurance + Investment",
    riskLevel: "Medium",
    minInvestment: 12000,
    expectedReturn: "8-12%",
    timeline: "10+ years",
    description:
      "Combination of life insurance and investment with tax benefits under Section 80C",
    detailedDescription:
      "ULIPs provide life insurance cover along with investment options in equity, debt, or balanced funds. Premium pays for insurance charges and remaining amount gets invested.",
    howItWorks:
      "Pay premium, part goes to insurance charges, balance invested in chosen funds. Fund value fluctuates with market performance.",
    examples: [
      "LIC New Jeevan Anand ULIP",
      "HDFC Life Click 2 Invest",
      "ICICI Pru Signature ULIP",
    ],
    platforms: [
      "Insurance companies",
      "Insurance agents",
      "Online insurance platforms",
    ],
    pros: [
      "Dual benefit of insurance and investment",
      "Tax benefits under 80C",
      "Tax-free maturity (if premium <10% of sum assured)",
      "Flexibility to switch funds",
      "Top-up facility available",
      "Partial withdrawals allowed",
    ],
    cons: [
      "High charges in initial years",
      "Complex product structure",
      "Lower returns compared to mutual funds",
      "Long lock-in period",
      "Surrender charges",
      "Insurance coverage may be inadequate",
    ],
    whoShouldInvest: [
      "Those needing life insurance",
      "Tax-saving investors",
      "Long-term investors",
      "First-time investors",
    ],
    taxImplications:
      "Tax deduction under 80C. Maturity proceeds tax-free if premium <10% of sum assured annually.",
    exitStrategy:
      "Can surrender after 5 years with charges. Partial withdrawals allowed from 6th year.",
    marketRisks: [
      "Market volatility",
      "Fund management risk",
      "Regulatory changes",
      "High charges impact",
    ],
    allocation: { conservative: 15, moderate: 20, aggressive: 10 },
  },
];

export const professionalInvestmentStrategies: InvestmentStrategy[] = [
  {
    id: "reits",
    name: "Real Estate Investment Trusts (REITs)",
    category: "Real Estate",
    riskLevel: "Medium",
    minInvestment: 20000,
    expectedReturn: "8-12%",
    timeline: "3+ years",
    description:
      "Invest in commercial real estate through stock exchange listed REITs",
    detailedDescription:
      "REITs are companies that own, operate, or finance income-generating real estate. They allow individual investors to earn dividends from commercial real estate investments without having to buy properties.",
    howItWorks:
      "REITs pool money from investors to purchase and manage commercial properties. Rental income is distributed as dividends to investors.",
    examples: [
      "Embassy Office Parks REIT",
      "Mindspace Business Parks REIT",
      "Brookfield India REIT",
    ],
    platforms: [
      "Zerodha",
      "Groww",
      "Angel One",
      "HDFC Securities",
      "ICICI Direct",
    ],
    pros: [
      "Professional real estate management",
      "Regular dividend income",
      "Liquidity through stock exchange",
      "Diversified real estate exposure",
      "Lower minimum investment vs direct property",
      "Transparent operations",
    ],
    cons: [
      "Interest rate sensitivity",
      "Limited number of REITs in India",
      "Market volatility",
      "Occupancy rate risks",
      "Geographic concentration",
      "Regulatory changes",
    ],
    whoShouldInvest: [
      "Investors wanting real estate exposure",
      "Those seeking regular income",
      "Portfolio diversification seekers",
      "Professional investors",
    ],
    taxImplications:
      "Dividend income taxable as per slab. Capital gains taxed as per equity taxation rules.",
    exitStrategy:
      "Can sell on stock exchange during market hours. Consider occupancy rates and interest rate environment.",
    marketRisks: [
      "Interest rate changes",
      "Real estate market cycles",
      "Tenant concentration risk",
      "Economic downturns",
    ],
    allocation: { conservative: 10, moderate: 15, aggressive: 20 },
  },
  {
    id: "angel_investing",
    name: "Angel Investing Platforms",
    category: "Alternative Investment",
    riskLevel: "Very High",
    minInvestment: 250000,
    expectedReturn: "15-30%",
    timeline: "5-7 years",
    description:
      "Invest in early-stage startups through regulated angel investing platforms",
    detailedDescription:
      "Angel investing involves providing capital to early-stage startups in exchange for equity. These platforms allow accredited investors to invest in curated startup deals.",
    howItWorks:
      "Platform conducts due diligence on startups. Investors can review deals and invest. Returns come through equity appreciation and eventual exits.",
    examples: [
      "AngelList India",
      "LetsVenture",
      "Mumbai Angels",
      "Indian Angel Network",
    ],
    platforms: [
      "AngelList",
      "LetsVenture",
      "Mumbai Angels Platform",
      "Ah! Ventures",
    ],
    pros: [
      "Very high return potential",
      "Portfolio diversification",
      "Support innovation ecosystem",
      "Early access to promising companies",
      "Potential for exponential returns",
      "Learning from startup ecosystem",
    ],
    cons: [
      "Very high risk of total loss",
      "Long gestation period",
      "Illiquid investment",
      "High minimum investment",
      "Complex due diligence required",
      "Regulatory uncertainty",
    ],
    whoShouldInvest: [
      "High net worth individuals",
      "Experienced investors",
      "Those with high risk appetite",
      "Business professionals understanding startups",
    ],
    taxImplications:
      "Capital gains tax applicable. LTCG of 20% with indexation if held >24 months for unlisted shares.",
    exitStrategy:
      "Exit through IPO, acquisition, or secondary sales. May take 5-10 years for successful exits.",
    marketRisks: [
      "Startup failure risk",
      "Market timing risk",
      "Valuation risk",
      "Liquidity risk",
      "Regulatory changes",
    ],
    allocation: { conservative: 0, moderate: 5, aggressive: 15 },
  },
  {
    id: "treasury_bills",
    name: "Treasury Bills & Government Securities",
    category: "Government Securities",
    riskLevel: "Low",
    minInvestment: 25000,
    expectedReturn: "6-7%",
    timeline: "91 days - 10 years",
    description:
      "Government-issued short to long-term securities with sovereign guarantee",
    detailedDescription:
      "G-Secs are debt instruments issued by the Government of India to finance fiscal deficit. They are considered the safest investment option with sovereign guarantee.",
    howItWorks:
      "Government issues bonds to raise money. Investors lend money to government and receive fixed interest. Principal returned at maturity.",
    examples: [
      "91-day Treasury Bills",
      "182-day T-Bills",
      "10-year Government Bonds",
      "Floating Rate Bonds",
    ],
    platforms: [
      "RBI Retail Direct",
      "Zerodha",
      "Banks",
      "Primary dealers",
      "Mutual fund platforms",
    ],
    pros: [
      "Sovereign guarantee - zero default risk",
      "Predictable returns",
      "Various maturity options",
      "High liquidity in secondary market",
      "No credit risk",
      "Benchmark for other investments",
    ],
    cons: [
      "Interest rate risk for long-term bonds",
      "Lower returns compared to equity",
      "Inflation risk",
      "Tax on interest income",
      "Price volatility in secondary market",
    ],
    whoShouldInvest: [
      "Conservative investors",
      "Institutional investors",
      "Those needing capital protection",
      "Short-term cash management",
    ],
    taxImplications:
      "Interest income taxable as per income tax slab. Capital gains tax applicable for secondary market trading.",
    exitStrategy:
      "Can hold till maturity or sell in secondary market. Consider interest rate movements.",
    marketRisks: ["Interest rate risk", "Inflation risk", "Reinvestment risk"],
    allocation: { conservative: 40, moderate: 25, aggressive: 15 },
  },
  {
    id: "global_equity",
    name: "Direct US Stocks & Global ETFs",
    category: "International Equity",
    riskLevel: "High",
    minInvestment: 1000,
    expectedReturn: "10-15%",
    timeline: "5+ years",
    description:
      "Direct investment in US stocks and global ETFs for international diversification",
    detailedDescription:
      "Invest directly in US stocks and global ETFs to access world's largest companies and diversify geographically. Provides exposure to USD and global economic growth.",
    howItWorks:
      "Open international trading account, transfer funds abroad under LRS, and buy stocks/ETFs listed on international exchanges.",
    examples: [
      "Apple Inc.",
      "Microsoft Corp.",
      "Amazon",
      "Tesla",
      "SPDR S&P 500 ETF",
      "Vanguard Total Stock Market ETF",
    ],
    platforms: [
      "Vested Finance",
      "INDmoney",
      "Groww US",
      "HDFC Securities Global",
      "ICICI Direct Global",
    ],
    pros: [
      "Direct ownership of global companies",
      "Currency diversification benefits",
      "Access to innovative companies",
      "Hedge against rupee depreciation",
      "Global economic exposure",
      "Advanced market infrastructure",
    ],
    cons: [
      "Currency conversion costs",
      "Tax complexity (India & US)",
      "Regulatory compliance requirements",
      "Time zone differences",
      "Higher brokerage costs",
      "Estate planning complications",
    ],
    whoShouldInvest: [
      "Experienced investors",
      "High-income individuals",
      "Those wanting global exposure",
      "Long-term investors",
    ],
    taxImplications:
      "Double taxation - pay tax in US and India. Foreign Tax Credit available. LTCG of 20% with indexation in India.",
    exitStrategy:
      "Can sell during US market hours. Consider currency movements, tax implications, and repatriation.",
    marketRisks: [
      "Currency risk",
      "Global market volatility",
      "Geopolitical risks",
      "Regulatory changes in both countries",
    ],
    allocation: { conservative: 5, moderate: 15, aggressive: 25 },
  },
  {
    id: "corporate_bonds",
    name: "Corporate Bonds & NCDs",
    category: "Fixed Income",
    riskLevel: "Medium",
    minInvestment: 10000,
    expectedReturn: "7-10%",
    timeline: "1-10 years",
    description:
      "Higher-yielding corporate debt securities with credit risk assessment",
    detailedDescription:
      "Corporate bonds are debt securities issued by companies to raise capital. They typically offer higher returns than government securities but carry credit risk.",
    howItWorks:
      "Companies issue bonds to raise money. Investors lend money and receive fixed interest. Higher-rated companies offer lower rates but better safety.",
    examples: [
      "HDFC NCD",
      "Bajaj Finance NCD",
      "Mahindra Finance Bonds",
      "Tata Capital Bonds",
    ],
    platforms: [
      "Stock exchanges",
      "Bond platforms",
      "Investment banks",
      "Wealth managers",
    ],
    pros: [
      "Higher returns than G-Secs",
      "Fixed income stream",
      "Credit rating guidance",
      "Various maturity options",
      "Better than FD returns",
      "Portfolio diversification",
    ],
    cons: [
      "Credit risk of issuing company",
      "Interest rate risk",
      "Lower liquidity",
      "Default risk",
      "Call risk for callable bonds",
      "Limited retail availability",
    ],
    whoShouldInvest: [
      "Conservative to moderate investors",
      "Income-seeking investors",
      "Portfolio diversification seekers",
      "Corporate bond understanding investors",
    ],
    taxImplications:
      "Interest income taxable as per slab. Capital gains taxed as per debt taxation rules.",
    exitStrategy:
      "Can hold till maturity or sell in secondary market if available. Check credit rating before exit.",
    marketRisks: [
      "Credit risk",
      "Interest rate risk",
      "Liquidity risk",
      "Call risk",
    ],
    allocation: { conservative: 25, moderate: 20, aggressive: 10 },
  },
  {
    id: "commodity_etfs",
    name: "Commodity ETFs & Futures",
    category: "Commodities",
    riskLevel: "High",
    minInvestment: 5000,
    expectedReturn: "8-15%",
    timeline: "1-3 years",
    description:
      "Exposure to commodities like gold, silver, crude oil for inflation hedge and diversification",
    detailedDescription:
      "Commodity investments provide exposure to physical commodities through ETFs or futures contracts. They act as inflation hedge and portfolio diversifier.",
    howItWorks:
      "ETFs track commodity prices, futures contracts provide leveraged exposure. Prices move based on supply-demand dynamics and global factors.",
    examples: [
      "Gold ETFs",
      "Silver ETFs",
      "Crude Oil ETFs",
      "Multi-commodity funds",
    ],
    platforms: [
      "Stock exchanges",
      "Commodity exchanges",
      "Mutual fund platforms",
      "Brokerage accounts",
    ],
    pros: [
      "Inflation hedge",
      "Portfolio diversification",
      "Global economic exposure",
      "Lower correlation with stocks",
      "Currency hedge (for USD commodities)",
      "Easy trading through ETFs",
    ],
    cons: [
      "High volatility",
      "No income generation",
      "Storage costs (for physical)",
      "Regulatory risks",
      "Geopolitical sensitivity",
      "Complex derivatives",
    ],
    whoShouldInvest: [
      "Experienced investors",
      "Portfolio diversification seekers",
      "Inflation hedge seekers",
      "Tactical allocation investors",
    ],
    taxImplications:
      "ETFs taxed as equity if tracking equity indices. Futures have specific taxation rules.",
    exitStrategy:
      "High liquidity for ETFs during market hours. Futures require careful position management.",
    marketRisks: [
      "Price volatility",
      "Supply-demand shocks",
      "Currency risk",
      "Regulatory changes",
    ],
    allocation: { conservative: 5, moderate: 10, aggressive: 15 },
  },
  {
    id: "venture_debt",
    name: "Venture Debt Funds",
    category: "Alternative Investment",
    riskLevel: "High",
    minInvestment: 500000,
    expectedReturn: "12-18%",
    timeline: "2-4 years",
    description:
      "Debt financing to startups and growth companies with equity kickers",
    detailedDescription:
      "Venture debt provides loans to startups and growth companies, often with equity warrants. It's typically used alongside equity funding rounds.",
    howItWorks:
      "Fund provides debt to startups with potential equity upside through warrants. Returns come from interest income and equity appreciation.",
    examples: [
      "Trifecta Venture Debt",
      "Alteria Capital",
      "InnoVen Capital funds",
    ],
    platforms: [
      "Alternative investment platforms",
      "Wealth managers",
      "Investment banks",
    ],
    pros: [
      "Higher returns than traditional debt",
      "Equity upside potential",
      "Senior to equity in liquidation",
      "Regular interest income",
      "Diversification benefits",
      "Professional management",
    ],
    cons: [
      "High risk of default",
      "Startup ecosystem dependent",
      "Illiquid investment",
      "High minimum investment",
      "Complex structure",
      "Regulatory uncertainty",
    ],
    whoShouldInvest: [
      "High net worth individuals",
      "Institutional investors",
      "Startup ecosystem participants",
      "Risk-seeking investors",
    ],
    taxImplications:
      "Interest income taxable. Capital gains from warrants subject to applicable rates.",
    exitStrategy:
      "Returns through loan repayment and warrant exercises. Limited secondary market.",
    marketRisks: [
      "Default risk",
      "Startup market cycles",
      "Valuation risk",
      "Liquidity risk",
    ],
    allocation: { conservative: 0, moderate: 3, aggressive: 8 },
  },
  {
    id: "invoice_discounting",
    name: "Invoice Discounting Platforms",
    category: "Alternative Investment",
    riskLevel: "Medium",
    minInvestment: 25000,
    expectedReturn: "9-14%",
    timeline: "30-180 days",
    description:
      "Short-term financing by purchasing invoices at discount from verified businesses",
    detailedDescription:
      "Invoice discounting allows investors to earn returns by financing working capital needs of businesses through purchasing their receivables at a discount.",
    howItWorks:
      "Businesses upload verified invoices on platform. Investors bid to finance these invoices at discount. Returns earned when customer pays.",
    examples: ["KredX", "Invoicemart", "CredAble", "FlexiLoans Invoice"],
    platforms: ["KredX", "Invoicemart", "CredAble", "FlexiLoans"],
    pros: [
      "Short-term investment cycles",
      "Asset-backed investment",
      "Regular income opportunities",
      "Lower risk than unsecured lending",
      "Diversification across multiple invoices",
      "Professional due diligence",
    ],
    cons: [
      "Credit risk of end customers",
      "Platform risk",
      "Limited track record",
      "Regulatory uncertainty",
      "Concentration risk",
      "No deposit insurance",
    ],
    whoShouldInvest: [
      "Short-term investors",
      "Business-savvy individuals",
      "Risk-aware investors",
      "Income-seeking investors",
    ],
    taxImplications:
      "Returns taxed as income from other sources as per applicable tax slab.",
    exitStrategy:
      "Investment matures when underlying invoice is paid. Limited premature exit options.",
    marketRisks: [
      "Customer default risk",
      "Platform risk",
      "Economic downturn impact",
      "Regulatory changes",
    ],
    allocation: { conservative: 5, moderate: 8, aggressive: 12 },
  },
  {
    id: "distressed_debt",
    name: "Distressed Debt Opportunities",
    category: "Special Situations",
    riskLevel: "Very High",
    minInvestment: 1000000,
    expectedReturn: "15-25%",
    timeline: "2-5 years",
    description:
      "Investing in debt of financially distressed companies for high returns during recovery",
    detailedDescription:
      "Distressed debt investing involves purchasing debt securities of companies facing financial difficulties at significant discounts, betting on their recovery or restructuring.",
    howItWorks:
      "Identify companies in financial distress, purchase their debt at discount. Profit from recovery, restructuring, or liquidation proceedings.",
    examples: [
      "Corporate debt of stressed companies",
      "NPAs being sold by banks",
      "Stressed asset funds",
    ],
    platforms: [
      "Investment banks",
      "Distressed debt funds",
      "Alternative investment platforms",
    ],
    pros: [
      "Very high return potential",
      "Less competition from traditional investors",
      "Value investing opportunities",
      "Potential for debt-to-equity conversion",
      "Portfolio diversification",
      "Contrarian investment approach",
    ],
    cons: [
      "Very high risk of total loss",
      "Complex legal processes",
      "Long resolution timelines",
      "Requires specialized knowledge",
      "Illiquid investments",
      "Regulatory and legal uncertainties",
    ],
    whoShouldInvest: [
      "Sophisticated investors",
      "High net worth individuals",
      "Institutional investors",
      "Specialists in distressed situations",
    ],
    taxImplications:
      "Complex tax treatment depending on structure. Professional tax advice essential.",
    exitStrategy:
      "Recovery through company turnaround, debt restructuring, or asset liquidation.",
    marketRisks: [
      "Company bankruptcy risk",
      "Legal and regulatory risks",
      "Economic cycle dependency",
      "Recovery timeline uncertainty",
    ],
    allocation: { conservative: 0, moderate: 2, aggressive: 5 },
  },
  {
    id: "structured_products",
    name: "Structured Products & Capital Protection",
    category: "Structured Products",
    riskLevel: "Medium",
    minInvestment: 100000,
    expectedReturn: "6-12%",
    timeline: "1-5 years",
    description:
      "Hybrid instruments combining fixed income with derivatives for customized risk-return profiles",
    detailedDescription:
      "Structured products combine traditional investments with derivatives to create customized risk-return profiles, often with capital protection features.",
    howItWorks:
      "Product structure combines bonds with options/derivatives. Capital protection ensures principal safety while derivatives provide upside potential.",
    examples: [
      "Market-linked debentures",
      "Capital protection funds",
      "Index-linked notes",
    ],
    platforms: [
      "Investment banks",
      "Private banks",
      "Wealth management platforms",
    ],
    pros: [
      "Customized risk-return profiles",
      "Capital protection options",
      "Exposure to various asset classes",
      "Professional structuring",
      "Defined outcomes",
      "Portfolio diversification",
    ],
    cons: [
      "Complex product structure",
      "Liquidity constraints",
      "Credit risk of issuer",
      "High fees and charges",
      "Limited upside potential",
      "Counterparty risk",
    ],
    whoShouldInvest: [
      "Conservative investors wanting upside",
      "Portfolio diversification seekers",
      "Risk-managed investment approaches",
      "Income plus growth seekers",
    ],
    taxImplications:
      "Tax treatment varies by structure. Professional advice recommended.",
    exitStrategy:
      "Usually held till maturity. Secondary market liquidity may be limited.",
    marketRisks: [
      "Issuer credit risk",
      "Market risk of underlying",
      "Liquidity risk",
      "Complexity risk",
    ],
    allocation: { conservative: 10, moderate: 15, aggressive: 10 },
  },
];

export const growWealthStrategies: InvestmentStrategy[] = [
  {
    id: "gold_investment",
    name: "Gold Investment",
    category: "Precious Metals",
    riskLevel: "Low",
    minInvestment: 1000,
    expectedReturn: "8-12%",
    timeline: "3+ years",
    description:
      "Hedge against inflation with digital gold investments. Safe haven asset for portfolio diversification.",
    detailedDescription:
      "Gold has been a store of value for centuries. Digital gold allows you to invest in gold without physical storage concerns while providing protection against inflation and currency devaluation.",
    howItWorks:
      "Invest in digital gold through apps or gold ETFs. Your investment tracks real gold prices and can be converted to physical gold or sold for cash anytime.",
    examples: [
      "Digital Gold (Google Pay, Paytm)",
      "Gold ETFs",
      "Gold Mutual Funds",
      "Sovereign Gold Bonds",
    ],
    platforms: ["Google Pay", "Paytm", "Groww", "Zerodha", "Banks"],
    pros: [
      "Inflation hedge",
      "High liquidity",
      "No storage hassle",
      "Global store of value",
      "Portfolio diversification",
    ],
    cons: [
      "No regular income",
      "Price volatility",
      "No productive asset",
      "Import duty impact",
    ],
    whoShouldInvest: [
      "Conservative investors",
      "Inflation hedge seekers",
      "Portfolio diversifiers",
      "Traditional investors",
    ],
    taxImplications:
      "LTCG of 20% with indexation after 3 years for physical gold and gold funds. Digital gold taxed as per slab.",
    exitStrategy:
      "High liquidity - can sell anytime during market hours through apps or exchanges.",
    marketRisks: [
      "Gold price volatility",
      "Currency fluctuation",
      "Global economic factors",
    ],
    allocation: { conservative: 15, moderate: 10, aggressive: 5 },
  },
  {
    id: "energy_sector",
    name: "Energy Sector ETFs",
    category: "Renewable Energy",
    riskLevel: "Medium",
    minInvestment: 5000,
    expectedReturn: "12-18%",
    timeline: "5+ years",
    description:
      "Invest in the future of energy with clean energy and renewable sector focused funds.",
    detailedDescription:
      "Energy sector investments focus on traditional and renewable energy companies. With global shift towards clean energy, this sector offers growth potential.",
    howItWorks:
      "ETFs and mutual funds invest in energy companies including solar, wind, oil, gas, and clean energy technology companies.",
    examples: [
      "Nippon India ETF Nifty Energy",
      "SBI ETF Energy",
      "Energy Mutual Funds",
    ],
    platforms: ["Zerodha", "Groww", "Mutual fund platforms", "Stock exchanges"],
    pros: [
      "Future growth sector",
      "Government policy support",
      "Global energy transition",
      "Dividend potential",
    ],
    cons: [
      "Sector concentration risk",
      "Policy dependency",
      "Commodity price sensitivity",
      "Environmental regulations",
    ],
    whoShouldInvest: [
      "Growth investors",
      "Thematic investors",
      "Long-term investors",
      "ESG conscious investors",
    ],
    taxImplications:
      "Equity taxation - LTCG of 10% above ₹1 lakh after 1 year, STCG of 15%.",
    exitStrategy:
      "Can sell during market hours. Consider energy market cycles and policy changes.",
    marketRisks: [
      "Oil price volatility",
      "Policy changes",
      "Technology disruption",
      "Global economic factors",
    ],
    allocation: { conservative: 5, moderate: 10, aggressive: 15 },
  },
  {
    id: "technology_stocks",
    name: "Technology Stocks",
    category: "Technology",
    riskLevel: "High",
    minInvestment: 10000,
    expectedReturn: "15-25%",
    timeline: "5+ years",
    description:
      "Invest in leading technology companies and emerging tech trends for high growth potential.",
    detailedDescription:
      "Technology sector offers exposure to innovation leaders in software, hardware, AI, cloud computing, and digital transformation.",
    howItWorks:
      "Invest in technology-focused mutual funds, ETFs, or individual tech stocks through stock markets.",
    examples: ["TCS", "Infosys", "Wipro", "Tech Mahindra", "Technology ETFs"],
    platforms: ["Zerodha", "Groww", "Angel One", "All brokers"],
    pros: [
      "High growth potential",
      "Innovation leader",
      "Digital transformation",
      "Export earnings",
    ],
    cons: [
      "High volatility",
      "Valuation concerns",
      "Competition risk",
      "Technology disruption",
    ],
    whoShouldInvest: [
      "Growth investors",
      "High risk appetite",
      "Tech-savvy investors",
      "Long-term investors",
    ],
    taxImplications:
      "Equity taxation - LTCG of 10% above ₹1 lakh after 1 year, STCG of 15%.",
    exitStrategy:
      "High liquidity during market hours. Monitor tech cycles and valuations.",
    marketRisks: [
      "Market volatility",
      "Technology disruption",
      "Valuation risk",
      "Competition",
    ],
    allocation: { conservative: 5, moderate: 15, aggressive: 25 },
  },
  {
    id: "banking_sector",
    name: "Banking Sector",
    category: "Financial Services",
    riskLevel: "Medium",
    minInvestment: 5000,
    expectedReturn: "10-15%",
    timeline: "3+ years",
    description:
      "Stable returns from established banking and financial services companies.",
    detailedDescription:
      "Banking sector forms the backbone of the economy. Invest in established banks and financial institutions for steady growth and dividends.",
    howItWorks:
      "Invest through banking ETFs, mutual funds, or individual bank stocks. Benefits from economic growth and credit expansion.",
    examples: ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Banking ETFs"],
    platforms: ["All stock brokers", "Mutual fund platforms", "Banking apps"],
    pros: [
      "Economic growth play",
      "Dividend income",
      "Established business",
      "Regulatory protection",
    ],
    cons: [
      "Interest rate sensitivity",
      "Credit risk",
      "Regulatory changes",
      "Economic cycle dependency",
    ],
    whoShouldInvest: [
      "Income investors",
      "Value investors",
      "Economic growth believers",
      "Dividend seekers",
    ],
    taxImplications:
      "Equity taxation rules apply. Dividends taxed as per income slab.",
    exitStrategy:
      "Good liquidity. Consider interest rate cycles and economic conditions.",
    marketRisks: [
      "Interest rate risk",
      "Credit cycle",
      "Regulatory changes",
      "Economic downturns",
    ],
    allocation: { conservative: 15, moderate: 20, aggressive: 15 },
  },
  {
    id: "healthcare_pharma",
    name: "Healthcare & Pharma",
    category: "Healthcare",
    riskLevel: "Low",
    minInvestment: 5000,
    expectedReturn: "12-16%",
    timeline: "5+ years",
    description:
      "Defensive sector with consistent demand and growth in healthcare services.",
    detailedDescription:
      "Healthcare is a defensive sector with consistent demand. Indian pharma companies also have global presence providing growth opportunities.",
    howItWorks:
      "Invest in pharma companies, healthcare mutual funds, or ETFs focusing on pharmaceuticals and healthcare services.",
    examples: [
      "Sun Pharma",
      "Dr. Reddy's",
      "Cipla",
      "Apollo Hospitals",
      "Healthcare funds",
    ],
    platforms: ["Stock exchanges", "Mutual fund platforms", "All brokers"],
    pros: [
      "Defensive nature",
      "Consistent demand",
      "Global presence",
      "Aging population trend",
    ],
    cons: [
      "Regulatory risks",
      "Drug approval risks",
      "Price controls",
      "Patent expiry risks",
    ],
    whoShouldInvest: [
      "Defensive investors",
      "Long-term investors",
      "Healthcare believers",
      "Risk-averse growth seekers",
    ],
    taxImplications:
      "Standard equity taxation applies - LTCG 10% above ₹1L, STCG 15%.",
    exitStrategy:
      "Good liquidity. Consider regulatory environment and drug pipeline.",
    marketRisks: [
      "Regulatory changes",
      "Drug approval risks",
      "Patent cliff",
      "Pricing pressure",
    ],
    allocation: { conservative: 10, moderate: 15, aggressive: 10 },
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    category: "Infrastructure",
    riskLevel: "Medium",
    minInvestment: 5000,
    expectedReturn: "11-17%",
    timeline: "5+ years",
    description:
      "Benefit from India's infrastructure development and smart city initiatives.",
    detailedDescription:
      "Infrastructure sector includes roads, railways, ports, power, and urban development. Government's focus on infrastructure provides growth opportunities.",
    howItWorks:
      "Invest in infrastructure companies through mutual funds, ETFs, or individual stocks in construction, power, and transportation companies.",
    examples: [
      "L&T",
      "UltraTech Cement",
      "Power Grid Corp",
      "Infrastructure funds",
    ],
    platforms: ["Stock markets", "Mutual fund platforms", "ETF platforms"],
    pros: [
      "Government support",
      "Long-term growth",
      "Economic multiplier",
      "Essential services",
    ],
    cons: [
      "Project execution risks",
      "Policy dependency",
      "High capital intensive",
      "Long gestation",
    ],
    whoShouldInvest: [
      "Long-term investors",
      "India growth story believers",
      "Patient capital",
      "Thematic investors",
    ],
    taxImplications:
      "Equity taxation rules - LTCG 10% above ₹1 lakh after 1 year.",
    exitStrategy:
      "Monitor project execution and government policy support before exit.",
    marketRisks: [
      "Project delays",
      "Policy changes",
      "Funding risks",
      "Economic cycles",
    ],
    allocation: { conservative: 8, moderate: 12, aggressive: 15 },
  },
];

export const fdOptionsStrategies: InvestmentStrategy[] = [
  {
    id: "bank_fd",
    name: "Bank Fixed Deposits",
    category: "Traditional Banking",
    riskLevel: "Low",
    minInvestment: 1000,
    expectedReturn: "6.5-7.5%",
    timeline: "1-10 years",
    description:
      "Guaranteed returns with principal protection. FDIC insured up to ₹5 lakhs per bank.",
    detailedDescription:
      "Bank FDs are the safest investment option with guaranteed returns and principal protection. Suitable for risk-averse investors.",
    howItWorks:
      "Deposit money with bank for fixed tenure. Bank pays fixed interest rate. Principal and interest guaranteed by bank and DICGC insurance.",
    examples: ["SBI FD", "HDFC FD", "ICICI FD", "Axis Bank FD"],
    platforms: ["All banks", "Online banking", "Bank branches", "Mobile apps"],
    pros: [
      "100% safe",
      "Guaranteed returns",
      "DICGC insurance",
      "Flexible tenures",
      "Senior citizen benefits",
    ],
    cons: [
      "Lower returns vs inflation",
      "Interest rate risk",
      "TDS on high interest",
      "Penalty on premature withdrawal",
    ],
    whoShouldInvest: [
      "Conservative investors",
      "Capital protection seekers",
      "Senior citizens",
      "Emergency fund parking",
    ],
    taxImplications:
      "Interest income taxable as per slab. TDS if interest exceeds ₹40,000 (₹50,000 for seniors).",
    exitStrategy:
      "Can withdraw prematurely with penalty. Better to match tenure with needs.",
    marketRisks: ["Interest rate risk", "Inflation risk", "Reinvestment risk"],
    allocation: { conservative: 40, moderate: 25, aggressive: 10 },
  },
  {
    id: "corporate_fd",
    name: "Corporate Fixed Deposits",
    category: "Corporate",
    riskLevel: "Low",
    minInvestment: 10000,
    expectedReturn: "8.0-9.5%",
    timeline: "1-5 years",
    description:
      "Higher returns than bank FDs from AAA-rated companies. Credit risk involved.",
    detailedDescription:
      "Corporate FDs offer higher returns than bank FDs but carry credit risk. Issued by financially strong companies with good credit ratings.",
    howItWorks:
      "Companies issue FDs to raise funds. Investors get higher interest than banks but need to assess company's financial health.",
    examples: ["Bajaj Finance FD", "Mahindra Finance FD", "Shriram Finance FD"],
    platforms: [
      "Company websites",
      "Financial distributors",
      "Online platforms",
    ],
    pros: [
      "Higher returns than bank FDs",
      "Flexible tenures",
      "Good for income generation",
      "AAA-rated options available",
    ],
    cons: [
      "Credit risk",
      "No insurance cover",
      "Limited liquidity",
      "Company-specific risks",
    ],
    whoShouldInvest: [
      "Income seekers",
      "Conservative investors willing to take slight credit risk",
      "Retirees",
    ],
    taxImplications:
      "Interest taxable as per income slab. TDS applicable on interest income.",
    exitStrategy:
      "Limited premature withdrawal. Choose companies with strong credit ratings.",
    marketRisks: [
      "Credit risk of issuing company",
      "Interest rate changes",
      "Liquidity risk",
    ],
    allocation: { conservative: 20, moderate: 15, aggressive: 5 },
  },
  {
    id: "tax_saver_fd",
    name: "Tax Saver FDs",
    category: "Tax Saving",
    riskLevel: "Low",
    minInvestment: 100,
    expectedReturn: "6.0-6.5%",
    timeline: "5 years",
    description:
      "5-year lock-in with tax benefits under Section 80C. Lower returns but safe.",
    detailedDescription:
      "Tax-saving FDs provide dual benefit of capital safety and tax deduction under Section 80C with mandatory 5-year lock-in period.",
    howItWorks:
      "Invest in 5-year tax-saving FD and claim deduction under 80C. Money locked for 5 years with guaranteed returns.",
    examples: [
      "SBI Tax Saving FD",
      "HDFC Tax Saving FD",
      "ICICI Tax Saving FD",
    ],
    platforms: ["All banks", "Online banking", "Tax-saving platforms"],
    pros: [
      "Tax deduction under 80C",
      "100% safe investment",
      "Guaranteed returns",
      "Disciplined saving",
    ],
    cons: ["5-year lock-in", "Lower returns", "No liquidity", "Inflation risk"],
    whoShouldInvest: [
      "Taxpayers needing 80C deduction",
      "Ultra-conservative investors",
      "Forced saving seekers",
    ],
    taxImplications:
      "Investment qualifies for 80C deduction up to ₹1.5L. Interest taxable as per slab.",
    exitStrategy:
      "No premature withdrawal allowed. Plan for 5-year lock-in before investing.",
    marketRisks: ["Interest rate risk", "Inflation risk", "Opportunity cost"],
    allocation: { conservative: 25, moderate: 10, aggressive: 0 },
  },
  {
    id: "senior_citizen_fd",
    name: "Senior Citizen FDs",
    category: "Senior Citizens",
    riskLevel: "Low",
    minInvestment: 1000,
    expectedReturn: "7.0-8.0%",
    timeline: "1-10 years",
    description:
      "Extra 0.5% interest rate for senior citizens (60+ years). Safe and guaranteed returns.",
    detailedDescription:
      "Special FD schemes for senior citizens offering additional 0.5% interest rate over regular FDs for better retirement income.",
    howItWorks:
      "Senior citizens (60+) get extra 0.5% interest rate on regular FDs. Some banks offer special senior citizen FD schemes.",
    examples: [
      "Senior Citizen FDs at all major banks",
      "Special schemes for seniors",
    ],
    platforms: [
      "All banks with special senior citizen desks",
      "Online banking",
    ],
    pros: [
      "Higher interest rates",
      "100% safe",
      "Special customer service",
      "Flexible tenures",
    ],
    cons: [
      "Age restriction",
      "Still lower vs inflation",
      "Interest rate risk",
      "Limited to seniors only",
    ],
    whoShouldInvest: [
      "Senior citizens (60+ years)",
      "Retirees needing regular income",
      "Conservative elderly investors",
    ],
    taxImplications:
      "Higher TDS exemption limit of ₹50,000 for seniors. Interest taxable as per slab.",
    exitStrategy: "Flexible withdrawal options. Consider interest rate cycles.",
    marketRisks: ["Interest rate risk", "Inflation impact on real returns"],
    allocation: { conservative: 50, moderate: 30, aggressive: 10 },
  },
  {
    id: "flexi_fd",
    name: "Flexi Fixed Deposits",
    category: "Flexible",
    riskLevel: "Low",
    minInvestment: 25000,
    expectedReturn: "6.5-7.25%",
    timeline: "Flexible",
    description:
      "Partial withdrawal facility with FD rates. Best of both savings and FD.",
    detailedDescription:
      "Flexi FDs combine benefits of savings account liquidity with FD returns. Auto-sweep facility available for excess funds.",
    howItWorks:
      "Maintains minimum balance in savings account. Excess funds automatically converted to FDs. Can withdraw partially as needed.",
    examples: ["HDFC Flexi FD", "ICICI FleX-Rate", "Axis Bank Flexi FD"],
    platforms: [
      "Major banks offering flexi products",
      "Online banking platforms",
    ],
    pros: [
      "Liquidity with FD returns",
      "Auto-sweep facility",
      "No penalty on withdrawal",
      "Convenient for regular needs",
    ],
    cons: [
      "Higher minimum balance",
      "Slightly lower returns",
      "Complex structure",
      "Limited bank options",
    ],
    whoShouldInvest: [
      "High-balance account holders",
      "Those needing liquidity with returns",
      "Business accounts",
    ],
    taxImplications:
      "Interest taxable as regular FD. TDS applicable as per rules.",
    exitStrategy:
      "High liquidity - withdraw as needed. Ideal for emergency funds.",
    marketRisks: ["Interest rate changes", "Minimum balance requirements"],
    allocation: { conservative: 30, moderate: 20, aggressive: 15 },
  },
  {
    id: "recurring_deposit",
    name: "Recurring Deposits",
    category: "Monthly SIP",
    riskLevel: "Low",
    minInvestment: 500,
    expectedReturn: "6.5-7.25%",
    timeline: "1-10 years",
    description:
      "Monthly investment with FD-like returns. Perfect for building discipline.",
    detailedDescription:
      "RDs allow systematic monthly investments with FD-like returns. Good for building investment discipline and achieving specific financial goals.",
    howItWorks:
      "Invest fixed amount monthly for chosen tenure. Bank compounds monthly investments at FD rates. Lump sum received at maturity.",
    examples: [
      "RDs at all banks",
      "Online RD facilities",
      "Mobile banking RDs",
    ],
    platforms: ["All banks", "Online banking", "Mobile apps", "Bank branches"],
    pros: [
      "Disciplined monthly saving",
      "FD-like returns",
      "Goal-based investing",
      "Flexible amounts",
    ],
    cons: [
      "Lower returns vs equity",
      "Missed installment penalties",
      "Interest rate risk",
      "Inflation impact",
    ],
    whoShouldInvest: [
      "Regular income earners",
      "Disciplined savers",
      "Goal-based investors",
      "Conservative SIP seekers",
    ],
    taxImplications:
      "Interest income taxable as per slab. TDS applicable on high interest amounts.",
    exitStrategy:
      "Premature closure with penalty. Better to complete full tenure for optimal returns.",
    marketRisks: [
      "Interest rate risk",
      "Inflation impact",
      "Penalty on missed payments",
    ],
    allocation: { conservative: 25, moderate: 15, aggressive: 5 },
  },
];

export function getInvestmentStrategies(
  userType: "personal" | "professional" | "grow-wealth" | "fd-options",
): InvestmentStrategy[] {
  switch (userType) {
    case "personal":
      return personalInvestmentStrategies;
    case "professional":
      return professionalInvestmentStrategies;
    case "grow-wealth":
      return growWealthStrategies;
    case "fd-options":
      return fdOptionsStrategies;
    default:
      return personalInvestmentStrategies;
  }
}

export function getStrategyById(id: string): InvestmentStrategy | undefined {
  const allStrategies = [
    ...personalInvestmentStrategies,
    ...professionalInvestmentStrategies,
    ...growWealthStrategies,
    ...fdOptionsStrategies,
  ];
  return allStrategies.find((strategy) => strategy.id === id);
}
