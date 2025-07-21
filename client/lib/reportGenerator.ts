export function generateDetailedInvestmentReport(
  selectedGoal: string,
  goalData: any,
  recommendations: any[]
) {
  const currentDate = new Date();
  const maturityDate = new Date(currentDate.getTime() + (goalData.timeline * 30 * 24 * 60 * 60 * 1000));
  const projectedMaturityAmount = goalData.calculations.projectedAmount;
  const totalInvestment = goalData.calculations.monthlySaving * goalData.timeline + goalData.currentInvestment;
  const expectedGains = projectedMaturityAmount - totalInvestment;
  const annualizedReturn = ((projectedMaturityAmount / totalInvestment) ** (12 / goalData.timeline) - 1) * 100;
  
  const reportContent = `
╔═══════════════════════════════════════════════════���══════════════════════════════════════════════════════════════╗
║                                  WEALLTH - INVESTMENT PLAN REPORT                                  ║
║                                    by Erfinden Technologies                                        ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

REPORT GENERATED ON: ${currentDate.toLocaleDateString('en-IN', { 
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
})}
TIME: ${currentDate.toLocaleTimeString('en-IN')}

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                        GOAL SUMMARY
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

Goal Name                    : ${selectedGoal}
Target Amount                : ₹${goalData.targetAmount.toLocaleString('en-IN')}
Investment Timeline          : ${goalData.timeline} months (${Math.round(goalData.timeline/12 * 10)/10} years)
Current Investment           : ₹${goalData.currentInvestment.toLocaleString('en-IN')}
Remaining Amount Needed      : ₹${goalData.calculations.remainingAmount.toLocaleString('en-IN')}
Monthly SIP Required         : ₹${goalData.calculations.monthlySaving.toLocaleString('en-IN')}
Goal Progress                : ${Math.round((goalData.currentInvestment / goalData.targetAmount) * 100)}%

══════════════════════════════════════════════════════════════════════════════════════════════════════════════════���═
                                    DETAILED CALCULATIONS
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

INVESTMENT BREAKDOWN:
• Current Investment          : ₹${goalData.currentInvestment.toLocaleString('en-IN')}
• Monthly SIP Amount          : ₹${goalData.calculations.monthlySaving.toLocaleString('en-IN')}
• Total SIP Duration          : ${goalData.timeline} months
• Total SIP Investment        : ₹${(goalData.calculations.monthlySaving * goalData.timeline).toLocaleString('en-IN')}
• Total Investment            : ₹${totalInvestment.toLocaleString('en-IN')}

PROJECTED RETURNS (Assuming 12% Annual Return):
• Expected Maturity Amount    : ₹${projectedMaturityAmount.toLocaleString('en-IN')}
• Expected Gains              : ₹${expectedGains.toLocaleString('en-IN')}
• Annualized Return           : ${annualizedReturn.toFixed(2)}%
• Effective Return Multiple   : ${(projectedMaturityAmount / totalInvestment).toFixed(2)}x
• Goal Achievement Date       : ${maturityDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}

MILESTONE TRACKING:
• 25% Goal Achievement        : Month ${Math.round(goalData.timeline * 0.25)}
• 50% Goal Achievement        : Month ${Math.round(goalData.timeline * 0.50)}
• 75% Goal Achievement        : Month ${Math.round(goalData.timeline * 0.75)}
• 100% Goal Achievement       : Month ${goalData.timeline}

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                  RECOMMENDED INVESTMENT STRATEGY
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

Based on your ${goalData.timeline}-month investment timeline, we recommend:

${recommendations.map((rec, index) => `
${index + 1}. ${rec.name.toUpperCase()}
   • Monthly Allocation       : ��${rec.amount.toLocaleString('en-IN')}
   • Risk Level              : ${rec.risk}
   • Strategy                : ${rec.description}
   • Percentage of Total SIP : ${Math.round((rec.amount / goalData.calculations.monthlySaving) * 100)}%`).join('\n')}

TOTAL MONTHLY ALLOCATION      : ₹${recommendations.reduce((sum, rec) => sum + rec.amount, 0).toLocaleString('en-IN')}

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                      RISK ASSESSMENT
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

${goalData.timeline <= 18 ? `SHORT-TERM INVESTMENT (≤18 months):
• Risk Level: MODERATE
• Recommended Asset Mix: 60% Debt, 40% Equity
• Volatility: Low to Medium
• Capital Protection: High Priority
• Liquidity: High` : 
goalData.timeline <= 36 ? `MEDIUM-TERM INVESTMENT (18-36 months):
• Risk Level: MODERATE TO HIGH
• Recommended Asset Mix: 50% Equity, 50% Debt
• Volatility: Medium
• Growth Potential: Good
• Liquidity: Medium` : 
`LONG-TERM INVESTMENT (>36 months):
• Risk Level: MODERATE TO HIGH
• Recommended Asset Mix: 70% Equity, 30% Debt
• Volatility: High (Short-term), Low (Long-term)
• Growth Potential: Excellent
• Wealth Creation Focus: Maximum`}

Key Risk Factors:
• Market Volatility Risk
• Interest Rate Risk
• Inflation Risk
• Liquidity Risk
• Credit Risk (for debt instruments)

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                     IMPLEMENTATION ROADMAP
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

PHASE 1 - IMMEDIATE ACTIONS (Month 1):
✓ Complete KYC for chosen investment platforms
✓ Set up automatic SIP mandates
✓ Begin monthly investments of ₹${goalData.calculations.monthlySaving.toLocaleString('en-IN')}
✓ Set up goal tracking mechanism

PHASE 2 - MONITORING (Months 1-6):
✓ Monitor portfolio performance monthly
✓ Review and rebalance if needed
✓ Track goal progress
✓ Adjust SIP amount if income changes

PHASE 3 - OPTIMIZATION (Every 6 months):
✓ Review investment performance
✓ Rebalance portfolio based on market conditions
✓ Increase SIP amount by 10-15% annually
✓ Reassess goal timeline and amount

PHASE 4 - GOAL ACHIEVEMENT:
✓ Monitor final months closely
✓ Plan for goal completion
✓ Decide on fund withdrawal strategy
✓ Set new financial goals

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                       TAX IMPLICATIONS
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

EQUITY MUTUAL FUNDS:
• Short Term Capital Gains (< 1 year): 15% tax
• Long Term Capital Gains (> 1 year): 10% tax on gains above ₹1,00,000 per year
• Dividend Income: Tax-free in hands of investor

DEBT MUTUAL FUNDS:
• Short Term Capital Gains (< 3 years): As per income tax slab
• Long Term Capital Gains (> 3 years): 20% with indexation benefit

TAX SAVING RECOMMENDATIONS:
• Consider ELSS funds for 80C deduction
• Plan withdrawal timing for tax optimization
• Use indexation benefits for long-term debt gains
• Maintain investment records for tax filing

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                     IMPORTANT DISCLAIMERS
════════��═══════════════════════════════════════════════════════════════════════════════════════════════════════════

⚠️  INVESTMENT RISKS:
• Mutual fund investments are subject to market risks
• Past performance is not indicative of future returns
• The value of investments may go up or down
• There is no guarantee of returns or capital protection
• Market volatility can significantly impact short-term returns

⚠️  ASSUMPTIONS USED:
• Expected annual return of 12% is illustrative and not guaranteed
• Calculations assume regular monthly investments without breaks
• Market conditions and fund performance may vary significantly
• Inflation impact on purchasing power not considered in projections

⚠️  REGULATORY INFORMATION:
• All recommended mutual funds are regulated by SEBI
• Investments through registered intermediaries only
• Complete scheme information available in offer documents
• Risk factors and charges detailed in scheme documents

⚠️  PROFESSIONAL ADVICE:
• This report is for educational and planning purposes only
• Not a substitute for professional financial advice
• Consult qualified financial advisors for personalized guidance
• Consider your risk tolerance and financial situation before investing

⚠️  MARKET CONDITIONS:
• Equity markets can be volatile and unpredictable
• Economic conditions affect investment performance
• Interest rate changes impact debt instrument returns
• Global events can influence domestic market performance

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                       IMPORTANT NOTES
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

• Review your investment strategy quarterly
• Increase SIP amounts with salary increments
• Don't panic during market volatility - stay invested
• Diversify across different fund categories and AMCs
• Keep emergency fund separate from goal-based investments
• Monitor expense ratios and fund performance regularly
• Consider systematic transfer plans (STP) for better averaging
• Plan for tax implications while making withdrawal decisions

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                                          CONTACT SUPPORT
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

For questions about this report or investment guidance:
Email: support@weallth.com
Website: www.weallth.com
Disclaimer: Weallth is a financial planning platform by Erfinden Technologies

This report was generated automatically based on your inputs. Please verify all calculations
and consult with qualified financial advisors before making investment decisions.

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                           © ${currentDate.getFullYear()} Weallth by Erfinden Technologies. All Rights Reserved.
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

Report ID: WLT-${Date.now()}
Generated: ${currentDate.toISOString()}
  `;

  const blob = new Blob([reportContent], { type: 'text/plain; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Weallth_Detailed_Investment_Plan_${selectedGoal.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
