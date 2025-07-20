import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, DollarSign, User, Settings, MessageSquare, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Goal {
  id: string;
  title: string;
  target: number;
  invested: number;
  remaining: number;
  monthlySip: number;
  timeline: string;
  progress: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fullName: "liza",
    email: "liza@gmail.com",
    monthlySalary: "0",
    fixedExpenses: "0",
    variableExpenses: "0"
  });

  const [goals] = useState<Goal[]>([
    {
      id: "1",
      title: "Customer Support",
      target: 500000,
      invested: 3000,
      remaining: 497000,
      monthlySip: 27611,
      timeline: "18 months",
      progress: 1
    },
    {
      id: "2", 
      title: "Go on a Vacation",
      target: 500000,
      invested: 3000,
      remaining: 497000,
      monthlySip: 27611,
      timeline: "18 months", 
      progress: 1
    }
  ]);

    const handleSaveProfile = () => {
    setIsProfileOpen(false);
  };

  const handleAddNewGoal = () => {
    navigate("/goal-selection");
  };

  const handleLogout = () => {
    navigate("/login");
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
                <DropdownMenuItem>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Feedback
                </DropdownMenuItem>
                                <DropdownMenuItem className="text-orange-600" onClick={handleLogout}>
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
        {/* Welcome Section */}
        <div className="bg-white rounded-xl p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-wealth-purple text-white">
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                Welcome back, {userProfile.fullName}! <span>🍇</span>
              </h2>
              <p className="text-wealth-gray">Track your financial goals and build your wealth journey</p>
            </div>
          </div>
          
                    <Button
            onClick={handleAddNewGoal}
            className="bg-wealth-blue hover:bg-wealth-blue/90 text-white"
          >
            <span className="mr-2">+</span>
            Add New Goal
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-wealth-blue-light border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-wealth-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-wealth-gray font-medium mb-2">Active Goals</h3>
              <p className="text-3xl font-bold text-wealth-blue">{goals.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-wealth-green-light border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-wealth-green rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-wealth-gray font-medium mb-2">Total Invested</h3>
              <p className="text-3xl font-bold text-wealth-green">₹6,000</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-wealth-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-wealth-gray font-medium mb-2">Overall Progress</h3>
              <p className="text-3xl font-bold text-wealth-purple">1%</p>
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  <span className="text-sm bg-wealth-blue-light text-wealth-blue px-3 py-1 rounded-full">
                    {goal.timeline}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-wealth-gray">Progress</span>
                    <span className="text-gray-900 font-medium">{goal.progress}%</span>
                  </div>
                  
                  <Progress value={goal.progress} className="h-2" />
                  
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-wealth-gray">Invested</p>
                      <p className="text-sm font-semibold text-wealth-green">₹{goal.invested.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-wealth-gray">Remaining</p>
                      <p className="text-sm font-semibold text-gray-900">₹{goal.remaining.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-wealth-gray">Monthly SIP</p>
                      <p className="text-sm font-semibold text-wealth-blue">₹{goal.monthlySip.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Profile Settings Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-wealth-purple text-white">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-lg font-semibold">Profile Settings</DialogTitle>
                  <p className="text-sm text-wealth-gray">Manage your account and preferences</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsProfileOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Account Information</h3>
                <Button variant="link" className="text-wealth-blue p-0 h-auto">
                  Edit
                </Button>
              </div>
              
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
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-wealth-green" />
                <h3 className="font-medium text-gray-900">Financial Information</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlySalary" className="text-xs text-wealth-gray">Monthly Salary (₹)</Label>
                  <Input
                    id="monthlySalary"
                    value={userProfile.monthlySalary}
                    onChange={(e) => setUserProfile({...userProfile, monthlySalary: e.target.value})}
                    className="border-wealth-gray-light"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fixedExpenses" className="text-xs text-wealth-gray">Fixed Expenses (₹)</Label>
                  <Input
                    id="fixedExpenses"
                    value={userProfile.fixedExpenses}
                    onChange={(e) => setUserProfile({...userProfile, fixedExpenses: e.target.value})}
                    className="border-wealth-gray-light"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variableExpenses" className="text-xs text-wealth-gray">Variable Expenses (₹)</Label>
                  <Input
                    id="variableExpenses"
                    value={userProfile.variableExpenses}
                    onChange={(e) => setUserProfile({...userProfile, variableExpenses: e.target.value})}
                    className="border-wealth-gray-light"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 border-wealth-gray-light text-wealth-gray hover:bg-wealth-gray-light"
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
    </div>
  );
}
