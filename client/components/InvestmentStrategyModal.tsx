import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, ExternalLink, TrendingUp, Shield, AlertTriangle, Users, Calculator, FileText, Clock } from "lucide-react";
import type { InvestmentStrategy } from "@/lib/investmentStrategies";
import { getRiskLevelColor } from "@/lib/utils";

interface InvestmentStrategyModalProps {
  strategy: InvestmentStrategy | null;
  isOpen: boolean;
  onClose: () => void;
  onInvest: (strategy: InvestmentStrategy) => void;
}

export default function InvestmentStrategyModal({ strategy, isOpen, onClose }: InvestmentStrategyModalProps) {
  if (!strategy) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">{strategy.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{strategy.category}</Badge>
                  <Badge className={`text-xs ${getRiskLevelColor(strategy.riskLevel)}`}>
                    {strategy.riskLevel} Risk
                  </Badge>
                  <Badge variant="outline" className="text-xs">{strategy.expectedReturn} Returns</Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">How it Works</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="suitability">Suitability</TabsTrigger>
              <TabsTrigger value="taxation">Tax & Exit</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Quick Facts
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-600">Minimum Investment:</span>
                        <span className="font-medium">₹{strategy.minInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Expected Returns:</span>
                        <span className="font-medium">{strategy.expectedReturn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Investment Timeline:</span>
                        <span className="font-medium">{strategy.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Risk Level:</span>
                        <span className="font-medium">{strategy.riskLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Available Platforms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {strategy.platforms.map((platform, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {strategy.detailedDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Popular Examples</h4>
                    <div className="space-y-2">
                      {strategy.examples.slice(0, 4).map((example, index) => (
                        <div key={index} className="bg-gray-50 rounded p-2 text-sm text-gray-700">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  How It Works
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {strategy.howItWorks}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">Conservative Allocation</h5>
                  <div className="text-2xl font-bold text-green-700">
                    {strategy.allocation.conservative}%
                  </div>
                  <p className="text-xs text-green-600 mt-1">of monthly investment amount</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h5 className="font-medium text-yellow-900 mb-2">Moderate Allocation</h5>
                  <div className="text-2xl font-bold text-yellow-700">
                    {strategy.allocation.moderate}%
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">of monthly investment amount</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h5 className="font-medium text-red-900 mb-2">Aggressive Allocation</h5>
                  <div className="text-2xl font-bold text-red-700">
                    {strategy.allocation.aggressive}%
                  </div>
                  <p className="text-xs text-red-600 mt-1">of monthly investment amount</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Advantages
                  </h4>
                  <div className="space-y-2">
                    {strategy.pros.map((pro, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-sm text-gray-700">{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    Considerations
                  </h4>
                  <div className="space-y-2">
                    {strategy.cons.map((con, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                        <span className="text-sm text-gray-700">{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-600" />
                  Market Risks
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {strategy.marketRisks.map((risk, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded p-2">
                      <span className="text-sm text-red-700">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="suitability" className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Who Should Invest
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {strategy.whoShouldInvest.map((criteria, index) => (
                    <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-sm text-blue-800">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <h5 className="font-medium text-purple-900 mb-2">Investment Recommendation</h5>
                <p className="text-sm text-purple-700 leading-relaxed">
                  This investment strategy is most suitable for investors who {strategy.whoShouldInvest.join(', ').toLowerCase()}. 
                  Consider your risk tolerance, investment timeline, and financial goals before investing.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="taxation" className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-600" />
                  Tax Implications
                </h4>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm text-orange-800 leading-relaxed">
                    {strategy.taxImplications}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  Exit Strategy
                </h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800 leading-relaxed">
                    {strategy.exitStrategy}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h5 className="font-medium text-yellow-900 mb-2">Important Note</h5>
                <p className="text-xs text-yellow-800">
                  Tax implications may vary based on your individual circumstances and changes in tax laws. 
                  Please consult with a qualified tax advisor for personalized advice.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-6 border-t">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
            <Button className="flex-1 bg-wealth-blue hover:bg-wealth-blue/90 text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              Start Investing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
