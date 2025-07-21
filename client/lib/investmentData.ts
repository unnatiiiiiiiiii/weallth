interface InvestmentOption {
  id: string;
  name: string;
  category: string;
  riskLevel: string;
  minInvestment: number;
  expectedReturn: string;
  timeline: string;
  description: string;
  examples: string[];
  platforms: string[];
  pros: string[];
  cons: string[];
  allocation: {
    conservative: number;
    moderate: number;
    aggressive: number;
  };
}

export function getPersonalInvestmentOptions(): InvestmentOption[] {
  return [
    {
      id: "equity_sip",
      name: "Equity Mutual Fund SIP",
      category: "Mutual Funds",
      riskLevel: "High",
      minInvestment: 500,
      expectedReturn: "12-15%",
      timeline: "5+ years",
      description:
        "Systematic Investment Plan in diversified equity mutual funds",
      examples: [
        "Axis Bluechip Fund",
        "ICICI Pru Bluechip Fund",
        "SBI Large & Midcap Fund",
      ],
      platforms: ["Groww", "Zerodha Coin", "Paytm Money"],
      pros: ["High growth potential", "Professional management", "Liquidity"],
      cons: ["Market volatility", "No guaranteed returns"],
      allocation: { conservative: 20, moderate: 40, aggressive: 60 },
    },
    {
      id: "elss",
      name: "ELSS Tax Saver Funds",
      category: "Tax Saving",
      riskLevel: "Medium-High",
      minInvestment: 500,
      expectedReturn: "10-14%",
      timeline: "3+ years",
      description: "Equity Linked Savings Scheme with tax benefits under 80C",
      examples: ["Axis Long Term Equity Fund", "Mirae Asset Tax Saver Fund"],
      platforms: ["All major platforms"],
      pros: ["Tax deduction up to ₹1.5L", "Wealth creation", "Short lock-in"],
      cons: ["3-year lock-in", "Market risk"],
      allocation: { conservative: 15, moderate: 25, aggressive: 30 },
    },
    {
      id: "ppf",
      name: "Public Provident Fund",
      category: "Government Scheme",
      riskLevel: "Low",
      minInvestment: 500,
      expectedReturn: "7-8%",
      timeline: "15 years",
      description:
        "Government-backed long-term savings scheme with tax benefits",
      examples: ["Any bank or post office PPF account"],
      platforms: ["Banks", "Post Offices"],
      pros: ["Tax-free returns", "Government guarantee", "Compound growth"],
      cons: ["Long lock-in", "Lower returns", "Annual limit ₹1.5L"],
      allocation: { conservative: 30, moderate: 20, aggressive: 10 },
    },
    {
      id: "sgb",
      name: "Sovereign Gold Bonds",
      category: "Government Securities",
      riskLevel: "Medium",
      minInvestment: 1000,
      expectedReturn: "8-12%",
      timeline: "8 years",
      description:
        "Government-issued bonds backed by gold with additional interest",
      examples: ["SGB 2024 Series", "RBI Gold Bonds"],
      platforms: ["Banks", "Zerodha", "Groww"],
      pros: ["Gold exposure", "2.5% additional interest", "Tax benefits"],
      cons: ["8-year lock-in", "Gold price volatility"],
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
      description: "Ultra-short term debt funds for emergency corpus",
      examples: ["Axis Liquid Fund", "ICICI Pru Liquid Fund"],
      platforms: ["All platforms"],
      pros: ["High liquidity", "Better than savings", "Low risk"],
      cons: ["Lower returns", "Interest rate risk"],
      allocation: { conservative: 20, moderate: 15, aggressive: 10 },
    },
  ];
}

export function getProfessionalInvestmentOptions(): InvestmentOption[] {
  return [
    {
      id: "reits",
      name: "Real Estate Investment Trusts",
      category: "Real Estate",
      riskLevel: "Medium",
      minInvestment: 20000,
      expectedReturn: "8-12%",
      timeline: "3+ years",
      description: "Invest in commercial real estate through stock exchange",
      examples: ["Embassy Office Parks REIT", "Mindspace Business Parks REIT"],
      platforms: ["Zerodha", "Groww", "Angel One"],
      pros: [
        "Real estate exposure",
        "Regular dividends",
        "Professional management",
      ],
      cons: ["Interest rate sensitivity", "Limited options"],
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
      description: "Invest in early-stage startups through regulated platforms",
      examples: ["AngelList India", "LetsVenture", "Mumbai Angels"],
      platforms: ["AngelList", "LetsVenture"],
      pros: [
        "High return potential",
        "Portfolio diversification",
        "Startup exposure",
      ],
      cons: ["Very high risk", "Long lock-in", "High minimum investment"],
      allocation: { conservative: 0, moderate: 5, aggressive: 15 },
    },
    {
      id: "treasury_bills",
      name: "Treasury Bills & G-Secs",
      category: "Government Securities",
      riskLevel: "Very Low",
      minInvestment: 25000,
      expectedReturn: "6-7%",
      timeline: "91 days - 10 years",
      description: "Government-issued short to long-term securities",
      examples: ["91-day T-Bills", "10-year G-Sec"],
      platforms: ["RBI Retail Direct", "Zerodha", "Banks"],
      pros: ["Government guarantee", "Predictable returns", "Various tenures"],
      cons: ["Lower returns", "Interest rate risk for long-term"],
      allocation: { conservative: 40, moderate: 25, aggressive: 15 },
    },
    {
      id: "global_equity",
      name: "US Stocks & Global ETFs",
      category: "International Equity",
      riskLevel: "High",
      minInvestment: 1000,
      expectedReturn: "10-15%",
      timeline: "5+ years",
      description: "Invest in US stocks and global markets for diversification",
      examples: ["Apple", "Microsoft", "Nasdaq 100 ETF"],
      platforms: ["Vested", "INDmoney", "Groww US"],
      pros: [
        "Global diversification",
        "Currency hedge",
        "Access to global giants",
      ],
      cons: ["Currency risk", "Tax complexity", "Regulatory changes"],
      allocation: { conservative: 5, moderate: 15, aggressive: 25 },
    },
    {
      id: "nps",
      name: "National Pension System",
      category: "Retirement Planning",
      riskLevel: "Medium",
      minInvestment: 500,
      expectedReturn: "9-12%",
      timeline: "Till retirement",
      description: "Government-sponsored pension scheme with tax benefits",
      examples: ["NPS Tier I & II accounts"],
      platforms: ["Banks", "NPS Trust"],
      pros: ["Tax benefits", "Professional management", "Retirement corpus"],
      cons: ["Long lock-in", "Partial withdrawal restrictions"],
      allocation: { conservative: 25, moderate: 20, aggressive: 15 },
    },
  ];
}

interface RecommendationWithAllocation extends InvestmentOption {
  suggestedAllocation: number;
  suitabilityScore: number;
}

export function getRecommendationsBasedOnProfile(
  userType: "personal" | "professional",
  riskTolerance: "conservative" | "moderate" | "aggressive",
  monthlyIncome: number,
  age: number,
): RecommendationWithAllocation[] {
  const options =
    userType === "personal"
      ? getPersonalInvestmentOptions()
      : getProfessionalInvestmentOptions();
  const riskMap = {
    conservative: "Low",
    moderate: "Medium",
    aggressive: "High",
  };
  const userRisk = riskMap[riskTolerance];

  return options
    .filter((option) => {
      if (userRisk === "Low")
        return ["Low", "Medium"].includes(option.riskLevel);
      if (userRisk === "Medium")
        return ["Low", "Medium", "Medium-High"].includes(option.riskLevel);
      return true; // High risk tolerance accepts all
    })
    .map((option) => ({
      ...option,
      suggestedAllocation: Math.round(
        (monthlyIncome * option.allocation[riskTolerance]) / 100,
      ),
      suitabilityScore: calculateSuitabilityScore(
        option,
        riskTolerance,
        age,
        monthlyIncome,
      ),
    }))
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

function calculateSuitabilityScore(
  option: InvestmentOption,
  riskTolerance: "conservative" | "moderate" | "aggressive",
  age: number,
  income: number,
): number {
  let score = 50; // Base score

  // Age factor
  if (age < 30) {
    if (option.riskLevel === "High") score += 20;
    if (option.timeline.includes("5+")) score += 15;
  } else if (age > 45) {
    if (option.riskLevel === "Low") score += 15;
    if (option.category === "Government Scheme") score += 10;
  }

  // Income factor
  if (income > 100000) {
    if (option.minInvestment > 50000) score += 10;
  } else if (income < 50000) {
    if (option.minInvestment < 5000) score += 15;
  }

  // Risk alignment
  const riskAlignment = {
    conservative: { Low: 20, Medium: 10, High: -10 },
    moderate: { Low: 10, Medium: 20, High: 10 },
    aggressive: { Low: 5, Medium: 15, High: 20 },
  };

  score +=
    riskAlignment[riskTolerance][
      option.riskLevel as keyof typeof riskAlignment.conservative
    ] || 0;

  return Math.max(0, Math.min(100, score));
}

export function getInvestmentDetails(
  investmentId: string,
): InvestmentOption | undefined {
  const allOptions = [
    ...getPersonalInvestmentOptions(),
    ...getProfessionalInvestmentOptions(),
  ];
  return allOptions.find((option) => option.id === investmentId);
}
