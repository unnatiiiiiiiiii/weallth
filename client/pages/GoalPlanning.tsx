import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, TrendingUp, Target, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { calculateGoalRequirements } from "@/lib/calculations";
import { getUserProfile } from "@/lib/storage";

export default function GoalPlanning() {
  const navigate = useNavigate();
  const { goalId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [goalData, setGoalData] = useState({
    targetAmount: 0,
    timeline: 12,
    currentInvestment: 0
  });
  const [userData, setUserData] = useState({
    monthlySalary: 0,
    fixedExpenses: 0,
    variableExpenses: 0
  });
  const [selectedGoal, setSelectedGoal] = useState('');

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    // Get selected goal from localStorage or URL
    const goalFromStorage = localStorage.getItem('selectedGoal');
    const decodedGoal = goalId ? decodeURIComponent(goalId) : goalFromStorage;
    if (decodedGoal) {
      setSelectedGoal(decodedGoal);
    }

    // Load user profile data
    const profile = getUserProfile();
    if (profile) {
      setUserData({
        monthlySalary: profile.monthlySalary,
        fixedExpenses: profile.fixedExpenses,
        variableExpenses: profile.variableExpenses
      });
    }
  }, [navigate, goalId]);

  const calculations = calculateGoalRequirements(goalData, userData);
  const availableInvestment = userData.monthlySalary - userData.fixedExpenses - userData.variableExpenses;

  const handleSubmit = () => {
    if (goalData.targetAmount > 0) {
      // Store goal data and navigate to investment plan
      localStorage.setItem('goalData', JSON.stringify({
        ...goalData,
        selectedGoal,
        calculations
      }));
      navigate(`/investment-plan/${encodeURIComponent(selectedGoal)}`);
    }
  };

  const handleBack = () => {
    navigate("/goal-selection");
  };

  if (!user) {
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
                    step <= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && <div className={`w-8 h-0.5 ${step < 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Goal: {selectedGoal}</h2>
            <p className="text-gray-600">Let's calculate how much you need to save</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Goal Details Form */}
            <Card className="h-fit">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Goal Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="targetAmount" className="text-sm font-medium text-gray-700 mb-2 block">
                      Target Amount (₹)
                    </Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      value={goalData.targetAmount || ''}
                      onChange={(e) => setGoalData(prev => ({ ...prev, targetAmount: parseInt(e.target.value) || 0 }))}
                      placeholder="How much do you need?"
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeline" className="text-sm font-medium text-gray-700 mb-2 block">
                      Timeline (months)
                    </Label>
                    <Select 
                      value={goalData.timeline.toString()} 
                      onValueChange={(value) => setGoalData(prev => ({ ...prev, timeline: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">1 year</SelectItem>
                        <SelectItem value="18">1.5 years</SelectItem>
                        <SelectItem value="24">2 years</SelectItem>
                        <SelectItem value="36">3 years</SelectItem>
                        <SelectItem value="48">4 years</SelectItem>
                        <SelectItem value="60">5 years</SelectItem>
                        <SelectItem value="84">7 years</SelectItem>
                        <SelectItem value="120">10 years</SelectItem>
                        <SelectItem value="180">15 years</SelectItem>
                        <SelectItem value="240">20 years</SelectItem>
                        <SelectItem value="300">25 years</SelectItem>
                        <SelectItem value="360">30 years</SelectItem>
                        <SelectItem value="420">35 years</SelectItem>
                        <SelectItem value="480">40 years</SelectItem>
                        <SelectItem value="540">45 years</SelectItem>
                        <SelectItem value="600">50 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currentInvestment" className="text-sm font-medium text-gray-700 mb-2 block">
                      Current Investment (₹)
                    </Label>
                    <Input
                      id="currentInvestment"
                      type="number"
                      value={goalData.currentInvestment || ''}
                      onChange={(e) => setGoalData(prev => ({ ...prev, currentInvestment: parseInt(e.target.value) || 0 }))}
                      placeholder="Already invested amount"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculation Results */}
            <Card className="h-fit">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Calculation Results
                </h3>
                
                {goalData.targetAmount > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-600 mb-1">Monthly Saving Required</p>
                      <p className="text-2xl font-bold text-blue-900">
                        ₹{calculations.monthlySaving.toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Timeline</p>
                        <p className="font-semibold text-gray-900">{goalData.timeline} months</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Goal</p>
                        <p className="font-semibold text-gray-900">₹{goalData.targetAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Already Invested</p>
                        <p className="font-semibold text-green-600">₹{goalData.currentInvestment.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Remaining</p>
                        <p className="font-semibold text-orange-600">₹{calculations.remainingAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className={`rounded-lg p-4 ${
                      calculations.monthlySaving <= availableInvestment ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {calculations.monthlySaving <= availableInvestment ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                        <p className={`text-sm font-medium ${
                          calculations.monthlySaving <= availableInvestment ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {calculations.monthlySaving <= availableInvestment 
                            ? 'This goal is achievable with your current income'
                            : 'You may need to adjust your goal or timeline'
                          }
                        </p>
                      </div>
                      <p className="text-xs text-gray-600">
                        Available for investment: ₹{availableInvestment.toLocaleString()}/month
                      </p>
                    </div>

                    {userData.monthlySalary === 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                          <p className="text-sm font-medium text-yellow-700">
                            Update your profile with income details for better recommendations
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate("/dashboard")}
                          className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                        >
                          Update Profile
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your target amount to see calculations</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={goalData.targetAmount === 0}
              className="bg-wealth-blue hover:bg-wealth-blue/90 text-white flex items-center gap-2"
            >
              View Investment Plan
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
