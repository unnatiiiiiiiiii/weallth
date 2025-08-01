import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Target,
  DollarSign,
  User,
  Settings,
  MessageSquare,
  LogOut,
  Plus,
  MoreVertical,
  X,
  Edit3,
  PieChart,
  BookOpen,
  Lightbulb,
  Calculator,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import Footer from "@/components/Footer";
import {
  getGoals,
  updateGoal,
  deleteGoal,
  saveFeedback,
  getUserProfile,
  saveUserProfile,
  saveInvestment,
  getInvestments,
} from "@/lib/storage";
import {
  getInvestmentStrategies,
  type InvestmentStrategy,
} from "@/lib/investmentStrategies";
import { getRiskLevelColor } from "@/lib/utils";
import InvestmentStrategyModal from "@/components/InvestmentStrategyModal";
import InvestmentFormModal, {
  type InvestmentFormData,
} from "@/components/InvestmentFormModal";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentInvestment: number;
  timeline: number;
  monthlySaving: number;
  createdAt: string;
  status: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [selectedStrategy, setSelectedStrategy] =
    useState<InvestmentStrategy | null>(null);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [isInvestmentFormOpen, setIsInvestmentFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isPortfolioTrackerOpen, setIsPortfolioTrackerOpen] = useState(false);
  const [isSmartSuggestionsOpen, setIsSmartSuggestionsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [queryResponse, setQueryResponse] = useState("");
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [investments, setInvestments] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: "",
    monthlySalary: 0,
    fixedExpenses: 0,
    variableExpenses: 0,
  });
  const [feedbackData, setFeedbackData] = useState({
    type: "feedback",
    subject: "",
    message: "",
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const personalStrategies = getInvestmentStrategies("personal");
  const professionalStrategies = getInvestmentStrategies("professional");
  const growWealthStrategies = getInvestmentStrategies("grow-wealth");
  const fdOptionsStrategies = getInvestmentStrategies("fd-options");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    // Load user goals
    const userGoals = getGoals();
    setGoals(userGoals);

    // Load user investments
    const userInvestments = getInvestments();
    setInvestments(userInvestments);

    // Load user profile
    const profile = getUserProfile();
    if (profile) {
      setUserProfile({
        fullName: profile.fullName || currentUser.username,
        email: profile.email || currentUser.email,
        monthlySalary: profile.monthlySalary || 0,
        fixedExpenses: profile.fixedExpenses || 0,
        variableExpenses: profile.variableExpenses || 0,
      });
    } else {
      setUserProfile((prev) => ({
        ...prev,
        fullName: currentUser.username,
        email: currentUser.email || "",
      }));
    }
  }, [navigate]);

  const handleSaveProfile = () => {
    const profileData = {
      fullName: userProfile.fullName,
      email: userProfile.email,
      phoneNumber: "",
      monthlySalary: userProfile.monthlySalary,
      fixedExpenses: userProfile.fixedExpenses,
      variableExpenses: userProfile.variableExpenses,
      riskTolerance: "moderate" as const,
      investmentExperience: "beginner" as const,
      notifications: true,
      newsletter: false,
    };

    const success = saveUserProfile(profileData);
    if (success) {
      setIsProfileOpen(false);
    }
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const result = saveFeedback(feedbackData);
    if (result) {
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setIsFeedbackOpen(false);
        setFeedbackSubmitted(false);
        setFeedbackData({ type: "feedback", subject: "", message: "" });
      }, 2000);
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
  };

  const handleSaveGoal = () => {
    if (editingGoal) {
      const success = updateGoal(editingGoal.id, editingGoal);
      if (success) {
        setGoals((prev) =>
          prev.map((goal) => (goal.id === editingGoal.id ? editingGoal : goal)),
        );
        setEditingGoal(null);
      }
    }
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm("Are you sure you want to delete this goal?")) {
      const success = deleteGoal(goalId);
      if (success) {
        setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
      }
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleStrategyClick = (strategy: InvestmentStrategy) => {
    setSelectedStrategy(strategy);
    setIsStrategyModalOpen(true);
  };

  const handleInvestClick = (strategy: InvestmentStrategy) => {
    console.log("Investment clicked for strategy:", strategy.name);
    setSelectedStrategy(strategy);
    setIsStrategyModalOpen(false);
    setIsInvestmentFormOpen(true);
  };

  const generatePersonalizedResponse = (
    query: string,
    profile: any,
    goals: Goal[],
    investments: any[],
    availableAmount: number,
  ) => {
    const lowerQuery = query.toLowerCase();

    // Analyze user's current situation
    const hasEmergencyFund = availableAmount > profile.monthlySalary * 6;
    const isHighEarner = profile.monthlySalary > 100000;
    const isYoungInvestor = true; // Could be based on age from profile
    const hasActiveGoals = goals.length > 0;
    const hasInvestments = investments.length > 0;

    let response = "";

    if (
      lowerQuery.includes("best investment") ||
      lowerQuery.includes("investment option")
    ) {
      response = `Based on your profile:\n\n`;
      response += `Monthly Salary: ₹${profile.monthlySalary.toLocaleString()}\n`;
      response += `Available for Investment: ₹${availableAmount.toLocaleString()}\n\n`;

      if (availableAmount > 20000) {
        response += `🎯 RECOMMENDED STRATEGY:\n`;
        response += `• 60% Equity Mutual Fund SIPs (₹${Math.round(availableAmount * 0.6).toLocaleString()}/month)\n`;
        response += `• 20% Debt Funds (₹${Math.round(availableAmount * 0.2).toLocaleString()}/month)\n`;
        response += `• 20% Tax-saving ELSS (₹${Math.round(availableAmount * 0.2).toLocaleString()}/month)\n\n`;
        response += `This balanced approach gives you growth potential with risk management.`;
      } else if (availableAmount > 10000) {
        response += `💡 MODERATE APPROACH:\n`;
        response += `• Start with Large-cap Equity SIP: ₹5,000/month\n`;
        response += `• ELSS for tax saving: ₹3,000/month\n`;
        response += `• Liquid fund for emergency: ₹${(availableAmount - 8000).toLocaleString()}/month\n\n`;
        response += `Focus on building a diversified portfolio gradually.`;
      } else {
        response += `🚀 BEGINNER STRATEGY:\n`;
        response += `• Emergency Fund: Build 6 months expenses first\n`;
        response += `• Start SIP: ₹2,000/month in index funds\n`;
        response += `• Increase gradually as income grows\n\n`;
        response += `Take time to learn before investing larger amounts.`;
      }
    } else if (
      lowerQuery.includes("monthly") &&
      (lowerQuery.includes("invest") || lowerQuery.includes("amount"))
    ) {
      const suggestedAmount = Math.min(availableAmount * 0.8, 50000);
      response = `💰 MONTHLY INVESTMENT RECOMMENDATION:\n\n`;
      response += `Based on your available amount of ₹${availableAmount.toLocaleString()}, I suggest:\n\n`;
      response += `• Target Investment: ₹${suggestedAmount.toLocaleString()}/month (${Math.round((suggestedAmount / profile.monthlySalary) * 100)}% of salary)\n`;
      response += `• Keep ₹${(availableAmount - suggestedAmount).toLocaleString()} for unexpected expenses\n\n`;
      response += `ALLOCATION BREAKDOWN:\n`;
      response += `• Equity SIPs: 70% (₹${Math.round(suggestedAmount * 0.7).toLocaleString()})\n`;
      response += `• Debt/Gold: 20% (₹${Math.round(suggestedAmount * 0.2).toLocaleString()})\n`;
      response += `• Tax-saving: 10% (₹${Math.round(suggestedAmount * 0.1).toLocaleString()})\n\n`;
      response += `Start small and increase by 10-15% annually with salary hikes.`;
    } else if (
      lowerQuery.includes("emergency fund") ||
      lowerQuery.includes("emergency")
    ) {
      const emergencyAmount = profile.monthlySalary * 6;
      response = `🚨 EMERGENCY FUND STRATEGY:\n\n`;
      response += `Target Emergency Fund: ₹${emergencyAmount.toLocaleString()} (6 months expenses)\n\n`;

      if (hasEmergencyFund) {
        response += `✅ Great! You seem to have good financial cushion.\n`;
        response += `• Maintain emergency fund in liquid funds\n`;
        response += `• Focus remaining amount on growth investments\n`;
        response += `• Consider equity SIPs for wealth creation`;
      } else {
        response += `⚡ PRIORITY: Build emergency fund first!\n\n`;
        response += `STRATEGY:\n`;
        response += `• Emergency Fund: ₹${Math.min(availableAmount * 0.6, emergencyAmount).toLocaleString()}/month\n`;
        response += `• Start small SIP: ₹${Math.max(availableAmount * 0.4, 1000).toLocaleString()}/month\n\n`;
        response += `Build emergency fund in 6-12 months, then increase investments.`;
      }
    } else if (lowerQuery.includes("tax") || lowerQuery.includes("80c")) {
      response = `📊 TAX OPTIMIZATION STRATEGY:\n\n`;
      response += `Based on your ₹${profile.monthlySalary.toLocaleString()} monthly salary:\n\n`;
      response += `80C INVESTMENTS (Up to ₹1.5L annually):\n`;
      response += `• ELSS Mutual Funds: ₹8,000/month (₹96k/year)\n`;
      response += `• PPF: ₹4,500/month (₹54k/year)\n\n`;
      response += `ADDITIONAL TAX BENEFITS:\n`;
      response += `• NPS: ₹4,000/month (₹50k under 80CCD1B)\n`;
      response += `• Health Insurance: Claim existing premiums\n\n`;
      response += `This can save you ₹46,800-78,000 in taxes annually depending on your bracket!`;
    } else if (
      lowerQuery.includes("mutual fund") ||
      lowerQuery.includes("sip")
    ) {
      response = `📈 MUTUAL FUND STRATEGY:\n\n`;
      response += `For your investment capacity of ₹${availableAmount.toLocaleString()}/month:\n\n`;
      response += `RECOMMENDED SIPs:\n`;
      response += `• Large Cap Fund: ₹${Math.round(availableAmount * 0.4).toLocaleString()}/month (40%)\n`;
      response += `• Mid Cap Fund: ₹${Math.round(availableAmount * 0.3).toLocaleString()}/month (30%)\n`;
      response += `• Index Fund: ₹${Math.round(availableAmount * 0.2).toLocaleString()}/month (20%)\n`;
      response += `• Debt Fund: ₹${Math.round(availableAmount * 0.1).toLocaleString()}/month (10%)\n\n`;
      response += `Start with 1-2 funds, add gradually. Review annually and rebalance.`;
    } else {
      // Generic response
      response = `💡 PERSONALIZED FINANCIAL ADVICE:\n\n`;
      response += `Based on your query and current profile:\n\n`;
      response += `YOUR SITUATION:\n`;
      response += `• Monthly Capacity: ₹${availableAmount.toLocaleString()}\n`;
      response += `• Current Goals: ${goals.length}\n`;
      response += `• Active Investments: ${investments.length}\n\n`;
      response += `GENERAL RECOMMENDATIONS:\n`;
      response += `• Build emergency fund (6 months expenses)\n`;
      response += `• Start SIP in diversified equity funds\n`;
      response += `• Use ELSS for tax savings\n`;
      response += `• Review and rebalance quarterly\n\n`;
      response += `For specific advice on "${query}", consider booking a consultation with our financial advisors.`;
    }

    response += `\n\n⚠️ This is educational information. Consult a certified financial planner for personalized advice.`;
    return response;
  };

  const handleInvestmentConfirm = (investmentData: InvestmentFormData) => {
    const result = saveInvestment({
      strategyId: investmentData.strategyId,
      strategyName: investmentData.strategyName,
      amount: investmentData.amount,
      investmentType: investmentData.investmentType,
      status: "active",
      goalId: investmentData.goalId,
    });

    if (result) {
      // Refresh investments list
      const updatedInvestments = getInvestments();
      setInvestments(updatedInvestments);

      alert(
        `Successfully started investment in ${investmentData.strategyName} with ₹${investmentData.amount.toLocaleString()}! You can track it in your portfolio.`,
      );
      setIsInvestmentFormOpen(false);
      setSelectedStrategy(null);

      // Optionally switch to overview tab to show updated stats
      setActiveTab("overview");
    } else {
      alert("Failed to start investment. Please try again.");
    }
  };

  const totalInvested = goals.reduce(
    (sum, goal) => sum + goal.currentInvestment,
    0,
  );
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress =
    totalTarget > 0 ? (totalInvested / totalTarget) * 100 : 0;
  const availableForInvestment =
    userProfile.monthlySalary -
    userProfile.fixedExpenses -
    userProfile.variableExpenses;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wealth-gray-bg">
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
      <header className="bg-white border-b border-wealth-gray-light px-6 py-4 shadow-sm">
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
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/about-us"
                className="text-wealth-gray hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact-us"
                className="text-wealth-gray hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="text-wealth-gray hover:text-gray-900 transition-colors"
              >
                FAQ
              </Link>
              <Link
                to="/disclaimer"
                className="text-wealth-gray hover:text-gray-900 transition-colors text-sm"
              >
                Disclaimer
              </Link>
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-wealth-blue text-white text-sm">
                      {userProfile.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-900 font-medium">
                    {userProfile.fullName}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsFeedbackOpen(true)}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Feedback
                </DropdownMenuItem>
                <div className="md:hidden">
                  <DropdownMenuItem asChild>
                    <Link to="/about-us" className="flex items-center">
                      About Us
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/contact-us" className="flex items-center">
                      Contact Us
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/faq" className="flex items-center">
                      FAQ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/disclaimer" className="flex items-center">
                      Disclaimer
                    </Link>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">My Goals</TabsTrigger>
            <TabsTrigger value="grow-wealth">Grow Wealth</TabsTrigger>
            <TabsTrigger value="fd-options">FD Options</TabsTrigger>
            <TabsTrigger value="personal-strategies">
              Personal Strategies
            </TabsTrigger>
            <TabsTrigger value="professional-strategies">
              Professional Strategies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      Welcome back, {userProfile.fullName}! <span>🎯</span>
                    </h2>
                    <p className="text-wealth-gray">
                      Track your financial goals and build your wealth journey
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/goal-selection")}
                  className="bg-wealth-blue hover:bg-wealth-blue/90 text-white transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Goal
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-wealth-blue rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-wealth-gray font-medium mb-2">
                    Active Goals
                  </h3>
                  <p className="text-3xl font-bold text-wealth-blue">
                    {goals.length}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-300 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-wealth-green rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-wealth-gray font-medium mb-2">
                    Total Invested
                  </h3>
                  <p className="text-3xl font-bold text-wealth-green">
                    ₹{totalInvested.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-wealth-purple rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-wealth-gray font-medium mb-2">
                    Overall Progress
                  </h3>
                  <p className="text-3xl font-bold text-wealth-purple">
                    {Math.round(overallProgress)}%
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-wealth-gray font-medium mb-2">
                    Available Monthly
                  </h3>
                  <p className="text-3xl font-bold text-orange-600">
                    ₹{availableForInvestment.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate("/goal-selection")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Set New Goal
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Plan your next financial milestone
                  </p>
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setIsPortfolioTrackerOpen(true)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Portfolio Tracker
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Connect your investment accounts
                  </p>
                  <ChevronRight className="w-4 h-4 text-green-600" />
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setIsSmartSuggestionsOpen(true)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Smart Suggestions
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Get personalized investment advice
                  </p>
                  <ChevronRight className="w-4 h-4 text-purple-600" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Goals */}
            {goals.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Goals
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("goals")}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View All
                  </Button>
                </div>

                <div className="grid gap-4">
                  {goals.slice(0, 3).map((goal) => {
                    const progress =
                      (goal.currentInvestment / goal.targetAmount) * 100;
                    return (
                      <Card
                        key={goal.id}
                        className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">
                              {goal.name}
                            </h4>
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              {goal.timeline} months
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">
                                {Math.round(progress)}%
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>
                                ₹{goal.currentInvestment.toLocaleString()}
                              </span>
                              <span>₹{goal.targetAmount.toLocaleString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                My Financial Goals
              </h2>
              <Button
                onClick={() => navigate("/goal-selection")}
                className="bg-wealth-blue hover:bg-wealth-blue/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Goal
              </Button>
            </div>

            <div className="space-y-4">
              {goals.length === 0 ? (
                <Card className="bg-white border-0 shadow-sm">
                  <CardContent className="p-12 text-center">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No goals set yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start by adding your first financial goal
                    </p>
                    <Button
                      onClick={() => navigate("/goal-selection")}
                      className="bg-wealth-blue hover:bg-wealth-blue/90 text-white"
                    >
                      Add Your First Goal
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                goals.map((goal) => {
                  const progress =
                    (goal.currentInvestment / goal.targetAmount) * 100;
                  const remaining = goal.targetAmount - goal.currentInvestment;

                  return (
                    <Card
                      key={goal.id}
                      className="bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {goal.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-wealth-blue-light text-wealth-blue">
                              {goal.timeline} months
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleEditGoal(goal)}
                                >
                                  <Edit3 className="w-4 h-4 mr-2" />
                                  Edit Goal
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteGoal(goal.id)}
                                  className="text-red-600"
                                >
                                  Delete Goal
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-wealth-gray">Progress</span>
                            <span className="text-gray-900 font-medium">
                              {Math.round(progress)}%
                            </span>
                          </div>

                          <Progress value={progress} className="h-3" />

                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <div>
                              <p className="text-xs text-wealth-gray">
                                Invested
                              </p>
                              <p className="text-sm font-semibold text-wealth-green">
                                ₹{goal.currentInvestment.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-wealth-gray">
                                Remaining
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                ₹{remaining.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-wealth-gray">
                                Monthly SIP
                              </p>
                              <p className="text-sm font-semibold text-wealth-blue">
                                ₹{goal.monthlySaving.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="personal-strategies" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Personal Investment Strategies
              </h2>
              <p className="text-gray-600 mb-6">
                Explore investment options for your personal financial goals
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personalStrategies.map((strategy) => (
                  <Card
                    key={strategy.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white"
                    onClick={() => handleStrategyClick(strategy)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                            {strategy.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {strategy.category}
                            </Badge>
                            <Badge
                              className={`text-xs ${getRiskLevelColor(strategy.riskLevel)}`}
                            >
                              {strategy.riskLevel}
                            </Badge>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {strategy.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Min Investment:</span>
                          <span className="font-medium ml-1">
                            ₹{strategy.minInvestment.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Returns:</span>
                          <span className="font-medium text-green-600 ml-1">
                            {strategy.expectedReturn}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grow-wealth" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Grow Your Wealth
              </h2>
              <p className="text-gray-600 mb-6">
                Investment suggestions in different sectors for people without
                specific goals
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {growWealthStrategies.map((strategy) => (
                  <Card
                    key={strategy.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white"
                    onClick={() => handleStrategyClick(strategy)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                            {strategy.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {strategy.category}
                            </Badge>
                            <Badge
                              className={`text-xs ${getRiskLevelColor(strategy.riskLevel)}`}
                            >
                              {strategy.riskLevel}
                            </Badge>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {strategy.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Min Investment:</span>
                          <span className="font-medium ml-1">
                            ₹{strategy.minInvestment.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Returns:</span>
                          <span className="font-medium text-green-600 ml-1">
                            {strategy.expectedReturn}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fd-options" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Fixed Deposit Options
              </h2>
              <p className="text-gray-600 mb-6">
                Safe investment options for people less familiar with stocks -
                comparing plans and suggesting best options
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fdOptionsStrategies.map((strategy) => (
                  <Card
                    key={strategy.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white"
                    onClick={() => handleStrategyClick(strategy)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                            {strategy.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {strategy.category}
                            </Badge>
                            <Badge
                              className={`text-xs ${getRiskLevelColor(strategy.riskLevel)}`}
                            >
                              {strategy.riskLevel === "Low"
                                ? "Zero Risk"
                                : strategy.riskLevel}
                            </Badge>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {strategy.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Min Investment:</span>
                          <span className="font-medium ml-1">
                            ₹{strategy.minInvestment.toLocaleString()}
                            {strategy.id === "recurring_deposit"
                              ? "/month"
                              : ""}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Returns:</span>
                          <span className="font-medium text-green-600 ml-1">
                            {strategy.expectedReturn}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  💡 FD Investment Tips
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">
                      For Beginners:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Start with bank FDs for complete safety</li>
                      <li>
                        Consider laddering (multiple FDs with different
                        maturity)
                      </li>
                      <li>Keep some funds in liquid for emergencies</li>
                      <li>Don't invest all money in one FD</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">
                      Best Practices:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Compare rates across banks before investing</li>
                      <li>Consider tax implications on FD interest</li>
                      <li>Use tax-saver FDs for Section 80C benefits</li>
                      <li>Senior citizens get 0.5% extra interest</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="professional-strategies" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Professional Investment Strategies
              </h2>
              <p className="text-gray-600 mb-6">
                Advanced investment options for business and professional growth
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionalStrategies.map((strategy) => (
                  <Card
                    key={strategy.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white"
                    onClick={() => handleStrategyClick(strategy)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                            {strategy.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {strategy.category}
                            </Badge>
                            <Badge
                              className={`text-xs ${getRiskLevelColor(strategy.riskLevel)}`}
                            >
                              {strategy.riskLevel}
                            </Badge>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {strategy.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Min Investment:</span>
                          <span className="font-medium ml-1">
                            ₹{strategy.minInvestment.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Returns:</span>
                          <span className="font-medium text-green-600 ml-1">
                            {strategy.expectedReturn}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Investment Strategy Modal */}
      <InvestmentStrategyModal
        strategy={selectedStrategy}
        isOpen={isStrategyModalOpen}
        onClose={() => {
          setIsStrategyModalOpen(false);
          setSelectedStrategy(null);
        }}
        onInvest={handleInvestClick}
      />

      {/* Investment Form Modal */}
      {selectedStrategy && (
        <InvestmentFormModal
          strategy={selectedStrategy}
          isOpen={isInvestmentFormOpen}
          onClose={() => {
            setIsInvestmentFormOpen(false);
            setSelectedStrategy(null);
          }}
          onConfirm={handleInvestmentConfirm}
        />
      )}

      {/* Edit Goal Modal */}
      <Dialog
        open={!!editingGoal}
        onOpenChange={(open) => !open && setEditingGoal(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>

          {editingGoal && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="goalName" className="text-sm font-medium">
                  Goal Name
                </Label>
                <Input
                  id="goalName"
                  value={editingGoal.name}
                  onChange={(e) =>
                    setEditingGoal((prev) =>
                      prev ? { ...prev, name: e.target.value } : null,
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="targetAmount" className="text-sm font-medium">
                  Target Amount (₹)
                </Label>
                <Input
                  id="targetAmount"
                  type="number"
                  value={editingGoal.targetAmount}
                  onChange={(e) =>
                    setEditingGoal((prev) =>
                      prev
                        ? {
                            ...prev,
                            targetAmount: parseInt(e.target.value) || 0,
                          }
                        : null,
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="currentInvestment"
                  className="text-sm font-medium"
                >
                  Current Investment (₹)
                </Label>
                <Input
                  id="currentInvestment"
                  type="number"
                  value={editingGoal.currentInvestment}
                  onChange={(e) =>
                    setEditingGoal((prev) =>
                      prev
                        ? {
                            ...prev,
                            currentInvestment: parseInt(e.target.value) || 0,
                          }
                        : null,
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="timeline" className="text-sm font-medium">
                  Timeline (months)
                </Label>
                <Input
                  id="timeline"
                  type="number"
                  value={editingGoal.timeline}
                  onChange={(e) =>
                    setEditingGoal((prev) =>
                      prev
                        ? { ...prev, timeline: parseInt(e.target.value) || 12 }
                        : null,
                    )
                  }
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setEditingGoal(null)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white"
              onClick={handleSaveGoal}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Settings Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-wealth-blue text-white">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-lg font-semibold">
                    Profile Settings
                  </DialogTitle>
                  <p className="text-sm text-wealth-gray">
                    Manage your account and preferences
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Account Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={userProfile.fullName}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        fullName: e.target.value,
                      })
                    }
                    className="border-wealth-gray-light"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                    className="border-wealth-gray-light"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Financial Information
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="monthlySalary"
                    className="text-xs text-wealth-gray"
                  >
                    Monthly Salary (₹)
                  </Label>
                  <Input
                    id="monthlySalary"
                    type="number"
                    value={userProfile.monthlySalary}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        monthlySalary: parseInt(e.target.value) || 0,
                      })
                    }
                    className="border-wealth-gray-light"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="fixedExpenses"
                    className="text-xs text-wealth-gray"
                  >
                    Fixed Expenses (₹)
                  </Label>
                  <Input
                    id="fixedExpenses"
                    type="number"
                    value={userProfile.fixedExpenses}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        fixedExpenses: parseInt(e.target.value) || 0,
                      })
                    }
                    className="border-wealth-gray-light"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="variableExpenses"
                    className="text-xs text-wealth-gray"
                  >
                    Variable Expenses (₹)
                  </Label>
                  <Input
                    id="variableExpenses"
                    type="number"
                    value={userProfile.variableExpenses}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        variableExpenses: parseInt(e.target.value) || 0,
                      })
                    }
                    className="border-wealth-gray-light"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsProfileOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white"
              onClick={handleSaveProfile}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Send Feedback</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFeedbackOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {feedbackSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 text-green-600">✓</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                Your feedback has been submitted successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium">
                  Type
                </Label>
                <select
                  id="type"
                  value={feedbackData.type}
                  onChange={(e) =>
                    setFeedbackData((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="feedback">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="question">Question</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={feedbackData.subject}
                  onChange={(e) =>
                    setFeedbackData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  placeholder="Brief description"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message
                </Label>
                <textarea
                  id="message"
                  value={feedbackData.message}
                  onChange={(e) =>
                    setFeedbackData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  placeholder="Detailed feedback or question"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsFeedbackOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white"
                >
                  Send Feedback
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Portfolio Tracker Modal */}
      <Dialog
        open={isPortfolioTrackerOpen}
        onOpenChange={setIsPortfolioTrackerOpen}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">
                    Portfolio Tracker
                  </DialogTitle>
                  <p className="text-sm text-gray-600">
                    Track all your investments in one place
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPortfolioTrackerOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Portfolio Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <h3 className="text-sm font-medium text-blue-600 mb-2">
                    Total Invested
                  </h3>
                  <p className="text-2xl font-bold text-blue-800">
                    ₹
                    {investments
                      .reduce((sum, inv) => sum + inv.amount, 0)
                      .toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 text-center">
                  <h3 className="text-sm font-medium text-green-600 mb-2">
                    Active Investments
                  </h3>
                  <p className="text-2xl font-bold text-green-800">
                    {
                      investments.filter((inv) => inv.status === "active")
                        .length
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <h3 className="text-sm font-medium text-purple-600 mb-2">
                    Expected Returns
                  </h3>
                  <p className="text-2xl font-bold text-purple-800">
                    ₹
                    {Math.round(
                      investments.reduce((sum, inv) => sum + inv.amount, 0) *
                        0.12,
                    ).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Investments List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Investments
              </h3>

              {investments.length === 0 ? (
                <div className="text-center py-12">
                  <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Investments Yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start investing to track your portfolio here
                  </p>
                  <Button
                    onClick={() => {
                      setIsPortfolioTrackerOpen(false);
                      setActiveTab("personal-strategies");
                    }}
                    className="bg-wealth-blue hover:bg-wealth-blue/90 text-white"
                  >
                    Explore Investment Strategies
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <Card
                      key={investment.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium text-gray-900">
                                {investment.strategyName}
                              </h4>
                              <Badge
                                className={`text-xs ${
                                  investment.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : investment.status === "paused"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {investment.status}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {investment.investmentType}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              Started:{" "}
                              {new Date(
                                investment.startDate,
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              ₹{investment.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-green-600">
                              +₹
                              {Math.round(
                                investment.amount * 0.12,
                              ).toLocaleString()}{" "}
                              (12% p.a.)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Portfolio Insights */}
            {investments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Portfolio Insights
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Investment Distribution
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Personal:{" "}
                            {
                              investments.filter(
                                (inv) => inv.investmentType === "personal",
                              ).length
                            }
                          </span>
                          <span>
                            Professional:{" "}
                            {
                              investments.filter(
                                (inv) => inv.investmentType === "professional",
                              ).length
                            }
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-green-900 mb-2">
                        Growth Potential
                      </h4>
                      <p className="text-sm text-green-700">
                        Your portfolio is positioned for long-term wealth
                        creation with diversified investments.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Smart Suggestions Modal */}
      <Dialog
        open={isSmartSuggestionsOpen}
        onOpenChange={setIsSmartSuggestionsOpen}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">
                    Smart Investment Suggestions
                  </DialogTitle>
                  <p className="text-sm text-gray-600">
                    Get personalized advice based on your profile
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSmartSuggestionsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Ask Personal Question */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Ask Your Personal Finance Question
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="userQuery"
                      className="text-sm font-medium text-blue-800"
                    >
                      What would you like to know about investments or financial
                      planning?
                    </Label>
                    <textarea
                      id="userQuery"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      className="w-full mt-2 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                      placeholder="Example: Should I invest in mutual funds or fixed deposits for my 5-year goal? What's the best investment strategy for a 25-year-old beginner?"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (userQuery.trim()) {
                        setIsGeneratingResponse(true);
                        // Simulate AI response generation
                        setTimeout(() => {
                          setQueryResponse(
                            generatePersonalizedResponse(
                              userQuery,
                              userProfile,
                              goals,
                              investments,
                              availableForInvestment,
                            ),
                          );
                          setIsGeneratingResponse(false);
                        }, 2000);
                      }
                    }}
                    disabled={!userQuery.trim() || isGeneratingResponse}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isGeneratingResponse ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Generating Response...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Get Personalized Advice
                      </>
                    )}
                  </Button>

                  {queryResponse && (
                    <div className="mt-4 p-4 bg-white border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <Lightbulb className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-900 mb-2">
                            Personalized Suggestion
                          </h4>
                          <div className="text-sm text-gray-700 whitespace-pre-line">
                            {queryResponse}
                          </div>
                          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                            💡 This advice is based on your current profile.
                            Consider consulting a financial advisor for detailed
                            planning.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Question Templates */}
                  <div className="grid md:grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        setUserQuery(
                          "What investment options are best for my current financial situation?",
                        )
                      }
                      className="text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                    >
                      💼 Best investments for my situation?
                    </button>
                    <button
                      onClick={() =>
                        setUserQuery(
                          "How much should I invest monthly to achieve my financial goals?",
                        )
                      }
                      className="text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                    >
                      💰 Monthly investment amount?
                    </button>
                    <button
                      onClick={() =>
                        setUserQuery(
                          "Should I prioritize emergency fund or start investing immediately?",
                        )
                      }
                      className="text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                    >
                      🚨 Emergency fund vs investing?
                    </button>
                    <button
                      onClick={() =>
                        setUserQuery(
                          "What are the tax implications of my current investment strategy?",
                        )
                      }
                      className="text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                    >
                      📊 Tax implications?
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Profile Analysis */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">
                  Your Investment Profile
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-purple-800 mb-2">
                      Financial Status
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-600">Monthly Salary:</span>
                        <span className="font-medium">
                          ₹{userProfile.monthlySalary.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-600">
                          Available for Investment:
                        </span>
                        <span className="font-medium">
                          ₹{availableForInvestment.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-600">Current Goals:</span>
                        <span className="font-medium">{goals.length}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-800 mb-2">
                      Investment Activity
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-600">
                          Active Investments:
                        </span>
                        <span className="font-medium">
                          {investments.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-600">Total Invested:</span>
                        <span className="font-medium">
                          ₹
                          {investments
                            .reduce((sum, inv) => sum + inv.amount, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-600">Savings Rate:</span>
                        <span className="font-medium">
                          {userProfile.monthlySalary > 0
                            ? Math.round(
                                (availableForInvestment /
                                  userProfile.monthlySalary) *
                                  100,
                              )
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personalized Suggestions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personalized Suggestions
              </h3>
              <div className="space-y-4">
                {/* Suggestion 1: Based on Savings Rate */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {availableForInvestment > 20000
                            ? "Excellent Savings Potential!"
                            : availableForInvestment > 10000
                              ? "Good Savings Capacity"
                              : "Focus on Building Emergency Fund"}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {availableForInvestment > 20000
                            ? "With ₹" +
                              availableForInvestment.toLocaleString() +
                              " available monthly, consider diversifying across equity SIPs, debt funds, and tax-saving investments."
                            : availableForInvestment > 10000
                              ? "You can start with SIP investments of ₹5,000-10,000 in equity mutual funds for long-term wealth creation."
                              : "Build an emergency fund of 6 months expenses first, then start with small SIPs of ₹1,000-2,000."}
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            {availableForInvestment > 20000
                              ? "High Priority"
                              : availableForInvestment > 10000
                                ? "Medium Priority"
                                : "Foundation"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Suggestion 2: Based on Goals */}
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <Target className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {goals.length === 0
                            ? "Start Goal-Based Planning"
                            : goals.length <= 2
                              ? "Add More Specific Goals"
                              : "Review Goal Priorities"}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {goals.length === 0
                            ? "Set specific financial goals like buying a house, car, or retirement planning to create targeted investment strategies."
                            : goals.length <= 2
                              ? "Consider adding goals for emergency fund, vacation, or professional development to diversify your planning."
                              : "You have multiple goals. Prioritize them based on timeline and importance to optimize your investments."}
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Goal Planning
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Suggestion 3: Investment Strategy */}
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                        <PieChart className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {investments.length === 0
                            ? "Start Your Investment Journey"
                            : investments.length <= 2
                              ? "Diversify Your Portfolio"
                              : "Optimize Your Investments"}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {investments.length === 0
                            ? "Begin with SIP in large-cap equity funds for stability and growth. Consider ELSS for tax benefits."
                            : investments.length <= 2
                              ? "Add mid-cap funds for higher growth potential and debt funds for stability to balance your portfolio."
                              : "Review your investment performance and rebalance based on changing goals and market conditions."}
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            Strategy
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Suggestion 4: Tax Planning */}
                <Card className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                        <DollarSign className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Tax-Efficient Planning
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Maximize your tax savings with ELSS investments (₹1.5L
                          limit under 80C), PPF for long-term wealth, and
                          consider NPS for additional ₹50K deduction under
                          80CCD(1B).
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-orange-100 text-orange-800 text-xs">
                            Tax Saving
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsSmartSuggestionsOpen(false);
                  setUserQuery("");
                  setQueryResponse("");
                }}
              >
                Close
              </Button>
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => {
                  setIsSmartSuggestionsOpen(false);
                  setActiveTab("personal-strategies");
                }}
              >
                Explore Strategies
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
}
