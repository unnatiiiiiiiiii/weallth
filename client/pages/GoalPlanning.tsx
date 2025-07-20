import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const goalTitles = {
  "emergency": "Emergency Fund",
  "vacation": "Go on a Vacation", 
  "car": "Buy a Car",
  "house": "Buy a House",
  "wedding": "Wedding Planning",
  "renovate": "Furnish/Renovate Home",
  "gadget": "Gadget Purchase",
  "rainy": "Rainy Day Fund",
  "pet": "Pet or Adoption",
  "side-hustle": "Start a Side Hustle",
  "event": "Big Event or Celebration",
  "education": "Child's Education or Marriage",
  "retirement": "Retirement Plans",
  "healthcare": "Healthcare / Life Insurance",
  "expansion": "Expansion (New City / Scale)",
  "marketing": "Marketing",
  "production": "Production & Quality",
  "customer-support": "Customer Support",
  "equipment": "Equipment & Upgrades"
};

export default function GoalPlanning() {
  const { goalId } = useParams<{ goalId: string }>();
  const navigate = useNavigate();
  const [targetAmount, setTargetAmount] = useState("0100000");
  const [timeline, setTimeline] = useState("10 years");
  const [currentInvestment, setCurrentInvestment] = useState("0");
  const [calculation, setCalculation] = useState({
    monthlySaving: 833,
    timelineMonths: 120,
    totalGoal: 100000
  });

  const goalTitle = goalTitles[goalId as keyof typeof goalTitles] || "Unknown Goal";

  useEffect(() => {
    calculateGoal();
  }, [targetAmount, timeline, currentInvestment]);

  const calculateGoal = () => {
    const target = parseInt(targetAmount) || 0;
    const current = parseInt(currentInvestment) || 0;
    const remaining = target - current;
    
    let months = 120; // default 10 years
    if (timeline.includes("year")) {
      const years = parseInt(timeline);
      months = years * 12;
    } else if (timeline.includes("month")) {
      months = parseInt(timeline);
    }

    const monthlySaving = Math.ceil(remaining / months);

    setCalculation({
      monthlySaving,
      timelineMonths: months,
      totalGoal: target
    });
  };

  const handleViewInvestmentPlan = () => {
    navigate(`/investment-plan/${goalId}`, { 
      state: { 
        goalTitle, 
        targetAmount: parseInt(targetAmount),
        monthlySaving: calculation.monthlySaving 
      } 
    });
  };

  const handleBack = () => {
    navigate("/goal-selection");
  };

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
              <h1 className="text-xl font-semibold text-gray-900">Wealith</h1>
              <p className="text-sm text-wealth-gray">by Effusion Technologies</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-wealth-gray hover:text-gray-900">
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-medium">liza</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Goal: {goalTitle}</h2>
          <p className="text-wealth-gray">Let's calculate how much you need to save</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Goal Details Form */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Goal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="targetAmount" className="text-sm font-medium">Target Amount (₹)</Label>
                <Input
                  id="targetAmount"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="border-wealth-gray-light text-lg"
                  placeholder="100000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-sm font-medium">Timeline (months)</Label>
                <Select value={timeline} onValueChange={setTimeline}>
                  <SelectTrigger className="border-wealth-gray-light">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="1 year">1 year</SelectItem>
                    <SelectItem value="2 years">2 years</SelectItem>
                    <SelectItem value="3 years">3 years</SelectItem>
                    <SelectItem value="5 years">5 years</SelectItem>
                    <SelectItem value="10 years">10 years</SelectItem>
                    <SelectItem value="15 years">15 years</SelectItem>
                    <SelectItem value="20 years">20 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentInvestment" className="text-sm font-medium">Current Investment (₹)</Label>
                <Input
                  id="currentInvestment"
                  value={currentInvestment}
                  onChange={(e) => setCurrentInvestment(e.target.value)}
                  className="border-wealth-gray-light"
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Calculation Results */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-wealth-gray mb-1">Monthly Saving Required</p>
                <p className="text-3xl font-bold text-gray-900">₹{calculation.monthlySaving.toLocaleString()}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-wealth-gray">Timeline</p>
                  <p className="text-lg font-semibold text-gray-900">{calculation.timelineMonths} months</p>
                </div>

                <div>
                  <p className="text-sm text-wealth-gray">Total Goal</p>
                  <p className="text-lg font-semibold text-gray-900">₹{calculation.totalGoal.toLocaleString()}</p>
                </div>
              </div>

              {calculation.monthlySaving > 50000 && (
                <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-orange-800 font-medium">A: You may need to adjust your goal or timeline</p>
                    <p className="text-xs text-orange-600">Available for investment: ₹0/month</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2 border-wealth-gray-light text-wealth-gray hover:bg-wealth-gray-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button 
            onClick={handleViewInvestmentPlan}
            className="bg-wealth-blue hover:bg-wealth-blue/90 text-white px-8"
          >
            View Investment Plan
            <span className="ml-2">→</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
