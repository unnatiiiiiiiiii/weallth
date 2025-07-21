import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  TrendingUp,
  User,
  Briefcase,
  Target,
  Car,
  Home,
  Heart,
  Shield,
  Wrench,
  Smartphone,
  Umbrella,
  Lightbulb,
  Gift,
  GraduationCap,
  Calendar,
  Activity,
  Megaphone,
  Settings,
  Headphones,
  Monitor,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { getGoalsByType } from "@/lib/goalData";

const iconMap = {
  car: Car,
  home: Home,
  plane: Target, // Using Target as placeholder
  heart: Heart,
  shield: Shield,
  wrench: Wrench,
  smartphone: Smartphone,
  umbrella: Umbrella,
  lightbulb: Lightbulb,
  gift: Gift,
  "graduation-cap": GraduationCap,
  calendar: Calendar,
  activity: Activity,
  "trending-up": TrendingUp,
  megaphone: Megaphone,
  settings: Settings,
  headphones: Headphones,
  monitor: Monitor,
};

export default function GoalSelection() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [goalType, setGoalType] = useState<"personal" | "professional" | "">(
    "",
  );
  const [selectedGoal, setSelectedGoal] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleGoalTypeSelect = (type: "personal" | "professional") => {
    setGoalType(type);
    setCurrentStep(2);
  };

  const handleGoalSelect = (goalName: string) => {
    setSelectedGoal(goalName);
    // Store the selected goal and navigate to planning
    localStorage.setItem("selectedGoal", goalName);
    localStorage.setItem("goalType", goalType);
    navigate(`/goal-planning/${encodeURIComponent(goalName)}`);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/dashboard");
    } else {
      setCurrentStep(currentStep - 1);
    }
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

  const goals = goalType ? getGoalsByType(goalType) : [];

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
              <p className="text-sm text-wealth-gray">
                by Erfinden Technologies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="text-wealth-gray hover:text-gray-900"
            >
              Goal Dashboard
            </Button>

            {/* Step Progress */}
            <div className="hidden md:flex items-center gap-2">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 2 && (
                    <div
                      className={`w-8 h-0.5 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 ? (
            // Goal Type Selection
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Choose Your Goal Type
                </h2>
                <p className="text-gray-600">
                  Are you planning for personal or professional goals?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    goalType === "personal"
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => handleGoalTypeSelect("personal")}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Personal Goals
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Life milestones, purchases, and personal aspirations
                    </p>
                    <div className="text-sm text-gray-500">
                      Car, House, Vacation, Wedding, Education, etc.
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    goalType === "professional"
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => handleGoalTypeSelect("professional")}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Professional Goals
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Business expansion, equipment, and growth initiatives
                    </p>
                    <div className="text-sm text-gray-500">
                      Expansion, Marketing, Equipment, Production, etc.
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            // Specific Goal Selection
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Choose Your{" "}
                  {goalType === "personal" ? "Personal" : "Professional"} Goal
                </h2>
                <p className="text-gray-600">
                  Select the goal you want to plan for
                </p>
              </div>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                {goals.map((goal, index) => {
                  const IconComponent =
                    iconMap[goal.icon as keyof typeof iconMap] || Target;

                  return (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                        selectedGoal === goal.name
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-blue-300"
                      }`}
                      onClick={() => handleGoalSelect(goal.name)}
                    >
                      <CardContent className="p-4 text-center">
                        <div
                          className={`w-12 h-12 ${goal.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${goal.iconColor}`}
                          />
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">
                          {goal.name}
                        </h3>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
