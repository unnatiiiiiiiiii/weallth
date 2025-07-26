import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Target, Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
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
              <p className="text-sm text-wealth-gray">About Us</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Weallth
          </h1>
          <p className="text-xl text-wealth-gray max-w-3xl mx-auto">
            Empowering individuals to build wealth through smart financial planning and goal-based investing
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-900">
                <Target className="w-6 h-6" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                To democratize wealth creation by providing accessible, intelligent, and personalized financial planning tools that help every individual achieve their financial goals and build long-term wealth.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-900">
                <TrendingUp className="w-6 h-6" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800">
                To become India's most trusted platform for financial planning, where technology meets human-centered design to create prosperity for millions of families across the country.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Goal-Based Planning
                </h3>
                <p className="text-gray-600">
                  Help you set and achieve specific financial goals through systematic planning and investment strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Investment Guidance
                </h3>
                <p className="text-gray-600">
                  Provide personalized investment recommendations across multiple asset classes to optimize your portfolio.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Education & Support
                </h3>
                <p className="text-gray-600">
                  Educate users about financial concepts and provide ongoing support throughout their wealth-building journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Company Info */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">
                Erfinden Technologies
              </h2>
              <p className="text-purple-800 mb-4">
                Weallth is a product of Erfinden Technologies, a fintech company dedicated to creating innovative solutions for personal finance and wealth management. We combine cutting-edge technology with deep financial expertise to deliver products that truly make a difference in people's lives.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-purple-900 mb-2">Our Approach</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• User-centric design and development</li>
                    <li>• Data-driven investment recommendations</li>
                    <li>• Transparent fee structure</li>
                    <li>• Continuous learning and improvement</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-2">Our Values</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Transparency in all operations</li>
                    <li>• Customer-first mindset</li>
                    <li>• Innovation and excellence</li>
                    <li>• Financial inclusion for all</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose Weallth?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-sm text-gray-600">Bank-grade security with encrypted data protection</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Guidance</h3>
              <p className="text-sm text-gray-600">Research-backed investment strategies and recommendations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User-Friendly</h3>
              <p className="text-sm text-gray-600">Simple, intuitive interface designed for everyone</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Goal-Focused</h3>
              <p className="text-sm text-gray-600">Personalized plans to achieve your specific goals</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-wealth-blue rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Wealth Journey?</h2>
          <p className="mb-6 opacity-90">
            Join thousands of users who are already building their financial future with Weallth
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-wealth-blue hover:bg-gray-100"
          >
            Get Started Today
          </Button>
        </div>
      </main>
    </div>
  );
}
