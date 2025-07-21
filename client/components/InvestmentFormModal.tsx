import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Calculator, TrendingUp, AlertCircle } from "lucide-react";
import type { InvestmentStrategy } from "@/lib/investmentStrategies";
import { getGoals } from "@/lib/storage";
import { getRiskLevelColor } from "@/lib/utils";

interface InvestmentFormModalProps {
  strategy: InvestmentStrategy | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: InvestmentFormData) => void;
}

export interface InvestmentFormData {
  strategyId: string;
  strategyName: string;
  amount: number;
  investmentType: 'personal' | 'professional';
  goalId?: string;
}

export default function InvestmentFormModal({ strategy, isOpen, onClose, onConfirm }: InvestmentFormModalProps) {
  const [formData, setFormData] = useState<InvestmentFormData>({
    strategyId: "",
    strategyName: "",
    amount: 0,
    investmentType: 'personal',
    goalId: undefined
  });
  
    const goals = getGoals();

  // Reset form when modal opens with new strategy
  useEffect(() => {
    if (strategy && isOpen) {
      setFormData({
        strategyId: strategy.id,
        strategyName: strategy.name,
        amount: strategy.minInvestment,
        investmentType: 'personal',
        goalId: undefined
      });
    }
  }, [strategy, isOpen]);
  
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!strategy) {
      alert('Please select a strategy first.');
      return;
    }

    if (formData.amount < strategy.minInvestment) {
      alert(`Minimum investment amount is ₹${strategy.minInvestment.toLocaleString()}`);
      return;
    }

    try {
      onConfirm({
        ...formData,
        strategyId: strategy.id,
        strategyName: strategy.name
      });
    } catch (error) {
      console.error('Error submitting investment form:', error);
      alert('An error occurred while processing your investment. Please try again.');
    }
  };

  const projectedReturns = formData.amount * 0.12; // 12% annual return estimation
  const isAmountValid = strategy ? formData.amount >= strategy.minInvestment : false;

    if (!strategy) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">No investment strategy selected. Please go back and select a strategy.</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">Start Investment</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">{strategy.name}</span>
                  <Badge className={`text-xs ${getRiskLevelColor(strategy.riskLevel)}`}>
                    {strategy.riskLevel} Risk
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Investment Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">Minimum Investment:</span>
                <span className="font-medium">₹{strategy.minInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Expected Returns:</span>
                <span className="font-medium">{strategy.expectedReturn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Risk Level:</span>
                <span className="font-medium">{strategy.riskLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Investment Type:</span>
                <span className="font-medium">{strategy.category}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="investmentType" className="text-sm font-medium">Investment Type</Label>
              <Select 
                value={formData.investmentType} 
                onValueChange={(value: 'personal' | 'professional') => 
                  setFormData(prev => ({ ...prev, investmentType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Investment</SelectItem>
                  <SelectItem value="professional">Professional Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm font-medium">Investment Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                min={strategy.minInvestment}
                value={formData.amount || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                placeholder={`Minimum ₹${strategy.minInvestment.toLocaleString()}`}
                className={`text-lg ${!isAmountValid && formData.amount > 0 ? 'border-red-300' : ''}`}
              />
              {!isAmountValid && formData.amount > 0 && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Minimum investment amount is ₹{strategy.minInvestment.toLocaleString()}
                </p>
              )}
            </div>

            {goals.length > 0 && (
              <div>
                <Label htmlFor="goalId" className="text-sm font-medium">Link to Goal (Optional)</Label>
                <Select 
                  value={formData.goalId || ""} 
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, goalId: value || undefined }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a goal to link this investment" />
                  </SelectTrigger>
                  <SelectContent>
                                        <SelectItem value="none">No Goal</SelectItem>
                    {goals.map((goal) => (
                      <SelectItem key={goal.id} value={goal.id}>
                        {goal.name} - ₹{goal.targetAmount.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {formData.amount > 0 && isAmountValid && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Projected Returns</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-600">Annual Return (12%):</span>
                  <p className="font-bold text-green-800 text-lg">₹{projectedReturns.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-green-600">Investment Amount:</span>
                  <p className="font-bold text-green-800 text-lg">₹{formData.amount.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xs text-green-700 mt-2">
                *Returns are indicative and subject to market risks. Past performance doesn't guarantee future results.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white"
              disabled={!isAmountValid}
            >
              Start Investment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
