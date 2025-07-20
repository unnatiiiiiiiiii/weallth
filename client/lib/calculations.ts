interface GoalData {
  targetAmount: number;
  timeline: number;
  currentInvestment: number;
}

interface UserData {
  monthlySalary: number;
  fixedExpenses: number;
  variableExpenses: number;
}

export function calculateGoalRequirements(goalData: GoalData, userData?: UserData) {
  try {
    const { targetAmount, timeline, currentInvestment } = goalData;
    
    // Calculate remaining amount needed
    const remainingAmount = Math.max(targetAmount - currentInvestment, 0);
    
    // Simple monthly saving calculation (without considering investment returns)
    const monthlySaving = Math.round(remainingAmount / timeline);
    
    // Calculate with expected returns (assuming 12% annual return)
    const monthlyRate = 0.12 / 12; // Monthly interest rate
    const futureValueFactor = ((Math.pow(1 + monthlyRate, timeline) - 1) / monthlyRate);
    const sipAmount = Math.round(remainingAmount / futureValueFactor);
    
    // Calculate projected final amount
    const projectedAmount = currentInvestment * Math.pow(1.12, timeline / 12) + 
                           sipAmount * futureValueFactor;
    
    return {
      monthlySaving,
      sipAmount,
      remainingAmount,
      projectedAmount: Math.round(projectedAmount),
      monthsRemaining: timeline,
      progressPercentage: (currentInvestment / targetAmount) * 100
    };
  } catch (error) {
    console.error('Calculation error:', error);
    return {
      monthlySaving: 0,
      sipAmount: 0,
      remainingAmount: 0,
      projectedAmount: 0,
      monthsRemaining: 0,
      progressPercentage: 0
    };
  }
}
