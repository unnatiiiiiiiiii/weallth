import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, ArrowLeft, Zap, Download, Calendar, DollarSign, X } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function InvestmentPlan() {
  const { goalId } = useParams<{ goalId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { goalTitle, targetAmount, monthlySaving } = location.state || {};
  
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [showAdjustDialog, setShowAdjustDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [adjustedAmount, setAdjustedAmount] = useState(targetAmount || 100000);
  const [adjustedMonths, setAdjustedMonths] = useState(340);

  const handleStartSIP = () => {
    setSuccessMessage(`🎉 SIP of ₹${monthlySaving}/month started successfully for ${goalTitle || 'Gadget Purchase'}! Redirecting to dashboard...`);
    setShowSuccessDialog(true);
    setTimeout(() => {
      setShowSuccessDialog(false);
      navigate("/dashboard");
    }, 3000);
  };

  const handleDownloadReport = () => {
    setSuccessMessage("Investment report downloaded successfully!");
    setShowDownloadDialog(true);
    setTimeout(() => {
      setShowDownloadDialog(false);
    }, 2000);
  };

  const handleAdjustTimeline = () => {
    setShowAdjustDialog(true);
  };

  const handleUpdateGoal = () => {
    setShowAdjustDialog(false);
    // Update the calculation with new values
  };

  const handleSaveGoalOnly = () => {
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate(`/goal-planning/${goalId}`);
  };

  const newMonthlySaving = Math.ceil(adjustedAmount / adjustedMonths);

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Investment Plan</h2>
          <p className="text-wealth-gray">Personalized recommendations for {goalTitle || "Start a Side Hustle"}</p>
        </div>

        {/* Goal Summary */}
        <Card className="bg-white border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{goalTitle || "Start a Side Hustle"}</h3>
              <div className="text-right">
                <p className="text-sm text-wealth-gray">Monthly Saving</p>
                <p className="text-xl font-bold text-wealth-green">₹{monthlySaving || 833}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-wealth-gray">Target: ₹{(targetAmount || 100000).toLocaleString()}</span>
                <span className="text-gray-900 font-medium">Progress: 0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Investment Strategy */}
        <Card className="bg-white border-0 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recommended Investment Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-wealth-gray-light rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-wealth-blue-light rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-wealth-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Equity Mutual Fund SIP</h4>
                  <p className="text-sm text-wealth-gray">High-growth equity funds for long-term wealth</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded">High Risk</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-wealth-green">₹{Math.ceil((monthlySaving || 833) * 0.7)}/month</p>
                <Button variant="link" className="text-wealth-blue p-0 h-auto text-sm">
                  Learn More →
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-wealth-gray-light rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Debt Fund Allocation</h4>
                  <p className="text-sm text-wealth-gray">Stable debt instruments for risk balance</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Low Risk</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-wealth-green">₹{Math.floor((monthlySaving || 833) * 0.3)}/month</p>
                <Button variant="link" className="text-wealth-blue p-0 h-auto text-sm">
                  Learn More →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Take Action */}
        <Card className="bg-white border-0 shadow-sm mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-wealth-blue" />
              <CardTitle className="text-lg font-semibold text-gray-900">Take Action</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={handleStartSIP}
              className="w-full bg-wealth-blue hover:bg-wealth-blue/90 text-white py-3"
            >
              <span className="mr-2">▶</span>
              Start SIP Now
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleAdjustTimeline}
                className="flex items-center justify-center gap-2 border-wealth-gray-light text-wealth-gray hover:bg-wealth-gray-light"
              >
                <Calendar className="w-4 h-4" />
                Adjust Timeline
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleSaveGoalOnly}
                className="flex items-center justify-center gap-2 border-wealth-gray-light text-wealth-gray hover:bg-wealth-gray-light"
              >
                <DollarSign className="w-4 h-4" />
                Save Goal Only
              </Button>
            </div>

            <Button 
              variant="outline" 
              onClick={handleDownloadReport}
              className="w-full flex items-center justify-center gap-2 border-wealth-gray-light text-wealth-gray hover:bg-wealth-gray-light"
            >
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2 border-wealth-gray-light text-wealth-gray hover:bg-wealth-gray-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Planning
          </Button>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Success Message</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-gray-900">{successMessage}</p>
            <Button 
              className="mt-4 bg-wealth-blue hover:bg-wealth-blue/90 text-white"
              onClick={() => setShowSuccessDialog(false)}
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Download Success Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Download Success</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-gray-900">{successMessage}</p>
            <Button 
              className="mt-4 bg-wealth-blue hover:bg-wealth-blue/90 text-white"
              onClick={() => setShowDownloadDialog(false)}
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Adjust Goal Dialog */}
      <Dialog open={showAdjustDialog} onOpenChange={setShowAdjustDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex items-center justify-between border-b pb-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">Adjust Your Goal</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowAdjustDialog(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="adjustAmount" className="text-sm font-medium">Target Amount (₹)</Label>
              <Input
                id="adjustAmount"
                value={adjustedAmount}
                onChange={(e) => setAdjustedAmount(parseInt(e.target.value) || 0)}
                className="border-wealth-gray-light"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">Timeline: {adjustedMonths} months</Label>
              <div className="px-2">
                <Slider
                  value={[adjustedMonths]}
                  onValueChange={(value) => setAdjustedMonths(value[0])}
                  max={600}
                  min={6}
                  step={6}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-wealth-gray mt-1">
                  <span>6 months</span>
                  <span>50 years</span>
                </div>
              </div>
            </div>

            <div className="bg-wealth-blue-light p-3 rounded-lg">
              <p className="text-sm text-wealth-gray">New Monthly Saving Required</p>
              <p className="text-xl font-bold text-wealth-blue">₹{newMonthlySaving.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 border-wealth-gray-light text-wealth-gray hover:bg-wealth-gray-light"
              onClick={() => setShowAdjustDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white"
              onClick={handleUpdateGoal}
            >
              Update Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
