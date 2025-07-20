import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, User, Building, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

interface GoalOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "personal" | "professional";
}

const personalGoals: GoalOption[] = [
  { id: "car", title: "Buy a Car", description: "", icon: "🚗", category: "personal" },
  { id: "house", title: "Buy a House", description: "", icon: "🏠", category: "personal" },
  { id: "vacation", title: "Go on a Vacation", description: "", icon: "✈️", category: "personal" },
  { id: "wedding", title: "Wedding Planning", description: "", icon: "💕", category: "personal" },
  { id: "emergency", title: "Emergency Fund", description: "", icon: "🚨", category: "personal" },
  { id: "renovate", title: "Furnish/Renovate Home", description: "", icon: "🔧", category: "personal" },
  { id: "gadget", title: "Gadget Purchase", description: "", icon: "📱", category: "personal" },
  { id: "rainy", title: "Rainy Day Fund", description: "", icon: "🌧️", category: "personal" },
  { id: "pet", title: "Pet or Adoption", description: "", icon: "🐕", category: "personal" },
  { id: "side-hustle", title: "Start a Side Hustle", description: "", icon: "💡", category: "personal" },
  { id: "event", title: "Big Event or Celebration", description: "", icon: "🎉", category: "personal" },
  { id: "education", title: "Child's Education or Marriage", description: "", icon: "🎓", category: "personal" },
  { id: "retirement", title: "Retirement Plans", description: "", icon: "📅", category: "personal" },
  { id: "healthcare", title: "Healthcare / Life Insurance", description: "", icon: "⚡", category: "personal" }
];

const professionalGoals: GoalOption[] = [
  { id: "expansion", title: "Expansion (New City / Scale)", description: "", icon: "📈", category: "professional" },
  { id: "marketing", title: "Marketing", description: "", icon: "📊", category: "professional" },
  { id: "production", title: "Production & Quality", description: "", icon: "⚙️", category: "professional" },
  { id: "customer-support", title: "Customer Support", description: "", icon: "🎧", category: "professional" },
  { id: "equipment", title: "Equipment & Upgrades", description: "", icon: "💻", category: "professional" }
];

export default function GoalSelection() {
  const [selectedType, setSelectedType] = useState<"personal" | "professional" | null>(null);
  const navigate = useNavigate();

  const handleTypeSelection = (type: "personal" | "professional") => {
    setSelectedType(type);
  };

  const handleGoalSelection = (goalId: string) => {
    navigate(`/goal-planning/${goalId}`);
  };

  const handleBack = () => {
    if (selectedType) {
      setSelectedType(null);
    } else {
      navigate("/dashboard");
    }
  };

  if (!selectedType) {
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Goal Type</h2>
            <p className="text-wealth-gray">Are you planning for personal or professional goals?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow bg-white border-0"
              onClick={() => handleTypeSelection("personal")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-wealth-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Goals</h3>
                <p className="text-wealth-gray mb-4">Life milestones, purchases, and personal aspirations</p>
                <p className="text-sm text-wealth-gray">Car, House, Vacation, Wedding, Education, etc.</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow bg-white border-0"
              onClick={() => handleTypeSelection("professional")}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-wealth-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Goals</h3>
                <p className="text-wealth-gray mb-4">Business expansion, equipment, and growth initiatives</p>
                <p className="text-sm text-wealth-gray">Expansion, Marketing, Equipment, Production, etc.</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center gap-2 border-wealth-gray-light text-wealth-gray hover:bg-wealth-gray-light"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const goals = selectedType === "personal" ? personalGoals : professionalGoals;
  const title = selectedType === "personal" ? "Choose Your Personal Goal" : "Choose Your Professional Goal";

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-wealth-gray">Select the goal you want to plan for</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {goals.map((goal) => (
            <Card 
              key={goal.id}
              className="cursor-pointer hover:shadow-lg transition-shadow bg-white border-0"
              onClick={() => handleGoalSelection(goal.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{goal.icon}</div>
                <h3 className="font-semibold text-gray-900">{goal.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2 border-wealth-gray-light text-wealth-gray hover:bg-wealth-gray-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </main>
    </div>
  );
}
