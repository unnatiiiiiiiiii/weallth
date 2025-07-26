import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-wealth-gray-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-wealth-blue-light"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Terms of Service
              </CardTitle>
              <p className="text-center text-muted-foreground mt-2">
                Effective Date: January 1, 2024
              </p>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using this wealth management and financial planning application ("Service"),
                    you accept and agree to be bound by the terms and provisions of this agreement ("Terms").
                    If you do not agree to these Terms, please do not use our Service.
                  </p>
                  <p>
                    These Terms constitute a legally binding agreement between you and our company.
                    Your use of the Service is also governed by our Privacy Policy, which is incorporated
                    by reference into these Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">2. Service Description</h2>
                  <p>
                    Our application provides comprehensive financial planning tools, investment guidance,
                    goal tracking, and wealth management features including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Personalized financial goal setting and tracking</li>
                    <li>Investment portfolio analysis and recommendations</li>
                    <li>Risk assessment and tolerance evaluation</li>
                    <li>Retirement planning calculators</li>
                    <li>Market data and investment insights</li>
                    <li>Progress monitoring and reporting tools</li>
                  </ul>
                  <p>
                    <strong>Important:</strong> The information provided is for educational and planning
                    purposes only and should not be considered as professional financial advice, investment
                    recommendations, or tax guidance.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">3. User Account and Registration</h2>
                  <p>
                    To access certain features of our Service, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security and confidentiality of your login credentials</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                  <p>
                    You must be at least 18 years old to create an account and use our Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">4. User Responsibilities and Prohibited Uses</h2>
                  <p>You agree to use the Service responsibly and lawfully. You shall not:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Use the Service for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                    <li>Upload or transmit malicious code, viruses, or harmful content</li>
                    <li>Interfere with or disrupt the Service or servers</li>
                    <li>Share your account credentials with third parties</li>
                    <li>Use automated systems to access the Service without permission</li>
                    <li>Reverse engineer, decompile, or attempt to extract source code</li>
                    <li>Remove or modify any proprietary notices or labels</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">5. Privacy and Data Protection</h2>
                  <p>
                    We are committed to protecting your personal and financial information. Your data
                    will be collected, used, and protected in accordance with our Privacy Policy and
                    applicable data protection regulations including GDPR and CCPA.
                  </p>
                  <p>Key data protection measures include:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>End-to-end encryption of sensitive financial data</li>
                    <li>Secure data storage with industry-standard security protocols</li>
                    <li>Limited data access on a need-to-know basis</li>
                    <li>Regular security audits and compliance reviews</li>
                    <li>Your right to access, modify, or delete your personal data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">6. Investment Disclaimers and Risk Warnings</h2>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="font-semibold text-yellow-800">Important Investment Disclaimer</p>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>All investments carry risk, including potential loss of principal</li>
                    <li>Past performance does not guarantee future results</li>
                    <li>Market values fluctuate and investments may be worth more or less than originally invested</li>
                    <li>Our recommendations are based on general market analysis and may not be suitable for your specific situation</li>
                    <li>You should consult with a qualified financial advisor before making investment decisions</li>
                    <li>We do not provide personalized investment advice or act as a fiduciary</li>
                    <li>Diversification does not guarantee protection against market losses</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">7. Fees and Billing</h2>
                  <p>
                    Our Service may offer both free and premium features. Premium features require
                    a subscription, billed according to the plan you select:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                    <li>All fees are non-refundable except as required by law</li>
                    <li>We may change our pricing with 30 days' advance notice</li>
                    <li>You can cancel your subscription at any time through your account settings</li>
                    <li>Upon cancellation, you retain access to premium features until the end of your billing period</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">8. Intellectual Property Rights</h2>
                  <p>
                    The Service and its original content, features, and functionality are owned by us
                    and are protected by international copyright, trademark, patent, trade secret,
                    and other intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, or create derivative works of our
                    content without our explicit written permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">9. Limitation of Liability</h2>
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR LIABILITY FOR ANY CLAIMS RELATED
                    TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS
                    PRECEDING THE CLAIM.
                  </p>
                  <p>
                    WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                    OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO INVESTMENT LOSSES,
                    DATA LOSS, OR BUSINESS INTERRUPTION.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">10. Third-Party Services</h2>
                  <p>
                    Our Service may integrate with third-party services, APIs, or display content
                    from external sources. We are not responsible for the availability, accuracy,
                    or reliability of third-party services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">11. Service Availability</h2>
                  <p>
                    While we strive for 99.9% uptime, we do not guarantee uninterrupted access to
                    the Service. We may temporarily suspend the Service for maintenance, updates,
                    or other operational reasons with reasonable notice when possible.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">12. Termination</h2>
                  <p>
                    We may terminate or suspend your account and access to the Service immediately,
                    without prior notice, if you breach these Terms. Upon termination, your right
                    to use the Service will cease immediately.
                  </p>
                  <p>
                    You may terminate your account at any time by contacting our support team or
                    using the account deletion feature in your settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">13. Governing Law and Dispute Resolution</h2>
                  <p>
                    These Terms are governed by and construed in accordance with the laws of
                    [Your Jurisdiction]. Any disputes arising from these Terms or your use of
                    the Service will be resolved through binding arbitration.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">14. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these Terms at any time. We will notify users
                    of material changes by email or through the Service at least 30 days before
                    the changes take effect. Continued use of the Service after changes constitutes
                    acceptance of the modified Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">15. Contact Information</h2>
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-wealth-blue-light p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li><strong>Email:</strong> legal@wealthapp.com</li>
                      <li><strong>Phone:</strong> 1-800-WEALTH (1-800-932-5844)</li>
                      <li><strong>Address:</strong> 123 Financial District, Suite 456, New York, NY 10004</li>
                      <li><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</li>
                    </ul>
                  </div>
                </section>

                <div className="bg-wealth-gray-light p-6 rounded-lg mt-8">
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold mb-2">Document Information:</p>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>Version: 2.1</p>
                    <p>Next review date: {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
