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
      const recs = getInvestmentRecommendations(parsed);
      setRecommendations(recs);
    }

    // Get user profile
    const profile = getUserProfile();
    if (profile) {
      setUserData(profile);
    }

    // Get goal from URL if available
    const decodedGoal = goalId ? decodeURIComponent(goalId) : '';
    if (decodedGoal && !selectedGoal) {
      setSelectedGoal(decodedGoal);
    }
  }, [navigate, goalId, selectedGoal]);

  const getInvestmentRecommendations = (data: any): InvestmentRecommendation[] => {
    const isShortTerm = data.timeline <= 18;
    const isLongTerm = data.timeline >= 36;
    const calculations = data.calculations || calculateGoalRequirements(data);
    
    if (isShortTerm) {
      return [
        {
          type: 'SIP',
          name: 'Balanced Mutual Fund SIP',
          amount: Math.round(calculations.monthlySaving * 0.8),
          description: 'Mid-risk balanced funds for steady growth',
          risk: 'Moderate',
          icon: 'trending-up'
        },
        {
          type: 'Emergency',
          name: 'Liquid Fund',
          amount: Math.round(calculations.monthlySaving * 0.2),
          description: 'Emergency support and liquidity buffer',
          risk: 'Low',
          icon: 'shield'
        }
      ];
    } else if (isLongTerm) {
      return [
        {
          type: 'SIP',
          name: 'Equity Mutual Fund SIP',
          amount: Math.round(calculations.monthlySaving * 0.7),
          description: 'High-growth equity funds for long-term wealth',
          risk: 'High',
          icon: 'trending-up'
        },
        {
          type: 'Diversification',
          name: 'Debt Fund Allocation',
          amount: Math.round(calculations.monthlySaving * 0.3),
          description: 'Stable debt instruments for risk balance',
          risk: 'Low',
          icon: 'pie-chart'
        }
      ];
    } else {
      return [
        {
          type: 'SIP',
          name: 'Hybrid Fund SIP',
          amount: Math.round(calculations.monthlySaving * 0.75),
          description: 'Balanced equity-debt mix for moderate growth',
          risk: 'Moderate',
          icon: 'trending-up'
        },
        {
          type: 'Fixed',
          name: 'Fixed Deposit',
          amount: Math.round(calculations.monthlySaving * 0.25),
          description: 'Guaranteed returns with capital protection',
          risk: 'Very Low',
          icon: 'lock'
        }
      ];
    }
  };

  const handleStartSIP = () => {
    setSipStarted(true);
    
    // Save the goal
    const newGoal = {
      name: selectedGoal,
      targetAmount: goalData.targetAmount,
      timeline: goalData.timeline,
      currentInvestment: goalData.currentInvestment,
      monthlySaving: goalData.calculations.monthlySaving,
      dateSet: new Date().toISOString(),
      sipActive: true
    };
    
    const savedGoal = saveGoal(newGoal);
    if (savedGoal) {
      setTimeout(() => {
        alert(`🎉 SIP of ₹${goalData.calculations.monthlySaving.toLocaleString()}/month started successfully for ${selectedGoal}! Redirecting to dashboard...`);
        navigate("/dashboard");
      }, 1000);
    }
  };

  const handleSetGoal = () => {
    const newGoal = {
      name: selectedGoal,
      targetAmount: goalData.targetAmount,
      timeline: goalData.timeline,
      currentInvestment: goalData.currentInvestment,
      monthlySaving: goalData.calculations.monthlySaving,
      dateSet: new Date().toISOString(),
      sipActive: false
    };
    
    const savedGoal = saveGoal(newGoal);
    if (savedGoal) {
      navigate("/dashboard");
    }
  };

  const handleDownloadReport = () => {
    generatePDFReport();
  };

  const generatePDFReport = () => {
    const reportContent = `
      Weallth - Investment Plan Report
      ==============================
      
      Goal: ${selectedGoal}
      Target Amount: ₹${goalData.targetAmount.toLocaleString()}
      Timeline: ${goalData.timeline} months
      Current Investment: ₹${goalData.currentInvestment.toLocaleString()}
      Monthly Saving Required: ₹${goalData.calculations.monthlySaving.toLocaleString()}
      
      Investment Strategy:
      ${recommendations.map(rec => `- ${rec.name}: ₹${rec.amount.toLocaleString()}/month (${rec.risk} Risk)`).join('\n')}
      
      Generated by Weallth - Erfinden Technologies
      Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Wealth_Plan_${selectedGoal.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

  const progress = (goalData.currentInvestment / goalData.targetAmount) * 100;

  return (
    <div className="min-h-screen bg-wealth-gray-bg">
      {/* Header */}
      <header className="bg-white border-b border-wealth-gray-light px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-wealth-blue rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Weallth</h1>
              <p className="text-sm text-wealth-gray">by Erfinden Technologies</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-wealth-gray hover:text-gray-900">
              Goal Dashboard
            </Button>
            
            {/* Step Progress */}
            <div className="hidden md:flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && <div className={`w-8 h-0.5 ${step < 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Investment Plan</h2>
            <p className="text-gray-600">Personalized recommendations for {selectedGoal}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Goal Summary */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedGoal}</h3>
                      <p className="text-gray-600">Target: ₹{goalData.targetAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Monthly Saving</p>
                      <p className="text-xl font-bold text-green-600">₹{goalData.calculations.monthlySaving.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600">Target</p>
                      <p className="font-bold text-gray-900">₹{goalData.targetAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600">Invested</p>
                      <p className="font-bold text-green-600">₹{goalData.currentInvestment.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-xs text-orange-600">Remaining</p>
                      <p className="font-bold text-orange-600">₹{goalData.calculations.remainingAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-purple-600">Timeline</p>
                      <p className="font-bold text-purple-600">{goalData.timeline} months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Investment Recommendations */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Investment Strategy</h3>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900">{rec.name}</h4>
                              <span className="text-sm font-semibold text-green-600">
                                ₹{rec.amount.toLocaleString()}/month
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                            <div className="flex justify-between items-center">
                              <span className={`text-xs px-2 py-1 rounded ${
                                rec.risk === 'High' ? 'bg-red-100 text-red-700' :
                                rec.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {rec.risk} Risk
                              </span>
                              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                Learn More
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Take Action
                  </h3>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleStartSIP} 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transform hover:scale-105 transition-all duration-300"
                      disabled={sipStarted}
                    >
                      {sipStarted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          SIP Started!
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start SIP Now
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      onClick={() => setShowTimelineAdjuster(true)} 
                      variant="outline"
                      className="w-full"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Adjust Timeline
                    </Button>
                    
                    <Button 
                      onClick={handleSetGoal} 
                      variant="outline"
                      className="w-full"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Save Goal Only
                    </Button>
                    
                    <Button 
                      onClick={handleDownloadReport} 
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    Investment Tips
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-gray-600">Start your SIP on the 1st of every month for better tracking</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-gray-600">Review and rebalance your portfolio quarterly</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-gray-600">Increase SIP amount by 10-15% annually as income grows</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8">
            <Button onClick={() => navigate(`/goal-planning/${encodeURIComponent(selectedGoal)}`)} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Planning
            </Button>
          </div>
        </div>
      </main>

      {/* Timeline Adjuster Modal */}
      <Dialog open={showTimelineAdjuster} onOpenChange={setShowTimelineAdjuster}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Adjust Your Goal</DialogTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowTimelineAdjuster(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Amount (₹)
              </label>
              <input
                type="number"
                value={adjustedAmount}
                onChange={(e) => setAdjustedAmount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeline: {adjustedTimeline} months
              </label>
              <input
                type="range"
                min="6"
                max="600"
                value={adjustedTimeline}
                onChange={(e) => setAdjustedTimeline(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>6 months</span>
                <span>50 years</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">New Monthly Saving Required</p>
              <p className="text-xl font-bold text-blue-900">
                ₹{Math.round((adjustedAmount - goalData.currentInvestment) / adjustedTimeline).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button onClick={() => setShowTimelineAdjuster(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAdjustTimeline} className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white">
              Update Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
