import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const supportCategories = [
    {
      id: "investment",
      title: "Investment Support",
      description:
        "Questions about investment strategies, portfolio management, or platform features.",
      color: "green",
      defaultSubject: "Investment Support - ",
      defaultMessage:
        "I need help with:\n\n[Please describe your investment-related question]\n\nCurrent portfolio value: ₹\nInvestment experience: [Beginner/Intermediate/Advanced]\nSpecific concern: ",
    },
    {
      id: "technical",
      title: "Technical Issues",
      description: "App bugs, login problems, or other technical difficulties.",
      color: "purple",
      defaultSubject: "Technical Issue - ",
      defaultMessage:
        "I'm experiencing a technical issue:\n\nProblem description:\nDevice/Browser: \nSteps to reproduce:\n1. \n2. \n3. \n\nError message (if any): ",
    },
    {
      id: "account",
      title: "Account Help",
      description: "Account setup, profile management, or security concerns.",
      color: "orange",
      defaultSubject: "Account Support - ",
      defaultMessage:
        "I need help with my account:\n\nIssue type: [Account setup/Profile update/Security concern]\nAccount email: \nSpecific request: ",
    },
    {
      id: "general",
      title: "General Inquiries",
      description:
        "Business partnerships, media inquiries, or other questions.",
      color: "blue",
      defaultSubject: "General Inquiry - ",
      defaultMessage:
        "General inquiry:\n\nInquiry type: [Partnership/Media/Other]\nOrganization (if applicable): \nMessage: ",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "",
      });
      setSelectedCategory("");
    }, 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              <p className="text-sm text-wealth-gray">Contact Us</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-wealth-gray max-w-2xl mx-auto">
            Have questions about your financial journey? We're here to help you
            every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                Send us a Message
              </CardTitle>
              <p className="text-wealth-gray">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 text-green-600">✓</div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      How can we help you? *
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {supportCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setFormData({
                              ...formData,
                              category: category.id,
                              subject: category.defaultSubject,
                              message: category.defaultMessage,
                            });
                          }}
                          className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                            selectedCategory === category.id
                              ? `border-${category.color}-500 bg-${category.color}-50`
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <h4
                            className={`font-medium text-sm ${
                              selectedCategory === category.id
                                ? `text-${category.color}-900`
                                : "text-gray-900"
                            }`}
                          >
                            {category.title}
                          </h4>
                          <p
                            className={`text-xs mt-1 ${
                              selectedCategory === category.id
                                ? `text-${category.color}-700`
                                : "text-gray-600"
                            }`}
                          >
                            {category.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  {selectedCategory && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Selected:{" "}
                        {
                          supportCategories.find(
                            (c) => c.id === selectedCategory,
                          )?.title
                        }
                      </h4>
                      <p className="text-sm text-blue-700">
                        We've pre-filled the form with a template to help you
                        provide the right information. Please edit the subject
                        and message as needed.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={!selectedCategory}
                    className="w-full bg-wealth-blue hover:bg-wealth-blue/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Email</p>
                      <p className="text-blue-700">support@weallth.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Phone</p>
                      <p className="text-blue-700">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Address</p>
                      <p className="text-blue-700">
                        Erfinden Technologies Pvt. Ltd.
                        <br />
                        Bangalore, Karnataka, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">
                        Business Hours
                      </p>
                      <p className="text-blue-700">
                        Monday - Friday: 9:00 AM - 6:00 PM IST
                        <br />
                        Saturday: 10:00 AM - 4:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Categories Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Support Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-4 bg-${category.color}-50 rounded-lg border ${
                        selectedCategory === category.id
                          ? `border-${category.color}-300`
                          : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4
                            className={`font-medium text-${category.color}-900 mb-2`}
                          >
                            {category.title}
                          </h4>
                          <p className={`text-sm text-${category.color}-700`}>
                            {category.description}
                          </p>
                        </div>
                        {selectedCategory === category.id && (
                          <div
                            className={`w-6 h-6 bg-${category.color}-500 rounded-full flex items-center justify-center`}
                          >
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Tip:</strong> Select a category above to get a
                    pre-filled template that helps you provide the right
                    information for faster support.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  Need Quick Answers?
                </h3>
                <p className="text-purple-700 mb-4">
                  Check out our FAQ section for instant answers to common
                  questions.
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/faq")}
                  className="border-purple-300 text-purple-700 hover:bg-purple-100"
                >
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
