import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, TrendingUp, User, DollarSign, Target, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { saveUserProfile, getUserProfile } from "@/lib/storage";

interface OnboardingData {
  userType: 'personal' | 'professional';
  fullName: string;
  age: number;
  occupation: string;
  monthlySalary: number;
  fixedExpenses: number;
  variableExpenses: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentExperience: 'beginner' | 'intermediate' | 'advanced';
  primaryGoals: string[];
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<any>(null);
    const [data, setData] = useState<OnboardingData>({
    userType: 'personal',
    fullName: '',
    age: 25,
    occupation: '',
    monthlySalary: 0,
    fixedExpenses: 0,
    variableExpenses: 0,
    riskTolerance: 'moderate',
    investmentExperience: 'beginner',
    primaryGoals: []
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    setData(prev => ({ ...prev, fullName: currentUser.username }));

    // Check if user has already completed onboarding
    const existingProfile = getUserProfile();
    if (existingProfile && existingProfile.monthlySalary > 0) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    const profileData = {
      fullName: data.fullName,
      email: user.email,
      phoneNumber: '',
      monthlySalary: data.monthlySalary,
      fixedExpenses: data.fixedExpenses,
      variableExpenses: data.variableExpenses,
      riskTolerance: data.riskTolerance,
      investmentExperience: data.investmentExperience,
      notifications: true,
      newsletter: false,
      age: data.age,
      occupation: data.occupation,
      primaryGoals: data.primaryGoals
    };

    const success = saveUserProfile(profileData);
    if (success) {
      navigate("/dashboard");
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.fullName.trim() && data.age >= 18 && data.occupation.trim();
      case 2:
        return data.monthlySalary > 0;
      case 3:
        return true; // Risk tolerance and experience always have defaults
      case 4:
        return data.primaryGoals.length > 0;
      default:
        return false;
    }
  };

  const availableForInvestment = data.monthlySalary - data.fixedExpenses - data.variableExpenses;

  const toggleGoal = (goal: string) => {
    setData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : [...prev.primaryGoals, goal]
    }));
  };

  const personalGoals = [
    'Buy a Car', 'Buy a House', 'Go on Vacation', 'Emergency Fund',
    'Wedding Planning', 'Child Education', 'Retirement', 'Healthcare'
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-wealth-blue rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Weallth</h1>
              <p className="text-sm text-gray-600">Complete your profile</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="w-32">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {currentStep === 1 && <User className="w-8 h-8 text-white" />}
              {currentStep === 2 && <DollarSign className="w-8 h-8 text-white" />}
              {currentStep === 3 && <Target className="w-8 h-8 text-white" />}
              {currentStep === 4 && <CheckCircle className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Your financial information"}
              {currentStep === 3 && "Investment preferences"}
              {currentStep === 4 && "Your primary goals"}
            </h2>
            <p className="text-gray-600">
              {currentStep === 1 && "Let's start with some basic information"}
              {currentStep === 2 && "Help us understand your financial situation"}
              {currentStep === 3 && "What's your investment style?"}
              {currentStep === 4 && "What are you planning to achieve?"}
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={data.fullName}
                      onChange={(e) => setData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age" className="text-sm font-medium text-gray-700 mb-2 block">
                        Age
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={data.age}
                        onChange={(e) => setData(prev => ({ ...prev, age: parseInt(e.target.value) || 25 }))}
                        min="18"
                        max="100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="occupation" className="text-sm font-medium text-gray-700 mb-2 block">
                        Occupation
                      </Label>
                      <Input
                        id="occupation"
                        value={data.occupation}
                        onChange={(e) => setData(prev => ({ ...prev, occupation: e.target.value }))}
                        placeholder="Your profession"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Financial Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="monthlySalary" className="text-sm font-medium text-gray-700 mb-2 block">
                      Monthly Salary (₹)
                    </Label>
                    <Input
                      id="monthlySalary"
                      type="number"
                      value={data.monthlySalary || ''}
                      onChange={(e) => setData(prev => ({ ...prev, monthlySalary: parseInt(e.target.value) || 0 }))}
                      placeholder="Your monthly income"
                      className="text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fixedExpenses" className="text-sm font-medium text-gray-700 mb-2 block">
                        Fixed Monthly Expenses (₹)
                      </Label>
                      <Input
                        id="fixedExpenses"
                        type="number"
                        value={data.fixedExpenses || ''}
                        onChange={(e) => setData(prev => ({ ...prev, fixedExpenses: parseInt(e.target.value) || 0 }))}
                        placeholder="Rent, EMIs, etc."
                      />
                      <p className="text-xs text-gray-500 mt-1">Rent, loan EMIs, insurance premiums</p>
                    </div>
                    <div>
                      <Label htmlFor="variableExpenses" className="text-sm font-medium text-gray-700 mb-2 block">
                        Variable Monthly Expenses (₹)
                      </Label>
                      <Input
                        id="variableExpenses"
                        type="number"
                        value={data.variableExpenses || ''}
                        onChange={(e) => setData(prev => ({ ...prev, variableExpenses: parseInt(e.target.value) || 0 }))}
                        placeholder="Food, entertainment, etc."
                      />
                      <p className="text-xs text-gray-500 mt-1">Food, shopping, entertainment</p>
                    </div>
                  </div>

                  {data.monthlySalary > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Your Financial Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-blue-600">Available for Investment</p>
                          <p className="font-semibold text-blue-900 text-lg">
                            ₹{availableForInvestment.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-600">Savings Rate</p>
                          <p className="font-semibold text-blue-900 text-lg">
                            {Math.round((availableForInvestment / data.monthlySalary) * 100)}%
                          </p>
                        </div>
                      </div>
                      {availableForInvestment < 0 && (
                        <p className="text-red-600 text-sm mt-2">
                          ⚠️ Your expenses exceed your income. Consider reviewing your budget.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Investment Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Risk Tolerance
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['conservative', 'moderate', 'aggressive'] as const).map((risk) => (
                        <div
                          key={risk}
                          onClick={() => setData(prev => ({ ...prev, riskTolerance: risk }))}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            data.riskTolerance === risk
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h4 className="font-medium text-gray-900 capitalize">{risk}</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {risk === 'conservative' && 'Prefer stable, low-risk investments'}
                            {risk === 'moderate' && 'Balanced approach with moderate risk'}
                            {risk === 'aggressive' && 'High risk for high returns'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-sm font-medium text-gray-700 mb-2 block">
                      Investment Experience
                    </Label>
                    <Select 
                      value={data.investmentExperience} 
                      onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => 
                        setData(prev => ({ ...prev, investmentExperience: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner - New to investing</SelectItem>
                        <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                        <SelectItem value="advanced">Advanced - Experienced investor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 4: Primary Goals */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Select your primary financial goals (choose multiple)
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {personalGoals.map((goal) => (
                        <div
                          key={goal}
                          onClick={() => toggleGoal(goal)}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            data.primaryGoals.includes(goal)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{goal}</span>
                            {data.primaryGoals.includes(goal) && (
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button 
                  onClick={handleBack} 
                  variant="outline" 
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-wealth-blue hover:bg-wealth-blue/90 text-white flex items-center gap-2"
                >
                  {currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
