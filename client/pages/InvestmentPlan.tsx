import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, TrendingUp, Play, Calendar, Download, Target, Zap, CheckCircle, Info, ExternalLink, Check, Minus, X, PieChart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { saveGoal, getUserProfile } from "@/lib/storage";
import { calculateGoalRequirements } from "@/lib/calculations";
import { generateDetailedInvestmentReport } from "@/lib/reportGenerator";

interface InvestmentRecommendation {
  type: string;
  name: string;
  amount: number;
  description: string;
  risk: string;
  icon: string;
}

export default function InvestmentPlan() {
  const navigate = useNavigate();
  const { goalId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [goalData, setGoalData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<InvestmentRecommendation[]>([]);
  const [showTimelineAdjuster, setShowTimelineAdjuster] = useState(false);
  const [sipStarted, setSipStarted] = useState(false);
  const [adjustedTimeline, setAdjustedTimeline] = useState(12);
  const [adjustedAmount, setAdjustedAmount] = useState(0);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    // Get goal data from localStorage
    const storedGoalData = localStorage.getItem('goalData');
    if (storedGoalData) {
      const parsed = JSON.parse(storedGoalData);
      setGoalData(parsed);
      setSelectedGoal(parsed.selectedGoal);
      setAdjustedTimeline(parsed.timeline);
      setAdjustedAmount(parsed.targetAmount);
      
      // Generate recommendations based on timeline
      if (parsed.timeline <= 12) {
        // Short term
        setRecommendations([
          {
            type: 'Fixed',
            name: 'Liquid Funds',
            amount: Math.round(parsed.calculations.monthlySaving * 0.4),
            description: 'High liquidity with stable returns',
            risk: 'Low',
            icon: '💧'
          },
          {
            type: 'Fixed',
            name: 'FD/RD',
            amount: Math.round(parsed.calculations.monthlySaving * 0.6),
            description: 'Guaranteed returns with capital protection',
            risk: 'Low',
            icon: '🏛️'
          }
        ]);
      } else if (parsed.timeline <= 36) {
        // Medium term
        setRecommendations([
          {
            type: 'Balanced',
            name: 'Hybrid Funds',
            amount: Math.round(parsed.calculations.monthlySaving * 0.5),
            description: 'Balanced mix of equity and debt',
            risk: 'Moderate',
            icon: '⚖️'
          },
          {
            type: 'Fixed',
            name: 'Debt Funds',
            amount: Math.round(parsed.calculations.monthlySaving * 0.3),
            description: 'Stable returns from bonds',
            risk: 'Low',
            icon: '📋'
          },
          {
            type: 'Equity',
            name: 'Large Cap Funds',
            amount: Math.round(parsed.calculations.monthlySaving * 0.2),
            description: 'Growth potential with stability',
            risk: 'Moderate',
            icon: '📊'
          }
        ]);
      } else {
        // Long term
        setRecommendations([
          {
            type: 'Equity',
            name: 'Equity SIP',
            amount: Math.round(parsed.calculations.monthlySaving * 0.6),
            description: 'High growth potential for long term',
            risk: 'High',
            icon: '🚀'
          },
          {
            type: 'Tax Saving',
            name: 'ELSS Funds',
            amount: Math.round(parsed.calculations.monthlySaving * 0.3),
            description: 'Tax benefits with equity exposure',
            risk: 'High',
            icon: '💰'
          },
          {
            type: 'Balanced',
            name: 'Index Funds',
            amount: Math.round(parsed.calculations.monthlySaving * 0.1),
            description: 'Low cost market tracking',
            risk: 'Moderate',
            icon: '📈'
          }
        ]);
      }
    }

    // Get user profile
    const profile = getUserProfile();
    if (profile) {
      setUserData(profile);
    }
  }, [navigate]);

  const handleStartSIP = () => {
    if (goalData) {
      const result = saveGoal({
        name: selectedGoal,
        targetAmount: goalData.targetAmount,
        timeline: goalData.timeline,
        currentInvestment: goalData.currentInvestment,
        monthlySaving: goalData.calculations.monthlySaving
      });

      if (result) {
        setSipStarted(true);
        alert('SIP started successfully! Your goal has been saved.');
      } else {
        alert('Failed to start SIP. Please try again.');
      }
    }
  };

  const handleDownloadReport = () => {
    generatePDFReport();
  };

  const generatePDFReport = () => {
    generateDetailedInvestmentReport(selectedGoal, goalData, recommendations);
  };

  const handleAdjustTimeline = () => {
    const newMonthlySaving = Math.round((adjustedAmount - goalData.currentInvestment) / adjustedTimeline);
    alert(`Goal adjusted! New monthly saving: ₹${newMonthlySaving.toLocaleString()}`);
    setShowTimelineAdjuster(false);
  };

  if (!user || !goalData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-wealth-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Loading...</h1>
        </div>
      </div>
    );
  }

  const progress = goalData.currentInvestment / goalData.targetAmount * 100;
  const remaining = goalData.targetAmount - goalData.currentInvestment;

  return (
    <div className="min-h-screen bg-wealth-gray-bg">
      {/* Header */}
      <header className="bg-white border-b border-wealth-gray-light px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
                        <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-wealth-gray hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            
            <div className="w-8 h-8 bg-wealth-blue rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Investment Plan</h1>
              <p className="text-sm text-wealth-gray">{selectedGoal}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleDownloadReport}
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            <Button
              onClick={() => setShowTimelineAdjuster(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Adjust Timeline
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Goal Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-wealth-blue rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedGoal}</h2>
                      <p className="text-wealth-gray">Your financial goal breakdown</p>
                    </div>
                  </div>
                  
                  {sipStarted && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">SIP Active</span>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-wealth-gray text-sm mb-1">Target Amount</p>
                    <p className="text-2xl font-bold text-wealth-blue">₹{goalData.targetAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-wealth-gray text-sm mb-1">Current Progress</p>
                    <p className="text-2xl font-bold text-wealth-green">₹{goalData.currentInvestment.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-wealth-gray text-sm mb-1">Remaining</p>
                    <p className="text-2xl font-bold text-gray-700">₹{remaining.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-wealth-gray">Progress to Goal</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Investment Strategy */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Recommended Investment Strategy</h3>
                    <p className="text-wealth-gray">Tailored for your {goalData.timeline} month timeline</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{rec.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-900">{rec.name}</h4>
                          <p className="text-sm text-wealth-gray">{rec.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{rec.amount.toLocaleString()}/month</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rec.risk === 'Low' ? 'bg-green-100 text-green-800' :
                          rec.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {rec.risk} Risk
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Investment</h3>
                  <p className="text-3xl font-bold text-wealth-green mb-1">₹{goalData.calculations.monthlySaving.toLocaleString()}</p>
                  <p className="text-sm text-wealth-gray">for {goalData.timeline} months</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-wealth-gray">Expected Returns</span>
                    <span className="font-medium">12% annually</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-wealth-gray">Total Investment</span>
                    <span className="font-medium">₹{(goalData.calculations.monthlySaving * goalData.timeline + goalData.currentInvestment).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-wealth-gray">Wealth Gain</span>
                    <span className="font-medium text-wealth-green">₹{(goalData.targetAmount - (goalData.calculations.monthlySaving * goalData.timeline + goalData.currentInvestment)).toLocaleString()}</span>
                  </div>
                </div>

                {!sipStarted ? (
                  <Button 
                    onClick={handleStartSIP}
                    className="w-full bg-wealth-blue hover:bg-wealth-blue/90 text-white py-3 flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <Play className="w-5 h-5" />
                    Start SIP Journey
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">SIP Started Successfully!</span>
                    </div>
                    <Button
                      onClick={() => navigate('/dashboard')}
                      className="w-full bg-wealth-blue hover:bg-wealth-blue/90 text-white"
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Investment Tips</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Start early to benefit from compounding</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Diversify across different asset classes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Review and rebalance periodically</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Stay invested during market volatility</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Timeline Adjuster Modal */}
      <Dialog open={showTimelineAdjuster} onOpenChange={setShowTimelineAdjuster}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adjust Goal Timeline</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Timeline (months)</label>
              <input
                type="number"
                min="6"
                max="360"
                value={adjustedTimeline}
                onChange={(e) => setAdjustedTimeline(parseInt(e.target.value) || 12)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Target Amount (₹)</label>
              <input
                type="number"
                min="10000"
                value={adjustedAmount}
                onChange={(e) => setAdjustedAmount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {adjustedTimeline > 0 && adjustedAmount > 0 && (
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  New monthly saving: <span className="font-semibold">₹{Math.round((adjustedAmount - goalData.currentInvestment) / adjustedTimeline).toLocaleString()}</span>
                </p>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowTimelineAdjuster(false)}>
              Cancel
            </Button>
            <Button className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white" onClick={handleAdjustTimeline}>
              Update Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
