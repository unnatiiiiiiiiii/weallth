import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Target, DollarSign, User, Settings, MessageSquare, LogOut, 
  Plus, MoreVertical, X, Edit3, PieChart, BookOpen, Lightbulb, Calculator,
  ChevronRight, ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { getGoals, updateGoal, deleteGoal, saveFeedback, getUserProfile, saveUserProfile } from "@/lib/storage";
import { getInvestmentStrategies, type InvestmentStrategy } from "@/lib/investmentStrategies";
import { getRiskLevelColor } from "@/lib/utils";
import InvestmentStrategyModal from "@/components/InvestmentStrategyModal";

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
  const [selectedStrategy, setSelectedStrategy] = useState<InvestmentStrategy | null>(null);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: "",
    monthlySalary: 0,
    fixedExpenses: 0,
    variableExpenses: 0
  });
  const [feedbackData, setFeedbackData] = useState({
    type: 'feedback',
    subject: '',
    message: ''
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const personalStrategies = getInvestmentStrategies('personal');
  const professionalStrategies = getInvestmentStrategies('professional');

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
    
    // Load user profile
    const profile = getUserProfile();
    if (profile) {
      setUserProfile({
        fullName: profile.fullName || currentUser.username,
        email: profile.email || currentUser.email,
        monthlySalary: profile.monthlySalary || 0,
        fixedExpenses: profile.fixedExpenses || 0,
        variableExpenses: profile.variableExpenses || 0
      });
    } else {
      setUserProfile(prev => ({
        ...prev,
        fullName: currentUser.username,
        email: currentUser.email || ""
      }));
    }
  }, [navigate]);

  const handleSaveProfile = () => {
    const profileData = {
      fullName: userProfile.fullName,
      email: userProfile.email,
      phoneNumber: '',
      monthlySalary: userProfile.monthlySalary,
      fixedExpenses: userProfile.fixedExpenses,
      variableExpenses: userProfile.variableExpenses,
      riskTolerance: 'moderate' as const,
      investmentExperience: 'beginner' as const,
      notifications: true,
      newsletter: false
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
        setFeedbackData({ type: 'feedback', subject: '', message: '' });
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
        setGoals(prev => prev.map(goal => goal.id === editingGoal.id ? editingGoal : goal));
        setEditingGoal(null);
      }
    }
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      const success = deleteGoal(goalId);
      if (success) {
        setGoals(prev => prev.filter(goal => goal.id !== goalId));
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

  const totalInvested = goals.reduce((sum, goal) => sum + goal.currentInvestment, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalInvested / totalTarget) * 100 : 0;
  const availableForInvestment = userProfile.monthlySalary - userProfile.fixedExpenses - userProfile.variableExpenses;

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
              <p className="text-sm text-wealth-gray">by Erfinden Technologies</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-wealth-gray hover:text-gray-900">
              Goal Dashboard
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-wealth-blue text-white text-sm">
                      {userProfile.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-900 font-medium">{userProfile.fullName}</span>
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
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">My Goals</TabsTrigger>
            <TabsTrigger value="personal-strategies">Personal Strategies</TabsTrigger>
            <TabsTrigger value="professional-strategies">Professional Strategies</TabsTrigger>
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
                    <p className="text-wealth-gray">Track your financial goals and build your wealth journey</p>
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
                  <h3 className="text-wealth-gray font-medium mb-2">Active Goals</h3>
                  <p className="text-3xl font-bold text-wealth-blue">{goals.length}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-300 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-wealth-green rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-wealth-gray font-medium mb-2">Total Invested</h3>
                  <p className="text-3xl font-bold text-wealth-green">₹{totalInvested.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-wealth-purple rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-wealth-gray font-medium mb-2">Overall Progress</h3>
                  <p className="text-3xl font-bold text-wealth-purple">{Math.round(overallProgress)}%</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-wealth-gray font-medium mb-2">Available Monthly</h3>
                  <p className="text-3xl font-bold text-orange-600">₹{availableForInvestment.toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/goal-selection")}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Set New Goal</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Plan your next financial milestone</p>
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Portfolio Tracker</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Connect your investment accounts</p>
                  <ChevronRight className="w-4 h-4 text-green-600" />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Smart Suggestions</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Get personalized investment advice</p>
                  <ChevronRight className="w-4 h-4 text-purple-600" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Financial Goals</h2>
              <Button onClick={() => navigate("/goal-selection")} className="bg-wealth-blue hover:bg-wealth-blue/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Goal
              </Button>
            </div>

            <div className="space-y-4">
              {goals.length === 0 ? (
                <Card className="bg-white border-0 shadow-sm">
                  <CardContent className="p-12 text-center">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No goals set yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first financial goal</p>
                    <Button onClick={() => navigate("/goal-selection")} className="bg-wealth-blue hover:bg-wealth-blue/90 text-white">
                      Add Your First Goal
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                goals.map((goal) => {
                  const progress = (goal.currentInvestment / goal.targetAmount) * 100;
                  const remaining = goal.targetAmount - goal.currentInvestment;
                  
                  return (
                    <Card key={goal.id} className="bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-wealth-blue-light text-wealth-blue">
                              {goal.timeline} months
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditGoal(goal)}>
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
                            <span className="text-gray-900 font-medium">{Math.round(progress)}%</span>
                          </div>
                          
                          <Progress value={progress} className="h-3" />
                          
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <div>
                              <p className="text-xs text-wealth-gray">Invested</p>
                              <p className="text-sm font-semibold text-wealth-green">₹{goal.currentInvestment.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-wealth-gray">Remaining</p>
                              <p className="text-sm font-semibold text-gray-900">₹{remaining.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-wealth-gray">Monthly SIP</p>
                              <p className="text-sm font-semibold text-wealth-blue">₹{goal.monthlySaving.toLocaleString()}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Investment Strategies</h2>
              <p className="text-gray-600 mb-6">Explore investment options for your personal financial goals</p>
              
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
                            <Badge variant="outline" className="text-xs">{strategy.category}</Badge>
                            <Badge className={`text-xs ${getRiskLevelColor(strategy.riskLevel)}`}>
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
                          <span className="font-medium ml-1">₹{strategy.minInvestment.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Returns:</span>
                          <span className="font-medium text-green-600 ml-1">{strategy.expectedReturn}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="professional-strategies" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Investment Strategies</h2>
              <p className="text-gray-600 mb-6">Advanced investment options for business and professional growth</p>
              
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
                            <Badge variant="outline" className="text-xs">{strategy.category}</Badge>
                            <Badge className={`text-xs ${getRiskLevelColor(strategy.riskLevel)}`}>
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
                          <span className="font-medium ml-1">₹{strategy.minInvestment.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Returns:</span>
                          <span className="font-medium text-green-600 ml-1">{strategy.expectedReturn}</span>
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
      />

      {/* Edit Goal Modal */}
      <Dialog open={!!editingGoal} onOpenChange={(open) => !open && setEditingGoal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>
          
          {editingGoal && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="goalName" className="text-sm font-medium">Goal Name</Label>
                <Input
                  id="goalName"
                  value={editingGoal.name}
                  onChange={(e) => setEditingGoal(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
              <div>
                <Label htmlFor="targetAmount" className="text-sm font-medium">Target Amount (₹)</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  value={editingGoal.targetAmount}
                  onChange={(e) => setEditingGoal(prev => prev ? { ...prev, targetAmount: parseInt(e.target.value) || 0 } : null)}
                />
              </div>
              <div>
                <Label htmlFor="currentInvestment" className="text-sm font-medium">Current Investment (₹)</Label>
                <Input
                  id="currentInvestment"
                  type="number"
                  value={editingGoal.currentInvestment}
                  onChange={(e) => setEditingGoal(prev => prev ? { ...prev, currentInvestment: parseInt(e.target.value) || 0 } : null)}
                />
              </div>
              <div>
                <Label htmlFor="timeline" className="text-sm font-medium">Timeline (months)</Label>
                <Input
                  id="timeline"
                  type="number"
                  value={editingGoal.timeline}
                  onChange={(e) => setEditingGoal(prev => prev ? { ...prev, timeline: parseInt(e.target.value) || 12 } : null)}
                />
              </div>
            </div>
          )}
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setEditingGoal(null)}>
              Cancel
            </Button>
            <Button className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white" onClick={handleSaveGoal}>
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
                  <DialogTitle className="text-lg font-semibold">Profile Settings</DialogTitle>
                  <p className="text-sm text-wealth-gray">Manage your account and preferences</p>
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
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="fullName"
                    value={userProfile.fullName}
                    onChange={(e) => setUserProfile({...userProfile, fullName: e.target.value})}
                    className="border-wealth-gray-light"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
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
                  <Label htmlFor="monthlySalary" className="text-xs text-wealth-gray">Monthly Salary (₹)</Label>
                  <Input
                    id="monthlySalary"
                    type="number"
                    value={userProfile.monthlySalary}
                    onChange={(e) => setUserProfile({...userProfile, monthlySalary: parseInt(e.target.value) || 0})}
                    className="border-wealth-gray-light"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fixedExpenses" className="text-xs text-wealth-gray">Fixed Expenses (₹)</Label>
                  <Input
                    id="fixedExpenses"
                    type="number"
                    value={userProfile.fixedExpenses}
                    onChange={(e) => setUserProfile({...userProfile, fixedExpenses: parseInt(e.target.value) || 0})}
                    className="border-wealth-gray-light"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variableExpenses" className="text-xs text-wealth-gray">Variable Expenses (₹)</Label>
                  <Input
                    id="variableExpenses"
                    type="number"
                    value={userProfile.variableExpenses}
                    onChange={(e) => setUserProfile({...userProfile, variableExpenses: parseInt(e.target.value) || 0})}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium">Type</Label>
                <select
                  id="type"
                  value={feedbackData.type}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="feedback">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="question">Question</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                <Input
                  id="subject"
                  value={feedbackData.subject}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Brief description"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                <textarea
                  id="message"
                  value={feedbackData.message}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  placeholder="Detailed feedback or question"
                  required
                />
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsFeedbackOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white">
                  Send Feedback
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
