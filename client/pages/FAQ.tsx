import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TrendingUp, ChevronDown, ChevronUp, Search, ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is Weallth and how does it work?",
        answer: "Weallth is a financial planning platform that helps you set and achieve your financial goals through systematic investment planning. We provide tools for goal-based investing, portfolio tracking, and investment recommendations across various asset classes."
      },
      {
        question: "How do I create an account?",
        answer: "You can create an account by clicking the 'Sign Up' button on our homepage. You'll need to provide basic information like your name, email, and phone number. After verification, you can complete your profile and start planning your investments."
      },
      {
        question: "Is Weallth free to use?",
        answer: "Weallth offers a free tier with basic features including goal planning and investment tracking. Premium features like advanced portfolio analytics and personalized recommendations may require a subscription."
      },
      {
        question: "What documents do I need to start investing?",
        answer: "To start investing, you'll typically need: PAN card, Aadhaar card, bank account details, and photographs. Specific requirements may vary depending on the investment platform you choose."
      }
    ]
  },
  {
    category: "Investments & Risks",
    questions: [
      {
        question: "Are investments on Weallth safe?",
        answer: "All investments carry market risks. Weallth provides information and tools, but we don't guarantee returns. We recommend diversifying your investments and only investing money you can afford to lose. Please read our disclaimer for complete risk information."
      },
      {
        question: "What types of investments can I make?",
        answer: "Our platform covers various investment options including mutual funds, stocks, fixed deposits, gold, government securities, and sector-specific investments. We provide information across risk levels from conservative to aggressive."
      },
      {
        question: "How much should I invest?",
        answer: "Investment amounts depend on your financial goals, risk tolerance, and income. We recommend starting with small amounts and gradually increasing. Our platform helps calculate optimal investment amounts based on your goals and timeline."
      },
      {
        question: "What is SIP and how does it work?",
        answer: "SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly in mutual funds. It helps average out market volatility and builds discipline. You can start SIPs with as little as ₹500 per month."
      }
    ]
  },
  {
    category: "Goals & Planning",
    questions: [
      {
        question: "How do I set financial goals?",
        answer: "Use our goal planning tool to set specific, measurable financial targets. Define the goal amount, timeline, and your current savings. Our calculator will suggest optimal investment strategies to achieve your goals."
      },
      {
        question: "Can I have multiple goals?",
        answer: "Yes, you can create multiple financial goals such as buying a house, car, education, retirement, etc. Each goal can have different investment strategies based on timeline and risk tolerance."
      },
      {
        question: "What if I need to change my goals?",
        answer: "Goals can be modified anytime. You can adjust target amounts, timelines, or investment strategies. Our platform will recalculate recommendations based on your updated goals."
      },
      {
        question: "How accurate are the investment projections?",
        answer: "Projections are estimates based on historical market data and assumed returns. Actual returns may vary significantly due to market volatility. These should be used as guidelines, not guarantees."
      }
    ]
  },
  {
    category: "Account & Security",
    questions: [
      {
        question: "How secure is my data on Weallth?",
        answer: "We use bank-grade security measures including encryption, secure servers, and regular security audits. We never store sensitive financial information like bank passwords or PINs. Your data is protected according to industry standards."
      },
      {
        question: "Can I change my personal information?",
        answer: "Yes, you can update your personal information through the profile settings. Some changes may require verification for security purposes."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page and enter your email. You'll receive a password reset link. Follow the instructions to create a new password."
      },
      {
        question: "What if I suspect unauthorized access?",
        answer: "Immediately change your password and contact our support team. We'll help secure your account and investigate any suspicious activity."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "The app is not working properly. What should I do?",
        answer: "Try refreshing the page or restarting the app. Clear your browser cache if using web version. If issues persist, contact our support team with details about the problem and your device/browser information."
      },
      {
        question: "Can I use Weallth on mobile devices?",
        answer: "Yes, Weallth is designed to work on all devices including smartphones, tablets, and desktops. We recommend using updated browsers for the best experience."
      },
      {
        question: "Do you have a mobile app?",
        answer: "Currently, Weallth is available as a web application that works seamlessly on mobile browsers. A dedicated mobile app may be launched in the future."
      },
      {
        question: "What browsers are supported?",
        answer: "Weallth works best on updated versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for optimal performance and security."
      }
    ]
  }
];

export default function FAQ() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <p className="text-sm text-wealth-gray">Frequently Asked Questions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-wealth-gray max-w-2xl mx-auto">
            Find answers to common questions about Weallth, investing, and financial planning.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 text-lg"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQ.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const itemId = `${categoryIndex}-${faqIndex}`;
                    const isExpanded = expandedItems.includes(itemId);
                    
                    return (
                      <div key={faqIndex} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                        <button
                          onClick={() => toggleExpanded(itemId)}
                          className="w-full text-left flex justify-between items-center py-3 hover:text-blue-600 transition-colors"
                        >
                          <h3 className="font-medium text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="pb-3">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFAQ.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600 mb-4">
              Try different keywords or browse all categories above.
            </p>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help you.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate('/contact-us')}
                className="bg-wealth-blue hover:bg-wealth-blue/90 text-white"
              >
                Contact Support
              </Button>
              <Button
                onClick={() => navigate('/disclaimer')}
                variant="outline"
              >
                View Disclaimer
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
