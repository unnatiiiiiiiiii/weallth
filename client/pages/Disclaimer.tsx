import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Shield, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Disclaimer() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-wealth-gray-bg">
      {/* Header */}
      <header className="bg-white border-b border-wealth-gray-light px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="w-8 h-8 bg-wealth-blue rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Weallth</h1>
              <p className="text-sm text-wealth-gray">Legal Disclaimer</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Important Disclaimer
          </h1>
          <p className="text-xl text-wealth-gray max-w-2xl mx-auto">
            Please read this disclaimer carefully before using our platform and investment services.
          </p>
        </div>

        {/* Main Disclaimer */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-red-900">
              <AlertTriangle className="w-6 h-6" />
              Investment Risk Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-100 border border-red-300 rounded-lg p-6 mb-4">
              <p className="text-red-800 font-semibold text-lg mb-4">
                ⚠️ IMPORTANT: All investments are subject to market risks.
              </p>
              <p className="text-red-700">
                <strong>Weallth and Erfinden Technologies Pvt. Ltd. are NOT responsible for any financial losses, mishaps, or adverse outcomes resulting from investment decisions made using our platform.</strong> Past performance does not guarantee future results, and all investment decisions should be made after careful consideration of your financial situation and risk tolerance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Disclaimers */}
        <div className="space-y-8">
          {/* Investment Risks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <FileText className="w-6 h-6" />
                Investment Risks & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Market Risks</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• All investments carry inherent market risks and volatility</li>
                  <li>• Value of investments can go up or down based on market conditions</li>
                  <li>• Past performance is not indicative of future results</li>
                  <li>• Economic factors may adversely affect investment performance</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Platform Limitations</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Our recommendations are based on general algorithms and may not suit individual circumstances</li>
                  <li>• We do not provide personalized financial advice</li>
                  <li>• Investment suggestions are for informational purposes only</li>
                  <li>• Users should conduct their own research before investing</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">User Responsibility</h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Users are solely responsible for their investment decisions</li>
                  <li>• Verify all information before making investment commitments</li>
                  <li>• Consult qualified financial advisors for personalized advice</li>
                  <li>• Consider your risk tolerance and financial goals carefully</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* No Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <Shield className="w-6 h-6" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>No Guarantee of Results:</strong> We make no representations or warranties about the accuracy, completeness, or suitability of any investment information or recommendations provided through our platform.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Exclusion of Damages</h3>
                <p className="text-gray-700 mb-3">
                  Weallth, Erfinden Technologies, and their affiliates shall not be liable for:
                </p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Any direct, indirect, incidental, or consequential damages</li>
                  <li>• Loss of profits, revenue, or business opportunities</li>
                  <li>• Financial losses from investment decisions</li>
                  <li>• Market volatility or economic downturns</li>
                  <li>• Technical issues or platform downtime</li>
                  <li>• Third-party investment platform failures</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Maximum Liability</h3>
                <p className="text-gray-700">
                  In no event shall our total liability exceed the fees paid by you for using our platform in the 12 months preceding the claim.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Regulatory Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Not a Registered Investment Advisor</h3>
                <p className="text-gray-700">
                  Weallth is not a registered investment advisor, broker-dealer, or financial planner. We provide technology-based tools and educational content only.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Compliance</h3>
                <p className="text-gray-700">
                  All investments mentioned on our platform should comply with applicable laws and regulations. Users are responsible for ensuring compliance with their local investment regulations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tax Implications</h3>
                <p className="text-gray-700">
                  We do not provide tax advice. Users should consult qualified tax professionals regarding the tax implications of their investments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data and Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Data Accuracy & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Information Accuracy</h3>
                <p className="text-gray-700">
                  While we strive to provide accurate information, we cannot guarantee the completeness, accuracy, or timeliness of any data or recommendations on our platform.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Third-Party Data</h3>
                <p className="text-gray-700">
                  Some information may be sourced from third parties. We are not responsible for the accuracy or reliability of such third-party information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Agreement */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-3">
                By Using Our Platform, You Acknowledge and Agree:
              </h3>
              <ul className="text-blue-800 space-y-2 ml-4">
                <li>• You have read and understood this disclaimer in its entirety</li>
                <li>• You accept all risks associated with investment decisions</li>
                <li>• You will not hold Weallth liable for any investment outcomes</li>
                <li>• You will seek professional advice for significant investment decisions</li>
                <li>• You understand that all investments can result in loss of capital</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate('/contact-us')}
              variant="outline"
            >
              Contact Us
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-wealth-blue hover:bg-wealth-blue/90 text-white"
            >
              Continue to Platform
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
