export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentInvestment: number;
  timeline: number;
  monthlySaving: number;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'completed' | 'paused';
  userId: string;
  sipActive?: boolean;
  dateSet?: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber?: string;
  monthlySalary: number;
  fixedExpenses: number;
  variableExpenses: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentExperience: 'beginner' | 'intermediate' | 'advanced';
  notifications?: boolean;
  newsletter?: boolean;
}

export interface InvestmentOption {
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

export interface InvestmentRecommendation extends InvestmentOption {
  suggestedAllocation: number;
  suitabilityScore: number;
}

export interface GoalCalculations {
  monthlySaving: number;
  sipAmount: number;
  remainingAmount: number;
  projectedAmount: number;
  monthsRemaining: number;
  progressPercentage: number;
}

export interface GoalData {
  targetAmount: number;
  timeline: number;
  currentInvestment: number;
}

export interface Feedback {
  id: string;
  userId: string;
  username: string;
  type: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface BrokerConnection {
  brokerId: string;
  connectedAt: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  portfolio?: Portfolio;
}

export interface Portfolio {
  brokerId: string;
  holdings: Holding[];
  summary: PortfolioSummary;
  allocation: AssetAllocation;
}

export interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  investment: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  type: 'equity' | 'mutual_fund' | 'etf' | 'debt';
  broker?: string;
}

export interface PortfolioSummary {
  totalInvestment: number;
  totalCurrentValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  lastUpdated: string;
}

export interface AssetAllocation {
  equity?: number;
  mutualFunds?: number;
  etf?: number;
  debt?: number;
  others?: number;
}

export interface Broker {
  id: string;
  name: string;
  logo: string;
  apiEndpoint: string;
  features: string[];
}
